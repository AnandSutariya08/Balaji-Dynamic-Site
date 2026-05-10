import "server-only";

import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const SESSION_COOKIE = "balaji_admin_session";
const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "change-this-password";
const DEFAULT_SECRET = "change-this-session-secret";

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || DEFAULT_SECRET;
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function getAdminUsername() {
  return process.env.ADMIN_USERNAME || DEFAULT_USERNAME;
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
}

export function areDefaultAdminCredentials() {
  return (
    getAdminUsername() === DEFAULT_USERNAME ||
    getAdminPassword() === DEFAULT_PASSWORD ||
    getSecret() === DEFAULT_SECRET
  );
}

export function createAdminSessionToken() {
  const payload = `admin:${Date.now()}`;
  return `${payload}.${sign(payload)}`;
}

export function isValidAdminSessionToken(token: string) {
  const lastDot = token.lastIndexOf(".");
  if (lastDot <= 0) return false;

  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);
  if (!payload.startsWith("admin:") || !signature) return false;

  const expected = sign(payload);

  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return token ? isValidAdminSessionToken(token) : false;
}

export { SESSION_COOKIE };
