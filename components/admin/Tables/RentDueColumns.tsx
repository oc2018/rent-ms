"use client";

import { currencyFormatter } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";

export const RentDueColumns: ColumnDef<RentDueDataProps>[] = [
  {
    header: "ID",
    cell: ({ row }) => <div className="text-14-medium">{row.index + 1}</div>,
  },
  {
    header: "Tenant Name",
    accessorKey: "fullName",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.fullName}</div>
    ),
  },
  {
    header: "Tenant Email",
    accessorKey: "email",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.email}</div>
    ),
  },
  {
    header: "Phone Number",
    accessorKey: "phoneNumber",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.phoneNumber}</div>
    ),
  },
  {
    header: "Rent Due",
    accessorKey: "rentDue",
    cell: ({ row }) => (
      <div className="text-14-medium">
        {row.original.rentDue && currencyFormatter(row.original.rentDue)}
      </div>
    ),
  },
  {
    header: "Status",
    accessorKey: "rentStatus",
    cell: ({
      row: {
        original: { rentStatus },
      },
    }) => (
      <div
        className={clsx("text-14-medium text-center", {
          "text-green-600": rentStatus === "CLEARED",
          "text-blue-400": rentStatus === "DUE",
          "text-red-600": rentStatus === "DEFAULTED",
          "text-orange-600": rentStatus === "OVERDUE",
        })}
      >
        {rentStatus}
      </div>
    ),
  },
];
