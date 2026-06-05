"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { getActiveAd, type Ad } from "@/lib/firestore/ads";
import { isFirebaseConfigured } from "@/lib/firebase";

const DISMISSED_KEY = "balaji_ad_dismissed_at";
const COOLDOWN_MS = 4 * 60 * 60 * 1000; // 4 hours

function isOnCooldown(): boolean {
  try {
    const ts = localStorage.getItem(DISMISSED_KEY);
    if (!ts) return false;
    return Date.now() - Number(ts) < COOLDOWN_MS;
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    localStorage.setItem(DISMISSED_KEY, String(Date.now()));
  } catch {}
}

export function AdModal() {
  const [ad, setAd] = useState<Ad | null>(null);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  async function loadAndShow() {
    if (!isFirebaseConfigured()) return;
    if (isOnCooldown()) return;
    try {
      const active = await getActiveAd();
      if (!active) return;
      setAd(active);
    } catch {
      // Firestore read failed — skip ad silently
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.pathname.startsWith("/admin")) return;
    if (isOnCooldown()) return;

    showTimerRef.current = setTimeout(() => {
      loadAndShow();
    }, 5000);

    return () => clearTimeout(showTimerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClose() {
    markDismissed();
    setAd(null);
  }

  if (!ad) return null;

  const showImage = (ad.type === "image" || ad.type === "full") && ad.image;
  const showText = ad.type === "text" || ad.type === "full";

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
    >
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl sm:max-w-md">
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close ad"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Image */}
        {showImage && (
          <div className="relative w-full overflow-hidden bg-zinc-800" style={{ aspectRatio: "16/9" }}>
            {ad.link ? (
              <a href={ad.link} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
                <img
                  src={ad.image}
                  alt={ad.title || "Advertisement"}
                  className="h-full w-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </a>
            ) : (
              <img
                src={ad.image}
                alt={ad.title || "Advertisement"}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        )}

        {/* Text content */}
        {showText && (ad.title || ad.description) && (
          <div className="px-5 py-4">
            {ad.title && (
              <h3 className="text-base font-bold text-white">{ad.title}</h3>
            )}
            {ad.description && (
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                {ad.description}
              </p>
            )}
            {ad.link && ad.buttonText && (
              <a
                href={ad.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#AC3C3C] px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#c44040]"
              >
                {ad.buttonText}
              </a>
            )}
          </div>
        )}

        {/* Footer text */}
        {ad.footerText && (
          <div className="border-t border-white/8 px-5 py-2.5">
            <p className="text-[10px] text-zinc-600">{ad.footerText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
