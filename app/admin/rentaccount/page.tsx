import PaymentList from "@/components/admin/PaymentList";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { payments, properties, users } from "@/database/schema";
import { asc, eq } from "drizzle-orm";
import Link from "next/link";
import React from "react";

const RentAccount = async () => {
  const allPayments = (await db
    .select()
    .from(payments)
    .orderBy(asc(payments.createdAt))) as Payment[];

  const getTenant = async (tenantId: string): Promise<string> => {
    const result = await db
      .select({ fullName: users.fullName })
      .from(users)
      .where(eq(users.id, tenantId));

    return result[0].fullName;
  };

  const getPropertyNo = async (propertyId: string): Promise<string | null> => {
    const result = await db
      .select({ propertyNo: properties.propertyNo })
      .from(properties)
      .where(eq(properties.propertyId, propertyId))
      .limit(1);

    return result ? result[0].propertyNo : null;
  };

  const paymentData = await Promise.all(
    allPayments.map(async (p) => {
      const tenant = await getTenant(p.tenantId);
      const propertyNo = await getPropertyNo(p.propertyId);

      return {
        propertyNo: propertyNo,
        paymentId: p.paymentId,
        receiptNo: p.receiptNo,
        propertyId: p.propertyId,
        rentPaid: p.rentPaid,
        depositPaid: p.depositPaid,
        tenant: tenant,
        createdAt: p.createdAt,
      };
    })
  );

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Rent Payments</h2>
        <Button className="bg-primary-admin" asChild>
          <Link className="text-white" href="/admin/rentaccount/new">
            + Enter a New payment
          </Link>
        </Button>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <PaymentList allPayments={paymentData} />
      </div>
    </section>
  );
};

export default RentAccount;
