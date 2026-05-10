import { NextResponse } from "next/server";
import { refreshPublicCache } from "@/lib/public-data";

export async function POST() {
  refreshPublicCache();
  return NextResponse.json({ ok: true });
}
