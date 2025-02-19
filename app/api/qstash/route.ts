import { NextResponse } from "next/server";
import { createSchedule } from "@/lib/admin/actions/qstash";

export async function POST() {
  try {
    const response = await createSchedule();
    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
