"use client";

import { ColumnDef } from "@tanstack/react-table";

export const txnColumns: ColumnDef<Txn>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "expenseNo",
    header: "Expense Number ",
  },
  {
    accessorKey: "paymentNo",
    header: "Receipt Number",
  },
  {
    accessorKey: "transactionAmount",
    header: "Amount",
  },
  {
    accessorKey: "paymentNo",
    header: "Balance",
  },
];
