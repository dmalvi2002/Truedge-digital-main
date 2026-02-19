"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SquareTerminal, Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Works", href: "/projects" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    // Added a glossy top inner shadow to the main glass background
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-slate-50/80 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* --- Logo Section --- */}
        <div className="flex items-center shrink-0">
          <Link href="/" className="flex items-center gap-4">
            {/* Logo Image directly on the background */}
            <Image
              src="https://res.cloudinary.com/dvvcwzp4n/image/upload/v1771262572/Copy_of_truedge_logo_main_yymyy1.webp"
              alt="Truedge Digital Logo"
              // Increased size slightly to 32x32 for better visual balance
              width={40}
              height={40}
              // Added a subtle drop shadow to make the icon separate nicely from the glass background
              className="object-contain drop-shadow-sm"
            />
            <span className="hidden text-xl font-bold text-slate-900 sm:inline-block drop-shadow-sm">
              Truedge Digital
            </span>
          </Link>
        </div>

        {/* --- Desktop Navigation "Pill" --- */}
        {/* Changed from md:block to lg:block to hide on tablets */}
        <nav className="hidden lg:block">
          {/* Sunken container effect */}
          <ul className="flex items-center rounded-full bg-slate-200/50 p-1.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),inset_0_-1px_1px_rgba(255,255,255,0.8)] ring-1 ring-slate-900/5 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`relative block rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-in-out
                      ${
                        isActive
                          ? // 3D popped-out effect for the active link
                            "bg-gradient-to-b from-white to-slate-50 text-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)] ring-1 ring-slate-200"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/40"
                      }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* --- CTA Button & Mobile Toggle --- */}
        <div className="flex items-center gap-4">
          {/* 3D Glowing Purple CTA Button */}
          <Link
            href="/contact"
            className="hidden rounded-full bg-[linear-gradient(180deg,rgba(139,92,246,1)0%,rgba(109,40,217,1)100%)] px-6 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.4),inset_0_2px_2px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(124,58,237,0.6),inset_0_2px_2px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.2)] active:translate-y-0 sm:inline-flex"
          >
            Start a Project
          </Link>

          {/* Mobile Menu Trigger */}
          {/* Changed from md:hidden to lg:hidden to show on tablets */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2.5 text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] ring-1 ring-slate-200 transition hover:bg-slate-200/60 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500 lg:hidden bg-white/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- Mobile Navigation Menu --- */}
      {/* Changed from md:hidden to lg:hidden */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2 bg-slate-50/95 backdrop-blur-2xl border-b border-slate-200 shadow-inner">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-900 hover:bg-slate-200/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 block w-full rounded-full bg-[linear-gradient(180deg,rgba(139,92,246,1)0%,rgba(109,40,217,1)100%)] px-3 py-2.5 text-center text-base font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.4),inset_0_2px_2px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.6),inset_0_2px_2px_rgba(255,255,255,0.5)]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Start a Project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
