// import { auth } from "@/auth";
import PropertyList from "@/components/admin/PropertyList";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { properties, users } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import React from "react";

const page = async () => {
  const allProperties = (await db
    .select()
    .from(properties)
    .orderBy(desc(properties.createdAt))) as Property[];

  const getOwner = async (owner: string) =>
    (await db
      .select({ fullName: users.fullName })
      .from(users)
      .where(eq(users.id, owner))) as { fullName: string }[];

  const propertiesData = await Promise.all(
    allProperties.map(async (p) => {
      const owner = await getOwner(p.propertyOwner);

      return {
        propertyNo: p.propertyNo,
        propertyId: p.propertyId,
        createdAt: p.createdAt,
        deposit: p.deposit,
        rent: p.rent,
        propertySize: p.propertySize,
        propertyLocation: p.propertyLocation,
        propertyImage: p.propertyImage,
        propertyOwner: owner[0]?.fullName,
        status: p.status,
      };
    })
  );

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
        <PropertyList allProperties={propertiesData} />
      </div>
    </section>
  );
};

export default page;
