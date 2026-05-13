"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SiteSmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0;

    if (prefersReducedMotion || isTouchDevice) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      lerp: 0.08,
    });

    // Expose instance so other components (e.g., route-change scroll reset)
    // can safely drive scroll in Lenis-controlled mode.
    (window as any).__lenis = lenis;

    const handleScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", handleScroll);

    let frameId = 0;

    const loop = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(loop);
    };

    const handleRefresh = () => lenis.resize();

    ScrollTrigger.addEventListener("refresh", handleRefresh);
    frameId = window.requestAnimationFrame(loop);
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refresh", handleRefresh);
      window.cancelAnimationFrame(frameId);
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      try {
        if ((window as any).__lenis === lenis) {
          delete (window as any).__lenis;
        }
      } catch {
        // ignore
      }
    };
  }, []);

  return null;
}
