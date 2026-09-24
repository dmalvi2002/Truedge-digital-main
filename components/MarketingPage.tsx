"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sora } from "next/font/google";
import { ArrowDown, ArrowUpRight, Check, Search, Target, FileText, Clapperboard, PanelsTopLeft, MousePointerClick, ContactRound, Workflow, Plus, MessageSquare, Mail } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import styles from "./MarketingPage.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);
const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const chapters = [
  {
    id: "get-found", label: "Get found", title: "Be there when customers need you.",
    summary: "Put your business in front of the right people, whether they’re searching for a service or discovering something new.",
    services: [
      { icon: Search, name: "SEO / AEO / GEO", headline: "Make your business easier to discover.", copy: "We improve your website and content so search engines can understand what you offer and customers can find clear answers. That includes traditional Google searches, answer engines and AI-assisted search.", items: ["Website and local search improvements", "Helpful answers to real customer questions", "Clear, structured content for search and AI tools"] },
      { icon: Target, name: "Google, Meta & TikTok ads", headline: "Reach people who could become customers.", copy: "We plan and manage paid campaigns around your audience, location and budget. From Google searches to Facebook, Instagram and TikTok, we choose the channels that fit your business.", items: ["Campaign setup and audience selection", "Ad creative, testing and budget management", "Enquiry tracking and clear performance reporting"] },
    ],
  },
  {
    id: "build-trust", label: "Build trust", title: "Give people a reason to choose you.",
    summary: "Useful content and consistent design help people understand your business before they ever pick up the phone.",
    services: [
      { icon: FileText, name: "Content strategy", headline: "Say the right things, consistently.", copy: "We turn your customers’ questions, your expertise and your business goals into a practical content plan. Every topic has a purpose, so you know what to publish and why.", items: ["Audience research and a clear message", "Content plans for your website and social channels", "Useful articles, service copy and campaign ideas"] },
      { icon: Clapperboard, name: "Graphics, leaflets & reel editing", headline: "Look professional wherever people see you.", copy: "We create the everyday materials your marketing needs: clear graphics, well-designed leaflets and polished reels. Your message stays recognisable, on a screen or in someone’s hand.", items: ["Social graphics and advertising artwork", "Leaflet and print-ready design", "Reel editing, captions and short-form video"] },
    ],
  },
  {
    id: "win-enquiries", label: "Win enquiries", title: "Make the next step feel easy.",
    summary: "Attracting visitors is only part of the job. Your website should help them understand the offer and feel confident enough to act.",
    services: [
      { icon: PanelsTopLeft, name: "Landing page optimisation", headline: "Give each campaign a page that fits.", copy: "We improve the page people reach after clicking an ad or search result. A clear offer, relevant proof and a simple enquiry process help visitors take the next step.", items: ["A message that matches the campaign", "Clear calls to action and simpler forms", "Fast, easy-to-use mobile page layouts"] },
      { icon: MousePointerClick, name: "Conversion rate optimisation", headline: "Find what’s stopping visitors from enquiring.", copy: "We look at how people use your website, identify points of friction and test improvements where there’s enough traffic to learn from. Decisions are based on evidence, not guesswork.", items: ["Customer journey and website reviews", "Form, content and layout improvements", "Testing and measurement of meaningful actions"] },
    ],
  },
  {
    id: "follow-up", label: "Follow up", title: "Keep good opportunities moving.",
    summary: "When enquiries arrive, a clear follow-up process helps your team respond, stay organised and build stronger customer relationships.",
    services: [
      { icon: ContactRound, name: "CRM management", headline: "Know who needs a reply and what comes next.", copy: "We help organise your customer relationship management system so enquiries don’t get lost between inboxes and spreadsheets. Your team gets one clear view of contacts, conversations and next steps.", items: ["Contact organisation and sales pipeline setup", "Enquiry routing and follow-up reminders", "Ongoing CRM upkeep and useful reporting"] },
      { icon: Workflow, name: "AI automation", headline: "Spend less time on repetitive work.", copy: "We identify practical ways AI can support your business, from sorting enquiries to preparing reply drafts and summarising conversations. You stay in control of the decisions that matter.", items: ["Lead sorting and internal notifications", "Draft replies and conversation summaries", "Connected workflows with human review"] },
    ],
  },
];

const faqs = [
  { question: "Do I need all of these services?", answer: "No. We start with your goals, current marketing and budget, then recommend the work most likely to address your immediate needs. You can begin with one service and build from there." },
  { question: "How much should I spend on paid advertising?", answer: "That depends on your location, competition, offer and the value of a new customer. We discuss a realistic starting budget with you before launch and keep advertising spend separate from our management fees." },
  { question: "How quickly will I see results?", answer: "Paid campaigns can start reaching people once they’re approved and live, but learning what works takes time. Search visibility usually develops over several months. We agree on practical milestones and explain what we’re measuring along the way." },
  { question: "What do AEO and GEO mean for my business?", answer: "AEO means answer engine optimisation; GEO means generative engine optimisation. Both focus on making your business information clear and useful for tools that generate answers. They support good SEO, but no agency can guarantee rankings or inclusion in an AI answer." },
  { question: "Can you work with my existing website and CRM?", answer: "Often, yes. We review your current tools first and explain what can be improved, connected or retained. If a limitation makes a change necessary, we’ll discuss the options before starting." },
  { question: "Will AI send messages to customers without my approval?", answer: "We agree on the level of automation with you before anything goes live. Workflows can prepare drafts for your team to review, with clear rules about what may run automatically and what needs a person’s decision." },
];

function JourneyVisual({ stage }: { stage: number }) {
  return <div className={styles.visual} aria-hidden="true" data-stage={stage}>
    <div className={styles.visualHalo} />
    <div className={styles.visualCaption}>{["Your next customer is looking.", "Make a lasting impression.", "Turn interest into a conversation.", "A good enquiry deserves a reply."][stage]}</div>
    <div className={styles.scene} data-visible={stage === 0}>
      <div className={styles.searchBox}><Search size={20} /><span>A trusted business near me</span></div>
      <div className={styles.searchResult}><span className={styles.brandMark}>t.</span><small>Your business</small><h3>The right people.<br />The right place.</h3><p>Clear answers. Local expertise.<br />A business worth discovering.</p><div className={styles.resultTags}><span>Search</span><span>Social</span><span>AI answers</span></div></div>
      <div className={styles.floatingNote}><Check size={18} /> Be part of their search.</div>
    </div>
    <div className={styles.scene} data-visible={stage === 1}>
      <div className={styles.creativeBack}><span>Your story,<br />well told.</span><FileText size={44} /></div>
      <div className={styles.creativeFront}><Image src="/team-collaboration.jpg" alt="" fill sizes="300px" /><div><span>Real people.<br />Real expertise.</span><small>Content that feels like your business.</small></div></div>
      <div className={styles.floatingNote}><Clapperboard size={18} /> One recognisable voice.</div>
    </div>
    <div className={styles.scene} data-visible={stage === 2}>
      <div className={styles.enquiryMock}><span className={styles.brandMark}>t.</span><h3>Let’s talk about<br />what you need.</h3><div>Your name</div><div>Email address</div><span className={styles.mockButton}>Send an enquiry <ArrowUpRight size={18} /></span></div>
      <div className={styles.floatingNote}><MessageSquare size={18} /> A simpler next step.</div>
    </div>
    <div className={styles.scene} data-visible={stage === 3}>
      <div className={styles.workflowCard}><Mail size={26} /><div><small>New enquiry</small><strong>“Can you help our business?”</strong></div></div>
      <div className={styles.workflowCard}><ContactRound size={26} /><div><small>Organised in your CRM</small><strong>The right person is notified.</strong></div></div>
      <div className={styles.workflowCard}><Check size={26} /><div><small>Ready to follow up</small><strong>A conversation worth having.</strong></div></div>
    </div>
    <div className={styles.visualDots}>{chapters.map((chapter, index) => <span key={chapter.id} data-active={stage === index} />)}</div>
  </div>;
}

export default function MarketingPage() {
  const root = useRef<HTMLDivElement>(null);
  const scrollTween = useRef<gsap.core.Tween | null>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollTween.current?.kill();
    scrollTween.current = gsap.to(window, { scrollTo: { y: target, offsetY: 115, autoKill: true }, duration: reduced ? 0 : 1.25, ease: "power3.inOut", onComplete: () => {
      target.focus({ preventScroll: true });
      window.history.replaceState(null, "", `#${id}`);
    } });
  };

  useGSAP(() => {
    const media = gsap.matchMedia();
    gsap.utils.toArray<HTMLElement>("[data-marketing-chapter]").forEach((block, index) => {
      ScrollTrigger.create({ trigger: block, start: "top 55%", end: "bottom 55%", onEnter: () => setActiveChapter(index), onEnterBack: () => setActiveChapter(index) });
    });
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-hero-word]", { yPercent: 105, rotation: 3, duration: 1.3, stagger: .14, ease: "power4.out" });
      gsap.from("[data-hero-reveal]", { y: 25, opacity: 0, duration: 1, delay: .5, stagger: .12 });
      gsap.to("[data-hero-image]", { yPercent: 22, scale: 1.12, ease: "none", scrollTrigger: { trigger: "[data-marketing-hero]", start: "top top", end: "bottom top", scrub: 1.2 } });
      gsap.to("[data-hero-content]", { y: -90, opacity: .2, ease: "none", scrollTrigger: { trigger: "[data-marketing-hero]", start: "top top", end: "bottom 15%", scrub: 1 } });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, { y: 55, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 92%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-scroll-title]").forEach((element) => {
        gsap.from(element.children, { yPercent: 90, opacity: .1, stagger: .12, ease: "none", scrollTrigger: { trigger: element, start: "top 95%", end: "top 60%", scrub: .7 } });
      });
      gsap.utils.toArray<HTMLElement>("[data-marketing-chapter]").forEach((chapter) => {
        gsap.from(chapter.querySelectorAll("[data-service]"), { x: 45, opacity: 0, stagger: .2, duration: .9, ease: "power3.out", scrollTrigger: { trigger: chapter, start: "top 72%", once: true } });
      });
      gsap.fromTo("[data-approach-image]", { yPercent: -10, scale: 1.13 }, { yPercent: 10, scale: 1.03, ease: "none", scrollTrigger: { trigger: "[data-approach]", start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.fromTo("[data-close-word]", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "none", scrollTrigger: { trigger: "[data-marketing-close]", start: "top 70%", end: "top 20%", scrub: .8 } });
      gsap.from("[data-close-orbit]", { scale: .6, rotation: -30, ease: "none", scrollTrigger: { trigger: "[data-marketing-close]", start: "top bottom", end: "bottom top", scrub: 1.5 } });
    });
    return () => { media.revert(); scrollTween.current?.kill(); };
  }, { scope: root });

  return <div ref={root} className={`${styles.page} ${sora.className}`}>
    <section className={styles.hero} data-marketing-hero aria-labelledby="marketing-title">
      <div className={styles.heroImage} data-hero-image><Image src="/team-collaboration.jpg" alt="" fill priority sizes="100vw" className={styles.photo} /></div>
      <div className={styles.heroShade} />
      <div className={styles.container} data-hero-content>
        <h1 id="marketing-title"><span className={styles.wordMask}><span data-hero-word>Good business.</span></span><span className={styles.wordMask}><span data-hero-word>Deserves to</span></span><span className={styles.wordMask}><span data-hero-word className={styles.lime}>be seen.</span></span></h1>
        <div className={styles.heroBottom}>
          <p data-hero-reveal>Marketing that brings the right people to your business — and gives them a reason to choose you.</p>
          <div className={styles.heroActions} data-hero-reveal><Link href="/contact" className={styles.button}>Book a Free Strategy Call <ArrowUpRight size={21} aria-hidden="true" /></Link><a href="#marketing-services" onClick={event => scrollToSection(event, "marketing-services")} className={styles.explore}>Explore your next step <ArrowDown size={18} aria-hidden="true" /></a></div>
        </div>
      </div>
      <span className={styles.heroSide} aria-hidden="true">Built around your business.</span>
    </section>

    <section className={styles.intro} aria-labelledby="marketing-intro">
      <div className={styles.container}>
        <div className={styles.headingRow}><h2 id="marketing-intro" data-scroll-title><span>Not just more marketing.</span><span>More of it working together.</span></h2><p data-reveal>A great ad needs a useful landing page. A new enquiry needs a timely reply. We connect the whole journey, so your marketing has somewhere to go.</p></div>
        <div className={styles.journey}>
          {chapters.map((chapter, index) => { const Icon = [Search, FileText, MessageSquare, Workflow][index]; return <a href={`#${chapter.id}`} onClick={event => scrollToSection(event, chapter.id)} key={chapter.id} data-reveal><Icon size={30} strokeWidth={1.4} aria-hidden="true" /><strong>{chapter.label}</strong><p>{["Reach the people looking for you.", "Show why you’re the right choice.", "Make it easy to get in touch.", "Keep every opportunity moving."][index]}</p><ArrowDown className={styles.journeyArrow} size={21} aria-hidden="true" /></a>; })}
        </div>
      </div>
    </section>

    <section id="marketing-services" tabIndex={-1} className={styles.services} aria-label="Marketing services">
      <div className={`${styles.container} ${styles.serviceLayout}`}>
        <aside className={styles.guide}>
          <JourneyVisual stage={activeChapter} />
          <nav aria-label="Marketing service stages" className={styles.chapterNav}>{chapters.map((chapter, index) => <a key={chapter.id} href={`#${chapter.id}`} onClick={event => scrollToSection(event, chapter.id)} aria-current={activeChapter === index ? "location" : undefined}>{chapter.label}</a>)}</nav>
        </aside>
        <div className={styles.chapters}>
          {chapters.map((chapter, index) => <section id={chapter.id} tabIndex={-1} key={chapter.id} className={styles.chapter} data-marketing-chapter aria-labelledby={`${chapter.id}-title`}>
            <div className={styles.mobileVisual}><JourneyVisual stage={index} /></div>
            <div className={styles.chapterHeading}><h2 id={`${chapter.id}-title`} data-scroll-title><span>{chapter.title}</span></h2><p>{chapter.summary}</p></div>
            {chapter.services.map(service => <details className={styles.serviceDetail} key={service.name} data-service onToggle={() => ScrollTrigger.refresh()}>
              <summary><service.icon size={22} strokeWidth={1.5} aria-hidden="true" /><div><h3>{service.name}</h3><p>{service.headline}</p></div><Plus size={20} className={styles.plus} aria-hidden="true" /></summary>
              <div className={styles.serviceCopy}><p>{service.copy}</p><ul>{service.items.map(item => <li key={item}><Check size={15} aria-hidden="true" /><span>{item}</span></li>)}</ul></div>
            </details>)}
          </section>)}
        </div>
      </div>
    </section>

    <section className={styles.approach} data-approach aria-labelledby="marketing-approach">
      <div className={`${styles.container} ${styles.approachLayout}`}>
        <div className={styles.approachIntro}><h2 id="marketing-approach" data-scroll-title><span>A clear plan.</span><span>No guesswork.</span></h2><p>You shouldn’t have to chase updates or decode a report. You’ll know what we’re doing, why it matters and what comes next.</p><div className={styles.approachImage}><Image data-approach-image src="/team-collaboration.jpg" alt="Colleagues working through a marketing plan together" fill sizes="(max-width: 767px) 90vw, 45vw" /></div></div>
        <div className={styles.approachSteps}>
          {[
            ["We listen first.", "Your business isn’t a template. We get to know your customers, your goals and what’s holding you back."],
            ["We agree on what matters.", "A practical plan, a clear budget and the right priorities. You can start small and build from there."],
            ["We make it happen.", "From the first creative idea to the final customer enquiry, we connect the details and keep you involved."],
            ["We keep making it better.", "Clear reporting on enquiries, campaign costs and the improvements we’re making next. No confusing dashboards to decipher."],
          ].map(([title, copy]) => <article key={title} data-reveal><span className={styles.stepSymbol} aria-hidden="true"><Check size={22} /></span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </div>
    </section>

    <section className={styles.closing} data-marketing-close aria-labelledby="marketing-close">
      <div className={styles.closeOrbit} data-close-orbit aria-hidden="true" />
      <div className={styles.container}><h2 id="marketing-close">Make your<br /><span className={styles.closeWord}>next move.<span data-close-word aria-hidden="true">next move.</span></span></h2><div className={styles.closeBottom}><p>Your business has potential.<br />Let’s put a plan behind it.</p><Link href="/contact" className={styles.button}>Book a Free Strategy Call <ArrowUpRight size={21} aria-hidden="true" /></Link></div></div>
    </section>

    <section className={styles.faq} aria-labelledby="marketing-faq"><div className={`${styles.container} ${styles.faqLayout}`}><div><h2 id="marketing-faq" data-scroll-title><span>Good questions.</span><span>Clear answers.</span></h2><p>A few things you might be wondering before we talk.</p></div><div>{faqs.map(faq => <details key={faq.question} className={styles.faqItem}><summary>{faq.question}<Plus size={20} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div></div></section>
  </div>;
}
