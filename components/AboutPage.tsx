"use client";

import { type PageContent } from "@/lib/sanity/content";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./AboutPage.module.css";

const display = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--about-display" });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });
gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = ["Web design", "Digital marketing", "SEO", "AI automation", "CRM & integrations", "Software & portals"];

/** Three interlocking bands: an original vector sculpture, not a video or WebGL scene. */
function TogetherSculpture({ id }: { id: string }) {
  return <svg viewBox="0 0 640 640" fill="none" className={styles.sculpture} aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-silver`} x1="130" y1="80" x2="460" y2="570" gradientUnits="userSpaceOnUse"><stop stopColor="#fffef5" /><stop offset=".35" stopColor="#999d91" /><stop offset=".55" stopColor="#f6f6e9" /><stop offset="1" stopColor="#41483e" /></linearGradient>
      <linearGradient id={`${id}-lilac`} x1="140" y1="180" x2="540" y2="500" gradientUnits="userSpaceOnUse"><stop stopColor="#f2e5ff" /><stop offset=".4" stopColor="#b49bcf" /><stop offset=".7" stopColor="#e1caf5" /><stop offset="1" stopColor="#604879" /></linearGradient>
      <linearGradient id={`${id}-lime`} x1="100" y1="330" x2="510" y2="390" gradientUnits="userSpaceOnUse"><stop stopColor="#6c9400" /><stop offset=".35" stopColor="#c1fb00" /><stop offset=".6" stopColor="#e1ff7d" /><stop offset="1" stopColor="#719d00" /></linearGradient>
    </defs>
    <g className={styles.bandOuter}><ellipse cx="320" cy="320" rx="178" ry="253" transform="rotate(-35 320 320)" stroke="#11140d" strokeWidth="62" /><ellipse cx="320" cy="313" rx="178" ry="253" transform="rotate(-35 320 313)" stroke={`url(#${id}-silver)`} strokeWidth="49" /><ellipse cx="320" cy="310" rx="178" ry="253" transform="rotate(-35 320 310)" stroke="#f5f5e6" strokeOpacity=".45" strokeWidth="1" /></g>
    <g className={styles.bandMiddle}><ellipse cx="320" cy="325" rx="258" ry="132" transform="rotate(35 320 325)" stroke="#292030" strokeWidth="62" /><ellipse cx="320" cy="317" rx="258" ry="132" transform="rotate(35 320 317)" stroke={`url(#${id}-lilac)`} strokeWidth="49" /><ellipse cx="320" cy="314" rx="258" ry="132" transform="rotate(35 320 314)" stroke="#f6eaff" strokeOpacity=".55" strokeWidth="1" /></g>
    <g className={styles.bandInner}><ellipse cx="320" cy="324" rx="252" ry="113" transform="rotate(-19 320 324)" stroke="#263206" strokeWidth="60" /><ellipse cx="320" cy="316" rx="252" ry="113" transform="rotate(-19 320 316)" stroke={`url(#${id}-lime)`} strokeWidth="47" /><ellipse cx="320" cy="312" rx="252" ry="113" transform="rotate(-19 320 312)" stroke="#e5ffa7" strokeOpacity=".7" strokeWidth="1" /></g>
  </svg>;
}

export default function AboutPage({ content = {} }: { content?: PageContent } = {}) {
  const root = useRef<HTMLDivElement>(null);
  const story = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-hero-line]", { yPercent: 110, rotate: 3, duration: 1.15, stagger: .14, ease: "power4.out" });
      gsap.from("[data-hero-sculpture]", { scale: .78, rotate: -18, opacity: 0, duration: 1.5, ease: "power3.out" });
      gsap.to("[data-hero-sculpture]", { rotate: 16, ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: .7 } });
      gsap.utils.toArray<HTMLElement>("[data-ink-reveal]", root.current).forEach(element => {
        gsap.fromTo(element, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "none", scrollTrigger: { trigger: element.parentElement, start: "top 85%", end: "bottom 50%", scrub: .4 } });
      });
      gsap.from("[data-founder-left]", { xPercent: -12, ease: "none", scrollTrigger: { trigger: "[data-founders]", start: "top 95%", end: "top 25%", scrub: .6 } });
      gsap.from("[data-founder-right]", { xPercent: 12, ease: "none", scrollTrigger: { trigger: "[data-founders]", start: "top 95%", end: "top 25%", scrub: .6 } });
      gsap.from("[data-meeting-mark]", { rotate: -45, scale: .5, ease: "none", scrollTrigger: { trigger: "[data-founders]", start: "top 95%", end: "top 25%", scrub: .6 } });
      gsap.utils.toArray<HTMLElement>("[data-promise-symbol]", root.current).forEach(element => {
        gsap.from(element, { yPercent: 18, rotate: -5, ease: "none", scrollTrigger: { trigger: element.closest("article"), start: "top bottom", end: "top 22%", scrub: .6 } });
      });
      gsap.from("[data-work-image]", { scale: 1.12, ease: "none", scrollTrigger: { trigger: "[data-work-reel]", start: "top 95%", end: "bottom 60%", scrub: .8 } });
    });
    media.add("(min-width: 1000px) and (min-height: 650px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const scene = story.current;
      if (!scene) return;
      scene.classList.add(styles.storyEnhanced);
      const chapters = scene.querySelectorAll<HTMLElement>("[data-chapter]");
      const fragments = scene.querySelectorAll<HTMLElement>("[data-fragment]");
      const positions = [[-135,-150,-15],[140,-180,10],[-200,10,8],[190,40,-9],[-130,170,-8],[150,190,12]];
      gsap.set(chapters, { opacity: 0 });
      gsap.set(chapters[0], { opacity: 1 });
      fragments.forEach((el, i) => gsap.set(el, { x: positions[i][0], y: positions[i][1], rotate: positions[i][2] }));
      gsap.set("[data-story-core]", { scale: .35, opacity: 0, rotate: -40 });
      gsap.set("[data-story-wash]", { clipPath: "inset(0 0 100% 0 round 0 0 50% 50%)" });
      const timeline = gsap.timeline({ defaults: { ease: "power2.inOut" }, scrollTrigger: { trigger: scene, start: "top 100px", end: () => `+=${window.innerHeight * 3}`, pin: true, scrub: .65, invalidateOnRefresh: true } });
      timeline.to(chapters[0], { opacity: 0, y: -25, duration: .3 }, .55)
        .to(fragments, { x: 0, y: 0, rotate: 0, scale: .55, opacity: 0, duration: .95, stagger: .055 }, .6)
        .to("[data-story-core]", { scale: 1, opacity: 1, rotate: 0, duration: 1.1 }, .85)
        .fromTo(chapters[1], { y: 30 }, { y: 0, opacity: 1, duration: .5 }, 1.1)
        .to("[data-story-core]", { rotate: 30, duration: .8 }, 1.9)
        .to(chapters[1], { opacity: 0, y: -20, duration: .3 }, 2.5)
        .to("[data-story-core]", { scale: 2.3, opacity: 0, duration: .8 }, 2.6)
        .to("[data-story-wash]", { clipPath: "inset(0 0 0% 0 round 0 0 0% 0%)", duration: .9 }, 2.65)
        .fromTo(chapters[2], { y: 60 }, { y: 0, opacity: 1, duration: .65 }, 3.1)
        .to({}, { duration: .65 });
      return () => scene.classList.remove(styles.storyEnhanced);
    });
    return () => media.revert();
  }, { scope: root });

  return <div ref={root} className={`${styles.page} ${body.className} ${display.variable}`}>
    <section className={styles.hero} data-hero aria-labelledby="about-title"><div className={`${styles.container} ${styles.heroInner}`}>
      <div className={styles.heroTop}><span>Independent minds. Shared ambition.</span><span>Aberdeen, UK</span></div>
      <h1 id="about-title">{content.h1Heading ? <span className={styles.lineMask}><span data-hero-line>{content.h1Heading}</span></span> : <><span className={styles.lineMask}><span data-hero-line>Great things</span></span><span className={styles.lineMask}><span data-hero-line>happen <em>together.</em></span></span></>}</h1>
      <div className={styles.heroSculpture} data-hero-sculpture><TogetherSculpture id="hero" /></div>
      <div className={styles.heroBottom}><a href="#our-story" className={styles.scrollLink}><span className={styles.roundArrow}><ArrowDown size={22} aria-hidden="true" /></span><span>There’s a reason<br />we came together.</span></a><div className={styles.heroIntro}><p>{content.heroSubheading || "Your website. Your marketing. Your next big idea. One team that sees how it all connects."}</p><Link href="/contact" className={styles.textLink}>Meet your digital growth partner <ArrowUpRight size={19} aria-hidden="true" /></Link></div></div>
    </div></section>

    <section id="our-story" className={styles.story} aria-label="The Truedge story"><div ref={story} className={styles.storyStage}>
      <div className={styles.storyWash} data-story-wash aria-hidden="true" />
      <div className={`${styles.container} ${styles.storyInner}`}>
        <div className={styles.narrative}>
          <article className={styles.chapter} data-chapter><span className={styles.chapterAside}>It started with a frustration.</span><h2>All these services.<br /><em>Still miles apart.</em></h2><p>A website here. Marketing there. A different agency for SEO, automation or software. Business owners were left bringing it all together.</p><strong>We thought your time deserved better.</strong></article>
          <article className={styles.chapter} data-chapter><span className={styles.chapterAside}>So we brought them together.</span><h2>One team.<br /><em>The whole picture.</em></h2><p>That’s why we created Truedge Digital. Web design, marketing, SEO, AI automation and software integrations, working towards the same thing: your next step forward.</p><strong>Your one-stop partner for digital growth.</strong></article>
        </div>
        <div className={styles.constellation} aria-hidden="true"><div className={styles.fragmentField}>{services.map(service => <span key={service} className={styles.fragment} data-fragment><span>{service}</span><ArrowUpRight size={19} /></span>)}</div><div className={styles.storyCore} data-story-core><TogetherSculpture id="story" /></div></div>
        <article className={`${styles.chapter} ${styles.chapterFinal}`} data-chapter><span className={styles.chapterAside}>And kept one thing at the centre.</span><h2>Your business.<br /><em>Always.</em></h2><div><p>Thoughtful strategy. Robust development. Dependable support. We put the work in to make your investment count.</p><p>The right services, carefully delivered.<br />With people who care as much as you do.</p></div><ArrowUpRight className={styles.finalArrow} size={130} strokeWidth={1} aria-hidden="true" /></article>
      </div>
    </div></section>

    <section id="people" className={styles.people} aria-labelledby="people-title"><div className={styles.container}>
      <div className={styles.peopleHeading}><h2 id="people-title">Different minds.<br /><span className={styles.inkWord}>The same drive.<span data-ink-reveal aria-hidden="true">The same drive.</span></span></h2><p>When two people share the same ambition, something clicks. For us, it was a belief that great digital services should be easier to access, easier to connect and fairly priced.</p></div>
      <div className={styles.founders} data-founders><article className={styles.founder} data-founder-left><span className={styles.founderWord} aria-hidden="true">Vision.</span><div><h3>Shovon<br />Mostofa</h3><p>Managing Director</p></div><span className={styles.founderSide}>The ambition to bring it together.</span></article><div className={styles.meetingMark} data-meeting-mark aria-hidden="true">&amp;</div><article className={styles.founder} data-founder-right><span className={styles.founderWord} aria-hidden="true">Craft.</span><div><h3>Abu Bakar<br />Siddique DM</h3><p>Technical Director</p></div><span className={styles.founderSide}>The drive to make it work.</span></article></div>
      <div className={styles.peopleStatement}><p>We built Truedge for people<br />who are <span className={styles.inkWord}>building something.<span data-ink-reveal aria-hidden="true">building something.</span></span></p><span>People like you.</span></div>
    </div></section>

    <section className={styles.promises} aria-labelledby="promise-title"><div className={`${styles.container} ${styles.promiseHeading}`}><h2 id="promise-title">Our word.<br /><em>Backed by our work.</em></h2><p>A good partnership is built on what happens after the first conversation.</p></div>
      <div className={styles.promiseStack}>
        <article className={`${styles.promiseScene} ${styles.replyScene}`}><div className={`${styles.container} ${styles.promiseInner}`}><div className={styles.promiseVisual} aria-hidden="true"><span data-promise-symbol>8<small>h</small></span><span className={styles.visualAnnotation}>A response. Guaranteed.</span></div><div className={styles.promiseCopy}><h3>You shouldn’t<br />have to <em>chase.</em></h3><p>We guarantee a response within 8 hours. A real reply, a clear update, and people who take your questions seriously.</p><span>Your time matters to us.</span></div></div></article>
        <article className={`${styles.promiseScene} ${styles.deliveryScene}`}><div className={`${styles.container} ${styles.promiseInner}`}><div className={styles.promiseVisual} aria-hidden="true"><span data-promise-symbol>100<small>%</small></span><span className={styles.visualAnnotation}>Committed to the date we agree.</span></div><div className={styles.promiseCopy}><h3>On time.<br /><em>On your side.</em></h3><p>We’re 100% committed to the timeline we agree with you. Clear milestones and regular updates mean you know what’s happening, and what comes next.</p><span>A promise we plan around.</span></div></div></article>
        <article className={`${styles.promiseScene} ${styles.careScene}`}><div className={`${styles.container} ${styles.promiseInner}`}><div className={styles.careVisual} aria-hidden="true"><span data-promise-symbol>Made<br /><em>with care.</em></span></div><div className={styles.promiseCopy}><h3>Every detail.<br /><em>Worth the effort.</em></h3><p>Thoughtful design. Reliable builds. Thorough checks. We put care into the things you see, and the things you depend on.</p><span>High standards. Down-to-earth pricing.</span><Link href="/pricing" className={styles.textLink}>See our starting prices <ArrowUpRight size={19} aria-hidden="true" /></Link></div></div></article>
      </div>
    </section>

    <section className={styles.proof} aria-labelledby="proof-title"><div className={styles.container}><div className={styles.proofHeading}><h2 id="proof-title">Good company.<br /><em>In every sense.</em></h2><div><p>From education to sport, and businesses built from the ground up. Different ambitions. The same care.</p><Link href="/works" className={styles.textLink}>View our work <ArrowUpRight size={20} aria-hidden="true" /></Link></div></div><div className={styles.workReel} data-work-reel>
      <Link href="/works" className={styles.sportWork}><span className={styles.workBackdrop} aria-hidden="true">WATT</span><Image src="/assets/works/sanchez-arsenal.webp" alt="Sanchez Watt in his Arsenal kit" width={780} height={1100} className={styles.athlete} data-work-image sizes="(max-width: 650px) 90vw, 45vw" /><div className={styles.workCaption}><span>Sanchez Watt<small>Sport. Personality. Possibility.</small></span><span className={styles.workArrow}><ArrowUpRight size={24} aria-hidden="true" /></span></div></Link>
      <Link href="/works" className={styles.collegeWork}><Image src="/assets/works/nelson-community.webp" alt="The Nelson College London community" fill sizes="(max-width: 650px) 90vw, 45vw" data-work-image /><div className={styles.workCaption}><span>Nelson College London<small>A place for ambition.</small></span><span className={styles.workArrow}><ArrowUpRight size={24} aria-hidden="true" /></span></div></Link>
    </div><div className={styles.proofFoot}><Image src="/assets/walker-logo.webp" alt="Walker Roofing" width={130} height={55} /><span>Independent businesses. Established names.<br />Relationships we’re proud to be part of.</span></div></div></section>

    <section className={styles.closing} aria-labelledby="about-cta"><div className={styles.container}><div className={styles.closingTop}><p>You bring the ambition.<br />We’ll bring the team.</p><span>Aberdeen, United Kingdom</span></div><h2 id="about-cta">What’s <em>next?</em></h2><div className={styles.closingBottom}><p>Tell us what you have in mind.<br />Let’s find the right way forward, together.</p><Link href="/contact" className={styles.closingCta}><span>Book a free<br />strategy call</span><ArrowUpRight size={34} strokeWidth={1.5} aria-hidden="true" /></Link></div><span className={styles.noPressure}>A friendly conversation. No obligation.</span></div></section>
  </div>;
}
