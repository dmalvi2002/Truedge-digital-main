"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { DM_Sans, IBM_Plex_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { ArrowUpRight, Check, LayoutTemplate, Megaphone, Search, Plus } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import heroStyles from "./MainHeroTwo.module.css";
import styles from "./PricingPage.module.css";
import { pricingServices, pricingEnquiryHref, carePlans } from "@/lib/pricing";

gsap.registerPlugin(useGSAP);

const display = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--pricing-display" });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

const offers = [
  { id: "web-design", name: "Web Design", price: 120, billing: "one-off", offer: "web-starter", theme: "cream", icon: LayoutTemplate, description: "A single-page website with your services, contact details and an enquiry form. Built for mobile and desktop." },
  { id: "marketing", name: "Paid Marketing", price: 200, billing: "per month", offer: "marketing-starter", theme: "lavender", icon: Megaphone, description: "One focused ad campaign, audience targeting, regular checks and a monthly report. Ad spend is separate." },
  { id: "seo", name: "SEO", price: 150, billing: "per month", offer: "seo-starter", theme: "lime", icon: Search, description: "A website review, keyword research and improvements to three priority pages, with a monthly progress summary." },
];

const questions = [
  ["How do I claim the 50% discount?", "Choose a package and select ‘Claim 50% Discount Now!’. We’ll receive your selected service and package with your enquiry, discuss what you need and send a proposal showing the discount. Submitting an enquiry does not take payment or commit you to a purchase."],
  ["Are the prices shown already discounted?", "Yes. Starter web design is £120 instead of £240, Starter paid marketing is £200 per month instead of £400, and Starter SEO is £150 per month instead of £300. The higher packages receive 50% off their tailored service quote. For monthly plans, the offer period is confirmed in your proposal."],
  ["Which website package should I choose?", "Starter is for a simple single-page introduction. Professional is for a complete business website with dedicated pages, content editing and agreed functionality. Ecommerce is for selling products, taking payments and managing products and orders online."],
  ["Is hosting included in the website price?", "Website design and development are one-off payments. Hosting is a separate service starting from £5 per month. We’ll discuss a suitable hosting package, domain costs, any paid tools and optional ongoing care before you decide."],
  ["Does paid marketing include my advertising budget?", "No. The monthly service price covers our work on your campaigns. Your advertising spend is separate and paid to the advertising platform. We agree that budget with you before campaigns go live."],
  ["What happens after I choose a package?", "We talk through your goals, confirm the deliverables and send a proposal with the scope, discounted price, billing terms, any applicable tax and relevant third-party costs. Once you’re happy with the proposal, we agree the next steps."],
  ["Do you guarantee enquiries or search rankings?", "No. Results depend on your market, competition, offer and many other factors. We focus on practical improvements, agree what to measure and explain progress clearly."],
];

export default function PricingPage() {
  const root = useRef<HTMLDivElement>(null);

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
    return () => media.revert();
  }, { scope: root });

  return <div ref={root} className={`${styles.page} ${body.className} ${display.variable}`}>
    <section className={styles.hero} aria-labelledby="pricing-title">
      <div className={styles.container}>
        <div className={styles.opening}>
          <h1 id="pricing-title"><span className={styles.mask}><span data-price-line>Big ambitions.</span></span><span className={styles.mask}><span data-price-line>Clear starting <em>prices.</em></span></span></h1>
          <div className={styles.introduction} data-price-intro><p>50% off web design, paid marketing and SEO. Choose your starting point.</p></div>
        </div>
        <div className={styles.pricingGrid}>
          {offers.map((offer) => <div key={offer.name} data-price-depth><article className={`${styles.priceCard} ${styles[offer.theme]}`} data-price-panel aria-label={`${offer.name} from £${offer.price}`}>
            <div data-price-content>
              <div className={styles.cardHeading}><h2>{offer.name}</h2><offer.icon size={26} strokeWidth={1.4} aria-hidden="true" /></div>
              <div className={styles.amount}><span>Starting from · 50% off</span><div className={styles.priceRow}><strong><span>£</span>{offer.price}</strong><del aria-label={`Standard price £${offer.price * 2}`}>£{offer.price * 2}</del></div><small>{offer.billing}</small></div>
              <p className={styles.cardDescription}>{offer.description}</p>
              <Link href={pricingEnquiryHref(offer.offer)} className={styles.quoteLink} aria-label={`Let’s talk about your ${offer.name.toLowerCase()} project`}><span>Let’s talk about your project</span><ArrowUpRight size={21} /></Link>
              <a href={`#${offer.id}-packages`} className={styles.compareLink}>Compare {offer.name.toLowerCase()} packages <ArrowUpRight size={15} /></a>
            </div>
          </article></div>)}
        </div>
        <p className={styles.priceNote} data-price-note>Hosting from £5/month. We agree the scope and offer terms with you before work begins.</p>
      </div>
    </section>

    <section className={styles.clientProof} aria-labelledby="pricing-clients-title">
      <div className={`${styles.container} ${styles.clientProofInner}`}>
        <div className={styles.clientHeading}><h2 id="pricing-clients-title">Chosen by names<br />you recognise.</h2><p>From professional sport to higher education.<br />Meet two of our clients.</p></div>
        <div className={styles.clientLogos}>
          <a href="https://www.sanchezwatt.com/" target="_blank" rel="noopener noreferrer" className={styles.clientFeature}>
            <div className={styles.clientMark}><Image src="/assets/sanchez-watt-logo.webp" alt="Sanchez Watt logo" width={160} height={160} /></div>
            <div className={styles.clientCaption}><div><h3>Sanchez Watt</h3><p>Former Arsenal player</p></div><ArrowUpRight size={24} aria-hidden="true" /></div>
          </a>
          <a href="https://nelsoncollege.ac.uk/" target="_blank" rel="noopener noreferrer" className={`${styles.clientFeature} ${styles.collegeFeature}`}>
            <div className={`${styles.clientMark} ${styles.collegeMark}`}><Image src="/assets/nelson-college-logo.svg" alt="Nelson College London logo" width={360} height={120} /></div>
            <div className={styles.clientCaption}><div><h3>Nelson College London</h3><p>Higher education, London</p></div><ArrowUpRight size={24} aria-hidden="true" /></div>
          </a>
        </div>
      </div>
    </section>

    {pricingServices.map((service) => <section key={service.id} id={`${service.id}-packages`} className={styles.packageSection} aria-labelledby={`${service.id}-packages-title`}>
      <div className={styles.container}>
        <div className={styles.packageHeading}><h2 id={`${service.id}-packages-title`}>{service.name} packages</h2><p>{service.id === "web-design" ? "One page, a complete business website or an online shop. Choose what your business needs." : service.id === "marketing" ? "From your first campaign to a wider advertising strategy. Find your level of monthly support." : "From search essentials to ongoing content and technical support. Choose a plan for your website."}</p></div>
        <div className={styles.packageGrid}>{service.packages.map((plan) => <article key={plan.id} className={`${styles.packageCard} ${plan.recommended ? styles.recommended : ""}`} data-price-reveal>
          <div className={styles.planTop}><h3>{plan.name}</h3>{plan.recommended && <span>Our recommendation</span>}</div>
          <p className={styles.forWho}>{plan.forWho}</p>
          {plan.price ? <div className={styles.packagePrice}><span>Starting from · 50% off</span><div><strong>£{plan.price}</strong><del aria-label={`Standard price £${plan.price * 2}`}>£{plan.price * 2}</del></div><small>{service.billing}</small></div> : <div className={styles.tailoredPrice}><strong>50% off</strong><span>your tailored {service.billing === "per month" ? "monthly " : ""}quote</span></div>}
          <p className={styles.planDescription}>{plan.description}</p>
          <p className={styles.includedLabel}>What you get</p>
          <ul>{plan.features.map((feature) => <li key={feature}><Check size={16} aria-hidden="true" /><span>{feature}</span></li>)}</ul>
          <p className={styles.planNote}>{plan.note}</p>
          <Link href={pricingEnquiryHref(plan.id)} className={styles.claimButton} aria-label={`Claim 50% Discount Now! ${service.name} ${plan.name}`}><span>Claim 50% Discount Now!</span><ArrowUpRight size={20} /></Link>
        </article>)}</div>
        <aside className={styles.costCallout} aria-label={`${service.name} pricing details`}>
          <h3>{service.id === "web-design" ? "Your website, your ongoing costs." : service.id === "marketing" ? "Your service fee. Your ad budget." : "Ongoing work. Clear expectations."}</h3>
          <p>{service.costNote}</p>
        </aside>
        {service.id === "web-design" && <details className={styles.careDisclosure}>
          <summary className={styles.careSummary}>
            <span className={styles.careSummaryMain}>
              <span className={styles.careSummaryCopy}>
                <strong>A home for your new website.</strong>
                <span>Reliable hosting on its own, or ongoing care when you need more support.</span>
                <span className={styles.hostingPrice}><small>Hosting from</small><strong>£5</strong><span>per month</span></span>
              </span>
            </span>
            <span className={styles.careToggle}><span className={styles.careShow}>View hosting &amp; care</span><span className={styles.careHide}>Close plans</span><span className={styles.toggleIcon}><Plus size={22} aria-hidden="true" /></span></span>
          </summary>
          <div className={styles.careBody}>
            <p className={styles.careIntro}>Choose hosting on its own from £5/month, or combine hosting with regular updates and support in one of the care plans below.</p>
            <div className={styles.packageGrid}>{carePlans.map((plan) => <article key={plan.id} className={`${styles.packageCard} ${styles.careCard} ${plan.id === "care-pro" ? styles.recommended : ""}`}>
              <h3>{plan.name}</h3>
              <div className={`${styles.tailoredPrice} ${styles.careDiscount}`}><strong>50% off</strong></div>
              <p className={styles.careDescription}>{plan.description}</p>
              <p className={styles.includedLabel}>{plan.includes}</p>
              <ul>{plan.features.map((feature) => <li key={feature}><Check size={16} aria-hidden="true" /><span>{feature}</span></li>)}</ul>
              <p className={styles.planNote}>{plan.note}</p>
              <Link href={pricingEnquiryHref(plan.id)} className={styles.claimButton} aria-label={`To be discussed! ${plan.name}`}><span>To be discussed!</span><ArrowUpRight size={20} aria-hidden="true" /></Link>
            </article>)}</div>
          </div>
        </details>}
      </div>
    </section>)}

    <section className={styles.questions} aria-labelledby="pricing-faq-title"><div className={`${styles.container} ${styles.faqGrid}`}>
      <h2 id="pricing-faq-title">Your questions,<br />answered.</h2>
      <div>{questions.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={19} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
    </div></section>

    <section className={styles.closing} aria-labelledby="pricing-contact-title"><div className={styles.container} data-price-reveal>
      <h2 id="pricing-contact-title">Ready to get started?</h2><p>Choose your package. We’ll confirm the scope and your 50% discount in a clear proposal.</p>
      <Link href="/contact?offer=discount" className={`${heroStyles.cta} ${plex.className}`}><span>Claim 50% Discount Now!</span><span className={heroStyles.ctaIcon} aria-hidden="true"><ArrowUpRight size={21} /></span></Link>
    </div></section>
  </div>;
}
