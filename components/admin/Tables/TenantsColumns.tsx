"use client";

import StatusBadge from "@/components/StatusBadge";
import { ColumnDef } from "@tanstack/react-table";
import Approve from "../Approve";

export const tenantColumns: ColumnDef<User>[] = [
  {
    header: "ID",
    cell: ({ row }) => <div className="text-14-medium">{row.index + 1}</div>,
  },
  {
    accessorKey: "fullName",
    header: "Name",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.fullName}</div>
    ),
  },
  {
    accessorKey: "idNumber",
    header: "Id Number",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.idNumber}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.email}</div>
    ),
  },
  {
    accessorKey: "kraPin",
    header: "KRA PIN",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.kraPin}</div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => (
      <div className="text-14-medium">{row.original.phoneNumber}</div>
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
    header: "Actions",
    cell: ({ row: { original: data } }) => {
      return (
        <div className="">
          <Approve data={data} />
        </div>
      );
    },
  },
];
