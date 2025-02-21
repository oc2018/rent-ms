import { db } from "@/database/drizzle";
import { transactions } from "@/database/schema";
import Image from "next/image";
import React from "react";
import ActivityCard from "./ActivityCard";
import { desc } from "drizzle-orm";

const RecentActivity = async () => {
  const recentData = await db
    .select()
    .from(transactions)
    .orderBy(desc(transactions.createdAt))
    .limit(3);
  return (
    <div className="flex flex-col border p-6 border-slate-300 bg-white rounded-2xl  lg:w-1/3">
      <div className="flex flex-row w-full justify-between ">
        <div className="">
          <h3 className="text-2xl font-semibold">Recent Activity</h3>
        </div>
        <div className="flex justify-center items-center gap-2 mr2">
          <Image
            src="/icons/admin/ellipsis.svg"
            alt="icon"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="mt-4 w-full">
          <ActivityCard recentData={recentData} />
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
