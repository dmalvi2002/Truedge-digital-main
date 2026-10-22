"use client";

import { type PageContent } from "@/lib/sanity/content";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./AboutPage.module.css";
import AboutScrollHero from "./AboutScrollHero";

const display = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--about-display" });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });
gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = ["Web design", "Digital marketing", "SEO", "AI automation", "CRM & integrations", "Software & portals"];

export default function AboutPage({ content = {} }: { content?: PageContent } = {}) {
  const root = useRef<HTMLDivElement>(null);
  const story = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
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
      // Slide one solid background on the compositor; animating a full-screen
      // curved clip-path caused flashes while the pinned scene was repainted.
      gsap.set("[data-story-wash]", { yPercent: 100, force3D: true });
      const timeline = gsap.timeline({ defaults: { ease: "power2.inOut" }, scrollTrigger: { trigger: scene, start: "top top", end: () => `+=${window.innerHeight * 3}`, pin: true, anticipatePin: 1, scrub: .65, invalidateOnRefresh: true } });
      timeline.to(chapters[0], { opacity: 0, y: -25, duration: .3 }, .55)
        .to(fragments, { x: 0, y: 0, rotate: 0, scale: .55, opacity: 0, duration: .95, stagger: .055 }, .6)
        .to("[data-story-core]", { scale: 1, opacity: 1, rotate: 0, duration: 1.1 }, .85)
        .fromTo(chapters[1], { y: 30 }, { y: 0, opacity: 1, duration: .5 }, 1.1)
        .to("[data-story-core]", { rotate: 30, duration: .8 }, 1.9)
        .to(chapters[1], { opacity: 0, y: -20, duration: .3 }, 2.5)
        .to("[data-story-core]", { scale: 2.3, opacity: 0, duration: .8 }, 2.6)
        .to("[data-story-wash]", { yPercent: 0, ease: "power2.inOut", duration: 1.1 }, 2.65)
        .fromTo(chapters[2], { y: 35 }, { y: 0, opacity: 1, duration: .8 }, 3.35)
        .to({}, { duration: .9 });
      return () => scene.classList.remove(styles.storyEnhanced);
    });
    // The hero's responsive scroll track must be measured before story pinning.
    // Re-measure after fonts or viewport changes instead of retaining stale pin offsets.
    let refreshFrame = 0;
    const refresh = () => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    const hero = root.current?.firstElementChild;
    const observer = new ResizeObserver(refresh);
    if (hero) observer.observe(hero);
    refresh();
    return () => { observer.disconnect(); cancelAnimationFrame(refreshFrame); media.revert(); };
  }, { scope: root });

  return <div ref={root} className={`${styles.page} ${body.className} ${display.variable}`}>
    <AboutScrollHero content={content} />

    <section id="our-story" className={styles.story} aria-label="The Truedge story"><div ref={story} className={styles.storyStage}>
      <div className={styles.storyWash} data-story-wash aria-hidden="true" />
      <div className={`${styles.container} ${styles.storyInner}`}>
        <div className={styles.narrative}>
          <article className={styles.chapter} data-chapter><span className={styles.chapterAside}>It started with a frustration.</span><h2>All these services.<br /><em>Still miles apart.</em></h2><p>A website here. Marketing there. A different agency for SEO, automation or software. Business owners were left bringing it all together.</p><strong>We thought your time deserved better.</strong></article>
          <article className={styles.chapter} data-chapter><span className={styles.chapterAside}>So we brought them together.</span><h2>One team.<br /><em>The whole picture.</em></h2><p>That’s why we created Truedge Digital. Web design, marketing, SEO, AI automation and software integrations, working towards the same thing: your next step forward.</p><strong>Your one-stop partner for digital growth.</strong></article>
        </div>
        <div className={styles.constellation} aria-hidden="true"><div className={styles.fragmentField}>{services.map(service => <span key={service} className={styles.fragment} data-fragment><span>{service}</span><ArrowUpRight size={19} /></span>)}</div><div className={styles.storyCore} data-story-core><div className={styles.connectedMark}><Image src="/truedge-logo-white.svg" alt="" width={110} height={124} /><span>Everything,<br /><em>connected.</em></span></div></div></div>
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


  </div>;
}
