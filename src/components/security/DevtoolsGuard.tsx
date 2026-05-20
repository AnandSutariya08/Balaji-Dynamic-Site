"use client";

import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   STRATEGY — "No inspection in any situation"
   ─────────────────────────────────────────────────────────────────────────
   1. DEBUGGER LOOP starts IMMEDIATELY on mount — before any detection fires.
      `debugger` is a complete no-op when DevTools is closed, so normal users
      see zero effect. The moment DevTools opens (keyboard, menu, any method)
      the NEXT 50 ms tick pauses JS execution, making the inspector unusable.

   2. KEYBOARD SHORTCUTS — every known shortcut that opens DevTools is
      intercepted in the capture phase and suppressed.

   3. CONTEXT MENU / RIGHT-CLICK — blocked globally everywhere so
      "Inspect Element" is never reachable.

   4. SIZE GAP (desktop only) — when DevTools docks, the inner viewport
      shrinks. Threshold 160 px is above OS scrollbar + browser toolbar
      but below the minimum practical DevTools panel. Skipped on
      touch/mobile to prevent false positives from browser chrome.

   5. CONSOLE PROBES — a bait Image and a bait toString object are logged to
      console.debug(). DevTools Console evaluates them, firing our getters.
      Covers undocked DevTools windows, Firebug-style panels, etc.

   Any signal → block shown immediately (no stability delay for detection).
   Overlay stays until 20 consecutive clean checks (~2 s) have passed.
═══════════════════════════════════════════════════════════════════════════ */

/* ─── Helpers ────────────────────────────────────────────────────────────── */

function isTouchDevice(): boolean {
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    navigator.maxTouchPoints > 0
  );
}

function detectBySize(): boolean {
  if (isTouchDevice()) return false;
  const wGap = window.outerWidth  - window.innerWidth;
  const hGap = window.outerHeight - window.innerHeight;
  return wGap > 160 || hGap > 160;
}

function detectByConsoleProbe(): boolean {
  let hit = false;
  const bait = new Image();
  Object.defineProperty(bait, "id", {
    configurable: true,
    get() { hit = true; return "bait"; },
  });
  // eslint-disable-next-line no-console
  console.debug(bait);
  return hit;
}

function detectByToString(): boolean {
  let hit = false;
  const bait = {
    toString() { hit = true; return "bait"; },
    valueOf()  { hit = true; return 0;      },
  };
  // eslint-disable-next-line no-console
  console.debug("%s", bait);
  return hit;
}

function isDevToolsOpen(): boolean {
  return detectBySize() || detectByConsoleProbe() || detectByToString();
}

/* ─── Debugger loop ──────────────────────────────────────────────────────
   Fires every 50 ms. When DevTools is closed → pure no-op, zero cost.
   When DevTools is open → browser pauses JS here every 50 ms, making the
   inspector completely unusable regardless of which panel is active.
─────────────────────────────────────────────────────────────────────────── */
function startDebuggerLoop(): () => void {
  /* eslint-disable no-debugger */
  const id = setInterval(() => { debugger; }, 50);
  return () => clearInterval(id);
}

/* ─── Blocked keyboard shortcuts ─────────────────────────────────────────── */
function isBlockedShortcut(e: KeyboardEvent): boolean {
  const k    = e.key.toLowerCase();
  const ctrl  = e.ctrlKey || e.metaKey;
  const shift = e.shiftKey;
  const alt   = e.altKey;

  return (
    k === "f12" ||
    // All common DevTools open shortcuts
    (ctrl && shift && ["i", "j", "c", "k", "e", "m", "p", "s", "u", "f", "l", "o", "r"].includes(k)) ||
    (ctrl && alt   && ["i", "j", "c", "k", "u"].includes(k)) ||
    // View source / save / print
    (ctrl && !shift && !alt && ["u", "s", "p"].includes(k)) ||
    // Safari / Firefox specific
    (alt  && k === "f12") ||
    (shift && k === "f12")
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
export function DevtoolsGuard() {
  const [blocked, setBlocked] = useState(false);
  const missCount   = useRef(0);
  const latestOpen  = useRef(false);
  // stopDebugger is initialised in useEffect — loop starts on mount
  const stopDebugger = useRef<(() => void) | null>(null);

  useEffect(() => {
    /* ── 1. Start debugger loop IMMEDIATELY — no detection required ── */
    stopDebugger.current = startDebuggerLoop();

    /* ── 2. Keyboard shortcut guard ── */
    const onKey = (e: KeyboardEvent) => {
      if (isBlockedShortcut(e)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        latestOpen.current = true;
        missCount.current  = 0;
        setBlocked(true);
      }
    };

    /* ── 3. Block ALL context menus / right-click everywhere ── */
    const suppress = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    };
    const noRightBtn = (e: MouseEvent) => {
      if (e.button === 2) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };
    /* ── 4. Block touch long-press (context menu on mobile) ── */
    const noLongPress = (e: TouchEvent) => {
      e.preventDefault();
    };

    /* ── Register listeners at capture phase ── */
    window.addEventListener  ("keydown",     onKey,       { capture: true });
    window.addEventListener  ("contextmenu", suppress,    { capture: true });
    document.addEventListener("contextmenu", suppress,    { capture: true });
    document.addEventListener("mousedown",   noRightBtn,  { capture: true });
    document.addEventListener("touchstart",  noLongPress, { capture: true, passive: false });

    /* ── Disable text selection & drag ── */
    document.body.style.userSelect = "none";
    (document.body.style as CSSStyleDeclaration & { webkitUserSelect: string }).webkitUserSelect = "none";
    document.body.setAttribute("ondragstart", "return false");
    document.body.setAttribute("onselectstart", "return false");

    /* ── 5. Detection loop at 100 ms — triggers on FIRST hit ── */
    const check = () => {
      const open = isDevToolsOpen();
      latestOpen.current = open;

      if (open) {
        missCount.current = 0;
        setBlocked(true);           // immediate — no stability wait
      } else {
        missCount.current += 1;
        // Unblock only after ~2 s of consecutive clean checks
        if (missCount.current >= 20) {
          setBlocked(false);
        }
      }
    };

    const interval = window.setInterval(check, 100);
    window.addEventListener("resize", check, { passive: true });
    check(); // immediate first check

    return () => {
      window.clearInterval(interval);
      stopDebugger.current?.();
      stopDebugger.current = null;
      window.removeEventListener("resize",      check,      { passive: true } as EventListenerOptions);
      window.removeEventListener("keydown",     onKey,      { capture: true } as EventListenerOptions);
      window.removeEventListener("contextmenu", suppress,   { capture: true } as EventListenerOptions);
      document.removeEventListener("contextmenu",suppress,  { capture: true } as EventListenerOptions);
      document.removeEventListener("mousedown", noRightBtn, { capture: true } as EventListenerOptions);
      document.removeEventListener("touchstart",noLongPress,{ capture: true } as EventListenerOptions);
      document.body.style.userSelect = "";
      document.body.removeAttribute("ondragstart");
      document.body.removeAttribute("onselectstart");
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
