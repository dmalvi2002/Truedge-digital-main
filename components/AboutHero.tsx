"use client";

import { Sora, IBM_Plex_Sans } from "next/font/google";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

// Manual Font Imports
const sora = Sora({ subsets: ["latin"], weight: ["600", "700"] });
const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function AboutHero() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center bg-white overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32 border-b border-slate-100">
      {/* --- PREMIUM AMBIENCE & GRID --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Blueprint Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-80"></div>
        {/* Brand Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-[120px] mix-blend-multiply opacity-70"></div>
        <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-indigo-300/20 rounded-full blur-[100px] mix-blend-multiply opacity-60"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">
          {/* --- LEFT: The Architect's Pitch --- */}
          <div className="w-full lg:w-[55%] flex flex-col items-start text-left shrink-0">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/80 backdrop-blur-sm px-4 py-2 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
              </span>
              <span
                className={`${ibm.className} text-xs font-bold tracking-widest text-slate-800 uppercase`}
              >
                The Truedge Story
              </span>
            </div>

            <h1
              className={`${sora.className} text-5xl sm:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-slate-950 leading-[1.05] mb-8`}
            >
              We are the <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                architects of your
              </span>
              <br /> unfair advantage.
            </h1>

            <p
              className={`${ibm.className} text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl mb-10`}
            >
              Born in Aberdeen, engineered for the globe. We don't just build
              websites; we construct high-performance digital assets designed to
              completely outclass your competition.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/projects"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800 sm:w-auto"
              >
                View Our Archive
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* --- RIGHT: Premium Overlapping Composition --- */}
          <div className="w-full lg:w-[45%] relative h-[500px] sm:h-[600px] flex items-center justify-center">
            {/* Base Image (Main Corporate Shot) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[85%] h-[75%] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] ring-1 ring-slate-200 z-10 transition-transform duration-700 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-slate-900/10 z-10 mix-blend-overlay"></div>
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                alt="Truedge Engineering HQ"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Overlapping Image 1 (The Tech/Code Shot) */}
            <div className="absolute left-0 bottom-10 w-[55%] h-[45%] rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] ring-[4px] ring-white z-20 transition-transform duration-700 hover:-translate-y-2 hover:rotate-1">
              <div className="absolute inset-0 bg-purple-900/20 z-10 mix-blend-overlay"></div>
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
                alt="Bespoke Code Engineering"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Floating Glassmorphism Location Tag */}
            <div className="absolute -right-4 sm:-right-8 top-1/4 z-30 flex items-center gap-3 rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl px-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.05)] animate-[bounce_4s_infinite_ease-in-out]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <MapPin size={18} className="text-purple-600" />
              </div>
              <div>
                <p
                  className={`${ibm.className} text-[10px] font-bold tracking-widest text-slate-400 uppercase`}
                >
                  Headquarters
                </p>
                <p
                  className={`${sora.className} text-sm font-bold text-slate-900`}
                >
                  Aberdeen, UK
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
