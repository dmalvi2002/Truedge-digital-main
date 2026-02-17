"use client";

import { Sora, IBM_Plex_Sans } from "next/font/google";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const sora = Sora({ subsets: ["latin"], weight: ["700"] });
const ibm = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500"] });

export default function ServicesCTA() {
  return (
    <section className="relative w-full bg-white py-32 text-center overflow-hidden">
      {/* Subtle background glow anchoring the CTA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-purple-400/10 to-transparent blur-3xl rounded-full pointer-events-none"></div>

      <div className="mx-auto max-w-3xl px-6 relative z-10 flex flex-col items-center">
        <h2 className={`${sora.className} text-3xl sm:text-4xl md:text-5xl font-bold text-slate-950 tracking-tight leading-[1.1]`}>
          Ready to build the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">real thing?</span>
        </h2>
        
        <p className={`${ibm.className} mt-6 mb-10 lg:mb-20 text-lg text-slate-600 max-w-xl mx-auto`}>
          Stop wasting budget on slow templates and bloated agencies. Let's engineer a digital asset your competitors will try to copy.
        </p>
        
        {/* Your exact provided high-ticket button */}
        <Link
          href="/contact"
          className="group flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,rgba(139,92,246,1)0%,rgba(109,40,217,1)100%)] px-5 py-3 md:px-10 md:py-5 text-lg font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.5),inset_0_2px_2px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(124,58,237,0.7),inset_0_2px_2px_rgba(255,255,255,0.4)] sm:w-auto"
        >
          Start a Project
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}