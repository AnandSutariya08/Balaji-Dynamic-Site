import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  createAdminSessionToken,
  getAdminPassword,
  getAdminUsername,
} from "@/lib/auth";

export async function POST(request: Request) {
  const { username, password } = (await request.json()) as {
    username?: string;
    password?: string;
  };

  if (username !== getAdminUsername() || password !== getAdminPassword()) {
    return NextResponse.json(
      { ok: false, message: "Invalid username or password." },
      { status: 401 },
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createAdminSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return NextResponse.json({ ok: true });
}
