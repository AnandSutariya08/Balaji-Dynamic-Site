"use client";

import { useEffect, useRef, useState } from "react";

function isDesktopLike() {
  if (typeof window === "undefined") return false;
  const finePointer = window.matchMedia?.("(pointer: fine)").matches ?? false;
  const hover = window.matchMedia?.("(hover: hover)").matches ?? false;
  // Avoid false positives on iOS/Android by relying on input capabilities, not viewport size.
  // This still runs on desktop even when DevTools is emulating a mobile viewport.
  return finePointer && hover;
}

function detectDevtoolsOpen(threshold = 160) {
  // Best-effort only; cannot be relied upon for real security.
  const widthDiff = Math.abs(window.outerWidth - window.innerWidth);
  const heightDiff = Math.abs(window.outerHeight - window.innerHeight);
  return widthDiff > threshold || heightDiff > threshold;
}

function detectDevtoolsOpenViaConsoleProbe() {
  // Best-effort heuristic: when DevTools console is open, Chrome/Edge often touches logged objects.
  // This triggers a getter and flips the flag.
  let touched = false;
  const bait = new Image();
  Object.defineProperty(bait, "id", {
    configurable: true,
    get() {
      touched = true;
      return "";
    },
  });
  // Use debug to avoid noisy logs in normal view; still may show in console.
  // eslint-disable-next-line no-console
  console.debug(bait);
  return touched;
}

function detectDevtoolsOpenViaToString() {
  // Another best-effort heuristic: DevTools sometimes stringifies logged objects.
  let touched = false;
  const bait = {
    toString() {
      touched = true;
      return "";
    },
  };
  // eslint-disable-next-line no-console
  console.debug("%s", bait);
  return touched;
}

export function DevtoolsGuard() {
  const [open, setOpen] = useState(false);
  const stableCount = useRef(0);
  const last = useRef(false);
  const probeTick = useRef(0);
  const closedStable = useRef(0);
  const latestDetected = useRef(false);

  useEffect(() => {
    // Note: This is best-effort UI gating only. It does not provide real security.
    if (!isDesktopLike()) return;

    const preventKeys = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const ctrlOrCmd = event.ctrlKey || event.metaKey;
      const shift = event.shiftKey;
      const alt = event.altKey;

      const blocked =
        key === "f12" ||
        (ctrlOrCmd && shift && (key === "i" || key === "j" || key === "c")) ||
        (ctrlOrCmd && alt && (key === "i" || key === "j" || key === "c")) ||
        (ctrlOrCmd && key === "u");

      if (blocked) {
        event.preventDefault();
        event.stopPropagation();
        setOpen(true);
      }
    };

    const preventContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    window.addEventListener("keydown", preventKeys, { capture: true });
    window.addEventListener("contextmenu", preventContextMenu, { capture: true });
    document.addEventListener("contextmenu", preventContextMenu, { capture: true });
    document.addEventListener("mousedown", (event) => {
      if (event.button === 2) event.preventDefault();
    }, { capture: true });

    const check = () => {
      if (!document.hasFocus()) return;
      // Combine heuristics. Console probe is run less frequently to avoid spam.
      probeTick.current += 1;
      const consoleProbe =
        probeTick.current % 2 === 0 ? detectDevtoolsOpenViaConsoleProbe() : false;
      const stringifyProbe =
        probeTick.current % 3 === 0 ? detectDevtoolsOpenViaToString() : false;
      const detected = detectDevtoolsOpen(160) || consoleProbe || stringifyProbe;
      latestDetected.current = detected;
      if (detected === last.current) {
        stableCount.current += 1;
      } else {
        stableCount.current = 0;
        last.current = detected;
      }
      // Require a few stable ticks to avoid layout/resize jitter.
      if (stableCount.current >= 2) {
        if (detected) {
          closedStable.current = 0;
          setOpen(true);
        } else {
          // Latch the warning: only close after multiple consecutive "closed" detections
          // to avoid users bypassing via refresh / heuristic flakiness.
          closedStable.current += 1;
          if (closedStable.current >= 10) {
            setOpen(false);
          }
        }
      }
    };

    const interval = window.setInterval(check, 250);
    window.addEventListener("resize", check, { passive: true });
    // Run immediately so navigating with DevTools already open is caught quickly.
    check();

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("resize", check as any);
      window.removeEventListener("keydown", preventKeys, { capture: true } as any);
      window.removeEventListener("contextmenu", preventContextMenu, { capture: true } as any);
      document.removeEventListener("contextmenu", preventContextMenu, { capture: true } as any);
    };
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f7f5f1] px-4">
      <div className="max-w-lg rounded-3xl border border-black/10 bg-white p-10 text-center shadow-lg">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
          Security Notice
        </p>
        <h1 className="mt-4 text-3xl font-black uppercase tracking-tight text-[#1a1a1a]">
          Close DevTools to Preview
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-500">
          Please close your browser developer tools to continue using this site.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => {
              // If DevTools is still open, keep the screen up.
              // If it's closed, allow the guard loop to clear itself after stable checks.
              if (latestDetected.current) setOpen(true);
            }}
            className="inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary/90"
          >
            I Closed DevTools
          </button>
          <div className="text-xs text-slate-400">
            Tip: close DevTools, then wait 2–3 seconds.
          </div>
        </div>
      </div>
    </div>
  );
}
