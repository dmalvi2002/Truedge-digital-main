import { Code2, LayoutTemplate, Smartphone } from "lucide-react";
import { Sora, IBM_Plex_Sans } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const ibmPlexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

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
            Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 drop-shadow-sm">Expertise.</span>
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
                <Code2 size={28} className="text-violet-400" />
              </div>
              <h3 className={`${sora.className} mb-4 text-3xl font-bold text-white sm:text-4xl`}>SaaS & Bespoke Web Engineering</h3>
              <p className={`${ibmPlexSans.className} mb-8 text-slate-400 leading-relaxed text-lg`}>
                We abandon slow, bloated templates. We architect custom SaaS platforms, cloud applications, and lightning-fast enterprise websites using Next.js and modern tech stacks.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-xs font-bold tracking-wide text-violet-300 shadow-sm">Next.js & Python</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-bold tracking-wide text-slate-300">Custom Web Apps</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-bold tracking-wide text-slate-300">Cloud Architecture</span>
              </div>
            </div>

            {/* Right Abstract Graphic: Code Terminal Fade */}
            <div className="relative mt-12 h-64 w-full lg:mt-0 lg:w-2/5 lg:shrink-0 perspective-1000">
              <div className="absolute right-0 top-1/2 w-full max-w-[350px] -translate-y-1/2 transform rotate-y-[-15deg] rotate-x-[5deg] rounded-2xl bg-slate-900/80 p-6 border border-white/10 shadow-2xl backdrop-blur-md transition-transform duration-700 group-hover:scale-105 group-hover:rotate-y-[0deg] group-hover:rotate-x-[0deg]">
                <div className="flex gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-3/4 rounded-full bg-violet-500/80"></div>
                  <div className="h-2 w-full rounded-full bg-slate-700"></div>
                  <div className="h-2 w-5/6 rounded-full bg-slate-700"></div>
                  <div className="h-2 w-1/2 rounded-full bg-emerald-500/80"></div>
                </div>
              </div>
            </div>
          </div>

          {/* --- PILLAR 2: UI/UX (Emerald Theme) --- */}
          <div className="group relative flex w-full flex-col overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/10 p-8 sm:p-12 lg:flex-row-reverse lg:items-center lg:justify-between transition-all duration-500 hover:border-emerald-500/40 hover:bg-white/[0.04]">
            
            {/* Right Content (appears on left on mobile, right on desktop due to flex-row-reverse) */}
            <div className="relative z-10 max-w-2xl lg:w-3/5">
              <div className="mb-8 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <LayoutTemplate size={28} className="text-emerald-400" />
              </div>
              <h3 className={`${sora.className} mb-4 text-3xl font-bold text-white sm:text-4xl`}>Conversion-Driven UI/UX</h3>
              <p className={`${ibmPlexSans.className} mb-8 text-slate-400 leading-relaxed text-lg`}>
                Beautiful design is useless if it doesn't sell. We engineer user journeys based on hard data and cognitive psychology to turn your passive traffic into paying clients.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-xs font-bold tracking-wide text-emerald-300 shadow-sm">User Psychology</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-bold tracking-wide text-slate-300">Framer Motion</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-bold tracking-wide text-slate-300">Interactive Prototyping</span>
              </div>
            </div>

            {/* Left Abstract Graphic: Floating UI Wireframes */}
            <div className="relative mt-12 h-64 w-full lg:mt-0 lg:w-2/5 lg:shrink-0">
              <div className="absolute left-0 top-1/2 w-full max-w-[350px] -translate-y-1/2">
                {/* Back Wireframe Box */}
                <div className="absolute -right-4 -top-8 h-32 w-48 rounded-xl bg-slate-800/50 border border-white/5 backdrop-blur-sm transition-transform duration-700 group-hover:translate-x-4 group-hover:-translate-y-4"></div>
                {/* Front Wireframe Box */}
                <div className="relative z-10 flex flex-col gap-3 rounded-2xl bg-slate-900/90 p-5 border border-white/10 shadow-2xl backdrop-blur-md transition-transform duration-700 group-hover:-translate-y-2">
                  <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                    <div className="h-8 w-8 rounded-full bg-emerald-500/20 border border-emerald-500/30"></div>
                    <div className="h-3 w-24 rounded bg-slate-700"></div>
                  </div>
                  <div className="h-20 w-full rounded bg-white/5 border border-white/5"></div>
                </div>
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
              <p className={`${ibmPlexSans.className} mb-8 text-slate-400 leading-relaxed text-lg`}>
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