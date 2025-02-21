import Feature from "@/components/admin/Feature";
import React from "react";
import Highlights from "@/components/admin/Highlights";
import RecentActivity from "@/components/admin/RecentActivity";
import { db } from "@/database/drizzle";
import { allocation, users } from "@/database/schema";
import { eq } from "drizzle-orm";

const page = async () => {
  const rentDueData = await db
    .select({
      fullName: users.fullName,
      email: users.email,
      phoneNumber: users.phoneNumber,
      rentDue: allocation.rentDue,
      rentStatus: allocation.rentStatus,
    })
    .from(users)
    .innerJoin(allocation, eq(users.id, allocation.tenantId));

  return (
    <section className="w-full rounded-2xl bg-slate-100 p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Dashboard</h2>
      </div>

      <div className="mt-7 w-full gap-3 overflow-hidden flex flex-col lg:flex-row justify-between">
        <Feature />
        <Feature />
        <Feature />
        <Feature />
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-6 py-6">
        <Highlights rentDueData={rentDueData} />
        <RecentActivity />
      </div>
    </section>
  );
};

export default page;
