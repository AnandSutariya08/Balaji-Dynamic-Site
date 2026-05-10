import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f5f1] px-4">
      <div className="max-w-lg rounded-3xl border border-black/10 bg-white p-10 text-center shadow-lg">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
          404 Error
        </p>
        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-[#1a1a1a]">
          Page Not Found
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-500">
          The page you are looking for does not exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary/90"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
