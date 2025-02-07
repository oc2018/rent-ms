import PaymentForm from "@/components/admin/PaymentForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Payment = () => {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/rentaccount">Go Back</Link>
      </Button>
      <section className="w-full max-w-2xl">
        <PaymentForm type="create" />
      </section>
    </>
  );
};

export default Payment;
