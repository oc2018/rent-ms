/* eslint-disable @typescript-eslint/no-unused-vars */
import PaymentForm from "@/components/admin/PaymentForm";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { properties, users } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import React from "react";

const Payment = async () => {
  const { password, ...safeUsers } = users;
  const tenants = await db
    .select(safeUsers)
    .from(users)
    .where(eq(users.role, "USER"));

  const allProperties = (await db
    .select()
    .from(properties)
    .orderBy(desc(properties.createdAt))) as Property[];

  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/rentaccount">Go Back</Link>
      </Button>
      <section className="w-full">
        <PaymentForm
          type="create"
          tenants={tenants}
          allProperties={allProperties}
        />
      </section>
    </>
  );
};

export default Payment;
