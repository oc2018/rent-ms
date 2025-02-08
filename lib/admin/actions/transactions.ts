"use server";

import { db } from "@/database/drizzle";
import { transactions } from "@/database/schema";

export const createTxn = async (txnData: TxnProps) => {
  try {
    const newTxn = await db.insert(transactions).values(txnData).returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newTxn[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Transaction not captured" as string,
    };
  }
};
