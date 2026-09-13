"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Laptop, 
  Megaphone, 
  Globe, 
  ArrowUpRight, 
  ArrowRight, 
  CheckCircle2 
} from "lucide-react";
import { Sora } from "next/font/google";
import ScrollRippleTitle from "@/components/ScrollRippleTitle";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

interface ServiceCard {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  ctaText: string;
  href: string;
}

const SERVICES: ServiceCard[] = [
  {
    id: "website-design",
    title: "Website Design",
    category: "Conversion Architecture",
    description: "Generic templates fail to convert modern visitors. We build bespoke, lightning-fast digital flagships engineered to capture attention, build trust, and maximize sales conversions.",
    icon: <Laptop className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950 stroke-[2.2]" />,
    imageSrc: "/card-laptop.jpg",
    imageAlt: "Website Design and Development Laptop Display",
    ctaText: "Explore Design",
    href: "/services",
  },
  {
    id: "paid-media",
    title: "Paid Media & Ads",
    category: "Performance Acquisition",
    description: "Unfocused campaigns burn through ad budgets. We deploy algorithmic Search, Meta, and Social funnels designed to capture high-intent buyers and scale customer acquisition profitably.",
    icon: <Megaphone className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950 stroke-[2.2]" />,
    imageSrc: "/card-tablet.jpg",
    imageAlt: "Paid Media Strategy Tablet Display",
    ctaText: "Explore Funnels",
    href: "/services",
  },
  {
    id: "seo-aeo-geo",
    title: "SEO / AEO / GEO",
    category: "AI & Search Authority",
    description: "Standard rankings aren't enough in the AI search era. We optimize your brand for Google search, Answer Engines (AEO), and Generative discovery (GEO) so your business gets recommended first.",
    icon: <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950 stroke-[2.2]" />,
    imageSrc: "/card-phone.jpg",
    imageAlt: "Search and AI Engine Optimization Display",
    ctaText: "Explore Search",
    href: "/services",
  },
];

export default function PasSection() {
  return (
    <section className={`relative w-full py-24 sm:py-32 lg:py-36 bg-gradient-to-b from-[#241a63] via-[#21175c] to-[#120d36] text-white overflow-hidden ${sora.className}`}>
      {/* ─── Ambient Lighting & Glow Halos ─── */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-indigo-400/25 via-violet-600/15 to-transparent blur-[160px] rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#d2f83a]/10 blur-[180px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 left-0 w-[450px] h-[450px] bg-blue-500/10 blur-[150px] rounded-full" />

      {/* Subtle geometric dot grid for tactile depth */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "32px 32px"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─── 1. TOP HEADER: Clean Asymmetric Split (No Eyebrow, No Stats Line) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16 sm:mb-20">
          
          {/* Left: Main Headline with Scroll-driven & Hover Green Ripple Letter-by-Letter Animation */}
          <div className="lg:col-span-7">
            <ScrollRippleTitle
              text="We build high-performing digital systems that increase your sales growth"
              as="h2"
              className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight leading-[1.12]"
            />
          </div>

          {/* Right: Strategic Narrative */}
          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              Most agencies build pretty websites and run siloed ads. Truedge merges conversion architecture, paid acquisition, and AI discovery into one compounding revenue engine.
            </p>
          </div>

        </div>

        {/* ─── 2. THE 3 SIGNATURE SCOOPED-NOTCH CARDS ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 pb-16 sm:pb-24">
          {SERVICES.map((card) => (
            <div
              key={card.id}
              className="group relative flex flex-col transition-all duration-300 hover:-translate-y-2"
            >
              {/* ── TOP DECK: Floating Lime Badge Cutout + Inverted Scooped White Title Tab ── */}
              <div className="relative flex items-end h-[76px] z-10">
                
                {/* 1. Left Cutout Notch: The purple page background shows cleanly around the badge */}
                <div className="w-[84px] h-full relative flex items-start justify-start pt-0.5 pl-0.5">
                  <div className="w-14 h-14 sm:w-15 sm:h-15 rounded-[18px] sm:rounded-[20px] bg-[#d2f83a] flex items-center justify-center text-slate-950 shadow-[0_10px_25px_rgba(210,248,58,0.3)] transition-all duration-300 group-hover:scale-105 group-hover:rotate-2">
                    {card.icon}
                  </div>
                </div>

                {/* 2. Right Upper Tab: Pure White Background housing the Title */}
                <div className="relative flex-1 h-full bg-white rounded-tr-[28px] rounded-tl-[24px] flex items-center px-5 sm:px-6 pt-1">
                  
                  {/* Precision Inverted Concave Curve Fillet joining tab to lower shelf */}
                  <svg
                    className="absolute bottom-0 -left-[24px] w-[24px] h-[24px] pointer-events-none"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M 24 0 A 24 24 0 0 1 0 24 L 24 24 Z" fill="#ffffff" />
                  </svg>

                  <h3 className="text-xl sm:text-[22px] font-bold text-slate-950 tracking-tight leading-snug">
                    {card.title}
                  </h3>
                </div>

              </div>

              {/* ── MAIN CARD BODY (Pure White Container with smooth top-left curve under notch) ── */}
              <div className="relative bg-white rounded-b-[32px] rounded-tl-[24px] -mt-[1px] p-6 sm:p-7 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)] flex flex-col justify-between flex-1 z-0">
                
                {/* 1. Friendly, Clean Image Mockup (No technical data/confusion) */}
                <div className="relative w-full aspect-[16/10] rounded-[20px] overflow-hidden mb-6 shadow-sm border border-slate-100/90 bg-slate-100">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* 2. Clear Agency Copy */}
                <div className="space-y-2.5 mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {card.category}
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                {/* 3. BESPOKE BUTTON DESIGN: The Magnetic Kinetic Capsule */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={card.href}
                    className="group/btn inline-flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-full bg-slate-950 text-white shadow-md hover:bg-slate-900 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(210,248,58,0.35)] cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold tracking-tight text-white group-hover/btn:text-[#d2f83a] transition-colors">
                      {card.ctaText}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#d2f83a] text-slate-950 flex items-center justify-center font-bold transition-all duration-300 group-hover/btn:rotate-45 group-hover/btn:scale-105 shadow-sm">
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </Link>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* ─── 3. BOTTOM PAS SECTION: Clean Structural Split Showcase (No middle divider line) ─── */}
        <div className="relative mt-4 sm:mt-8 pt-6 sm:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT COLUMN: Layered Team Photography Composition with connecting Dotted Doodle Line */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[420px] sm:min-h-[500px]">
              
              {/* Long & Wavy Dotted Doodle Connector Line */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible"
                viewBox="0 0 574 484"
                fill="none"
              >
                <defs>
                  <marker
                    id="doodle-arrowhead"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#d2f83a" />
                  </marker>
                </defs>
                
                {/* Playful Dotted Doodle with Middle Circular Loop connecting to Photo 2 Bottom-Center */}
                <path 
                  d="M 130 246 C 90 285, 75 325, 95 360 C 115 400, 165 400, 165 360 C 165 320, 115 320, 95 360 C 80 425, 140 515, 230 515 C 310 515, 365 510, 395 484" 
                  stroke="#d2f83a" 
                  strokeWidth="2.8" 
                  strokeDasharray="6 6" 
                  strokeLinecap="round"
                  markerEnd="url(#doodle-arrowhead)"
                  className="opacity-95"
                />

                {/* Starting anchor dot on Photo 1 bottom border */}
                <circle cx="130" cy="246" r="4.5" fill="#d2f83a" />
              </svg>

              {/* Photo 1: Team Collaboration (Top-Left) */}
              <div className="absolute top-0 left-0 w-[60%] sm:w-[58%] aspect-[4/3] rounded-[26px] sm:rounded-[30px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] border-2 border-white/15 z-10">
                <Image
                  src="/team-collaboration.jpg"
                  alt="Truedge Growth Strategy Specialists"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Photo 2: Strategic Funnel Whiteboarding (Bottom-Right, overlapping) */}
              <div className="absolute bottom-4 right-0 w-[64%] sm:w-[62%] aspect-[4/3] rounded-[26px] sm:rounded-[30px] overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.7)] border-2 border-white/15 z-20">
                <Image
                  src="/team-strategy.jpg"
                  alt="Revenue Growth Funnel Engineering"
                  fill
                  className="object-cover"
                />
              </div>

            </div>

            {/* RIGHT COLUMN: The Clean Problem / Solution Pitch (No Eyebrow) */}
            <div className="lg:col-span-6 space-y-6">

              <ScrollRippleTitle
                text="Why you need a full-funnel digital growth partner"
                as="h2"
                className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.15]"
              />

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                To scale new customer acquisition and customer lifetime value sustainably, we engineer across the entire conversion lifecycle. No fragmented freelancers or unaligned agencies—a unified growth machine built for revenue.
              </p>

              {/* 3 High-Value Pillars */}
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#d2f83a]/15 border border-[#d2f83a]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d2f83a]" />
                  </div>
                  <div>
                    <span className="text-sm sm:text-base font-bold text-white">
                      Full-funnel conversion engineering
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                      Zero generic templates. Bespoke digital touchpoints tailored to high transaction values.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#d2f83a]/15 border border-[#d2f83a]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d2f83a]" />
                  </div>
                  <div>
                    <span className="text-sm sm:text-base font-bold text-white">
                      Algorithmic paid media funnels
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                      Multi-channel scaling across Meta, Google Search, and TikTok targeting high-intent buyers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#d2f83a]/15 border border-[#d2f83a]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d2f83a]" />
                  </div>
                  <div>
                    <span className="text-sm sm:text-base font-bold text-white">
                      Dedicated UK team embedded in your brand
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                      Direct Slack access to senior strategists, copywriters, and engineers without account manager friction.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action CTAs with Bespoke Button Design */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="group/cta inline-flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full bg-[#d2f83a] text-slate-950 font-bold shadow-lg shadow-lime-400/20 hover:bg-[#c0e82c] transition-all duration-300 hover:shadow-[0_6px_25px_rgba(210,248,58,0.4)] cursor-pointer"
                >
                  <span className="text-sm sm:text-base">Book Discovery Call</span>
                  <div className="w-8 h-8 rounded-full bg-slate-950 text-[#d2f83a] flex items-center justify-center transition-transform duration-300 group-hover/cta:rotate-45">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </Link>

                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-200 hover:text-white px-4 py-2 transition-colors duration-200"
                >
                  <span>Explore Capabilities</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
