"use client";

import { Sora, IBM_Plex_Sans } from "next/font/google";
import { Code2, Database, Smartphone, CheckCircle2, Terminal, Zap, Layers } from "lucide-react";
import Link from "next/link";

const sora = Sora({ subsets: ["latin"], weight: ["600", "700"] });
const ibm = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function CoreServices() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 py-32 lg:py-48 selection:bg-purple-500/30 text-white border-t border-white/5">
      
      {/* --- AMBIENT DARK ENVIRONMENT --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep grid layout */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>
        {/* Colored shadows */}
        <div className="absolute top-[10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-purple-900/20 blur-[150px]"></div>
        <div className="absolute bottom-[20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-900/20 blur-[150px]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-24 md:mb-32 max-w-2xl">
          <h2 className={`${sora.className} text-3xl md:text-5xl font-bold tracking-tight text-white mb-6`}>
            The Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400">Trinity.</span>
          </h2>
          <p className={`${ibm.className} text-lg text-slate-400 leading-relaxed`}>
            We do not use drag-and-drop builders. Every digital asset is hand-coded using modern, 
            scalable architectures to ensure maximum speed, bulletproof security, and aggressive conversion rates.
          </p>
        </div>

        {/* --- THE CARDS --- */}
        <div className="flex flex-col gap-24 lg:gap-32">

          {/* 1. BESPOKE WEB ENGINEERING */}
          <div className="group relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Content Left */}
            <div className="w-full lg:w-1/2 flex flex-col items-start space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2">
                <Code2 size={16} className="text-purple-400" />
                <span className={`${ibm.className} text-xs font-bold tracking-wider text-purple-300 uppercase`}>Next.js & Bespoke CMS</span>
              </div>
              
              <h3 className={`${sora.className} text-3xl sm:text-4xl font-bold`}>
                High-Performance Web Assets
              </h3>
              
              <p className={`${ibm.className} text-slate-400 text-lg leading-relaxed`}>
                Your website is your primary revenue engine. We build lightning-fast, highly optimised web applications that score 99+ on Core Web Vitals. We strip away the bloat so your users get exactly what they want, instantly.
              </p>

              {/* The "Engineering Standard" Grid */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-8">
                <div className="flex items-start gap-3">
                  <Terminal size={18} className="text-purple-400 mt-1" />
                  <div>
                    <h4 className={`${ibm.className} font-bold text-slate-200`}>Strict Type Safety</h4>
                    <p className="text-sm text-slate-500 mt-1">100% TypeScript. Zero runtime errors.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap size={18} className="text-amber-400 mt-1" />
                  <div>
                    <h4 className={`${ibm.className} font-bold text-slate-200`}>Edge Rendering</h4>
                    <p className="text-sm text-slate-500 mt-1">Server-side execution for instant loads.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Right: Floating Code Editor (Pure CSS) */}
            <div className="w-full lg:w-1/2 relative h-[400px] perspective-[1000px] flex items-center justify-center">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent blur-2xl rounded-full transition-opacity duration-500 group-hover:opacity-100 opacity-50"></div>
              
              <div className="w-full max-w-md h-80 rounded-2xl border border-slate-700 bg-[#0d1117] shadow-2xl transition-all duration-700 [transform:rotateY(-10deg)_rotateX(5deg)] group-hover:[transform:rotateY(-5deg)_rotateX(2deg)_translateY(-10px)_scale(1.02)] relative z-10 overflow-hidden">
                {/* Editor Header */}
                <div className="flex items-center gap-2 border-b border-slate-800 bg-[#161b22] px-4 py-3 rounded-t-2xl">
                  {/* Added 'items-center' to perfect the vertical alignment of the dots */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="h-3 w-3 rounded-full bg-rose-500/80"></div>
                    <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
                    <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <span className={`${ibm.className} text-[10px] text-slate-500 ml-4 truncate`}>page.tsx — Truedge</span>
                </div>
                {/* Simulated Code Lines */}
                <div className="p-5 font-mono text-sm flex flex-col gap-3 opacity-80">
                  <div className="flex gap-4"><span className="text-slate-600">1</span><span className="text-purple-400">export default function</span> <span className="text-blue-400">PremiumAsset</span>() {'{'}</div>
                  <div className="flex gap-4"><span className="text-slate-600">2</span><span className="ml-4 text-slate-400">return (</span></div>
                  <div className="flex gap-4"><span className="text-slate-600">3</span><span className="ml-8 text-emerald-400">&lt;div className="<span className="text-amber-300">max-w-7xl mx-auto</span>"&gt;</span></div>
                  {/* Animated typing line */}
                  <div className="flex gap-4"><span className="text-slate-600">4</span><span className="ml-12 text-slate-300 flex items-center gap-1">&lt;ConversionEngine /&gt; <span className="h-4 w-2 bg-purple-500 animate-pulse"></span></span></div>
                  <div className="flex gap-4"><span className="text-slate-600">5</span><span className="ml-8 text-emerald-400">&lt;/div&gt;</span></div>
                  <div className="flex gap-4"><span className="text-slate-600">6</span><span className="ml-4 text-slate-400">)</span></div>
                  <div className="flex gap-4"><span className="text-slate-600">7</span><span className="text-slate-400">{'}'}</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. SAAS & CLOUD SOFTWARE (Reversed Layout) */}
          <div className="group relative flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
            
            {/* Content Right */}
            <div className="w-full lg:w-1/2 flex flex-col items-start space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2">
                <Database size={16} className="text-indigo-400" />
                <span className={`${ibm.className} text-xs font-bold tracking-wider text-indigo-300 uppercase`}>Cloud Architecture</span>
              </div>
              
              <h3 className={`${sora.className} text-3xl sm:text-4xl font-bold`}>
                Scalable SaaS Platforms
              </h3>
              
              <p className={`${ibm.className} text-slate-400 text-lg leading-relaxed`}>
                From bespoke B2B2C reseller architectures to multi-tenant HR systems. We engineer the complex logic, secure databases, and custom APIs required to build software that handles thousands of concurrent users flawlessly.
              </p>

              {/* The "Engineering Standard" Grid */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-8">
                <div className="flex items-start gap-3">
                  <Layers size={18} className="text-indigo-400 mt-1" />
                  <div>
                    <h4 className={`${ibm.className} font-bold text-slate-200`}>Multi-Tenant Logic</h4>
                    <p className="text-sm text-slate-500 mt-1">Isolated data schemas for elite security.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-emerald-400 mt-1" />
                  <div>
                    <h4 className={`${ibm.className} font-bold text-slate-200`}>O(1) Optimisation</h4>
                    <p className="text-sm text-slate-500 mt-1">Database queries built to scale infinitely.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Left: Pure CSS Node Graph */}
            <div className="w-full lg:w-1/2 relative h-[400px] flex items-center justify-center">
              <div className="relative w-64 h-64 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                {/* Central Server Node */}
                <div className="relative z-20 h-20 w-20 rounded-2xl border border-indigo-400/50 bg-indigo-900/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.3)]">
                  <Database size={32} className="text-indigo-400 animate-pulse" />
                </div>
                
                {/* Orbiting Nodes (CSS magic) */}
                <div className="absolute inset-0 border border-slate-700 rounded-full animate-[spin_10s_linear_infinite]">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-slate-800 border border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-slate-800 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
                </div>
                <div className="absolute inset-[-2rem] border border-slate-800 rounded-full animate-[spin_15s_linear_infinite_reverse]">
                  <div className="absolute top-1/2 -left-3 -translate-y-1/2 h-6 w-6 rounded-full bg-slate-800 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                </div>
                
                {/* Connecting Laser Lines */}
                <div className="absolute z-0 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent rotate-45"></div>
                <div className="absolute z-0 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent -rotate-45"></div>
              </div>
            </div>
          </div>

          {/* 3. NATIVE MOBILE APPS */}
          <div className="group relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Content Left */}
            <div className="w-full lg:w-1/2 flex flex-col items-start space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
                <Smartphone size={16} className="text-emerald-400" />
                <span className={`${ibm.className} text-xs font-bold tracking-wider text-emerald-300 uppercase`}>Native iOS & Android</span>
              </div>
              
              <h3 className={`${sora.className} text-3xl sm:text-4xl font-bold`}>
                Pocket-Sized Powerhouses
              </h3>
              
              <p className={`${ibm.className} text-slate-400 text-lg leading-relaxed`}>
                We do not build clunky web-wrappers. We engineer true native applications utilizing React Native and Swift to deliver high fps gesture-driven experiences that feel right at home on flagship devices.
              </p>

              {/* The "Engineering Standard" Grid */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-8">
                <div className="flex items-start gap-3">
                  <Smartphone size={18} className="text-emerald-400 mt-1" />
                  <div>
                    <h4 className={`${ibm.className} font-bold text-slate-200`}>Native Threading</h4>
                    <p className="text-sm text-slate-500 mt-1">Direct bridge to device hardware.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap size={18} className="text-rose-400 mt-1" />
                  <div>
                    <h4 className={`${ibm.className} font-bold text-slate-200`}>60fps UI/UX</h4>
                    <p className="text-sm text-slate-500 mt-1">Silky smooth transitions and gestures.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Right: 3D Dark Mode Smartphone */}
            <div className="w-full lg:w-1/2 relative h-[400px] perspective-[1000px] flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent blur-3xl rounded-full transition-opacity duration-500 group-hover:opacity-100 opacity-30"></div>
               
               <div className="relative w-56 h-[400px] rounded-[2.5rem] border-[6px] border-slate-800 bg-slate-950 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-700 ease-out [transform:rotateY(15deg)_rotateX(5deg)] group-hover:[transform:rotateY(5deg)_rotateX(0deg)_translateY(-10px)] overflow-hidden">
                 {/* Dynamic Island */}
                 <div className="absolute top-3 left-1/2 -translate-x-1/2 h-5 w-16 rounded-full bg-black z-20"></div>
                 
                 {/* Inner Dark App UI */}
                 <div className="absolute inset-0 pt-14 p-4 flex flex-col gap-4 bg-[#0a0f18]">
                    {/* Skeleton Header */}
                    <div className="flex justify-between items-center px-1">
                      <div className="h-4 w-20 bg-slate-800 rounded-full"></div>
                      <div className="h-8 w-8 bg-slate-800 rounded-full"></div>
                    </div>
                    {/* Glowing Metric Card */}
                    <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-4 relative overflow-hidden group-hover:border-emerald-500/30 transition-colors duration-500">
                      <div className="absolute -right-4 -bottom-4 h-20 w-20 bg-emerald-500/20 blur-xl rounded-full"></div>
                      <div className="h-3 w-1/3 bg-slate-700 rounded mb-4"></div>
                      <div className="h-8 w-2/3 bg-slate-600 rounded"></div>
                    </div>
                    {/* Skeleton List Items */}
                    <div className="flex flex-col gap-3">
                      <div className="h-16 w-full rounded-xl bg-slate-800/50 border border-slate-800 flex items-center px-4 gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-700"></div>
                        <div className="h-3 w-1/2 bg-slate-700 rounded"></div>
                      </div>
                      <div className="h-16 w-full rounded-xl bg-slate-800/50 border border-slate-800 flex items-center px-4 gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-700"></div>
                        <div className="h-3 w-1/3 bg-slate-700 rounded"></div>
                      </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}