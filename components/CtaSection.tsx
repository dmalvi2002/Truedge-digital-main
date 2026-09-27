"use client";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Sora } from "next/font/google";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./MarketingPage.module.css";
gsap.registerPlugin(useGSAP, ScrollTrigger);
const sora = Sora({ subsets: ["latin"], weight: ["400","500","600","700","800"] });
export default function CtaSection() {
  const section = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-close-word]", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "none", scrollTrigger: { trigger: section.current, start: "top 70%", end: "top 20%", scrub: .8 } });
      gsap.from("[data-close-orbit]", { scale: .6, rotation: -30, ease: "none", scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom top", scrub: 1.5 } });
    });
    return () => media.revert();
  }, { scope: section });
  return <div className={`${styles.page} ${sora.className}`}><section ref={section} className={styles.closing} aria-labelledby="final-cta-title">
    <div className={styles.closeOrbit} data-close-orbit aria-hidden="true" />
    <div className={styles.container}>
      <h2 id="final-cta-title">Make your<br /><span className={styles.closeWord}>next move.<span data-close-word aria-hidden="true">next move.</span></span></h2>
      <div className={styles.closeBottom}>
        <p>Your business has potential.<br />Let’s put a plan behind it.</p>
        <Link href="/contact" className={styles.button}>Book a Free Strategy Call <ArrowUpRight size={21} aria-hidden="true" /></Link>
      </div>
    </div>
  </section></div>;
}
