"use server";

import { db } from "@/database/drizzle";
import { allocation, properties, users } from "@/database/schema";
import { parseStringify } from "@/lib/utils";
import { eq, inArray } from "drizzle-orm";
import cron from "node-cron";

export const allocateProperty = async (params: allocationProps) => {
  const { propertyId, tenantId, status } = params;

  try {
    const approved = await db.update(users).set({ status: status }).returning();

    if (!approved || approved[0].status === "REJECTED") {
      return {
        success: false,
        error: "User details incomplete or approval denied.",
      };
    }

    const property = await db
      .select({
        status: properties.status,
        rent: properties.rent,
        deposit: properties.deposit,
      })
      .from(properties)
      .where(eq(properties.propertyId, propertyId))
      .limit(1);

    if (!property || property[0].status === "OCCUPIED") {
      return {
        success: false,
        error: "This house is not Vacant",
      };
    }

    const rentDue = property[0].rent;
    const depositDue = property[0].deposit;

    const result = await db
      .insert(allocation)
      .values({
        propertyId,
        tenantId,
        rentDue,
        depositDue,
      })
      .returning();

    if (!result || result.length === 0) {
      return {
        success: false,
        message: "Insert into the allocation table failed",
      };
    }

    if (result) {
      const result = await db
        .update(properties)
        .set({ status: "OCCUPIED" })
        .where(eq(properties.propertyId, propertyId))
        .returning();

      if (!result || result.length === 0) {
        return {
          success: false,
          message: "Property not found, status not updated",
        };
      }

      return {
        success: true,
        data: parseStringify(result),
      };
    }
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occured while allocating the house",
    };
  }
};

const updateRentMonthly = async () => {
  console.log("running cron");
  try {
    const allocations = await db
      .select({
        id: allocation.propertyId,
        rentDue: allocation.rentDue,
      })
      .from(allocation);

    const propertyIds = allocations
      .map((entry) => entry.id)
      .filter((id): id is string => id !== null);

    if (propertyIds.length === 0) {
      console.warn("No valid property IDs found, skipping rent update.");
      return { success: false, error: "No valid properties to update. " };
    }

    const rents = await db
      .select({
        propertyId: properties.propertyId,
        rent: properties.rent,
      })
      .from(properties)
      .where(inArray(properties.propertyId, propertyIds));

    const rentMap = new Map(
      rents.map((entry) => [entry.propertyId, entry.rent])
    );

    for (const entry of allocations) {
      const monthlyRentAmount = rentMap.get(entry.id!) || 0;

      await db
        .update(allocation)
        .set({ rentDue: entry.rentDue + monthlyRentAmount })
        .where(eq(allocation.propertyId, entry.id!));
    }

    console.log("Rent updated successfully");
    return { success: true };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: `Updating rent due failed for the month of ${
        new Date().getMonth() + 1
      }`,
    };
  }
};

// const monthly = "0 0 1 * *";
const everyMinute = "* * * * *";

cron.schedule(everyMinute, updateRentMonthly, {
  scheduled: true,
  timezone: "Africa/Nairobi",
});
