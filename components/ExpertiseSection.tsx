"use client";

import { useState, useEffect } from "react";
import { Code2, LayoutTemplate, Smartphone, BrainCircuit } from "lucide-react";
import { Sora, IBM_Plex_Sans } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const ibmPlexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

const codeSnippets = [
  'buildPage({ perf: "A+" })',
  'deployToEdge("global")',
  'optimise({ seo: true })',
  'launchSite({ live: true })',
  'renderUI({ custom: true })',
];

function TypingAnimation() {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentLine = codeSnippets[lineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < currentLine.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentLine.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 65);
    } else if (!isDeleting && charIndex === currentLine.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentLine.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 35);
    } else {
      setIsDeleting(false);
      setLineIndex((i) => (i + 1) % codeSnippets.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, lineIndex]);

  return (
    <div className="relative z-10 flex flex-col rounded-2xl bg-slate-900/90 border border-white/10 shadow-2xl backdrop-blur-md transition-transform duration-700 group-hover:-translate-y-2 overflow-hidden">
      {/* Editor title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-slate-800/50">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/80"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></div>
        <span className="ml-2 text-[11px] text-slate-500 font-mono tracking-wide">index.tsx</span>
      </div>
      {/* Code lines */}
      <div className="p-4 font-mono text-[11px] leading-relaxed space-y-1.5">
        <div className="flex gap-3 text-slate-600">
          <span className="select-none w-3">1</span>
          <span><span className="text-slate-500">import </span><span className="text-emerald-400">&#123; build &#125;</span><span className="text-slate-500"> from </span><span className="text-amber-400/70">&apos;truedge&apos;</span></span>
        </div>
        <div className="flex gap-3 text-slate-600">
          <span className="select-none w-3">2</span>
          <div className="h-2 w-20 rounded bg-slate-800 mt-1"></div>
        </div>
        <div className="flex gap-3">
          <span className="select-none w-3 text-slate-600">3</span>
          <span>
            <span className="text-slate-500">const </span>
            <span className="text-blue-400">result</span>
            <span className="text-slate-400"> = </span>
            <span className="text-emerald-300">{displayText}</span>
            <span className="inline-block w-[5px] h-[12px] bg-emerald-400 animate-pulse align-middle ml-[1px]"></span>
          </span>
        </div>
        <div className="flex gap-3 text-slate-600">
          <span className="select-none w-3">4</span>
          <div className="h-2 w-20 rounded bg-slate-800 mt-1"></div>
        </div>
        <div className="flex gap-3 text-slate-600">
          <span className="select-none w-3">5</span>
          <div className="h-2 w-28 rounded bg-slate-800 mt-1"></div>
        </div>
      </div>
    </div>
  );
}

function ChipGraphic() {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div className="absolute h-52 w-52 rounded-full bg-violet-600/20 blur-[60px] animate-pulse"></div>
      <svg viewBox="0 0 340 260" className="w-full max-w-[340px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="chip-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="dot-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Circuit traces */}
        <g stroke="#6d28d9" strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 145 80 L 145 55 L 90 55" />
          <path d="M 170 80 L 170 20" />
          <path d="M 195 80 L 195 55 L 250 55" />
          <path d="M 145 180 L 145 215 L 85 215" />
          <path d="M 170 180 L 170 245" />
          <path d="M 195 180 L 195 215 L 255 215" />
          <path d="M 120 100 L 65 100 L 65 45" />
          <path d="M 120 130 L 30 130" />
          <path d="M 120 160 L 65 160 L 65 215" />
          <path d="M 220 100 L 275 100 L 275 45" />
          <path d="M 220 130 L 310 130" />
          <path d="M 220 160 L 275 160 L 275 215" />
        </g>

        {/* Endpoint pads */}
        <g fill="#7c3aed" fillOpacity="0.8" filter="url(#chip-glow)">
          <rect x="87" y="52" width="6" height="6" rx="1.5" />
          <rect x="167" y="17" width="6" height="6" rx="1.5" />
          <rect x="247" y="52" width="6" height="6" rx="1.5" />
          <rect x="82" y="212" width="6" height="6" rx="1.5" />
          <rect x="167" y="242" width="6" height="6" rx="1.5" />
          <rect x="252" y="212" width="6" height="6" rx="1.5" />
          <rect x="62" y="42" width="6" height="6" rx="1.5" />
          <rect x="27" y="127" width="6" height="6" rx="1.5" />
          <rect x="62" y="212" width="6" height="6" rx="1.5" />
          <rect x="272" y="42" width="6" height="6" rx="1.5" />
          <rect x="307" y="127" width="6" height="6" rx="1.5" />
          <rect x="272" y="212" width="6" height="6" rx="1.5" />
        </g>

        {/* Outer pulsing ring */}
        <rect x="112" y="72" width="116" height="116" rx="12" fill="none" stroke="#8b5cf6" strokeWidth="1">
          <animate attributeName="stroke-opacity" values="0.08;0.45;0.08" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="stroke-width" values="1;2;1" dur="2.8s" repeatCount="indefinite" />
        </rect>

        {/* Chip body */}
        <rect x="120" y="80" width="100" height="100" rx="8" fill="#0c0a1e" stroke="#7c3aed" strokeWidth="1.5" />

        {/* Inner die grid */}
        <g stroke="#1e1b4b" strokeWidth="0.6" strokeOpacity="0.9">
          <line x1="140" y1="82" x2="140" y2="178" />
          <line x1="160" y1="82" x2="160" y2="178" />
          <line x1="180" y1="82" x2="180" y2="178" />
          <line x1="200" y1="82" x2="200" y2="178" />
          <line x1="122" y1="100" x2="218" y2="100" />
          <line x1="122" y1="120" x2="218" y2="120" />
          <line x1="122" y1="140" x2="218" y2="140" />
          <line x1="122" y1="160" x2="218" y2="160" />
        </g>

        {/* Chip pins */}
        <g fill="#4c1d95">
          <rect x="142" y="77" width="7" height="5" rx="1" />
          <rect x="167" y="77" width="7" height="5" rx="1" />
          <rect x="192" y="77" width="7" height="5" rx="1" />
          <rect x="142" y="178" width="7" height="5" rx="1" />
          <rect x="167" y="178" width="7" height="5" rx="1" />
          <rect x="192" y="178" width="7" height="5" rx="1" />
          <rect x="117" y="97" width="5" height="7" rx="1" />
          <rect x="117" y="127" width="5" height="7" rx="1" />
          <rect x="117" y="157" width="5" height="7" rx="1" />
          <rect x="218" y="97" width="5" height="7" rx="1" />
          <rect x="218" y="127" width="5" height="7" rx="1" />
          <rect x="218" y="157" width="5" height="7" rx="1" />
        </g>

        {/* "AI" glow layer */}
        <text x="170" y="132" textAnchor="middle" dominantBaseline="middle"
          fill="#8b5cf6" fontSize="38" fontWeight="900" fontFamily="Inter, sans-serif"
          filter="url(#text-glow)" opacity="0.75">AI</text>
        {/* "AI" crisp layer */}
        <text x="170" y="132" textAnchor="middle" dominantBaseline="middle"
          fill="#c4b5fd" fontSize="38" fontWeight="900" fontFamily="Inter, sans-serif">
          AI
          <animate attributeName="fill" values="#c4b5fd;#ede9fe;#c4b5fd" dur="3s" repeatCount="indefinite" />
        </text>

        {/* Animated signal dots — one per trace */}
        <circle r="2.5" fill="#a78bfa" filter="url(#dot-glow)">
          <animateMotion dur="1.8s" repeatCount="indefinite" begin="0s"   path="M 145 80 L 145 55 L 90 55" />
        </circle>
        <circle r="2.5" fill="#a78bfa" filter="url(#dot-glow)">
          <animateMotion dur="1.6s" repeatCount="indefinite" begin="0.4s" path="M 170 80 L 170 20" />
        </circle>
        <circle r="2.5" fill="#a78bfa" filter="url(#dot-glow)">
          <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.8s" path="M 195 80 L 195 55 L 250 55" />
        </circle>
        <circle r="2.5" fill="#a78bfa" filter="url(#dot-glow)">
          <animateMotion dur="2s"   repeatCount="indefinite" begin="0.2s" path="M 85 215 L 145 215 L 145 180" />
        </circle>
        <circle r="2.5" fill="#a78bfa" filter="url(#dot-glow)">
          <animateMotion dur="1.6s" repeatCount="indefinite" begin="1s"   path="M 170 180 L 170 245" />
        </circle>
        <circle r="2.5" fill="#a78bfa" filter="url(#dot-glow)">
          <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.6s" path="M 255 215 L 195 215 L 195 180" />
        </circle>
        <circle r="2.5" fill="#a78bfa" filter="url(#dot-glow)">
          <animateMotion dur="2s"   repeatCount="indefinite" begin="0.3s" path="M 65 45 L 65 100 L 120 100" />
        </circle>
        <circle r="2.5" fill="#a78bfa" filter="url(#dot-glow)">
          <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.7s" path="M 30 130 L 120 130" />
        </circle>
        <circle r="2.5" fill="#a78bfa" filter="url(#dot-glow)">
          <animateMotion dur="2s"   repeatCount="indefinite" begin="1.1s" path="M 120 160 L 65 160 L 65 215" />
        </circle>
        <circle r="2.5" fill="#a78bfa" filter="url(#dot-glow)">
          <animateMotion dur="2s"   repeatCount="indefinite" begin="0.5s" path="M 275 45 L 275 100 L 220 100" />
        </circle>
        <circle r="2.5" fill="#a78bfa" filter="url(#dot-glow)">
          <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.9s" path="M 220 130 L 310 130" />
        </circle>
        <circle r="2.5" fill="#a78bfa" filter="url(#dot-glow)">
          <animateMotion dur="2s"   repeatCount="indefinite" begin="1.3s" path="M 220 160 L 275 160 L 275 215" />
        </circle>
      </svg>
    </div>
  );
}

export default function ExpertiseSection() {
  return (
    <section className="relative w-full bg-slate-950 py-24 sm:py-32 overflow-hidden">
      {/* Subtle Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/5"></div>

      {/* Ambient background glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-violet-600/5 blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 max-w-3xl text-left md:mb-24">
          <h2 className={`${sora.className} mb-6 text-4xl font-semibold leading-tight text-white sm:text-5xl`}>
            Our Core <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent drop-shadow-sm">Expertise.</span>
          </h2>
          <p className={`${ibmPlexSans.className} text-lg text-slate-400 sm:text-xl leading-relaxed max-w-2xl`}>
            We don't offer a menu of generic services. We focus exclusively on the core digital pillars that actually move the needle for ambitious brands.
          </p>
        </div>

        {/* 100% Width Stacked Cards Container */}
        <div className="flex flex-col gap-10">
          
          {/* --- PILLAR 1: SaaS & Web Engineering (Violet Theme) --- */}
          <div className="group relative flex w-full flex-col overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/10 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between transition-all duration-500 hover:border-violet-500/40 hover:bg-white/[0.04]">
            
            {/* Left Content */}
            <div className="relative z-10 max-w-2xl lg:w-3/5">
  <div className="mb-8 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 border border-violet-500/20 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
    <BrainCircuit size={28} className="text-violet-400" />
  </div>
  <h3 className={`${sora.className} mb-4 text-3xl font-bold text-white sm:text-4xl`}>
    Enterprise AI & Agentic Solutions
  </h3>
  <p className={`${ibmPlexSans.className} mb-8 text-slate-400 leading-relaxed text-md lg:text-lg`}>
    We engineer infinitely scalable AI SaaS platforms, autonomous agentic workflows, and high-performance cloud applications deployed on enterprise-grade LLM infrastructure.
  </p>
  <div className="flex flex-wrap gap-3">
    <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-xs font-bold tracking-wide text-violet-300 shadow-sm">
      RAG & LLM Pipelines
    </span>
    <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-bold tracking-wide text-slate-300">
      Agentic Workflows
    </span>
    <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-bold tracking-wide text-slate-300">
      Distributed Cloud
    </span>
  </div>
</div>

            {/* Right Abstract Graphic: Code Terminal Fade */}
            <div className="relative mt-12 h-64 w-full lg:mt-0 lg:w-2/5 lg:shrink-0 perspective-1000">
              <div className="absolute right-0 top-1/2 w-full max-w-[340px] -translate-y-1/2 transition-transform duration-700 group-hover:scale-105">
                <ChipGraphic />
              </div>
            </div>
          </div>

          {/* --- PILLAR 2: UI/UX (Emerald Theme) --- */}
          <div className="group relative flex w-full flex-col overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/10 p-8 sm:p-12 lg:flex-row-reverse lg:items-center lg:justify-between transition-all duration-500 hover:border-emerald-500/40 hover:bg-white/[0.04]">
            
            {/* Right Content (appears on left on mobile, right on desktop due to flex-row-reverse) */}
<div className="relative z-10 max-w-2xl lg:w-3/5">
  <div className="mb-8 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
    <Code2 size={28} className="text-emerald-400" />
  </div>
  <h3 className={`${sora.className} mb-4 text-3xl font-bold text-white sm:text-4xl`}>
    Bespoke Web Development
  </h3>
  <p className={`${ibmPlexSans.className} mb-8 text-md lg:text-lg leading-relaxed text-slate-400`}>
    We build bespoke, high-performance websites tailored to your exact business needs. We do not use standard templates, focusing instead on clean code and engaging design to ensure your brand stands out and is fully optimised for growth.
  </p>
  <div className="flex flex-wrap gap-3">
    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-xs font-bold tracking-wide text-emerald-300 shadow-sm">
      Custom Next.js
    </span>
    <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-bold tracking-wide text-slate-300">
      Tailored Design
    </span>
    <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-bold tracking-wide text-slate-300">
      Fully Optimised
    </span>
  </div>
</div>

            {/* Left Abstract Graphic: Floating UI Wireframes */}
            <div className="relative mt-12 h-64 w-full lg:mt-0 lg:w-2/5 lg:shrink-0">
              <div className="absolute left-0 top-1/2 w-full max-w-[350px] -translate-y-1/2">
                {/* Back Wireframe Box */}
                <div className="absolute -right-4 -top-8 h-32 w-48 rounded-xl bg-slate-800/50 border border-white/5 backdrop-blur-sm transition-transform duration-700 group-hover:translate-x-4 group-hover:-translate-y-4"></div>
                {/* Front Wireframe Box with Typing Animation */}
                <TypingAnimation />
              </div>
            </div>
          </div>

          {/* --- PILLAR 3: Mobile Apps (Cyan Theme) --- */}
          <div className="group relative flex w-full flex-col overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/10 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between transition-all duration-500 hover:border-cyan-500/40 hover:bg-white/[0.04]">
            
            {/* Left Content */}
            <div className="relative z-10 max-w-2xl lg:w-3/5">
              <div className="mb-8 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                <Smartphone size={28} className="text-cyan-400" />
              </div>
              <h3 className={`${sora.className} mb-4 text-3xl font-bold text-white sm:text-4xl`}>Mobile App Development</h3>
              <p className={`${ibmPlexSans.className} mb-8 text-slate-400 leading-relaxed text-md lg:text-lg`}>
                Put your business directly into the pockets of your customers. We build flawless, native-feeling iOS and Android applications that scale effortlessly.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-xs font-bold tracking-wide text-cyan-300 shadow-sm">React Native</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-bold tracking-wide text-slate-300">iOS & Android</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-bold tracking-wide text-slate-300">API Integration</span>
              </div>
            </div>

            {/* Right Abstract Graphic: Mobile Phone Silhouette */}
            <div className="relative mt-12 h-64 w-full lg:mt-0 lg:w-2/5 lg:shrink-0">
               <div className="absolute right-10 top-1/2 h-[260px] w-[130px] -translate-y-1/2 rounded-[2rem] border-[6px] border-slate-800 bg-slate-900 shadow-2xl transition-all duration-700 group-hover:-translate-y-6 group-hover:rotate-6">
                 {/* Glowing Phone Screen */}
                 <div className="absolute inset-1 rounded-[1.5rem] border border-white/5 bg-gradient-to-b from-cyan-900/40 to-slate-900 p-3 overflow-hidden">
                    <div className="mx-auto h-1 w-8 rounded-full bg-slate-800 mb-4"></div>
                    <div className="h-16 w-full rounded-xl bg-cyan-500/20 border border-cyan-500/30 mb-3"></div>
                    <div className="h-6 w-full rounded-md bg-white/5 mb-2"></div>
                    <div className="h-6 w-3/4 rounded-md bg-white/5"></div>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}