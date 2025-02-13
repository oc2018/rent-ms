import ReceiptCard from "@/components/admin/ReceiptCard";
import { db } from "@/database/drizzle";
import { expenses } from "@/database/schema";
import { eq } from "drizzle-orm";
import React from "react";

const page = async ({ params }: { params: Promise<{ expenseId: string }> }) => {
  const expenseId = (await params).expenseId;

  const [expenseDetails] = (await db
    .select()
    .from(expenses)
    .where(eq(expenses.expenseId, expenseId))
    .limit(1)) as Expense[];

  return <ReceiptCard expenseDetails={expenseDetails} />;
};

export default page;
