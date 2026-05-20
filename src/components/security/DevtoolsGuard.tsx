"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Detection helpers ───────────────────────────────────────────────────────
   NOTE: Size-based detection (outerWidth vs innerWidth) is intentionally
   removed — it false-positives on mobile/small screens because browser chrome
   (address bar, nav bar, toolbars) creates a naturally large gap that looks
   identical to a docked DevTools panel.
   Only probe-based methods are used — they require the DevTools console to
   actually be evaluating objects, so they never fire on a normal user's device.
─────────────────────────────────────────────────────────────────────────────── */

function detectByConsoleProbe() {
  let hit = false;
  const bait = new Image();
  Object.defineProperty(bait, "id", {
    configurable: true,
    get() { hit = true; return ""; },
  });
  // eslint-disable-next-line no-console
  console.debug(bait);
  return hit;
}

function detectByToString() {
  let hit = false;
  const bait = { toString() { hit = true; return ""; } };
  // eslint-disable-next-line no-console
  console.debug("%s", bait);
  return hit;
}

/* ─── Continuous debugger (runs in a tight loop when DevTools is open) ───────
   When the DevTools panel is open, the JS engine keeps re-pausing here every
   50 ms, making the inspector effectively unusable.
   When DevTools is closed, `debugger` is a no-op.
─────────────────────────────────────────────────────────────────────────────── */
function startDebuggerLoop() {
  /* eslint-disable no-debugger */
  const id = setInterval(() => { debugger; }, 50);
  return () => clearInterval(id);
}

/* ─── Keyboard shortcuts to block ────────────────────────────────────────── */
const BLOCKED_SHORTCUTS = (e: KeyboardEvent): boolean => {
  const k = e.key.toLowerCase();
  const ctrl = e.ctrlKey || e.metaKey;
  const shift = e.shiftKey;
  const alt = e.altKey;

  return (
    k === "f12" ||
    (ctrl && shift && ["i", "j", "c", "k", "e", "m", "p", "s", "u", "f"].includes(k)) ||
    (ctrl && alt  && ["i", "j", "c", "k"].includes(k)) ||
    (ctrl && !shift && !alt && ["u", "s", "p"].includes(k))
  );
};

/* ─── Component ──────────────────────────────────────────────────────────── */
export function DevtoolsGuard() {
  const [blocked, setBlocked] = useState(false);
  const stableCount  = useRef(0);
  const last         = useRef(false);
  const probeTick    = useRef(0);
  const closedTick   = useRef(0);
  const stopDebugger = useRef<(() => void) | null>(null);
  const latestHit    = useRef(false);

  useEffect(() => {
    /* ── Block keyboard shortcuts ── */
    const onKey = (e: KeyboardEvent) => {
      if (BLOCKED_SHORTCUTS(e)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setBlocked(true);
      }
    };

    /* ── Block right-click & context menu ── */
    const onContext = (e: Event) => { e.preventDefault(); e.stopPropagation(); };
    const onMouseDown = (e: MouseEvent) => { if (e.button === 2) e.preventDefault(); };

    /* ── Block touch long-press context menu on mobile ── */
    const onTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement)?.tagName === "IMG") e.preventDefault();
    };

    /* ── Register listeners ── */
    window.addEventListener("keydown",       onKey,        { capture: true });
    window.addEventListener("contextmenu",   onContext,    { capture: true });
    document.addEventListener("contextmenu", onContext,    { capture: true });
    document.addEventListener("mousedown",   onMouseDown,  { capture: true });
    document.addEventListener("touchstart",  onTouchStart, { capture: true, passive: false });

    /* ── Disable text selection globally ── */
    document.body.style.userSelect = "none";
    (document.body.style as CSSStyleDeclaration & { webkitUserSelect: string }).webkitUserSelect = "none";

    /* ── Detection loop — probe only, no size check ── */
    const check = () => {
      if (!document.hasFocus()) return;

      probeTick.current += 1;
      const consoleHit = probeTick.current % 2 === 0 ? detectByConsoleProbe() : false;
      const stringHit  = probeTick.current % 3 === 0 ? detectByToString()     : false;
      const detected   = consoleHit || stringHit;
      latestHit.current = detected;

      if (detected === last.current) {
        stableCount.current += 1;
      } else {
        stableCount.current = 0;
        last.current = detected;
      }

      if (stableCount.current >= 2) {
        if (detected) {
          closedTick.current = 0;
          setBlocked(true);
          if (!stopDebugger.current) {
            stopDebugger.current = startDebuggerLoop();
          }
        } else {
          if (stopDebugger.current) {
            stopDebugger.current();
            stopDebugger.current = null;
          }
          closedTick.current += 1;
          if (closedTick.current >= 20) {
            setBlocked(false);
          }
        }
      }
    };

    const interval = window.setInterval(check, 200);
    check();

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("keydown",      onKey,        { capture: true } as EventListenerOptions);
      window.removeEventListener("contextmenu",  onContext,    { capture: true } as EventListenerOptions);
      document.removeEventListener("contextmenu",onContext,    { capture: true } as EventListenerOptions);
      document.removeEventListener("mousedown",  onMouseDown,  { capture: true } as EventListenerOptions);
      document.removeEventListener("touchstart", onTouchStart, { capture: true } as EventListenerOptions);
      document.body.style.userSelect = "";
      stopDebugger.current?.();
    };
  }, []);

  if (!blocked) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-sm px-4"
      onContextMenu={(e) => e.preventDefault()}
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
          This site is protected. Please close your browser&rsquo;s developer tools
          and all inspection panels to continue.
        </p>

        <button
          type="button"
          onClick={() => {
            if (!latestHit.current) setBlocked(false);
          }}
          className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary/90 active:scale-95"
        >
          I Closed DevTools
        </button>
        <p className="mt-4 text-xs text-white/25">
          Close all panels, then wait 3–4 seconds before clicking.
        </p>
      </div>
    </div>
  );
}
