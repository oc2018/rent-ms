"use server";

import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { properties } from "@/database/schema";
import { eq } from "drizzle-orm";

export const createProperty = async (params: PropertyParams) => {
  const session = await auth();

  if (!session) throw new Error("User not authenticated");
  const userId = session?.user?.id;

  const {
    propertyNo,
    propertySize,
    propertyLocation,
    propertyImage,
    rent,
    deposit,
    status,
  } = params;
  try {
    const newProperty = await db
      .insert(properties)
      .values({
        propertyNo,
        propertySize,
        propertyLocation,
        propertyImage,
        propertyOwner: userId!,
        rent,
        deposit,
        status,
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newProperty[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: `An error occrred while entering the property`,
    };
  }
};

export const getPropertyNo = async (
  productId: string
): Promise<string | null> => {
  const result = await db
    .select({ propertyNo: properties.propertyNo })
    .from(properties)
    .where(eq(properties.propertyId, productId))
    .limit(1);

  return result ? result[0].propertyNo : null;
};
