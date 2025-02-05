"use server";

import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { properties } from "@/database/schema";

export const createProperty = async (params: PropertyParams) => {
  const session = await auth();

  if (!session) throw new Error("User not authenticated");
  const userId = session?.user?.id;

  const {
    propertyId,
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
        propertyId,
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
