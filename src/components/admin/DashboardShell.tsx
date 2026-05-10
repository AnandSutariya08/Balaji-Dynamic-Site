"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import {
  BookOpen,
  ChevronRight,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/blogs", label: "Blog Posts", icon: BookOpen },
  { href: "/admin/services", label: "Services", icon: Settings },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <aside className="flex w-56 shrink-0 flex-col border-r border-white/6 bg-[#141414]">
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

        <nav className="flex-1 space-y-0.5 p-3">
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

        <div className="space-y-0.5 border-t border-white/6 p-3">
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
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-all hover:bg-red-400/5 hover:text-red-400"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
