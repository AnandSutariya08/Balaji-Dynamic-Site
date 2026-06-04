"use client";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { DevtoolsGuard } from "@/components/security/DevtoolsGuard";
import { FloatingCta } from "@/components/site/FloatingCta";
import { SiteSmoothScroll } from "@/components/site/SiteSmoothScroll";
import { QuoteDialogProvider } from "@/components/site/QuoteDialogProvider";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import dynamic from "next/dynamic";
const BalajiAI = dynamic(() => import("@/components/site/BalajiAI").then((m) => ({ default: m.BalajiAI })), { ssr: false });

export default function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const handler = (event: PromiseRejectionEvent) => {
      if (
        event.reason?.name === "ChunkLoadError" ||
        event.reason?.message?.includes("Loading chunk")
      ) {
        event.preventDefault();
        window.location.reload();
      }
    };
    window.addEventListener("unhandledrejection", handler);
    return () => window.removeEventListener("unhandledrejection", handler);
  }, []);

  return (
    <QuoteDialogProvider>
      <div className="min-h-screen bg-background font-sans selection:bg-primary/30">
        <DevtoolsGuard />
        <SiteSmoothScroll />
        <ScrollToTop />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BalajiAI />
        <FloatingCta />
      </div>
    </QuoteDialogProvider>
  );
}
