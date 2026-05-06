import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed z-50 transition-all duration-500 ${
          isScrolled
            ? "top-3 left-3 right-3 md:left-6 md:right-6 rounded-full bg-background/95 backdrop-blur-md shadow-lg border border-black/10 py-2"
            : "top-0 left-0 right-0 bg-transparent py-5"
        }`}
      >
        <div className={`flex items-center justify-between ${isScrolled ? "px-4 md:px-5" : "container mx-auto px-4 md:px-6"}`}>
          <Link href="/" className="flex items-center gap-2.5 z-50" onClick={() => setMobileMenuOpen(false)}>
            <img
              src="/logo.jpg"
              alt="Balaji Engineering Works Logo"
              className={`w-auto object-contain rounded transition-all duration-300 ${isScrolled ? "h-8" : "h-10"}`}
            />
            <div className="flex flex-col">
              <span className={`font-display font-bold leading-none tracking-wide transition-all duration-300 ${
                isScrolled ? "text-base text-foreground" : "text-xl text-white"
              }`}>
                BALAJI ENGINEERING
              </span>
              <span className="text-[0.6rem] font-medium tracking-widest uppercase text-primary">
                Precision Works
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-sm font-semibold tracking-wide uppercase transition-colors hover:text-primary ${
                  location === link.path
                    ? "text-primary"
                    : isScrolled ? "text-foreground" : "text-white/90"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/contact">
              <Button
                size="sm"
                className="font-bold tracking-wide uppercase shadow-[0_0_15px_rgba(172,60,60,0.3)] hover:shadow-[0_0_25px_rgba(172,60,60,0.5)] transition-all rounded-full px-5"
              >
                Get Quote
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden z-50 p-2 rounded-full transition-all duration-200 ${
              isScrolled || mobileMenuOpen
                ? "text-foreground bg-black/5"
                : "text-white"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown */}
      <div
        className={`fixed z-40 left-3 right-3 md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"
        } ${isScrolled ? "top-[4.2rem]" : "top-[4.6rem]"}`}
      >
        <div className="bg-background/98 backdrop-blur-2xl border border-black/10 rounded-2xl shadow-2xl overflow-hidden">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-5 py-4 text-sm font-bold uppercase tracking-widest transition-colors border-b border-black/5 last:border-0 ${
                  location === link.path
                    ? "text-primary bg-primary/5"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.name}
                {location === link.path && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </Link>
            ))}
            <div className="p-4">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full font-bold tracking-wide uppercase rounded-xl h-12">
                  Get Quote Now
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden bg-black/30 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
