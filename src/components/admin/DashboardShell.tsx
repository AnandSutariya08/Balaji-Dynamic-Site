"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import {
  BookOpen,
  ChevronRight,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  MessageSquare,
} from "lucide-react";

const navItems = [
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/blogs", label: "Blog Posts", icon: BookOpen },
];

const ADMIN_SESSION_KEY = "balaji_admin_authed";

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const handleLogout = async () => {
    setSigningOut(true);
    try {
      window.localStorage.removeItem(ADMIN_SESSION_KEY);
      router.push("/admin");
      router.refresh();
    } finally {
      setSigningOut(false);
      setConfirmOpen(false);
    }
  };

  useEffect(() => {
    if (!confirmOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setConfirmOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [confirmOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f0f0f]">
      <aside className="flex h-screen w-56 shrink-0 flex-col border-r border-white/6 bg-[#141414]">
        <div className="border-b border-white/6 p-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#AC3C3C]">
              <LayoutDashboard className="h-3.5 w-3.5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold leading-none text-white">Admin</div>
              <div className="mt-0.5 text-[10px] text-zinc-500">Balaji Engineering</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto space-y-0.5 p-3">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "border border-[#AC3C3C]/20 bg-[#AC3C3C]/15 text-[#e05555]"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
                {active && <ChevronRight className="ml-auto h-3 w-3" />}
              </Link>
            );
          })}
        </nav>

        <div className="shrink-0 space-y-0.5 border-t border-white/6 p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-all hover:bg-white/5 hover:text-white"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            View Site
          </Link>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-all hover:bg-red-400/5 hover:text-red-400"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => (signingOut ? null : setConfirmOpen(false))}
            aria-label="Close confirmation"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Confirm sign out"
            className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#141414] shadow-2xl"
          >
            <div className="border-b border-white/8 px-5 py-4">
              <div className="text-sm font-bold text-white">Sign out?</div>
              <div className="mt-1 text-xs text-zinc-500">
                You’ll need to sign in again to access the admin panel.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 px-5 py-4">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                disabled={signingOut}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-300 transition-colors hover:bg-white/10 disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={signingOut}
                className="rounded-xl bg-[#AC3C3C] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#c44040] disabled:opacity-60"
              >
                {signingOut ? "Signing out..." : "Sign out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
