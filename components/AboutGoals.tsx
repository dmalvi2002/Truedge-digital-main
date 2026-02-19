"use client";

import { Sora, IBM_Plex_Sans } from "next/font/google";
import { Target, Eye, HeartHandshake } from "lucide-react";

// Manual Font Imports (Strict Truedge Standard)
const sora = Sora({ subsets: ["latin"], weight: ["600", "700"] });
const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function AboutGoals() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-24 lg:py-32 border-b border-slate-100">
      {/* Subtle background ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-purple-500/5 to-transparent blur-3xl rounded-full pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 shadow-sm">
            <span
              className={`${ibm.className} text-xs font-bold tracking-widest text-purple-700 uppercase`}
            >
              The Foundation
            </span>
          </div>

          <h2
            className={`${sora.className} text-3xl md:text-5xl font-bold tracking-tight text-slate-950 mb-6`}
          >
            Driven by purpose. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 block mt-2">
              Built for dominance.
            </span>
          </h2>

          <p
            className={`${ibm.className} mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed`}
          >
            We don't just write code; we architect solutions. Every decision we
            make is governed by three core principles designed to protect your
            investment and scale your brand.
          </p>
        </div>

        {/* --- 3-COLUMN BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Mission Card: Rose Theme */}
          <div className="group relative flex flex-col items-start gap-6 rounded-[2rem] border border-slate-200 bg-[#fafafa] p-8 sm:p-10 transition-all duration-500 hover:bg-white hover:shadow-xl hover:border-rose-200">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 transition-colors duration-500 group-hover:bg-rose-600 group-hover:text-white">
              <Target size={28} />
            </div>
            <div>
              <h3
                className={`${sora.className} text-2xl font-bold text-slate-950 mb-3`}
              >
                Our Mission.
              </h3>
              <p
                className={`${ibm.className} text-slate-600 text-base leading-relaxed`}
              >
                To eradicate slow, unoptimised agency templates from the web. We
                engineer bespoke, lightning-fast digital assets that act as
                aggressive revenue engines for ambitious brands willing to
                invest in real quality.
              </p>
            </div>
          </div>

          {/* Vision Card: Purple Theme */}
          <div className="group relative flex flex-col items-start gap-6 rounded-[2rem] border border-slate-200 bg-[#fafafa] p-8 sm:p-10 transition-all duration-500 hover:bg-white hover:shadow-xl hover:border-purple-200">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 transition-colors duration-500 group-hover:bg-purple-600 group-hover:text-white">
              <Eye size={28} />
            </div>
            <div>
              <h3
                className={`${sora.className} text-2xl font-bold text-slate-950 mb-3`}
              >
                Our Vision.
              </h3>
              <p
                className={`${ibm.className} text-slate-600 text-base leading-relaxed`}
              >
                To be the undisputed standard for bespoke software engineering
                and high-ticket web architecture in the UK, setting the
                benchmark for performance, design, and absolute client
                transparency.
              </p>
            </div>
          </div>

          {/* Ethos/Goal Card: Emerald Theme */}
          <div className="group relative flex flex-col items-start gap-6 rounded-[2rem] border border-slate-200 bg-[#fafafa] p-8 sm:p-10 transition-all duration-500 hover:bg-white hover:shadow-xl hover:border-emerald-200">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 transition-colors duration-500 group-hover:bg-emerald-600 group-hover:text-white">
              <HeartHandshake size={28} />
            </div>
            <div>
              <h3
                className={`${sora.className} text-2xl font-bold text-slate-950 mb-3`}
              >
                Our Ethos.
              </h3>
              <p
                className={`${ibm.className} text-slate-600 text-base leading-relaxed`}
              >
                We do not do "retain and drain." We build relationships based on
                100% intellectual property ownership, flawless project
                execution, and measurable ROI. When you win, we win.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
