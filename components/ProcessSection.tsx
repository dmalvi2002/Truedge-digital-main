"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Sora } from "next/font/google";
import ScrollRippleTitle from "@/components/ScrollRippleTitle";
import SectionCursor from "@/components/SectionCursor";
import ExpertiseSection from "@/components/ExpertiseSection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Exact Asterisk Star Icon in Electric Lime Accent from Reference Mockup
function ProcessStar({ className = "w-3.5 h-3.5 text-[#d2f83a]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 1.5V14.5M1.5 8H14.5M3.4 3.4L12.6 12.6M3.4 12.6L12.6 3.4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── BESPOKE VECTOR LINE ICONS WITH SOLID ELECTRIC LIME ACCENTS (MATCHING REFERENCE) ───

// Card 1: Research (Gears + Lightbulb + Magnifying Glass with Lime Lens)
function ResearchIcon({ className = "w-12 h-12 sm:w-14 sm:h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 54" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Lightbulb at top-right with rays */}
      <path d="M33 13C33 9.7 35.7 7 39 7C42.3 7 45 9.7 45 13C45 15.2 43.8 17.1 42 18.1V20.5H36V18.1C34.2 17.1 33 15.2 33 13Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M37.5 23H40.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M39 2V4" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M46 4L44.5 5.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M32 4L33.5 5.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      {/* Interlocking gear */}
      <circle cx="16" cy="20" r="5" stroke="white" strokeWidth="1.8" />
      <path d="M16 12V14M16 26V28M8 20H10M22 20H24M10.3 14.3L11.7 15.7M20.3 24.3L21.7 25.7M10.3 25.7L11.7 24.3M20.3 15.7L21.7 14.3" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      {/* Magnifying glass with solid lime lens */}
      <circle cx="28" cy="30" r="9" stroke="white" strokeWidth="2" />
      <circle cx="28" cy="30" r="6.5" fill="#d2f83a" />
      <path d="M35 37L44 46" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

// Card 2: Strategy (Chess Strategy King & Pawn in Thin Line-Art with Lime Accent)
function StrategyIcon({ className = "w-12 h-12 sm:w-14 sm:h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 54" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Strategic spark at top left */}
      <path d="M12 6V10M10 8H14" stroke="white" strokeWidth="1.8" strokeLinecap="round" />

      {/* Pawn on Left (Tactical Discovery) with Solid Electric Lime Accent Head */}
      <circle cx="16" cy="20" r="5.5" fill="#d2f83a" stroke="white" strokeWidth="1.8" />
      <path d="M12 28H20" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M14 28C14 34 11 39 9 42H23C21 39 18 34 18 28"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 45H25" stroke="white" strokeWidth="1.8" strokeLinecap="round" />

      {/* King on Right (Master Strategy & Crown) */}
      <path d="M37 6V12M34 9H40" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M31 15C31 13 33.5 12 37 12C40.5 12 43 13 43 15C43 17 40.5 18 37 18C33.5 18 31 17 31 15Z"
        stroke="white"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M33 18L32 23H42L41 18" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31 23H43" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M33 23C33 30 30 38 27 42H47C44 38 41 30 41 23"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M25 45H49" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6 48H49" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// Card 3: Creative Solutions (Blueprint Document + Pen with Lime Circle)
function DesignIcon({ className = "w-12 h-12 sm:w-14 sm:h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 54" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Blueprint container */}
      <rect x="8" y="10" width="30" height="34" rx="4" stroke="white" strokeWidth="1.8" />
      <line x1="8" y1="18" x2="38" y2="18" stroke="white" strokeWidth="1.8" />
      <line x1="16" y1="10" x2="16" y2="18" stroke="white" strokeWidth="1.8" />
      <line x1="14" y1="26" x2="26" y2="26" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="14" y1="32" x2="22" y2="32" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      {/* Designer drafting pen with solid lime accent circle */}
      <path d="M32 20L44 8L48 12L36 24L32 25L32 20Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="36" cy="36" r="6.5" fill="#d2f83a" />
      <circle cx="36" cy="36" r="6.5" stroke="white" strokeWidth="1.8" />
    </svg>
  );
}

// Card 4: Web Engineering (Code Editor Window + Brackets & Lime Node)
function DevelopmentIcon({ className = "w-12 h-12 sm:w-14 sm:h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 54" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Code Editor Window */}
      <rect x="8" y="10" width="38" height="30" rx="5" stroke="white" strokeWidth="1.8" />
      <line x1="8" y1="18" x2="46" y2="18" stroke="white" strokeWidth="1.8" />
      <circle cx="14" cy="14" r="1.5" fill="white" />
      <circle cx="19" cy="14" r="1.5" fill="white" />
      <circle cx="24" cy="14" r="1.5" fill="white" />
      {/* Code brackets */}
      <path d="M18 25L14 29L18 33" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 25L32 29L28 33" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="24" y1="24" x2="22" y2="34" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      {/* Solid lime compiler node */}
      <circle cx="38" cy="36" r="6.5" fill="#d2f83a" />
      <circle cx="38" cy="36" r="6.5" stroke="white" strokeWidth="1.8" />
    </svg>
  );
}

// Card 5: Project Launch (Sleek Rocket Launch in Thin Line-Art with Lime Porthole)
function LaunchIcon({ className = "w-12 h-12 sm:w-14 sm:h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 54" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Background Star Sparks */}
      <path d="M12 14V18M10 16H14" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M44 8V12M42 10H46" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M48 26V30M46 28H50" stroke="white" strokeWidth="1.6" strokeLinecap="round" />

      {/* Speed Trails */}
      <path d="M8 46L14 40" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 48L18 44" stroke="white" strokeWidth="1.8" strokeLinecap="round" />

      {/* Rocket Assembly at 45° Flight Trajectory */}
      <g transform="rotate(45 27 26)">
        {/* Left & Right Stabilizer Wings */}
        <path d="M20 27L13 35L20 34" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M34 27L41 35L34 34" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

        {/* Center Aerodynamic Fuselage */}
        <path
          d="M27 8C22 15 20 26 20 34H34C34 26 32 15 27 8Z"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Engine Nozzle */}
        <path d="M22 34L21 37H33L32 34" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

        {/* Propellant Flame Exhaust */}
        <path d="M23 37L27 45L31 37" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M25 37L27 41L29 37" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

        {/* Porthole Window with Solid Electric Lime Glass */}
        <circle cx="27" cy="21" r="5.5" fill="#d2f83a" stroke="white" strokeWidth="1.8" />
      </g>
    </svg>
  );
}

// Card 6: CRM & Automation (4-Node Connected Pipeline Network in Thin Line-Art with Lime Lead)
function CrmIcon({ className = "w-12 h-12 sm:w-14 sm:h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 54" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Pipeline Interconnect Network Lines */}
      <line x1="22" y1="14" x2="31" y2="14" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="17" y1="24" x2="17" y2="29" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="37" y1="24" x2="37" y2="29" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="22" y1="34" x2="32" y2="34" stroke="white" strokeWidth="1.8" strokeLinecap="round" />

      {/* Central Sync Node */}
      <circle cx="27" cy="24" r="2" fill="white" />

      {/* Top Left User Node */}
      <circle cx="17" cy="14" r="4.5" stroke="white" strokeWidth="1.8" />
      <path d="M10 23C10 20.2 13 18.5 17 18.5C21 18.5 24 20.2 24 23" stroke="white" strokeWidth="1.8" strokeLinecap="round" />

      {/* Top Right User Node (Active Lead with Signature Electric Lime Accent) */}
      <circle cx="37" cy="14" r="5.5" fill="#d2f83a" stroke="white" strokeWidth="1.8" />
      <path d="M30 23C30 20.2 33 18.5 37 18.5C41 18.5 44 20.2 44 23" stroke="white" strokeWidth="1.8" strokeLinecap="round" />

      {/* Bottom Left User Node */}
      <circle cx="17" cy="34" r="4.5" stroke="white" strokeWidth="1.8" />
      <path d="M10 43C10 40.2 13 38.5 17 38.5C21 38.5 24 40.2 24 43" stroke="white" strokeWidth="1.8" strokeLinecap="round" />

      {/* Bottom Right User Node */}
      <circle cx="37" cy="34" r="4.5" stroke="white" strokeWidth="1.8" />
      <path d="M30 43C30 40.2 33 38.5 37 38.5C41 38.5 44 40.2 44 43" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

interface ProcessStep {
  number: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "i",
    title: "Listening to Your Problems & Discovery",
    icon: ResearchIcon,
    isActive: true,
  },
  {
    number: "ii",
    title: "Custom Strategy & Action Roadmap",
    icon: StrategyIcon,
    isActive: false,
  },
  {
    number: "iii",
    title: "High-Converting Creative Design",
    icon: DesignIcon,
    isActive: false,
  },
  {
    number: "iv",
    title: "Fast, Responsive Web Development",
    icon: DevelopmentIcon,
    isActive: false,
  },
  {
    number: "v",
    title: "Testing, Launch & Live Deployment",
    icon: LaunchIcon,
    isActive: false,
  },
  {
    number: "vi",
    title: "CRM Setup & Automated Lead Capture",
    icon: CrmIcon,
    isActive: false,
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleWrapperRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const watermarkRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Helper to activate a single card into full active status (full accent color on dot and numerals!)
  const activateCard = (idx: number) => {
    const card = cardRefs.current[idx];
    const title = titleRefs.current[idx];
    const dot = dotRefs.current[idx];
    const watermark = watermarkRefs.current[idx];

    // 1. 3D elevate card into clean luxury presence
    if (card) {
      gsap.to(card, {
        transform: "perspective(1200px) translateY(0px) translateZ(0px) rotateX(0deg)",
        opacity: 1,
        borderColor: "rgba(255, 255, 255, 0.14)",
        boxShadow: "0 26px 60px rgba(0,0,0,0.85), inset 0 1px 1px 0 rgba(255,255,255,0.2)",
        duration: 0.45,
        ease: "power2.out",
      });
    }

    // 2. Title slides in smoothly from left to right
    if (title) {
      gsap.to(title, {
        x: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
      });
    }

    // 3. Status dot: FULL ACCENT ELECTRIC LIME (#d2f83a) with neon bloom
    if (dot) {
      gsap.to(dot, {
        backgroundColor: "#d2f83a",
        boxShadow: "0 0 10px #d2f83a, 0 0 20px rgba(210, 248, 58, 0.65)",
        duration: 0.35,
        ease: "power1.out",
      });
    }

    // 4. Roman Numeral: FULL ACCENT ELECTRIC LIME (#d2f83a) with neon text glow
    if (watermark) {
      gsap.to(watermark, {
        color: "#d2f83a",
        opacity: 1,
        textShadow: "0 0 20px rgba(210, 248, 58, 0.5)",
        scale: 1.02,
        duration: 0.4,
        ease: "power1.out",
      });
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Set initial recessed dormant state on all 6 cards
    for (let i = 0; i < 6; i++) {
      const card = cardRefs.current[i];
      const title = titleRefs.current[i];
      const dot = dotRefs.current[i];
      const watermark = watermarkRefs.current[i];

      if (card) {
        gsap.set(card, {
          transform: "perspective(1200px) translateY(36px) translateZ(-28px) rotateX(4.5deg)",
          opacity: 0.55,
          borderColor: "rgba(255, 255, 255, 0.07)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.7), inset 0 1px 1px 0 rgba(255,255,255,0.14)",
        });
      }
      if (title) {
        gsap.set(title, { x: -28, opacity: 0 });
      }
      if (dot) {
        gsap.set(dot, { backgroundColor: "transparent", boxShadow: "none" });
      }
      if (watermark) {
        gsap.set(watermark, {
          color: "rgba(255, 255, 255, 0.09)",
          opacity: 1,
          textShadow: "none",
          scale: 1,
        });
      }
    }

    const mm = gsap.matchMedia();

    // ─── DESKTOP & LAPTOPS (>= 1024px): One-Time Sequential Timeline ───
    mm.add("(min-width: 1024px)", () => {
      const titleWrapper = titleWrapperRef.current;
      const cardRow2 = cardRefs.current[3];
      if (!titleWrapper) return;

      // Row 1 (Cards 0, 1, 2) plays ONE TIME strictly after section headline finishes
      const tlRow1 = gsap.timeline({
        scrollTrigger: {
          trigger: titleWrapper,
          start: "top 38%",
          once: true, // One-time execution: card animation stops & stays permanently active!
        },
      });

      tlRow1.call(() => activateCard(0));
      tlRow1.to({}, { duration: 0.36 }); // Wait for Card 0 to finish slide
      tlRow1.call(() => activateCard(1)); // Card 1 checks that Card 0 is done!
      tlRow1.to({}, { duration: 0.36 }); // Wait for Card 1 to finish slide
      tlRow1.call(() => activateCard(2)); // Card 2 checks that Card 1 is done!

      // Row 2 (Cards 3, 4, 5) plays ONE TIME as user scrolls to Row 2
      if (cardRow2) {
        const tlRow2 = gsap.timeline({
          scrollTrigger: {
            trigger: cardRow2,
            start: "top 80%",
            once: true, // One-time execution!
          },
        });

        tlRow2.call(() => activateCard(3));
        tlRow2.to({}, { duration: 0.36 }); // Wait for Card 3 to finish slide
        tlRow2.call(() => activateCard(4)); // Card 4 checks that Card 3 is done!
        tlRow2.to({}, { duration: 0.36 }); // Wait for Card 4 to finish slide
        tlRow2.call(() => activateCard(5)); // Card 5 checks that Card 4 is done!
      }
    });

    // ─── TABLETS (640px to 1023px): One-Time Sequential In Pairs ───
    mm.add("(min-width: 640px) and (max-width: 1023px)", () => {
      const titleWrapper = titleWrapperRef.current;
      const cardRow2 = cardRefs.current[2];
      const cardRow3 = cardRefs.current[4];
      if (!titleWrapper) return;

      // Pair 1 (Cards 0, 1)
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: titleWrapper,
          start: "top 38%",
          once: true,
        },
      });
      tl1.call(() => activateCard(0));
      tl1.to({}, { duration: 0.36 });
      tl1.call(() => activateCard(1));

      // Pair 2 (Cards 2, 3)
      if (cardRow2) {
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: cardRow2,
            start: "top 80%",
            once: true,
          },
        });
        tl2.call(() => activateCard(2));
        tl2.to({}, { duration: 0.36 });
        tl2.call(() => activateCard(3));
      }

      // Pair 3 (Cards 4, 5)
      if (cardRow3) {
        const tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: cardRow3,
            start: "top 80%",
            once: true,
          },
        });
        tl3.call(() => activateCard(4));
        tl3.to({}, { duration: 0.36 });
        tl3.call(() => activateCard(5));
      }
    });

    // ─── SMARTPHONES (< 640px): One-Time Activation As Each Card Rolls In ───
    mm.add("(max-width: 639px)", () => {
      cardRefs.current.forEach((el, idx) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 78%",
          once: true, // One-time execution!
          onEnter: () => activateCard(idx),
        });
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className={`relative w-full bg-[#0c0d10] text-white py-24 sm:py-32 lg:py-36 overflow-hidden selection:bg-[#d2f83a] selection:text-black ${sora.className}`}
    >
      {/* ─── Interactive Transparent Green Moving Cursor ─── */}
      <SectionCursor targetRef={sectionRef} />

      {/* ─── Ambient Glow Halos ─── */}
      <div className="pointer-events-none absolute -top-40 left-1/4 w-[700px] h-[500px] bg-purple-900/[0.08] blur-[180px] rounded-full" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-[600px] h-[500px] bg-[#d2f83a]/[0.025] blur-[170px] rounded-full" />

      {/* ─── Subtle Geometric Dot Grid for Tactile Depth ─── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── SECTION HEADER: Title & Paragraph Aligned at the Exact Same Level (items-start) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-16 sm:mb-20">
          
          {/* Left Column: Lowercase Headline */}
          <div ref={titleWrapperRef} className="lg:col-span-7">
            <ScrollRippleTitle
              id="process-title"
              text="Creative strategy & smart execution for growth"
              as="h2"
              accentColor="#d2f83a"
              baseColor="rgba(255, 255, 255, 0.22)"
              activeColor="#ffffff"
              triggerStart="top 85%"
              triggerEnd="top 42%"
              scrub={0.3}
              className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight leading-[1.14] text-white"
            />
          </div>

          {/* Right Column: Strategic Paragraph + Kinetic CTA Button (Same top level as Headline) */}
          <div className="lg:col-span-5 flex flex-col items-start pt-1 sm:pt-1.5">
            <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed max-w-md mb-6">
              This process allows us deliver high quality digital solutions that help business connect with their audience and achieve real results.
            </p>

            {/* Signature Truedge Kinetic Pill CTA */}
            <Link
              href="/contact"
              className="group/cta inline-flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full bg-[#d2f83a] text-slate-950 font-bold shadow-lg shadow-lime-400/20 hover:bg-[#c0e82c] transition-all duration-300 hover:shadow-[0_6px_25px_rgba(210,248,58,0.4)] cursor-pointer"
            >
              <span className="text-sm sm:text-base font-bold">Contact Us</span>
              <div className="w-8 h-8 rounded-full bg-slate-950 text-[#d2f83a] flex items-center justify-center transition-transform duration-300 group-hover/cta:rotate-45">
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </Link>
          </div>
        </div>

        {/* ─── 3D TACTILE PROCESS CARDS GRID (Option 2 + 3: 3D Elevation & Sequential Power-Up) ─── */}
        <div
          ref={cardsContainerRef}
          style={{ perspective: "1400px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform, opacity, box-shadow, border-color",
              }}
              className="relative rounded-[32px] sm:rounded-[36px] p-8 sm:p-9 bg-gradient-to-b from-[#1b1c20] to-[#141518] border border-white/[0.07] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] transition-[border-color,box-shadow] duration-300 flex flex-col justify-between min-h-[440px] sm:min-h-[460px] lg:min-h-[480px] overflow-hidden select-none"
            >
              {/* Top Content: Standalone Line Icon & Bold Descriptive Process Title */}
              <div className="relative z-10">
                {/* Standalone Vector Illustration with Electric Lime Accent */}
                <div className="mb-8 sm:mb-10">
                  <step.icon className="w-12 h-12 sm:w-14 sm:h-14" />
                </div>

                {/* Main Process Title with Left-to-Right Slide-In Animation */}
                <div className="overflow-hidden">
                  <h3
                    ref={(el) => {
                      titleRefs.current[index] = el;
                    }}
                    style={{
                      willChange: "transform, opacity",
                      transform: "translateX(-28px)",
                      opacity: 0,
                    }}
                    className="text-xl sm:text-[23px] lg:text-[24px] font-bold text-white tracking-tight leading-[1.25] max-w-[280px]"
                  >
                    {step.title}
                  </h3>
                </div>
              </div>

              {/* Bottom Row: Lime Status Dot on Left, Huge Roman Numeral Watermark on Right */}
              <div className="relative z-10 flex items-end justify-between mt-auto pt-8">
                {/* Left: Electric Lime Indicator Dot */}
                <div className="pb-1.5">
                  <span
                    ref={(el) => {
                      dotRefs.current[index] = el;
                    }}
                    className="inline-block w-2.5 h-2.5 rounded-full transition-all duration-300 bg-transparent"
                  />
                </div>

                {/* Right: Stylized Roman Numeral Watermark (i through vi) */}
                <span
                  ref={(el) => {
                    watermarkRefs.current[index] = el;
                  }}
                  className="text-6xl sm:text-7xl font-bold tracking-tighter leading-none select-none transition-all duration-300 text-white/[0.09]"
                >
                  {step.number}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ─── MERGED: OTHER EXPERTISE (Flows seamlessly inside the same master dark section) ─── */}
        <ExpertiseSection />
      </div>
    </section>
  );
}