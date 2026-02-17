"use client";

import { useEffect, useRef, useState } from "react";
import { PhoneCall, Code2, Rocket, CheckCircle2 } from "lucide-react";
import { Sora, IBM_Plex_Sans } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const ibmPlexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  // Scroll listener to animate the vertical line
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const start = windowHeight / 2;
      const totalDistance = rect.height;
      const scrolled = start - rect.top;
      
      let progress = scrolled / totalDistance;
      progress = Math.max(0, Math.min(1, progress));
      
      setLineHeight(progress * 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Storing the icon component directly allows us to use responsive Tailwind classes on them later
  const steps = [
    {
      number: "01",
      icon: PhoneCall,
      title: "Discovery & Strategy",
      description: "We don't guess; we diagnose. We start by stripping your business model down to the studs, identifying your bottlenecks, and mapping out a bespoke architecture designed specifically for your revenue goals.",
      deliverables: ["Technical Audit", "Architecture Blueprint", "Project Roadmap"]
    },
    {
      number: "02",
      icon: Code2,
      title: "Bespoke Engineering",
      description: "No templates. No bloated plugins. Our UK-based team writes clean, scalable Next.js code to build a lightning-fast digital asset that outperforms your competitors and ranks flawlessly on Google.",
      deliverables: ["Next.js Development", "Figma Prototypes", "Headless CMS Setup"]
    },
    {
      number: "03",
      icon: Rocket,
      title: "Launch & Scale",
      description: "We don't just hand over the keys and vanish. We deploy your platform with zero downtime, monitor the initial data, and refine the conversion pathways to ensure maximum ROI from day one.",
      deliverables: ["Zero-Downtime Deployment", "Performance Testing", "30-Day Support"]
    }
  ];

  return (
    <section className="relative w-full bg-white py-16 sm:py-24 md:py-32">
      {/* Architectural Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-80"></div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          
          {/* --- LEFT COLUMN: Sticky Header --- */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 max-w-lg">
              <h2 className={`${sora.className} mb-4 text-3xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:mb-6 lg:text-6xl`}>
                The Truedge <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 drop-shadow-sm">Framework.</span>
              </h2>
              <p className={`${ibmPlexSans.className} mb-8 text-base text-slate-600 sm:text-xl lg:mb-10 leading-relaxed`}>
                A streamlined, transparent engineering process designed to respect your time and deliver a premium digital asset without the usual agency friction.
              </p>
              
              <div className="flex items-center gap-4 rounded-3xl bg-white p-5 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] w-max transition-transform hover:-translate-y-1 md:p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-500 shadow-inner md:h-12 md:w-12">
                  <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <p className="text-xl font-black text-slate-900 leading-none mb-1 md:text-2xl">100%</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 md:text-[10px]">On-Time Delivery</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: The Interactive Timeline Cards --- */}
          <div className="relative lg:col-span-7" ref={containerRef}>
            
            {/* The Background Line (Adjusted for mobile vs desktop) */}
            <div className="absolute left-[27px] top-8 bottom-8 w-1 bg-slate-100 rounded-full md:left-[47px]"></div>
            
            {/* The Animated Glowing Line */}
            <div 
              className="absolute left-[27px] top-8 w-1 bg-gradient-to-b from-violet-600 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-150 ease-out md:left-[47px]"
              style={{ height: `${lineHeight}%` }}
            ></div>

            {/* Timeline Steps */}
            <div className="flex flex-col gap-8 md:gap-12">
              {steps.map((step, index) => {
                const stepPercentage = (index / (steps.length - 1)) * 100;
                const isActive = lineHeight >= stepPercentage - 5;
                const Icon = step.icon;

                return (
                  // Reduced left padding on mobile (pl-16) to give the card more width
                  <div key={index} className="relative pl-16 md:pl-32">
                    
                    {/* The Icon Node (Scaled down on mobile) */}
                    <div className={`absolute left-0 top-6 flex h-14 w-14 items-center justify-center rounded-[1rem] border-[4px] border-white bg-slate-50 transition-all duration-500 z-20 md:top-8 md:left-2 md:h-20 md:w-20 md:rounded-[1.5rem] md:border-[6px] ${isActive ? 'scale-110 shadow-[0_0_20px_rgba(139,92,246,0.3)] md:shadow-[0_0_30px_rgba(139,92,246,0.3)]' : ''}`}>
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-500 md:h-12 md:w-12 md:rounded-xl ${isActive ? 'bg-violet-600 text-white shadow-inner' : 'bg-slate-200 text-slate-400'}`}>
                        <Icon className="h-4 w-4 md:h-6 md:w-6" />
                      </div>
                    </div>

                    {/* --- THE UPGRADED CARD --- */}
                    <div className={`group relative flex flex-col overflow-hidden rounded-[1.5rem] border transition-all duration-1000 md:rounded-[2.5rem] ${isActive ? 'border-violet-200 bg-white shadow-[0_10px_30px_-10px_rgba(139,92,246,0.15)] md:shadow-[0_20px_50px_-15px_rgba(139,92,246,0.15)] opacity-100 translate-y-0' : 'border-slate-200 bg-slate-50/50 opacity-50 translate-y-8'}`}>
                      
                      <div className="absolute inset-0 pointer-events-none rounded-[1.5rem] ring-1 ring-inset ring-white/50 z-20 md:rounded-[2.5rem]"></div>

                      {/* Giant Visible Background Number (Scaled down for mobile) */}
                      <div className={`absolute -right-2 -top-4 z-0 text-[100px] font-black tracking-tighter select-none pointer-events-none transition-colors duration-1000 md:-right-4 md:-top-8 md:text-[160px] ${isActive ? 'text-violet-500/10' : 'text-slate-200/60'}`}>
                        {step.number}
                      </div>

                      {/* Top Zone: Text Content */}
                      <div className="relative z-10 p-6 flex-1 md:p-10">
                        
                        <div className={`mb-4 flex items-center gap-2 transition-opacity duration-1000 md:mb-6 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                          <div className="flex gap-1">
                            <div className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${isActive ? 'bg-violet-600' : 'bg-slate-300'}`}></div>
                            <div className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 delay-100 ${isActive ? 'bg-violet-400' : 'bg-slate-300'}`}></div>
                            <div className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 delay-200 ${isActive ? 'bg-violet-200' : 'bg-slate-300'}`}></div>
                          </div>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 md:text-[10px]">Phase {step.number}</span>
                        </div>

                        <h3 className={`${sora.className} mb-3 text-xl font-bold text-slate-900 md:mb-4 md:text-3xl`}>
                          {step.title}
                        </h3>
                        {/* Reduced text size slightly on mobile for better wrapping */}
                        <p className={`${ibmPlexSans.className} text-base text-slate-600 leading-relaxed max-w-lg relative z-10 md:text-lg`}>
                          {step.description}
                        </p>
                      </div>

                      {/* Bottom Zone: Deliverables Footer */}
                      <div className={`relative z-10 px-6 py-5 border-t transition-colors duration-700 md:px-10 md:py-6 ${isActive ? 'bg-[linear-gradient(180deg,rgba(245,243,255,0.6)_0%,rgba(255,255,255,0)_100%)] border-violet-100' : 'bg-slate-100/50 border-slate-200'}`}>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-3 md:text-[10px] md:mb-4">What you receive:</p>
                        <div className="flex flex-wrap gap-2">
                          {step.deliverables.map((item, i) => (
                            <span key={i} className={`rounded-xl px-3 py-1.5 text-[11px] font-bold tracking-wide transition-all duration-700 md:px-4 md:py-2 md:text-xs ${isActive ? 'bg-white text-slate-700 border border-slate-200 shadow-sm' : 'bg-slate-200/50 text-slate-400 border border-transparent'}`}>
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}