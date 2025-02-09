"use client";
import EntriesForm from "@/components/admin/EntriesForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/properties">Go Back</Link>
      </Button>
      <section className="w-full">
        <EntriesForm type="create" />
      </section>
    </>
  );
};

export default page;
