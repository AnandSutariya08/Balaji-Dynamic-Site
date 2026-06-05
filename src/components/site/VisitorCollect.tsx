"use client";

import { useEffect, useState } from "react";
import { Shield, X } from "lucide-react";
import { saveVisitorRecord } from "@/lib/firestore/visitors";
import { isFirebaseConfigured } from "@/lib/firebase";

const STORAGE_KEY = "balaji_visitor_consent";

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

  try {
    const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: 8000,
        maximumAge: 60000,
      })
    );
    lat = pos.coords.latitude;
    lng = pos.coords.longitude;
  } catch {
    // Geolocation denied or unavailable — use IP-based coords
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
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Don't show in admin area
    if (window.location.pathname.startsWith("/admin")) return;
    const consent = localStorage.getItem(STORAGE_KEY);
    if (consent) return;

    const t = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(t);
  }, []);

  async function handleAllow() {
    setShow(false);
    localStorage.setItem(STORAGE_KEY, "granted");
    try {
      await collectAndSave();
    } catch {
      // Silent fail — analytics should never break the site
    }
  }

  function handleDeny() {
    setShow(false);
    localStorage.setItem(STORAGE_KEY, "denied");
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] w-full max-w-[340px] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
        <button
          type="button"
          onClick={handleDeny}
          aria-label="Dismiss"
          className="absolute right-3 top-3 rounded-lg p-1 text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <div className="p-5 pr-9">
          <div className="mb-3 flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#AC3C3C]/20">
              <Shield className="h-3.5 w-3.5 text-[#e05555]" />
            </div>
            <span className="text-sm font-bold text-white">Help us improve</span>
          </div>
          <p className="mb-4 text-xs leading-relaxed text-zinc-400">
            May we collect anonymous visit data (browser, device, approximate
            location) to understand our visitors better? No personal data is
            stored.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAllow}
              className="flex-1 rounded-xl bg-[#AC3C3C] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#c44040]"
            >
              Allow
            </button>
            <button
              type="button"
              onClick={handleDeny}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-300 transition-colors hover:bg-white/10"
            >
              No thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
