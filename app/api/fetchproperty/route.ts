import { db } from "@/database/drizzle";
import { allocation } from "@/database/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { tenantId } = (await req.json()) as { tenantId: string };

  const result = await db
    .select({ propertyId: allocation.propertyId })
    .from(allocation)
    .where(eq(allocation.tenantId, tenantId));

  return NextResponse.json(result);
}
