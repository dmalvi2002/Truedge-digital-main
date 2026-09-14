'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Sora } from 'next/font/google';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const sora = Sora({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });
import ScrollRippleTitle from '@/components/ScrollRippleTitle';

interface ServiceItem {
  id: string;
  number: string;
  line1: string;
  line2: string;
  category: string;
  description: string;
  image: string;
  href: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'seo-marketing',
    number: '01',
    line1: 'SEO & AI',
    line2: 'Search Growth',
    category: 'Discovery & Rankings',
    description:
      'We immerse ourselves in your market architecture, dominating generative answer engines, voice search, and organic conversion pipelines.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    href: '/services#seo',
  },
  {
    id: 'paid-media',
    number: '02',
    line1: 'Paid Media &',
    line2: 'Social Ads',
    category: 'Performance Acquisition',
    description:
      'Algorithmic multi-channel advertising across Meta, Google Ads, TikTok, and YouTube driving predictable, compounding ROAS.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    href: '/services#paid-media',
  },
  {
    id: 'web-architecture',
    number: '03',
    line1: 'Website & UX',
    line2: 'Architecture',
    category: 'Conversion Engineering',
    description:
      'Custom web platforms built on modern Next.js architecture, engineered for sub-second speeds and maximum transaction velocity.',
    image: '/card-laptop.jpg',
    href: '/services#web-design',
  },
  {
    id: 'video-production',
    number: '04',
    line1: 'Cinematic Video &',
    line2: 'Motion Creative',
    category: 'Commercial Creative',
    description:
      'Cinematic brand commercials, viral short-form reels, kinetic product animations, and video ads crafted to capture instant attention.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80',
    href: '/services#video-production',
  },
  {
    id: 'marketing-leaflets',
    number: '05',
    line1: 'Marketing Leaflets &',
    line2: 'Print Collateral',
    category: 'Tangible Collateral',
    description:
      'Luxury tactile print collateral, promotional brand leaflets, brochures, packaging, and high-impact physical assets that leave a lasting mark.',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80',
    href: '/services#print-collateral',
  },
  {
    id: 'content-marketing',
    number: '06',
    line1: 'Content Marketing &',
    line2: 'Copywriting',
    category: 'Editorial Authority',
    description:
      'Conversion-focused copywriting, authority-building industry reports, and viral editorial storytelling that positions you as the market leader.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
    href: '/services#content',
  },
  {
    id: 'email-crm',
    number: '07',
    line1: 'Email & CRM',
    line2: 'Retention Funnels',
    category: 'Lifecycle Automation',
    description:
      'Automated customer lifecycle workflows, personalized SMS sequences, and behavioral VIP funnels scaling lifetime customer value.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    href: '/services#crm',
  },
];

export default function ServicesListSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  // TRUE DYNAMIC SCROLL ANIMATION:
  // Each row slides in from left to right as the user scrolls down, one-by-one.
  // Once a row completes its loaded state, its scroll animation ends permanently (one time only).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      SERVICES.forEach((_, index) => {
        const row = rowsRef.current[index];
        const line = lineRefs.current[index];
        if (!row) return;

        // Hardware-accelerated timeline: pre-compiled, GPU composited (zero blur filter overhead)
        const tl = gsap.timeline({ paused: true });

        tl.fromTo(
          row,
          {
            x: -70,
            opacity: 0,
            force3D: true,
          },
          {
            x: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: 1,
            force3D: true,
          }
        );

        if (line) {
          tl.fromTo(
            line,
            {
              scaleX: 0,
              transformOrigin: 'left center',
              force3D: true,
            },
            {
              scaleX: 1,
              ease: 'none',
              duration: 1,
              force3D: true,
            },
            0
          );
        }

        // Initialize at progress 0
        tl.progress(0);

        let maxProgress = 0;

        // Driven directly by user scroll with forward-only locking
        ScrollTrigger.create({
          trigger: row,
          start: 'top 92%',
          end: 'top 65%',
          scrub: 0.35,
          onUpdate: (self) => {
            if (self.progress > maxProgress) {
              maxProgress = self.progress;
              tl.progress(maxProgress);

              // Once fully arrived, snap to 1, clear transform props so hover states work cleanly, and kill trigger
              if (maxProgress >= 0.98) {
                tl.progress(1);
                gsap.set(row, { clearProps: 'transform' });
                if (line) {
                  gsap.set(line, { scaleX: 1, clearProps: 'transform' });
                }
                self.kill();
              }
            }
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-slate-950 py-24 sm:py-32 overflow-hidden border-t border-slate-100"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Top-Corner CTA */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16 sm:mb-20">
          <div className="max-w-3xl">
            <ScrollRippleTitle
              text="It’s big challenge to grow-up your sales by providing best services"
              as="h2"
              className={`${sora.className} text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-extrabold tracking-tight leading-[1.14] mb-6 block`}
              baseColor="rgba(15, 23, 42, 0.22)"
              activeColor="#020617"
              accentColor="#a855f7"
            />
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              From high-converting web architecture and performance ads to commercial video and tactile marketing leaflets—we engineer unified growth across every touchpoint.
            </p>
          </div>

          {/* Top Corner Purple CTA Button (PAS Section Style) */}
          <div className="shrink-0 lg:pt-2">
            <Link
              href="/contact"
              className="group/cta inline-flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full bg-[linear-gradient(135deg,#7c3aed_0%,#6d28d9_100%)] hover:bg-[linear-gradient(135deg,#6d28d9_0%,#5b21b6_100%)] text-white font-bold shadow-[0_4px_20px_rgba(124,58,237,0.35)] hover:shadow-[0_6px_25px_rgba(124,58,237,0.5)] transition-all duration-300 cursor-pointer"
            >
              <span className="text-sm sm:text-base">Book a Free Strategy Call</span>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-purple-700 flex items-center justify-center transition-transform duration-300 group-hover/cta:rotate-45 shadow-sm">
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </Link>
          </div>
        </div>

        {/* 7-Service Interactive List */}
        <div className="border-t border-slate-200">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="relative"
            >
              {/* Animated Row Content */}
              <div
                ref={(node) => {
                  rowsRef.current[index] = node;
                }}
                className="group relative transition-colors duration-300 hover:bg-slate-50/80 rounded-2xl will-change-transform"
              >
                <Link
                  href={service.href}
                  className="flex flex-col lg:flex-row lg:items-center justify-between py-7 sm:py-9 px-3 sm:px-6 cursor-pointer gap-6 lg:gap-8"
                >
                  {/* Left Side: Number, Hover Image Pill, and 2-Line Stacked Title */}
                  <div className="flex items-center min-w-0 flex-1">
                    
                    {/* Number */}
                    <span className="font-mono text-sm sm:text-base font-bold text-slate-400 group-hover:text-slate-950 transition-colors w-10 sm:w-12 shrink-0">
                      {service.number}
                    </span>

                    {/* Smooth Hover Image Pill: expands and appears on hover */}
                    <div className="relative overflow-hidden h-12 sm:h-14 lg:h-16 rounded-full w-0 max-w-0 opacity-0 -translate-x-3 scale-95 group-hover:w-28 sm:group-hover:w-36 lg:group-hover:w-44 group-hover:max-w-xs group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 group-hover:mr-5 group-hover:ml-2 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 shadow-md border-2 border-white bg-slate-100">
                      <Image
                        src={service.image}
                        alt={`${service.line1} ${service.line2}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 120px, 180px"
                      />
                    </div>

                    {/* 2-Line Stacked Title matching reference design */}
                    <h3
                      className={`${sora.className} text-xl sm:text-2xl lg:text-[28px] font-bold text-slate-900 tracking-tight leading-[1.2] group-hover:text-slate-950 group-hover:translate-x-1 transition-all duration-300`}
                    >
                      <span className="block">{service.line1}</span>
                      <span className="block">{service.line2}</span>
                    </h3>
                  </div>

                  {/* Right Side: Description and Arrow Circle Button */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 sm:gap-10 lg:w-[48%] shrink-0 pl-10 lg:pl-0">
                    
                    {/* Service Description */}
                    <p className="text-sm sm:text-base text-slate-500 font-normal leading-relaxed max-w-md group-hover:text-slate-700 transition-colors">
                      {service.description}
                    </p>

                    {/* Circular Action Arrow Button */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 group-hover:border-slate-950 group-hover:bg-slate-950 group-hover:text-[#d2f83a] group-hover:scale-105 transition-all duration-300 shrink-0 shadow-sm">
                      <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                    </div>

                  </div>
                </Link>
              </div>

              {/* Dynamic Divider Line: expands from left to right with scroll */}
              <div
                ref={(node) => {
                  lineRefs.current[index] = node;
                }}
                className="w-full h-[1px] bg-slate-200/90"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
