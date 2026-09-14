"use client";

import React from "react";

interface ClientLogo {
  name: string;
  category?: string;
  svg: React.ReactNode;
}

const CLIENT_LOGOS: ClientLogo[] = [
  {
    name: "Envato",
    svg: (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 32 32" className="w-7 h-7 fill-emerald-500" fill="currentColor">
          <path d="M26.2 3.8C23.6 1.4 19.5.5 14.8 1.4c-6.7 1.3-11.7 6.4-12.7 13.1-1.3 8.3 4.2 15.6 12.3 16.4 8.7.9 16.3-5.5 16.6-14.2.1-5.1-2.1-9.9-4.8-12.9zm-4.7 16.3c-2.8 3.8-7.9 4.8-11.8 2.2-2.1-1.4-3.5-3.6-3.8-6.1-.5-4 1.7-7.8 5.4-9.2 1.4-.5 2.9-.7 4.4-.5 2.1.2 4.1 1.2 5.5 2.8 2.6 3.1 2.2 7.8-.3 10.8z"/>
        </svg>
        <span className="text-xl font-bold tracking-tight text-slate-800">envato</span>
      </div>
    ),
  },
  {
    name: "ASIS",
    svg: (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full border-[3px] border-amber-500 relative flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
          <svg className="absolute -top-1 -right-1 w-3.5 h-3.5 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8Z" />
          </svg>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-lg font-black tracking-wider text-slate-900">ASIS</span>
          <span className="text-[8px] font-semibold text-amber-600 tracking-widest uppercase">Stay safe</span>
        </div>
      </div>
    ),
  },
  {
    name: "Techlogo",
    svg: (
      <div className="flex items-center gap-2">
        <div className="grid grid-cols-3 gap-0.5 w-6 h-6">
          {[...Array(9)].map((_, i) => (
            <span 
              key={i} 
              className={`rounded-full ${i % 2 === 0 ? 'bg-indigo-500' : 'bg-slate-400'}`} 
            />
          ))}
        </div>
        <span className="text-lg font-extrabold tracking-tight text-slate-800">Techlogo</span>
      </div>
    ),
  },
  {
    name: "Panda Living",
    svg: (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white text-base">
          🐼
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-base font-black tracking-tight text-slate-900">panda</span>
          <span className="text-[8px] font-semibold text-slate-500 tracking-wider">luxury living</span>
        </div>
      </div>
    ),
  },
  {
    name: "WAWES",
    svg: (
      <div className="flex items-center gap-2">
        <div className="px-1.5 py-0.5 border-2 border-indigo-600 rounded flex items-center justify-center font-black text-indigo-600 text-sm">
          MW
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-base font-extrabold tracking-widest text-slate-900">WAWES</span>
          <div className="h-0.5 w-full bg-indigo-600 mt-0.5" />
        </div>
      </div>
    ),
  },
  {
    name: "Technology",
    svg: (
      <div className="flex items-center gap-2">
        <svg className="w-7 h-7 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="8" rx="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="3" />
          <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="3" />
        </svg>
        <div className="flex flex-col leading-none">
          <span className="text-base font-bold tracking-tight text-slate-800">Technology</span>
          <span className="text-[8px] text-slate-400">Power for logic</span>
        </div>
      </div>
    ),
  },
  {
    name: "NHI",
    svg: (
      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-0.5 font-black text-2xl tracking-tighter text-emerald-600">
          <span>N</span>
          <span className="text-slate-900">H</span>
          <span className="text-emerald-500">I</span>
        </div>
      </div>
    ),
  },
  {
    name: "Vertex Global",
    svg: (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xs shadow-xs">
          ▲
        </div>
        <span className="text-lg font-extrabold tracking-tight text-slate-800">VERTEX</span>
      </div>
    ),
  },
];

export default function ClientLogosSection() {
  return (
    <section className="relative w-full py-12 sm:py-16 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden border-y border-slate-100 select-none">
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12 text-center">
        <p className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-wider text-slate-500 uppercase leading-relaxed">
          Trusted by high-growth UK brands &amp; fast-scaling companies
        </p>
      </div>

      {/* Infinite Smooth Logo Ribbon */}
      <div className="relative w-full flex overflow-hidden group py-1">
        {/* Subtle edge fade gradients applied ONLY to the scrolling logo ribbon */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        <div className="flex items-center gap-14 sm:gap-20 shrink-0 animate-marquee group-hover:[animation-play-state:paused]">
          {CLIENT_LOGOS.map((logo, idx) => (
            <div
              key={`logo-1-${idx}`}
              className="flex items-center grayscale opacity-55 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer"
              title={logo.name}
            >
              {logo.svg}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-14 sm:gap-20 shrink-0 animate-marquee group-hover:[animation-play-state:paused]" aria-hidden="true">
          {CLIENT_LOGOS.map((logo, idx) => (
            <div
              key={`logo-2-${idx}`}
              className="flex items-center grayscale opacity-55 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer"
              title={logo.name}
            >
              {logo.svg}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
