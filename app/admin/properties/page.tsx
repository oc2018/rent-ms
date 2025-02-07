// import { auth } from "@/auth";
import PropertyList from "@/components/admin/PropertyList";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { properties } from "@/database/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import React from "react";

const page = async () => {
  // const session = await auth();

  const allProperties = (await db
    .select()
    .from(properties)
    .orderBy(desc(properties.createdAt))) as Property[];

  // console.log(session, allProperties);
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Properties</h2>
        <Button className="bg-primary-admin" asChild>
          <Link className="text-white" href="/admin/properties/new">
            + Create a New Property
          </Link>
        </Button>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <PropertyList allProperties={allProperties} />
      </div>
    </section>
  );
};

export default page;
