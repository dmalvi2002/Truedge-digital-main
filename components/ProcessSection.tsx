"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Sora } from "next/font/google";
import ScrollRippleTitle from "@/components/ScrollRippleTitle";
import SectionCursor from "@/components/SectionCursor";

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
  category: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: ".01",
    category: "Research",
    title: "Research & Strategic Discovery Phase",
    icon: ResearchIcon,
    isActive: true,
  },
  {
    number: ".02",
    category: "Strategy",
    title: "Customized Strategy Development",
    icon: StrategyIcon,
    isActive: false,
  },
  {
    number: ".03",
    category: "Creative Solutions",
    title: "Creative Design & Development",
    icon: DesignIcon,
    isActive: false,
  },
  {
    number: ".04",
    category: "Web Engineering",
    title: "Full-Stack Web Development & Engineering",
    icon: DevelopmentIcon,
    isActive: false,
  },
  {
    number: ".05",
    category: "Project Launch",
    title: "Launch & Growth Optimization",
    icon: LaunchIcon,
    isActive: false,
  },
  {
    number: ".06",
    category: "CRM & Automation",
    title: "CRM Management & Pipeline Setup",
    icon: CrmIcon,
    isActive: false,
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

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
          <div className="lg:col-span-7">
            <ScrollRippleTitle
              text="creative strategy & smart execution for growth"
              as="h2"
              accentColor="#d2f83a"
              baseColor="rgba(255, 255, 255, 0.22)"
              activeColor="#ffffff"
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

        {/* ─── 3D TACTILE PROCESS CARDS GRID (Exact Reference Replica) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-[32px] sm:rounded-[36px] p-8 sm:p-9 bg-gradient-to-b from-[#1b1c20] to-[#141518] border border-white/[0.07] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] hover:border-white/20 hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between min-h-[440px] sm:min-h-[460px] lg:min-h-[480px] overflow-hidden"
            >
              {/* Top Content: Standalone Line Icon, Category Eyebrow, Process Title */}
              <div>
                {/* Standalone Vector Illustration with Electric Lime Accent (No bounding box) */}
                <div className="mb-10 sm:mb-12 transition-transform duration-500 group-hover:scale-105">
                  <step.icon className="w-12 h-12 sm:w-14 sm:h-14" />
                </div>

                {/* Category Eyebrow */}
                <div className="text-sm sm:text-[15px] font-normal text-[#8e929a] mb-3">
                  {step.category}
                </div>

                {/* Main Process Title */}
                <h3 className="text-xl sm:text-[23px] font-bold text-white tracking-tight leading-[1.25] max-w-[280px]">
                  {step.title}
                </h3>
              </div>

              {/* Bottom Row: Lime Status Dot on Left, Huge Watermark Number on Right */}
              <div className="flex items-end justify-between mt-auto pt-8">
                
                {/* Left: Electric Lime Indicator Dot */}
                <div className="pb-1.5">
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      step.isActive
                        ? "bg-[#d2f83a] shadow-[0_0_10px_#d2f83a]"
                        : "bg-transparent group-hover:bg-[#d2f83a] group-hover:shadow-[0_0_10px_#d2f83a]"
                    }`}
                  />
                </div>

                {/* Right: Stylized Watermark Number (.01 in lime for active card, dark graphite for rest, illuminates on hover) */}
                <span
                  className={`text-6xl sm:text-7xl font-bold tracking-tighter leading-none select-none transition-colors duration-300 ${
                    step.isActive
                      ? "text-[#d2f83a]"
                      : "text-white/[0.09] group-hover:text-white/20"
                  }`}
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