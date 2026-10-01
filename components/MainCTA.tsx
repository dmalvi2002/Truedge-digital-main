"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Sora } from "next/font/google";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./MainCTA.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export interface MainCTAProps {
  /** First line of the headline. Defaults to "Make your" */
  headlineLine1?: ReactNode;
  /** Second line text which receives the dynamic lime scrub reveal animation. Defaults to "next move." */
  accentText?: string;
  /** Description paragraph underneath the headline. */
  description?: ReactNode;
  /** Button label text. Defaults to "Book a Free Strategy Call" */
  buttonText?: string;
  /** Button link target. Defaults to "/contact" */
  buttonHref?: string;
  /** Additional CSS className applied to the root container */
  className?: string;
  /** Optional HTML id for section anchor targeting */
  id?: string;
}

export default function MainCTA({
  headlineLine1 = "Make your",
  accentText = "next move.",
  description = (
    <>
      Your business has potential.
      <br />
      Let’s put a plan behind it.
    </>
  ),
  buttonText = "Book a Free Strategy Call",
  buttonHref = "/contact",
  className = "",
  id = "final-cta",
}: MainCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-close-word]",
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "top 20%",
              scrub: 0.8,
            },
          }
        );

        gsap.from("[data-close-orbit]", {
          scale: 0.6,
          rotation: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      return () => media.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${styles.closing} ${sora.className} ${className}`.trim()}
      aria-labelledby={`${id}-title`}
    >
      <div className={styles.orbit} data-close-orbit aria-hidden="true" />
      <div className={styles.container}>
        <h2 id={`${id}-title`} className={`${styles.title} ${sora.className}`}>
          {headlineLine1}
          <br />
          <span className={styles.accentWord}>
            {accentText}
            <span
              className={styles.accentFill}
              data-close-word
              aria-hidden="true"
            >
              {accentText}
            </span>
          </span>
        </h2>
        <div className={styles.bottom}>
          <p className={styles.description}>{description}</p>
          <Link href={buttonHref} className={styles.button}>
            {buttonText} <ArrowUpRight size={21} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
