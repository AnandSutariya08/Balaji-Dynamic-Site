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
import { BalajiAI } from "@/components/site/BalajiAI";
import { VisitorCollect } from "@/components/site/VisitorCollect";
import { AdModal } from "@/components/site/AdModal";

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
        if (!sessionStorage.getItem("_cer")) {
          sessionStorage.setItem("_cer", "1");
          window.location.reload();
        }
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
        <VisitorCollect />
        <AdModal />
      </div>
    </QuoteDialogProvider>
  );
}
