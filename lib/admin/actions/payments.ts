import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { payments } from "@/database/schema";

export const createPayment = async (data: PaymentParams) => {
  const session = await auth();

  if (!session) throw new Error("User not authenticated");

  console.log(data);
  try {
    const newPayment = await db.insert(payments).values(data).returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newPayment[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: `Payment failed, please try again later.`,
    };
  }
};
