import PaymentList from "@/components/admin/PaymentList";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { payments } from "@/database/schema";
import Link from "next/link";
import React from "react";

const RentAccount = async () => {
  const allPayments = await db.select().from(payments);

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Rent Account</h2>
        <Button className="bg-primary-admin" asChild>
          <Link className="text-white" href="/admin/rentaccount/new">
            + Enter a New payment
          </Link>
        </Button>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <PaymentList allPayments={allPayments} />
      </div>
    </section>
  );
};

export default RentAccount;
