import ExpensesList from "@/components/admin/ExpensesList";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { expenses } from "@/database/schema";
import Link from "next/link";
import React from "react";

const Expenses = async () => {
  const allExpenses = await db.select().from(expenses);

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Expenses</h2>
        <Button className="bg-primary-admin" asChild>
          <Link className="text-white" href="/admin/expenses/new">
            + Enter a New Expense
          </Link>
        </Button>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <ExpensesList allExpenses={allExpenses} />
      </div>
    </section>
  );
};

export default Expenses;
