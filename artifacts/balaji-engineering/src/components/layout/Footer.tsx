import { Link } from "wouter";
import { Phone, Mail, MapPin, ArrowRight, ArrowUpRight } from "lucide-react";

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
  "Plate Rolling",
  "Heavy Fabrication",
  "Profile Cutting",
  "Steel Punching",
];

export function Footer() {
  return (
    <footer className="bg-[#0D0D0D] text-white relative overflow-hidden">
      {/* Background grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(172,60,60,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(172,60,60,0.8) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
      />

      {/* Top red accent line */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* CTA Band */}
      <div className="border-b border-white/6 relative">
        <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-[10px] font-bold tracking-[0.4em] text-primary uppercase mb-3">Ready to Build?</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tighter leading-[0.9] text-white">
                Let's forge your<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#e05555]">next project</span>
              </h2>
            </div>
            <Link href="/contact">
              <div className="group flex items-center gap-3 px-7 py-4 rounded-xl border border-primary/40 bg-primary/10 hover:bg-primary hover:border-primary transition-all duration-300 shadow-[0_0_30px_rgba(172,60,60,0.15)] hover:shadow-[0_0_40px_rgba(172,60,60,0.4)] shrink-0">
                <span className="font-black uppercase tracking-widest text-xs text-white">Request a Quote</span>
                <ArrowUpRight className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="container mx-auto px-4 md:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 w-fit">
              <img src="/logo.jpg" alt="Balaji Engineering Works" className="h-10 w-auto object-contain rounded bg-white/5 p-1 border border-white/8" />
              <div>
                <p className="font-display font-black text-sm tracking-wide text-white leading-none">BALAJI ENGINEERING</p>
                <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-primary mt-1">Precision Works</p>
              </div>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-xs">
              Two decades of precision metal fabrication from the heart of Gujarat. CNC cutting, bending, rolling, punching — all under one roof.
            </p>
            <div className="flex flex-col gap-1.5 text-xs text-white/30 font-mono">
              <span>GST: 24BCUPS8314Q1ZK</span>
              <span>Est. 2001 · Navagam, Surat</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-black tracking-[0.35em] uppercase text-white/50 mb-6 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-primary rounded-full" />
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="group flex items-center gap-2.5 text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    <ArrowRight className="w-3 h-3 text-primary/60 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="text-[10px] font-black tracking-[0.35em] uppercase text-white/50 mb-6 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-primary rounded-full" />
              Capabilities
            </h4>
            <ul className="space-y-3">
              {capabilities.map((cap) => (
                <li key={cap} className="flex items-center gap-2.5 text-sm text-white/50">
                  <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                  {cap}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-black tracking-[0.35em] uppercase text-white/50 mb-6 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-primary rounded-full" />
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-sm text-white/50 leading-relaxed">Navagam, Surat,<br />Gujarat – 395009, India</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                </div>
                <a href="tel:+917942957640" className="text-sm text-white/50 hover:text-white transition-colors">+91-7942957640</a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                </div>
                <a href="mailto:info@balajiengineering.in" className="text-sm text-white/50 hover:text-white transition-colors break-all">info@balajiengineering.in</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/6">
        <div className="container mx-auto px-4 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25 font-mono">
            © {new Date().getFullYear()} Balaji Engineering Works. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-[10px] text-white/25 hover:text-white/60 uppercase tracking-widest transition-colors">Privacy</Link>
            <Link href="#" className="text-[10px] text-white/25 hover:text-white/60 uppercase tracking-widest transition-colors">Terms</Link>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-primary/80">Active Since 2001</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
