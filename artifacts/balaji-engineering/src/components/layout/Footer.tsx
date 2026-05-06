import { Link } from "wouter";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-sidebar border-t border-sidebar-border text-sidebar-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 inline-block">
              <img
                src="/logo.jpg"
                alt="Balaji Engineering Works Logo"
                className="h-10 w-auto object-contain rounded bg-white p-1"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl leading-none tracking-wide text-white">
                  BALAJI ENGINEERING
                </span>
                <span className="text-[0.65rem] font-medium tracking-widest uppercase text-primary">
                  Precision Works
                </span>
              </div>
            </Link>
            <p className="text-sm text-sidebar-foreground/70 mt-4 leading-relaxed">
              A precision engineering powerhouse forged over two decades. Specializing in shearing, CNC cutting, bending, punching, rolling, and fabrication.
            </p>
            <div className="text-sm text-sidebar-foreground/50 pt-2">
              <p>GST: 24BCUPS8314Q1ZK</p>
              <p>Est. 2001</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4 text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sidebar-foreground/70 hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <ArrowRight size={14} className="text-primary" /> Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sidebar-foreground/70 hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <ArrowRight size={14} className="text-primary" /> About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sidebar-foreground/70 hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <ArrowRight size={14} className="text-primary" /> Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sidebar-foreground/70 hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <ArrowRight size={14} className="text-primary" /> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4 text-white uppercase tracking-wider">Capabilities</h3>
            <ul className="space-y-3">
              <li className="text-sidebar-foreground/70 text-sm">Sheet Metal Bending</li>
              <li className="text-sidebar-foreground/70 text-sm">CNC Laser Cutting</li>
              <li className="text-sidebar-foreground/70 text-sm">Plate Rolling & Bending</li>
              <li className="text-sidebar-foreground/70 text-sm">Heavy Steel Fabrication</li>
              <li className="text-sidebar-foreground/70 text-sm">Profile Cutting</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4 text-white uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-sidebar-foreground/70">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>Navagam, Surat,<br />Gujarat, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-sidebar-foreground/70">
                <Phone size={18} className="text-primary shrink-0" />
                <a href="tel:+917942957640" className="hover:text-primary transition-colors">+91-7942957640</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-sidebar-foreground/70">
                <Mail size={18} className="text-primary shrink-0" />
                <a href="mailto:info@balajiengineering.in" className="hover:text-primary transition-colors">info@balajiengineering.in</a>
              </li>
            </ul>
            <Button className="w-full mt-6" asChild>
              <Link href="/contact">Request a Quote</Link>
            </Button>
          </div>
        </div>

        <div className="border-t border-sidebar-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-sidebar-foreground/50">
            &copy; {new Date().getFullYear()} Balaji Engineering Works. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sidebar-foreground/50 hover:text-white text-sm">Privacy Policy</Link>
            <Link href="#" className="text-sidebar-foreground/50 hover:text-white text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
