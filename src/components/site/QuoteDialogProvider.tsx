"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import type { FormEvent, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addInquiry } from "@/lib/firestore/inquiries";
import { isFirebaseConfigured } from "@/lib/firebase";

type QuoteDialogContextValue = {
  openQuoteDialog: (options?: { service?: string }) => void;
  closeQuoteDialog: () => void;
};

const QuoteDialogContext = createContext<QuoteDialogContextValue | null>(null);

export function useQuoteDialog() {
  const value = useContext(QuoteDialogContext);
  if (!value) {
    throw new Error("useQuoteDialog must be used within QuoteDialogProvider");
  }
  return value;
}

export function QuoteDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [defaultService, setDefaultService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const openQuoteDialog = useCallback((options?: { service?: string }) => {
    setDefaultService(options?.service ?? "");
    setOpen(true);
  }, []);

  const closeQuoteDialog = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQuoteDialog();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, closeQuoteDialog]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    // Focus first input for quick submission.
    const id = window.setTimeout(() => {
      const el = dialogRef.current?.querySelector<HTMLInputElement>("#quote-name");
      el?.focus();
    }, 0);
    return () => window.clearTimeout(id);
  }, [open]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const get = (id: string) => (form.querySelector(`#${id}`) as HTMLInputElement)?.value || "";
    const getSelect = () =>
      (form.querySelector("[data-radix-select-value]") as HTMLElement)?.textContent ||
      get("quote-service") ||
      defaultService;

    setIsSubmitting(true);
    try {
      const data = {
        name: get("quote-name"),
        phone: get("quote-phone"),
        email: get("quote-email"),
        service: getSelect(),
        quantity: get("quote-quantity"),
        material: get("quote-material"),
        message: get("quote-message"),
      };
      if (isFirebaseConfigured()) {
        await addInquiry(data);
      }
      toast.success("Inquiry Sent Successfully", {
        description: "Our engineering team will contact you within 24 hours.",
      });
      form.reset();
      closeQuoteDialog();
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again or call us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const ctx = useMemo<QuoteDialogContextValue>(
    () => ({ openQuoteDialog, closeQuoteDialog }),
    [openQuoteDialog, closeQuoteDialog],
  );

  return (
    <QuoteDialogContext.Provider value={ctx}>
      {children}
      {open && (
        <div className="fixed inset-0 z-[70]">
          <button
            type="button"
            aria-label="Close quote dialog"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeQuoteDialog}
          />
          <div className="relative inset-0 flex h-full items-end justify-center p-3 sm:items-center sm:p-6">
            <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#111] shadow-[0_30px_120px_rgba(0,0,0,0.65)] sm:rounded-2xl">
              <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                className="max-h-[calc(100dvh-1.5rem)] w-full overflow-y-auto"
              >
                <div className="sticky top-0 z-10 border-b border-white/10 bg-[#111]/95 px-5 py-4 backdrop-blur sm:px-8 sm:py-6">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h2 className="text-white font-display font-black uppercase tracking-tight text-2xl sm:text-3xl">
                        Get a Quote
                      </h2>
                      <p className="mt-1.5 text-sm text-white/60">
                        Share your specs and we’ll respond within 24 hours.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/15 text-white/80 hover:text-white hover:bg-white/5"
                      onClick={closeQuoteDialog}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="px-5 pb-6 pt-5 sm:px-8 sm:pb-8">
                  <form onSubmit={onSubmit} className="grid gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="quote-name" className="text-xs font-bold tracking-widest text-white/60 uppercase">
                      Name *
                    </Label>
                    <Input
                      id="quote-name"
                      required
                      placeholder="Your name"
                      className="bg-black/40 border-white/10 text-white placeholder:text-white/30 h-12 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quote-phone" className="text-xs font-bold tracking-widest text-white/60 uppercase">
                      Phone *
                    </Label>
                    <Input
                      id="quote-phone"
                      required
                      placeholder="+91…"
                      className="bg-black/40 border-white/10 text-white placeholder:text-white/30 h-12 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="quote-email" className="text-xs font-bold tracking-widest text-white/60 uppercase">
                      Email *
                    </Label>
                    <Input
                      id="quote-email"
                      required
                      type="email"
                      placeholder="email@company.com"
                      className="bg-black/40 border-white/10 text-white placeholder:text-white/30 h-12 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quote-service" className="text-xs font-bold tracking-widest text-white/60 uppercase">
                      Service *
                    </Label>
                    <Select defaultValue={defaultService}>
                      <SelectTrigger className="bg-black/40 border-white/10 text-white h-12 focus:border-primary">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="z-[90]">
                        <SelectItem value="bending-services">Bending Services</SelectItem>
                        <SelectItem value="sheet-bending">Sheet Bending Service</SelectItem>
                        <SelectItem value="steel-cutting">Steel Cutting Services</SelectItem>
                        <SelectItem value="plate-bending">Plate Bending & Rolling</SelectItem>
                        <SelectItem value="laser-cutting">CNC Laser Cutting</SelectItem>
                        <SelectItem value="base-plate">Base Plates & Fasteners</SelectItem>
                        <SelectItem value="profile-cutting">Plate Profile Cutting</SelectItem>
                        <SelectItem value="sheet-cutting">Sheet Metal Cutting</SelectItem>
                        <SelectItem value="other">Other / Custom Fabrication</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="quote-quantity" className="text-xs font-bold tracking-widest text-white/60 uppercase">
                      Quantity
                    </Label>
                    <Input
                      id="quote-quantity"
                      placeholder="e.g. 50 pcs, 500kg"
                      className="bg-black/40 border-white/10 text-white placeholder:text-white/30 h-12 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quote-material" className="text-xs font-bold tracking-widest text-white/60 uppercase">
                      Material
                    </Label>
                    <Input
                      id="quote-material"
                      placeholder="e.g. MS 10mm"
                      className="bg-black/40 border-white/10 text-white placeholder:text-white/30 h-12 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quote-message" className="text-xs font-bold tracking-widest text-white/60 uppercase">
                    Project Details *
                  </Label>
                  <Textarea
                    id="quote-message"
                    required
                    placeholder="Tell us dimensions, tolerance, finish, timeline…"
                    className="min-h-[120px] bg-black/40 border-white/10 text-white placeholder:text-white/30 focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="h-12 font-black uppercase tracking-widest bg-primary hover:bg-primary/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending…" : "Submit Inquiry"}
                </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </QuoteDialogContext.Provider>
  );
}
