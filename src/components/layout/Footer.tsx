import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-card/50 pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group inline-flex">
              <img src="/logo.png" alt="TriTech Forge Logo" className="w-10 h-10 rounded-xl object-cover" />
              <span className="text-2xl font-bold tracking-tight text-white">
                TriTech <span className="text-gradient">Forge</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-8 max-w-sm">
              Premium AI voice automation for home services and trade businesses. Never miss a call, capture every lead, and scale operations 24/7.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/tritechforge?igsh=MW9scWdjb3M5Y3NxcA=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-pink-400 hover:border-pink-400/50 transition-all"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/share/18f8gMVi7S/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-400/50 transition-all"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-500/50 transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Services</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/services#ai-receptionist" className="text-muted-foreground hover:text-primary transition-colors">AI Receptionist</Link></li>
              <li><Link href="/services#outbound" className="text-muted-foreground hover:text-primary transition-colors">Outbound Calling</Link></li>
              <li><Link href="/services#scheduling" className="text-muted-foreground hover:text-primary transition-colors">Appointment Scheduling</Link></li>
              <li><Link href="/services#qualification" className="text-muted-foreground hover:text-primary transition-colors">Lead Qualification</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Company</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/industries" className="text-muted-foreground hover:text-primary transition-colors">Industries</Link></li>
              <li><Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 mt-0.5 text-primary" />
                <span>hello@tritechforge.com</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 mt-0.5 text-primary" />
                <a href="tel:+033359823786" className="hover:text-primary transition-colors">Call Us</a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 mt-0.5 text-primary" />
                <span>100 Innovation Drive<br/>San Francisco, CA 94103</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TriTech Forge. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
