"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { DM_Sans, Plus_Jakarta_Sans, Barlow_Condensed } from "next/font/google";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { otherWorks } from "@/lib/works";
import styles from "./WorksPage.module.css";
import walker from "@/public/assets/web-design-project.webp";
import sanchez from "@/public/assets/works/sanchez-arsenal.webp";
import nelson from "@/public/assets/works/nelson-community.webp";
import football from "@/public/assets/works/football.webp";

const display = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--works-display" });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });
const sport = Barlow_Condensed({ subsets: ["latin"], weight: ["700", "800"], variable: "--works-sport" });
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function WorksPage() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 1100px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-works-intro]", { y: 38, opacity: 0, duration: 1, stagger: .12, ease: "power3.out" });
      const scene = gsap.timeline({ scrollTrigger: { trigger: "[data-sport-scene]", start: "top 85%", once: true } });
      scene.from("[data-sport-copy]", { y: 35, opacity: 0, duration: .9, ease: "power3.out" })
        .from("[data-athlete]", { x: 90, rotate: -5, opacity: 0, duration: 1.25, ease: "power3.out" }, .15)
        .from("[data-sport-type]", { xPercent: -12, opacity: 0, duration: 1.2 }, .05);
      gsap.to("[data-athlete-depth]", { yPercent: -7, ease: "none", scrollTrigger: { trigger: "[data-sport-scene]", start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to("[data-sport-type]", { xPercent: 8, ease: "none", scrollTrigger: { trigger: "[data-sport-scene]", start: "top top", end: "bottom top", scrub: 1 } });
      const ball = root.current?.querySelector<HTMLElement>("[data-football]");
      if (ball) {
        const travel = () => ball.offsetWidth + parseFloat(getComputedStyle(ball).right) + 40;
        // Hold its place until the lower edge enters view, then roll beyond the clipped edge.
        gsap.to(ball, {
          x: travel,
          rotation: () => travel() / (Math.PI * ball.offsetWidth) * 360,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-sport-scene]",
            start: "bottom 82%",
            end: "bottom 38%",
            scrub: .6,
            invalidateOnRefresh: true,
          },
        });
      }
      gsap.utils.toArray<HTMLElement>("[data-work-reveal]").forEach((element) => {
        gsap.from(element, { y: 34, opacity: 0, duration: .85, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 92%", once: true } });
      });
      gsap.fromTo("[data-college-photo]", { scale: 1.06 }, { scale: 1, ease: "none", scrollTrigger: { trigger: "[data-college-scene]", start: "top 90%", end: "bottom 60%", scrub: 1 } });
    });
    return () => media.revert();
  }, { scope: root });

  return <div ref={root} className={`${styles.page} ${body.className} ${display.variable} ${sport.variable}`}>
    <section className={`${styles.container} ${styles.hero}`} aria-labelledby="works-title">
      <h1 id="works-title" data-works-intro>Good work.<br /><span>Real businesses.</span></h1>
      <div className={styles.heroAside} data-works-intro><p>From a former Arsenal player to established businesses. Take a closer look at the people we work with and the experiences we create.</p><div className={styles.actions}><Link href="/contact" className={styles.primary}>Let’s talk about your project <ArrowUpRight size={20} /></Link><a href="#selected-work" className={styles.textLink}>Explore the work <ArrowDown size={18} /></a></div></div>
    </section>

    <div className={styles.container} id="selected-work">
      <section className={styles.sportCard} data-sport-scene aria-labelledby="sanchez-title">
        <span className={styles.sportBackdrop} data-sport-type aria-hidden="true">WATT</span>
        <div className={styles.sportCopy} data-sport-copy>
          <h2 id="sanchez-title">SANCHEZ<br />WATT<span>.</span></h2>
          <p className={styles.sportDescription}>A big personality.<br />A website to match.</p>
          <p className={styles.sportDetail}>Former Arsenal player. Coach. Mentor. A distinctive digital home for Sanchez’s coaching and mentoring, with an integrated booking journey that makes the next step simple.</p>
          <a href="https://www.sanchezwatt.com/" target="_blank" rel="noopener noreferrer" className={styles.sportButton}>Check out his website <ArrowUpRight size={20} /></a>
          <span className={styles.sportCredit}>Website design &amp; development · Booking integration</span>
        </div>
        <div className={styles.athleteDepth} data-athlete-depth><div className={styles.athlete} data-athlete><Image src={sanchez} alt="Sanchez Watt playing in his Arsenal kit" sizes="(max-width: 700px) 90vw, 55vw" priority /></div></div>
        <div className={styles.football} data-football aria-hidden="true"><Image src={football} alt="" sizes="(max-width: 650px) 84px, 140px" /></div>
      </section>

      <section className={styles.collegeCard} data-college-scene aria-labelledby="nelson-title">
        <div className={styles.collegeHeader} data-work-reveal><div><Image src="/assets/nelson-college-logo.svg" alt="Nelson College London" width={210} height={80} /><h2 id="nelson-title">A place for<br /><em>ambition.</em></h2></div><div className={styles.collegeCopy}><h3>Nelson College London</h3><p>We’re proud to count Nelson College London among our clients. A partnership in higher education, with people and their ambitions at its heart.</p><a href="https://nelsoncollege.ac.uk/" target="_blank" rel="noopener noreferrer" className={styles.lightLink}>Explore the college <ArrowUpRight size={20} /></a></div></div>
        <figure className={styles.collegeFigure}><div className={styles.collegeImage}><Image src={nelson} alt="Nelson College London community gathered at a ribbon-cutting event" sizes="(max-width: 700px) 92vw, 90vw" placeholder="blur" data-college-photo /></div><figcaption>Nelson College London <span>Higher education · London</span></figcaption></figure>
      </section>

      <section className={styles.walkerCard} aria-labelledby="walker-title">
        <div className={styles.walkerCopy} data-work-reveal><h2 id="walker-title">Craft on site.<br /><em>Confidence online.</em></h2><h3>Walker Roofing &amp;<br />Building Contractors</h3><p>A confident website that puts the quality of the work first. Clear services, architectural photography and a direct route to request a quote.</p><Link href="/contact?project=walker" className={styles.primary}>Build a website for my business <ArrowUpRight size={20} /></Link></div>
        <div className={styles.walkerVisual} data-work-reveal><Image src={walker} alt="Walker Building Contractors website showcasing roofing services and a modern metal roof" sizes="(max-width: 900px) 92vw, 60vw" placeholder="blur" /></div>
      </section>
    </div>

    <section className={`${styles.container} ${styles.moreWork}`} aria-labelledby="more-work-title">
      <div className={styles.sectionHeading} data-work-reveal><h2 id="more-work-title">Different sectors.<br /><span>The same care.</span></h2><p>Every business has its own audience, priorities and personality. Its website should reflect that.</p></div>
      <div className={styles.workGrid}>{otherWorks.map((work) => <article key={work.name} className={styles.workCard} data-work-reveal>
        <a href={work.href} target="_blank" rel="noopener noreferrer" className={styles.workImage} aria-label={`${work.action}: ${work.name}`}><Image src={`/assets/works/${work.image}.webp`} alt={`${work.name} website preview`} width={1200} height={800} sizes="(max-width: 700px) 90vw, 45vw" /></a>
        <div className={styles.workContent}><p className={styles.category}>{work.category}</p><h3>{work.name}</h3><p>{work.description}</p><a href={work.href} target="_blank" rel="noopener noreferrer" className={styles.textLink}>{work.action} <ArrowUpRight size={18} /></a>{work.note && <small>{work.note}</small>}</div>
      </article>)}</div>
    </section>

    <section className={styles.closing} aria-labelledby="works-cta-title"><div className={`${styles.container} ${styles.closingInner}`}><div data-work-reveal><h2 id="works-cta-title">Your business.<br /><span>Our next great project.</span></h2><p>Tell us what you want to build. We’ll help you work out the right next step.</p><div className={styles.actions}><Link href="/contact" className={styles.primary}>Let’s talk about your project <ArrowUpRight size={20} /></Link><Link href="/pricing" className={styles.textLink}>See packages &amp; pricing <ArrowUpRight size={18} /></Link></div></div><div className={styles.closingNote}><span>From the first conversation<br />to the final detail.</span><p>Design, development and ongoing support, brought together for your business.</p></div></div></section>
  </div>;
}
