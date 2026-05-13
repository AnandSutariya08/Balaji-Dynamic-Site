"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollToTop />
      {children}
      <Toaster richColors position="top-right" />
    </>
  );
}
