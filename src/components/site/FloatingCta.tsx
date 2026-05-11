"use client";

import { MessageSquare } from "lucide-react";
import { useQuoteDialog } from "@/components/site/QuoteDialogProvider";

export function FloatingCta() {
  const { openQuoteDialog } = useQuoteDialog();
  return (
    <button
      type="button"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Get a quote"
      onClick={() => openQuoteDialog()}
    >
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-primary opacity-60" />
        <div className="relative flex items-center justify-center rounded-full bg-primary p-4 text-white shadow-2xl transition-colors hover:bg-primary/90">
          <MessageSquare className="h-6 w-6" />
        </div>
      </div>
    </button>
  );
}
