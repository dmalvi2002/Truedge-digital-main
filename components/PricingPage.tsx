"use client";

import { useRef } from "react";
import Link from "next/link";
import { DM_Sans, IBM_Plex_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { ArrowUpRight, Check, LayoutTemplate, Megaphone, Search, Plus } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import heroStyles from "./MainHeroTwo.module.css";
import styles from "./PricingPage.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const display = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--pricing-display" });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

const offers = [
  { name: "Web Design", price: 120, theme: "cream", icon: LayoutTemplate, description: "A website that explains your business and makes getting in touch easy.", purpose: "Give your business a better home online.", items: ["Website design and development", "Mobile-friendly pages and clear content", "Forms, bookings and useful features"], link: "/web-design", linkText: "Explore web design" },
  { name: "Marketing", price: 150, theme: "lavender", icon: Megaphone, description: "Reach the right people with a message that gives them a reason to choose you.", purpose: "Get your business in front of more people.", items: ["A practical marketing plan", "Content and campaign creative", "Paid campaigns and enquiry tracking"], link: "/marketing", linkText: "Explore marketing" },
  { name: "SEO", price: 150, theme: "lime", icon: Search, description: "Help people find your business when they search for what you offer.", purpose: "Make your website easier to discover.", items: ["Website and search visibility reviews", "Page titles, structure and content improvements", "Local search and helpful customer information"], link: "/marketing#get-found", linkText: "Explore SEO" },
];

const questions = [
  ["What does “from” mean?", "These are starting prices. Your final quote depends on the work you need, such as the number of website pages, the features or the level of marketing support. We agree the scope and price with you before starting."],
  ["Are these one-off or monthly prices?", "The billing arrangement depends on the work we agree. Your proposal will clearly state whether it covers a one-off project or ongoing support, along with the payment schedule."],
  ["What will my quote include?", "We’ll set out the work, the deliverables and the price. Any relevant third-party costs, advertising budget, ongoing fees and tax treatment will be explained in the proposal, so you can review the full cost before deciding."],
  ["Can I start with just one service?", "Yes. Start with the part your business needs most. We can discuss other services later if they become useful. You don’t need to commit to all three."],
  ["Do you guarantee enquiries or search rankings?", "No. Results depend on your market, competition, offer and many other factors. We focus on practical improvements, agree what to measure and explain progress clearly."],
];

export default function PricingPage() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const opening = gsap.timeline({ defaults: { ease: "power3.out" } });
      opening.from("[data-price-line]", { yPercent: 115, rotate: 2, duration: 1.15, stagger: .14 }, .1)
        .from("[data-price-intro]", { opacity: 0, y: 24, duration: .8 }, .5)
        .from("[data-price-panel]", { clipPath: "inset(100% 0 0 0 round 18px)", y: 45, duration: 1.2, stagger: .16, ease: "power4.inOut" }, .45)
        .from("[data-price-content]", { y: 30, opacity: 0, duration: .9, stagger: .15 }, .95)
        .from("[data-price-note]", { y: 12, opacity: 0, duration: .7 }, 1.6);

      gsap.utils.toArray<HTMLElement>("[data-price-reveal]").forEach((element) => {
        gsap.from(element, { y: 35, opacity: 0, duration: .9, scrollTrigger: { trigger: element, start: "top 90%", once: true } });
      });
      media.add("(min-width: 800px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-price-depth]").forEach((element, index) => {
          gsap.to(element, { y: index === 1 ? -34 : -12, ease: "none", scrollTrigger: { trigger: element, start: "top 30%", end: "bottom top", scrub: 1 } });
        });
      });
    });
    return () => media.revert();
  }, { scope: root });

  return <div ref={root} className={`${styles.page} ${body.className} ${display.variable}`}>
    <section className={styles.hero} aria-labelledby="pricing-title">
      <div className={styles.container}>
        <div className={styles.opening}>
          <h1 id="pricing-title"><span className={styles.mask}><span data-price-line>Big ambitions.</span></span><span className={styles.mask}><span data-price-line>Clear starting <em>prices.</em></span></span></h1>
          <div className={styles.introduction} data-price-intro><p>A better website. More people finding you. A clear next step for your business.</p><span>Start with what you need.<br />We’ll help you shape the rest.</span></div>
        </div>
        <div className={styles.pricingGrid}>
          {offers.map((offer) => <div key={offer.name} data-price-depth><article className={`${styles.priceCard} ${styles[offer.theme]}`} data-price-panel aria-label={`${offer.name} from £${offer.price}`}>
            <div data-price-content>
              <div className={styles.cardHeading}><h2>{offer.name}</h2><offer.icon size={26} strokeWidth={1.4} aria-hidden="true" /></div>
              <p className={styles.amount}><span>From</span><strong><span>£</span>{offer.price}</strong></p>
              <p className={styles.cardDescription}>{offer.description}</p>
              <Link href="/contact" className={styles.quoteLink} aria-label={`Discuss your ${offer.name.toLowerCase()} project`}><span>Let’s talk about your project</span><ArrowUpRight size={21} /></Link>
            </div>
          </article></div>)}
        </div>
        <p className={styles.priceNote} data-price-note>Starting prices, shaped around your needs. Your final scope, price and payment terms are agreed before work begins.</p>
      </div>
    </section>

    <section className={styles.services} aria-labelledby="price-services-title"><div className={styles.container}>
      <div className={styles.sectionHeading} data-price-reveal><h2 id="price-services-title">What does your<br />business need <em>next?</em></h2><p>These are the areas we can help with. We’ll agree what belongs in your quote based on your goals and budget.</p></div>
      <div className={styles.serviceGrid}>{offers.map((offer) => <article key={offer.name} data-price-reveal><offer.icon size={30} strokeWidth={1.3} aria-hidden="true" /><h3>{offer.purpose}</h3><ul>{offer.items.map((item) => <li key={item}><Check size={16} /><span>{item}</span></li>)}</ul><Link href={offer.link}>{offer.linkText}<ArrowUpRight size={18} /></Link></article>)}</div>
    </div></section>

    <section className={styles.scope} aria-labelledby="scope-title"><div className={`${styles.container} ${styles.scopeGrid}`}>
      <div data-price-reveal><h2 id="scope-title">A quote built<br />around <em>you.</em></h2><p>Tell us where you are and where you want to go. We’ll help you decide what’s worth doing first.</p></div>
      <div className={styles.scopeSteps}>
        <article data-price-reveal><h3>Tell us what you want to achieve.</h3><p>More enquiries, a fresh website or better search visibility. We start with the outcome that matters to your business.</p></article>
        <article data-price-reveal><h3>Choose a manageable starting point.</h3><p>We look at your existing setup, priorities and budget, then suggest a clear piece of work to move forward with.</p></article>
        <article data-price-reveal><h3>Know what you’re agreeing to.</h3><p>Review the scope, cost and timeline in your proposal. Ask questions and make sure it feels right before we begin.</p></article>
      </div>
    </div></section>

    <section className={styles.questions} aria-labelledby="pricing-faq-title"><div className={`${styles.container} ${styles.faqGrid}`}>
      <h2 id="pricing-faq-title" data-price-reveal>A little more<br /><em>clarity.</em></h2>
      <div>{questions.map(([question, answer]) => <details key={question} onToggle={() => ScrollTrigger.refresh()}><summary>{question}<Plus size={19} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
    </div></section>

    <section className={styles.closing} aria-labelledby="pricing-contact-title"><div className={styles.container} data-price-reveal>
      <h2 id="pricing-contact-title">Let’s find your<br /><em>right starting point.</em></h2><p>Tell us about your business. We’ll talk through the options together.</p>
      <Link href="/contact" className={`${heroStyles.cta} ${plex.className}`}><span>Book a Free Strategy Call</span><span className={heroStyles.ctaIcon} aria-hidden="true"><ArrowUpRight size={21} /></span></Link>
    </div></section>
  </div>;
}
