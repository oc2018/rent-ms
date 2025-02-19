import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  console.log(" Received QStash webhook", data);

  return NextResponse.json({ success: true });
}
