"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Code2, Smartphone, Bot, Fingerprint, Layers, Pause, Play } from "lucide-react";
import { Sora } from "next/font/google";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const sora = Sora({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

gsap.registerPlugin(useGSAP);

interface SlideData {
  id: string;
  tag: string;
  titleLight: string;
  titleBold: string;
  description: string;
  icons: React.ReactNode[];
  imageType: "single" | "double";
  image?: string;
  images?: [string, string];
}

const slides: SlideData[] = [
  {
    id: "01",
    tag: "AI Architecture",
    titleLight: "Intelligent AI",
    titleBold: "Automation.",
    description: "From AI-powered smart software and autonomous agentic solutions to smart kiosk hardware installations — we engineer intelligent systems that scale your operations infinitely.",
    icons: [<Bot key="1" size={20} />, <Sparkles key="2" size={20} />, <Fingerprint key="3" size={20} />],
    imageType: "single",
    image: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1776742034/slider-1_kfz1u2.webp",
  },
  {
    id: "02",
    tag: "Web Engineering",
    titleLight: "Bespoke Web",
    titleBold: "Development.",
    description: "Bespoke SaaS platforms and conversion-engineered sites built on Next.js. Flawless performance meets breathtaking design.",
    icons: [<Code2 key="1" size={20} />, <Layers key="2" size={20} />],
    imageType: "single",
    image: "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1776742034/slider-2_hk8lp2.webp",
  },
  {
    id: "03",
    tag: "Experience Design",
    titleLight: "UI/UX & Mobile",
    titleBold: "Applications.",
    description: "Immersive mobile experiences and frictionless interfaces. We shape user journeys that captivate your audience and drive immense value.",
    icons: [<Smartphone key="1" size={20} />, <Sparkles key="2" size={20} />],
    imageType: "double",
    images: [
      "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1776742034/slider-3a_lrzozi.webp",
      "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1776742034/slider-3b_pkxhdn.webp"
    ],
  },
];

export default function MainHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const progressTweenRef = useRef<gsap.core.Tween | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Refs to avoid stale closures inside GSAP onComplete callbacks
  const indexRef = useRef(0);
  const animatingRef = useRef(false);
  const isPlayingRef = useRef(true);

  const slideDuration = 6.5;

  const { contextSafe } = useGSAP({ scope: containerRef });

  const activeSlide = slides[activeIndex];

  useGSAP(() => {
    gsap.to(auroraRef.current, {
      rotate: 360,
      scale: 1.1,
      duration: 30,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: containerRef });

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      progressTweenRef.current?.pause();
    } else {
      setIsPlaying(true);
      isPlayingRef.current = true;
      progressTweenRef.current?.play();
    }
  };

  const animateSlideChange = contextSafe((nextIndex: number) => {
    // Check refs to bypass React's stale closure loop bug explicitly
    if (animatingRef.current || nextIndex === indexRef.current) return;
    
    setIsAnimating(true);
    animatingRef.current = true;

    const isMobile = window.innerWidth < 1024;

    gsap.to(".stagger-text", {
      y: isMobile ? -10 : -30,
      opacity: 0,
      duration: isMobile ? 0.3 : 0.4,
      stagger: isMobile ? 0 : 0.05,
      ease: "power2.in"
    });

    gsap.to(".glass-card-img", {
       scale: isMobile ? 1 : 0.9,
       opacity: 0,
       rotateY: isMobile ? 0 : 15,
       duration: isMobile ? 0.3 : 0.4,
       ease: "power2.in"
    });

    gsap.killTweensOf(".active-progress");
    gsap.set(".active-progress", { width: "0%" });
    if (progressTweenRef.current) progressTweenRef.current.kill();

    setTimeout(() => {
       setActiveIndex(nextIndex);
       indexRef.current = nextIndex; // imperative update
       
       gsap.fromTo(".stagger-text", 
         { y: isMobile ? 10 : 30, opacity: 0 },
         { y: 0, opacity: 1, duration: isMobile ? 0.5 : 0.8, stagger: isMobile ? 0 : 0.1, ease: isMobile ? "power2.out" : "back.out(1.2)" }
       );

       gsap.fromTo(".glass-card-img",
         { scale: isMobile ? 1 : 1.1, opacity: 0, rotateY: isMobile ? 0 : -15 },
         { scale: 1, opacity: 1, rotateY: 0, duration: isMobile ? 0.5 : 1, ease: isMobile ? "power2.out" : "expo.out" }
       );

       // Attach the progress tween
       progressTweenRef.current = gsap.to(`.progress-bar-${nextIndex}`, {
          width: "100%",
          duration: slideDuration,
          ease: "none",
          onComplete: () => {
             // Since indexRef guarantees fresh knowledge, this will now continuously loop seamlessly 0->1->2->0
             animateSlideChange((nextIndex + 1) % slides.length);
          }
       });

       // If paused globally, ensure the new tween is paused too
       if (!isPlayingRef.current) {
         progressTweenRef.current.pause();
       }

       setTimeout(() => {
           setIsAnimating(false);
           animatingRef.current = false;
       }, isMobile ? 500 : 800);
    }, isMobile ? 350 : 450);
  });

  useGSAP(() => {
     const isMobile = window.innerWidth < 1024;
     gsap.fromTo(".stagger-text", 
       { y: isMobile ? 10 : 30, opacity: 0 },
       { y: 0, opacity: 1, duration: isMobile ? 0.6 : 1, stagger: isMobile ? 0 : 0.1, ease: "power3.out", delay: 0.2 }
     );
     gsap.fromTo(".glass-card-img",
       { scale: isMobile ? 1 : 1.05, opacity: 0 },
       { scale: 1, opacity: 1, duration: isMobile ? 0.6 : 1.5, ease: "power3.out" }
     );
     
     if (progressTweenRef.current) progressTweenRef.current.kill();
     progressTweenRef.current = gsap.to(`.progress-bar-0`, {
        width: "100%",
        duration: slideDuration,
        ease: "none",
        delay: 0.5,
        onComplete: () => {
            animateSlideChange(1);
        }
     });

     if (!isPlayingRef.current) {
       progressTweenRef.current.pause();
     }
  }, { scope: containerRef });

  // Kill the progress tween on unmount to prevent ghost tweens after navigation
  useEffect(() => {
    return () => {
      progressTweenRef.current?.kill();
      progressTweenRef.current = null;
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative flex min-h-[calc(100vh-5rem)] pt-6 pb-12 md:py-32 w-full items-center overflow-hidden bg-slate-950 ${sora.className}`}>
      
      {/* Background Ambient Layers (Brand Colors) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
         <div className="absolute inset-0 bg-slate-950"></div>
         
         <div 
           ref={auroraRef}
           className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen opacity-40 blur-[90px] md:blur-[120px] pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(109,40,217,0.2) 50%, transparent 70%)" }}
         ></div>
         <div 
           className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen opacity-20 blur-[80px] md:blur-[100px] pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(56,189,248,0.3) 0%, rgba(139,92,246,0.2) 50%, transparent 70%)" }}
         ></div>
         <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dvvcwzp4n/image/upload/v1700000000/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex flex-col lg:flex-row items-center justify-between gap-y-6 lg:gap-12">
            
            <div className="contents lg:flex lg:flex-col lg:w-[45%] lg:justify-center">
               
               <div className="order-1 lg:order-none w-full flex flex-col items-start md:items-center lg:items-start text-left md:text-center lg:text-left mt-4 lg:mt-0 min-h-[15.5rem] sm:min-h-[16.5rem] md:min-h-0">
                  <div className="stagger-text inline-flex mb-4 md:mb-6">
                     <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 md:px-4 text-[10px] md:text-xs font-semibold tracking-wide text-violet-300 backdrop-blur-sm">
                        {activeSlide.tag}
                     </span>
                  </div>

                  <h1 className="text-4xl md:text-6xl leading-[1.1] md:leading-[1.1] tracking-tight text-white mb-4 md:mb-6 pr-0 lg:pr-4">
                     <div className="stagger-text font-light text-slate-300">{activeSlide.titleLight}</div>
                     <div className="stagger-text font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-400">
                        {activeSlide.titleBold}
                     </div>
                  </h1>

                  <p className="stagger-text max-w-xl text-sm md:text-lg text-slate-400 leading-relaxed mb-4 lg:mb-0 lg:pr-4">
                     {activeSlide.description}
                  </p>
               </div>

               <div className="order-3 lg:order-none w-full flex flex-col items-start md:items-center lg:items-start justify-start mt-6 lg:mt-10">
                  <div className="stagger-text flex flex-col sm:flex-row items-center sm:items-start md:justify-center lg:justify-start gap-4 w-full sm:w-auto">
                     <Link
                        href="/contact"
                        className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,rgba(139,92,246,1)0%,rgba(109,40,217,1)100%)] px-6 py-3.5 md:px-8 md:py-4 text-sm md:text-base font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]"
                     >
                        Start Your Project
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                     </Link>
                     <Link
                        href="/projects"
                        className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 px-6 py-3.5 md:px-8 md:py-4 text-sm md:text-base font-medium text-slate-300 backdrop-blur-md transition-all duration-300 hover:bg-slate-800 hover:text-white"
                     >
                        View Capabilities
                     </Link>
                  </div>

                  <div className="mt-8 md:mt-12 flex items-center justify-start md:justify-center lg:justify-start gap-3 w-full">
                     {slides.map((_, idx) => (
                        <button
                           key={idx}
                           disabled={!isPlaying}
                           onClick={() => animateSlideChange(idx)}
                           className={`group relative h-1.5 md:h-2 flex-1 max-w-[4rem] rounded-full overflow-hidden transition-all duration-300 ${
                              !isPlaying ? "bg-slate-800/40 cursor-not-allowed opacity-50" : "bg-slate-800 cursor-pointer"
                           }`}
                        >
                           <div 
                              className={`active-progress progress-bar-${idx} absolute top-0 left-0 h-full bg-violet-500 w-0`}
                           ></div>
                        </button>
                     ))}
                     
                     {/* Play / Pause Toggle Button */}
                     <button 
                        onClick={togglePlay}
                        className="ml-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors backdrop-blur-md shadow-sm shrink-0"
                        title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
                     >
                        {isPlaying ? (
                           <Pause size={14} fill="currentColor" />
                        ) : (
                           <Play size={14} className="ml-0.5" fill="currentColor" />
                        )}
                     </button>
                  </div>
               </div>

            </div>

            {/* IMAGE TILE (Right Desktop Container) */}
            <div className="order-2 lg:order-none w-full lg:w-[55%] relative perspective-1000 pl-0 lg:pl-6 self-center mt-2 lg:mt-0">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-violet-600/20 blur-[60px] md:blur-[80px] rounded-full z-0 pointer-events-none"></div>
               
               {activeSlide.imageType === "single" && activeSlide.image ? (
                  <div className="glass-card-img relative w-full aspect-square md:aspect-[4/5] lg:aspect-auto lg:h-[550px] mx-auto md:max-w-md lg:max-w-none rounded-[1.5rem] md:rounded-[2rem] border border-white/10 bg-slate-900/40 p-1.5 md:p-2 backdrop-blur-xl shadow-xl lg:shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-10">
                     <div className="relative w-full h-full rounded-2xl md:rounded-[1.5rem] overflow-hidden bg-slate-900">
                        <Image 
                           src={activeSlide.image}
                           alt={activeSlide.titleBold}
                           fill
                           className="object-cover opacity-80"
                           priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent pointer-events-none"></div>
                        
                        <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 flex items-center justify-between z-30 pointer-events-none">
                            <div className="flex -space-x-3 md:-space-x-4">
                               {activeSlide.icons.map((icon, idx) => (
                                  <div key={idx} className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-violet-500/30 bg-slate-950/80 text-violet-300 backdrop-blur-md shadow-lg pointer-events-auto">
                                    {icon}
                                  </div>
                               ))}
                            </div>
                            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-violet-500/50 bg-violet-600 shadow-[0_0_15px_rgba(139,92,246,0.6)] pointer-events-auto">
                               <Sparkles size={16} className="text-white md:hidden" />
                               <Sparkles size={20} className="text-white hidden md:block" />
                            </div>
                        </div>
                     </div>
                  </div>
               ) : (
                  <div className="glass-card-img relative w-full h-[320px] sm:h-[400px] lg:h-[550px] mx-auto md:max-w-md lg:max-w-none z-10 mt-4 lg:mt-0">
                     <div className="absolute top-0 right-0 lg:right-0 w-[75%] aspect-[3/2] rounded-2xl md:rounded-[2rem] border border-white/10 bg-slate-900/60 p-1 md:p-2 backdrop-blur-xl shadow-xl lg:shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-10">
                         <div className="relative w-full h-full rounded-[14px] md:rounded-[1.5rem] overflow-hidden">
                             {activeSlide.images && (
                                <Image src={activeSlide.images[0]} alt="App Development" fill className="object-cover opacity-90" priority />
                             )}
                             <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none"></div>
                         </div>
                     </div>

                     <div className="absolute bottom-0 left-0 w-[80%] aspect-[3/2] rounded-2xl md:rounded-[2rem] border border-violet-500/40 bg-slate-900/80 p-1 md:p-2 backdrop-blur-2xl shadow-xl lg:shadow-[0_30px_60px_rgba(139,92,246,0.25)] z-20">
                         <div className="relative w-full h-full rounded-[14px] md:rounded-[1.5rem] overflow-hidden">
                             {activeSlide.images && (
                                <Image src={activeSlide.images[1]} alt="UI UX Design" fill className="object-cover" />
                             )}
                             <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-900/10 to-transparent pointer-events-none"></div>
                             
                             <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-violet-400 bg-[linear-gradient(180deg,rgba(139,92,246,1)0%,rgba(109,40,217,1)100%)] shadow-[0_0_15px_rgba(139,92,246,0.6)]">
                                <Sparkles size={14} className="text-white md:hidden" />
                                <Sparkles size={16} className="text-white hidden md:block" />
                             </div>
                         </div>
                     </div>
                  </div>
               )}
            </div>

         </div>
      </div>
    </div>
  );
}
