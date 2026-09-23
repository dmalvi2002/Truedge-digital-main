"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
import Image from "next/image";
import Link from "next/link";
import { 
  Laptop, 
  Megaphone, 
  Globe, 
  ArrowUpRight, 
  CircleMinus 
} from "lucide-react";
import { Sora } from "next/font/google";
import ScrollRippleTitle from "@/components/ScrollRippleTitle";
import SectionCursor from "@/components/SectionCursor";
import styles from "./PasSection.module.css";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

interface ServiceCard {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  ctaText: string;
  href: string;
}

const SERVICES: ServiceCard[] = [
  {
    id: "website-design",
    title: "Website Design",
    category: "Make a great first impression",
    description: "A clear, professional website that shows what you do, works beautifully on phones, and makes it easy for customers to call or send an enquiry.",
    icon: <Laptop className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950 stroke-[2.2]" />,
    imageSrc: "/card-laptop.jpg",
    imageAlt: "Website Design and Development Laptop Display",
    ctaText: "Website Design",
    href: "/services",
  },
  {
    id: "paid-media",
    title: "Online Advertising",
    category: "Reach the right customers",
    description: "Ads on Google and social media that put your business in front of people likely to need you. We manage the budget and show you what’s bringing enquiries.",
    icon: <Megaphone className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950 stroke-[2.2]" />,
    imageSrc: "/card-tablet.jpg",
    imageAlt: "Paid Media Strategy Tablet Display",
    ctaText: "Online Advertising",
    href: "/services",
  },
  {
    id: "seo-aeo-geo",
    title: "Get Found Online",
    category: "Be there when people search",
    description: "Help customers find you when they search for your services. We improve your website and online presence so more people can discover your business.",
    icon: <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950 stroke-[2.2]" />,
    imageSrc: "/card-phone.jpg",
    imageAlt: "Search and AI Engine Optimization Display",
    ctaText: "Search Visibility",
    href: "/services",
  },
];


const PAIN_POINTS = [
  { title: "A website that doesn’t do you justice.", text: "You’re proud of your business. Your website should give people the same confidence." },
  { title: "Hard to find on Google.", text: "People nearby are looking for what you offer, but they’re finding someone else first." },
  { title: "Paying for ads. Still waiting for calls.", text: "Money goes out every month, but you’re not sure what’s actually bringing customers in." },
  { title: "Competitors getting the attention.", text: "You know your work is just as good. Online, they seem to be the obvious choice." },
  { title: "Busy one month. Quiet the next.", text: "Word of mouth helps, but you can’t plan ahead when enquiries come and go." },
  { title: "No time to figure it all out.", text: "Between customers, staff and the day-to-day, marketing keeps slipping down the list." },
];

export default function PasSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-pas-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 22, opacity: 0, duration: .7, ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 92%", once: true },
        });
      });
      gsap.fromTo("[data-seen-reveal]",
        { clipPath: "inset(-4px 100% -4px 0)" },
        {
          clipPath: "inset(-4px 0% -4px 0)",
          duration: 1.35,
          delay: 1,
          ease: "power2.inOut",
          scrollTrigger: { trigger: "[data-seen-word]", start: "top 90%", once: true },
        },
      );
    });
    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-struggle-image]", { yPercent: -12 }, {
        yPercent: 12, ease: "none",
        scrollTrigger: { trigger: "[data-struggle-frame]", start: "top bottom", end: "bottom top", scrub: 1.2 },
      });
    });
    return () => media.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={`${styles.section} ${sora.className}`} aria-labelledby="pas-problem-title">
      <SectionCursor targetRef={sectionRef} />
      <div className={styles.container}>
        <div className={styles.opening}>
          <ScrollRippleTitle
            id="pas-problem-title"
            text="Are you struggling with?"
            as="h2"
            accentColor="#d2f83a"
            baseColor="rgba(255, 255, 255, 0.25)"
            activeColor="#ffffff"
            className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight leading-[1.12] text-white"
          />
          <p>You’re good at what you do.<br />Getting customers online shouldn’t be the hard part.</p>
        </div>

        <div className={styles.problemLayout}>
        <ul className={styles.problems}>
          {PAIN_POINTS.map((point) => (
            <li key={point.title} className={styles.problem} data-pas-reveal>
              <CircleMinus size={21} strokeWidth={1.25} aria-hidden="true" />
              <h3>{point.title}</h3>
            </li>
          ))}
        </ul>
        <div className={styles.struggleFrame} data-struggle-frame>
          <div className={styles.struggleImage} data-struggle-image>
            <Image src="/pas-business-owner.png" alt="A business owner taking a worried pause beside a quiet phone and unfinished work" fill sizes="(max-width: 767px) 100vw, 45vw" className="object-cover" />
          </div>
        </div>
        </div>

        <div className={styles.cost} data-pas-reveal>
          <div className={styles.costCopy}>
            <p>It’s the job that went to someone else. The ad spend you can’t get back. Another evening trying to fix it yourself.</p>
            <p>When people can’t find you—or don’t feel confident enough to call—good work can go unnoticed.</p>
          </div>
          <div className={styles.costHeading}>
            <h2>Your business<br />deserves to<br /><span className={styles.seenWord} data-seen-word><span className={styles.seenBase}>be seen.</span><span className={styles.seenHighlight} data-seen-reveal aria-hidden="true">be seen.</span></span></h2>
          </div>
        </div>

        <div className={styles.solutionHeading}>
          <ScrollRippleTitle
            text="Let’s help more customers find you and choose you."
            as="h2"
            className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight leading-[1.12]"
          />
          <p>A website that earns trust. Marketing that reaches the right people. And a clear way for them to get in touch.</p>
        </div>

        {/* ─── 2. THE 3 SIGNATURE SCOOPED-NOTCH CARDS ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 ">
          {SERVICES.map((card) => (
            <div
              key={card.id}
              className="group relative flex flex-col transition-all duration-300 motion-safe:hover:-translate-y-2"
            >
              {/* ── TOP DECK: Floating Lime Badge Cutout + Inverted Scooped White Title Tab ── */}
              <div className="relative flex items-end h-[74px] z-10">
                
                {/* 1. Left Cutout Notch: The purple page background shows cleanly around the badge */}
                <div className="w-[74px] h-full relative flex items-start justify-start pt-1 pl-1">
                  <div className="w-14 h-14 rounded-xl bg-[#d2f83a] flex items-center justify-center text-slate-950 shadow-[0_10px_25px_rgba(210,248,58,0.3)] transition-all duration-300 group-hover:scale-105 group-hover:rotate-2">
                    {card.icon}
                  </div>
                </div>

                {/* 2. Right Upper Tab: Pure White Background housing the Title (Spot 3: Rounded Top-Left) */}
                <div className="relative flex-1 h-full bg-white rounded-tr-xl rounded-tl-xl flex items-center px-5 sm:px-6 pt-1">
                  
                  {/* Precision Inverted Concave Curve Fillet joining tab to lower shelf */}
                  <svg
                    className="absolute bottom-0 -left-[12px] w-[12px] h-[12px] pointer-events-none"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path d="M 12 0 A 12 12 0 0 1 0 12 L 12 12 Z" fill="#ffffff" />
                  </svg>

                  <h3 className="text-xl sm:text-[22px] font-bold text-slate-950 tracking-tight leading-snug">
                    {card.title}
                  </h3>
                </div>

              </div>

              {/* ── MAIN CARD BODY (Pure White Container with smooth top-left curve under notch) ── */}
              <div className="relative bg-white rounded-b-xl rounded-tl-lg -mt-[1px] p-6 sm:p-7 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)] flex flex-col justify-between flex-1 z-0">
                
                {/* 1. Friendly, Clean Image Mockup (No technical data/confusion) */}
                <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden mb-6 shadow-sm border border-slate-100/90 bg-slate-100">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* 2. Clear Agency Copy */}
                <div className="space-y-2.5 mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {card.category}
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                {/* 3. BESPOKE BUTTON DESIGN: The Magnetic Kinetic Capsule */}
                <div className="pt-2 flex items-center justify-between">
                  <Link
                    href={card.href}
                    className="group/btn inline-flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-full bg-slate-950 text-white shadow-md hover:bg-slate-900 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(210,248,58,0.35)] cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold tracking-tight text-white group-hover/btn:text-[#d2f83a] transition-colors">
                      {card.ctaText}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#d2f83a] text-slate-950 flex items-center justify-center font-bold transition-all duration-300 group-hover/btn:rotate-45 group-hover/btn:scale-105 shadow-sm">
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </Link>
                </div>

              </div>

            </div>
          ))}
        </div>



        {/* Archived full-funnel section — retained for reuse, intentionally not rendered.
        
        <div className="relative mt-4 sm:mt-8 pt-6 sm:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            
            <div className="lg:col-span-6 flex items-center justify-center">
              
              
              <div className="relative w-full max-w-[560px] aspect-[574/484] mx-auto">
                
                
                <svg 
                  className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
                  viewBox="0 0 574 484"
                  fill="none"
                >
                  <defs>
                    <marker
                      id="doodle-arrowhead"
                      viewBox="0 0 10 10"
                      refX="6"
                      refY="5"
                      markerWidth="7"
                      markerHeight="7"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#d2f83a" />
                    </marker>
                  </defs>
                  
                  
                  <path 
                    d="M 130 246 C 90 285, 75 325, 95 360 C 115 400, 165 400, 165 360 C 165 320, 115 320, 95 360 C 80 425, 140 515, 230 515 C 310 515, 365 510, 395 484" 
                    stroke="#d2f83a" 
                    strokeWidth="2.8" 
                    strokeDasharray="6 6" 
                    strokeLinecap="round"
                    markerEnd="url(#doodle-arrowhead)"
                    className="opacity-95"
                  />

                  
                  <circle cx="130" cy="246" r="4.5" fill="#d2f83a" />
                </svg>

                
                <svg 
                  className="absolute inset-0 w-full h-full pointer-events-none z-[15] overflow-visible"
                  viewBox="0 0 574 484"
                  fill="none"
                >
                  <circle cx="130" cy="246" r="5" fill="#d2f83a" className="drop-shadow-[0_0_8px_rgba(210,248,58,0.8)]" />
                </svg>

                
                <div className="absolute top-0 left-0 w-[58%] aspect-[4/3] rounded-[22px] sm:rounded-[28px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] border-2 border-white/15 z-10">
                  <Image
                    src="/team-collaboration.jpg"
                    alt="Truedge Growth Strategy Specialists"
                    fill
                    className="object-cover"
                  />
                </div>

                
                <div className="absolute bottom-2 sm:bottom-3 right-0 w-[62%] aspect-[4/3] rounded-[22px] sm:rounded-[28px] overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.7)] border-2 border-white/15 z-20">
                  <Image
                    src="/team-strategy.jpg"
                    alt="Revenue Growth Funnel Engineering"
                    fill
                    className="object-cover"
                  />
                </div>

              </div>
            </div>

            
            <div className="lg:col-span-6 space-y-6">

              <ScrollRippleTitle
                text="Why you need a full-funnel digital growth partner"
                as="h2"
                className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.15]"
              />

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                To scale new customer acquisition and customer lifetime value sustainably, we engineer across the entire conversion lifecycle. No fragmented freelancers or unaligned agencies—a unified growth machine built for revenue.
              </p>

              
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#d2f83a]/15 border border-[#d2f83a]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d2f83a]" />
                  </div>
                  <div>
                    <span className="text-sm sm:text-base font-bold text-white">
                      Full-funnel conversion engineering
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                      Zero generic templates. Bespoke digital touchpoints tailored to high transaction values.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#d2f83a]/15 border border-[#d2f83a]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d2f83a]" />
                  </div>
                  <div>
                    <span className="text-sm sm:text-base font-bold text-white">
                      Algorithmic paid media funnels
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                      Multi-channel scaling across Meta, Google Search, and TikTok targeting high-intent buyers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#d2f83a]/15 border border-[#d2f83a]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d2f83a]" />
                  </div>
                  <div>
                    <span className="text-sm sm:text-base font-bold text-white">
                      Dedicated UK team embedded in your brand
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                      Direct Slack access to senior strategists, copywriters, and engineers without account manager friction.
                    </p>
                  </div>
                </div>
              </div>

              
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="group/cta inline-flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full bg-[#d2f83a] text-slate-950 font-bold shadow-lg shadow-lime-400/20 hover:bg-[#c0e82c] transition-all duration-300 hover:shadow-[0_6px_25px_rgba(210,248,58,0.4)] cursor-pointer"
                >
                  <span className="text-sm sm:text-base">Book a Free Strategy Call</span>
                  <div className="w-8 h-8 rounded-full bg-slate-950 text-[#d2f83a] flex items-center justify-center transition-transform duration-300 group-hover/cta:rotate-45">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </Link>

                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-200 hover:text-white px-4 py-2 transition-colors duration-200"
                >
                  <span>Explore Capabilities</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

            </div>

          </div>
        </div>

        */}
      </div>
    </section>
  );
}
