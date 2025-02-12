"use client";

import StatusBadge from "@/components/StatusBadge";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const propertiesColumns: ColumnDef<Property>[] = [
  {
    header: "ID",
    cell: ({ row }) => <div className="text-14-medium">{row.index + 1}</div>,
  },
  {
    accessorKey: "propertyLocation",
    header: "Property",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.propertyLocation}</div>
    ),
  },
  {
    accessorKey: "propertyId",
    header: "House Number",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.propertyId}</div>
    ),
  },
  {
    accessorKey: "propertyOwner",
    header: "Landlord",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.propertyOwner}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    header: "actions",
    cell: ({ row }) => (
      <div className="">
        <Link href={`/admin/properties/${row.original.propertyId}`}>
          details
        </Link>
      </div>
    ),
  },
];
