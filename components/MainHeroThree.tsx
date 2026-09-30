"use client";

import { useId, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { DM_Sans, IBM_Plex_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import strategyImage from "@/public/assets/truedge-strategy.webp";
import SplashCursor from "./SplashCursor";
import heroTwoStyles from "./MainHeroTwo.module.css";

const headline = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});
const supporting = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});
const ctaFont = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  { label: "Web design", href: "/services" },
  { label: "Digital marketing", href: "/marketing" },
  { label: "AI & automation", href: "/ai-automation" },
];

function HeroDoodles() {
  return (
    <>
      <svg data-doodle className="absolute top-[5%] md:top-[12%] -left-[5%] md:-left-[25%] z-20 w-[27%] rotate-240 text-[#c1fb00]" viewBox="0 0 180 160" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          <path data-doodle-stroke pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: 1 }} className="motion-reduce:[stroke-dashoffset:0]" d="M14 140C15 109 34 81 60 79C85 77 90 113 69 117C42 122 38 64 76 51C107 41 133 62 160 27" />
          <path data-doodle-stroke pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: 1 }} className="motion-reduce:[stroke-dashoffset:0]" d="M139 25C147 25 154 25 162 24L159 47" />
        </g>
      </svg>
      <svg data-doodle className="absolute -top-[1%] -right-[1%] z-20 w-[17%] rotate-12 text-[#cbb3e8]" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path data-doodle-stroke pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: 1 }} className="motion-reduce:[stroke-dashoffset:0]" d="M48 8C48 29 59 42 84 44C60 47 49 61 46 86C44 62 31 49 9 46C34 43 43 32 48 8Z" />
          <path data-doodle-stroke pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: 1 }} className="motion-reduce:[stroke-dashoffset:0]" d="M80 16 85 10M89 28 96 27" />
        </g>
      </svg>
    </>
  );
}

/** A folded diamond derived from the roof of the Truedge mark.
 * Two physical layers let the photograph pass through the sculpture.
 */
function BrandFold({ front = false }: { front?: boolean }) {
  const id = useId();

  return (
    <svg viewBox="0 0 620 820" fill="none" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-violet`} x1="30" y1="580" x2="540" y2="510" gradientUnits="userSpaceOnUse">
          <stop stopColor="#24113e" />
          <stop offset=".36" stopColor="#6940a4" />
          <stop offset=".65" stopColor="#b9a1dc" />
          <stop offset="1" stopColor="#3c1b64" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="245" y1="715" x2="610" y2="495" gradientUnits="userSpaceOnUse">
          <stop stopColor="#536914" />
          <stop offset=".6" stopColor="#c1fb00" />
          <stop offset="1" stopColor="#c1fb00" stopOpacity=".55" />
        </linearGradient>
        <linearGradient id={`${id}-rear`} x1="10" y1="565" x2="610" y2="490" gradientUnits="userSpaceOnUse">
          <stop stopColor="#56327f" />
          <stop offset=".5" stopColor="#211230" />
          <stop offset="1" stopColor="#8661b3" />
        </linearGradient>
      </defs>
      {front ? (
        <>
          <path d="M10 565 245 705 610 490 470 490 245 624 150 564Z" fill={`url(#${id}-violet)`} />
          <path d="M245 705 610 490V508L245 723Z" fill={`url(#${id}-edge)`} />
          <path d="M10 565 245 705V723L10 583Z" fill="#1f112f" />
        </>
      ) : (
        <>
          <path d="M10 565 375 350 610 490 470 490 375 432 150 564Z" fill={`url(#${id}-rear)`} />
          <path d="M375 350 610 490V508L375 369Z" fill="#211330" />
        </>
      )}
    </svg>
  );
}

export default function MainHeroThree() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();

    // Content is visible in the server render and in reduced-motion mode.
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const opening = gsap.timeline({ defaults: { ease: "power3.out" } });

      // The aperture, slow dolly, brand fold, and doodles reveal on all screen sizes
      opening
        .from("[data-film-frame]", {
          clipPath: "inset(18% 36% 18% 36% round 24px)",
          duration: 1.8,
          ease: "power3.inOut",
          clearProps: "clipPath",
        }, 0)
        .from("[data-film-photo]", {
          scale: 1.14, duration: 3.2, ease: "power2.out",
          clearProps: "transform",
        }, 0)
        .from("[data-fold-reveal]", {
          y: 45, rotation: -8, opacity: 0,
          transformOrigin: "50% 72%", duration: 1.6,
          clearProps: "transform,opacity",
        }, 0.65)
        .to("[data-doodle-stroke]", {
          strokeDashoffset: 0,
          duration: 1.15,
          stagger: 0.16,
          ease: "power2.inOut",
        }, 0.85);

      opening
        .from("[data-strategy-title]", {
          y: 18, opacity: 0, duration: 0.9,
          clearProps: "opacity,transform",
        }, 0.2)
        .from("[data-title-line]", {
          yPercent: 112, rotationX: -30,
          transformOrigin: "50% 100%", duration: 1.25, stagger: 0.13,
          clearProps: "transform",
        }, 0.35)
        .from("[data-supporting-copy]", {
          opacity: 0, y: 20, duration: 1,
          clearProps: "opacity,transform",
        }, 1.1)
        .from("[data-hero-action]", {
          opacity: 0, y: 16, duration: 0.85,
          clearProps: "opacity,transform",
        }, 1.35)
        .from("[data-service-link]", {
          opacity: 0, y: 12, duration: 0.65, stagger: 0.08,
          clearProps: "opacity, transform",
        }, 1.55)
        .set("[data-growth-wrap]", { overflow: "visible" }, 1.85)
        .fromTo("[data-growth-reveal]",
          { clipPath: "inset(-8px 100% -8px 0)" },
          {
            clipPath: "inset(-8px 0% -8px 0)",
            duration: 1.35,
            ease: "power2.inOut",
          },
          ">+=0.4"
        );
    });

    // Separate wrappers keep the entrance and reversible scroll story independent.
    // Normal document scrolling stays intact; nothing is pinned or intercepted.
    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: () => window.innerWidth >= 1200 ? "top top+=100" : "top top+=80",
          end: "bottom top+=180",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })
        .to("[data-copy-depth]", { y: -100, duration: 1 }, 0)
        .to("[data-copy-depth]", { opacity: 0, duration: 0.5 }, 0.28)
        .to("[data-portrait-depth]", { xPercent: -9, y: 85, scale: 0.9, rotation: -3, duration: 1 }, 0)
        .to("[data-fold-depth]", { y: -65, rotation: 12, scale: 1.06, transformOrigin: "50% 72%", duration: 1 }, 0)
        .to("[data-doodle-depth]", { y: -35, rotation: 8, duration: 1 }, 0)
        .to("[data-portrait-scene]", { opacity: 0, duration: 0.22 }, 0.78);

      // The homepage explicitly opts the following section into this handover.
      const following = root.current?.nextElementSibling;
      if (following instanceof HTMLElement && following.hasAttribute("data-hero-following")) {
        gsap.fromTo(following.firstElementChild, {
          y: 70,
          clipPath: "inset(0 4% 0 4% round 28px 28px 0 0)",
        }, {
          y: 0,
          clipPath: "inset(0 0% 0 0% round 0px 0px 0 0)",
          ease: "none",
          scrollTrigger: {
            trigger: following,
            start: "top bottom",
            end: "top 62%",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return () => media.revert();
  }, { scope: root });

  return (
    <section
      ref={root}
      aria-labelledby="main-hero-title"
      className={`${supporting.className} relative isolate overflow-hidden bg-[#06070b] px-6 pt-8 pb-5 text-white selection:bg-[#c1fb00] selection:text-[#06070b] sm:px-10 sm:pt-10 lg:px-14 lg:py-7`}
    >
      <SplashCursor
        scopeRef={root}
        DENSITY_DISSIPATION={4.5}
        VELOCITY_DISSIPATION={1.5}
        PRESSURE={0.2}
        CURL={0}
        SPLAT_RADIUS={0.06}
        SPLAT_FORCE={2500}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE
        COLOR="#c1fb00"
        COLOR_INTENSITY={2.4}
      />
      <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-8 sm:gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-3">
        <div data-copy-depth className="relative z-30 text-center lg:text-left">
          <p data-strategy-title className={`${headline.className} mb-5 text-[clamp(1.25rem,5.1vw,2rem)] leading-[1.25] font-bold tracking-[-0.035em] text-[#d9cbed] [word-spacing:0.08em] lg:mb-6 lg:text-[clamp(1.65rem,2.25vw,2.25rem)]`}>
            From Strategy to Scale
          </p>
          <h1
            id="main-hero-title"
            aria-label="Your One-Stop Partner for Digital Growth."
            className={`${headline.className} text-[clamp(1.85rem,7.6vw,4.25rem)] leading-[1.08] font-semibold tracking-[-0.055em] lg:text-[clamp(2.85rem,5.25vw,5.5rem)]`}
          >
            {["Your One-Stop", "Partner for", "Digital Growth."].map((line, index) => (
              <span
                key={line}
                aria-hidden="true"
                data-growth-wrap={index === 2 ? "" : undefined}
                className={`block overflow-hidden pr-[0.06em] [perspective:900px] ${
                  index === 2 ? "-mb-[0.24em] pb-[0.38em]" : "-mb-[0.06em] pb-[0.15em]"
                }`}
              >
                <span data-title-line className={`flex justify-center gap-[0.22em] lg:justify-start ${index === 2 ? "text-[#c1fb00]" : ""}`}>
                  {index === 2 ? (
                    <span className="relative inline-block" data-growth-word>
                      <span className="inline-block pt-[0.06em] pb-[0.24em] text-[#c1fb00]">
                        Digital Growth.
                      </span>
                      <span
                        data-growth-reveal
                        aria-hidden="true"
                        className="pointer-events-none absolute -left-[0.18em] -right-[0.18em] inset-y-0 inline-block rounded-[4px] bg-[#c1fb00] pl-[0.18em] pr-[0.18em] pt-[0.06em] pb-[0.24em] text-[#06070b] [clip-path:inset(-8px_100%_-8px_0)] motion-reduce:hidden"
                      >
                        Digital Growth.
                      </span>
                    </span>
                  ) : (
                    line.split(" ").map((word, wordIndex) => <span key={word}>{word}{wordIndex === 0 ? " " : ""}</span>)
                  )}
                </span>
              </span>
            ))}
          </h1>
          <p data-supporting-copy className="mx-auto mt-5 max-w-[530px] text-[15px] leading-[1.8] text-[#bfc3ba] sm:text-[16px] lg:mx-0 lg:mt-6 lg:text-[17px]">
            Websites that earn trust. Marketing that brings enquiries.
            AI that takes busywork off your plate. We bring it all together,
            so you can focus on growing your business.
          </p>
          <div data-hero-action className="mt-6 flex justify-center sm:mt-7 lg:justify-start">
            <Link
              href="/contact"
              className={`${heroTwoStyles.cta} ${ctaFont.className} focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-[#d2f83a] motion-reduce:transition-none`}
            >
              <span>Book a Free Strategy Call</span>
              <span className={`${heroTwoStyles.ctaIcon} motion-reduce:transition-none`} aria-hidden="true"><ArrowUpRight size={21} /></span>
            </Link>
          </div>
          <nav aria-label="Explore our services" className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 sm:mt-6 sm:gap-x-6 lg:justify-start">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                data-service-link
                className="inline-flex min-h-11 items-center gap-2 text-[12px] font-medium text-[#c7c9c3] hover:text-[#c1fb00] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c1fb00] sm:text-[13px]"
              >
                {service.label}<ArrowUpRight size={13} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>

        <div data-portrait-scene className="pointer-events-none relative mx-auto aspect-[31/41] w-full max-w-[520px] lg:ml-0" aria-hidden="true">
          <div data-fold-depth className="absolute inset-0 z-0">
            <div data-fold-reveal className="h-full w-full"><BrandFold /></div>
          </div>

          <div data-portrait-depth className="absolute top-[3%] left-[8%] z-10 aspect-[2/3] w-[84%]">
            <div data-film-frame className="relative h-full w-full overflow-hidden rounded-[3px] bg-[#181c17]">
              <div data-film-photo className="absolute inset-0">
                <Image
                  src={strategyImage}
                  alt=""
                  fill
                  preload
                  placeholder="blur"
                  sizes="(min-width: 1280px) 437px, (min-width: 1024px) 38vw, (min-width: 640px) 437px, 84vw"
                  className="object-cover saturate-[0.72]"
                />
              </div>
              <div className="absolute inset-0 bg-[#1e2519]/10 mix-blend-multiply" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(6,7,11,0.4)_100%)]" />
            </div>
          </div>

          <div data-fold-depth className="absolute inset-0 z-20">
            <div data-fold-reveal className="h-full w-full"><BrandFold front /></div>
          </div>
          <div data-doodle-depth className="absolute inset-0 z-20"><HeroDoodles /></div>
        </div>
      </div>
    </section>
  );
}
