"use client";

import { ColumnDef } from "@tanstack/react-table";

export const tenantColumns: ColumnDef<User>[] = [
  {
    accessorKey: "fullName",
    header: "NAME",
  },
  {
    accessorKey: "idNumber",
    header: "ID NUMBER",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "kraPin",
    header: "KRA PIN",
  },
  {
    accessorKey: "phoneNumber",
    header: "PHONE NUMBER",
  },
  {
    accessorKey: "status",
    header: "STATUS",
  },
];
