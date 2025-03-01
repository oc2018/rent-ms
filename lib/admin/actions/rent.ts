"use server";

import { db } from "@/database/drizzle";
import { allocation, payments, properties, users } from "@/database/schema";
import { parseStringify } from "@/lib/utils";
import { eq, inArray, sql } from "drizzle-orm";
import cron from "node-cron";

export const allocateProperty = async (params: allocationProps) => {
  const { propertyId, tenantId, status } = params;

  console.log(status);

  try {
    const approved = await db
      .update(users)
      .set({ status: status })
      .where(eq(users.id, tenantId))
      .returning();

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

export const updateRentMonthly = async () => {
  console.log("running rent update cron job");
  try {
    const allocationsWithRent = await db
      .select({
        propertyId: allocation.propertyId,
        rentDue: allocation.rentDue,
        rent: properties.rent,
      })
      .from(allocation)
      .innerJoin(properties, eq(allocation.propertyId, properties.propertyId));

    if (allocationsWithRent.length === 0) {
      console.warn("No valid property IDs found, skipping rent update.");
      return { success: false, error: "No valid properties to update. " };
    }

    const result = await db
      .update(allocation)
      .set({
        rentDue: sql`${allocation.rentDue} + ${properties.rent}`,
        rentStatus: sql`CASE WHEN (${allocation.rentDue} + ${properties.rent}) > 0 THEN "DUE" ELSE rentStatus END`,
      })
      .where(
        inArray(
          allocation.propertyId,
          allocationsWithRent.map((a) => a.propertyId) as string[]
        )
      )
      .returning();

    console.log(
      `Rent update for the month of ${new Date().getMonth() + 1} successful`,
      result
    );
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

export const getDepositTotal = async (): Promise<number> => {
  const allDeposits: GetDepositsTotalProps[] = await db
    .select({ depositPaid: payments.depositPaid })
    .from(payments);

  const total = allDeposits.reduce(
    (sum, deposit) => sum + (deposit?.depositPaid ?? 0),
    0
  );

  return total;
};
