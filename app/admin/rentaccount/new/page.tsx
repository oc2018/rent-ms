/* eslint-disable @typescript-eslint/no-unused-vars */
import PaymentForm from "@/components/admin/PaymentForm";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { properties, users } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import React from "react";

const Payment = async () => {
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
    .where(eq(users.role, "USER"))) as User[];

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
