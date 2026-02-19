"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TrendingUp, Globe, Code2, Zap, Terminal } from "lucide-react";

const WorksHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Logic fix: Scoped properly instead of using document.querySelector
      const title = gsap.utils.toArray(".hero-title")[0] as HTMLElement;
      const elements = gsap.utils.toArray(".floating-element");

      // ---------------------------------------------------------
      // DESKTOP & TABLET ANIMATIONS
      // ---------------------------------------------------------
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        tl.fromTo(
          title,
          { scale: 0.9, opacity: 0, filter: "blur(10px)" },
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 2 },
        ).fromTo(
          elements,
          { y: 100, opacity: 0, scale: 0.85, rotateX: 15 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 1.8,
            stagger: 0.1,
            ease: "back.out(1.2)",
          },
          "-=1.5",
        );

        // Continuous Float (Using yPercent so it never conflicts with mouse 'y')
        elements.forEach((el: any, i) => {
          gsap.to(el, {
            yPercent: i % 2 === 0 ? 4 : -4,
            rotateZ: i % 2 === 0 ? 1 : -1,
            duration: 4 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });

        // Logic fix: Use gsap.quickTo for high-performance, conflict-free mouse tracking
        const xTos = elements.map((el: any) =>
          gsap.quickTo(el, "x", { duration: 1.5, ease: "power2.out" }),
        );
        const yTos = elements.map((el: any) =>
          gsap.quickTo(el, "y", { duration: 1.5, ease: "power2.out" }),
        );
        const rotXTos = elements.map((el: any) =>
          gsap.quickTo(el, "rotateX", { duration: 1.5, ease: "power2.out" }),
        );
        const rotYTos = elements.map((el: any) =>
          gsap.quickTo(el, "rotateY", { duration: 1.5, ease: "power2.out" }),
        );

        const titleXTo = gsap.quickTo(title, "x", {
          duration: 1.5,
          ease: "power2.out",
        });
        const titleYTo = gsap.quickTo(title, "y", {
          duration: 1.5,
          ease: "power2.out",
        });

        // Mouse Parallax & Prismatic Tilt
        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const xPos = clientX / window.innerWidth - 0.5;
          const yPos = clientY / window.innerHeight - 0.5;

          titleXTo(xPos * 30);
          titleYTo(yPos * 30);

          elements.forEach((el: any, i) => {
            const speed = parseFloat(el.dataset.speed || "20");

            // Send new coordinates directly to the quickTo functions
            xTos[i](xPos * speed);
            yTos[i](yPos * speed);
            rotXTos[i](-yPos * 10);
            rotYTos[i](xPos * 10);

            // boxShadow remains a standard tween because it's a complex string
            const shadowX = xPos * -30;
            const shadowY = yPos * -30;
            const prismaticShadow = `
              ${shadowX}px ${shadowY}px 40px rgba(124, 58, 237, 0.08),
              ${shadowX * 1.5}px ${shadowY * 1.5}px 25px rgba(0, 255, 255, 0.04),
              ${shadowX * 0.5}px ${shadowY * 0.5}px 25px rgba(255, 0, 128, 0.04)
            `;

            gsap.to(el, {
              boxShadow: prismaticShadow,
              duration: 1.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          });
        };

        // Smooth return to origin when mouse leaves the section
        const handleMouseLeave = () => {
          titleXTo(0);
          titleYTo(0);

          elements.forEach((el: any, i) => {
            xTos[i](0);
            yTos[i](0);
            rotXTos[i](0);
            rotYTos[i](0);

            // Match the 3-layer structure perfectly to fade opacity to 0
            const transparentShadow = `
              0px 0px 40px rgba(124, 58, 237, 0),
              0px 0px 25px rgba(0, 255, 255, 0),
              0px 0px 25px rgba(255, 0, 128, 0)
            `;

            gsap.to(el, {
              boxShadow: transparentShadow,
              duration: 1.5,
              ease: "power2.out",
              overwrite: "auto",
              onComplete: () => {
                // Remove inline shadow to let Tailwind shadows show again
                gsap.set(el, { clearProps: "boxShadow" });
              },
            });
          });
        };

        // Attach listeners specifically to the section, not the whole window
        const heroSection = containerRef.current;
        if (heroSection) {
          heroSection.addEventListener("mousemove", handleMouseMove);
          heroSection.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
          if (heroSection) {
            heroSection.removeEventListener("mousemove", handleMouseMove);
            heroSection.removeEventListener("mouseleave", handleMouseLeave);
          }
        };
      });

      // ---------------------------------------------------------
      // MOBILE ANIMATIONS
      // ---------------------------------------------------------
      mm.add("(max-width: 767px)", () => {
        gsap.to(".floating-element", {
          y: "+=10",
          duration: 3,
          stagger: 0.15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      return () => mm.revert();
    },
    // Logic fix: The empty dependency array ensures this only initialises once
    { scope: containerRef, dependencies: [] },
  );

  return (
    <div>
      <section
        ref={containerRef}
        className="relative w-full min-h-[100svh] bg-[#FDFDFD] overflow-hidden flex flex-col items-center justify-center px-6 py-12 md:hidden"
      >
        {/* Background Grid & Soft Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150vw] h-[30vh] bg-purple-200/40 blur-[100px] rounded-[100%] pointer-events-none -z-10"></div>

        {/* Header Area */}
        <div className="text-center z-10 mb-8 mt-6">
          <h1 className="font-sora font-black text-6xl tracking-tighter text-slate-900 uppercase mb-3">
            Showcase
          </h1>
          <div className="flex items-center justify-center gap-4 opacity-80">
            <div className="w-8 h-[2px] bg-slate-300"></div>
            <p className="font-mono text-xs tracking-[0.3em] text-slate-500 uppercase font-bold">
              Engineering Artefacts
            </p>
            <div className="w-8 h-[2px] bg-slate-300"></div>
          </div>
        </div>

        {/* Central Visual: Mobile Phone */}
        {/* Central Visual: Mobile Phone */}
        {/* The wrapper handles the GSAP float so it doesn't break the 3D tilt below */}
        <div className="mobile-float z-20 relative mb-16 mt-4">
          {/* The actual phone with 3D perspective, tilt (X & Y), and rotation (Z) */}
          <div className="w-[180px] h-[380px] bg-slate-950 rounded-[2.5rem] border-[8px] border-slate-800 p-2 relative [transform:perspective(1200px)_rotateX(15deg)_rotateY(-15deg)_rotateZ(-6deg)] shadow-[-20px_30px_50px_rgba(0,0,0,0.3)]">
            {/* Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[35%] h-4 bg-black rounded-full z-10"></div>

            {/* Screen */}
            <div className="w-full h-full bg-[linear-gradient(180deg,#0f172a_0%,#000000_100%)] rounded-[1.8rem] p-4 pt-14 flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute top-[-10%] left-[-20%] w-[120px] h-[120px] bg-purple-600/40 blur-[40px] rounded-full"></div>

              <div className="w-[85%] h-3 bg-slate-800 rounded-full"></div>
              <div className="w-[60%] h-3 bg-slate-800 rounded-full"></div>

              <div className="w-full flex-1 bg-slate-900/60 rounded-xl border border-slate-800 mt-2 flex flex-col items-center justify-center p-2 relative">
                {/* Code Style Text Above Ball */}
                <div className="font-mono text-[10px] text-center w-full z-10 mb-10 leading-relaxed">
                  <span className="text-purple-400">{">"}</span>{" "}
                  <span className="text-emerald-400">build apps</span>
                  <br />
                  <span className="text-emerald-400">{"&"} websites!</span>
                  <br />
                  <span className="text-slate-500 mt-1 block">
                    {"//"} stress free,
                    <br />
                    {"//"} hassle free
                  </span>
                </div>

                {/* CSS Bounce added here! */}
                <div className="animate-bounce w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-[0_0_20px_rgba(139,92,246,0.5)] z-10"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats - Organised in a neat 2x2 grid for small screens */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-[360px] z-20">
          {/* Stat 1 */}
          <div className="mobile-float bg-white/90 backdrop-blur-xl border border-slate-100 shadow-lg rounded-2xl p-4 flex flex-col items-center text-center gap-2">
            <div className="bg-purple-50 text-purple-600 p-2 rounded-full">
              <TrendingUp size={18} strokeWidth={2} />
            </div>
            <div>
              <span className="block font-sora font-bold text-lg text-slate-900">
                98-100
              </span>
              <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                Lighthouse
              </span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="mobile-float bg-white/90 backdrop-blur-xl border border-slate-100 shadow-lg rounded-2xl p-4 flex flex-col items-center text-center gap-2">
            <div className="bg-purple-50 text-purple-600 p-2 rounded-full">
              <Zap size={18} strokeWidth={2} />
            </div>
            <div>
              <span className="block font-sora font-bold text-lg text-slate-900">
                {"< 1.3s"}
              </span>
              <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                Avg. Load
              </span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="mobile-float bg-white/90 backdrop-blur-xl border border-slate-100 shadow-lg rounded-2xl p-4 flex flex-col items-center text-center gap-2">
            <div className="bg-purple-50 text-purple-600 p-2 rounded-full">
              <Code2 size={18} strokeWidth={2} />
            </div>
            <div>
              <span className="block font-sora font-bold text-lg text-slate-900">
                100%
              </span>
              <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                Clean Code
              </span>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="mobile-float bg-white/90 backdrop-blur-xl border border-slate-100 shadow-lg rounded-2xl p-4 flex flex-col items-center text-center gap-2">
            <div className="bg-purple-50 text-purple-600 p-2 rounded-full">
              <Globe size={18} strokeWidth={2} />
            </div>
            <div>
              <span className="block font-sora font-bold text-lg text-slate-900">
                20+
              </span>
              <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                Partners
              </span>
            </div>
          </div>
        </div>
      </section>
      <section
        ref={containerRef}
        className="relative w-full h-[100svh] bg-[#FDFDFD] overflow-hidden hidden md:flex items-center justify-center perspective-[1500px]"
      >
        {/* -------------------------------------------------------
          MODERN BACKGROUND (Grid + Ambient Light Strips)
      ------------------------------------------------------- */}
        {/* Subtle Engineering Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-20"></div>

        {/* Top Ambient Glow (Flat & Wide) */}
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[120vw] h-[40vh] bg-purple-200/40 blur-[120px] rounded-[100%] pointer-events-none -z-10"></div>

        {/* Bottom Right Ambient Glow (Flat & Wide) */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[40vh] bg-indigo-200/30 blur-[120px] rounded-[100%] pointer-events-none -z-10"></div>

        {/* -------------------------------------------------------
          THE CENTERPIECE: MASSIVE TYPOGRAPHY
      ------------------------------------------------------- */}
        <div className="hero-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none w-full text-center flex flex-col items-center justify-center">
          <h1 className="font-sora font-black text-[18vw] md:text-[16vw] leading-[0.85] tracking-tighter text-slate-200/80 mix-blend-multiply uppercase">
            Showcase
          </h1>
          <div className="flex items-center gap-4 mt-4 md:mt-8 opacity-60">
            <div className="hidden md:block w-12 h-[2px] bg-slate-200"></div>
            <p className="font-mono text-xs md:text-sm tracking-[0.4em] text-slate-400 uppercase font-bold">
              Engineering Artifacts
            </p>
            <div className="hidden md:block w-12 h-[2px] bg-slate-200"></div>
          </div>
        </div>

        <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto">
          {/* -------------------------------------------------------
            MAIN DEVICES
        ------------------------------------------------------- */}

          {/* DEVICE 1: Premium Mac Window */}
          <div
            className="floating-element absolute top-[15%] right-[5%] md:top-[45%] md:-translate-y-1/2 md:right-[5%] w-[75vw] md:w-[460px] aspect-[16/10] bg-white/80 backdrop-blur-2xl border border-white rounded-[1.5rem] p-4 md:p-5 shadow-[0_30px_60px_rgba(0,0,0,0.08)] rotate-[3deg] flex flex-col z-20"
            data-speed="-25"
          >
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
              <div className="flex gap-2">
                <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
              </div>
              <div className="flex-1 h-7 bg-slate-50/80 rounded-md border border-slate-200/60 flex items-center justify-center px-3 mx-4">
                <span className="font-mono text-[10px] md:text-xs text-slate-400">
                  truedge.digital/architecture
                </span>
              </div>
            </div>
            <div className="flex flex-1 gap-4">
              <div className="hidden md:flex w-1/4 h-full bg-slate-50 rounded-xl flex-col gap-3 p-3 border border-slate-100/50">
                <div className="w-full h-4 bg-slate-200/50 rounded-md mb-2"></div>
                <div className="w-3/4 h-3 bg-slate-200/50 rounded-md"></div>
                <div className="w-4/5 h-3 bg-slate-200/50 rounded-md"></div>
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <div className="w-full h-24 md:h-28 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-100 flex items-center justify-center relative overflow-hidden group">
                  <span className="font-mono text-[10px] md:text-xs text-purple-600/70 font-bold tracking-widest">
                    SERVER_COMPONENTS_ACTIVE
                  </span>
                </div>
                <div className="flex gap-3 h-full">
                  <div className="w-1/2 h-full bg-slate-50 rounded-xl border border-slate-100"></div>
                  <div className="w-1/2 h-full bg-slate-50 rounded-xl border border-slate-100 flex flex-col p-3 gap-2">
                    <div className="w-full h-2 bg-slate-200 rounded-full"></div>
                    <div className="w-2/3 h-2 bg-slate-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DEVICE 2: Abstract iPhone */}
          <div
            className="floating-element absolute bottom-[15%] left-[5%] md:top-[60%] md:-translate-y-1/2 md:left-[8%] w-[130px] md:w-[200px] h-[260px] md:h-[420px] bg-slate-950 rounded-[2rem] md:rounded-[2.5rem] border-[6px] md:border-[8px] border-slate-800 shadow-[0_40px_80px_rgba(0,0,0,0.2)] p-2 rotate-[-5deg] z-30 overflow-hidden relative"
            data-speed="35"
          >
            <div className="absolute top-3 md:top-4 left-1/2 -translate-x-1/2 w-[35%] h-4 md:h-5 bg-black rounded-full z-10"></div>
            <div className="w-full h-full bg-[linear-gradient(180deg,#0f172a_0%,#000000_100%)] rounded-[1.5rem] md:rounded-[1.8rem] p-4 pt-12 md:pt-14 flex flex-col gap-4 relative">
              <div className="absolute top-[-10%] left-[-20%] w-[120px] h-[120px] bg-purple-600/30 blur-[40px] rounded-full"></div>
              <div className="w-[85%] h-2.5 bg-slate-800 rounded-full"></div>
              <div className="w-[60%] h-2.5 bg-slate-800 rounded-full"></div>
              <div className="w-full flex-1 bg-slate-900/60 rounded-xl border border-slate-800 mt-2 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-[0_0_20px_rgba(139,92,246,0.4)]"></div>
              </div>
            </div>
          </div>

          {/* DEVICE 3: Floating Terminal */}
          <div
            className="floating-element absolute top-[3%] left-[8%] md:top-[11%] md:left-[12%] w-[200px] md:w-[280px] h-[120px] md:h-[160px] bg-slate-900/95 backdrop-blur-xl rounded-xl border border-slate-700 shadow-[0_20px_40px_rgba(0,0,0,0.2)] p-4 rotate-[4deg] z-10"
            data-speed="-40"
          >
            <div className="flex items-center gap-2 mb-3">
              <Terminal size={14} className="text-slate-400" />
              <span className="font-mono text-[10px] md:text-xs text-slate-500">
                root@truedge:~
              </span>
            </div>
            <div className="font-mono text-[10px] md:text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <p>{">"} npm run build</p>
              <p>{">"} compiling assets</p>
              <p className="text-purple-400">{">"} deployed in 0.8s ⚡</p>
            </div>
          </div>

          {/* Stat 1: Performance */}
          <div className="absolute top-[35%] right-[10%] md:top-[22%] md:right-[23%] z-40">
            <div
              className="floating-element rounded-full w-max"
              data-speed="45"
            >
              <div className="flex items-center gap-3 bg-white/90 backdrop-blur-xl border border-white shadow-xl rounded-full py-2.5 px-5 w-max hover:scale-110 transition-transform duration-300 ease-out cursor-default">
                <div className="bg-purple-50 text-purple-600 p-2 rounded-full shrink-0">
                  <TrendingUp size={16} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="font-sora font-bold text-lg text-slate-900 leading-none">
                    98-100
                  </span>
                  <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mt-1">
                    Lighthouse
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stat 2: Load Time */}
          <div className="absolute bottom-[40%] left-[5%] md:bottom-[20%] md:left-[25%] z-40">
            <div
              className="floating-element rounded-full w-max"
              data-speed="-35"
            >
              <div className="flex items-center gap-3 bg-white/90 backdrop-blur-xl border border-white shadow-xl rounded-full py-2.5 px-5 w-max hover:scale-110 transition-transform duration-300 ease-out cursor-default">
                <div className="bg-purple-50 text-purple-600 p-2 rounded-full shrink-0">
                  <Zap size={16} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="font-sora font-bold text-lg text-slate-900 leading-none">
                    {"< 1.3s"}
                  </span>
                  <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mt-1">
                    Avg. Load
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stat 3: Code Quality */}
          <div className="absolute top-[25%] left-[50%] md:top-[12%] md:left-[45%] -translate-x-1/2 md:-translate-x-0 z-40">
            <div
              className="floating-element rounded-full w-max"
              data-speed="50"
            >
              <div className="flex items-center gap-3 bg-white/90 backdrop-blur-xl border border-white shadow-xl rounded-full py-2.5 px-5 w-max hover:scale-110 transition-transform duration-300 ease-out cursor-default">
                <div className="bg-purple-50 text-purple-600 p-2 rounded-full shrink-0">
                  <Code2 size={16} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="font-sora font-bold text-lg text-slate-900 leading-none">
                    100%
                  </span>
                  <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mt-1">
                    Clean Code
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stat 4: Global Clients */}
          <div className="absolute bottom-[15%] right-[20%] md:bottom-[25%] md:right-[35%] z-40">
            <div
              className="floating-element rounded-full w-max"
              data-speed="-55"
            >
              <div className="flex items-center gap-3 bg-white/90 backdrop-blur-xl border border-white shadow-xl rounded-full py-2.5 px-5 w-max hover:scale-110 transition-transform duration-300 ease-out cursor-default">
                <div className="bg-purple-50 text-purple-600 p-2 rounded-full shrink-0">
                  <Globe size={16} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="font-sora font-bold text-lg text-slate-900 leading-none">
                    20+
                  </span>
                  <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mt-1">
                    Partners
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorksHero;
