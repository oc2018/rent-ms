" use client";

import { ColumnDef } from "@tanstack/react-table";

export const paymentsColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "receiptNo",
    header: "Receipt Number",
  },
  {
    accessorKey: "tenantId",
    header: "Paid By",
  },
  {
    accessorKey: "rentPaid",
    header: "Rent Amount",
  },
  {
    accessorKey: "depositPaid",
    header: "Deposit Amount",
  },
];
