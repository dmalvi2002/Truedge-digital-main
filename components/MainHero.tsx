"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowUpRight 
} from "lucide-react";
import { Sora } from "next/font/google";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const WEBSITES = {
  left: {
    title: "AI Architecture & Platform",
    tag: "Next.js 15 · Performance",
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1789243091/c357bc35-216c-4acb-8ecc-a42844ac0f37.png",
  },
  middle: {
    title: "Digital Growth & Flagship Experience",
    tag: "Conversion-Engineered",
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1789243124/ebc13b6a-bd14-4520-a10d-b21d8d4abc64.png",
  },
  right: {
    title: "Bespoke SaaS & Web Application",
    tag: "High-ROAS Funnel",
    src: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1789243194/b329a832-b375-4778-a34d-7007ebfe995e.png",
  },
};

export default function MainHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const cardMiddleRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);

  // Animated SVG Icons: Container refs for intro blossom & scroll glide; Inner refs for continuous organic floating
  const penToolContainerRef = useRef<HTMLDivElement>(null);
  const penToolInnerRef = useRef<HTMLDivElement>(null);
  const megaphoneContainerRef = useRef<HTMLDivElement>(null);
  const megaphoneInnerRef = useRef<HTMLDivElement>(null);
  const magnetContainerRef = useRef<HTMLDivElement>(null);
  const magnetInnerRef = useRef<HTMLDivElement>(null);
  const arrowContainerRef = useRef<HTMLDivElement>(null);
  const arrowInnerRef = useRef<HTMLDivElement>(null);

  // Hover state for rock-solid, fluid title expansion physics
  const [isTitleHovered, setIsTitleHovered] = useState(false);

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

    // ── MOTION ARTIST INTRO: 4 Icons smoothly glide outward from the heart of the title ──
    loadTl
      .fromTo(penToolContainerRef.current,
        { x: 150, y: 50, scale: 0.18, opacity: 0 },
        { x: 0, y: 0, scale: 1, opacity: 1, duration: 1.15, ease: "power3.out", force3D: true },
        "-=0.45"
      )
      .fromTo(megaphoneContainerRef.current,
        { x: -150, y: 50, scale: 0.18, opacity: 0 },
        { x: 0, y: 0, scale: 1, opacity: 1, duration: 1.15, ease: "power3.out", force3D: true },
        "<" // perfectly simultaneous with top-left for bilateral symmetry
      )
      .fromTo(magnetContainerRef.current,
        { x: 125, y: -80, scale: 0.18, opacity: 0 },
        { x: 0, y: 0, scale: 1, opacity: 1, duration: 1.15, ease: "power3.out", force3D: true },
        "-=0.98" // natural 0.15s follow-through cadence
      )
      .fromTo(arrowContainerRef.current,
        { x: -125, y: -80, scale: 0.18, opacity: 0 },
        { x: 0, y: 0, scale: 1, opacity: 1, duration: 1.15, ease: "power3.out", force3D: true },
        "<" // perfectly simultaneous with bottom-left for bilateral symmetry
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

    // 2. Ambient organic floating for the 4 compact icons
    gsap.to(penToolInnerRef.current, {
      y: -7,
      rotation: -3,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(megaphoneInnerRef.current, {
      y: 7,
      rotation: 3,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.2,
    });

    gsap.to(magnetInnerRef.current, {
      y: -7,
      rotation: -3,
      duration: 3.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.1,
    });

    gsap.to(arrowInnerRef.current, {
      y: 7,
      rotation: 3,
      duration: 3.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.3,
    });

    // 3. Desktop-Only Option 5 Scroll Animation: "3D Perspective Fan-Out" & Icons Gliding Up
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Initial stacked deck transforms with Linear / FinTech precision
      gsap.set(cardLeftRef.current, {
        xPercent: -20,
        yPercent: 4,
        rotationZ: -4,
        rotationY: 6,
        scale: 0.94,
        transformOrigin: "bottom right",
      });

      gsap.set(cardRightRef.current, {
        xPercent: 20,
        yPercent: 4,
        rotationZ: 4,
        rotationY: -6,
        scale: 0.94,
        transformOrigin: "bottom left",
      });

      gsap.set(cardMiddleRef.current, {
        scale: 1,
        yPercent: 0,
        zIndex: 30,
      });

      // Scroll-driven Fan-Out scrub timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top 75%",
          end: "bottom 35%",
          scrub: 1.2,
        },
      });

      scrollTl
        // Left card fans out to the left and straightens
        .to(cardLeftRef.current, {
          xPercent: -95,
          yPercent: 0,
          rotationZ: 0,
          rotationY: 0,
          scale: 1,
          ease: "power2.out",
        }, 0)
        // Right card fans out to the right and straightens
        .to(cardRightRef.current, {
          xPercent: 95,
          yPercent: 0,
          rotationZ: 0,
          rotationY: 0,
          scale: 1,
          ease: "power2.out",
        }, 0)
        // Middle card elevates smoothly
        .to(cardMiddleRef.current, {
          scale: 1.05,
          yPercent: -4,
          ease: "power2.out",
        }, 0)
        // All 4 compact icons smoothly glide UPWARDS on scroll
        .to(penToolContainerRef.current, {
          y: -42,
          immediateRender: false,
          ease: "power1.out",
        }, 0)
        .to(megaphoneContainerRef.current, {
          y: -42,
          immediateRender: false,
          ease: "power1.out",
        }, 0)
        .to(magnetContainerRef.current, {
          y: -42,
          immediateRender: false,
          ease: "power1.out",
        }, 0)
        .to(arrowContainerRef.current, {
          y: -42,
          immediateRender: false,
          ease: "power1.out",
        }, 0);
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className={`relative w-full overflow-hidden text-slate-900 pt-10 pb-24 md:pt-16 md:pb-36 ${sora.className}`}
      style={{
        backgroundImage: "url('/hero-thumb-1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Subtle bottom fade into page background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/70 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── 1. TOP TRUST BADGE (Rating & Safety Indicator) ─── */}
        <div className="hero-top-badge flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 sm:gap-3 rounded-full border border-slate-200/80 bg-white/95 px-4 sm:px-5 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-md">
            <span className="text-xs font-semibold text-slate-700 tracking-tight">
              4.9/5 Average Client Rating
            </span>

            <span className="h-3.5 w-px bg-slate-200"></span>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <img 
                src="/google-logo.webp" 
                alt="Google" 
                className="h-3.5 sm:h-4 w-auto object-contain"
              />
              <span className="text-xs font-bold text-slate-900 tracking-tight">
                10+ Google Reviews
              </span>
            </div>
          </div>
        </div>

        {/* ─── 2. HEADLINE & CTA WITH 4 COMPACT ANIMATED ICONS IN EXACT POSITIONS ─── */}
        <div className="relative text-center max-w-5xl mx-auto select-none py-2">
          
          {/* ── ICON 1 (Top-Left): Pen Tool ── */}
          <div 
            ref={penToolContainerRef}
            className="hero-compact-icon hidden sm:block absolute top-1 md:top-3 left-2 sm:left-4 md:-left-4 lg:-left-12 xl:-left-16 z-20 pointer-events-none select-none"
          >
            <div 
              ref={penToolInnerRef}
              className="w-13 h-13 sm:w-15 sm:h-15 lg:w-[80px] lg:h-[80px] filter drop-shadow-[0_8px_18px_rgba(255,102,0,0.22)]"
            >
              <img 
                src="/pen-tool.svg" 
                alt="Design Pen Tool" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* ── ICON 2 (Top-Right): Megaphone ── */}
          <div 
            ref={megaphoneContainerRef}
            className="hero-compact-icon hidden sm:block absolute top-1 md:top-3 right-2 sm:right-4 md:-right-4 lg:-right-12 xl:-right-16 z-20 pointer-events-none select-none"
          >
            <div 
              ref={megaphoneInnerRef}
              className="w-13 h-13 sm:w-15 sm:h-15 lg:w-[66px] lg:h-[66px] filter drop-shadow-[0_8px_18px_rgba(239,68,68,0.22)] transform rotate-12"
            >
              <img 
                src="/megaphone.svg" 
                alt="Megaphone Broadcast" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* ── ICON 3 (Bottom-Left): Magnet ── */}
          <div 
            ref={magnetContainerRef}
            className="hero-compact-icon hidden sm:block absolute bottom-0 sm:bottom-1 md:bottom-2 left-6 sm:left-12 md:left-8 lg:left-6 xl:left-2 z-20 pointer-events-none select-none"
          >
            <div 
              ref={magnetInnerRef}
              className="w-13 h-13 sm:w-15 sm:h-15 lg:w-[64px] lg:h-[64px] filter drop-shadow-[0_8px_18px_rgba(37,103,157,0.24)] transform -rotate-12"
            >
              <img 
                src="/magnet.svg" 
                alt="Lead Magnet" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* ── ICON 4 (Bottom-Right): Target & Arrow ── */}
          <div 
            ref={arrowContainerRef}
            className="hero-compact-icon hidden sm:block absolute bottom-0 sm:bottom-1 md:bottom-2 right-6 sm:right-12 md:right-8 lg:right-6 xl:right-2 z-20 pointer-events-none select-none"
          >
            <div 
              ref={arrowInnerRef}
              className="w-13 h-13 sm:w-15 sm:h-15 lg:w-[75px] lg:h-[75px] filter drop-shadow-[0_8px_18px_rgba(247,77,77,0.24)]"
            >
              <img 
                src="/arrow.svg" 
                alt="Target & Arrow" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Title hover trigger box: rock-solid React state management prevents rapid hover stutter */}
          <div 
            className="inline-block relative py-2 px-4 sm:px-6 cursor-default"
            onMouseEnter={() => setIsTitleHovered(true)}
            onMouseLeave={() => setIsTitleHovered(false)}
          >
            <h1 className="hero-headline text-3xl sm:text-5xl lg:text-[62px] font-extrabold tracking-tight text-slate-950 leading-[1.2]">
              
              {/* LINE 1: Crafting Flagship [🚀 reveals & pushes text smoothly] Websites */}
              <div className="flex items-center justify-center whitespace-nowrap">
                <span>Crafting Flagship</span>

                {/* Startup Rocket Icon: Smooth expansion without stutter on hover */}
                <span 
                  className="inline-flex items-center justify-center align-middle overflow-hidden pointer-events-none"
                  style={{
                    width: isTitleHovered ? 48 : 0,
                    opacity: isTitleHovered ? 1 : 0,
                    transform: isTitleHovered ? "scale(1)" : "scale(0.4)",
                    marginRight: isTitleHovered ? 8 : 0,
                    transition: "width 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease, transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1), margin-right 350ms ease",
                  }}
                >
                  <img 
                    src="/startup.svg" 
                    alt="Startup Rocket" 
                    className="w-8 h-8 sm:w-10 sm:h-10 ml-2 object-contain filter drop-shadow-sm"
                  />
                </span>

                <span className="ml-2 sm:ml-2.5">Websites</span>
              </div>

              {/* LINE 2: & Growth [🎯 reveals & pushes text smoothly] Systems That Scale */}
              <div className="flex items-center justify-center whitespace-nowrap mt-1 sm:mt-2.5">
                <span>&amp; Growth</span>

                {/* Target Hero Icon: Smooth expansion without stutter on hover */}
                <span 
                  className="inline-flex items-center justify-center align-middle overflow-hidden pointer-events-none"
                  style={{
                    width: isTitleHovered ? 48 : 0,
                    opacity: isTitleHovered ? 1 : 0,
                    transform: isTitleHovered ? "scale(1)" : "scale(0.4)",
                    marginRight: isTitleHovered ? 8 : 0,
                    transition: "width 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease, transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1), margin-right 350ms ease",
                  }}
                >
                  <img 
                    src="/target-hero-title.svg" 
                    alt="Growth Target" 
                    className="w-8 h-8 sm:w-10 sm:h-10 ml-2 object-contain filter drop-shadow-sm"
                  />
                </span>

                <span className="ml-2 sm:ml-2.5">Systems That Scale</span>
              </div>

            </h1>
          </div>

          {/* Subheading */}
          <p className="hero-subhead mt-6 text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            We engineer high-converting websites, scale profitable paid search &amp; social funnels, and build digital authority for UK businesses.
          </p>

          {/* Single High-Conversion Kinetic Sliding CTA Button (Black) */}
          <div className="hero-cta-btn mt-8 flex justify-center">
            <Link
              href="/contact"
              className="relative inline-flex items-center justify-center text-sm sm:text-base font-bold text-white rounded-full h-12 sm:h-[52px] p-1 ps-7 pe-16 group transition-all duration-500 hover:ps-16 hover:pe-7 w-fit overflow-hidden cursor-pointer bg-slate-950 hover:bg-black border border-slate-800/80 shadow-[0_10px_30px_rgba(15,23,42,0.35)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.45)] active:scale-[0.98]"
            >
              <span className="relative z-10 transition-all duration-500 whitespace-nowrap">
                Get Started
              </span>
              <div className="absolute right-1 w-10 h-10 bg-white text-slate-950 rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45 shadow-sm">
                <ArrowUpRight size={18} className="stroke-[2.5]" />
              </div>
            </Link>
          </div>
        </div>

        {/* ─── 3. SHOWCASE STAGE: OPTION 5 - THE DUAL-TONE MONOLITHIC SLABS (Precision FinTech / Linear) ─── */}
        <div ref={stageRef} className="hero-deck-stage relative mt-16 sm:mt-24 max-w-6xl mx-auto">

          {/* Desktop Showcase: Interactive 3D Perspective Stage */}
          <div className="relative min-h-[420px] sm:min-h-[500px] lg:min-h-[560px] w-full flex items-center justify-center perspective-[1400px]">
            
            {/* ── CARD LEFT (Sanchez Watt Coaching) - Dual-Tone Monolithic Slab ── */}
            <div 
              ref={cardLeftRef}
              className="absolute w-[82%] sm:w-[500px] lg:w-[540px] xl:w-[590px] p-[1px] rounded-2xl md:rounded-[22px] bg-gradient-to-b from-white/90 via-slate-200/50 to-slate-400/30 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.38),0_10px_20px_-5px_rgba(15,23,42,0.18)] z-10 transition-shadow duration-300 hover:shadow-[0_35px_80px_rgba(0,0,0,0.45)]"
            >
              <div className="relative aspect-[16/10] w-full rounded-[15px] md:rounded-[21px] overflow-hidden bg-slate-950">
                <Image
                  src={WEBSITES.left.src}
                  alt={WEBSITES.left.title}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* ── CARD RIGHT (Solar Installation) - Dual-Tone Monolithic Slab ── */}
            <div 
              ref={cardRightRef}
              className="absolute w-[82%] sm:w-[500px] lg:w-[540px] xl:w-[590px] p-[1px] rounded-2xl md:rounded-[22px] bg-gradient-to-b from-white/90 via-slate-200/50 to-slate-400/30 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.38),0_10px_20px_-5px_rgba(15,23,42,0.18)] z-10 transition-shadow duration-300 hover:shadow-[0_35px_80px_rgba(0,0,0,0.45)]"
            >
              <div className="relative aspect-[16/10] w-full rounded-[15px] md:rounded-[21px] overflow-hidden bg-slate-950">
                <Image
                  src={WEBSITES.right.src}
                  alt={WEBSITES.right.title}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* ── CARD MIDDLE (FLAGSHIP: Walker Roofing & Solar) - Dual-Tone Monolithic Slab ── */}
            <div 
              ref={cardMiddleRef}
              className="relative w-[90%] sm:w-[540px] lg:w-[610px] xl:w-[670px] p-[1.5px] rounded-2xl md:rounded-[24px] bg-gradient-to-b from-emerald-400/90 via-white/80 to-slate-400/40 shadow-[0_35px_80px_-15px_rgba(15,23,42,0.45),0_15px_30px_-5px_rgba(16,185,129,0.2)] z-30 transition-shadow duration-300 hover:shadow-[0_45px_100px_rgba(16,185,129,0.35)]"
            >
              <div className="relative aspect-[16/10] w-full rounded-[15px] md:rounded-[22.5px] overflow-hidden bg-slate-950">
                <Image
                  src={WEBSITES.middle.src}
                  alt={WEBSITES.middle.title}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
