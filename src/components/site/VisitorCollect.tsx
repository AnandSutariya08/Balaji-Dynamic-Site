"use client";

import { useEffect, useState } from "react";
import { Shield } from "lucide-react";
import { saveVisitorRecord } from "@/lib/firestore/visitors";
import { isFirebaseConfigured } from "@/lib/firebase";

const CONSENT_KEY = "balaji_visitor_consent";

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

  // Ask for precise browser geolocation (may trigger browser permission dialog)
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
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) return;
    if (localStorage.getItem(CONSENT_KEY)) return;
    const t = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(t);
  }, []);

  async function handleOkay() {
    setShow(false);
    localStorage.setItem(CONSENT_KEY, "granted");
    // Signal AdModal to start its 3-second timer
    window.dispatchEvent(new CustomEvent("visitor-consent-given"));
    // Collect and save in background — does not block UI
    collectAndSave().catch(() => {});
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/8 px-6 py-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#AC3C3C]/20">
            <Shield className="h-4 w-4 text-[#e05555]" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Your Privacy</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Balaji Engineering Works</div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-sm leading-relaxed text-zinc-400">
            We collect anonymous visit information — such as your browser,
            device type, and approximate location — to understand our visitors
            and improve this website. No personal data is stored or shared.
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-white/8 px-6 py-4">
          <button
            type="button"
            onClick={handleOkay}
            className="w-full rounded-xl bg-[#AC3C3C] py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#c44040] active:scale-[0.98]"
          >
            Okay, Got It
          </button>
        </div>
      </div>
    </div>
  );
}
