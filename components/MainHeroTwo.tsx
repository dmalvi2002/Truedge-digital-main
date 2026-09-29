"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Sora, IBM_Plex_Sans } from "next/font/google";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./MainHeroTwo.module.css";
import SplashCursor from "./SplashCursor";

const sora = Sora({ subsets: ["latin"], weight: ["500", "600", "700"] });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });
gsap.registerPlugin(useGSAP, ScrollTrigger);

const titleLetterStyle = (index: number) => ({
  "--letter-index": index,
  "--letter-x": index % 2 ? ".16em" : "-.16em",
  "--letter-x-back": index % 2 ? "-.072em" : ".072em",
  "--letter-x-settle": index % 2 ? ".029em" : "-.029em",
  "--letter-rotation": index % 2 ? "7deg" : "-7deg",
  "--float-y": index % 3 === 0 ? "-.11em" : index % 3 === 1 ? "-.055em" : ".025em",
  "--float-rotation": index % 2 ? "2deg" : "-2deg",
  "--float-return-rotation": index % 2 ? "-.7deg" : ".7deg",
  "--pop-order": (index * 7) % 27,
} as CSSProperties);

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
            <div className={styles.discoveryArt} aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="m7 16 6 6L26 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
            <div className={styles.artFooter}><span>HELP CUSTOMERS FIND YOU.</span></div>
          </div>
        </div>

        <div className={styles.webPosition} data-depth="web">
          <div className={`${styles.webStudy} ${styles.latestProjectCard} ${styles.latestProjectWebCard}`}>
            <Image
              src="https://res.cloudinary.com/dvvcwzp4n/image/upload/v1789243124/ebc13b6a-bd14-4520-a10d-b21d8d4abc64.png"
              alt="Truedge Digital's latest project"
              fill
              priority
              sizes="(max-width: 599px) calc(100vw - 40px), (max-width: 899px) 56vw, 46vw"
              className={styles.latestProjectImage}
            />
            <div className={styles.latestProjectEyebrow}>
              <span aria-hidden="true" />
              Our Latest Project
            </div>
          </div>
        </div>

        <div className={styles.brandPosition} data-depth="brand">
          <div className={styles.brandStudy}>
            <div className={styles.artMasthead}><span>GROW YOUR BUSINESS</span></div>
            <div className={styles.brandTitle}>More<br /><em className={styles.calls}>calls.</em><br />More<br /><em>enquiries.</em></div>
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
  const titleEntranceComplete = useRef(false);
  const titleEntering = useRef(false);
  const [titleAnimation, setTitleAnimation] = useState<number | null>(null);
  const nextTitleAnimation = useRef(0);
  const nextTitleHover = useRef(0);
  const titleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleCycleMs = 1800;

  useEffect(() => () => {
    if (titleTimer.current) clearTimeout(titleTimer.current);
  }, []);

  const animateTitle = () => {
    if (titleEntering.current) return;
    if (!window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    const now = performance.now();
    if (now < nextTitleHover.current) return;
    nextTitleHover.current = now + 2500;
    const animation = nextTitleAnimation.current;
    nextTitleAnimation.current = (animation + 1) % 4;
    setTitleAnimation(animation);
    titleTimer.current = setTimeout(() => {
      setTitleAnimation(null);
      titleTimer.current = null;
    }, titleCycleMs);
  };

  useGSAP(() => {
    // Independent of viewport breakpoints: resizing must not replay the entrance.
    const entranceMedia = gsap.matchMedia();
    entranceMedia.add("(prefers-reduced-motion: no-preference)", () => {
      if (titleEntranceComplete.current) return;
      titleEntering.current = true;
      const entrance = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          titleEntranceComplete.current = true;
          titleEntering.current = false;
        },
      });
      entrance
        .from("[data-title-first]", {
          x: -52, opacity: 0,
          clipPath: "inset(0 100% 0 0)",
          duration: 1.15,
          clearProps: "transform,opacity,clipPath",
        }, .05)
        .from("[data-title-second]", {
          x: 52, opacity: 0,
          duration: 1.2,
          clearProps: "transform,opacity",
        }, .22)
        .from("[data-enter-star]", {
          rotation: -220, scale: 0, opacity: 0,
          duration: 1.35, ease: "back.out(1.25)",
          clearProps: "transform,opacity",
        }, .3);
      return () => { titleEntering.current = false; };
    });
    return () => entranceMedia.revert();
  }, { scope: root });

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 1200px)", phone: "(max-width: 599px)" }, (context) => {
      if (!context.conditions?.motion) return;
      const desktop = context.conditions.desktop;
      gsap.from("[data-intro]", { y: 30, opacity: 0, duration: 1, stagger: .12, ease: "power3.out" });
      gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "65% top", scrub: .6 },
        defaults: { ease: "none" },
      })
        .to("[data-title-first]", { x: desktop ? -115 : 0, y: desktop ? -25 : 0, rotation: desktop ? -3 : 0 }, 0)
        .to("[data-title-second]", { x: desktop ? 115 : 0, y: desktop ? 30 : 0 }, 0)
        .to("[data-scene-light]", { scale: 1.4, opacity: 1 }, 0);

      // Phones use a normal-flow card grid; reserve the unfolding for larger screens.
      if (!context.conditions.phone) gsap.timeline({
        scrollTrigger: { trigger: "[data-scene]", start: "top 95%", end: "bottom 28%", scrub: .8, invalidateOnRefresh: true },
        defaults: { ease: "none" },
      })
        .fromTo('[data-depth="campaign"]',
          { xPercent: desktop ? 40 : 4, y: desktop ? 70 : 12, rotation: desktop ? 10 : 3, scale: desktop ? .86 : .96 },
          { xPercent: desktop ? -8 : 0, y: desktop ? -32 : 0, rotation: desktop ? -5 : 0, scale: 1 }, 0)
        .fromTo('[data-depth="web"]',
          { y: desktop ? 65 : 12, rotationX: desktop ? 13 : 5, scale: desktop ? .92 : .96 },
          { y: desktop ? -30 : 0, rotationX: 0, scale: desktop ? 1.04 : 1 }, 0)
        .fromTo('[data-depth="brand"]',
          { xPercent: desktop ? -40 : -4, y: desktop ? 95 : 12, rotation: desktop ? -12 : -3, scale: desktop ? .85 : .96 },
          { xPercent: desktop ? 8 : 0, y: desktop ? -60 : 0, rotation: desktop ? 5 : 0, scale: 1 }, 0);

      gsap.from("[data-capability]", {
        y: context.conditions.phone ? 0 : 35, opacity: 0, stagger: .12, duration: .7, ease: "power3.out",
        scrollTrigger: { trigger: "#hero-capabilities", start: "top 94%", once: true },
      });
    });
    return () => media.revert();
  }, { scope: root });

  return (
    <section ref={root} className={`${styles.hero} ${plex.className}`} aria-labelledby="hero-two-title">
      <div className={styles.ambient} aria-hidden="true" />
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
      <div className={styles.intro}>
        <div className={styles.headingWrap} data-heading>
          <h1 id="hero-two-title" aria-label="Digital Presence With an Edge" className={`${styles.title} ${sora.className} ${titleAnimation !== null ? styles.titleAnimating : ""} ${titleAnimation === 0 ? styles.titleAnimationOne : ""} ${titleAnimation === 1 ? styles.titleAnimationTwo : ""} ${titleAnimation === 2 ? styles.titleAnimationThree : ""} ${titleAnimation === 3 ? styles.titleAnimationFour : ""}`} onPointerEnter={animateTitle} style={{ "--title-cycle": `${titleCycleMs}ms` } as CSSProperties}>
            <span className={styles.firstLine} aria-hidden="true"><span data-title-first className={styles.titleLine}>{"Digital Presence".split("").map((letter, i) => <span key={i} data-enter-first className={styles.letter} style={titleLetterStyle(i)}>{letter === " " ? " " : letter}</span>)}</span></span>
            <span className={styles.secondLine} aria-hidden="true"><span data-title-second className={styles.titleLine}><Image src="/hero-star.png" alt="" width={60} height={60} data-enter-star className={styles.titleStar} draggable={false} />{"With an".split("").map((letter, i) => <span key={i} className={styles.letter} style={titleLetterStyle(i + 16)}>{letter === " " ? " " : letter}</span>)}{" "}<em data-edge-word className={styles.edgeWord}>{"edge".split("").map((letter, i) => <span key={i} className={styles.letter} style={titleLetterStyle(i + 23)}>{letter}</span>)}</em></span></span>
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
        <Link href="/marketing" data-capability><span>02</span><strong>Digital marketing</strong></Link>
        <Link href="/services" data-capability><span>03</span><strong>Search &amp; brand visibility</strong></Link>
      </div>
    </section>
  );
}
