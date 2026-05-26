import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found — Balaji Engineering Works",
  description: "The page you are looking for does not exist. Return to our homepage or explore our fabrication services and products.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

const quickLinks = [
  { label: "Services", href: "/services", desc: "CNC laser cutting, bending, plasma" },
  { label: "Products", href: "/products", desc: "Base plates, purlins, anchor bolts" },
  { label: "Gallery", href: "/gallery", desc: "Our fabrication work" },
  { label: "Contact", href: "/contact", desc: "Get a quote" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f5f1] px-4 py-16">
      <div className="w-full max-w-2xl rounded-3xl border border-black/10 bg-white p-10 text-center shadow-lg">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
          404 — Page Not Found
        </p>
        <h1 className="mt-4 font-display text-5xl font-black uppercase tracking-tight text-[#1a1a1a]">
          Wrong Part
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-500 max-w-sm mx-auto">
          This page doesn&apos;t exist in our catalogue. Let&apos;s get you back to the right section.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary/90"
          >
            Back to Homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-6 py-3 text-sm font-bold uppercase tracking-widest text-[#1a1a1a] transition-colors hover:bg-black/5"
          >
            Contact Us
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-black/8 bg-[#f7f5f1] px-3 py-4 text-center transition-colors hover:border-primary/30 hover:bg-primary/5"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]">{link.label}</p>
              <p className="mt-1 text-[10px] text-slate-400">{link.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
