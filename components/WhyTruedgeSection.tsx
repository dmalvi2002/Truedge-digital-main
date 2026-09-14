"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  BookOpen, 
  Clock, 
  ShieldCheck, 
  Users 
} from "lucide-react";
import { Sora } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ScrollRippleTitle from "@/components/ScrollRippleTitle";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sora = Sora({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800"] 
});

// Custom 4-Petal Geometric Star Icon matching Truedge brand token
function BrandStar({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.845 3.93521C19.845 6.10648 15.9098 11.9955 15.9098 11.9955C15.9098 11.9955 11.9746 6.10648 11.9746 3.93521C11.9746 1.76394 15.9098 0 15.9098 0C15.9098 0 19.845 1.76049 19.845 3.93521ZM3.93521 11.9761C6.10648 11.9761 11.9955 15.9113 11.9955 15.9113C11.9955 15.9113 6.10648 19.8465 3.93521 19.8465C1.76394 19.8465 0 15.9079 0 15.9079C0 15.9079 1.76049 11.9727 3.93521 11.9727V11.9761ZM11.9785 27.8923C11.9785 25.721 15.9137 19.832 15.9137 19.832C15.9137 19.832 19.8489 25.721 19.8489 27.8923C19.8489 30.0636 15.9137 31.8275 15.9137 31.8275C15.9137 31.8275 11.9785 30.067 11.9785 27.8923ZM27.8884 19.8431C25.7171 19.8431 19.8281 15.9079 19.8281 15.9079C19.8281 15.9079 25.7171 11.9727 27.8884 11.9727C30.0597 11.9727 31.8236 15.9079 31.8236 15.9079C31.8236 15.9079 30.0631 19.8431 27.8884 19.8431ZM15.9118 17.4682C16.7736 17.4682 17.4721 16.7697 17.4721 15.9079C17.4721 15.0462 16.7736 14.3477 15.9118 14.3477C15.0501 14.3477 14.3516 15.0462 14.3516 15.9079C14.3516 16.7697 15.0501 17.4682 15.9118 17.4682Z" />
    </svg>
  );
}

// 4 Core Value Statements (Rendered in signature PAS Scooped-Notch Card Architecture)
const WHY_TRUEDGE_POINTS = [
  {
    id: "unlimited-revisions",
    icon: BookOpen,
    title: "Unlimited Revisions",
    description: "We refine, test, and polish until you are 100% satisfied. No revision caps, no hidden fees, and zero settling for less.",
  },
  {
    id: "on-time-delivery",
    icon: Clock,
    title: "100% On-Time Delivery",
    description: "Strict milestone roadmaps with transparent sprint tracking. You launch on schedule every single time—no excuses.",
  },
  {
    id: "quality-delivery",
    icon: ShieldCheck,
    title: "Quality of Delivery",
    description: "Engineered exclusively by senior architects and designers. Clean code, high conversion rates, and long-term scalability.",
  },
  {
    id: "dedicated-team",
    icon: Users,
    title: "Dedicated Team",
    description: "Collaborate directly with the engineers and strategists building your product. Zero middleman bureaucracy.",
  },
];

export default function WhyTruedgeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);

  // Smooth scroll-reactive animation for both the inner image and the rotating circle seal
  useEffect(() => {
    const img = imageRef.current;
    const circle = circleRef.current;
    const container = imageContainerRef.current;
    if (!img || !circle || !container) return;

    const ctx = gsap.context(() => {
      // 1. Increased strength vertical scroll movement contained strictly inside the fixed container
      gsap.fromTo(
        img,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      // 2. Circle seal has amplified vertical scroll float (clearly noticeable motion)
      gsap.fromTo(
        circle,
        { y: -65 },
        {
          y: 65,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="why-truedge"
      className="relative w-full bg-white text-slate-950 py-24 sm:py-32 lg:py-36 overflow-hidden border-t border-slate-100"
    >
      {/* ─── Ambient Subtle Light-Theme Illumination ─── */}
      <div className="pointer-events-none absolute -top-40 right-10 w-[600px] h-[600px] bg-purple-500/[0.04] blur-[160px] rounded-full" />
      <div className="pointer-events-none absolute bottom-10 left-10 w-[500px] h-[500px] bg-indigo-500/[0.03] blur-[150px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-18 items-center">
          
          {/* ═══════════════════════════════════════════════════════
              LEFT COLUMN: 3:4 STRATEGIST IMAGE WITH SMOOTH SCROLL PARALLAX
              ═══════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[430px] sm:max-w-[460px]">
              
              {/* Main Frame: Contained aspect-[3/4] container */}
              <div 
                ref={imageContainerRef}
                className="relative aspect-[3/4] w-full rounded-[28px] sm:rounded-[34px] overflow-hidden shadow-[0_20px_50px_-15px_rgba(15,23,42,0.14)] border border-slate-200/80 bg-slate-50"
              >
                {/* Scroll-Reacting Contained Image Container (with 5% zoom) */}
                <div 
                  ref={imageRef}
                  className="absolute w-full h-[126%] -top-[13%] left-0 will-change-transform"
                >
                  <Image
                    src="https://res.cloudinary.com/dvvcwzp4n/image/upload/v1789347600/why-choose-us-section_cation.png"
                    alt="Truedge Senior Strategist"
                    fill
                    priority
                    className="object-cover object-center scale-105 select-none pointer-events-none"
                    sizes="(max-width: 768px) 100vw, 460px"
                  />
                </div>
                
                {/* Soft natural edge lighting gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-60 z-10" />
              </div>

              {/* ─── Floating Circular Rotating Contact Seal (Amplified Scroll Float) ─── */}
              <div
                ref={circleRef}
                className="absolute -bottom-6 -left-3 sm:-bottom-8 sm:-left-7 z-20 will-change-transform"
              >
                <Link
                  href="/contact"
                  className="group relative flex w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white shadow-[0_20px_40px_rgba(15,23,42,0.14)] border border-slate-200/90 items-center justify-center p-1 cursor-pointer transition-transform duration-300 hover:scale-105"
                  aria-label="Contact Truedge Digital"
                >
                  {/* 360-Degree Continuous Rotating Typography Seal */}
                  <svg
                    viewBox="0 0 120 120"
                    className="w-full h-full animate-[spin_12s_linear_infinite] [will-change:transform]"
                  >
                    <defs>
                      <path
                        id="whyTruedgeCirclePath"
                        d="M 60, 60 m -43, 0 a 43,43 0 1,1 86,0 a 43,43 0 1,1 -86,0"
                      />
                    </defs>
                    <text className="text-[8.5px] font-mono font-bold tracking-[1.2px] fill-slate-900 uppercase">
                      <textPath 
                        href="#whyTruedgeCirclePath" 
                        startOffset="0%"
                        textLength="262"
                        lengthAdjust="spacing"
                      >
                        • GET IN TOUCH • CONTACT US • WORK WITH US 
                      </textPath>
                    </text>
                  </svg>

                  {/* Inner Purple Accent Button Center */}
                  <div className="absolute inset-0 m-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[linear-gradient(135deg,#7c3aed_0%,#6d28d9_100%)] text-white flex items-center justify-center shadow-md transition-transform duration-300 group-hover:rotate-45">
                    <ArrowDownRight className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </Link>
              </div>

            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════
              RIGHT COLUMN: WHY TRUEDGE CAPSULE, SCROLL TITLE & VISIBLE CARDS
              ═══════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Eyebrow Capsule: "Why Truedge" with Premium Purple Accent */}
            <div className="mb-5 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-purple-50/90 border border-purple-200/80 text-purple-900 text-xs sm:text-sm font-bold tracking-wide w-fit shadow-xs">
              <BrandStar className="w-3.5 h-3.5 text-purple-600" />
              <span>Why Truedge</span>
            </div>

            {/* Dynamic Scroll-Ripple Title Animation matching ServicesListSection */}
            <ScrollRippleTitle
              text="Smart digital strategy that deliver real results"
              as="h2"
              className={`${sora.className} text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-extrabold tracking-tight leading-[1.14] mb-5 block`}
              baseColor="rgba(15, 23, 42, 0.22)"
              activeColor="#020617"
              accentColor="#a855f7"
            />

            {/* Lead Descriptive Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-10 max-w-2xl">
              We combine creativity, technology, and strategic thinking to deliver digital solutions that help businesses grow and succeed online.
            </p>

            {/* ─── 4 Signature PAS-Style Cards (Decreased radius, crisp visible borders/shadow, NO hover animation) ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-12">
              {WHY_TRUEDGE_POINTS.map((point) => {
                const IconComponent = point.icon;
                return (
                  <div
                    key={point.id}
                    className="relative flex flex-col"
                  >
                    {/* ── TOP DECK: Purple Badge Cutout + Inverted Scooped Title Shelf ── */}
                    <div className="relative flex items-end h-[58px] sm:h-[62px] z-10">
                      
                      {/* 1. Left Cutout Notch: Badge with decreased radius */}
                      <div className="w-[58px] sm:w-[62px] h-full relative flex items-start justify-start pt-1 pl-1">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[linear-gradient(135deg,#7c3aed_0%,#6d28d9_100%)] flex items-center justify-center text-white shadow-sm shadow-purple-600/30">
                          <IconComponent className="w-5 h-5 stroke-[2.2]" />
                        </div>
                      </div>

                      {/* 2. Right Upper Shelf: Crisp contrast background + defined border */}
                      <div className="relative flex-1 h-full bg-[#f1f4f9] rounded-tr-xl rounded-tl-xl flex items-center px-4 sm:px-5 pt-0.5 border-t border-r border-slate-300/85">
                        
                        {/* Precision Inverted Concave Curve Fillet matching the shelf background */}
                        <svg
                          className="absolute bottom-0 -left-[12px] w-[12px] h-[12px] pointer-events-none"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path d="M 12 0 A 12 12 0 0 1 0 12 L 12 12 Z" fill="#f1f4f9" />
                        </svg>

                        <h3 className={`${sora.className} text-base sm:text-[17px] font-bold text-slate-950 tracking-tight leading-snug`}>
                          {point.title}
                        </h3>
                      </div>

                    </div>

                    {/* ── MAIN CARD BODY (Crisp visible borders & shadow, decreased radius, NO hover lift) ── */}
                    <div className="relative bg-[#f1f4f9] rounded-b-xl rounded-tl-lg -mt-[1px] p-5 sm:p-6 border-b border-x border-slate-300/85 shadow-[0_8px_22px_rgba(15,23,42,0.06)] flex flex-col justify-start z-0">
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {point.description}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* ─── Bottom Action Row: Premium Purple CTA + Clean Static Avatar Teaser ─── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              
              {/* Premium Purple Gradient CTA Button */}
              <Link
                href="/contact"
                className="group/cta inline-flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full bg-[linear-gradient(135deg,#7c3aed_0%,#6d28d9_100%)] hover:bg-[linear-gradient(135deg,#6d28d9_0%,#5b21b6_100%)] text-white font-bold shadow-[0_4px_20px_rgba(124,58,237,0.35)] hover:shadow-[0_6px_25px_rgba(124,58,237,0.5)] transition-all duration-300 cursor-pointer w-fit"
              >
                <span className="text-sm sm:text-base font-bold">Book a Free Strategy Call</span>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-purple-700 flex items-center justify-center transition-transform duration-300 group-hover/cta:rotate-45 shadow-sm">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </Link>

              {/* Quick Contact Teaser with Proper Avatar and Clean Static Green Indicator */}
              <div className="inline-flex items-center gap-3 text-sm text-slate-600">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-xs">
                    <Image
                      src="/advisor-avatar.jpg"
                      alt="Truedge Advisor"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {/* Clean Static Solid Green Indicator Dot (No Ping/Pulse) */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white pointer-events-none" />
                </div>
                
                <p className="text-sm text-slate-600">
                  Have a specific question?{" "}
                  <Link
                    href="https://wa.me/447907901171"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-purple-700 underline decoration-purple-600 underline-offset-4 hover:text-purple-900 transition-colors"
                  >
                    Chat With Us
                  </Link>
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
