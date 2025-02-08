"use server";

import { db } from "@/database/drizzle";
import { expenses } from "@/database/schema";

export const createExpense = async (values: ExpenseParams) => {
  try {
    const newExpense = await db.insert(expenses).values(values).returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newExpense[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Expense not saved, Try again later.",
    };
  }
};
