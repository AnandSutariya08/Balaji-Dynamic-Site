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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? "bg-background/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 z-50">
            <img
              src="/logo.jpg"
              alt="Balaji Engineering Works Logo"
              className="h-10 w-auto object-contain rounded"
            />
            <div className="flex flex-col">
              <span className={`font-display font-bold text-xl leading-none tracking-wide ${isScrolled || mobileMenuOpen ? "text-foreground" : "text-white"}`}>
                BALAJI ENGINEERING
              </span>
              <span className={`text-[0.65rem] font-medium tracking-widest uppercase ${isScrolled || mobileMenuOpen ? "text-primary" : "text-primary"}`}>
                Precision Works
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
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
                variant={isScrolled ? "default" : "secondary"}
                className="font-bold tracking-wide uppercase shadow-[0_0_15px_rgba(172,60,60,0.3)] hover:shadow-[0_0_25px_rgba(172,60,60,0.5)] transition-all"
              >
                Get Quote
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden z-50 ${isScrolled || mobileMenuOpen ? "text-foreground" : "text-white"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`fixed inset-0 bg-background flex flex-col items-center justify-center transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-2xl font-display font-bold uppercase tracking-wider ${
                location === link.path ? "text-primary" : "text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
            <Button size="lg" className="mt-4 font-bold tracking-wide uppercase">
              Get Quote
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
