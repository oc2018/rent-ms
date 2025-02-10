import ExpenseForm from "@/components/admin/ExpenseForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NewExpense = () => {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/properties">Go Back</Link>
      </Button>
      <section>
        <ExpenseForm type="create" />
      </section>
    </>
  );
};

export default NewExpense;
