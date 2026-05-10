"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div
        className={`fixed left-0 right-0 top-0 z-50 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-500 ${
          isScrolled ? "opacity-0" : "opacity-100"
        }`}
      />

      <header
        className={`fixed z-50 transition-all duration-500 ${
          isScrolled ? "left-4 right-4 top-4 md:left-8 md:right-8" : "left-0 right-0 top-3"
        }`}
      >
        <div
          className={`transition-all duration-500 ${
            isScrolled
              ? "rounded-2xl border border-white/8 bg-[#111]/90 px-5 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl"
              : "px-4 py-4 md:px-8"
          }`}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="z-50 flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="Balaji Engineering Works Logo"
                className={`w-auto rounded object-contain transition-all duration-300 ${
                  isScrolled ? "h-8" : "h-9"
                }`}
              />
              <div className="flex flex-col leading-none">
                <span
                  className={`font-display font-black tracking-wider text-white transition-all duration-300 ${
                    isScrolled ? "text-sm" : "text-base md:text-lg"
                  }`}
                >
                  BALAJI ENGINEERING
                </span>
                <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.25em] text-primary">
                  Precision Works · Est. 2001
                </span>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`group relative rounded-lg px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-200 ${
                    pathname === link.path
                      ? "text-primary"
                      : isScrolled
                        ? "text-white/70 hover:text-white"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-1 left-4 right-4 h-[2px] rounded-full bg-primary transition-all duration-300 ${
                      pathname === link.path ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                    }`}
                  />
                </Link>
              ))}
              <Link
                href="/contact"
                className={`ml-3 rounded-xl px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-white transition-all duration-300 ${
                  isScrolled
                    ? "bg-primary shadow-[0_0_20px_rgba(172,60,60,0.4)] hover:bg-primary/90"
                    : "border border-primary/50 bg-primary/90 shadow-[0_0_20px_rgba(172,60,60,0.3)] backdrop-blur-sm hover:bg-primary"
                }`}
              >
                Get Quote
              </Link>
            </nav>

            <button
              type="button"
              className={`z-50 flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 md:hidden ${
                isScrolled || mobileMenuOpen ? "bg-white/10 text-white" : "text-white"
              }`}
              onClick={() => setMobileMenuOpen((value) => !value)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed left-3 right-3 z-40 transition-all duration-300 ease-out md:hidden ${
          mobileMenuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        } ${isScrolled ? "top-[5.2rem]" : "top-[4.8rem]"}`}
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111]/95 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
          <div className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
          <nav className="flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`flex items-center justify-between px-5 py-3.5 text-xs font-black uppercase tracking-[0.15em] transition-all ${
                  pathname === link.path
                    ? "bg-primary/10 text-primary"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.name}
                {pathname === link.path && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
              </Link>
            ))}
          </nav>
          <div className="border-t border-white/8 p-4">
            <Link
              href="/contact"
              className="block rounded-xl bg-primary py-3.5 text-center text-xs font-black uppercase tracking-widest text-white shadow-[0_0_20px_rgba(172,60,60,0.3)] transition-all hover:bg-primary/90"
            >
              Get Quote Now
            </Link>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
