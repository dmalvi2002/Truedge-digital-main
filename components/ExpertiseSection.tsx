"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BrainCircuit, Cloud, Smartphone, Clapperboard, ArrowUpRight } from "lucide-react";
import { Sora, IBM_Plex_Sans } from "next/font/google";
import ScrollRippleTitle from "@/components/ScrollRippleTitle";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
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

function PhoneGraphic() {
  const r = 26;
  const circ = 2 * Math.PI * r;

  return (
    <div className="absolute right-10 top-1/2 h-[260px] w-[130px] -translate-y-1/2 rounded-[2rem] border-[6px] border-slate-800 bg-slate-900 shadow-2xl transition-all duration-700 group-hover:-translate-y-6 group-hover:rotate-6">
      <div className="absolute inset-1 rounded-[1.5rem] border border-white/5 bg-slate-950 overflow-hidden flex flex-col">

        {/* Status bar */}
        <div className="flex items-center justify-between px-3 pt-2.5 pb-0.5 shrink-0">
          <span className="text-[7px] font-semibold text-slate-400 tracking-wide">9:41</span>
          <div className="flex items-center gap-0.5">
            <div className="h-1 w-0.5 rounded-full bg-slate-600"></div>
            <div className="h-1.5 w-0.5 rounded-full bg-slate-500"></div>
            <div className="h-2 w-0.5 rounded-full bg-slate-400"></div>
            <div className="ml-1 flex items-center h-2 w-3.5 rounded-sm border border-slate-600 p-px">
              <div className="h-full w-2/3 rounded-sm bg-cyan-400/80"></div>
            </div>
          </div>
        </div>

        {/* App header */}
        <div className="flex items-center justify-between px-3 py-1.5 shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-[0_0_8px_rgba(6,182,212,0.6)]">
              <div className="h-2 w-1.5 rounded-sm bg-white/90"></div>
            </div>
            <span className="text-[9px] font-bold text-white tracking-tight">Truedge</span>
          </div>
          <div className="relative">
            <div className="h-4 w-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full border border-slate-500"></div>
            </div>
            <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_4px_rgba(6,182,212,0.8)]"></span>
          </div>
        </div>

        {/* Animated progress ring */}
        <div className="flex items-center justify-center shrink-0 mt-0.5">
          <div className="relative w-[66px] h-[66px]">
            <svg width="66" height="66" viewBox="0 0 66 66" fill="none">
              <defs>
                <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#67e8f9" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
              </defs>
              {/* Track */}
              <circle cx="33" cy="33" r={r} stroke="#164e63" strokeWidth="5" />
              {/* Animated fill */}
              <circle cx="33" cy="33" r={r}
                stroke="url(#ring-grad)" strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={circ * 0.28}
                transform="rotate(-90 33 33)">
                <animate attributeName="stroke-dashoffset"
                  values={`${circ};${circ * 0.28};${circ}`}
                  dur="4s" repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1;0.4 0 0.2 1" />
              </circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[15px] font-black text-white leading-none">72%</span>
              <span className="text-[6px] text-cyan-400 font-semibold tracking-widest">SCORE</span>
            </div>
          </div>
        </div>

        {/* Metric cards */}
        <div className="flex gap-1.5 px-2.5 mt-2 shrink-0">
          <div className="flex-1 rounded-xl bg-cyan-500/10 border border-cyan-500/25 p-1.5">
            <div className="text-[6px] text-cyan-400/80 font-semibold tracking-widest mb-0.5">USERS</div>
            <div className="text-[13px] font-black text-white leading-none">2.4k</div>
          </div>
          <div className="flex-1 rounded-xl bg-white/[0.04] border border-white/10 p-1.5">
            <div className="text-[6px] text-slate-400 font-semibold tracking-widest mb-0.5">RATING</div>
            <div className="text-[13px] font-black text-white leading-none">4.9★</div>
          </div>
        </div>

        {/* Mini bar chart */}
        <div className="flex items-end gap-[3px] px-2.5 mt-2.5 h-9 shrink-0">
          {[50, 70, 45, 90, 60, 85, 55].map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-sm ${
                i === 3 || i === 5
                  ? "bg-cyan-400/70 border-t border-cyan-300/50"
                  : "bg-white/10 border-t border-white/5"
              }`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="px-2.5 shrink-0">
          <div className="h-px w-full bg-white/5"></div>
        </div>

        {/* Bottom nav */}
        <div className="mt-auto flex items-center justify-around px-3 pt-1.5 pb-2 border-t border-white/5 shrink-0">
          <div className="flex flex-col items-center gap-0.5">
            <div className="h-3 w-3 rounded-md bg-cyan-500/30 border border-cyan-400/50 shadow-[0_0_4px_rgba(6,182,212,0.4)]"></div>
            <div className="h-0.5 w-3 rounded-full bg-cyan-400"></div>
          </div>
          <div className="h-3 w-3 rounded-md bg-white/5 border border-white/10"></div>
          <div className="h-3 w-3 rounded-md bg-white/5 border border-white/10"></div>
        </div>

      </div>
    </div>
  );
}

function VideoTimelineGraphic() {
  return (
    <div className="relative z-10 flex flex-col w-full max-w-[370px] rounded-2xl bg-[#0e0f14]/95 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md overflow-hidden group-hover:-translate-y-2 transition-transform duration-700">
      {/* Scoped Keyframes for 60fps playhead scrub and purple iOS cursor motion */}
      <style>{`
        @keyframes timelineScrubMove {
          0% { left: 24px; }
          28% { left: 115px; }
          55% { left: 195px; }
          78% { left: 70px; }
          100% { left: 24px; }
        }
        @keyframes iosPurpleCursorMove {
          0% { transform: translate(30px, 32px) scale(1); }
          22% { transform: translate(116px, 42px) scale(0.88); }
          48% { transform: translate(180px, 12px) scale(1); }
          74% { transform: translate(72px, 50px) scale(0.88); }
          100% { transform: translate(30px, 32px) scale(1); }
        }
      `}</style>

      {/* Editor Title Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/10 bg-[#14161f]/80">
        {/* macOS Style Traffic Dots */}
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-[10px] text-slate-400 font-mono tracking-tight truncate max-w-[130px]">
            Commercial_4K.prproj
          </span>
        </div>

        {/* Premiere Pro & After Effects Badges */}
        <div className="flex items-center gap-1.5">
          {/* Adobe Premiere Pro (Pr) */}
          <div className="flex items-center justify-center h-5 w-5 rounded bg-[#00005b] border border-[#9999ff]/60 shadow-[0_0_8px_rgba(153,153,255,0.3)]">
            <span className="text-[10px] font-black tracking-tighter text-[#ea77ff] leading-none">Pr</span>
          </div>
          {/* Adobe After Effects (Ae) */}
          <div className="flex items-center justify-center h-5 w-5 rounded bg-[#00005b] border border-[#d291ff]/60 shadow-[0_0_8px_rgba(210,145,255,0.3)]">
            <span className="text-[10px] font-black tracking-tighter text-[#d291ff] leading-none">Ae</span>
          </div>
        </div>
      </div>

      {/* Mini Video Monitor / Canvas Preview */}
      <div className="relative px-3.5 pt-3 pb-2 bg-[#090a0d]">
        <div className="relative h-24 w-full rounded-lg bg-gradient-to-tr from-[#120f1e] via-[#1a1429] to-[#2a1320] border border-white/10 overflow-hidden flex items-center justify-center">
          {/* Animated color grade ambient light */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-cyan-500/20 animate-pulse" />
          
          {/* Centered cinematic frame simulation */}
          <div className="relative z-10 flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
              <span className="text-[9px] font-mono font-bold text-red-400 uppercase tracking-widest">REC 4K</span>
            </div>
            <span className="text-[11px] font-mono font-bold text-white/90 tracking-wider">
              00:01:24:18
            </span>
          </div>

          {/* Safe frame boundary overlays */}
          <div className="absolute inset-2 border border-white/10 border-dashed rounded pointer-events-none" />
        </div>
      </div>

      {/* Timeline Controls & Timecode Ruler */}
      <div className="px-3.5 py-1.5 bg-[#12131a] border-y border-white/5 flex items-center justify-between text-[9px] font-mono text-slate-500">
        <span className="text-orange-400 font-bold">00:00:00</span>
        <span>00:00:05</span>
        <span>00:00:10</span>
        <span>00:00:15</span>
        <span>00:00:20</span>
      </div>

      {/* Multi-Track Timeline Workspace */}
      <div className="relative p-3 space-y-1.5 bg-[#0b0c10] min-h-[115px] overflow-hidden">
        
        {/* Track V2: Motion Graphics / VFX Clip (After Effects Theme) */}
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] font-mono text-slate-500 w-4 select-none">V2</span>
          <div className="relative flex-1 h-6 rounded bg-slate-900/80 border border-white/5 overflow-hidden">
            <div className="absolute left-8 w-28 h-full rounded bg-gradient-to-r from-purple-600/80 to-indigo-600/80 border border-purple-400/50 flex items-center px-2 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
              <span className="text-[8px] font-bold text-purple-100 font-sans truncate">Ae_3D_Motion.aep</span>
            </div>
          </div>
        </div>

        {/* Track V1: Main Video Cut (Signature Orange Theme) */}
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] font-mono text-slate-500 w-4 select-none">V1</span>
          <div className="relative flex-1 h-7 rounded bg-slate-900/80 border border-white/5 overflow-hidden">
            {/* Clip A */}
            <div className="absolute left-0 w-16 h-full rounded-l bg-gradient-to-r from-orange-600/70 to-amber-600/70 border-r border-white/20 flex items-center px-1.5">
              <span className="text-[8px] font-bold text-orange-100 font-sans truncate">Cam_A_01</span>
            </div>
            {/* Clip B (Active editing clip) */}
            <div className="absolute left-16 w-32 h-full bg-gradient-to-r from-orange-500 to-amber-500 border border-orange-300/60 flex items-center justify-between px-2 shadow-[0_0_12px_rgba(249,115,22,0.35)]">
              <span className="text-[8px] font-extrabold text-slate-950 font-sans truncate">Commercial_Cut</span>
              <div className="h-3 w-1 rounded-full bg-white/70" />
            </div>
            {/* Clip C */}
            <div className="absolute left-48 w-24 h-full rounded-r bg-gradient-to-r from-orange-700/60 to-amber-700/60 flex items-center px-1.5">
              <span className="text-[8px] font-bold text-orange-200 font-sans truncate">B_Roll_VFX</span>
            </div>
          </div>
        </div>

        {/* Track A1: Audio Waveforms */}
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] font-mono text-slate-500 w-4 select-none">A1</span>
          <div className="relative flex-1 h-5 rounded bg-slate-900/80 border border-white/5 overflow-hidden flex items-center px-2 gap-0.5">
            {[40, 70, 90, 60, 80, 100, 45, 85, 95, 60, 40, 75, 90, 50, 70, 85, 65, 45, 80, 95, 60, 75, 90, 50].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-cyan-400/60 rounded-full"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Animated Playhead Line with Orange Scrubber Head */}
        <div
          style={{ animation: "timelineScrubMove 4.5s ease-in-out infinite" }}
          className="absolute top-0 bottom-0 z-20 pointer-events-none"
        >
          <div className="relative h-full flex flex-col items-center">
            {/* Orange Playhead Scrubber Diamond */}
            <div className="w-2.5 h-2.5 bg-orange-500 rotate-45 -mt-1 shadow-[0_0_8px_#f97316]" />
            {/* Vertical Playhead Line */}
            <div className="w-[1.5px] h-full bg-orange-500/90 shadow-[0_0_6px_#f97316]" />
          </div>
        </div>

        {/* Animated Purple iOS Cursor Moving & Editing */}
        <div
          style={{ animation: "iosPurpleCursorMove 4.5s ease-in-out infinite" }}
          className="absolute top-0 left-0 z-30 pointer-events-none"
        >
          <div className="relative">
            {/* iOS Style Purple Pointer SVG */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_4px_12px_rgba(168,85,247,0.75)]"
            >
              <path
                d="M5.5 3.5L18.5 10.5L12 13L9.5 19.5L5.5 3.5Z"
                fill="#a855f7"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            {/* Action Ripple Ring */}
            <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-purple-400/30 animate-ping pointer-events-none" />
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ExpertiseSection() {
  return (
    <div className="relative mt-28 sm:mt-36 lg:mt-40 select-none">
      {/* Atmospheric Ambient Glows for Expertise Zone */}
      <div className="pointer-events-none absolute -left-20 top-16 w-[550px] h-[450px] bg-violet-600/[0.05] blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute -right-20 top-1/3 w-[600px] h-[500px] bg-orange-500/[0.05] blur-[160px] rounded-full" />
      <div className="pointer-events-none absolute left-1/4 bottom-10 w-[550px] h-[450px] bg-cyan-600/[0.05] blur-[140px] rounded-full" />
        
        {/* ─── SECTION HEADER: Exact Same Animated Ripple Title as ProcessSection ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-16 sm:mb-20">
          
          {/* Left Column: Lowercase Headline with Scroll Ripple Animation */}
          <div className="lg:col-span-7">
            <ScrollRippleTitle
              id="other-expertise-title"
              text="Our other expertise"
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

          {/* Right Column: Strategic Thesis Paragraph */}
          <div className="lg:col-span-5 flex flex-col items-start pt-1 sm:pt-1.5">
            <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed max-w-md">
              Beyond core software engineering, we deliver specialized digital capabilities engineered to accelerate growth, engagement, and enterprise valuation.
            </p>
          </div>
        </div>

        {/* ─── 4 EXPERTISE PILLARS ─── */}
        <div className="flex flex-col gap-10 sm:gap-12">
          
          {/* ════════ CARD 1: ENTERPRISE AI & AGENTIC SOLUTIONS (Cyber-Violet Theme) ════════ */}
          <div className="group relative flex w-full flex-col overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-[#181622]/90 via-[#13121b]/95 to-[#0e0d14] border border-violet-500/20 p-8 sm:p-12 lg:p-14 lg:flex-row lg:items-center lg:justify-between transition-all duration-500 hover:border-violet-500/50 hover:shadow-[0_25px_70px_rgba(139,92,246,0.18)] hover:-translate-y-1">
            
            {/* Ambient Radial Spotlight inside Card */}
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-violet-600/15 blur-[80px] pointer-events-none group-hover:bg-violet-600/25 transition-all duration-700" />
            <div className="absolute left-0 bottom-0 h-48 w-48 rounded-full bg-violet-900/10 blur-[60px] pointer-events-none" />

            {/* Left Content */}
            <div className="relative z-10 max-w-2xl lg:w-3/5 flex flex-col items-start">
              {/* Standalone Icon Badge */}
              <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 border border-violet-500/30 text-violet-400 shadow-[0_0_24px_rgba(139,92,246,0.25)] transition-transform duration-300 group-hover:scale-105">
                <BrainCircuit size={28} />
              </div>

              {/* Title (Kept Intact) */}
              <h3 className={`${sora.className} mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight group-hover:text-violet-100 transition-colors`}>
                Enterprise AI & Agentic Solutions
              </h3>

              {/* Description (Kept Intact) */}
              <p className={`${ibmPlexSans.className} mb-8 text-slate-400 leading-relaxed text-sm sm:text-base lg:text-lg max-w-xl`}>
                We engineer AI-powered smart software, autonomous agentic solutions, and smart kiosk hardware installations. All built on enterprise-grade infrastructure and designed to scale without limits.
              </p>

              {/* Feature Tags (Kept Intact) */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="rounded-full border border-violet-500/40 bg-violet-500/15 px-4 sm:px-5 py-2 text-xs font-bold tracking-wide text-violet-200 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                  RAG & LLM Pipelines
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 sm:px-5 py-2 text-xs font-bold tracking-wide text-slate-300 hover:border-violet-500/30 hover:text-white transition-colors">
                  Agentic Workflows
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 sm:px-5 py-2 text-xs font-bold tracking-wide text-slate-300 hover:border-violet-500/30 hover:text-white transition-colors">
                  Distributed Cloud
                </span>
              </div>
            </div>

            {/* Right Abstract Graphic: ChipGraphic Asset Intact */}
            <div className="relative mt-12 h-64 sm:h-72 w-full lg:mt-0 lg:w-2/5 lg:shrink-0 flex items-center justify-center">
              <div className="relative w-full max-w-[340px] transition-transform duration-700 group-hover:scale-105">
                <ChipGraphic />
              </div>
            </div>
          </div>


          {/* ════════ CARD 2: CLOUD SOFTWARES & SAAS (Truedge Electric Lime Theme) ════════ */}
          <div className="group relative flex w-full flex-col overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-[#181d14]/90 via-[#131710]/95 to-[#0e110b] border border-[#d2f83a]/25 p-8 sm:p-12 lg:p-14 lg:flex-row-reverse lg:items-center lg:justify-between transition-all duration-500 hover:border-[#d2f83a]/60 hover:shadow-[0_25px_70px_rgba(210,248,58,0.18)] hover:-translate-y-1">
            
            {/* Ambient Radial Spotlight inside Card */}
            <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#d2f83a]/12 blur-[80px] pointer-events-none group-hover:bg-[#d2f83a]/20 transition-all duration-700" />
            <div className="absolute right-0 bottom-0 h-48 w-48 rounded-full bg-lime-900/10 blur-[60px] pointer-events-none" />

            {/* Right Content (appears right on desktop via flex-row-reverse) */}
            <div className="relative z-10 max-w-2xl lg:w-3/5 flex flex-col items-start">
              {/* Standalone Icon Badge */}
              <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#d2f83a]/10 border border-[#d2f83a]/30 text-[#d2f83a] shadow-[0_0_24px_rgba(210,248,58,0.25)] transition-transform duration-300 group-hover:scale-105">
                <Cloud size={28} />
              </div>

              {/* Title (Modified to "Cloud Softwares & SaaS" as requested!) */}
              <h3 className={`${sora.className} mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight group-hover:text-lime-100 transition-colors`}>
                Cloud Softwares & SaaS
              </h3>

              {/* Description (Modified for Cloud & SaaS architecture) */}
              <p className={`${ibmPlexSans.className} mb-8 text-slate-400 leading-relaxed text-sm sm:text-base lg:text-lg max-w-xl`}>
                We architect bespoke multi-tenant SaaS platforms, resilient cloud microservices, and high-performance enterprise software. Engineered with automated subscription billing, bulletproof role-based security, and limitless auto-scaling from day one.
              </p>

              {/* Feature Tags for SaaS & Cloud */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="rounded-full border border-[#d2f83a]/40 bg-[#d2f83a]/15 px-4 sm:px-5 py-2 text-xs font-bold tracking-wide text-[#d2f83a] shadow-[0_0_15px_rgba(210,248,58,0.2)]">
                  Multi-Tenant SaaS
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 sm:px-5 py-2 text-xs font-bold tracking-wide text-slate-300 hover:border-[#d2f83a]/30 hover:text-white transition-colors">
                  Cloud Infrastructure
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 sm:px-5 py-2 text-xs font-bold tracking-wide text-slate-300 hover:border-[#d2f83a]/30 hover:text-white transition-colors">
                  Automated Subscriptions
                </span>
              </div>
            </div>

            {/* Left Abstract Graphic: TypingAnimation Asset Intact */}
            <div className="relative mt-12 h-64 sm:h-72 w-full lg:mt-0 lg:w-2/5 lg:shrink-0 flex items-center justify-center lg:justify-start">
              <div className="relative w-full max-w-[360px]">
                {/* Back Wireframe Floating Card */}
                <div className="absolute -right-4 -top-6 h-32 w-48 rounded-xl bg-emerald-950/30 border border-[#d2f83a]/20 backdrop-blur-sm transition-transform duration-700 group-hover:translate-x-4 group-hover:-translate-y-3" />
                {/* Front TypingAnimation Asset (Kept Intact) */}
                <TypingAnimation />
              </div>
            </div>
          </div>


          {/* ════════ CARD 3: MOBILE APP DEVELOPMENT (Electric Cyan Theme) ════════ */}
          <div className="group relative flex w-full flex-col overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-[#141b24]/90 via-[#10161d]/95 to-[#0b0f14] border border-cyan-500/20 p-8 sm:p-12 lg:p-14 lg:flex-row lg:items-center lg:justify-between transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_25px_70px_rgba(6,182,212,0.18)] hover:-translate-y-1">
            
            {/* Ambient Radial Spotlight inside Card */}
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cyan-600/15 blur-[80px] pointer-events-none group-hover:bg-cyan-600/25 transition-all duration-700" />
            <div className="absolute left-0 bottom-0 h-48 w-48 rounded-full bg-cyan-900/10 blur-[60px] pointer-events-none" />

            {/* Left Content */}
            <div className="relative z-10 max-w-2xl lg:w-3/5 flex flex-col items-start">
              {/* Standalone Icon Badge */}
              <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_24px_rgba(6,182,212,0.25)] transition-transform duration-300 group-hover:scale-105">
                <Smartphone size={28} />
              </div>

              {/* Title (Kept Intact) */}
              <h3 className={`${sora.className} mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight group-hover:text-cyan-100 transition-colors`}>
                Mobile App Development
              </h3>

              {/* Description (Kept Intact) */}
              <p className={`${ibmPlexSans.className} mb-8 text-slate-400 leading-relaxed text-sm sm:text-base lg:text-lg max-w-xl`}>
                Put your business directly into the pockets of your customers. We build flawless, native-feeling iOS and Android applications that scale effortlessly.
              </p>

              {/* Feature Tags (Kept Intact) */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="rounded-full border border-cyan-500/40 bg-cyan-500/15 px-4 sm:px-5 py-2 text-xs font-bold tracking-wide text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  React Native
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 sm:px-5 py-2 text-xs font-bold tracking-wide text-slate-300 hover:border-cyan-500/30 hover:text-white transition-colors">
                  iOS & Android
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 sm:px-5 py-2 text-xs font-bold tracking-wide text-slate-300 hover:border-cyan-500/30 hover:text-white transition-colors">
                  API Integration
                </span>
              </div>
            </div>

            {/* Right Abstract Graphic: PhoneGraphic Asset Intact */}
            <div className="relative mt-12 h-64 sm:h-72 w-full lg:mt-0 lg:w-2/5 lg:shrink-0 flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[280px] h-full">
                <PhoneGraphic />
              </div>
            </div>
          </div>


          {/* ════════ CARD 4: VIDEO & MOTION GRAPHICS EDITING (Vibrant Orange Theme) ════════ */}
          <div className="group relative flex w-full flex-col overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-[#1c1612]/90 via-[#15120f]/95 to-[#0e0c0a] border border-orange-500/25 p-8 sm:p-12 lg:p-14 lg:flex-row-reverse lg:items-center lg:justify-between transition-all duration-500 hover:border-orange-500/60 hover:shadow-[0_25px_70px_rgba(249,115,22,0.2)] hover:-translate-y-1">
            
            {/* Ambient Radial Spotlight inside Card */}
            <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-orange-500/15 blur-[80px] pointer-events-none group-hover:bg-orange-500/25 transition-all duration-700" />
            <div className="absolute right-0 bottom-0 h-48 w-48 rounded-full bg-orange-950/20 blur-[60px] pointer-events-none" />

            {/* Right Content (appears right on desktop via flex-row-reverse) */}
            <div className="relative z-10 max-w-2xl lg:w-3/5 flex flex-col items-start">
              {/* Standalone Icon Badge */}
              <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400 shadow-[0_0_24px_rgba(249,115,22,0.25)] transition-transform duration-300 group-hover:scale-105">
                <Clapperboard size={28} />
              </div>

              {/* Title */}
              <h3 className={`${sora.className} mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight group-hover:text-orange-100 transition-colors`}>
                Video & Motion Graphics Editing
              </h3>

              {/* Description */}
              <p className={`${ibmPlexSans.className} mb-8 text-slate-400 leading-relaxed text-sm sm:text-base lg:text-lg max-w-xl`}>
                We produce high-impact commercial video edits, cinematic 3D motion graphics, and viral product stories. Engineered with precision pacing, studio-grade color grading, and bespoke sound design that drive brand authority and exponential conversion.
              </p>

              {/* Feature Tags for Video & Motion */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="rounded-full border border-orange-500/40 bg-orange-500/15 px-4 sm:px-5 py-2 text-xs font-bold tracking-wide text-orange-300 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                  Motion Graphics & 3D
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 sm:px-5 py-2 text-xs font-bold tracking-wide text-slate-300 hover:border-orange-500/30 hover:text-white transition-colors">
                  Commercial Video Editing
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 sm:px-5 py-2 text-xs font-bold tracking-wide text-slate-300 hover:border-orange-500/30 hover:text-white transition-colors">
                  Color Grading & VFX
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 sm:px-5 py-2 text-xs font-bold tracking-wide text-slate-300 hover:border-orange-500/30 hover:text-white transition-colors">
                  Sound Design
                </span>
              </div>
            </div>

            {/* Left Abstract Graphic: VideoTimelineGraphic Asset */}
            <div className="relative mt-12 h-auto w-full lg:mt-0 lg:w-2/5 lg:shrink-0 flex items-center justify-center lg:justify-start">
              <VideoTimelineGraphic />
            </div>
          </div>

        </div>

        {/* ─── BOTTOM CTA BANNER: Matching ProcessSection ─── */}
        <div className="mt-14 sm:mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10">
          <div className="max-w-2xl">
            <h2 className={`${sora.className} text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight`}>
              Not sure which service is perfect for you?
            </h2>
          </div>

          {/* Signature Truedge Kinetic Pill CTA */}
          <Link
            href="/contact"
            className="group/cta shrink-0 inline-flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full bg-[#d2f83a] text-slate-950 font-bold shadow-lg shadow-lime-400/20 hover:bg-[#c0e82c] transition-all duration-300 hover:shadow-[0_6px_25px_rgba(210,248,58,0.4)] cursor-pointer"
          >
            <span className="text-sm sm:text-base font-bold">Book a Free Consultation</span>
            <div className="w-8 h-8 rounded-full bg-slate-950 text-[#d2f83a] flex items-center justify-center transition-transform duration-300 group-hover/cta:rotate-45">
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </Link>
        </div>
    </div>
  );
}
