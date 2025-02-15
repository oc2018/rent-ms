"use client";

import { currencyFormatter, dateFormatter } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const expensesColumns: ColumnDef<Expense>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <p className="text-14-medium">
        {row.original.createdAt && dateFormatter(row?.original?.createdAt)}
      </p>
    ),
  },
  {
    accessorKey: "expenseNo",
    header: "Expense Number",
    cell: ({ row }) => (
      <p className="text-14-medium text-center">{row?.original.expenseNo}</p>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.description}</p>
    ),
  },
  {
    accessorKey: "expenseAmount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("expenseAmount"));
      const formated = currencyFormatter(amount);

      return (
        <div className="text-right text-14-medium text-center">{formated}</div>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <Link href={`/admin/expenses/${row.original.expenseId}`}>details</Link>
    ),
  },
];
