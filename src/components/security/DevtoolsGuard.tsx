"use client";

import { useEffect, useRef, useState } from "react";

/*
  ╔══════════════════════════════════════════════════════════════════════════╗
  ║  DevTools detection — zero false-positives on any device                ║
  ╠══════════════════════════════════════════════════════════════════════════╣
  ║  SIGNAL 1 — SIZE GAP  (desktop / non-touch only)                        ║
  ║    When DevTools is DOCKED the inner viewport shrinks.                   ║
  ║    outerWidth/Height − innerWidth/Height > 200 px                       ║
  ║    • OS scrollbar   ≈ 17 px  → safely below threshold                   ║
  ║    • Browser chrome ≈ 60 px  → safely below threshold                   ║
  ║    • DevTools min   ≈ 200 px → caught at exactly this point             ║
  ║    Skipped on touch devices: phone/tablet browser chrome (address bar,  ║
  ║    nav bar, safe-area) creates identical gaps that aren't DevTools.      ║
  ║                                                                          ║
  ║  SIGNAL 2 — DEBUGGER TIMING  (desktop / non-touch only)                ║
  ║    When DevTools is UNDOCKED (separate window) the viewport does NOT     ║
  ║    shrink, so signal 1 misses it.  Instead, we call `debugger` and      ║
  ║    measure how long execution was paused:                                ║
  ║      • DevTools closed          → no-op, elapsed ≈ 0 ms                ║
  ║      • DevTools open, default   → pauses here, elapsed = hundreds ms    ║
  ║    When elapsed > 80 ms we know DevTools intercepted the statement.     ║
  ║    Calling `debugger` every 150 ms (the poll interval) also means the   ║
  ║    inspector is immediately painful the moment it's opened.              ║
  ║    Skipped on touch devices — no false positives.                        ║
  ║                                                                          ║
  ║  SIGNAL 3 — KEYBOARD SHORTCUTS                                          ║
  ║    Every shortcut that opens DevTools is suppressed (capture phase).    ║
  ║    Triggering one counts as a confirmed detection.                       ║
  ║                                                                          ║
  ║  SIGNAL 4 — CONTEXT MENU / RIGHT-CLICK                                  ║
  ║    Blocked globally — "Inspect Element" is unreachable.                 ║
  ║                                                                          ║
  ║  RESPONSE                                                                ║
  ║    Any signal fires → overlay appears + 50 ms debugger loop starts.     ║
  ║    Loop makes the inspector completely unusable (pauses every 50 ms).   ║
  ║    Dismissal verified live — button does nothing while DevTools is open.║
  ║                                                                          ║
  ║  MOBILE / TABLETS (iOS, Android, Samsung Fold/Flip, iPad, etc.)        ║
  ║    DevTools on those devices requires a USB cable + Chrome's remote     ║
  ║    inspector on a PC — the device screen itself never shows a panel.    ║
  ║    Signals 1 & 2 are skipped entirely → zero false positives.          ║
  ╚══════════════════════════════════════════════════════════════════════════╝
*/

const SIZE_THRESHOLD   = 200; // px — minimum safe gap for a docked DevTools panel
const TIMING_THRESHOLD = 80;  // ms — minimum pause to consider `debugger` was intercepted

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    navigator.maxTouchPoints > 0
  );
}

/** Signal 1: docked panel shrinks inner viewport. Desktop only. */
function detectBySize(): boolean {
  if (isTouchDevice()) return false;
  const wGap = window.outerWidth  - window.innerWidth;
  const hGap = window.outerHeight - window.innerHeight;
  return wGap > SIZE_THRESHOLD || hGap > SIZE_THRESHOLD;
}

/**
 * Signal 2: undocked/separate-window DevTools intercepts the `debugger`
 * statement and pauses JS execution. We measure that pause.
 * Also acts as a passive deterrent: every 150 ms poll, `debugger` fires —
 * the inspector is immediately painful the moment it's opened.
 * Desktop only.
 */
function detectByDebuggerTiming(): boolean {
  if (isTouchDevice()) return false;
  const t = performance.now();
  /* eslint-disable no-debugger */
  debugger;
  return (performance.now() - t) > TIMING_THRESHOLD;
}

function isDevToolsOpen(): boolean {
  return detectBySize() || detectByDebuggerTiming();
}

/**
 * Once DevTools is confirmed open, this loop fires `debugger` every 50 ms.
 * Any tab that is open in DevTools pauses JS here every 50 ms, making
 * inspection and stepping completely unusable.
 */
function startDebuggerLoop(): () => void {
  /* eslint-disable no-debugger */
  const id = setInterval(() => { debugger; }, 50);
  return () => clearInterval(id);
}

/** Every keyboard shortcut known to open DevTools in any major browser. */
function isBlockedShortcut(e: KeyboardEvent): boolean {
  const k    = e.key.toLowerCase();
  const ctrl  = e.ctrlKey || e.metaKey;
  const shift = e.shiftKey;
  const alt   = e.altKey;
  return (
    k === "f12"                                                                            ||
    (ctrl && shift && ["i","j","c","k","e","m","p","s","u","f","l","o","r"].includes(k)) ||
    (ctrl && alt   && ["i","j","c","k","u"].includes(k))                                  ||
    (ctrl && !shift && !alt && ["u","s","p"].includes(k))                                 ||
    (shift && k === "f12")                                                                 ||
    (alt   && k === "f12")
  );
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export function DevtoolsGuard() {
  const [blocked, setBlocked] = useState(false);
  const missCount    = useRef(0);
  const latestOpen   = useRef(false);
  const stopDebugger = useRef<(() => void) | null>(null);

  useEffect(() => {
    /* ── Keyboard guard ── */
    const onKey = (e: KeyboardEvent) => {
      if (!isBlockedShortcut(e)) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      missCount.current  = 0;
      latestOpen.current = true;
      setBlocked(true);
      if (!stopDebugger.current) stopDebugger.current = startDebuggerLoop();
    };

    /* ── Context menu — blocked everywhere ── */
    const suppress = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    };
    const noRightBtn = (e: MouseEvent) => {
      if (e.button === 2) { e.preventDefault(); e.stopImmediatePropagation(); }
    };

    window.addEventListener  ("keydown",     onKey,      { capture: true });
    window.addEventListener  ("contextmenu", suppress,   { capture: true });
    document.addEventListener("contextmenu", suppress,   { capture: true });
    document.addEventListener("mousedown",   noRightBtn, { capture: true });

    /* ── Disable text selection ── */
    document.body.style.userSelect = "none";
    (document.body.style as CSSStyleDeclaration & { webkitUserSelect: string }).webkitUserSelect = "none";

    /* ── Main detection poll — 150 ms ── */
    const check = () => {
      // isDevToolsOpen() calls detectByDebuggerTiming() which calls `debugger`.
      // If DevTools is open, execution pauses there, then resumes.
      // elapsed > 80 ms means DevTools intercepted it → detected.
      const open = isDevToolsOpen();
      latestOpen.current = open;

      if (open) {
        missCount.current = 0;
        setBlocked(true);
        // Start aggressive 50 ms loop so the inspector is completely unusable
        if (!stopDebugger.current) stopDebugger.current = startDebuggerLoop();
      } else {
        missCount.current += 1;
        // Unblock only after ~3 s of clean checks (prevents "quickly reopen" bypass)
        if (missCount.current >= 20 && stopDebugger.current) {
          stopDebugger.current();
          stopDebugger.current = null;
          setBlocked(false);
        }
      }
    };

    const interval = window.setInterval(check, 150);
    window.addEventListener("resize", check, { passive: true });
    check(); // run immediately on mount

    return () => {
      window.clearInterval(interval);
      stopDebugger.current?.();
      stopDebugger.current = null;
      window.removeEventListener("resize",      check,     { passive: true } as EventListenerOptions);
      window.removeEventListener("keydown",     onKey,     { capture: true } as EventListenerOptions);
      window.removeEventListener("contextmenu", suppress,  { capture: true } as EventListenerOptions);
      document.removeEventListener("contextmenu",suppress, { capture: true } as EventListenerOptions);
      document.removeEventListener("mousedown", noRightBtn,{ capture: true } as EventListenerOptions);
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
