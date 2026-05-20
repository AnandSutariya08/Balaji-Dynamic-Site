"use client";

import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   DETECTION STRATEGY
   ─────────────────────────────────────────────────────────────────────────
   Three independent signals — any one positive = DevTools is open:

   1. SIZE GAP  (desktop only, never on touch devices)
      window.outerWidth/Height vs window.innerWidth/Height.
      When DevTools is docked, the inner viewport shrinks.
      Threshold 160 px — well above OS scrollbar (~17 px) and browser
      toolbar chrome on desktop, well below the minimum practical panel size.
      Skipped entirely on phones/tablets: their browser chrome (address bar,
      nav bar) creates a naturally large gap that looks identical to DevTools.

   2. CONSOLE PROBE  (all devices)
      Logs a bait Image object to console.debug(). When DevTools Console
      panel is active, the browser evaluates the object's properties for
      display, firing our getter → detected.

   3. TO-STRING PROBE  (all devices)
      Logs "%s" + bait object. DevTools formats the string by calling
      toString() → detected. Catches Firefox and Edge on Console tab.

   Together these cover:
     • Any docked/undocked DevTools panel (Elements, Network, etc.) → SIZE
     • Console tab open → PROBE + TO-STRING
     • Undocked pop-out window (no size change) with Console open → PROBE

   Once any signal fires for 2 consecutive checks (400 ms total),
   the overlay appears AND the debugger loop starts.
═══════════════════════════════════════════════════════════════════════════ */

/** True on phones / tablets — browser chrome creates large outer/inner gaps. */
function isTouchDevice(): boolean {
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    navigator.maxTouchPoints > 0
  );
}

/**
 * Size-based detection — desktop only.
 * DevTools minimum docked size is ~200 px; 160 px threshold keeps us
 * well away from OS scrollbars (~17 px) and browser toolbars (~60 px).
 */
function detectBySize(): boolean {
  if (isTouchDevice()) return false;
  const wGap = window.outerWidth  - window.innerWidth;
  const hGap = window.outerHeight - window.innerHeight;
  return wGap > 160 || hGap > 160;
}

/** Console-probe: getter fires when DevTools Console renders the object. */
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

/** toString-probe: DevTools calls toString() when formatting "%s" strings. */
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

/** Returns true if ANY detection method fires. */
function isDevToolsOpen(): boolean {
  return detectBySize() || detectByConsoleProbe() || detectByToString();
}

/* ─── Debugger loop ──────────────────────────────────────────────────────
   Once started, `debugger` fires every 50 ms.
   • DevTools closed → no-op, zero overhead.
   • DevTools open   → browser pauses JS execution at every tick, making
     the inspector completely unusable (can't read variables, can't step,
     can't evaluate anything without immediately re-pausing).
─────────────────────────────────────────────────────────────────────────── */
function startDebuggerLoop(): () => void {
  /* eslint-disable no-debugger */
  const id = setInterval(() => { debugger; }, 50);
  return () => clearInterval(id);
}

/* ─── Keyboard shortcuts to block ──────────────────────────────────────── */
function isBlockedShortcut(e: KeyboardEvent): boolean {
  const k    = e.key.toLowerCase();
  const ctrl  = e.ctrlKey || e.metaKey;
  const shift = e.shiftKey;
  const alt   = e.altKey;

  return (
    k === "f12" ||
    // Inspector / Console / Elements / Sources / Network / Performance
    (ctrl && shift && ["i", "j", "c", "k", "e", "m", "p", "s", "u", "f"].includes(k)) ||
    (ctrl && alt   && ["i", "j", "c", "k"].includes(k)) ||
    // View-source / Save / Print
    (ctrl && !shift && !alt && ["u", "s", "p"].includes(k))
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
export function DevtoolsGuard() {
  const [blocked, setBlocked]   = useState(false);

  const consecutiveHits = useRef(0);   // how many checks in a row returned true
  const consecutiveMiss = useRef(0);   // how many checks in a row returned false
  const stopDebugger    = useRef<(() => void) | null>(null);
  const latestOpen      = useRef(false);

  useEffect(() => {
    /* ── Keyboard shortcut guard ── */
    const onKey = (e: KeyboardEvent) => {
      if (isBlockedShortcut(e)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        // Treat shortcut press as a confirmed detection signal immediately
        consecutiveHits.current = 99;
        activate();
      }
    };

    /* ── Context menu / right-click ── */
    const suppress = (e: Event) => { e.preventDefault(); e.stopPropagation(); };
    const noRightBtn = (e: MouseEvent) => { if (e.button === 2) e.preventDefault(); };

    /* ── Mobile long-press on images ── */
    const noImgPress = (e: TouchEvent) => {
      if ((e.target as HTMLElement)?.tagName === "IMG") e.preventDefault();
    };

    window.addEventListener("keydown",       onKey,      { capture: true });
    window.addEventListener("contextmenu",   suppress,   { capture: true });
    document.addEventListener("contextmenu", suppress,   { capture: true });
    document.addEventListener("mousedown",   noRightBtn, { capture: true });
    document.addEventListener("touchstart",  noImgPress, { capture: true, passive: false });

    /* ── Disable text selection ── */
    document.body.style.userSelect = "none";
    (document.body.style as CSSStyleDeclaration & { webkitUserSelect: string }).webkitUserSelect = "none";

    /* ── Activate block + debugger loop ── */
    function activate() {
      consecutiveMiss.current = 0;
      latestOpen.current = true;
      setBlocked(true);
      if (!stopDebugger.current) {
        stopDebugger.current = startDebuggerLoop();
      }
    }

    /* ── Deactivate (only after DevTools has been closed for ~4 s) ── */
    function deactivate() {
      stopDebugger.current?.();
      stopDebugger.current = null;
      latestOpen.current = false;
      setBlocked(false);
      consecutiveHits.current = 0;
    }

    /* ── Main polling check every 200 ms ── */
    const check = () => {
      const open = isDevToolsOpen();
      latestOpen.current = open;

      if (open) {
        consecutiveHits.current += 1;
        consecutiveMiss.current  = 0;
        // Block after 2 consecutive positive checks (400 ms) to avoid noise
        if (consecutiveHits.current >= 2) {
          activate();
        }
      } else {
        consecutiveMiss.current += 1;
        consecutiveHits.current  = 0;
        // Only unblock after 20 consecutive negative checks (~4 s)
        // so briefly closing and reopening DevTools doesn't dismiss the overlay
        if (consecutiveMiss.current >= 20 && blocked) {
          deactivate();
        }
      }
    };

    const interval = window.setInterval(check, 200);
    window.addEventListener("resize", check, { passive: true });
    check(); // run immediately on mount

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("resize",      check,     { passive: true } as EventListenerOptions);
      window.removeEventListener("keydown",     onKey,     { capture: true } as EventListenerOptions);
      window.removeEventListener("contextmenu", suppress,  { capture: true } as EventListenerOptions);
      document.removeEventListener("contextmenu",suppress, { capture: true } as EventListenerOptions);
      document.removeEventListener("mousedown", noRightBtn,{ capture: true } as EventListenerOptions);
      document.removeEventListener("touchstart",noImgPress,{ capture: true } as EventListenerOptions);
      document.body.style.userSelect = "";
      stopDebugger.current?.();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!blocked) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-sm px-4"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="max-w-md w-full rounded-2xl border border-red-900/40 bg-[#0e0404] p-10 text-center shadow-[0_0_80px_rgba(172,60,60,0.25)]">

        {/* Shield icon */}
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
            // Only dismiss if DevTools is actually closed right now
            if (!latestOpen.current) {
              setBlocked(false);
              stopDebugger.current?.();
              stopDebugger.current = null;
            }
          }}
          className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary/90 active:scale-95"
        >
          I Closed DevTools
        </button>
        <p className="mt-4 text-xs text-white/25">
          Fully close all panels, then wait 3–4 seconds before clicking.
        </p>
      </div>
    </div>
  );
}
