"use client";

import React, { useRef, useState, useEffect } from "react";
import { Sora } from "next/font/google";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Cpu, LayoutTemplate, Database } from "lucide-react";

const sora = Sora({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// ─── LIVE LATENCY TICKER ─────────────────────────────────────────────────────
const AnimatedLatencyStat = ({ baseValue }: { baseValue: number }) => {
  const [val, setVal] = useState(baseValue);
  useEffect(() => {
    const t = setInterval(() => setVal(baseValue + Math.floor(Math.random() * 8 - 4)), 2500);
    return () => clearInterval(t);
  }, [baseValue]);
  return <>{val}</>;
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const tiers = [
  {
    id: "01",
    tag: "LYR-01 · AI / LLM",
    title: "AI Architecture",
    Icon: Cpu,
    c: {
      iconRing:   "bg-emerald-50 border-emerald-200",
      iconText:   "text-emerald-600",
      tagText:    "text-emerald-600/60",
      pillOn:     "bg-emerald-50 border-emerald-200 text-emerald-700",
      pillOff:    "bg-slate-50 border-slate-200 text-slate-500",
      bar:        "bg-gradient-to-r from-emerald-500 to-emerald-400",
      topLine:    "via-emerald-400/50",
      glowBase:   "shadow-[0_2px_20px_rgba(0,0,0,0.05)]",
      glowHover:  "hover:shadow-[0_12px_48px_rgba(16,185,129,0.10),0_0_0_1px_rgba(16,185,129,0.18)]",
      ghostNum:   "text-emerald-500/[0.07]",
      dot:        "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]",
      dotLabel:   "text-emerald-600/50",
    },
    description: "Multi-layered agentic workflows and dynamic semantic routing at enterprise scale.",
    tech: [
      { name: "GPT-4o",           on: true  },
      { name: "Claude 3.5 Sonnet",on: true  },
      { name: "Gemini 1.5 Pro",   on: true  },
      { name: "LangChain",        on: false },
      { name: "Pinecone",         on: false },
      { name: "RAG Pipelines",    on: false },
    ],
    stats: [
      { label: "Models Active", target: 5,     suffix: "+",  isLatency: false, pct: 85 },
      { label: "Avg Latency",   target: 120,   suffix: "ms", isLatency: true,  pct: 93 },
      { label: "Uptime SLA",    target: 99.98, suffix: "%",  isLatency: false, pct: 100 },
    ],
  },
  {
    id: "02",
    tag: "LYR-02 · FRONTEND",
    title: "Frontend Engineering",
    Icon: LayoutTemplate,
    c: {
      iconRing:   "bg-violet-50 border-violet-200",
      iconText:   "text-violet-600",
      tagText:    "text-violet-600/60",
      pillOn:     "bg-violet-50 border-violet-200 text-violet-700",
      pillOff:    "bg-slate-50 border-slate-200 text-slate-500",
      bar:        "bg-gradient-to-r from-violet-500 to-violet-400",
      topLine:    "via-violet-400/50",
      glowBase:   "shadow-[0_2px_20px_rgba(0,0,0,0.05)]",
      glowHover:  "hover:shadow-[0_12px_48px_rgba(139,92,246,0.10),0_0_0_1px_rgba(139,92,246,0.18)]",
      ghostNum:   "text-violet-500/[0.07]",
      dot:        "bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]",
      dotLabel:   "text-violet-600/50",
    },
    description: "Cinematic, zero-layout-shift user experiences delivered from globally distributed edge nodes.",
    tech: [
      { name: "Next.js 15",    on: true  },
      { name: "React 19",      on: true  },
      { name: "GSAP",          on: false },
      { name: "Framer Motion", on: false },
      { name: "TailwindCSS",   on: false },
      { name: "WebGL",         on: false },
    ],
    stats: [
      { label: "Edge Nodes",  target: 240,   suffix: "+",  isLatency: false, pct: 96 },
      { label: "Render Time", target: 45,    suffix: "ms", isLatency: true,  pct: 97 },
      { label: "Uptime SLA",  target: 99.99, suffix: "%",  isLatency: false, pct: 100 },
    ],
  },
  {
    id: "03",
    tag: "LYR-03 · BACKEND",
    title: "Backend & Cloud",
    Icon: Database,
    c: {
      iconRing:   "bg-blue-50 border-blue-200",
      iconText:   "text-blue-600",
      tagText:    "text-blue-600/60",
      pillOn:     "bg-blue-50 border-blue-200 text-blue-700",
      pillOff:    "bg-slate-50 border-slate-200 text-slate-500",
      bar:        "bg-gradient-to-r from-blue-500 to-blue-400",
      topLine:    "via-blue-400/50",
      glowBase:   "shadow-[0_2px_20px_rgba(0,0,0,0.05)]",
      glowHover:  "hover:shadow-[0_12px_48px_rgba(59,130,246,0.10),0_0_0_1px_rgba(59,130,246,0.18)]",
      ghostNum:   "text-blue-500/[0.07]",
      dot:        "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]",
      dotLabel:   "text-blue-600/50",
    },
    description: "Infinitely scalable microservices deployed natively to the edge with sub-millisecond response.",
    tech: [
      { name: "Node.js",       on: true  },
      { name: "Supabase",      on: true  },
      { name: "AWS Edge",      on: true  },
      { name: "PostgreSQL",    on: false },
      { name: "Redis",         on: false },
      { name: "GraphQL APIs",  on: false },
    ],
    stats: [
      { label: "DB Nodes",      target: 40, suffix: "",  isLatency: false, pct: 88 },
      { label: "Cache Hit Rate",target: 95, suffix: "%", isLatency: false, pct: 95 },
      { label: "TP/S",          target: 15, suffix: "k", isLatency: false, pct: 90 },
    ],
  },
] as const;

// ─── ABSTRACT SVG GRAPHICS ───────────────────────────────────────────────────
const NeuralGraphic = () => (
  <svg viewBox="0 0 180 160" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
    {/* Input nodes */}
    {[30, 70, 110].map((cy, i) => (
      <circle key={i} cx="24" cy={cy} r="6" strokeOpacity="0.9" />
    ))}
    {/* Hidden nodes */}
    {[20, 55, 90, 125].map((cy, i) => (
      <circle key={i} cx="90" cy={cy} r="6" strokeOpacity="0.9" />
    ))}
    {/* Output nodes */}
    {[45, 95].map((cy, i) => (
      <circle key={i} cx="156" cy={cy} r="6" strokeOpacity="0.9" />
    ))}
    {/* Input → Hidden connections */}
    {[30, 70, 110].flatMap((sy) =>
      [20, 55, 90, 125].map((ey, j) => (
        <line key={`${sy}-${ey}`} x1="30" y1={sy} x2="84" y2={ey} strokeOpacity="0.35" />
      ))
    )}
    {/* Hidden → Output connections */}
    {[20, 55, 90, 125].flatMap((sy) =>
      [45, 95].map((ey) => (
        <line key={`${sy}-${ey}`} x1="96" y1={sy} x2="150" y2={ey} strokeOpacity="0.35" />
      ))
    )}
  </svg>
);

const ComponentTreeGraphic = () => (
  <svg viewBox="0 0 180 160" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
    <rect x="65" y="8" width="50" height="22" rx="5" strokeOpacity="0.9" />
    <line x1="90" y1="30" x2="90" y2="46" strokeOpacity="0.5" />
    <line x1="38" y1="46" x2="142" y2="46" strokeOpacity="0.5" />
    <line x1="38" y1="46" x2="38" y2="62" strokeOpacity="0.5" />
    <line x1="90" y1="46" x2="90" y2="62" strokeOpacity="0.5" />
    <line x1="142" y1="46" x2="142" y2="62" strokeOpacity="0.5" />
    <rect x="13" y="62" width="50" height="22" rx="5" strokeOpacity="0.9" />
    <rect x="65" y="62" width="50" height="22" rx="5" strokeOpacity="0.9" />
    <rect x="117" y="62" width="50" height="22" rx="5" strokeOpacity="0.9" />
    <line x1="38" y1="84" x2="38" y2="100" strokeOpacity="0.5" />
    <line x1="18" y1="100" x2="58" y2="100" strokeOpacity="0.5" />
    <line x1="18" y1="100" x2="18" y2="116" strokeOpacity="0.5" />
    <line x1="58" y1="100" x2="58" y2="116" strokeOpacity="0.5" />
    <rect x="4" y="116" width="28" height="20" rx="4" strokeOpacity="0.7" />
    <rect x="44" y="116" width="28" height="20" rx="4" strokeOpacity="0.7" />
  </svg>
);

const ServerStackGraphic = () => (
  <svg viewBox="0 0 180 160" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
    {[18, 54, 90].map((y, i) => (
      <g key={i}>
        <rect x="20" y={y} width="140" height="26" rx="5" strokeOpacity="0.9" />
        <circle cx="40" cy={y + 13} r="4" strokeOpacity="0.9" />
        <line x1="54" y1={y + 9} x2="130" y2={y + 9} strokeOpacity="0.3" strokeDasharray="4 3" />
        <line x1="54" y1={y + 17} x2="110" y2={y + 17} strokeOpacity="0.2" strokeDasharray="4 3" />
      </g>
    ))}
    <line x1="90" y1="116" x2="90" y2="134" strokeOpacity="0.5" />
    <line x1="50" y1="134" x2="130" y2="134" strokeOpacity="0.5" />
    <circle cx="50"  cy="134" r="5" strokeOpacity="0.85" />
    <circle cx="90"  cy="134" r="5" strokeOpacity="0.85" />
    <circle cx="130" cy="134" r="5" strokeOpacity="0.85" />
  </svg>
);

const graphics = {
  "01": NeuralGraphic,
  "02": ComponentTreeGraphic,
  "03": ServerStackGraphic,
} as const;

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function StackRevealSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.set(".srs-head", { opacity: 0, y: 22 });
    gsap.set(".srs-card", { opacity: 0, y: 44 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
    });

    tl.to(".srs-head", { opacity: 1, y: 0, duration: 0.85, stagger: 0.13, ease: "power3.out" });
    tl.to(".srs-card", { opacity: 1, y: 0, duration: 0.95, stagger: 0.14, ease: "expo.out" }, "-=0.5");

    // Count-up stats
    sectionRef.current?.querySelectorAll<HTMLElement>(".srs-stat").forEach((el) => {
      const target = parseFloat(el.dataset.target ?? "0");
      gsap.fromTo(el,
        { textContent: 0 },
        {
          textContent: target,
          duration: 1.8,
          ease: "power2.out",
          snap: { textContent: target % 1 !== 0 ? 0.01 : 1 },
          scrollTrigger: { trigger: el, start: "top 88%" },
        }
      );
    });

    // Progress bars
    sectionRef.current?.querySelectorAll<HTMLElement>(".srs-bar").forEach((el) => {
      gsap.fromTo(el,
        { width: "0%" },
        {
          width: `${el.dataset.pct}%`,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className={`relative w-full bg-[#F8FAFF] text-slate-900 py-28 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden ${sora.className}`}
    >
      {/* ── Background: dot grid ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.30) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Radial vignette masks the grid at edges */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_50%,transparent_20%,#F8FAFF_80%)]" />
      {/* Ambient center bloom */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-violet-400/[0.06] blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-20 lg:gap-28">

        {/* ── HEADER ── */}
        <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">

          {/* Status pill */}
          <div className="srs-head inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-sm font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 w-max">
            <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-40 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span>System Architecture</span>
            <span className="text-slate-300">·</span>
            <span className="text-emerald-600">All Systems Operational</span>
          </div>

          {/* Headline */}
          <h2 className="srs-head text-4xl md:text-5xl lg:text-[3.75rem] font-semibold leading-[1.06] tracking-tight text-slate-900">
            The infrastructure powering
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-violet-600 via-violet-500 to-indigo-600">
              {" "}enterprise AI solutions.
            </span>
          </h2>

          {/* Subtext */}
          <p className="srs-head text-lg md:text-[1.2rem] text-slate-500 leading-relaxed font-light max-w-2xl">
            We engineer on the exact same foundation used by the world&apos;s most advanced software
            companies. No templates. No shortcuts. No compromise.
          </p>
        </div>

        {/* ── LAYER CONNECTOR (desktop) ── */}
        <div className="hidden lg:flex items-center gap-0 -mt-10 mb-2 px-[calc(100%/6-1rem)]">
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="font-mono text-[8px] uppercase tracking-widest text-emerald-600/50">L1</span>
          </div>
          <div className="flex-1 relative h-px mx-2 overflow-hidden bg-gradient-to-r from-emerald-400/40 via-violet-400/25 to-transparent">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/40 to-violet-500/30 animate-pulse" />
          </div>
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <div className="h-2 w-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
            <span className="font-mono text-[8px] uppercase tracking-widest text-violet-600/50">L2</span>
          </div>
          <div className="flex-1 relative h-px mx-2 overflow-hidden bg-gradient-to-r from-violet-400/40 via-blue-400/25 to-blue-400/40">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/40 to-blue-500/30 animate-pulse" style={{ animationDelay: "0.6s" }} />
          </div>
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <span className="font-mono text-[8px] uppercase tracking-widest text-blue-600/50">L3</span>
          </div>
        </div>

        {/* ── CARDS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 xl:gap-7 w-full -mt-12">
          {tiers.map((tier) => {
            const { c } = tier;
            const Graphic = graphics[tier.id];
            return (
              <div
                key={tier.id}
                className={`srs-card group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-white border border-slate-200/80 transition-all duration-500 hover:-translate-y-1.5 ${c.glowBase} ${c.glowHover}`}
              >
                {/* Accent top-border line */}
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${c.topLine} to-transparent`} />

                {/* Ghost layer number */}
                <div
                  aria-hidden
                  className={`absolute -bottom-4 -right-2 font-black text-[9rem] leading-none select-none pointer-events-none ${c.ghostNum} transition-all duration-500 group-hover:opacity-100`}
                >
                  {tier.id}
                </div>

                {/* Abstract SVG background graphic */}
                <div className={`absolute bottom-16 right-0 w-44 h-36 opacity-[0.08] pointer-events-none transition-opacity duration-500 group-hover:opacity-[0.15] ${c.iconText}`}>
                  <Graphic />
                </div>

                <div className="relative z-10 flex flex-col h-full p-7 md:p-8 gap-7">

                  {/* Top row: icon + tag */}
                  <div className="flex items-start justify-between gap-4">
                    <div className={`p-3 rounded-2xl border flex-shrink-0 ${c.iconRing} transition-all duration-300 group-hover:scale-105`}>
                      <tier.Icon size={20} className={c.iconText} />
                    </div>
                    <span className={`font-mono text-[9px] tracking-[0.2em] uppercase font-bold ${c.tagText} text-right leading-relaxed pt-0.5`}>
                      {tier.tag}
                    </span>
                  </div>

                  {/* Title + description */}
                  <div>
                    <h3 className="text-[1.35rem] font-semibold tracking-tight text-slate-900 mb-2.5 leading-snug">
                      {tier.title}
                    </h3>
                    <p className="text-[0.875rem] text-slate-500 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-2">
                    {tier.tech.map((item, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-medium border transition-colors duration-300 ${item.on ? c.pillOn : c.pillOff}`}
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>

                  {/* Push stats to bottom */}
                  <div className="mt-auto">
                    {/* Divider */}
                    <div className="w-full h-px bg-slate-100 mb-6" />

                    {/* Stats grid */}
                    <div className="grid grid-cols-3 gap-4">
                      {tier.stats.map((stat, i) => (
                        <div key={i} className="flex flex-col gap-2">
                          <span className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-slate-400 font-semibold leading-tight">
                            {stat.label}
                          </span>
                          <div className="font-mono text-[1.25rem] font-bold text-slate-900 tracking-tight flex items-baseline gap-px">
                            {stat.isLatency ? (
                              <AnimatedLatencyStat baseValue={stat.target} />
                            ) : (
                              <span
                                className={`srs-stat${stat.target % 1 !== 0 ? " is-decimal" : ""}`}
                                data-target={stat.target}
                              >
                                0
                              </span>
                            )}
                            <span className="text-[0.7rem] font-semibold text-slate-500 ml-0.5">
                              {stat.suffix}
                            </span>
                          </div>
                          {/* Progress bar */}
                          <div className="w-full h-[3px] rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className={`srs-bar h-full rounded-full ${c.bar}`}
                              data-pct={stat.pct}
                              style={{ width: "0%" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
