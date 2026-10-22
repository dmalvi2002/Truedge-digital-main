"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import ScrollExpand from "./ScrollExpand";
import type { PageContent } from "@/lib/sanity/content";
import ambition from "@/public/assets/about-shared-ambition.webp";
import styles from "./AboutScrollHero.module.css";

export default function AboutScrollHero({ content }: { content: PageContent }) {
  return <section className={styles.hero} aria-labelledby="about-title">
    <div className={styles.intro}>
      <div className={styles.topline}><span>About Truedge Digital</span><span>Aberdeen, UK. Thinking beyond.</span></div>
      <h1 id="about-title">{content.h1Heading || <><span>Different minds.</span><span className={styles.accent}>One shared ambition.</span></>}</h1>
      <div className={styles.introBottom}>
        <a href="#about-showcase" className={styles.scrollCue}><span className={styles.arrowCircle}><ArrowDown size={20} aria-hidden="true" /></span><span>See what happens<br /> when it comes together.</span></a>
        <p>{content.heroSubheading || "Your website. Your marketing. The tools that move you forward. One connected team, built around your business."}</p>
        <Link href="/contact" className={styles.contact}>Let’s talk about your ambition <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </div>
    <div id="about-showcase" className={styles.showcase}>
      <ScrollExpand useWindowScroll startWidth={84} startHeight={86} startRadius={26} endRadius={0} mediaZoom={1} scrollDistance={.9} holdDistance={.32} smoothing={.045} overlayScrim={.96} mediaContent={<Image src={ambition} alt="Three architectural paths meeting at one sunlit opening, representing a shared ambition" fill sizes="100vw" priority className={styles.heroImage} />} className={styles.expand} aria-label="Different expertise, one shared direction">
        <div className={styles.reveal}>
          <span className={styles.revealLabel}>The whole picture. One partner.</span>
          <h2>Built together.<br /><em>Made to matter.</em></h2>
          <p>Different businesses. Different goals.<br />The same care in every detail.</p>
          <Link href="/works" className={styles.workLink}>View our work <span><ArrowUpRight size={23} aria-hidden="true" /></span></Link>
        </div>
      </ScrollExpand>
    </div>
    <div className={styles.bridge}><span>Design. Marketing. Technology.</span><a href="#our-story">And the people who bring it together <ArrowDown size={18} aria-hidden="true" /></a></div>
  </section>;
}
