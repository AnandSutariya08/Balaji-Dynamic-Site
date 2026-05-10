import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const capabilities = [
  "Sheet Metal Bending",
  "CNC Laser Cutting",
  "CNC Plasma Cutting",
  "Plate Rolling",
  "Profile Cutting",
  "Steel Punching",
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0D0D0D] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(172,60,60,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(172,60,60,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="relative border-b border-white/6">
        <div className="container mx-auto px-4 py-12 md:px-8 md:py-16">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
                Ready to Build?
              </p>
              <h2 className="font-display text-3xl font-black uppercase leading-[0.9] tracking-tighter text-white sm:text-4xl md:text-5xl">
                Let&apos;s forge your
                <br />
                <span className="bg-gradient-to-r from-primary to-[#e05555] bg-clip-text text-transparent">
                  next project
                </span>
              </h2>
            </div>
            <Link
              href="/contact"
              className="group flex shrink-0 items-center gap-3 rounded-xl border border-primary/40 bg-primary/10 px-7 py-4 shadow-[0_0_30px_rgba(172,60,60,0.15)] transition-all duration-300 hover:border-primary hover:bg-primary hover:shadow-[0_0_40px_rgba(172,60,60,0.4)]"
            >
              <span className="text-xs font-black uppercase tracking-widest text-white">
                Request a Quote
              </span>
              <ArrowUpRight className="h-4 w-4 text-primary transition-colors group-hover:text-white" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-12 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-6 flex w-fit items-center gap-3">
              <img
                src="/logo.svg"
                alt="Balaji Engineering Works"
                className="h-10 w-auto rounded border border-white/8 bg-white/5 p-1 object-contain"
              />
              <div>
                <p className="font-display text-sm font-black leading-none tracking-wide text-white">
                  BALAJI ENGINEERING
                </p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-primary">
                  Precision Works
                </p>
              </div>
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/40">
              Manufacturer and service provider of sheet metal bending, CNC laser
              cutting, plasma cutting, rolling, punching, and fabrication from
              Surat, Gujarat.
            </p>
            <div className="flex flex-col gap-1.5 font-mono text-xs text-white/30">
              <span>GST: {siteConfig.gstNumber}</span>
              <span>Est. {siteConfig.foundingDate} · {siteConfig.address.locality}</span>
            </div>
          </div>

          <div>
            <h4 className="mb-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-white/50">
              <span className="h-[2px] w-4 rounded-full bg-primary" />
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="group flex items-center gap-2.5 text-sm text-white/50 transition-colors duration-200 hover:text-white"
                  >
                    <ArrowRight className="h-3 w-3 text-primary/60 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-white/50">
              <span className="h-[2px] w-4 rounded-full bg-primary" />
              Capabilities
            </h4>
            <ul className="space-y-3">
              {capabilities.map((capability) => (
                <li key={capability} className="flex items-center gap-2.5 text-sm text-white/50">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                  {capability}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-white/50">
              <span className="h-[2px] w-4 rounded-full bg-primary" />
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-sm leading-relaxed text-white/50">
                  Plot No. 11, 12 Soham Industrial Estate,
                  <br />
                  NH 8 Kamrej, Navagam, Surat - {siteConfig.address.postalCode}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                </div>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-sm text-white/50 transition-colors hover:text-white"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                  <Mail className="h-3.5 w-3.5 text-primary" />
                </div>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="break-all text-sm text-white/50 transition-colors hover:text-white"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/6">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 md:px-8 sm:flex-row">
          <p className="font-mono text-xs text-white/25">
            © {new Date().getFullYear()} Balaji Engineering Works. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className="text-[10px] uppercase tracking-widest text-white/25 transition-colors hover:text-white/60"
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="text-[10px] uppercase tracking-widest text-white/25 transition-colors hover:text-white/60"
            >
              Terms
            </Link>
            <div className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary/80">
                Active Since {siteConfig.foundingDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
