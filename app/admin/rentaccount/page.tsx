import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const RentAccount = () => {
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
        Table
        {/* <PropertyList allProperties={allProperties} /> */}
      </div>
    </section>
  );
};

export default RentAccount;
