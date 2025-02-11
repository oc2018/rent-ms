import TenantsList from "@/components/admin/TenantsList";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import React from "react";

type SafeUser = Omit<User, "password">;

const page = async () => {
  const tenants = (await db
    .select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      phoneNumber: users.phoneNumber,
      idNumber: users.idNumber,
      idCard: users.idCard,
      kraPin: users.kraPin,
      status: users.status,
      role: users.role,
      lastActivityDate: users.lastActivityDate,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.role, "USER"))) as SafeUser[];

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
