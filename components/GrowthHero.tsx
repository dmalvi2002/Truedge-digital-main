"use client";

import { useRef } from "react";
import { Sora, IBM_Plex_Sans } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  PlayCircle,
  ArrowRight,
  TrendingUp,
  Search,
  BarChart2,
} from "lucide-react";

// Import your Aurora component
import Aurora from "./Aurora";

// Font Initialisation
const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export default function GrowthHero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Left column typography orchestration
      tl.fromTo(
        ".reveal-text",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15 },
        "+=0.2",
      )
        // Right column premium cards orchestration
        .fromTo(
          ".premium-card-1",
          { x: 50, y: 30, opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: 1.2 },
          "-=1.2",
        )
        .fromTo(
          ".premium-card-2",
          { x: 30, y: 50, opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: 1.2 },
          "-=0.9",
        );

      // Subtle continuous floating animation for both glass cards
      gsap.to(".premium-card-1", {
        y: "-=15",
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      gsap.to(".premium-card-2", {
        y: "+=12",
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 0.5,
      });
    },
    { scope: container },
  );

  return (
    // 1. The main section must be 'relative'
    <section
      ref={container}
      className="relative bg-slate-950 min-h-[90vh] flex items-center overflow-hidden py-24"
    >
      {/* 2. The Aurora Background: 'absolute inset-0 z-0' makes it the background */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none mix-blend-screen">
        <Aurora
          colorStops={["#7cff67", "#B19EEF", "#5227FF"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.8}
        />
      </div>

      {/* 3. The Content: 'relative z-10' puts it on top of the Aurora */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left Column: Copy & CTA */}
        <div className="flex flex-col items-start text-left">
          <div className="reveal-text flex items-center gap-2 mb-6">
            <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
            <span
              className={`${ibmPlexSans.className} text-[12px] uppercase tracking-wide text-slate-300 font-semibold`}
            >
              Elite Growth Partner
            </span>
          </div>

          <h1
            className={`reveal-text ${sora.className} font-semibold text-5xl sm:text-6xl lg:text-[64px] text-white leading-[1.1] tracking-tight mb-8`}
          >
            Command absolute <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
              attention.
            </span>
            <br />
            Scale your brand.
          </h1>

          <p
            className={`reveal-text ${ibmPlexSans.className} font-normal text-lg lg:text-xl text-slate-300 max-w-lg mb-12 leading-relaxed`}
          >
            We build high-converting growth engines. From high-retention
            cinematic video editing to data-driven SEO and PPC, we secure your
            unfair advantage.
          </p>

          <div className="reveal-text flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <a href="/contact">
              <button
                className={`flex items-center justify-center gap-2 bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white ${ibmPlexSans.className} font-bold text-base px-8 py-4 rounded-full hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300 cursor-pointer`}
              >
                Book a Call <ArrowRight size={20} />
              </button>
            </a>
          </div>
        </div>

        {/* Right Column: Premium Visuals */}
        <div className="relative h-full w-full min-h-[450px] hidden lg:block">
          {/* Glass Card 1: Retention Metric */}
          <div className="premium-card-1 absolute top-25 right-0 w-80 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl z-20">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-white/10 p-3 rounded-2xl">
                <PlayCircle className="text-cyan-500" size={24} />
              </div>
              <span
                className={`${ibmPlexSans.className} text-[12px] uppercase tracking-wide text-emerald-400 font-semibold flex items-center gap-1`}
              >
                <TrendingUp size={14} /> +142% AVD
              </span>
            </div>
            <h3
              className={`${sora.className} font-semibold text-white text-xl mb-1`}
            >
              Retention Editing
            </h3>
            <p className={`${ibmPlexSans.className} text-sm text-slate-400`}>
              Cinematic motion graphics engineered to hold viewership.
            </p>
          </div>

          {/* Glass Card 2: SEO Metric */}
          <div className="premium-card-2 absolute bottom-20 left-0 w-80 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-white/10 p-3 rounded-2xl">
                <Search className="text-[#8B5CF6]" size={24} />
              </div>
              <span
                className={`${ibmPlexSans.className} text-[12px] uppercase tracking-wide text-emerald-400 font-semibold flex items-center gap-1`}
              >
                <BarChart2 size={14} /> Page 1 Rankings
              </span>
            </div>
            <h3
              className={`${sora.className} font-semibold text-white text-xl mb-1`}
            >
              Technical SEO
            </h3>
            <p className={`${ibmPlexSans.className} text-sm text-slate-400`}>
              Data-driven search dominance to capture high-intent traffic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
