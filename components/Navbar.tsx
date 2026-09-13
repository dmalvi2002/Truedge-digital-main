"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import { Sora } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Works", href: "/projects" },
  { name: "Growth", href: "/growth" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic Liquid Slider Pill state
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sliderStyle, setSliderStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Find active route index
  const activeIndex = navLinks.findIndex((link) => {
    if (link.href === "/") return pathname === "/";
    return pathname.startsWith(link.href);
  });

  // Compute position of the Liquid Slider Pill
  useEffect(() => {
    const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
    const targetElement = itemRefs.current[targetIndex];
    const container = navContainerRef.current;

    if (targetElement && container) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();

      setSliderStyle({
        left: targetRect.left - containerRect.left,
        width: targetRect.width,
        opacity: 1,
      });
    } else {
      setSliderStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [hoveredIndex, activeIndex, pathname]);

  return (
    // Flush sticky header with zero whitespace padding above
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-2xl transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
      <div className="mx-auto flex h-16 sm:h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* ─── 1. CLEAN BRAND LOGO (No dots or extra infos) ─── */}
        <Link href="/" className="group flex items-center gap-3 shrink-0 py-1 cursor-pointer">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="https://res.cloudinary.com/dvvcwzp4n/image/upload/v1771262572/Copy_of_truedge_logo_main_yymyy1.webp"
              alt="Truedge Digital Logo"
              fill
              className="object-contain drop-shadow-sm"
              sizes="40px"
              priority
            />
          </div>

          <span
            className={`${sora.className} text-lg sm:text-xl font-bold text-slate-900 tracking-tight transition-colors group-hover:text-black`}
          >
            Truedge Digital
          </span>
        </Link>

        {/* ─── 2. DYNAMIC LIQUID NAVIGATION TRAY ─── */}
        <nav className="hidden lg:block">
          <div
            ref={navContainerRef}
            className="relative flex items-center rounded-full bg-slate-100/70 p-1.5 ring-1 ring-slate-900/[0.05] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-sm"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* The Liquid Floating Pill Indicator */}
            <div
              className="absolute top-1.5 bottom-1.5 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_1px_rgba(0,0,0,0.04)] ring-1 ring-slate-900/[0.06] pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                left: `${sliderStyle.left}px`,
                width: `${sliderStyle.width}px`,
                opacity: sliderStyle.opacity,
              }}
            />

            {navLinks.map((link, idx) => {
              const isActive = activeIndex === idx;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className={`relative z-10 px-5 py-2 text-sm font-semibold transition-colors duration-200 rounded-full select-none ${
                    isActive ? "text-slate-950" : "text-slate-600 hover:text-slate-950"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* ─── 3. PURPLE KINETIC SLIDING HOVER CTA BUTTON & MOBILE TRIGGER ─── */}
        <div className="flex items-center gap-3">
          {/* Purple Button with gliding circle-arrow hover animation */}
          <Link
            href="/contact"
            className="relative hidden sm:inline-flex items-center justify-center text-sm font-bold text-white rounded-full h-11 p-1 ps-6 pe-[58px] group transition-all duration-500 hover:ps-[58px] hover:pe-6 w-fit overflow-hidden cursor-pointer bg-[linear-gradient(135deg,#7c3aed_0%,#6d28d9_100%)] hover:bg-[linear-gradient(135deg,#6d28d9_0%,#5b21b6_100%)] shadow-[0_4px_20px_rgba(124,58,237,0.35)] hover:shadow-[0_6px_25px_rgba(124,58,237,0.5)] active:scale-[0.98]"
          >
            <span className="relative z-10 transition-all duration-500 whitespace-nowrap">
              Start a Project
            </span>
            <div className="absolute right-1 w-9 h-9 bg-white text-purple-700 rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-40px)] group-hover:rotate-45 shadow-sm">
              <ArrowUpRight size={16} className="stroke-[2.5]" />
            </div>
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            className="inline-flex lg:hidden items-center justify-center w-10 h-10 rounded-full bg-slate-100/90 text-slate-800 border border-slate-200/80 shadow-sm transition hover:bg-slate-200/80 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ─── 4. MOBILE DROPDOWN DRAWER ─── */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-2xl px-4 py-4 shadow-lg space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                    isActive
                      ? "bg-purple-50 text-purple-700 shadow-sm"
                      : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-950"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Purple Kinetic CTA */}
          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/contact"
              className="relative flex items-center justify-center text-sm font-bold text-white rounded-full h-11 p-1 ps-6 pe-[58px] group transition-all duration-500 hover:ps-[58px] hover:pe-6 w-full overflow-hidden cursor-pointer bg-[linear-gradient(135deg,#7c3aed_0%,#6d28d9_100%)] shadow-[0_4px_20px_rgba(124,58,237,0.35)]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative z-10 transition-all duration-500">
                Start a Project
              </span>
              <div className="absolute right-1 w-9 h-9 bg-white text-purple-700 rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-40px)] group-hover:rotate-45 shadow-sm">
                <ArrowUpRight size={16} className="stroke-[2.5]" />
              </div>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
