"use client";

import { useEffect } from "react";
import { saveVisitorRecord } from "@/lib/firestore/visitors";
import { isFirebaseConfigured } from "@/lib/firebase";

const COLLECTED_KEY = "balaji_visitor_collected";

function parseBrowser(ua: string): string {
  if (/Edg\//i.test(ua)) return "Edge";
  if (/OPR\/|Opera/i.test(ua)) return "Opera";
  if (/Chrome\//i.test(ua)) return "Chrome";
  if (/Firefox\//i.test(ua)) return "Firefox";
  if (/Safari\//i.test(ua)) return "Safari";
  return "Other";
}

function parseOS(ua: string): string {
  if (/Windows/i.test(ua)) return "Windows";
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad/i.test(ua)) return "iOS";
  if (/Mac OS X/i.test(ua)) return "macOS";
  if (/Linux/i.test(ua)) return "Linux";
  return "Other";
}

function parseDevice(ua: string): string {
  if (/Mobile|Android|iPhone/i.test(ua)) return "Mobile";
  if (/iPad|Tablet/i.test(ua)) return "Tablet";
  return "Desktop";
}

async function collectAndSave(): Promise<void> {
  if (!isFirebaseConfigured()) return;

  const now = new Date();
  const timestamp = now.toISOString();
  const date = timestamp.slice(0, 10);
  const ua = navigator.userAgent;

  let ip = "", city = "", region = "", country = "", isp = "";
  let lat: number | null = null;
  let lng: number | null = null;
  let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  try {
    const controller = new AbortController();
    const tid = setTimeout(() => controller.abort(), 6000);
    const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
    clearTimeout(tid);
    if (res.ok) {
      const d = await res.json() as Record<string, unknown>;
      ip = String(d.ip ?? "");
      city = String(d.city ?? "");
      region = String(d.region ?? "");
      country = String(d.country_name ?? "");
      lat = d.latitude != null ? Number(d.latitude) : null;
      lng = d.longitude != null ? Number(d.longitude) : null;
      isp = String(d.org ?? "");
      if (d.timezone) timezone = String(d.timezone);
    }
  } catch {
    // IP lookup failed — continue with remaining data
  }

  // Ask browser geolocation permission directly
  try {
    const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: 10000,
        maximumAge: 60000,
      }),
    );
    lat = pos.coords.latitude;
    lng = pos.coords.longitude;
  } catch {
    // Permission denied or unavailable — keep IP-based coords
  }

  await saveVisitorRecord({
    timestamp,
    date,
    site: window.location.hostname,
    url: window.location.pathname,
    referrer: document.referrer,
    browser: parseBrowser(ua),
    os: parseOS(ua),
    device: parseDevice(ua),
    screenW: screen.width,
    screenH: screen.height,
    language: navigator.language,
    timezone,
    ip,
    city,
    region,
    country,
    lat,
    lng,
    isp,
  });
}

export function VisitorCollect() {
  useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) return;
    if (localStorage.getItem(COLLECTED_KEY)) return;
    localStorage.setItem(COLLECTED_KEY, "1");
    collectAndSave().catch(() => {});
  }, []);

  return null;
}
