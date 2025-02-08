" use client";

import { ColumnDef } from "@tanstack/react-table";

export const expensesColumns: ColumnDef<Expense>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "expenseNo",
    header: "Expense Number",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "expenseAmount",
    header: "Amount",
  },
];
