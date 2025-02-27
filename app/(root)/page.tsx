import { auth } from "@/auth";
import UserTxnList from "@/components/UserTxnList";
import { db } from "@/database/drizzle";
import { payments, properties, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

const Home = async () => {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("You are not authenticated");
  }
  const id = session.user.id as string;

  const userTxns = await db
    .select({
      userRole: users.role,
      tenantId: payments.tenantId,
      paymentId: payments.paymentId,
      receiptNo: payments.receiptNo,
      propertyId: payments.propertyId,
      rentPaid: payments.rentPaid,
      depositPaid: payments.depositPaid,
      createdAt: payments.createdAt,
      propertyNo: properties.propertyNo,
    })
    .from(payments)
    .innerJoin(properties, eq(properties.propertyId, payments.propertyId))
    .innerJoin(users, eq(users.id, id))
    .where(eq(payments.tenantId, id));

  if (userTxns?.length === 0 || userTxns[0]?.userRole === "ADMIN")
    redirect("/my-profile");

  return (
    <section className="w-full rounded-2xl p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <div className="">
          <h2 className="text-14-medium">Tenant Name: {session.user.name}</h2>
          <p className="text-sm text-primary">
            House Number: {userTxns[0]?.propertyNo}
          </p>
        </div>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <UserTxnList userTxns={userTxns} />
      </div>
    </section>
  );
};

export default Home;
