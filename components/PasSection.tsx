"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Megaphone, 
  BarChart3, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp,
  Sparkles
} from "lucide-react";
import { Sora } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  metric: string;
  icon: React.ReactNode;
  iconBg: string;
  badgeBg: string;
  badgeColor: string;
  accentBorder: string;
  offsetClass: string;
}

const SERVICE_CARDS: ServiceCard[] = [
  {
    id: "paid-media",
    title: "Paid Media",
    description: "Increasing conversions, repeat traffic, and online authority across your website is our top priority.",
    metric: "4.8x Avg ROAS",
    icon: <Megaphone className="w-5 h-5 text-slate-900" />,
    iconBg: "bg-slate-100",
    badgeBg: "bg-slate-100",
    badgeColor: "text-slate-800",
    accentBorder: "hover:border-slate-300",
    offsetClass: "lg:translate-y-0",
  },
  {
    id: "website-optimization",
    title: "Website Optimization",
    description: "In order for your funnel to be successful, you need to make it as smooth as possible.",
    metric: "99 Vitals · Sub-1s",
    icon: <BarChart3 className="w-5 h-5 text-slate-950" />,
    iconBg: "bg-amber-400",
    badgeBg: "bg-amber-50",
    badgeColor: "text-amber-700",
    accentBorder: "hover:border-amber-300",
    offsetClass: "lg:translate-y-8",
  },
  {
    id: "email-sms",
    title: "Email & SMS Marketing",
    description: "Leads are nurtured through our email, SMS, and automation services, resulting in customer acquisition and retention.",
    metric: "+42% LTV Retention",
    icon: <Mail className="w-5 h-5 text-white" />,
    iconBg: "bg-indigo-600",
    badgeBg: "bg-indigo-50",
    badgeColor: "text-indigo-700",
    accentBorder: "hover:border-indigo-300",
    offsetClass: "lg:translate-y-16",
  },
];

export default function PasSection() {
  return (
    <section className={`relative w-full py-20 sm:py-28 lg:py-36 bg-gradient-to-b from-white via-[#faf9f6]/70 to-white overflow-hidden ${sora.className}`}>
      {/* Ambient background aura */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-100/30 via-sky-100/20 to-transparent blur-3xl rounded-full" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─── 1. TOP HEADER: Split Title & Value Proposition ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 sm:mb-20">
          {/* Left: Main Problem-Solving Headline */}
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-slate-950 tracking-tight leading-[1.15]">
              Our services solve any business problem
            </h2>
          </div>

          {/* Center: Delicate 4-Point Star Ornament */}
          <div className="hidden lg:flex lg:col-span-1 justify-center items-center">
            <svg 
              viewBox="0 0 24 24" 
              className="w-6 h-6 text-slate-900 fill-current"
            >
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          </div>

          {/* Right: Explanatory Subtitle */}
          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Our team has a successful track record of helping brands scale profitably based on high-performing strategies.
            </p>
          </div>
        </div>

        {/* ─── 2. THE 3 STAGGERED ELEVATED SOLUTION CARDS ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-12 sm:pb-24">
          {SERVICE_CARDS.map((card) => (
            <div
              key={card.id}
              className={`group relative rounded-[28px] sm:rounded-[32px] p-8 sm:p-9 bg-white border border-slate-200/80 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.04)] transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.08)] ${card.accentBorder} ${card.offsetClass}`}
            >
              {/* Top Row: Icon Badge + Micro Metric Pill */}
              <div className="flex items-center justify-between mb-8">
                <div className={`w-14 h-14 rounded-full ${card.iconBg} flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-110`}>
                  {card.icon}
                </div>

                <span className={`text-[11px] font-bold px-3 py-1 rounded-full border border-current/15 ${card.badgeBg} ${card.badgeColor}`}>
                  {card.metric}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight mb-3">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-normal">
                {card.description}
              </p>

              {/* Subtle interactive explore link */}
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors duration-200">
                <span>Explore capability</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

        {/* ─── 3. BOTTOM PAS SECTION: Overlapping Photos & Why Digital Marketing ─── */}
        <div className="relative mt-16 sm:mt-24 pt-12 sm:pt-20 border-t border-slate-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT COLUMN: Overlapping Team & Results Imagery with Whimsical Curved Trail */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[420px] sm:min-h-[500px]">
              
              {/* Whimsical Curved Dashed SVG Track connecting Photo 1 to Photo 2 */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 500 500"
                fill="none"
              >
                <path 
                  d="M140 280 C 180 380, 240 440, 310 390 C 370 340, 280 260, 330 200" 
                  stroke="#64748b" 
                  strokeWidth="2.2" 
                  strokeDasharray="6 6" 
                  strokeLinecap="round"
                  className="opacity-70"
                />
              </svg>

              {/* Photo 1: Team Collaboration & Screen Analytics (Top-Left) */}
              <div className="absolute top-0 left-0 w-[58%] sm:w-[56%] aspect-[4/3] rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(15,23,42,0.18)] border-4 border-white z-0 transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src="/team-collaboration.jpg"
                  alt="Truedge Growth Strategy Specialists"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Photo 2: Strategist Explaining Upward Hockey-Stick Growth (Bottom-Right) */}
              <div className="absolute bottom-0 right-0 w-[62%] sm:w-[60%] aspect-[4/3] rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-[0_30px_70px_-15px_rgba(15,23,42,0.22)] border-4 border-white z-20 transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src="/team-strategy.jpg"
                  alt="Revenue Growth Whiteboard Funnel"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Social Proof Badge */}
              <div className="absolute -bottom-4 left-6 z-30 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-xs">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 leading-tight">4.8x Avg Client ROAS</span>
                  <span className="text-[10px] font-medium text-slate-500">Scaled across UK sectors</span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: The "Why Digital Marketing" Problem/Solution Pitch */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-tight">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>The Engine That Delivers Growth</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-950 tracking-tight leading-[1.18]">
                Why you need digital marketing
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                In order to scale new customer acquisition and retention for e-commerce brands, we work across the entire customer journey. Our team has a successful track record of helping brands scale profitably based on high-performing strategies.
              </p>

              {/* 3 Value Pillars */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-semibold text-slate-800">
                    Full-funnel conversion engineering with zero generic templates
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-semibold text-slate-800">
                    High-ROAS paid media funnels across Search, Meta &amp; Social
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-semibold text-slate-800">
                    Dedicated UK engineering &amp; analytics team embedded into your brand
                  </span>
                </div>
              </div>

              {/* Interactive CTA Link */}
              <div className="pt-4">
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2 text-base sm:text-lg font-bold text-slate-950 pb-1 border-b-2 border-slate-950 hover:text-emerald-600 hover:border-emerald-600 transition-all duration-300"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
