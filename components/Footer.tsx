import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import { Sora } from "next/font/google";

// Importing Sora font as requested
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`${sora.className} w-full bg-slate-950 text-slate-300 border-t border-white/5 relative overflow-hidden`}
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Brand & Address (Takes up more space on desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Truedge{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400">
                  Digital.
                </span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm text-sm sm:text-base">
              Engineering bespoke, high-performance digital assets that drive
              measurable ROI for ambitious brands.
            </p>
            <div className="flex items-start gap-3 mt-2 text-sm text-slate-400">
              <MapPin size={18} className="text-orange-500 shrink-0 mt-0.5" />
              <p>
                82 Dunlin Road, Cove Bay
                <br />
                Aberdeen, United Kingdom
                <br />
                AB12 3WD
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <h3 className="text-white font-semibold tracking-wide text-sm uppercase">
              Navigation
            </h3>
            <ul className="flex flex-col gap-3 text-sm sm:text-base">
              <li>
                <Link
                  href="/about"
                  className="hover:text-violet-400 transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-violet-400 transition-colors duration-200"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolios"
                  className="hover:text-violet-400 transition-colors duration-200"
                >
                  Portfolios
                </Link>
              </li>
              <li>
                <Link
                  href="/marketing"
                  className="hover:text-violet-400 transition-colors duration-200"
                >
                  Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Socials */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <h3 className="text-white font-semibold tracking-wide text-sm uppercase">
              Get in Touch
            </h3>
            <ul className="flex flex-col gap-4 text-sm sm:text-base">
              <li>
                <a
                  href="mailto:info@truedgedigital.co.uk"
                  className="flex items-center gap-3 hover:text-violet-400 transition-colors duration-200 group"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 group-hover:bg-violet-500/20 transition-colors">
                    <Mail
                      size={14}
                      className="text-slate-300 group-hover:text-violet-400"
                    />
                  </div>
                  info@truedgedigital.co.uk
                </a>
              </li>
              <li>
                <a
                  href="tel:+447832921562"
                  className="flex items-center gap-3 hover:text-violet-400 transition-colors duration-200 group"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 group-hover:bg-violet-500/20 transition-colors">
                    <Phone
                      size={14}
                      className="text-slate-300 group-hover:text-violet-400"
                    />
                  </div>
                  +44 7832 921562
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/447907901171"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-violet-400 transition-colors duration-200 group"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 group-hover:bg-violet-500/20 transition-colors">
                    <MessageCircle
                      size={14}
                      className="text-slate-300 group-hover:text-violet-400"
                    />
                  </div>
                  +44 7907 901171 (WhatsApp)
                </a>
              </li>
            </ul>

            {/* Social Icons Row */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href="#"
                className="text-slate-400 hover:text-white hover:-translate-y-1 transition-all duration-300 p-2 rounded-full bg-white/5 hover:bg-violet-600"
              >
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white hover:-translate-y-1 transition-all duration-300 p-2 rounded-full bg-white/5 hover:bg-violet-600"
              >
                <Facebook size={18} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white hover:-translate-y-1 transition-all duration-300 p-2 rounded-full bg-white/5 hover:bg-violet-600"
              >
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Legal & Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-500">
          <p>© {currentYear} Truedge Digital. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="hover:text-white transition-colors duration-200"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
