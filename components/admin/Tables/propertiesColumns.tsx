"use client";

import { ColumnDef } from "@tanstack/react-table";

export const propertiesColumns: ColumnDef<Property>[] = [
  { accessorKey: "propertyLocation", header: "Property" },
  { accessorKey: "propertyId", header: "House Number" },
  { accessorKey: "propertyOwner", header: "Landlord" },
  { accessorKey: "status", header: "Status" },
];
