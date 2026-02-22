"use client";

import { Sora, IBM_Plex_Sans } from "next/font/google";
import { Globe2, Code2, Zap, MapPin } from "lucide-react";

// Manual Font Imports (Strict Truedge Standard)
const sora = Sora({ subsets: ["latin"], weight: ["600", "700"] });
const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function AboutStats() {
  return (
    <section className="relative w-full bg-[#fafafa] py-24 lg:py-32 border-y border-slate-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">
          {/* --- LEFT: The Narrative --- */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 shadow-sm">
              <span
                className={`${ibm.className} text-xs font-bold tracking-widest text-purple-700 uppercase`}
              >
                Proof of Execution
              </span>
            </div>

            <h2
              className={`${sora.className} text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 leading-[1.15] mb-6`}
            >
              Tested locally. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Deployed globally.
              </span>
            </h2>

            <p
              className={`${ibm.className} text-lg text-slate-600 leading-relaxed mb-6`}
            >
              For the past two years, we have operated out of Aberdeen, UK,
              engineering bespoke digital infrastructure for ambitious brands.
              We refuse to operate like a traditional agency.
            </p>
            <p
              className={`${ibm.className} text-lg text-slate-600 leading-relaxed mb-8`}
            >
              There are no junior handoffs, no bloated WordPress templates, and
              no hidden retainer fees. Just elite-level software architecture,
              Next.js mastery, and a relentless obsession with performance and
              ROI.
            </p>

            {/* A subtle trust marker */}
            <div className="flex items-center gap-4 border-l-2 border-purple-500 pl-4 mt-2">
              <div className="flex -space-x-3">
                <div className="h-10 w-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-slate-500 font-bold text-xs">
                  TR
                </div>
                <div className="h-10 w-10 rounded-full bg-purple-100 border-2 border-white shadow-sm flex items-center justify-center text-purple-600 font-bold text-xs">
                  UE
                </div>
              </div>
              <div
                className={`${ibm.className} text-sm font-medium text-slate-700`}
              >
                Led by Senior Architects.
              </div>
            </div>
          </div>

          {/* --- RIGHT: The Grounded Bento Stats Grid --- */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Stat Card 1: Purple Theme */}
            <div className="group relative flex flex-col items-start gap-4 rounded-[2rem] border md:border-[3px] border-slate-200 bg-[#fafafa] p-8 transition-all duration-500 hover:bg-white hover:shadow-xl hover:border-purple-200">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 transition-colors duration-500 group-hover:bg-purple-600 group-hover:text-white">
                <Globe2 size={28} />
              </div>
              <div>
                <h3
                  className={`${sora.className} text-4xl font-bold text-slate-950 mb-1`}
                >
                  20<span className="text-purple-600">+</span>
                </h3>
                <p
                  className={`${ibm.className} text-sm font-medium text-slate-600`}
                >
                  Global Projects Delivered
                </p>
              </div>
            </div>

            {/* Stat Card 2: Indigo Theme */}
            <div className="group relative flex flex-col items-start gap-4 rounded-[2rem] border md:border-[3px] border-slate-200 bg-[#fafafa] p-8 transition-all duration-500 hover:bg-white hover:shadow-xl hover:border-indigo-200 sm:mt-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 transition-colors duration-500 group-hover:bg-indigo-600 group-hover:text-white">
                <MapPin size={28} />
              </div>
              <div>
                <h3
                  className={`${sora.className} text-4xl font-bold text-slate-950 mb-1`}
                >
                  2<span className="text-indigo-600">Yrs</span>
                </h3>
                <p
                  className={`${ibm.className} text-sm font-medium text-slate-600`}
                >
                  Engineering in the UK
                </p>
              </div>
            </div>

            {/* Stat Card 3: Emerald Theme */}
            <div className="group relative flex flex-col items-start gap-4 rounded-[2rem] border md:border-[3px] border-slate-200 bg-[#fafafa] p-8 transition-all duration-500 hover:bg-white hover:shadow-xl hover:border-emerald-200">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 transition-colors duration-500 group-hover:bg-emerald-600 group-hover:text-white">
                <Zap size={28} />
              </div>
              <div>
                <h3
                  className={`${sora.className} text-4xl font-bold text-slate-950 mb-1`}
                >
                  99<span className="text-emerald-600">+</span>
                </h3>
                <p
                  className={`${ibm.className} text-sm font-medium text-slate-600`}
                >
                  Core Web Vitals Score
                </p>
              </div>
            </div>

            {/* Stat Card 4: Rose Theme */}
            <div className="group relative flex flex-col items-start gap-4 rounded-[2rem] border md:border-[3px] border-slate-200 bg-[#fafafa] p-8 transition-all duration-500 hover:bg-white hover:shadow-xl hover:border-rose-200 sm:mt-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 transition-colors duration-500 group-hover:bg-rose-600 group-hover:text-white">
                <Code2 size={28} />
              </div>
              <div>
                <h3
                  className={`${sora.className} text-xl sm:text-2xl font-bold text-slate-950 mb-1 mt-2`}
                >
                  Next.js & Wordpress
                </h3>
                <p
                  className={`${ibm.className} text-sm font-medium text-slate-600`}
                >
                  Bespoke Architecture Stack
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
