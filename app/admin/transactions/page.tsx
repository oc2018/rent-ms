import TransactionsList from "@/components/admin/TransactionsList";
import { db } from "@/database/drizzle";
import { expenses, payments, transactions } from "@/database/schema";
import { cn } from "@/lib/utils";
import { asc, eq } from "drizzle-orm";
import React from "react";

const page = async () => {
  const allTxns = await db
    .select()
    .from(transactions)
    .orderBy(asc(transactions.createdAt));

  const getReceiptNo = async (paymentId: string): Promise<number | null> => {
    const result = await db
      .select({ receiptNo: payments.receiptNo })
      .from(payments)
      .where(eq(payments.paymentId, paymentId))
      .limit(1);

    return result.length > 0 ? result[0].receiptNo : null;
  };

  const getExpenseNo = async (expenseId: string): Promise<number | null> => {
    const result = await db
      .select({ expenseNo: expenses.expenseNo })
      .from(expenses)
      .where(eq(expenses.expenseId, expenseId))
      .limit(1);
    return result.length > 0 ? result[0].expenseNo : null;
  };

  const accumulator = (() => {
    let runningTotal = 0;
    return (transactionAmount: number, isDebit: boolean) => {
      runningTotal = isDebit
        ? runningTotal - transactionAmount
        : runningTotal + transactionAmount;
      return runningTotal;
    };
  })();

  const txnData = await Promise.all(
    allTxns.map(async (txn) => {
      const receiptNo = txn.paymentId
        ? await getReceiptNo(txn.paymentId!)
        : null;
      const expenseNo = txn.expenseId
        ? await getExpenseNo(txn.expenseId!)
        : null;
      const balance = accumulator(txn.transactionAmount!, txn.isDebit);

      const rowClass = cn(
        "text-14-medium p-2 text-right",
        txn.isDebit ? "bg-red-100" : "bg-green-100"
      );

      return {
        createdAt: txn.createdAt,
        description: txn.description,
        isDebit: txn.isDebit,
        paymentNo: receiptNo,
        expenseNo: expenseNo,
        transactionAmount: txn.transactionAmount,
        balance: balance,
        rowClass: rowClass,
      };
    })
  );

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Transactions</h2>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <TransactionsList allTxns={txnData} />
      </div>
    </section>
  );
};

export default page;
