"use server";

import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { allocation, payments } from "@/database/schema";
import { eq } from "drizzle-orm";

export const createPayment = async (data: PaymentParams) => {
  const session = await auth();

  if (!session) throw new Error("User not authenticated");

  try {
    const newPayment = await db.insert(payments).values(data).returning();
    if (!newPayment.length) throw new Error("Payment Insertion failed");
    const rentAndDepositDue = await db
      .select({
        rentDue: allocation.rentDue,
        depositDue: allocation.depositDue,
        rentStatus: allocation.rentStatus,
      })
      .from(allocation)
      .where(eq(allocation.tenantId, newPayment[0].tenantId));

    if (!rentAndDepositDue.length)
      throw new Error("Tenant rent and deposit due not found");

    const { rentDue, depositDue } = rentAndDepositDue[0];
    if (
      rentDue === null ||
      depositDue === null ||
      newPayment[0].rentPaid === null
    ) {
      throw new Error("One or more required fields are missing");
    }
    const newAllocation = await db
      .update(allocation)
      .set({
        rentDue: rentDue - newPayment[0].rentPaid,
        depositDue: depositDue - (newPayment[0].depositPaid || 0),
      })
      .where(eq(allocation.tenantId, newPayment[0].tenantId))
      .returning();

    if (!newAllocation) {
      throw new Error("Rent due account not updated");
    }

    const updatedRentStatus = await db
      .update(allocation)
      .set({
        rentStatus: `${newAllocation[0].rentDue <= 0 ? "CLEARED" : "DUE"}`,
      })
      .where(eq(allocation.tenantId, newAllocation[0].tenantId!));

    console.log(updatedRentStatus);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newPayment[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: `Payment failed, please try again later.` as string,
    };
  }
};

export const getPaymentsTotal = async (): Promise<number> => {
  const allPayments: GetPaymentsTotalProps[] = await db
    .select({ rentPaid: payments.rentPaid })
    .from(payments);

  const total = allPayments.reduce(
    (sum, payment) => sum + (payment?.rentPaid ?? 0),
    0
  );

  return total;
};
