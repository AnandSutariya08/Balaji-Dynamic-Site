import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Top accent bar — only visible before scroll */}
      <div className={`fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent z-50 transition-opacity duration-500 ${isScrolled ? "opacity-0" : "opacity-100"}`} />

      <header
        className={`fixed z-50 transition-all duration-500 ${
          isScrolled
            ? "top-4 left-4 right-4 md:left-8 md:right-8"
            : "top-3 left-0 right-0"
        }`}
      >
        <div
          className={`transition-all duration-500 ${
            isScrolled
              ? "rounded-2xl bg-[#111]/90 backdrop-blur-xl border border-white/8 shadow-[0_8px_40px_rgba(0,0,0,0.4)] px-5 py-3"
              : "px-4 md:px-8 py-4"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 z-50" onClick={() => setMobileMenuOpen(false)}>
              <div className={`relative transition-all duration-300 ${isScrolled ? "" : ""}`}>
                <img
                  src="/logo.jpg"
                  alt="Balaji Engineering Works Logo"
                  className={`w-auto object-contain rounded transition-all duration-300 ${isScrolled ? "h-8" : "h-9"}`}
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className={`font-display font-black tracking-wider transition-all duration-300 ${isScrolled ? "text-sm text-white" : "text-base md:text-lg text-white"}`}>
                  BALAJI ENGINEERING
                </span>
                <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-primary mt-0.5">
                  Precision Works · Est. 2001
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`relative px-4 py-2 text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-200 rounded-lg group ${
                    location === link.path
                      ? "text-primary"
                      : isScrolled
                        ? "text-white/70 hover:text-white"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-1 left-4 right-4 h-[2px] rounded-full bg-primary transition-all duration-300 ${location === link.path ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`} />
                </Link>
              ))}
              <Link href="/contact" className="ml-3">
                <div className={`px-5 py-2.5 rounded-xl text-[11px] font-black tracking-[0.15em] uppercase transition-all duration-300 ${
                  isScrolled
                    ? "bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(172,60,60,0.4)]"
                    : "bg-primary/90 backdrop-blur-sm text-white hover:bg-primary border border-primary/50 shadow-[0_0_20px_rgba(172,60,60,0.3)]"
                }`}>
                  Get Quote
                </div>
              </Link>
            </nav>

            {/* Mobile Toggle */}
            <button
              className={`md:hidden z-50 w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 ${
                isScrolled || mobileMenuOpen ? "text-white bg-white/10" : "text-white"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Dropdown */}
      <div
        className={`fixed z-40 left-3 right-3 md:hidden transition-all duration-300 ease-out ${
          mobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        } ${isScrolled ? "top-[5.2rem]" : "top-[4.8rem]"}`}
      >
        <div className="bg-[#111]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Red accent top stripe */}
          <div className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
          <nav className="flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-5 py-3.5 text-xs font-black uppercase tracking-[0.15em] transition-all ${
                  location === link.path
                    ? "text-primary bg-primary/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
                {location === link.path && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-white/8">
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <div className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs py-3.5 rounded-xl text-center transition-all shadow-[0_0_20px_rgba(172,60,60,0.3)]">
                Get Quote Now
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
      )}
    </>
  );
}
