"use client";

import { useEffect, useRef, useState } from "react";

/*
  ╔══════════════════════════════════════════════════════════════════════════╗
  ║  DevTools detection — production-safe, zero false-positives             ║
  ╠══════════════════════════════════════════════════════════════════════════╣
  ║  WHY `(new Function('debugger'))()` INSTEAD OF `debugger;`             ║
  ║    Next.js 15 uses the SWC compiler for production bundles.             ║
  ║    SWC (and Terser) have `drop_debugger: true` by default — they        ║
  ║    silently strip every `debugger;` keyword before the code ships.      ║
  ║    `(new Function('debugger'))()` is a runtime string evaluation.       ║
  ║    No minifier touches string arguments to `new Function`, so the       ║
  ║    debugger call survives into the production bundle intact.            ║
  ║    Chrome/Firefox/Safari DevTools intercept it identically to the       ║
  ║    literal `debugger` keyword.                                          ║
  ║                                                                          ║
  ║  SIGNAL 1 — SIZE GAP  (desktop / non-touch only)                        ║
  ║    Docked DevTools shrinks the inner viewport.                          ║
  ║    outerWidth/Height − innerWidth/Height > 200 px → detected.          ║
  ║    Skipped on touch devices: OS chrome (address bar, safe-area, nav    ║
  ║    bar) creates identical gaps that are not DevTools.                   ║
  ║                                                                          ║
  ║  SIGNAL 2 — DEBUGGER TIMING  (desktop / non-touch only)                ║
  ║    Covers undocked / separate-window DevTools where the viewport gap    ║
  ║    is zero.  We call the debugger every 150 ms and measure elapsed      ║
  ║    time.  When DevTools is open and intercepts the call, execution       ║
  ║    pauses — elapsed > 80 ms → detected.                                 ║
  ║    Also works when DevTools is already open before the page loads:      ║
  ║    the very first check on mount fires the call and catches it.         ║
  ║                                                                          ║
  ║  SIGNAL 3 — KEYBOARD SHORTCUTS                                          ║
  ║    Every shortcut that opens DevTools is blocked in the capture phase.  ║
  ║    Pressing one is itself counted as a detection.                       ║
  ║                                                                          ║
  ║  SIGNAL 4 — CONTEXT MENU / RIGHT-CLICK                                  ║
  ║    Blocked globally — "Inspect Element" is unreachable.                 ║
  ║                                                                          ║
  ║  RESPONSE                                                                ║
  ║    Detection → overlay + 50 ms debugger loop (makes inspector           ║
  ║    completely unusable; pauses JS 20× per second).                      ║
  ║    Overlay clears only after ~3 s of consecutive clean checks.          ║
  ║                                                                          ║
  ║  MOBILE / TABLETS (iOS, Android, Samsung Fold/Flip, iPad)              ║
  ║    DevTools on those devices requires USB remote-debugging on a PC.     ║
  ║    The device screen never shows a DevTools panel.                      ║
  ║    Signals 1 & 2 are skipped → zero false positives on mobile.         ║
  ╚══════════════════════════════════════════════════════════════════════════╝
*/

const SIZE_THRESHOLD   = 200; // px
const TIMING_THRESHOLD = 80;  // ms

/**
 * Calls `debugger` at runtime without using the literal keyword.
 * `new Function('debugger')` compiles to a function containing the
 * debugger statement, which survives SWC / Terser minification because
 * minifiers never rewrite string arguments to the Function constructor.
 */
const callDebugger: () => void = new Function("debugger") as () => void;

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    navigator.maxTouchPoints > 0
  );
}

/** Signal 1: docked panel shrinks the inner viewport. Desktop only. */
function detectBySize(): boolean {
  if (isTouchDevice()) return false;
  const wGap = window.outerWidth  - window.innerWidth;
  const hGap = window.outerHeight - window.innerHeight;
  return wGap > SIZE_THRESHOLD || hGap > SIZE_THRESHOLD;
}

/**
 * Signal 2: any DevTools (docked, undocked, pre-opened before page load)
 * intercepts the debugger call and pauses JS execution.
 * We measure how long the pause was — > 80 ms means DevTools was open.
 * Desktop only.
 */
function detectByDebuggerTiming(): boolean {
  if (isTouchDevice()) return false;
  const t = performance.now();
  callDebugger();
  return (performance.now() - t) > TIMING_THRESHOLD;
}

function isDevToolsOpen(): boolean {
  return detectBySize() || detectByDebuggerTiming();
}

/**
 * Aggressive loop: fires the debugger call every 50 ms.
 * Once active, any open DevTools panel pauses JS 20× per second —
 * stepping, inspecting, and navigating the inspector become unusable.
 */
function startDebuggerLoop(): () => void {
  const id = setInterval(callDebugger, 50);
  return () => clearInterval(id);
}

/** Every keyboard shortcut known to open DevTools in any major browser. */
function isBlockedShortcut(e: KeyboardEvent): boolean {
  const k     = e.key.toLowerCase();
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

    /* ── Disable text selection and drag ── */
    document.body.style.userSelect = "none";
    (document.body.style as CSSStyleDeclaration & { webkitUserSelect: string }).webkitUserSelect = "none";

    /* ── Main detection poll — 150 ms ── */
    const check = () => {
      const open = isDevToolsOpen();
      latestOpen.current = open;

      if (open) {
        missCount.current = 0;
        setBlocked(true);
        if (!stopDebugger.current) stopDebugger.current = startDebuggerLoop();
      } else {
        missCount.current += 1;
        // Require ~3 s of clean checks before dismissing (prevents rapid reopen bypass)
        if (missCount.current >= 20 && stopDebugger.current) {
          stopDebugger.current();
          stopDebugger.current = null;
          setBlocked(false);
        }
      }
    };

    const interval = window.setInterval(check, 150);
    window.addEventListener("resize", check, { passive: true });
    check(); // fire immediately — catches DevTools already open before page loaded

    return () => {
      window.clearInterval(interval);
      stopDebugger.current?.();
      stopDebugger.current = null;
      window.removeEventListener("resize",      check,      { passive: true } as EventListenerOptions);
      window.removeEventListener("keydown",     onKey,      { capture: true } as EventListenerOptions);
      window.removeEventListener("contextmenu", suppress,   { capture: true } as EventListenerOptions);
      document.removeEventListener("contextmenu",suppress,  { capture: true } as EventListenerOptions);
      document.removeEventListener("mousedown", noRightBtn, { capture: true } as EventListenerOptions);
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
