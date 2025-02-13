import PropertyCard from "@/components/admin/PropertyCard";
import { db } from "@/database/drizzle";
import { properties, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

const PropertyDetails = async ({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) => {
  const propertyId = (await params).propertyId;

  const propertyDetails = (await db
    .select()
    .from(properties)
    .where(eq(properties.propertyId, propertyId))
    .limit(1)) as Property[];

  if (!propertyDetails) redirect("/404");

  const getOwner = async (owner: string) =>
    (await db
      .select({ fullName: users.fullName })
      .from(users)
      .where(eq(users.id, owner))) as { fullName: string }[];

  const [propertyDetailsData] = await Promise.all(
    propertyDetails.map(async (p) => {
      const owner = await getOwner(p.propertyOwner);

      return {
        propertyNo: p.propertyNo,
        propertySize: p.propertySize,
        propertyImage: p.propertyImage,
        propertyLocation: p.propertyLocation,
        propertyOwner: owner[0].fullName,
        rent: p.rent,
        deposit: p.deposit,
        status: p.status,
      };
    })
  );

  return (
    <>
      <PropertyCard propertyDetails={propertyDetailsData} />
    </>
  );
};

export default PropertyDetails;
