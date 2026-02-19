"use client";

import { useRef } from "react";
import { Sora, IBM_Plex_Sans } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Video,
  Search,
  MousePointerClick,
  Share2,
  PenTool,
} from "lucide-react";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Font Initialisation
const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const services = [
  {
    title: "Technical SEO",
    description:
      "Data-backed search engine optimisation to secure page-one rankings and capture high-intent organic traffic. We dominate the search results for our clients.",
    icon: <Search size={32} className="text-cyan-500" />,
    span: "col-span-1 md:col-span-2 lg:col-span-8",
    highlight: "Our Signature Service",
  },
  {
    title: "Retention Video Editing",
    description:
      "Cinematic, fast-paced motion graphics designed to maximise audience retention and engagement.",
    icon: <Video size={32} className="text-[#8B5CF6]" />,
    span: "col-span-1 md:col-span-2 lg:col-span-4",
  },
  {
    title: "PPC Advertising",
    description:
      "Highly targeted Facebook and Google ad campaigns focused entirely on driving profitable return on ad spend (ROAS).",
    icon: <MousePointerClick size={32} className="text-emerald-500" />,
    span: "col-span-1 md:col-span-1 lg:col-span-4",
  },
  {
    title: "Social Media Management",
    description:
      "End-to-end brand management across all social channels to build community and authority.",
    icon: <Share2 size={32} className="text-orange-500" />,
    span: "col-span-1 md:col-span-1 lg:col-span-4",
  },
  {
    title: "Premium Graphic Design",
    description:
      "Bespoke brand identities, high-click-through thumbnails, and digital assets that command attention.",
    icon: <PenTool size={32} className="text-pink-500" />,
    span: "col-span-1 md:col-span-2 lg:col-span-4",
  },
];

export default function GrowthServiceList() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Scroll animation for the section title
      gsap.fromTo(
        ".service-header",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".service-header",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Staggered scroll animation for the Bento cards
      gsap.fromTo(
        ".bento-card",
        { y: 60, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="bg-slate-50/50 py-24 sm:py-32 overflow-hidden px-4 sm:px-6 lg:px-8 relative z-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="service-header mb-20 text-center max-w-3xl mx-auto">
          <span
            className={`${ibmPlexSans.className} text-[#8B5CF6] font-semibold tracking-wide uppercase text-sm mb-4 block`}
          >
            Our Growth Arsenal
          </span>
          <h2
            className={`${sora.className} text-5xl sm:text-6xl lg:text-[64px] font-semibold text-slate-900 leading-[1.1] tracking-tight mb-6`}
          >
            Everything you need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9]">
              dominate.
            </span>
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              // Premium Card Classes: subtle gradient background, softer deeper shadow on hover, smooth lift.
              className={`bento-card group relative bg-gradient-to-br from-white to-slate-50/50 border border-slate-200/60 rounded-[2rem] p-10 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col justify-between overflow-hidden ${service.span}`}
            >
              {/* Premium Gradient Highlight Tag */}
              {service.highlight && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white text-[11px] font-bold uppercase tracking-wider px-6 py-2 rounded-bl-2xl rounded-tr-[2rem] z-10 shadow-md">
                  {service.highlight}
                </div>
              )}

              <div>
                {/* Polished Icon Box: Pure white, pops off the card surface */}
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all duration-500">
                  {service.icon}
                </div>
                <h3
                  className={`${sora.className} text-[26px] font-semibold text-slate-900 mb-5 tracking-tight`}
                >
                  {service.title}
                </h3>
                <p
                  className={`${ibmPlexSans.className} text-slate-600 text-lg leading-relaxed max-w-2xl`}
                >
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
