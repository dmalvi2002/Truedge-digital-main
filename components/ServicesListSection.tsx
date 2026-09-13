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

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  href: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'seo-marketing',
    number: '01',
    title: 'SEO & AI Search Growth',
    category: 'Discovery & Rankings',
    description:
      'We immerse ourselves in your market architecture, dominating generative answer engines, voice search, and organic conversion pipelines.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    href: '/services#seo',
  },
  {
    id: 'paid-media',
    number: '02',
    title: 'Paid Media & Social Ads',
    category: 'Performance Acquisition',
    description:
      'Algorithmic multi-channel advertising across Meta, Google Ads, TikTok, and YouTube driving predictable, compounding ROAS.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    href: '/services#paid-media',
  },
  {
    id: 'web-architecture',
    number: '03',
    title: 'Website & UX Architecture',
    category: 'Conversion Engineering',
    description:
      'Custom web platforms built on modern Next.js architecture, engineered for sub-second speeds and maximum transaction velocity.',
    image: '/card-laptop.jpg',
    href: '/services#web-design',
  },
  {
    id: 'video-production',
    number: '04',
    title: 'Video Production & Motion',
    category: 'Commercial Creative',
    description:
      'Cinematic brand commercials, viral short-form reels, kinetic product animations, and video ads crafted to capture instant attention.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80',
    href: '/services#video-production',
  },
  {
    id: 'marketing-leaflets',
    number: '05',
    title: 'Marketing Leaflets & Print',
    category: 'Tangible Collateral',
    description:
      'Luxury tactile print collateral, promotional brand leaflets, brochures, packaging, and high-impact physical assets that leave a lasting mark.',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80',
    href: '/services#print-collateral',
  },
  {
    id: 'content-marketing',
    number: '06',
    title: 'Content Marketing & Copy',
    category: 'Editorial Authority',
    description:
      'Conversion-focused copywriting, authority-building industry reports, and viral editorial storytelling that positions you as the market leader.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
    href: '/services#content',
  },
  {
    id: 'email-crm',
    number: '07',
    title: 'Email Marketing & Retention',
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

  // Staggered slide from left to right on scroll, one time only
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const validRows = rowsRef.current.filter(Boolean);
    if (validRows.length === 0) return;

    // Set initial off-screen state
    gsap.set(validRows, {
      x: -70,
      opacity: 0,
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 75%',
        once: true, // Animation triggers only once, then ends
        onEnter: () => {
          gsap.to(validRows, {
            x: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'transform', // Clean up after loaded
          });
        },
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
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <h2
            className={`${sora.className} text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.15] mb-6`}
          >
            It’s big challenge to grow-up your sales by providing best services
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            From high-conversion digital architecture and cinematic commercial video to tactile marketing leaflets—we engineer every touchpoint your brand needs to scale.
          </p>
        </div>

        {/* 7-Service Interactive List */}
        <div className="border-t border-slate-200">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              ref={(node) => {
                rowsRef.current[index] = node;
              }}
              className="group relative border-b border-slate-200/90 transition-colors duration-300 hover:bg-slate-50/70"
            >
              <Link
                href={service.href}
                className="flex flex-col lg:flex-row lg:items-center justify-between py-7 sm:py-9 px-2 sm:px-4 cursor-pointer gap-6 lg:gap-8"
              >
                {/* Left Side: Number, Hover Image Pill, and Title */}
                <div className="flex items-center min-w-0 flex-1">
                  
                  {/* Number */}
                  <span className="font-mono text-sm sm:text-base font-semibold text-slate-400 group-hover:text-slate-950 transition-colors w-10 shrink-0">
                    {service.number}
                  </span>

                  {/* Smooth Hover Image Pill: smoothly appears and expands on hover */}
                  <div className="relative overflow-hidden h-12 sm:h-14 lg:h-16 rounded-full w-0 max-w-0 opacity-0 -translate-x-3 scale-95 group-hover:w-28 sm:group-hover:w-36 lg:group-hover:w-44 group-hover:max-w-xs group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 group-hover:mr-5 group-hover:ml-2 transition-all duration-400 ease-out shrink-0 shadow-md border-2 border-white bg-slate-100">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 120px, 180px"
                    />
                  </div>

                  {/* Service Title */}
                  <h3
                    className={`${sora.className} text-xl sm:text-2xl lg:text-[28px] font-bold text-slate-900 tracking-tight group-hover:text-slate-950 group-hover:translate-x-1 transition-all duration-300 whitespace-pre-line`}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Right Side: Description and Arrow Circle Button */}
                <div className="flex items-center justify-between lg:justify-end gap-6 sm:gap-10 lg:w-[50%] shrink-0 pl-10 lg:pl-0">
                  
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
          ))}
        </div>

      </div>
    </section>
  );
}
