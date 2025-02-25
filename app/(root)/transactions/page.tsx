import { auth } from "@/auth";
import UserTxnList from "@/components/UserTxnList";
import { db } from "@/database/drizzle";
import { payments, properties } from "@/database/schema";
import { eq } from "drizzle-orm";
import React from "react";

const UserTransactions = async () => {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("You are not authenticated");
  }
  const id = session.user.id as string;
  const userTxns = await db
    .select()
    .from(payments)
    .where(eq(payments.tenantId, id));

  const propertyId = userTxns.map((p) => p.propertyId);

  const [houseNo] = await db
    .select({ propertyNo: properties.propertyNo })
    .from(properties)
    .where(eq(properties.propertyId, propertyId[0]));

  if (!houseNo) return new Error("You are not allocated any House.");

  return (
    <section className="w-full rounded-2xl p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <div className="">
          <h2 className="text-14-medium">Tenant Name: {session.user.name}</h2>
          <p className="text-sm text-primary">
            House Number: {houseNo?.propertyNo}{" "}
          </p>
        </div>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <UserTxnList userTxns={userTxns} />
      </div>
    </section>
  );
};

export default UserTransactions;
