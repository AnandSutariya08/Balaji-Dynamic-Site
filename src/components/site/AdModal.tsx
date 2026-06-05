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
  const hasTextContent = showText && (ad.title || ad.description || (ad.link && ad.buttonText));

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-3"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
    >
      {/* Modal auto-sizes to fit the image */}
      <div
        className="relative overflow-hidden rounded-2xl shadow-2xl"
        style={{
          width: "fit-content",
          maxWidth: "min(92vw, 480px)",
          background: hasTextContent ? "#18181b" : "transparent",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close ad"
          className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm transition-colors hover:bg-black/90"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        {/* Image — scales to fit screen, no cropping, no side gaps */}
        {showImage && (
          ad.link ? (
            <a href={ad.link} target="_blank" rel="noopener noreferrer" className="block">
              <img
                src={ad.image}
                alt={ad.title || "Advertisement"}
                style={{
                  display: "block",
                  width: "auto",
                  height: "auto",
                  maxWidth: "min(92vw, 480px)",
                  maxHeight: hasTextContent ? "55vh" : "88vh",
                  borderRadius: hasTextContent ? "1rem 1rem 0 0" : "1rem",
                }}
              />
            </a>
          ) : (
            <img
              src={ad.image}
              alt={ad.title || "Advertisement"}
              style={{
                display: "block",
                width: "auto",
                height: "auto",
                maxWidth: "min(92vw, 480px)",
                maxHeight: hasTextContent ? "55vh" : "88vh",
                borderRadius: hasTextContent ? "1rem 1rem 0 0" : "1rem",
              }}
            />
          )
        )}

        {/* Text content */}
        {hasTextContent && (
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

        {/* Footer text — only if set */}
        {ad.footerText && (
          <div className="border-t border-white/8 px-5 py-2.5">
            <p className="text-[10px] text-zinc-500">{ad.footerText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
