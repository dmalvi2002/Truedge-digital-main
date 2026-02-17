"use client";

import { Sora, IBM_Plex_Sans } from "next/font/google";
import { ArrowRight, BarChart3, Video, Megaphone } from "lucide-react";
import Link from "next/link";

const sora = Sora({ subsets: ["latin"], weight: ["600", "700"] });
const ibm = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function GrowthBridge() {
  return (
    <section className="relative w-full bg-[#fafafa] py-24 border-y border-slate-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 rounded-3xl bg-white p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100">
          
          {/* Left Side: The Pitch */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
              </span>
              <span className={`${ibm.className} text-[10px] font-bold tracking-widest text-purple-700 uppercase`}>
                Beyond Development
              </span>
            </div>
            
            <h2 className={`${sora.className} text-3xl md:text-4xl font-bold tracking-tight text-slate-950 mb-4`}>
              We built the engine.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Now add the fuel.</span>
            </h2>
            
            <p className={`${ibm.className} text-base text-slate-600 leading-relaxed mb-8 max-w-lg`}>
              A high-value bespoke web app/website is useless if nobody sees it. For our exclusive development partners, we offer an elite suite of growth, SEO, and retention-optimised video services to drive aggressive scaling.
            </p>
            
            {/* DESKTOP LINK: Hidden on mobile, visible on lg screens */}
            <Link
              href="/other-services"
              className="hidden lg:inline-flex group items-center gap-2 font-bold text-purple-600 transition-colors hover:text-purple-700"
            >
              Explore Our Other Services
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right Side: The Visual Grid + Mobile Link Wrapper */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            
            {/* The Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200/60 transition-colors hover:bg-slate-100">
                <BarChart3 className="text-purple-500" size={24} />
                <h3 className={`${ibm.className} font-bold text-slate-900`}>Technical SEO</h3>
                <p className="text-sm text-slate-500">Search dominance engineered into the architecture.</p>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200/60 transition-colors hover:bg-slate-100">
                <Video className="text-indigo-500" size={24} />
                <h3 className={`${ibm.className} font-bold text-slate-900`}>Motion Graphics</h3>
                <p className="text-sm text-slate-500">High-retention, Iman Gadzhi-style video editing.</p>
              </div>
              <div className="sm:col-span-2 flex flex-col gap-3 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200/60 transition-colors hover:bg-slate-100">
                <Megaphone className="text-rose-500" size={24} />
                <h3 className={`${ibm.className} font-bold text-slate-900`}>PPC & Acquisition</h3>
                <p className="text-sm text-slate-500">Data-driven ad campaigns designed for immediate ROI and lead generation.</p>
              </div>
            </div>

            {/* MOBILE LINK: Visible on mobile, hidden on lg screens */}
            <Link
              href="/other-services"
              className="lg:hidden group inline-flex items-center gap-2 font-bold text-purple-600 transition-colors hover:text-purple-700 mt-2"
            >
              Explore Our Other Services
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            
          </div>

        </div>
      </div>
    </section>
  );
}