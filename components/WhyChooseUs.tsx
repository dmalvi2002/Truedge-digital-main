"use client";

import { Sora, IBM_Plex_Sans } from "next/font/google";
import { ShieldCheck, Zap, Code2, Users } from "lucide-react";

// Font Configuration
const sora = Sora({ subsets: ["latin"], weight: ["600", "700"] });
const ibm = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function TruedgeStandard() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-24 lg:py-32 border-t border-slate-100">
      
      {/* Subtle Light Theme Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-gradient-to-b from-purple-500/5 via-indigo-500/5 to-transparent blur-3xl pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 shadow-sm">
            <span className={`${ibm.className} text-xs font-bold tracking-widest text-purple-700 uppercase`}>
              Our Ethos
            </span>
          </div>
          
          <h2 className={`${sora.className} text-3xl md:text-5xl font-bold tracking-tight text-slate-950 mb-6`}>
            The Truedge <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Standard.</span>
          </h2>
          
          <p className={`${ibm.className} mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed`}>
            We partner with ambitious brands to build high-performance digital assets. No shortcuts, no outsourced development—just bespoke software architecture designed to dominate your market.
          </p>
        </div>

        {/* The Bento Box Grid (2x2 Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Card 1: Bespoke Architecture */}
          <div className="group relative flex flex-col items-start gap-6 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-[100px] transition-all duration-500 group-hover:bg-purple-100/50"></div>
            
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 transition-colors duration-500 group-hover:bg-purple-600 group-hover:text-white">
              <Code2 size={28} />
            </div>
            
            <div className="relative z-10">
              <h3 className={`${sora.className} text-2xl font-bold text-slate-950 mb-3`}>Bespoke by Design.</h3>
              <p className={`${ibm.className} text-slate-600 text-base leading-relaxed`}>
                Every line of code, complex animation, and backend system is custom-engineered. We build tailored digital assets structured precisely around your business logic, ensuring a perfect fit rather than forcing you into a pre-packaged template.
              </p>
            </div>
          </div>

          {/* Card 2: Performance */}
          <div className="group relative flex flex-col items-start gap-6 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] transition-all duration-500 group-hover:bg-indigo-100/50"></div>
            
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 transition-colors duration-500 group-hover:bg-indigo-600 group-hover:text-white">
              <Zap size={28} />
            </div>
            
            <div className="relative z-10">
              <h3 className={`${sora.className} text-2xl font-bold text-slate-950 mb-3`}>Relentless Optimisation.</h3>
              <p className={`${ibm.className} text-slate-600 text-base leading-relaxed`}>
                A beautiful interface is meaningless if it is slow. We build for absolute speed, targeting 99+ Core Web Vitals. By utilising server-side rendering and edge caching, we ensure your users experience instant, frictionless load times.
              </p>
            </div>
          </div>

          {/* Card 3: Elite Partnership */}
          <div className="group relative flex flex-col items-start gap-6 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
             <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-50 rounded-tl-[100px] transition-all duration-500 group-hover:bg-blue-100/50"></div>
            
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 transition-colors duration-500 group-hover:bg-blue-600 group-hover:text-white">
              <Users size={28} />
            </div>
            
            <div className="relative z-10">
              <h3 className={`${sora.className} text-2xl font-bold text-slate-950 mb-3`}>Senior Architects Only.</h3>
              <p className={`${ibm.className} text-slate-600 text-base leading-relaxed`}>
                Your project is never handed off to a junior developer learning on the job. From the initial discovery call to final deployment, you collaborate directly with the senior software engineers who are actively building your asset.
              </p>
            </div>
          </div>

          {/* Card 4: Scalable Architecture */}
          <div className="group relative flex flex-col items-start gap-6 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-50 rounded-tl-[100px] transition-all duration-500 group-hover:bg-emerald-100/50"></div>
            
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 transition-colors duration-500 group-hover:bg-emerald-600 group-hover:text-white">
              <ShieldCheck size={28} />
            </div>
            
            <div className="relative z-10">
              <h3 className={`${sora.className} text-2xl font-bold text-slate-950 mb-3`}>Enterprise-Grade Scalability.</h3>
              <p className={`${ibm.className} text-slate-600 text-base leading-relaxed`}>
                We build robust foundations that grow with your business. Whether we are implementing complex multi-tenant SaaS logic or high-traffic web applications, our codebases are built to securely handle enterprise-level demands.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}