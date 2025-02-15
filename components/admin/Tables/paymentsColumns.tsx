"use client";

import { currencyFormatter, dateFormatter } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const paymentsColumns: ColumnDef<PaymentListProps>[] = [
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
    accessorKey: "receiptNo",
    header: "Receipt Number",
    cell: ({ row }) => (
      <div className="text-14-medium text-center">{row.original.receiptNo}</div>
    ),
  },
  {
    accessorKey: "propertyNo",
    header: "House Number",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.propertyNo}</div>
    ),
  },
  {
    accessorKey: "tenant",
    header: "Paid By",
    cell: ({ row }) => (
      <div className="text-14-medium">{row?.original?.tenant}</div>
    ),
  },
  {
    accessorKey: "rentPaid",
    header: "Rent Amount",
    cell: ({ row }) => (
      <div className="text-14-medium">
        {row.original.rentPaid && currencyFormatter(row.original.rentPaid)}
      </div>
    ),
  },
  {
    accessorKey: "depositPaid",
    header: "Deposit Amount",
    cell: ({ row }) => (
      <div className="text-14-medium">
        {row.original.depositPaid &&
          currencyFormatter(row.original.depositPaid)}
      </div>
    ),
  },
];
