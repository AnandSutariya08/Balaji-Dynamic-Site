import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingCta } from "@/components/site/FloatingCta";
import { SiteSmoothScroll } from "@/components/site/SiteSmoothScroll";

export default function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/30">
      <SiteSmoothScroll />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingCta />
    </div>
  );
}
