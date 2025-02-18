import { NextResponse } from "next/server";
import { properties } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db
      .select({
        propertyNo: properties.propertyNo,
        propertyId: properties.propertyId,
      })
      .from(properties)
      .where(eq(properties.status, "VACANT"));

    console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "failed tofetch vacant properties" },
      { status: 500 }
    );
  }
}
