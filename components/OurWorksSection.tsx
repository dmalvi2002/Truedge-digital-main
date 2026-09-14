"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Sora, IBM_Plex_Sans } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ScrollRippleTitle from "@/components/ScrollRippleTitle";
import SectionCursor from "@/components/SectionCursor";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

interface ProjectWork {
  id: string;
  title: string;
  image: string;
  link: string;
}

const PROJECTS: ProjectWork[] = [
  {
    id: "sanchez",
    title: "Sanchez Watt",
    image: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1786092267/6d9b2559-1c68-463f-a498-ef3301229f87.png",
    link: "https://www.sanchezwatt.com/",
  },
  {
    id: "ilearnershub",
    title: "iLearner's Hub",
    image: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1789333116/d27e4b89-e476-4a62-b67d-1d2d3945e95f.png",
    link: "https://ilearnershub.co.uk",
  },
  {
    id: "magic-world",
    title: "Magic World",
    image: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1771919691/bd26f844-8741-4461-86ca-6099985f1a18.png",
    link: "https://play2-magic-worlds.vercel.app/",
  },
  {
    id: "kinesis",
    title: "Kinesis Subsea",
    image: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1771634697/c3f54d73-40a0-4dcc-9d28-b91ae55623db.png",
    link: "http://kinesis-subsea-eng-site.vercel.app/",
  },
];

// Star Separator Icon provided by user (optimized into 1 unified compound vector path)
const StarSeparator = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.845 3.93521C19.845 6.10648 15.9098 11.9955 15.9098 11.9955C15.9098 11.9955 11.9746 6.10648 11.9746 3.93521C11.9746 1.76394 15.9098 0 15.9098 0C15.9098 0 19.845 1.76049 19.845 3.93521ZM3.93521 11.9761C6.10648 11.9761 11.9955 15.9113 11.9955 15.9113C11.9955 15.9113 6.10648 19.8465 3.93521 19.8465C1.76394 19.8465 0 15.9079 0 15.9079C0 15.9079 1.76049 11.9727 3.93521 11.9727V11.9761ZM11.9785 27.8923C11.9785 25.721 15.9137 19.832 15.9137 19.832C15.9137 19.832 19.8489 25.721 19.8489 27.8923C19.8489 30.0636 15.9137 31.8275 15.9137 31.8275C15.9137 31.8275 11.9785 30.067 11.9785 27.8923ZM27.8884 19.8431C25.7171 19.8431 19.8281 15.9079 19.8281 15.9079C19.8281 15.9079 25.7171 11.9727 27.8884 11.9727C30.0597 11.9727 31.8236 15.9079 31.8236 15.9079C31.8236 15.9079 30.0631 19.8431 27.8884 19.8431ZM15.9118 17.4682C16.7736 17.4682 17.4721 16.7697 17.4721 15.9079C17.4721 15.0462 16.7736 14.3477 15.9118 14.3477C15.0501 14.3477 14.3516 15.0462 14.3516 15.9079C14.3516 16.7697 15.0501 17.4682 15.9118 17.4682Z" />
  </svg>
);

const TICKER_SERVICES = [
  "Web Design",
  "Development",
  "Mobile App Development",
  "Project & Product Consulting",
  "Performance Advertising",
  "AI & Search Growth",
  "Commercial Video Production",
];

export default function OurWorksSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stackAnchorRef = useRef<HTMLDivElement | null>(null);
  const gridContainerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stackAnchor = stackAnchorRef.current;
    const gridContainer = gridContainerRef.current;

    if (!section || !stackAnchor || !gridContainer) return;

    const mm = gsap.matchMedia();

    // ─── DESKTOP ONLY (>= 1024px): Dynamic unstacking that stops permanently once loaded (like ServicesList) ───
    mm.add("(min-width: 1024px)", () => {
      let triggerInstance: ScrollTrigger | null = null;

      const initAnimation = () => {
        if (triggerInstance) triggerInstance.kill();

        // 1. Temporarily clear transforms to measure true untransformed section-relative layout coordinates
        cardRefs.current.forEach((card) => {
          if (card) gsap.set(card, { clearProps: "transform" });
        });

        const sectionRect = section.getBoundingClientRect();
        const anchorRect = stackAnchor.getBoundingClientRect();

        // Exact center of the stack anchor relative to section container
        const anchorCenterX = anchorRect.left - sectionRect.left + anchorRect.width / 2;
        const anchorCenterY = anchorRect.top - sectionRect.top + anchorRect.height / 2;

        // Physical card deck tilts and micro-offsets for Screen 1 initial stack
        const stackConfig = [
          { rot: -5.5, dx: -14, dy: -12, scale: 0.94, z: 10 },
          { rot: 4.2, dx: 12, dy: -6, scale: 0.96, z: 20 },
          { rot: -2.5, dx: -8, dy: 6, scale: 0.98, z: 30 },
          { rot: 1.5, dx: 4, dy: 14, scale: 1.0, z: 40 },
        ];

        // Precalculate exact delta for each card from grid to stack anchor
        const deltas = cardRefs.current.map((card, idx) => {
          if (!card) return { dx: 0, dy: 0 };
          const cardRect = card.getBoundingClientRect();
          const cardCenterX = cardRect.left - sectionRect.left + cardRect.width / 2;
          const cardCenterY = cardRect.top - sectionRect.top + cardRect.height / 2;
          return {
            dx: anchorCenterX - cardCenterX + stackConfig[idx].dx,
            dy: anchorCenterY - cardCenterY + stackConfig[idx].dy,
          };
        });

        // Set initial stacked state
        cardRefs.current.forEach((card, idx) => {
          if (!card) return;
          gsap.set(card, {
            x: deltas[idx].dx,
            y: deltas[idx].dy,
            rotation: stackConfig[idx].rot,
            scale: stackConfig[idx].scale,
            zIndex: stackConfig[idx].z,
            transformOrigin: "center center",
          });
        });

        let maxProgress = 0;

        // Forward-only scroll trigger: once loaded, animation stops permanently (like ServicesList)
        triggerInstance = ScrollTrigger.create({
          trigger: section,
          start: "top 25%",
          endTrigger: gridContainer,
          end: "top 55%",
          scrub: 0.25,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress > maxProgress) {
              maxProgress = self.progress;
              const p = maxProgress;

              cardRefs.current.forEach((card, idx) => {
                if (!card) return;
                // Cubic smooth easing into final 2x2 grid positions
                const easedP = Math.min(1, p * 1.05);
                const currentX = deltas[idx].dx * (1 - easedP);
                const currentY = deltas[idx].dy * (1 - easedP);
                const currentRot = stackConfig[idx].rot * (1 - easedP);
                const currentScale = stackConfig[idx].scale + (1 - stackConfig[idx].scale) * easedP;

                gsap.set(card, {
                  x: currentX,
                  y: currentY,
                  rotation: currentRot,
                  scale: currentScale,
                  zIndex: stackConfig[idx].z,
                });
              });

              // Once fully arrived in 2x2 grid, lock permanently and kill animation
              if (p >= 0.96) {
                cardRefs.current.forEach((card) => {
                  if (card) {
                    gsap.set(card, {
                      clearProps: "transform,zIndex",
                    });
                  }
                });
                self.kill();
              }
            }
          },
        });
      };

      const timeoutId = setTimeout(initAnimation, 80);

      const handleResize = () => {
        initAnimation();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("resize", handleResize);
        triggerInstance?.kill();
      };
    });

    // ─── TABLET & MOBILE (< 1024px): ZERO SCROLLING ANIMATION ───
    mm.add("(max-width: 1023px)", () => {
      // Completely cancel any scroll animation, clear all transforms
      cardRefs.current.forEach((card) => {
        if (card) {
          gsap.set(card, { clearProps: "all" });
        }
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full bg-[#06070B] text-white selection:bg-[#d2f83a] selection:text-black overflow-hidden ${sora.className}`}
    >
      {/* ─── Transparent Green Moving Cursor ─── */}
      <SectionCursor targetRef={sectionRef} />

      {/* ─── Ambient Glow Effects (Square Grid Removed) ─── */}
      <div className="pointer-events-none absolute top-1/4 left-1/6 w-[600px] h-[600px] bg-purple-900/10 blur-[180px] rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/6 w-[500px] h-[500px] bg-[#d2f83a]/[0.035] blur-[160px] rounded-full" />

      {/* ─── PART 1: {04} FUNFACTS (Screen 1 Narrative & Initial Card Stack) ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-14 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Headline & Stats */}
          <div className="lg:col-span-6">
            {/* Title with Letter-by-Letter Scroll Illumination Animation (No quotes, matched to PAS section size) */}
            <div className="mb-5">
              <ScrollRippleTitle
                text="A streamlined solution built to power business."
                as="h2"
                accentColor="#d2f83a"
                baseColor="rgba(255, 255, 255, 0.2)"
                activeColor="#ffffff"
                className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight leading-[1.12] text-white"
              />
            </div>

            {/* Strategic Paragraph */}
            <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed max-w-lg mb-8">
              We&apos;re more than pixels and code — we&apos;re coffee lovers, cat people, meme
              sharers, and design geeks.
            </p>

            {/* 3 Small Green & Black Stat Cards */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 max-w-lg">
              <div className="bg-[#d2f83a] rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-[0_8px_25px_rgba(210,248,58,0.25)] flex flex-col justify-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-none">
                  95%
                </span>
                <span className="text-[11px] sm:text-xs text-slate-950/85 font-bold mt-1.5 leading-snug">
                  Customer satisfaction
                </span>
              </div>
              <div className="bg-[#d2f83a] rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-[0_8px_25px_rgba(210,248,58,0.25)] flex flex-col justify-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-none">
                  12+
                </span>
                <span className="text-[11px] sm:text-xs text-slate-950/85 font-bold mt-1.5 leading-snug">
                  Years of experience
                </span>
              </div>
              <div className="bg-[#d2f83a] rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-[0_8px_25px_rgba(210,248,58,0.25)] flex flex-col justify-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-none">
                  22+
                </span>
                <span className="text-[11px] sm:text-xs text-slate-950/85 font-bold mt-1.5 leading-snug">
                  Projects completed
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Physical Stack Target Area (Where the 4 cards start stacked in Screen 1) */}
          <div className="hidden lg:flex lg:col-span-6 justify-center items-center">
            <div
              ref={stackAnchorRef}
              className="w-full max-w-[540px] aspect-[16/10] max-h-[340px] rounded-[28px] border border-white/5 bg-transparent pointer-events-none"
            />
          </div>
        </div>

        {/* Subtle hairline separator with green crosshair at bottom of FunFacts */}
        <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent mt-16 sm:mt-20 flex items-center justify-center">
          <div className="w-5 h-5 rounded bg-[#090a10] border border-[#d2f83a]/40 flex items-center justify-center text-[#d2f83a] text-xs font-bold shadow-[0_0_10px_rgba(210,248,58,0.25)]">
            +
          </div>
        </div>
      </div>

      {/* ─── PART 2: OUR WORKS (Screen 3 Header & 2x2 Landing Grid) ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-12 sm:pb-6 lg:pb-8">
        
        {/* Header: "Our Works" with letter-by-letter scroll ripple animation */}
        <div className="w-full mb-8 sm:mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <ScrollRippleTitle
              text="Our Works"
              as="h2"
              accentColor="#d2f83a"
              baseColor="rgba(255, 255, 255, 0.25)"
              activeColor="#ffffff"
              className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight leading-[1.12] text-white"
            />
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md font-normal leading-relaxed">
            We offer a full range of digital services to help your brand stand out, connect, and
            grow.
          </p>
        </div>

        {/* 2X2 CARDS GRID (Screen 3 Settled Position) */}
        <div
          ref={gridContainerRef}
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
        >
          {PROJECTS.map((project, idx) => (
            <Link
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="group relative block w-full aspect-[16/10] max-h-[350px] xl:max-h-[380px] rounded-[24px] sm:rounded-[28px] border border-white/10 bg-[#0c0d14] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-[#d2f83a]/40 hover:scale-[1.015] transition-all duration-500 cursor-pointer"
              aria-label={`View ${project.title} live project`}
            >
              {/* Pure Project Screenshot Visual filling the entire card */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={idx < 2}
                />
                {/* Subtle soft vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none" />
              </div>

              {/* Top Right: ONLY the Green Portfolio Pill (No extra info on the card!) */}
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 pointer-events-none">
                <div className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#d2f83a]/30 flex items-center gap-2 shadow-lg group-hover:border-[#d2f83a]/70 group-hover:bg-black/80 transition-all duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d2f83a] shadow-[0_0_8px_#d2f83a]" />
                  <span className="text-xs font-semibold text-white tracking-wide">
                    Portfolio
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA to view all projects matching PAS button design */}
        <div className="w-full mt-8 sm:mt-10 flex justify-center">
          <Link
            href="/projects"
            className="group/cta inline-flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full bg-[#d2f83a] text-slate-950 font-bold shadow-lg shadow-lime-400/20 hover:bg-[#c0e82c] transition-all duration-300 hover:shadow-[0_6px_25px_rgba(210,248,58,0.4)] cursor-pointer"
          >
            <span className="text-sm sm:text-base">Explore Complete Archive</span>
            <div className="w-8 h-8 rounded-full bg-slate-950 text-[#d2f83a] flex items-center justify-center transition-transform duration-300 group-hover/cta:rotate-45">
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </Link>
        </div>
      </div>

      {/* ─── PART 3: DUAL X-CROSSING TICKER MARQUEE TAPE BANNER (Hidden on mobile, visible on tablet, laptop & PC) ─── */}
      <div className="hidden sm:flex relative w-full h-[200px] sm:h-[240px] lg:h-[320px] xl:h-[340px] mt-4 sm:mt-6 lg:mt-8 mb-0 lg:mb-16 xl:mb-20 items-center justify-center overflow-hidden select-none pointer-events-none [content-visibility:auto] [contain-intrinsic-size:auto_340px]">
        
        {/* Dark Ticker Ribbon (Crossing Behind, sloping downwards +3.5deg) */}
        <div className="absolute w-[140%] -left-[20%] py-5 sm:py-6 lg:py-7 bg-[#08090e] border-y-2 border-white/10 rotate-[2.5deg] sm:rotate-[3.5deg] flex items-center overflow-hidden z-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] [contain:paint] transform-gpu [transform:translateZ(0)] isolate">
          <div className="animate-marquee-left flex w-max items-center transform-gpu [backface-visibility:hidden] [transform:translateZ(0)]">
            {/* Set 1 */}
            <div className="flex shrink-0 items-center">
              {TICKER_SERVICES.concat(TICKER_SERVICES).map((item, i) => (
                <div key={`dark-1-${i}`} className="inline-flex items-center shrink-0">
                  <span className={`${sora.className} text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white whitespace-nowrap`}>
                    {item}
                  </span>
                  <span className="px-6 sm:px-8 shrink-0 inline-flex items-center justify-center">
                    <StarSeparator className="w-6 h-6 sm:w-7 sm:h-7 text-[#d2f83a] shrink-0" />
                  </span>
                </div>
              ))}
            </div>
            {/* Set 2 (Seamless loop twin) */}
            <div className="flex shrink-0 items-center" aria-hidden="true">
              {TICKER_SERVICES.concat(TICKER_SERVICES).map((item, i) => (
                <div key={`dark-2-${i}`} className="inline-flex items-center shrink-0">
                  <span className={`${sora.className} text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white whitespace-nowrap`}>
                    {item}
                  </span>
                  <span className="px-6 sm:px-8 shrink-0 inline-flex items-center justify-center">
                    <StarSeparator className="w-6 h-6 sm:w-7 sm:h-7 text-[#d2f83a] shrink-0" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Accent Green Ticker Ribbon (Crossing in Front, sloping upwards -5.5deg) */}
        <div className="absolute w-[140%] -left-[20%] py-5 sm:py-6 lg:py-7 bg-[#d2f83a] -rotate-[4.5deg] sm:-rotate-[5.5deg] flex items-center overflow-hidden z-20 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(210,248,58,0.25)] [contain:paint] transform-gpu [transform:translateZ(0)] isolate">
          <div className="animate-marquee-right flex w-max items-center transform-gpu [backface-visibility:hidden] [transform:translateZ(0)]">
            {/* Set 1 */}
            <div className="flex shrink-0 items-center">
              {TICKER_SERVICES.concat(TICKER_SERVICES).map((item, i) => (
                <div key={`green-1-${i}`} className="inline-flex items-center shrink-0">
                  <span className={`${sora.className} text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-slate-950 whitespace-nowrap`}>
                    {item}
                  </span>
                  <span className="px-6 sm:px-8 shrink-0 inline-flex items-center justify-center">
                    <StarSeparator className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950 shrink-0" />
                  </span>
                </div>
              ))}
            </div>
            {/* Set 2 (Seamless loop twin) */}
            <div className="flex shrink-0 items-center" aria-hidden="true">
              {TICKER_SERVICES.concat(TICKER_SERVICES).map((item, i) => (
                <div key={`green-2-${i}`} className="inline-flex items-center shrink-0">
                  <span className={`${sora.className} text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-slate-950 whitespace-nowrap`}>
                    {item}
                  </span>
                  <span className="px-6 sm:px-8 shrink-0 inline-flex items-center justify-center">
                    <StarSeparator className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950 shrink-0" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
