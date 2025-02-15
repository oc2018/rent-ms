"use client";

import { currencyFormatter, dateFormatter } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const txnColumns: ColumnDef<TxnList>[] = [
  {
    header: "ID",
    cell: ({ row }) => <div className="text-14-medium">{row.index + 1}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <div className="text-14-medium">
        {row.original.createdAt && dateFormatter(row.original.createdAt)}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.description}</div>
    ),
  },
  {
    accessorKey: "expenseNo",
    header: "Expense Number ",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.expenseNo}</div>
    ),
  },
  {
    accessorKey: "paymentNo",
    header: "Receipt Number",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.paymentNo}</div>
    ),
  },
  {
    accessorKey: "transactionAmount",
    header: "Amount",
    cell: ({ row }) => (
      <div className={row.original.rowClass}>
        {currencyFormatter(row.original.transactionAmount!)}
      </div>
    ),
  },
  {
    accessorKey: "paymentNo",
    header: "Balance",
    cell: ({ row }) => (
      <div className="text-14-medium">
        {currencyFormatter(row.original.balance)}
      </div>
    ),
  },
];
