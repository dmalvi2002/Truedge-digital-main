"use client";

import { Sora, IBM_Plex_Sans } from "next/font/google";
import { ArrowRight, Smartphone, Database, Code2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import CoreServices from "@/components/CoreServices";
import WhyChooseUs from "@/components/WhyChooseUs";
import GrowthBridge from "@/components/GrowthBridge";
import ServicesCTA from "@/components/ServicesCTA";
import FaqSection from "@/components/FaqSection";
import { servicesFaqs } from "@/data/servicesFaqs";

const serviceSnippets = [
  'buildProject({ type: "SaaS" })',
  'deployApp({ target: "cloud" })',
  'engineerUI({ perf: "A+" })',
  'scaleInfra({ nodes: "auto" })',
  'shipFaster({ quality: true })',
];

// Font Configuration
const sora = Sora({
  subsets: ["latin"],
  weight: ["700"],
});

const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function ServicesHero() {
  // Simple state for hydration check to ensure animations match server/client
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const [lineIndex, setLineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentLine = serviceSnippets[lineIndex];
    let t: ReturnType<typeof setTimeout>;
    if (!isDeleting && charIndex < currentLine.length) {
      t = setTimeout(() => { setDisplayText(currentLine.slice(0, charIndex + 1)); setCharIndex(c => c + 1); }, 65);
    } else if (!isDeleting && charIndex === currentLine.length) {
      t = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIndex > 0) {
      t = setTimeout(() => { setDisplayText(currentLine.slice(0, charIndex - 1)); setCharIndex(c => c - 1); }, 35);
    } else {
      setIsDeleting(false);
      setLineIndex(i => (i + 1) % serviceSnippets.length);
    }
    return () => clearTimeout(t);
  }, [charIndex, isDeleting, lineIndex]);

  return (
    <div>
      <section className="relative w-full overflow-hidden bg-[#fafafa] pt-16 pb-16 sm:pt-24 sm:pb-24 lg:pt-30 lg:pb-32">
        {/* --- BACKGROUND LAYERS ("ReactBits" Style Pure CSS Aurora) --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Blueprint Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_20%,#000_60%,transparent_100%)] opacity-70"></div>

          {/* Animated Aurora Gradients */}
          {isMounted && (
            <>
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-300/30 rounded-full blur-3xl mix-blend-multiply animate-blob filter blur-[120px] opacity-70"></div>
              <div className="absolute top-0 right-[20%] w-[600px] h-[600px] bg-indigo-300/30 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000 filter blur-[120px] opacity-70"></div>
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000 filter blur-[120px] opacity-60"></div>
            </>
          )}
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-0">
            {/* --- LEFT COLUMN: Copy & Typography (Spans 6 cols on LG) --- */}
            <div className="flex flex-col items-start text-left lg:col-span-6 xl:col-span-5">
              {/* Elite Status Pill */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm px-4 py-2 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
                </span>
                <span
                  className={`${ibm.className} text-xs font-bold tracking-widest text-slate-700 uppercase`}
                >
                  Bespoke Software Engineering
                </span>
              </div>

              {/* The Hook - Updated to text-4xl md:text-6xl font-bold */}
              <h1
                className={`${sora.className} text-4xl md:text-6xl font-semibold tracking-tight text-slate-950 leading-[1.15] lg:leading-[1.1]`}
              >
                We don't build websites.
                <br />
                <span className="relative inline-block mt-2 sm:mt-3">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-[length:200%_auto] animate-[gradient_8s_linear_infinite]">
                    We engineer assets.
                  </span>
                </span>
              </h1>

              {/* The Agitation */}
              <p
                className={`${ibm.className} mt-8 max-w-xl text-lg font-medium leading-relaxed text-slate-600`}
              >
                Most agencies will sell you a bloated, £50-template and call it
                a day. We build high-performance web apps, complex SaaS
                platforms, and native mobile experiences engineered for absolute
                dominance and scalable ROI.
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,rgba(139,92,246,1)0%,rgba(109,40,217,1)100%)] px-8 py-4 text-base font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.4),inset_0_2px_2px_rgba(255,255,255,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(124,58,237,0.6),inset_0_2px_2px_rgba(255,255,255,0.4)] sm:w-auto"
                >
                  Start a Project
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/growth"
                  className={`${ibm.className} group flex w-full items-center justify-center gap-2 rounded-full border-2 border-slate-200 bg-white/50 backdrop-blur-sm px-8 py-4 text-base font-bold text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-white sm:w-auto`}
                >
                  View Marketing Suite
                </Link>
              </div>
            </div>

            {/* --- RIGHT COLUMN: The 3D Tech Ecosystem --- */}
            <div className="lg:col-span-6 xl:col-span-7 relative w-full md:w-[90%] h-[400px] sm:h-[500px] lg:h-[550px] group perspective-[1200px] flex items-center justify-center lg:justify-end mt-8 lg:ml-20 lg:mt-0 scale-[0.9] sm:scale-100 origin-center lg:origin-right transition-transform duration-500">
              {/* The Main Web Dashboard (Glassmorphism) - Scaled Down */}
              <div className="absolute right-2 sm:right-8 lg:right-12 top-4 sm:top-20 w-[85%] sm:w-2/3 h-60 sm:h-72 rounded-2xl border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all duration-700 ease-out [transform:rotateY(-15deg)_rotateX(5deg)_translateZ(0px)] group-hover:[transform:rotateY(-10deg)_rotateX(2deg)_translateY(-10px)_translateZ(20px)] group-hover:shadow-[0_30px_60px_rgba(147,51,234,0.1)] z-10">
                {/* macOS Style Browser Header */}
                <div className="flex items-center gap-2 border-b border-white/50 bg-white/20 px-4 py-3 rounded-t-2xl">
                  <div className="h-3 w-3 rounded-full bg-rose-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"></div>
                  <div className="h-3 w-3 rounded-full bg-amber-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"></div>
                  <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"></div>
                </div>

                {/* Code Editor — light mode */}
                <div className="flex h-[calc(100%-3rem)] overflow-hidden rounded-b-2xl">
                  {/* File sidebar */}
                  <div className="w-[30%] bg-slate-50 border-r border-slate-200 p-2 flex flex-col gap-1">
                    <div className="text-[7px] text-slate-400 font-mono px-1 mb-1 tracking-widest">EXPLORER</div>
                    {[["index.tsx", true], ["api.ts", false], ["styles.css", false]].map(([f, active]) => (
                      <div key={String(f)} className={`flex items-center gap-1.5 px-1.5 py-1 rounded text-[8px] font-mono ${active ? "bg-purple-100 text-purple-700" : "text-slate-400"}`}>
                        <div className={`h-1.5 w-1.5 rounded-sm shrink-0 ${active ? "bg-purple-500" : "bg-slate-300"}`}></div>
                        {String(f)}
                      </div>
                    ))}
                  </div>
                  {/* Code content */}
                  <div className="w-[70%] bg-white p-3 font-mono text-[9px] leading-relaxed space-y-1.5 overflow-hidden">
                    <div className="flex gap-2">
                      <span className="text-slate-300 select-none">1</span>
                      <span><span className="text-purple-600">import </span><span className="text-slate-700">&#123; build &#125;</span><span className="text-purple-600"> from </span><span className="text-amber-600">&apos;truedge&apos;</span></span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-300 select-none">2</span>
                      <div className="h-1.5 w-14 rounded bg-slate-100 mt-1"></div>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-300 select-none">3</span>
                      <span>
                        <span className="text-purple-600">const </span>
                        <span className="text-blue-600">app</span>
                        <span className="text-slate-500"> = </span>
                        <span className="text-emerald-600">{displayText}</span>
                        <span className="inline-block w-[2px] h-[9px] bg-purple-500 animate-pulse align-middle ml-px"></span>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-300 select-none">4</span>
                      <div className="h-1.5 w-10 rounded bg-slate-100 mt-1"></div>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-300 select-none">5</span>
                      <div className="h-1.5 w-20 rounded bg-slate-100 mt-1"></div>
                    </div>
                  </div>
                </div>

                {/* Attached Badge: Next.js */}
                <div className="absolute -right-4 sm:-right-6 -top-5 flex items-center gap-2 rounded-xl border border-white/80 bg-white/90 px-3 py-2 shadow-xl backdrop-blur-md transition-transform duration-700 delay-75 group-hover:-translate-y-3 group-hover:translate-x-2">
                  <Code2 size={16} className="text-slate-800" />
                  <span
                    className={`${ibm.className} text-[10px] sm:text-xs font-bold text-slate-800`}
                  >
                    Next.js & CMS
                  </span>
                </div>
              </div>

              {/* The Native Smartphone Assembly */}
              <div className="absolute left-4 sm:left-12 bottom-0 sm:bottom-6 w-40 sm:w-48 h-[280px] sm:h-[340px] z-20 transition-all duration-700 ease-out [transform:rotateY(15deg)_rotateX(5deg)_translateZ(40px)] group-hover:[transform:rotateY(10deg)_rotateX(0deg)_translateZ(80px)_translateY(-20px)] group-hover:shadow-[0_20px_50px_rgba(147,51,234,0.3)] rounded-[2rem]">
                {/* 1. The Phone Body & Screen (With overflow-hidden applied here instead) */}
                <div className="relative w-full h-full rounded-[2rem] border-[6px] sm:border-[8px] border-slate-900 bg-slate-950 shadow-2xl overflow-hidden">
                  {/* Dynamic Island */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 h-4 sm:h-5 w-10 sm:w-14 rounded-full bg-black z-20"></div>

                  {/* App Screen Simulation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 p-3 pt-10 sm:pt-12 flex flex-col gap-3">
                    <div className="h-24 sm:h-28 w-full rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 p-3 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                      <div className="absolute -right-4 -bottom-4 h-16 sm:h-20 w-16 sm:w-20 rounded-full bg-white/10 blur-xl"></div>
                      <p className="text-[9px] sm:text-[10px] font-semibold text-white/60 mb-1 tracking-widest uppercase">TruEdge App</p>
                      <p className="text-[15px] sm:text-lg font-black text-white leading-tight">Grow<br/>Faster.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-14 sm:h-16 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-0.5">
                        <span className="text-[10px] sm:text-xs font-black text-white">12.4k</span>
                        <span className="text-[7px] sm:text-[8px] text-white/40 font-medium">Users</span>
                      </div>
                      <div className="h-14 sm:h-16 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-0.5">
                        <span className="text-[10px] sm:text-xs font-black text-white">£48k</span>
                        <span className="text-[7px] sm:text-[8px] text-white/40 font-medium">Revenue</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Attached Badge (Now sitting safely outside the overflow-hidden layer!) */}
                <div className="z-50 absolute top-2/3 -left-4 sm:-left-8 flex items-center gap-2 rounded-xl border border-white/20 bg-slate-900/90 px-3 py-2 shadow-xl backdrop-blur-md transition-transform duration-700 delay-150 group-hover:-translate-y-3 group-hover:-translate-x-2">
                  <Smartphone size={14} className="text-emerald-400" />
                  <span
                    className={`${ibm.className} text-[10px] font-bold text-white whitespace-nowrap`}
                  >
                    Native iOS/Android
                  </span>
                </div>
              </div>

              {/* Floating Database/SaaS Node - Repositioned slightly for new scale */}
              <div className="absolute left-1/4 sm:left-2/4 -top-10 sm:top-16 flex items-center justify-center h-12 sm:h-14 w-12 sm:w-14 rounded-2xl border border-indigo-200 bg-indigo-50 shadow-lg transition-all duration-700 ease-out [transform:translateZ(60px)] group-hover:[transform:translateZ(120px)_translateY(-15px)_rotate(10deg)] group-hover:shadow-indigo-500/30 z-30">
                <Database size={18} className="text-indigo-600" />

                {/* Attached Badge: SaaS */}
                <div className="absolute -top-8 sm:-top-9 whitespace-nowrap rounded-lg bg-indigo-600 px-2 py-1 shadow-md opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span
                    className={`${ibm.className} text-[8px] sm:text-[10px] font-bold text-white uppercase tracking-wider`}
                  >
                    Cloud SaaS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CoreServices />
      <WhyChooseUs />
      <GrowthBridge />
      <div className="bg-white">
        <FaqSection
          faqs={servicesFaqs}
          title="Engineering"
          highlightedTitle="Questions."
          initialVisibleCount={4}
        />
      </div>
      <ServicesCTA />
    </div>
  );
}
