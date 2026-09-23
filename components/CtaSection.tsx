"use client";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Sora } from "next/font/google";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ScrollRippleTitle from "./ScrollRippleTitle";
import styles from "./ClosingSections.module.css";
gsap.registerPlugin(useGSAP, ScrollTrigger);
const sora = Sora({ subsets: ["latin"], weight: ["400","500","600","700","800"] });
export default function CtaSection() {
  const section = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-cta-orbit]", { rotate: -24, scale: .78, y: 70 }, { rotate: 24, scale: 1.15, y: -70, ease: "none", scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom top", scrub: 1.5 } });
      gsap.from("[data-cta-invitation]", { y: 35, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: "[data-cta-invitation]", start: "top 92%", once: true } });
    });
    return () => media.revert();
  }, { scope: section });
  return <section ref={section} className={`${styles.cta} ${sora.className}`} aria-labelledby="final-cta-title">
    <div className={styles.orbit} data-cta-orbit aria-hidden="true"><span /><span /><span /></div>
    <div className={styles.container}>
      <div className={styles.ctaIntro}><span>Better things start with a conversation.</span><span>Truedge Digital</span></div>
      <ScrollRippleTitle id="final-cta-title" text="Give your business the edge it deserves." className={styles.ctaTitle} activeColor="#d2f83a" baseColor="rgba(210,248,58,.2)" accentColor="#ffffff" />
      <div className={styles.invitation} data-cta-invitation>
        <p>You’ve built something worth noticing.<br />Let’s help the right people find it.</p>
        <Link href="/contact" className={styles.ctaButton}><span>Let’s talk about your business</span><ArrowUpRight aria-hidden="true" /></Link>
      </div>
      <div className={styles.ctaFooter}><span>Web design & development</span><span>Digital marketing</span><span>Search & brand visibility</span></div>
    </div>
  </section>;
}
