"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowUpRight,
  Monitor,
  Search,
  Megaphone,
  BarChart2,
  Pencil,
  Target
} from "lucide-react";
import { Sora } from "next/font/google";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const WEBSITES = [
  {
    id: "left",
    shortLabel: "AI Platform",
    title: "AI Architecture & Platform",
    tag: "Next.js 15 · Performance",
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1789243091/c357bc35-216c-4acb-8ecc-a42844ac0f37.png",
  },
  {
    id: "middle",
    shortLabel: "Flagship Growth",
    title: "Digital Growth & Flagship Experience",
    tag: "Conversion-Engineered",
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1789243124/ebc13b6a-bd14-4520-a10d-b21d8d4abc64.png",
  },
  {
    id: "right",
    shortLabel: "Bespoke SaaS",
    title: "Bespoke SaaS & Web Application",
    tag: "High-ROAS Funnel",
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1789243194/b329a832-b375-4778-a34d-7007ebfe995e.png",
  },
];

export default function MainHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const cardMiddleRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);

  // Hover state for fluid headline icon expansion
  const [isTitleHovered, setIsTitleHovered] = useState(false);

  // Active showcase card on mobile touch screens (default: 1 for middle flagship)
  const [activeMobileCard, setActiveMobileCard] = useState(1);

  useGSAP(() => {
    // 1. Initial Page Load Reveal Timeline
    const loadTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    loadTl.fromTo(".hero-top-badge", 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.6, delay: 0.05 }
    );
    loadTl.fromTo(".hero-headline", 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8 }, 
      "-=0.3"
    );

    // Reveal Connected Flow Service Wings smoothly with permanent vertical centering
    gsap.set(".hero-service-wing", { yPercent: -50 });
    loadTl.fromTo(".hero-service-wing", 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }, 
      "-=0.3"
    );

    loadTl.fromTo(".hero-subhead", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6 }, 
      "-=0.7"
    );
    loadTl.fromTo(".hero-cta-btn", 
      { opacity: 0, scale: 0.94 }, 
      { opacity: 1, scale: 1, duration: 0.5 }, 
      "-=0.4"
    );
    loadTl.fromTo(".hero-deck-stage", 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, 
      "-=0.3"
    );

    // 2. Responsive 3D Perspective Fan-Out (Laptop, Desktop & Tablet)
    const mm = gsap.matchMedia();

    // ── DESKTOP & LAPTOP (1024px+) ──
    mm.add("(min-width: 1024px)", () => {
      // Viewport-aware horizontal shift prevents edge clipping on standard 13"-15" laptops
      const isWideScreen = window.innerWidth >= 1536;
      const isLargeScreen = window.innerWidth >= 1280;
      const fanX = isWideScreen ? 74 : isLargeScreen ? 64 : 54;

      gsap.set(cardLeftRef.current, {
        xPercent: -18,
        yPercent: 4,
        rotationZ: -4,
        rotationY: 5,
        scale: 0.94,
        transformOrigin: "bottom right",
      });

      gsap.set(cardRightRef.current, {
        xPercent: 18,
        yPercent: 4,
        rotationZ: 4,
        rotationY: -5,
        scale: 0.94,
        transformOrigin: "bottom left",
      });

      gsap.set(cardMiddleRef.current, {
        scale: 1,
        yPercent: 0,
        zIndex: 30,
      });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top 78%",
          end: "bottom 38%",
          scrub: 1.2,
        },
      });

      scrollTl
        .to(cardLeftRef.current, {
          xPercent: -fanX,
          yPercent: 0,
          rotationZ: 0,
          rotationY: 0,
          scale: 1,
          ease: "power2.out",
        }, 0)
        .to(cardRightRef.current, {
          xPercent: fanX,
          yPercent: 0,
          rotationZ: 0,
          rotationY: 0,
          scale: 1,
          ease: "power2.out",
        }, 0)
        .to(cardMiddleRef.current, {
          scale: 1.05,
          yPercent: -4,
          ease: "power2.out",
        }, 0);
    });

    // ── TABLET (640px to 1023px, iPad portrait & landscape) ──
    mm.add("(min-width: 640px) and (max-width: 1023px)", () => {
      gsap.set(cardLeftRef.current, {
        xPercent: -14,
        yPercent: 3,
        rotationZ: -4,
        rotationY: 4,
        scale: 0.94,
        transformOrigin: "bottom right",
      });

      gsap.set(cardRightRef.current, {
        xPercent: 14,
        yPercent: 3,
        rotationZ: 4,
        rotationY: -4,
        scale: 0.94,
        transformOrigin: "bottom left",
      });

      gsap.set(cardMiddleRef.current, {
        scale: 1,
        yPercent: 0,
        zIndex: 30,
      });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: 1.2,
        },
      });

      scrollTl
        .to(cardLeftRef.current, {
          xPercent: -36,
          yPercent: 0,
          rotationZ: -1,
          rotationY: 0,
          scale: 0.98,
          ease: "power2.out",
        }, 0)
        .to(cardRightRef.current, {
          xPercent: 36,
          yPercent: 0,
          rotationZ: 1,
          rotationY: 0,
          scale: 0.98,
          ease: "power2.out",
        }, 0)
        .to(cardMiddleRef.current, {
          scale: 1.03,
          yPercent: -3,
          ease: "power2.out",
        }, 0);
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className={`relative w-full overflow-hidden text-slate-900 pt-8 pb-20 sm:pt-12 sm:pb-28 md:pt-16 md:pb-36 ${sora.className}`}
      style={{
        backgroundImage: "url('/hero-thumb-1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Subtle bottom fade into page background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/70 to-transparent pointer-events-none z-0" />

      {/* Universal SVG Linear Gradient Definitions for Lucide Icons */}
      <svg className="absolute w-0 h-0 pointer-events-none opacity-0 overflow-hidden" aria-hidden="true">
        <defs>
          <linearGradient id="heroGradWeb" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>

          <linearGradient id="heroGradSeo" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>

          <linearGradient id="heroGradSocial" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>

          <linearGradient id="heroGradAnalytics" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>

          <linearGradient id="heroGradContent" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>

          <linearGradient id="heroGradAds" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── 1. TOP TRUST BADGE ─── */}
        <div className="hero-top-badge flex items-center justify-center mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-slate-200/80 bg-white/95 px-3.5 sm:px-5 py-1.5 sm:py-2 shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-md">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-700 tracking-tight">
              4.9/5 Average Client Rating
            </span>

            <span className="h-3 sm:h-3.5 w-px bg-slate-200"></span>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <img 
                src="/google-logo.webp" 
                alt="Google" 
                className="h-3 sm:h-4 w-auto object-contain"
              />
              <span className="text-[11px] sm:text-xs font-bold text-slate-900 tracking-tight">
                10+ Google Reviews
              </span>
            </div>
          </div>
        </div>

        {/* ─── 2. HEADLINE & CTA WITH FLANKING WINGS ─── */}
        <div className="relative max-w-[1400px] 2xl:max-w-[1480px] mx-auto py-1 sm:py-2">
          
          {/* ── LEFT WING: Web -> SEO -> Social (Desktop & Laptop: lg+) ── */}
          <div 
            className="hero-service-wing hidden lg:block absolute left-0 xl:left-2 2xl:left-6 top-1/2 w-[230px] xl:w-[250px] 2xl:w-[270px] h-[290px] pointer-events-auto select-none z-20"
            style={{ transform: "translateY(-50%)" }}
          >
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
              viewBox="0 0 250 290"
              fill="none"
            >
              <defs>
                <linearGradient id="heroFlowGradLeft" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#6366f1" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <path 
                d="M 60 34 C 12 78, 12 208, 60 252" 
                stroke="#e2e8f0" 
                strokeWidth="1.2" 
              />
              <path 
                d="M 60 34 C 12 78, 12 208, 60 252" 
                stroke="url(#heroFlowGradLeft)" 
                strokeWidth="1.6" 
                strokeLinecap="round"
                className="hero-flow-glow-path"
              />
            </svg>

            {/* Node 1: Web Development */}
            <div className="absolute top-[10px] left-[36px] flex items-center gap-3.5 group cursor-default">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-100 shadow-[0_8px_20px_-3px_rgba(15,23,42,0.06),0_2px_6px_-2px_rgba(15,23,42,0.04)] flex items-center justify-center shrink-0 group-hover:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.1)] group-hover:scale-105 transition-all duration-300 z-10">
                <Monitor className="w-5 h-5" stroke="url(#heroGradWeb)" strokeWidth={2.2} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[13px] xl:text-[14px] font-semibold text-slate-900 tracking-tight leading-snug">
                  Web Development
                </span>
                <span className="text-[11px] xl:text-xs text-slate-400 font-normal leading-tight mt-0.5">
                  Build better
                </span>
              </div>
            </div>

            {/* Node 2: SEO Strategy */}
            <div className="absolute top-[119px] left-[6px] flex items-center gap-3.5 group cursor-default">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-100 shadow-[0_8px_20px_-3px_rgba(15,23,42,0.06),0_2px_6px_-2px_rgba(15,23,42,0.04)] flex items-center justify-center shrink-0 group-hover:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.1)] group-hover:scale-105 transition-all duration-300 z-10">
                <Search className="w-5 h-5" stroke="url(#heroGradSeo)" strokeWidth={2.3} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[13px] xl:text-[14px] font-semibold text-slate-900 tracking-tight leading-snug">
                  SEO Strategy
                </span>
                <span className="text-[11px] xl:text-xs text-slate-400 font-normal leading-tight mt-0.5">
                  Rank higher
                </span>
              </div>
            </div>

            {/* Node 3: Social Media */}
            <div className="absolute top-[228px] left-[36px] flex items-center gap-3.5 group cursor-default">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-100 shadow-[0_8px_20px_-3px_rgba(15,23,42,0.06),0_2px_6px_-2px_rgba(15,23,42,0.04)] flex items-center justify-center shrink-0 group-hover:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.1)] group-hover:scale-105 transition-all duration-300 z-10">
                <Megaphone className="w-5 h-5" stroke="url(#heroGradSocial)" strokeWidth={2.2} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[13px] xl:text-[14px] font-semibold text-slate-900 tracking-tight leading-snug">
                  Social Media
                </span>
                <span className="text-[11px] xl:text-xs text-slate-400 font-normal leading-tight mt-0.5">
                  Grow your audience
                </span>
              </div>
            </div>
          </div>

          {/* ── RIGHT WING: Analytics -> Content -> Paid Ads (Desktop & Laptop: lg+) ── */}
          <div 
            className="hero-service-wing hidden lg:block absolute right-0 xl:right-2 2xl:right-6 top-1/2 w-[240px] xl:w-[260px] 2xl:w-[280px] h-[290px] pointer-events-auto select-none z-20"
            style={{ transform: "translateY(-50%)" }}
          >
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
              viewBox="0 0 270 290"
              fill="none"
            >
              <defs>
                <linearGradient id="heroFlowGradRight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#2563eb" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <path 
                d="M 40 34 C 88 78, 88 208, 40 252" 
                stroke="#e2e8f0" 
                strokeWidth="1.2" 
              />
              <path 
                d="M 40 34 C 88 78, 88 208, 40 252" 
                stroke="url(#heroFlowGradRight)" 
                strokeWidth="1.6" 
                strokeLinecap="round"
                className="hero-flow-glow-path"
              />
            </svg>

            {/* Node 1: Analytics */}
            <div className="absolute top-[10px] left-[16px] flex items-center gap-3.5 group cursor-default">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-100 shadow-[0_8px_20px_-3px_rgba(15,23,42,0.06),0_2px_6px_-2px_rgba(15,23,42,0.04)] flex items-center justify-center shrink-0 group-hover:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.1)] group-hover:scale-105 transition-all duration-300 z-10">
                <BarChart2 className="w-5 h-5" stroke="url(#heroGradAnalytics)" strokeWidth={2.4} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[13px] xl:text-[14px] font-semibold text-slate-900 tracking-tight leading-snug">
                  Analytics
                </span>
                <span className="text-[11px] xl:text-xs text-slate-400 font-normal leading-tight mt-0.5">
                  Data-driven decisions
                </span>
              </div>
            </div>

            {/* Node 2: Content Creation */}
            <div className="absolute top-[119px] left-[46px] flex items-center gap-3.5 group cursor-default">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-100 shadow-[0_8px_20px_-3px_rgba(15,23,42,0.06),0_2px_6px_-2px_rgba(15,23,42,0.04)] flex items-center justify-center shrink-0 group-hover:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.1)] group-hover:scale-105 transition-all duration-300 z-10">
                <Pencil className="w-5 h-5" stroke="url(#heroGradContent)" strokeWidth={2.2} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[13px] xl:text-[14px] font-semibold text-slate-900 tracking-tight leading-snug">
                  Content Creation
                </span>
                <span className="text-[11px] xl:text-xs text-slate-400 font-normal leading-tight mt-0.5">
                  Tell your story
                </span>
              </div>
            </div>

            {/* Node 3: Paid Ads */}
            <div className="absolute top-[228px] left-[16px] flex items-center gap-3.5 group cursor-default">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-100 shadow-[0_8px_20px_-3px_rgba(15,23,42,0.06),0_2px_6px_-2px_rgba(15,23,42,0.04)] flex items-center justify-center shrink-0 group-hover:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.1)] group-hover:scale-105 transition-all duration-300 z-10">
                <Target className="w-5 h-5" stroke="url(#heroGradAds)" strokeWidth={2.2} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[13px] xl:text-[14px] font-semibold text-slate-900 tracking-tight leading-snug">
                  Paid Ads
                </span>
                <span className="text-[11px] xl:text-xs text-slate-400 font-normal leading-tight mt-0.5">
                  Get real results
                </span>
              </div>
            </div>
          </div>

          {/* ── CENTER: Headline, Subhead & Kinetic CTA ── */}
          <div className="relative text-center w-full max-w-2xl lg:max-w-[780px] xl:max-w-[880px] 2xl:max-w-[960px] mx-auto select-none py-1 sm:py-2 z-10">
            
            {/* Title hover trigger box */}
            <div 
              className="inline-block relative py-1 sm:py-2 px-2 sm:px-6 cursor-default"
              onMouseEnter={() => setIsTitleHovered(true)}
              onMouseLeave={() => setIsTitleHovered(false)}
            >
              <h1 className="hero-headline text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[48px] 2xl:text-[54px] font-extrabold tracking-tight text-slate-950 leading-[1.2]">
                
                {/* LINE 1: Crafting Flagship [🚀 reveals & pushes text smoothly] Websites */}
                <div className="flex items-center justify-center whitespace-nowrap">
                  <span>Crafting Flagship</span>

                  <span 
                    className="inline-flex items-center justify-center align-middle overflow-hidden pointer-events-none"
                    style={{
                      width: isTitleHovered ? 44 : 0,
                      opacity: isTitleHovered ? 1 : 0,
                      transform: isTitleHovered ? "scale(1)" : "scale(0.4)",
                      marginRight: isTitleHovered ? 8 : 0,
                      transition: "width 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease, transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1), margin-right 350ms ease",
                    }}
                  >
                    <img 
                      src="/startup.svg" 
                      alt="Startup Rocket" 
                      className="w-7 h-7 sm:w-10 sm:h-10 ml-2 object-contain filter drop-shadow-sm"
                    />
                  </span>

                  <span className="ml-1.5 sm:ml-2.5">Websites</span>
                </div>

                {/* LINE 2: & Growth [🎯 reveals & pushes text smoothly] Systems That Scale */}
                <div className="flex items-center justify-center whitespace-nowrap mt-1 sm:mt-2.5">
                  <span>&amp; Growth</span>

                  <span 
                    className="inline-flex items-center justify-center align-middle overflow-hidden pointer-events-none"
                    style={{
                      width: isTitleHovered ? 44 : 0,
                      opacity: isTitleHovered ? 1 : 0,
                      transform: isTitleHovered ? "scale(1)" : "scale(0.4)",
                      marginRight: isTitleHovered ? 8 : 0,
                      transition: "width 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease, transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1), margin-right 350ms ease",
                    }}
                  >
                    <img 
                      src="/target-hero-title.svg" 
                      alt="Growth Target" 
                      className="w-7 h-7 sm:w-10 sm:h-10 ml-2 object-contain filter drop-shadow-sm"
                    />
                  </span>

                  <span className="ml-1.5 sm:ml-2.5">Systems That Scale</span>
                </div>

              </h1>
            </div>

            {/* Subheading */}
            <p className="hero-subhead mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed px-4">
              We engineer high-converting websites, scale profitable paid search &amp; social funnels, and build digital authority for UK businesses.
            </p>

            {/* Single High-Conversion Kinetic Sliding CTA Button */}
            <div className="hero-cta-btn mt-6 sm:mt-8 flex justify-center px-4">
              <Link
                href="/contact"
                className="relative inline-flex items-center justify-center text-sm sm:text-base font-bold text-white rounded-full h-12 sm:h-[52px] p-1 ps-6 sm:ps-7 pe-14 sm:pe-16 group transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:ps-14 sm:hover:ps-16 hover:pe-6 sm:hover:pe-7 w-fit max-w-full overflow-hidden cursor-pointer bg-slate-950 hover:bg-black border border-slate-800/80 shadow-[0_10px_30px_rgba(15,23,42,0.35)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.45)] active:scale-[0.98] select-none transform-gpu"
              >
                <span className="relative z-10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap text-xs sm:text-base">
                  Book a Free Strategy Call
                </span>
                <div className="pointer-events-none absolute right-1 w-10 h-10 bg-white text-slate-950 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:right-[calc(100%-44px)] group-hover:rotate-45 shadow-sm transform-gpu will-change-[transform,right] [backface-visibility:hidden] [transform:translateZ(0)]">
                  <ArrowUpRight size={18} className="stroke-[2.5] shrink-0 transform-gpu [backface-visibility:hidden] [transform:translateZ(0)]" />
                </div>
              </Link>
            </div>
          </div>

          {/* ── RESPONSIVE SERVICES FLOW (< lg screens: tablet & mobile clean card grid) ── */}
          <div className="lg:hidden mt-8 sm:mt-10 max-w-lg sm:max-w-3xl md:max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
              
              {/* 1. Web */}
              <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white/85 backdrop-blur-md border border-slate-100 shadow-[0_2px_10px_rgba(15,23,42,0.03)] hover:shadow-md transition-shadow">
                <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-white border border-slate-100 shadow-xs flex items-center justify-center shrink-0">
                  <Monitor className="w-4 sm:w-4.5 h-4 sm:h-4.5" stroke="url(#heroGradWeb)" strokeWidth={2.2} />
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-xs sm:text-[13px] font-semibold text-slate-900 leading-tight">Web Development</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 leading-tight mt-0.5">Build better</span>
                </div>
              </div>

              {/* 2. SEO */}
              <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white/85 backdrop-blur-md border border-slate-100 shadow-[0_2px_10px_rgba(15,23,42,0.03)] hover:shadow-md transition-shadow">
                <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-white border border-slate-100 shadow-xs flex items-center justify-center shrink-0">
                  <Search className="w-4 sm:w-4.5 h-4 sm:h-4.5" stroke="url(#heroGradSeo)" strokeWidth={2.3} />
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-xs sm:text-[13px] font-semibold text-slate-900 leading-tight">SEO Strategy</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 leading-tight mt-0.5">Rank higher</span>
                </div>
              </div>

              {/* 3. Social */}
              <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white/85 backdrop-blur-md border border-slate-100 shadow-[0_2px_10px_rgba(15,23,42,0.03)] hover:shadow-md transition-shadow">
                <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-white border border-slate-100 shadow-xs flex items-center justify-center shrink-0">
                  <Megaphone className="w-4 sm:w-4.5 h-4 sm:h-4.5" stroke="url(#heroGradSocial)" strokeWidth={2.2} />
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-xs sm:text-[13px] font-semibold text-slate-900 leading-tight">Social Media</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 leading-tight mt-0.5">Grow your audience</span>
                </div>
              </div>

              {/* 4. Analytics */}
              <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white/85 backdrop-blur-md border border-slate-100 shadow-[0_2px_10px_rgba(15,23,42,0.03)] hover:shadow-md transition-shadow">
                <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-white border border-slate-100 shadow-xs flex items-center justify-center shrink-0">
                  <BarChart2 className="w-4 sm:w-4.5 h-4 sm:h-4.5" stroke="url(#heroGradAnalytics)" strokeWidth={2.4} />
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-xs sm:text-[13px] font-semibold text-slate-900 leading-tight">Analytics</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 leading-tight mt-0.5">Data-driven decisions</span>
                </div>
              </div>

              {/* 5. Content */}
              <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white/85 backdrop-blur-md border border-slate-100 shadow-[0_2px_10px_rgba(15,23,42,0.03)] hover:shadow-md transition-shadow">
                <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-white border border-slate-100 shadow-xs flex items-center justify-center shrink-0">
                  <Pencil className="w-4 sm:w-4.5 h-4 sm:h-4.5" stroke="url(#heroGradContent)" strokeWidth={2.2} />
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-xs sm:text-[13px] font-semibold text-slate-900 leading-tight">Content Creation</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 leading-tight mt-0.5">Tell your story</span>
                </div>
              </div>

              {/* 6. Paid Ads */}
              <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white/85 backdrop-blur-md border border-slate-100 shadow-[0_2px_10px_rgba(15,23,42,0.03)] hover:shadow-md transition-shadow">
                <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-white border border-slate-100 shadow-xs flex items-center justify-center shrink-0">
                  <Target className="w-4 sm:w-4.5 h-4 sm:h-4.5" stroke="url(#heroGradAds)" strokeWidth={2.2} />
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-xs sm:text-[13px] font-semibold text-slate-900 leading-tight">Paid Ads</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 leading-tight mt-0.5">Get real results</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ─── 3. SHOWCASE STAGE ─── */}
        <div ref={stageRef} className="hero-deck-stage relative mt-12 sm:mt-16 md:mt-24 max-w-6xl mx-auto">

          {/* ── TABLET & DESKTOP SHOWCASE (>= 640px): 3D Perspective Stage ── */}
          <div className="hidden sm:flex relative min-h-[380px] sm:min-h-[440px] md:min-h-[480px] lg:min-h-[540px] xl:min-h-[580px] w-full items-center justify-center perspective-[1400px]">
            
            {/* ── CARD LEFT (Sanchez Watt Coaching) ── */}
            <div 
              ref={cardLeftRef}
              className="absolute w-[340px] sm:w-[380px] md:w-[420px] lg:w-[460px] xl:w-[530px] 2xl:w-[590px] p-[1px] rounded-2xl md:rounded-[22px] bg-gradient-to-b from-white/90 via-slate-200/50 to-slate-400/30 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.38),0_10px_20px_-5px_rgba(15,23,42,0.18)] z-10 transition-shadow duration-300 hover:shadow-[0_35px_80px_rgba(0,0,0,0.45)]"
            >
              <div className="relative aspect-[16/10] w-full rounded-[15px] md:rounded-[21px] overflow-hidden bg-slate-950">
                <Image
                  src={WEBSITES[0].src}
                  alt={WEBSITES[0].title}
                  fill
                  sizes="(max-width: 768px) 380px, (max-width: 1024px) 440px, (max-width: 1440px) 530px, 590px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* ── CARD RIGHT (Solar Installation) ── */}
            <div 
              ref={cardRightRef}
              className="absolute w-[340px] sm:w-[380px] md:w-[420px] lg:w-[460px] xl:w-[530px] 2xl:w-[590px] p-[1px] rounded-2xl md:rounded-[22px] bg-gradient-to-b from-white/90 via-slate-200/50 to-slate-400/30 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.38),0_10px_20px_-5px_rgba(15,23,42,0.18)] z-10 transition-shadow duration-300 hover:shadow-[0_35px_80px_rgba(0,0,0,0.45)]"
            >
              <div className="relative aspect-[16/10] w-full rounded-[15px] md:rounded-[21px] overflow-hidden bg-slate-950">
                <Image
                  src={WEBSITES[2].src}
                  alt={WEBSITES[2].title}
                  fill
                  sizes="(max-width: 768px) 380px, (max-width: 1024px) 440px, (max-width: 1440px) 530px, 590px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* ── CARD MIDDLE (FLAGSHIP: Walker Roofing & Solar) ── */}
            <div 
              ref={cardMiddleRef}
              className="relative w-[360px] sm:w-[410px] md:w-[450px] lg:w-[500px] xl:w-[580px] 2xl:w-[650px] p-[1.5px] rounded-2xl md:rounded-[24px] bg-gradient-to-b from-emerald-400/90 via-white/80 to-slate-400/40 shadow-[0_35px_80px_-15px_rgba(15,23,42,0.45),0_15px_30px_-5px_rgba(16,185,129,0.2)] z-30 transition-shadow duration-300 hover:shadow-[0_45px_100px_rgba(16,185,129,0.35)]"
            >
              <div className="relative aspect-[16/10] w-full rounded-[15px] md:rounded-[22.5px] overflow-hidden bg-slate-950">
                <Image
                  src={WEBSITES[1].src}
                  alt={WEBSITES[1].title}
                  fill
                  sizes="(max-width: 768px) 410px, (max-width: 1024px) 480px, (max-width: 1440px) 580px, 650px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

          </div>

          {/* ── MOBILE SHOWCASE (< 640px): Interactive Stacked 3D Card Deck ── */}
          <div className="block sm:hidden relative px-2 pb-2">
            
            {/* Project Switcher Pills */}
            <div className="flex items-center justify-center gap-1.5 mb-5">
              {WEBSITES.map((site, idx) => {
                const isSelected = activeMobileCard === idx;
                return (
                  <button
                    key={site.id}
                    type="button"
                    onClick={() => setActiveMobileCard(idx)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                      isSelected
                        ? "bg-slate-950 text-white shadow-sm scale-100"
                        : "bg-white/80 backdrop-blur-md text-slate-600 border border-slate-200/70 hover:bg-white scale-95"
                    }`}
                  >
                    {site.shortLabel}
                  </button>
                );
              })}
            </div>

            {/* Stacked Mobile Cards Stage */}
            <div className="relative w-full aspect-[16/11] max-w-[350px] mx-auto perspective-[1000px] my-2">
              {WEBSITES.map((site, idx) => {
                const isActive = activeMobileCard === idx;
                let transformStyle = "";
                let zIndex = 10;
                let opacity = 0.7;

                if (isActive) {
                  transformStyle = "translate3d(0, 0, 0) scale(1) rotate(0deg)";
                  zIndex = 30;
                  opacity = 1;
                } else if (activeMobileCard === 1) {
                  // Middle active: 0 peeks left, 2 peeks right
                  if (idx === 0) {
                    transformStyle = "translate3d(-18px, 6px, -20px) scale(0.92) rotate(-3deg)";
                    zIndex = 15;
                    opacity = 0.75;
                  } else {
                    transformStyle = "translate3d(18px, 6px, -20px) scale(0.92) rotate(3deg)";
                    zIndex = 15;
                    opacity = 0.75;
                  }
                } else if (activeMobileCard === 0) {
                  // Left active: 1 peeks right, 2 peeks further right
                  if (idx === 1) {
                    transformStyle = "translate3d(18px, 6px, -20px) scale(0.92) rotate(2.5deg)";
                    zIndex = 20;
                    opacity = 0.8;
                  } else {
                    transformStyle = "translate3d(32px, 12px, -40px) scale(0.85) rotate(5deg)";
                    zIndex = 10;
                    opacity = 0.6;
                  }
                } else {
                  // Right active: 1 peeks left, 0 peeks further left
                  if (idx === 1) {
                    transformStyle = "translate3d(-18px, 6px, -20px) scale(0.92) rotate(-2.5deg)";
                    zIndex = 20;
                    opacity = 0.8;
                  } else {
                    transformStyle = "translate3d(-32px, 12px, -40px) scale(0.85) rotate(-5deg)";
                    zIndex = 10;
                    opacity = 0.6;
                  }
                }

                return (
                  <div
                    key={site.id}
                    onClick={() => setActiveMobileCard(idx)}
                    className={`absolute inset-0 cursor-pointer p-[1.5px] rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      idx === 1
                        ? "bg-gradient-to-b from-emerald-400/90 via-white/80 to-slate-400/40 shadow-[0_20px_50px_rgba(15,23,42,0.3)]"
                        : "bg-gradient-to-b from-white/90 via-slate-200/50 to-slate-400/30 shadow-[0_15px_40px_rgba(15,23,42,0.22)]"
                    }`}
                    style={{
                      transform: transformStyle,
                      zIndex,
                      opacity,
                    }}
                  >
                    <div className="relative w-full h-full rounded-[14.5px] overflow-hidden bg-slate-950">
                      <Image
                        src={site.src}
                        alt={site.title}
                        fill
                        sizes="350px"
                        className="object-cover object-top"
                        priority={idx === 1}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Card Information Pill */}
            <div className="mt-4 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/5 border border-slate-200/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-900">{WEBSITES[activeMobileCard].title}</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-1 font-medium">{WEBSITES[activeMobileCard].tag}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
