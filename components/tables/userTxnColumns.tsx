"use client";

import { dateFormatter } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const userTxnColumns: ColumnDef<UserTxnListProps>[] = [
  {
    header: "ID",
    cell: ({ row }) => <div className=" text-14-medium">{row.index + 1}</div>,
  },
  {
    header: "Date Paid",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <div className="text-14-medium">
        {row.original.createdAt && dateFormatter(row.original.createdAt)}
      </div>
    ),
  },
  {
    header: "Rent Paid",
    accessorKey: "rentPaid",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.rentPaid}</div>
    ),
  },
  {
    header: "Deposit Paid",
    accessorKey: "depositPaid",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.depositPaid}</div>
    ),
  },
];
