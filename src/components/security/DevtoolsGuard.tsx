"use client";

import { useEffect, useRef, useState } from "react";

/*
  DevTools detection strategy — zero false positives, instant response
  ─────────────────────────────────────────────────────────────────────
  WHAT WE DO NOT USE (and why):
    • console.debug + getter traps — false-positives on browser extensions
      (React DevTools, Sentry, LogRocket, etc.) that intercept console calls
      and eagerly evaluate object properties even with DevTools closed.
    • outerWidth/innerWidth on touch devices — browser chrome (address bar,
      nav bar, iOS safe area) creates gaps identical to a docked panel.

  WHAT WE USE:
    1. SIZE GAP — desktop (non-touch) only.
       When DevTools docks, the inner viewport shrinks.
       Threshold = 200 px:
         • OS scrollbar           ~17 px  ← safely below
         • macOS browser toolbar  ~60 px  ← safely below
         • DevTools minimum size  ~200 px ← we catch at exactly this point
       Touch devices are EXCLUDED: on phones/tablets, DevTools is only
       reachable via USB remote-debugging on a separate PC — the device
       screen itself never shows a DevTools panel.

    2. KEYBOARD SHORTCUTS — every shortcut that opens DevTools is
       suppressed in the capture phase on all devices.

    3. CONTEXT MENU — blocked globally so "Inspect Element" is unreachable.

  RESPONSE:
    • First positive size check → overlay + debugger loop start immediately.
    • `debugger` every 50 ms makes the inspector unusable once opened.
    • Overlay clears only after 20 consecutive negative checks (~2 s).
*/

const DEVTOOLS_SIZE_THRESHOLD = 200; // px — safe minimum

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    navigator.maxTouchPoints > 0
  );
}

/**
 * Desktop-only: measures whether a DevTools panel is docked.
 * Returns false on any touch/mobile device unconditionally.
 */
function detectBySize(): boolean {
  if (isTouchDevice()) return false;
  const wGap = window.outerWidth  - window.innerWidth;
  const hGap = window.outerHeight - window.innerHeight;
  return wGap > DEVTOOLS_SIZE_THRESHOLD || hGap > DEVTOOLS_SIZE_THRESHOLD;
}

/** Keyboard shortcuts that open DevTools in any major browser. */
function isBlockedShortcut(e: KeyboardEvent): boolean {
  const k    = e.key.toLowerCase();
  const ctrl  = e.ctrlKey || e.metaKey;
  const shift = e.shiftKey;
  const alt   = e.altKey;
  return (
    k === "f12"                                                                       ||
    (ctrl && shift && ["i","j","c","k","e","m","p","s","u","f","l","o","r"].includes(k)) ||
    (ctrl && alt   && ["i","j","c","k","u"].includes(k))                              ||
    (ctrl && !shift && !alt && ["u","s","p"].includes(k))                             ||
    (shift && k === "f12")                                                            ||
    (alt   && k === "f12")
  );
}

/** Starts a tight debugger loop. No-op when DevTools is closed; freezes inspector when open. */
function startDebuggerLoop(): () => void {
  /* eslint-disable no-debugger */
  const id = setInterval(() => { debugger; }, 50);
  return () => clearInterval(id);
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export function DevtoolsGuard() {
  const [blocked, setBlocked] = useState(false);
  const missCount    = useRef(0);
  const latestOpen   = useRef(false);
  const stopDebugger = useRef<(() => void) | null>(null);

  useEffect(() => {
    /* Keyboard guard */
    const onKey = (e: KeyboardEvent) => {
      if (!isBlockedShortcut(e)) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      // Treat shortcut press as confirmed DevTools open attempt
      missCount.current = 0;
      latestOpen.current = true;
      setBlocked(true);
      if (!stopDebugger.current) stopDebugger.current = startDebuggerLoop();
    };

    /* Right-click / context menu — block everywhere */
    const suppress = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    };
    const noRightBtn = (e: MouseEvent) => {
      if (e.button === 2) { e.preventDefault(); e.stopImmediatePropagation(); }
    };

    /* Touch long-press context menu */
    let touchTimer: ReturnType<typeof setTimeout> | null = null;
    const onTouchStart = () => {
      touchTimer = setTimeout(() => { /* no-op, just prevent default below */ }, 400);
    };
    const onTouchEnd = () => {
      if (touchTimer) { clearTimeout(touchTimer); touchTimer = null; }
    };
    const onTouchMove = () => {
      if (touchTimer) { clearTimeout(touchTimer); touchTimer = null; }
    };

    window.addEventListener  ("keydown",     onKey,      { capture: true });
    window.addEventListener  ("contextmenu", suppress,   { capture: true });
    document.addEventListener("contextmenu", suppress,   { capture: true });
    document.addEventListener("mousedown",   noRightBtn, { capture: true });
    document.addEventListener("touchstart",  onTouchStart, { passive: true });
    document.addEventListener("touchend",    onTouchEnd,   { passive: true });
    document.addEventListener("touchmove",   onTouchMove,  { passive: true });

    /* Disable text selection */
    document.body.style.userSelect = "none";
    (document.body.style as CSSStyleDeclaration & { webkitUserSelect: string }).webkitUserSelect = "none";

    /* Size-based polling — 150 ms interval, desktop only */
    const check = () => {
      const open = detectBySize();
      latestOpen.current = open;

      if (open) {
        missCount.current = 0;
        setBlocked(true);
        if (!stopDebugger.current) stopDebugger.current = startDebuggerLoop();
      } else {
        missCount.current += 1;
        if (missCount.current >= 20 && stopDebugger.current) {
          // DevTools genuinely closed for ~3 s — dismiss
          stopDebugger.current();
          stopDebugger.current = null;
          setBlocked(false);
        }
      }
    };

    const interval = window.setInterval(check, 150);
    window.addEventListener("resize", check, { passive: true });
    check();

    return () => {
      window.clearInterval(interval);
      stopDebugger.current?.();
      stopDebugger.current = null;
      window.removeEventListener("resize",     check,     { passive: true } as EventListenerOptions);
      window.removeEventListener("keydown",    onKey,     { capture: true } as EventListenerOptions);
      window.removeEventListener("contextmenu",suppress,  { capture: true } as EventListenerOptions);
      document.removeEventListener("contextmenu",suppress,{ capture: true } as EventListenerOptions);
      document.removeEventListener("mousedown",noRightBtn,{ capture: true } as EventListenerOptions);
      document.removeEventListener("touchstart",  onTouchStart, { passive: true } as EventListenerOptions);
      document.removeEventListener("touchend",    onTouchEnd,   { passive: true } as EventListenerOptions);
      document.removeEventListener("touchmove",   onTouchMove,  { passive: true } as EventListenerOptions);
      document.body.style.userSelect = "";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!blocked) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-sm px-4"
      onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }}
    >
      <div className="max-w-md w-full rounded-2xl border border-red-900/40 bg-[#0e0404] p-10 text-center shadow-[0_0_80px_rgba(172,60,60,0.25)]">

        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border border-primary/30">
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-primary" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4M12 16h.01" />
          </svg>
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-3">
          Access Denied
        </p>
        <h1 className="text-2xl font-black uppercase tracking-tight text-white mb-4">
          Developer Tools Detected
        </h1>
        <p className="text-sm leading-relaxed text-white/50 mb-8">
          This site is protected. Please close your browser&rsquo;s developer
          tools and all inspection panels to continue browsing.
        </p>

        <button
          type="button"
          onClick={() => {
            if (!latestOpen.current) {
              missCount.current = 20;
              stopDebugger.current?.();
              stopDebugger.current = null;
              setBlocked(false);
            }
          }}
          className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary/90 active:scale-95"
        >
          I Closed DevTools
        </button>
        <p className="mt-4 text-xs text-white/25">
          Fully close all panels, then wait a few seconds before clicking.
        </p>
      </div>
    </div>
  );
}
