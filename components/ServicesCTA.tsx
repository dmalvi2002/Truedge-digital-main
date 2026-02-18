"use client";

import { Sora, IBM_Plex_Sans } from "next/font/google";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Cubes from "./Cubes";

const sora = Sora({ subsets: ["latin"], weight: ["700"] });
const ibm = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500"] });

export default function ServicesCTA() {
  return (
    <section className="relative w-full bg-[#fafafa] py-24 sm:py-32 overflow-hidden border-t border-slate-200">
      
      {/* Subtle purple ambient glow anchored behind where the cubes will sit on desktop */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-bl from-purple-400/20 to-transparent blur-[120px] rounded-full pointer-events-none z-0 hidden lg:block"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* The Main Container: Flex column on mobile, Flex row on Desktop */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 rounded-[2.5rem] bg-white p-8 sm:p-12 lg:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.04)] ring-1 ring-slate-200/50">
          
          {/* --- LEFT SIDE: Copy & Button --- */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 ring-1 ring-purple-100/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
              </span>
              <span className={`${ibm.className} text-xs font-bold tracking-widest text-purple-700 uppercase`}>
                Project Discovery
              </span>
            </div>

            <h2 className={`${sora.className} text-4xl sm:text-5xl md:text-6xl font-bold text-slate-950 tracking-tight leading-[1.15] lg:leading-[1.1]`}>
              Ready to build the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">real thing?</span>
            </h2>
            
            <p className={`${ibm.className} mt-6 mb-10 text-lg text-slate-600 max-w-md`}>
              Stop wasting budget on slow templates and bloated agencies. Let's engineer a digital asset your competitors will try to copy.
            </p>
            
            <Link
              href="/contact"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,rgba(139,92,246,1)0%,rgba(109,40,217,1)100%)] px-5 py-3 text-md md:text-lg font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.5),inset_0_2px_2px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(124,58,237,0.7),inset_0_2px_2px_rgba(255,255,255,0.4)] sm:w-auto"
            >
              Start a Project
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* --- RIGHT SIDE: Interactive 3D Cubes --- */}
          {/* hidden on mobile (hidden), flex on desktop (lg:flex) */}
          <div className="hidden lg:flex w-full lg:w-[45%] h-[400px] xl:h-[450px] items-center justify-center cursor-pointer pointer-events-auto">
            <Cubes 
              gridSize={9} // Adjusted to 9x9 so they fit perfectly in the half-screen layout
              maxAngle={35}
              radius={5}
              // Styling them so they pop visually against the solid white card
              faceColor="rgba(255, 31, 31, 0.04)" // Very faint purple faces so they have volume
              borderStyle="2px solid rgba(138, 92, 246, 0.46)" // Crisp purple borders
              rippleColor="rgba(139, 92, 246, 0.4)" 
              rippleSpeed={2}
              autoAnimate={true}
              rippleOnClick={true}
            />
          </div>

        </div>
      </div>
    </section>
  );
}