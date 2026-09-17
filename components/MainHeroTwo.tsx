"use client";

import { useRef, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Sora, IBM_Plex_Sans } from "next/font/google";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./MainHeroTwo.module.css";

const sora = Sora({ subsets: ["latin"], weight: ["500", "600", "700"] });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });
gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Business benefits presented in the established layered visual style. */
function DesignScene() {
  return (
    <div className={styles.scene} data-scene>
      <div className={styles.light} data-scene-light />
      <div className={styles.stage}>
        <div className={styles.campaignPosition} data-depth="campaign">
          <div className={styles.campaign}>
            <div className={styles.artMasthead}><span>REACH THE RIGHT PEOPLE</span></div>
            <div className={styles.campaignTitle}>Get found.<br /><span>Get</span><br /><span>chosen.</span></div>
            <svg className={styles.campaignGraphic} aria-hidden="true" viewBox="0 0 300 220" fill="none">
              <path d="M-30 200 82 88l65 65L310-10" stroke="#d2f83a" strokeWidth="64" />
              <path d="m189-10 120 0 0 120" stroke="#d2f83a" strokeWidth="34" />
            </svg>
            <div className={styles.artFooter}><span>HELP CUSTOMERS FIND YOU.</span></div>
          </div>
        </div>

        <div className={styles.webPosition} data-depth="web">
          <div className={styles.webStudy}>
            <div className={styles.webNav}><span className={styles.studyLogo}>Your Brand</span><span className={styles.cardIntro}>Your business, online.</span></div>
            <div className={styles.webBody}>
              <div className={styles.webCopy}><h2>Your business.<br /><em>Their first choice.</em></h2><p className={styles.benefitDescription}>A professional website that builds trust and makes it easy for customers to get in touch.</p></div>
              <div className={styles.webArtwork}>
                <svg data-object aria-hidden="true" viewBox="0 0 320 380" fill="none">
                  <defs>
                    <linearGradient id="hero-study-metal" x1="56" y1="78" x2="261" y2="300" gradientUnits="userSpaceOnUse"><stop stopColor="#f7ffe5" /><stop offset=".2" stopColor="#9daf65" /><stop offset=".39" stopColor="#343e1c" /><stop offset=".55" stopColor="#edf5ce" /><stop offset=".75" stopColor="#899c4c" /><stop offset="1" stopColor="#202812" /></linearGradient>
                    <linearGradient id="hero-study-edge" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e0edb0" /><stop offset="1" stopColor="#546434" /></linearGradient>
                  </defs>
                  <ellipse cx="163" cy="333" rx="99" ry="11" fill="#38431c" opacity=".2" />
                  <path d="M82 298V134c0-53 33-88 79-88s79 35 79 88v164h-51V138c0-23-10-39-28-39s-28 16-28 39v160Z" fill="url(#hero-study-metal)" stroke="url(#hero-study-edge)" strokeWidth="2" />
                  <path d="M110 302V142c0-41 20-68 51-68s51 27 51 68v160" stroke="#f1ffd6" strokeOpacity=".55" strokeWidth="2" />
                  <ellipse cx="107" cy="300" rx="25" ry="6" fill="#afbf7c" /><ellipse cx="215" cy="300" rx="25" ry="6" fill="#75864e" />
                  <path d="M86 132c0-48 31-83 75-83" stroke="#fff" strokeOpacity=".65" strokeWidth="3" />
                </svg>
                <span className={styles.objectNumber}>Attract the right customers.</span>
              </div>
            </div>
            <div className={styles.webFooter}><span>Look professional.</span><span>Build trust.</span><span>Win enquiries.</span></div>
          </div>
        </div>

        <div className={styles.brandPosition} data-depth="brand">
          <div className={styles.brandStudy}>
            <div className={styles.artMasthead}><span>GROW YOUR BUSINESS</span></div>
            <div className={styles.brandTitle}>More<br /><em>calls.</em><br />More<br /><em>enquiries.</em></div>
            <div className={styles.brandMark} aria-hidden="true"><svg viewBox="0 0 100 100" fill="none"><path d="M12 88 88 12M12 12h76v76" stroke="currentColor" strokeWidth="13" /></svg></div>
            <div className={styles.artFooter}><span>MAKE IT EASY TO CHOOSE YOU.</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MainHeroTwo() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 900px)" }, (context) => {
      if (!context.conditions?.motion) return;
      const desktop = context.conditions.desktop;
      gsap.from("[data-intro]", { y: 30, opacity: 0, duration: 1, stagger: .12, ease: "power3.out" });
      gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "65% top", scrub: .6 },
        defaults: { ease: "none" },
      })
        .to("[data-title-first]", { x: desktop ? -115 : -18, y: -25, rotation: -3 }, 0)
        .to("[data-title-second]", { x: desktop ? 115 : 18, y: 30 }, 0)
        .to("[data-scene-light]", { scale: 1.4, opacity: 1 }, 0);

      // Unfold the artwork as it enters the viewport; no scroll locking.
      gsap.timeline({
        scrollTrigger: { trigger: "[data-scene]", start: "top 95%", end: "bottom 28%", scrub: .8, invalidateOnRefresh: true },
        defaults: { ease: "none" },
      })
        .fromTo('[data-depth="campaign"]',
          { xPercent: desktop ? 40 : 12, y: 70, rotation: 10, scale: .86 },
          { xPercent: desktop ? -8 : -3, y: -32, rotation: -5, scale: 1 }, 0)
        .fromTo('[data-depth="web"]',
          { y: 65, rotationX: 13, scale: .92 },
          { y: -30, rotationX: 0, scale: 1.04 }, 0)
        .fromTo('[data-depth="brand"]',
          { xPercent: desktop ? -40 : -12, y: 95, rotation: -12, scale: .85 },
          { xPercent: desktop ? 8 : 3, y: -60, rotation: 5, scale: 1 }, 0)
        .fromTo("[data-object]", { y: 16, rotation: -9 }, { y: -15, rotation: 9 }, 0);

      gsap.from("[data-capability]", {
        y: 35, opacity: 0, stagger: .12, duration: .7, ease: "power3.out",
        scrollTrigger: { trigger: "#hero-capabilities", start: "top 94%", once: true },
      });
    });
    return () => media.revert();
  }, { scope: root });

  return (
    <section ref={root} className={`${styles.hero} ${plex.className}`} aria-labelledby="hero-two-title">
      <div className={styles.ambient} aria-hidden="true" />
      <div className={styles.intro}>
        <div className={styles.headingWrap} data-heading>
          <h1 id="hero-two-title" aria-label="Digital Presence With an Edge" className={`${styles.title} ${sora.className}`}>
            <span className={styles.firstLine} data-intro aria-hidden="true"><span data-title-first className={styles.titleLine}>{"Digital Presence".split("").map((letter, i) => <span key={i} className={styles.letter} style={{ "--letter-index": i } as CSSProperties}>{letter === " " ? " " : letter}</span>)}</span></span>
            <span className={styles.secondLine} data-intro aria-hidden="true"><span data-title-second className={styles.titleLine}>With an <em className={styles.edgeWord}>{"edge".split("").map((letter, i) => <span key={i} className={styles.letter} style={{ "--letter-index": i + 3 } as CSSProperties}>{letter}</span>)}</em></span></span>
          </h1>
        </div>
        <div className={styles.introBottom} data-intro>
          <p>We help more customers find you, trust you and choose you. We build professional websites and manage your marketing, so you can focus on running your business.</p>
          <div className={styles.actions}>
            <Link href="/contact" className={styles.cta}><span>Book a Free Strategy Call</span><span className={styles.ctaIcon} aria-hidden="true"><ArrowUpRight size={21} /></span></Link>
          </div>
        </div>
      </div>

      <DesignScene />

      <div id="hero-capabilities" className={styles.capabilities}>
        <Link href="/services" data-capability><span>01</span><strong>Web design &amp; development</strong></Link>
        <Link href="/growth" data-capability><span>02</span><strong>Digital marketing</strong></Link>
        <Link href="/services" data-capability><span>03</span><strong>Search &amp; brand visibility</strong></Link>
      </div>
    </section>
  );
}
