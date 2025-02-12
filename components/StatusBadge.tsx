import { StatusIcon } from "@/lib/constants";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

const StatusBadge = ({
  status,
}: {
  status: "PENDING" | "APPROVED" | "REJECTED" | "VACANT" | "OCCUPIED";
}) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={StatusIcon[status]}
        alt="Icon"
        width={32}
        height={32}
        className="h-fit w-3"
      />
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-600": status === "APPROVED",
          "text-blue-400": status === "OCCUPIED",
          "text-red-600": status === "REJECTED",
          "text-orange-600": status === "PENDING",
          "text-amber-600": status === "VACANT",
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
