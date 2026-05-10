import { NextResponse } from "next/server";
import { getPublicBlogs } from "@/lib/public-data";

export async function GET() {
  const blogs = await getPublicBlogs();
  return NextResponse.json(blogs);
}
