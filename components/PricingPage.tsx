"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { DM_Sans, IBM_Plex_Sans, Plus_Jakarta_Sans, Barlow_Condensed } from "next/font/google";
import { ArrowUpRight, Check, LayoutTemplate, Megaphone, Search, Plus, ArrowDown, Palette, Bot, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ceoMessage, serviceDetails, pricingQuestions } from "@/lib/pricing-page";
import { useGSAP } from "@gsap/react";
import heroStyles from "./MainHeroTwo.module.css";
import styles from "./PricingPage.module.css";
import sanchez from "@/public/assets/works/sanchez-arsenal.webp";
import nelson from "@/public/assets/works/nelson-community.webp";
import { pricingEnquiryHref } from "@/lib/pricing";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const display = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--pricing-display" });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

const offers = [
  { id: "web-design", name: "Web Design", price: 120, billing: "one-off", offer: "web-starter", theme: "cream", icon: LayoutTemplate, description: "A single-page website with your services, contact details and an enquiry form. Built for mobile and desktop." },
  { id: "marketing", name: "Paid Marketing", price: 200, billing: "per month", offer: "marketing-starter", theme: "lavender", icon: Megaphone, description: "One focused ad campaign, audience targeting, regular checks and a monthly report. Ad spend is separate." },
  { id: "seo", name: "SEO", price: 150, billing: "per month", offer: "seo-starter", theme: "lime", icon: Search, description: "A website review, keyword research and improvements to three priority pages, with a monthly progress summary." },
  { id: "content-creation", name: "Monthly Content", price: 100, billing: "per month", offer: "content-starter", theme: "lavender", icon: Palette, description: "Custom marketing leaflets, social video editing and regular organic posts to keep your brand active." },
  { id: "ai-automation", name: "AI Automation", price: 300, billing: "per month", offer: "ai-starter", theme: "lime", icon: Bot, description: "Social media & website automations, agentic AI voice calls and chatbots. AI token costs are separate." },
  { id: "ai-saas", name: "AI SaaS Software", price: 1500, billing: "one-off", offer: "saas-starter", theme: "cream", icon: Sparkles, description: "Bespoke full-stack AI web apps and custom logic. Requires ongoing monthly hosting and maintenance management." },
];

const sport = Barlow_Condensed({ subsets: ["latin"], weight: ["700", "800"], variable: "--pricing-sport" });

export default function PricingPage() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Existing hero links now open the matching service disclosure.
    const revealLinkedService = () => {
      const id = window.location.hash.slice(1);
      const disclosure = Array.from(root.current?.querySelectorAll<HTMLDetailsElement>("details[id]") ?? []).find((item) => item.id === id);
      if (disclosure) {
        disclosure.open = true;
        requestAnimationFrame(() => disclosure.scrollIntoView({ block: "start" }));
      }
    };
    revealLinkedService();
    window.addEventListener("hashchange", revealLinkedService);
    return () => window.removeEventListener("hashchange", revealLinkedService);
  }, []);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 1100px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const opening = gsap.timeline({ defaults: { ease: "power3.out" } });
      opening.from("[data-price-line]", { yPercent: 115, rotate: 2, duration: 1.15, stagger: .14 }, .1)
        .from("[data-price-intro]", { opacity: 0, y: 24, duration: .8 }, .5)
        .from("[data-price-panel]", { clipPath: "inset(100% 0 0 0 round 18px)", y: 45, duration: 1.2, stagger: .16, ease: "power4.inOut" }, .45)
        .from("[data-price-content]", { y: 30, opacity: 0, duration: .9, stagger: .15 }, .95)
        .from("[data-price-note]", { y: 12, opacity: 0, duration: .7 }, 1.6);

    });
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-client-heading] > *", {
        y: 45, opacity: 0, duration: 1, stagger: .12, ease: "power3.out",
        scrollTrigger: { trigger: "[data-client-heading]", start: "top 84%", once: true },
      });
      gsap.from("[data-client-card]", {
        y: 80, scale: .94, clipPath: "inset(12% 0 0 0 round 24px)", opacity: 0,
        duration: 1.25, stagger: .16, ease: "power4.out",
        scrollTrigger: { trigger: "[data-client-grid]", start: "top 86%", once: true },
      });
      gsap.to("[data-client-athlete]", {
        yPercent: -7, ease: "none",
        scrollTrigger: { trigger: "[data-client-grid]", start: "top bottom", end: "bottom top", scrub: .8 },
      });
      gsap.to("[data-client-photo]", {
        yPercent: 5, scale: 1.08, ease: "none",
        scrollTrigger: { trigger: "[data-client-grid]", start: "top bottom", end: "bottom top", scrub: .8 },
      });
      gsap.from("[data-ceo-heading] > *", {
        yPercent: 70, opacity: 0, duration: 1.05, stagger: .1, ease: "power4.out",
        scrollTrigger: { trigger: "[data-ceo-heading]", start: "top 82%", once: true },
      });
      gsap.utils.toArray<HTMLElement>("[data-ceo-paragraph]", root.current).forEach((paragraph) => {
        // Continuous masks reveal letters with only one tween per word.
        const words = paragraph.querySelectorAll("[data-word-light]");
        gsap.set(words, { clipPath: "inset(0 100% 0 0)" });
        gsap.to(words, {
          clipPath: "inset(0 0% 0 0)", duration: 1, stagger: 1, ease: "none",
          scrollTrigger: { trigger: paragraph, start: "top 82%", end: "bottom 48%", scrub: .35, invalidateOnRefresh: true },
        });
      });
    });
    media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-ceo-depth]", { y: 32, rotateX: 3, z: -35 }, {
        y: -12, rotateX: 0, z: 0, ease: "none",
        scrollTrigger: { trigger: "[data-ceo-section]", start: "top bottom", end: "bottom top", scrub: .8 },
      });
    });
    media.add("(min-width: 651px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-expertise-heading] > *", {
        y: 55, opacity: 0, duration: 1, stagger: .12, ease: "power3.out",
        scrollTrigger: { trigger: "[data-expertise-heading]", start: "top 84%", once: true },
      });
      gsap.utils.toArray<HTMLElement>("[data-service-card]", root.current).forEach((card, index) => {
        gsap.from(card, {
          xPercent: index % 2 === 0 ? -7 : 7, y: 45, rotateX: 4, opacity: 0,
          duration: 1.05, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
        });
      });
      gsap.to("[data-expertise-wash]", {
        xPercent: 38, rotate: 16, ease: "none",
        scrollTrigger: { trigger: "[data-expertise-section]", start: "top bottom", end: "bottom top", scrub: 1 },
      });
    });
    media.add("(max-width: 650px)", () => {
      gsap.set(`.${styles.mobileAction}`, { autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: "[data-price-note]", start: "bottom top+=80",
        onEnter: () => gsap.set(`.${styles.mobileAction}`, { autoAlpha: 1 }),
        onLeaveBack: () => gsap.set(`.${styles.mobileAction}`, { autoAlpha: 0 }),
      });
    });
    return () => media.revert();
  }, { scope: root });

  return <div ref={root} className={`${styles.page} ${body.className} ${display.variable} ${sport.variable}`}>
    <section className={styles.hero} aria-labelledby="pricing-title">
      <div className={styles.container}>
        <div className={styles.opening}>
          <h1 id="pricing-title"><span className={styles.mask}><span data-price-line>Big ambitions.</span></span><span className={styles.mask}><span data-price-line>Clear starting <em>prices.</em></span></span></h1>
          <div className={styles.introduction} data-price-intro><p>Transparent packages for web design, marketing, SEO, content and AI solutions.</p></div>
        </div>
        <div className={styles.pricingGrid}>
          {offers.map((offer) => <div key={offer.name} data-price-depth><article className={`${styles.priceCard} ${styles[offer.theme]}`} data-price-panel aria-label={`${offer.name} from £${offer.price}`}>
            <div data-price-content>
              <div className={styles.cardHeading}><h2>{offer.name}</h2><offer.icon size={26} strokeWidth={1.4} aria-hidden="true" /></div>
              <div className={styles.amount}><span>Starting from</span><div className={styles.priceRow}><strong><span>£</span>{offer.price}</strong></div><small>{offer.billing}</small></div>
              <p className={styles.cardDescription}>{offer.description}</p>
              <Link href={pricingEnquiryHref(offer.offer)} className={styles.quoteLink} aria-label={`Let’s talk about your ${offer.name.toLowerCase()} project`}><span>Let’s talk about your project</span><ArrowUpRight size={21} /></Link>
            </div>
          </article></div>)}
        </div>
        <p className={styles.priceNote} data-price-note>Hosting from £5/month. We agree the scope and offer terms with you before work begins.</p>
      </div>
    </section>

    <section className={styles.clientProof} aria-labelledby="pricing-clients-title">
      <div className={styles.container}>
        <div className={styles.clientHeading} data-client-heading><h2 id="pricing-clients-title">Chosen by names<br />you recognise.</h2><p>From professional sport to higher education.<br />Meet two of our clients.</p></div>
        <div className={styles.clientLogos} data-client-grid>
          <Link href="/works" className={`${styles.clientFeature} ${styles.sanchezFeature}`} aria-label="View our work with Sanchez Watt" data-client-card>
            <span className={styles.sportBackdrop} aria-hidden="true">WATT</span>
            <div className={styles.clientVisualCopy}><span className={styles.clientCategory}>SPORT / COACHING</span><h3>SANCHEZ<br />WATT</h3><p>A big personality.<br />A website to match.</p></div>
            <div className={styles.clientAthlete} data-client-athlete><Image src={sanchez} alt="Sanchez Watt in his Arsenal kit" sizes="(max-width: 650px) 65vw, 30vw" /></div>
            <div className={styles.clientCaption}><span>Former Arsenal player</span><span className={styles.clientVisit}>View our work <ArrowUpRight size={19} aria-hidden="true" /></span></div>
          </Link>
          <Link href="/works" className={`${styles.clientFeature} ${styles.collegeFeature}`} aria-label="View our work with Nelson College London" data-client-card>
            <div className={styles.collegePhoto} data-client-photo><Image src={nelson} alt="Nelson College London community at a ribbon-cutting event" sizes="(max-width: 650px) 90vw, 45vw" placeholder="blur" /></div>
            <div className={styles.collegeVisualCopy}><Image src="/assets/nelson-college-logo.svg" alt="Nelson College London" width={180} height={60} /><h3>A place for<br /><em>ambition.</em></h3></div>
            <div className={styles.clientCaption}><span>Higher education, London</span><span className={styles.clientVisit}>View our work <ArrowUpRight size={19} aria-hidden="true" /></span></div>
          </Link>
        </div>
      </div>
    </section>

    <section className={styles.ceoSection} aria-labelledby="ceo-title" data-ceo-section>
      <div className={`${styles.container} ${styles.ceoLayout}`}>
        <header className={styles.ceoHeader} data-ceo-heading>
          <div><h2 id="ceo-title">A message<br /><em>from our CEO.</em></h2></div>
          <div className={styles.ceoIntroduction}><p>Before the strategy.<br />Before the quote.<br /><strong>It starts with you.</strong></p><a href="#pricing-services" className={styles.skipMessage}>Explore our expertise <ArrowDown size={17} aria-hidden="true" /></a></div>
        </header>
        <div className={styles.ceoDepth} data-ceo-depth>
          <blockquote className={styles.ceoQuote}>
            {ceoMessage.map((paragraph) => <p key={paragraph} data-ceo-paragraph>
              <span className={styles.screenReader}>{paragraph}</span>
              <span aria-hidden="true">{paragraph.split(" ").map((word, index) => <span key={index} className={styles.revealWord}>
                <span>{word}</span><span className={styles.wordLight} data-word-light>{word}</span>{" "}
              </span>)}</span>
            </p>)}
          </blockquote>
          <div className={styles.ceoSignature}><div><strong>Our promise to you.</strong><span>The team at Truedge Digital</span></div></div>
        </div>
        <div className={styles.messageAction}><div><p>Tell us what you have in mind.<br />We’ll work out the next step together.</p><span>No obligation. No need to know the answers.</span></div><Link href="/contact" className={styles.strategyButton}>Book a free strategy call <ArrowUpRight size={20} aria-hidden="true" /></Link></div>
      </div>
    </section>

    <section id="pricing-services" className={styles.exploreSection} aria-labelledby="services-title" data-expertise-section>
      <span className={styles.expertiseWash} data-expertise-wash aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.exploreHeading} data-expertise-heading><div><h2 id="services-title">Expertise, shaped<br /><em>around your business.</em></h2></div><p>One team. The right support.<br />We’ll help you decide what your business needs.</p></div>
        <div className={styles.disclosures}>{serviceDetails.map((service) => {
          return <details key={service.id} id={`${service.id}-packages`} className={styles.serviceDisclosure} onToggle={() => ScrollTrigger.refresh()} data-service-card>
            <summary><span className={styles.serviceName}>{service.name}</span><span className={styles.expandIcon}><span className={styles.exploreLabel}>View services</span><Plus size={23} aria-hidden="true" /></span></summary>
            <div className={styles.serviceBody}><p className={styles.serviceIntro}>{service.intro}</p><div className={styles.serviceColumns}>{service.groups.map((group) => <div key={group.title}><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul></div>)}</div><div className={styles.serviceFoot}><p>{service.note}</p><Link href="/contact">Let’s talk about your business <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div>
          </details>;
        })}</div>
        <div className={styles.unsureNote}><span>You bring the ambition. We’ll help with the how.</span><Link href="/contact">Let’s work it out together <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
      </div>
    </section>

    <section className={styles.questions} aria-labelledby="pricing-faq-title"><div className={`${styles.container} ${styles.faqGrid}`}>
      <h2 id="pricing-faq-title">Your questions,<br />answered.</h2>
      <div>{pricingQuestions.map(([question, answer]) => <details key={question} onToggle={() => ScrollTrigger.refresh()}><summary>{question}<Plus size={19} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
    </div></section>

    <section className={styles.closing} aria-labelledby="pricing-contact-title"><div className={styles.container} data-price-reveal>
      <h2 id="pricing-contact-title">Let’s start with your business.</h2><p>Tell us where you are and where you’d like to be. We’ll listen, recommend a way forward and send you a quote built around your needs.</p>
      <Link href="/contact" className={`${heroStyles.cta} ${plex.className}`}><span>Book a free strategy call</span><span className={heroStyles.ctaIcon} aria-hidden="true"><ArrowUpRight size={21} /></span></Link>
      <span className={styles.closingNote}>A friendly conversation. A clear plan. No obligation.</span>
    </div></section>
    <div className={styles.mobileAction}><Link href="/contact">Book a free strategy call <ArrowUpRight size={19} aria-hidden="true" /></Link></div>
  </div>;
}
