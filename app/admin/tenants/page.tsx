import TenantsList from "@/components/admin/TenantsList";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import React from "react";

const page = async () => {
  //eslint-disable-next-line
  const { password, ...safeUsers } = users;
  const tenants = await db
    .select(safeUsers)
    .from(users)
    .where(eq(users.role, "USER"));

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Tenants</h2>
        <Button className="bg-primary-admin" asChild>
          <Link className="text-white" href="/admin/sign-up">
            + Add new Tenant
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <TenantsList tenants={tenants} />
      </div>
    </section>
  );
};

export default page;
