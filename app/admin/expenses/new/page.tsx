import ExpenseForm from "@/components/admin/ExpenseForm";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { properties } from "@/database/schema";
import Link from "next/link";
import React from "react";

const NewExpense = async () => {
  const propertyIds = (await db.select().from(properties)) as Property[];

  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/properties">Go Back</Link>
      </Button>
      <section>
        <ExpenseForm type="create" properties={propertyIds} />
      </section>
    </>
  );
};

export default NewExpense;
