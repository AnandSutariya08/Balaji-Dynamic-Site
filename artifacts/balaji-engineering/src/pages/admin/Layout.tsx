import { useAdminAuth } from "@/lib/adminAuth";
import { useLocation, Link } from "wouter";
import { ReactNode, useEffect } from "react";
import { LayoutDashboard, BookOpen, Settings, MessageSquare, LogOut, ChevronRight, ExternalLink } from "lucide-react";

const navItems = [
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/blogs", label: "Blog Posts", icon: BookOpen },
  { href: "/admin/services", label: "Services", icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, logout } = useAdminAuth();
  const [location, navigate] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) navigate("/admin");
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">
      <aside className="w-56 shrink-0 bg-[#141414] border-r border-white/6 flex flex-col">
        <div className="p-5 border-b border-white/6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#AC3C3C] flex items-center justify-center">
              <LayoutDashboard className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-none">Admin</div>
              <div className="text-zinc-500 text-[10px] mt-0.5">Balaji Engineering</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = location === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-[#AC3C3C]/15 text-[#e05555] border border-[#AC3C3C]/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
                {active && <ChevronRight className="w-3 h-3 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/6 space-y-0.5">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            View Site
          </a>
          <button
            onClick={() => { logout(); navigate("/admin"); }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-red-400 hover:bg-red-400/5 transition-all"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
