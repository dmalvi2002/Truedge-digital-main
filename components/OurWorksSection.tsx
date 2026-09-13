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
                triggerInstance?.kill();
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
      {/* ─── Ambient Technical Grid & Glow Effects ─── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-24 sm:pb-32">
        
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

        {/* Bottom CTA to view all projects matching PAS Book Discovery Call button design */}
        <div className="w-full mt-12 sm:mt-16 flex justify-center">
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
    </section>
  );
}
