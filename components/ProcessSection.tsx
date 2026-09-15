"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Sora } from "next/font/google";
import ScrollRippleTitle from "@/components/ScrollRippleTitle";
import SectionCursor from "@/components/SectionCursor";
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
  const laserRefs = useRef<(SVGRectElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const watermarkRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const titleFinishedRef = useRef(false);

  // Helper to reset all cards to pristine dormant state
  const resetAllCards = () => {
    for (let i = 0; i < 6; i++) {
      const laser = laserRefs.current[i];
      const dot = dotRefs.current[i];
      const watermark = watermarkRefs.current[i];
      const card = cardRefs.current[i];

      if (laser) {
        laser.style.opacity = "0";
        laser.setAttribute("stroke-dashoffset", "100");
        laser.style.filter = "none";
      }
      if (dot) {
        dot.style.backgroundColor = "transparent";
        dot.style.boxShadow = "none";
      }
      if (watermark) {
        watermark.style.color = "rgba(255, 255, 255, 0.09)";
        watermark.style.opacity = "1";
        watermark.style.textShadow = "none";
      }
      if (card) {
        card.style.borderColor = "rgba(255, 255, 255, 0.07)";
        card.style.boxShadow =
          "0 20px 50px rgba(0,0,0,0.7), inset 0 1px 1px 0 rgba(255,255,255,0.14)";
      }
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    // Helper to update a card's visual state given progress (0..1)
    const setCardState = (idx: number, p: number) => {
      const laser = laserRefs.current[idx];
      const dot = dotRefs.current[idx];
      const watermark = watermarkRefs.current[idx];
      const card = cardRefs.current[idx];

      if (laser) {
        if (p > 0.01) {
          laser.style.opacity = "1";
          laser.setAttribute("stroke-dashoffset", String(Math.max(0, 100 - p * 100)));
          laser.style.filter =
            p > 0.08
              ? "drop-shadow(0 0 6px rgba(210,248,58,0.8)) drop-shadow(0 0 14px rgba(210,248,58,0.4))"
              : "none";
        } else {
          laser.style.opacity = "0";
          laser.setAttribute("stroke-dashoffset", "100");
          laser.style.filter = "none";
        }
      }

      if (dot) {
        if (p > 0.15) {
          dot.style.backgroundColor = "#d2f83a";
          dot.style.boxShadow = `0 0 10px #d2f83a, 0 0 20px rgba(210,248,58,0.5)`;
        } else {
          dot.style.backgroundColor = "transparent";
          dot.style.boxShadow = "none";
        }
      }

      if (watermark) {
        if (p > 0.3) {
          const glowRatio = Math.min(1, (p - 0.3) / 0.7);
          watermark.style.color = "#d2f83a";
          watermark.style.opacity = String(0.45 + 0.55 * glowRatio);
          watermark.style.textShadow = `0 0 ${Math.round(20 * glowRatio)}px rgba(210,248,58,0.45)`;
        } else {
          watermark.style.color = "rgba(255, 255, 255, 0.09)";
          watermark.style.opacity = "1";
          watermark.style.textShadow = "none";
        }
      }

      if (card) {
        if (p > 0.08) {
          card.style.borderColor = `rgba(210, 248, 58, ${0.22 * p})`;
          card.style.boxShadow = `0 20px 50px rgba(0,0,0,0.8), inset 0 1px 1px 0 rgba(255,255,255,0.18), 0 0 ${Math.round(35 * p)}px rgba(210,248,58,${0.12 * p})`;
        } else {
          card.style.borderColor = "rgba(255, 255, 255, 0.07)";
          card.style.boxShadow =
            "0 20px 50px rgba(0,0,0,0.7), inset 0 1px 1px 0 rgba(255,255,255,0.14)";
        }
      }
    };

    // ─── DESKTOP & LAPTOPS (>= 1024px): 2-Wave Sequence strictly AFTER title finishes ───
    mm.add("(min-width: 1024px)", () => {
      const container = cardsContainerRef.current;
      const titleWrapper = titleWrapperRef.current;
      if (!container || !titleWrapper) return;

      const ranges = [
        { start: 0.00, end: 0.22 }, // Card i
        { start: 0.14, end: 0.36 }, // Card ii
        { start: 0.28, end: 0.50 }, // Card iii (completes Row 1!)
        { start: 0.50, end: 0.72 }, // Card iv (starts Row 2!)
        { start: 0.64, end: 0.86 }, // Card v
        { start: 0.78, end: 1.00 }, // Card vi (completes Row 2!)
      ];

      const st = ScrollTrigger.create({
        trigger: titleWrapper,
        start: "top 38%", // Executes strictly AFTER the title finishes its animation at top 42%!
        endTrigger: container,
        end: "bottom 78%",
        scrub: 0.6,
        onUpdate: (self) => {
          if (!titleFinishedRef.current) {
            resetAllCards();
            return;
          }
          const progress = self.progress;
          ranges.forEach((range, idx) => {
            let p = 0;
            if (progress <= range.start) p = 0;
            else if (progress >= range.end) p = 1;
            else p = (progress - range.start) / (range.end - range.start);
            setCardState(idx, p);
          });
        },
      });

      return () => {
        st.kill();
      };
    });

    // ─── TABLETS (640px to 1023px): 3-Wave Sequence strictly AFTER title finishes ───
    mm.add("(min-width: 640px) and (max-width: 1023px)", () => {
      const container = cardsContainerRef.current;
      const titleWrapper = titleWrapperRef.current;
      if (!container || !titleWrapper) return;

      const ranges = [
        { start: 0.00, end: 0.24 }, // Card i
        { start: 0.10, end: 0.36 }, // Card ii
        { start: 0.32, end: 0.56 }, // Card iii
        { start: 0.42, end: 0.68 }, // Card iv
        { start: 0.64, end: 0.88 }, // Card v
        { start: 0.76, end: 1.00 }, // Card vi
      ];

      const st = ScrollTrigger.create({
        trigger: titleWrapper,
        start: "top 38%", // Executes strictly AFTER the title finishes!
        endTrigger: container,
        end: "bottom 78%",
        scrub: 0.6,
        onUpdate: (self) => {
          if (!titleFinishedRef.current) {
            resetAllCards();
            return;
          }
          const progress = self.progress;
          ranges.forEach((range, idx) => {
            let p = 0;
            if (progress <= range.start) p = 0;
            else if (progress >= range.end) p = 1;
            else p = (progress - range.start) / (range.end - range.start);
            setCardState(idx, p);
          });
        },
      });

      return () => {
        st.kill();
      };
    });

    // ─── SMARTPHONES (< 640px): Per-Card Viewport Trigger strictly AFTER title finishes ───
    mm.add("(max-width: 639px)", () => {
      const triggers: ScrollTrigger[] = [];

      cardRefs.current.forEach((el, idx) => {
        if (!el) return;
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 72%",
          end: "top 28%",
          scrub: 0.5,
          onUpdate: (self) => {
            if (!titleFinishedRef.current) {
              setCardState(idx, 0);
              return;
            }
            setCardState(idx, self.progress);
          },
        });
        triggers.push(st);
      });

      return () => {
        triggers.forEach((t) => t.kill());
      };
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
        
        {/* ─── TOP EYEBROW PILL: With Green Accent Asterisk Star ─── */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md shadow-inner">
            <ProcessStar className="w-3.5 h-3.5 text-[#d2f83a]" />
            <span className="text-xs font-semibold tracking-wide text-slate-200">
              Our Process
            </span>
          </div>
        </div>

        {/* ─── SECTION HEADER: Title & Paragraph Aligned at the Exact Same Level (items-start) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-16 sm:mb-20">
          
          {/* Left Column: Lowercase Headline */}
          <div ref={titleWrapperRef} className="lg:col-span-7">
            <ScrollRippleTitle
              id="process-title"
              text="creative strategy & smart execution for growth"
              as="h2"
              accentColor="#d2f83a"
              baseColor="rgba(255, 255, 255, 0.22)"
              activeColor="#ffffff"
              triggerStart="top 85%"
              triggerEnd="top 42%"
              scrub={0.3}
              onProgress={(p) => {
                const finished = p >= 0.999;
                titleFinishedRef.current = finished;
                if (!finished) {
                  resetAllCards();
                }
              }}
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

        {/* ─── 3D TACTILE PROCESS CARDS GRID (Dynamic Scroll Powered, Zero Hover Jumps) ─── */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="relative rounded-[32px] sm:rounded-[36px] p-8 sm:p-9 bg-gradient-to-b from-[#1b1c20] to-[#141518] border border-white/[0.07] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] transition-all duration-300 flex flex-col justify-between min-h-[440px] sm:min-h-[460px] lg:min-h-[480px] overflow-hidden select-none"
            >
              {/* ─── Dynamic Electric Laser Border Overlay (Option 1 + 2) ─── */}
              <svg
                className="pointer-events-none absolute inset-0 w-full h-full z-20"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <rect
                  ref={(el) => {
                    laserRefs.current[index] = el;
                  }}
                  x="0.8"
                  y="0.8"
                  width="98.4"
                  height="98.4"
                  rx="9"
                  ry="9"
                  fill="none"
                  stroke="#d2f83a"
                  strokeWidth="1.8"
                  vectorEffect="non-scaling-stroke"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  style={{
                    opacity: 0,
                    transition: "opacity 0.2s ease-out",
                  }}
                />
              </svg>

              {/* Top Content: Standalone Line Icon & Bold Descriptive Process Title */}
              <div className="relative z-10">
                {/* Standalone Vector Illustration with Electric Lime Accent */}
                <div className="mb-8 sm:mb-10">
                  <step.icon className="w-12 h-12 sm:w-14 sm:h-14" />
                </div>

                {/* Main Process Title (Explaining the process directly to visitors) */}
                <h3 className="text-xl sm:text-[23px] lg:text-[24px] font-bold text-white tracking-tight leading-[1.25] max-w-[280px]">
                  {step.title}
                </h3>
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
                  className="text-6xl sm:text-7xl font-bold tracking-tighter leading-none select-none transition-colors duration-300 text-white/[0.09]"
                >
                  {step.number}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}