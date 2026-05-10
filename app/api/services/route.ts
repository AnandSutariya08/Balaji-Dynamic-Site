import { NextResponse } from "next/server";
import { getPublicServices } from "@/lib/public-data";

export async function GET() {
  const services = await getPublicServices();
  return NextResponse.json(services);
}
