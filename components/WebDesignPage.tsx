"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { DM_Sans, IBM_Plex_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Code2, Globe2, LayoutTemplate, Link2, MousePointer2, Plus, Search, ShoppingBag } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import projectImage from "@/public/assets/web-design-project.webp";
import sanchezImage from "@/public/assets/web-design-sanchez.webp";
import MainCTA from "@/components/MainCTA";
import heroStyles from "./MainHeroTwo.module.css";
import styles from "./WebDesignPage.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

const display = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--web-display" });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

const technologies = [
  { file: "figma", name: "Figma" },
  { file: "nextdotjs", name: "Next.js" },
  { file: "tailwind-css", name: "Tailwind CSS" },
  { file: "gsap", name: "GSAP" },
  { file: "stripe-link", name: "Stripe" },
  { file: "supabase", name: "Supabase" },
  { file: "postgresql-badge", name: "PostgreSQL" },
  { file: "firebase-studio", name: "Firebase" },
  { file: "aws", name: "AWS" },
  { file: "googlecloud", name: "Google Cloud" },
  { file: "cloudflare", name: "Cloudflare" },
  { file: "github", name: "GitHub" },
  { file: "openai", name: "OpenAI" },
  { file: "claude", name: "Claude" },
  { file: "n8n", name: "n8n" },
  { file: "python", name: "Python" },
  { file: "gcp-api", name: "API integrations" },
];

const services = [
  { id: "figma-design", name: "Web Design With Figma", short: "Design", icon: LayoutTemplate, heading: "See your website. Before we build it.", copy: "Explore the look and feel of your new website in Figma. Click through the designs, see how the pages fit together and give feedback before development starts.", points: ["Page layouts shaped around your business", "Desktop and mobile designs", "A clickable preview to review together"], outcome: "A clear picture of what we’re going to build." },
  { id: "development", name: "Website Development", short: "Build", icon: Code2, heading: "Beautiful on the surface. Solid underneath.", copy: "We turn the approved design into a working website. Pages load quickly, layouts adapt to different screens, and buttons and forms do what people expect.", points: ["Responsive pages for phones, tablets and desktops", "Accessible navigation and easy-to-use forms", "Browser checks and performance improvements"], outcome: "A website that feels as good as it looks." },
  { id: "shops-bookings", name: "Online Shops & Bookings", short: "Sell", icon: ShoppingBag, heading: "Make it easy to buy. Or book you.", copy: "Whether you sell products or take appointments, we make the next step straightforward. Customers can browse, choose and pay without unnecessary steps.", points: ["Product pages, baskets and checkout", "Appointment and enquiry booking", "Payment, delivery and confirmation setup"], outcome: "A simpler path from interest to action." },
  { id: "content-search", name: "Content & Search Setup", short: "Be found", icon: Search, heading: "The right words. In the right places.", copy: "Help visitors understand what you offer and why it matters. We organise your pages, write or refine your copy, and set up the basics that help search engines read your site.", points: ["Clear page structure and helpful website copy", "Image preparation and descriptive page titles", "Search setup and visitor analytics, with consent where needed"], outcome: "Clear for your customers. Ready to be discovered." },
  { id: "website-tools", name: "Easy Updates & Connected Tools", short: "Connect", icon: Link2, heading: "Your website. Working with your business.", copy: "Change your own content without calling a developer for every edit. We can also connect enquiries to your customer tools and cut down on copying details by hand.", points: ["A simple way to edit pages, news and products", "Forms connected to your inbox or customer system", "Useful integrations and a practical handover"], outcome: "Less admin. More control over your website." },
  { id: "launch-care", name: "Launch & Ongoing Care", short: "Launch", icon: Globe2, heading: "Ready for launch. Supported after it.", copy: "We handle the final checks and help get your website live. If you’d like continued support, we agree a care plan for updates, backups and improvements as your business grows.", points: ["Domain, hosting and launch support", "Final checks on forms, links and key journeys", "Optional maintenance, backups and ongoing improvements"], outcome: "A confident launch, with a clear plan for what comes next." },
];

const faqs = [
  ["Can you redesign my existing website?", "Yes. We review what you have, what’s working and what needs to change. We also plan how to keep useful content and redirect old pages where needed, so the move is carefully managed."],
  ["Do I need every service on this page?", "No. We agree the scope around your goals, budget and existing setup. A simple business website may not need a shop or complex integrations. Your proposal will explain exactly what is included."],
  ["How much will my website cost?", "That depends on the number of pages, the design work and the features you need. After a conversation about your business, we provide a clear proposal with the project price, any third-party costs and optional ongoing support."],
  ["How long does a website take to build?", "Timing depends on the size of the site, the features and how quickly content and feedback are ready. We agree a realistic schedule before starting, with clear design, development and launch milestones."],
  ["Can I update the website myself?", "Yes, if content editing is part of your agreed scope. We set up the areas you need to manage and show you how to make everyday changes. You can also ask us to handle updates through an ongoing support plan."],
  ["Will it work on mobile and appear on Google?", "We design and test for mobile screens, and include the agreed search foundations such as page titles, an indexable structure and a sitemap. Search rankings depend on many factors, so we don’t promise a particular position. Ongoing SEO is available through our marketing service."],
];

function StrategyCTA() {
  return <Link href="/contact" className={`${heroStyles.cta} ${plex.className} ${styles.cta}`}>
    <span>Book a Free Strategy Call</span>
    <span className={heroStyles.ctaIcon} aria-hidden="true"><ArrowUpRight size={21} /></span>
  </Link>;
}

function WebsiteScene() {
  return <div className={styles.scene} aria-label="Website design and development preview">
    <div className={styles.sceneDepth} data-scene-depth>
      <div className={styles.designSheet} data-assemble>
        <div className={styles.sheetTop}>
          <Image src="/assets/tech/figma.svg" alt="" width={16} height={24} />
          <span>Designed with you.</span>
        </div>
        <div className={styles.sheetWords}>Review your design<br /><em>before we build.</em></div>
        <div className={`${styles.avatarCursor} ${styles.avatarCursorTwo}`} data-avatar-cursor="developer" aria-hidden="true">
          <MousePointer2 size={19} fill="currentColor" />
          <Image src="/why-truedge-strategist.jpg" alt="" width={34} height={34} />
          <span>Developer #13</span>
        </div>
      </div>
      <div className={styles.browserPosition} data-browser-scroll>
        <div className={styles.browser} data-browser-reveal>
          <div className={styles.browserBar}><span>Your website, working for you</span><ArrowUpRight size={15} /></div>
          <div className={styles.benefitCanvas}>
            <strong>Help customers<br /><em>choose you.</em></strong>
            <p>Show what you do, answer their questions and make getting in touch easy.</p>
            <ul><li><Check size={15} /> Clearly explain your services</li><li><Check size={15} /> Make enquiries and bookings simple</li><li><Check size={15} /> Update your content as you grow</li></ul>
            <div className={styles.collaborators} aria-hidden="true">
              <div className={`${styles.avatarCursor} ${styles.avatarCursorOne}`} data-avatar-cursor="designer">
                <MousePointer2 size={19} fill="currentColor" />
                <Image src="/advisor-avatar.jpg" alt="" width={34} height={34} />
                <span>Designer #1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

function TechStackSection() {
  return <section className={styles.techSection} aria-labelledby="tech-stack-title">
    <div className={`${styles.container} ${styles.techHeading}`}>
      <div><h2 id="tech-stack-title">Tech Stack We Use</h2><p>We choose the right tools for your website, so it’s easy to use, manage and grow.</p></div>
    </div>
    <div className={styles.techMarquee}>
      <div className={styles.techTrack}>
        {[0, 1].map((copy) => <ul className={styles.techGroup} key={copy} aria-hidden={copy === 1 ? true : undefined}>
          {technologies.map((tech) => <li className={styles.techLogo} key={tech.file}><span data-tool={tech.file}><Image src={`/assets/tech/${tech.file}.svg`} alt="" width={34} height={34} /></span><span>{tech.name}</span></li>)}
        </ul>)}
      </div>
    </div>
  </section>;
}

// These small editorial illustrations describe capabilities, not live metrics or customer results.
function ServiceVisual({ stage }: { stage: number }) {
  return <div className={styles.serviceVisual} data-stage={stage} aria-hidden="true">
    <div className={styles.visualTop}><span>From idea to online.</span><span>{services[stage].short}</span></div>
    <div key={stage} className={styles.visualContent} data-visual-content>
      {stage === 0 && <div className={styles.figmaCanvas}>
        <Image className={styles.figmaMark} src="/assets/tech/figma.svg" alt="" width={35} height={52} />
        <div className={styles.miniArtboard}><div className={styles.miniNav}>Your brand <span>Let’s talk ↗</span></div><strong>Make a<br /><em>great first<br />impression.</em></strong><span className={styles.miniButton}>Discover more ↗</span><div className={styles.artShape} /></div>
        <div className={styles.selectionCursor} data-live-cursor><MousePointer2 size={25} fill="currentColor" /><span>Made for your business</span></div>
      </div>}
      {stage === 1 && <div className={styles.devices}><div className={styles.desktopDevice}><span>Your brand</span><strong>One website.<br /><em>Every screen.</em></strong><div className={styles.deviceBlocks}><i /><i /><i /></div></div><div className={styles.phoneDevice}><i className={styles.dynamicIsland} /><span>Your<br />brand</span><strong>Looks<br />good<br /><em>here, too.</em></strong><ArrowUpRight size={32} /></div><div className={styles.codeTag}><Code2 size={18} /> Built with care</div></div>}
      {stage === 2 && <div className={styles.shopVisual}><div className={styles.bagStage}><ShoppingBag strokeWidth={1} size={110} /></div><div className={styles.shopReceipt}><strong>A little less clicking.</strong><span>A much easier checkout.</span><div><span>Choose</span><ArrowRight size={15} /><span>Pay</span><ArrowRight size={15} /><Check size={18} /></div></div></div>}
      {stage === 3 && <div className={styles.searchVisual}><div className={styles.searchField}><Search size={20} /><span>Find a business like yours</span></div><div className={styles.searchResult}><Globe2 size={23} /><small>Your business</small><strong>Exactly what they’re looking for.</strong><p>Helpful information. Clear services. A reason to get in touch.</p></div><div className={styles.contentTag}><Check size={16} /> Clear words. Useful answers.</div></div>}
      {stage === 4 && <div className={styles.connectVisual}>
        <div className={styles.connectCore}><span><LayoutTemplate size={30} /></span><strong>Your website</strong><small>One useful front door</small></div>
        <svg className={styles.connectLines} viewBox="0 0 420 130" preserveAspectRatio="none"><path d="M210 4v32M210 36C210 68 63 49 63 94M210 36v58M210 36c0 32 147 13 147 58" /></svg>
        <div className={styles.connectDestinations}><span><b>01</b>Inbox</span><span><b>02</b>Bookings</span><span><b>03</b>Customer tools</span></div>
        <div className={styles.connectPulse}><i /><span>Everything stays in sync</span></div>
      </div>}
      {stage === 5 && <div className={styles.launchVisual}><div className={styles.launchGlobe}><Globe2 strokeWidth={.8} size={145} /><ArrowUpRight size={66} /></div><strong>Hello, world.</strong><p>Tested. Ready. Yours.</p><div><Check size={17} /> Let’s put your business online.</div></div>}
    </div>
    <p className={styles.visualCaption}>{services[stage].outcome}</p>
  </div>;
}

export default function WebDesignPage() {
  const root = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const scrollTween = useRef<gsap.core.Tween | null>(null);
  const [activeService, setActiveService] = useState(0);

  useGSAP(() => {
    let active = true;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.from("[data-hero-kicker]", { y: 22, opacity: 0, duration: .85 }, .08)
        .from("[data-hero-line]", { yPercent: 112, rotate: 3, duration: 1.15, stagger: .14 }, .18)
        .from("[data-hero-copy]", { y: 24, opacity: 0, duration: .85, stagger: .1 }, .65)
        .from("[data-browser-reveal]", { clipPath: "inset(49.8% 0% 49.8% 0% round 10px)", scale: .88, duration: 1.65, ease: "expo.inOut" }, .05)
        .from("[data-assemble]", { y: 65, opacity: 0, rotate: -8, duration: 1.25, stagger: .12 }, .75);

      // Separate wrappers keep the opening and scroll choreography from competing for transforms.
      gsap.timeline({ scrollTrigger: { trigger: hero.current, start: "top top", end: "bottom top", scrub: 1 } })
        .to("[data-browser-scroll]", { rotate: 0, y: -65, ease: "none" }, 0)
        .to("[data-scene-depth]", { y: -35, ease: "none" }, 0);

      // Dynamic polygonal path movement: Hexagon (6-sided) and Octagon (8-sided)
      const animateDynamicPolygon = (
        selector: string,
        sides: 6 | 8,
        baseRx: number,
        baseRy: number,
        baseDuration: number,
        clockwise = true,
        startVertex = 0
      ) => {
        const el = root.current?.querySelector<HTMLElement>(selector);
        if (!el) return;

        const isMobile = window.innerWidth < 650;
        const rx = baseRx * (isMobile ? 0.72 : 1);
        const ry = baseRy * (isMobile ? 0.72 : 1);
        const step = (Math.PI * 2) / sides;
        const dir = clockwise ? 1 : -1;
        let vertex = startVertex;

        const nextMove = () => {
          if (!active) return;

          vertex = (vertex + 1) % sides;
          const angle = dir * vertex * step;

          // Subtle organic jitter around each polygon vertex
          const jitterX = gsap.utils.random(-2.2, 2.2);
          const jitterY = gsap.utils.random(-1.8, 1.8);
          const targetX = Math.round((rx * Math.cos(angle) + jitterX) * 10) / 10;
          const targetY = Math.round((ry * Math.sin(angle) + jitterY) * 10) / 10;

          // Tangent angle determines natural cursor rotation with dynamic tilt
          const tangent = angle + (clockwise ? Math.PI / 2 : -Math.PI / 2);
          const targetRot = Math.round((Math.sin(tangent) * 4.5 + gsap.utils.random(-1, 1)) * 10) / 10;

          // Dynamic segment speed and occasional natural hesitation at corners
          const segDuration = gsap.utils.random(baseDuration * 0.88, baseDuration * 1.18);
          const pause = Math.random() < 0.28 ? gsap.utils.random(0.06, 0.2) : 0;

          gsap.to(el, {
            x: targetX,
            y: targetY,
            rotation: targetRot,
            duration: segDuration,
            delay: pause,
            ease: "power1.inOut",
            onComplete: nextMove,
          });
        };

        // Initialize at starting vertex
        const startAngle = dir * vertex * step;
        gsap.set(el, {
          x: Math.round(rx * Math.cos(startAngle) * 10) / 10,
          y: Math.round(ry * Math.sin(startAngle) * 10) / 10,
          rotation: 0,
        });

        nextMove();
      };

      // Purple cursor ("Designer #1") traces a dynamic 6-sided Hexagon (clockwise)
      animateDynamicPolygon('[data-avatar-cursor="designer"]', 6, 26, 17, 1.1, true, 0);

      // Green cursor ("Developer #13") traces a dynamic 8-sided Octagon (counter-clockwise)
      animateDynamicPolygon('[data-avatar-cursor="developer"]', 8, 22, 16, 0.95, false, 2);

      gsap.to("[data-live-cursor]", { x: 10, y: -8, rotation: 4, duration: 1.7, ease: "sine.inOut", repeat: -1, yoyo: true });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, { y: 35, opacity: 0, duration: .9, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 91%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-work-image]").forEach((element) => {
        gsap.fromTo(element, { scale: 1.06 }, { scale: 1, ease: "none", scrollTrigger: { trigger: element, start: "top bottom", end: "bottom center", scrub: 1 } });
      });
    });

    // Chapter state remains functional for people who prefer reduced motion.
    services.forEach((service, index) => {
      ScrollTrigger.create({ trigger: `#${service.id}`, start: "top 58%", end: "bottom 58%", onEnter: () => setActiveService(index), onEnterBack: () => setActiveService(index) });
    });
    document.fonts.ready.then(() => { if (root.current) ScrollTrigger.refresh(); });
    return () => {
      active = false;
      media.revert();
      scrollTween.current?.kill();
      if (root.current) {
        gsap.killTweensOf(root.current.querySelectorAll("[data-avatar-cursor]"));
      }
    };
  }, { scope: root });

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from("[data-sticky-visual] [data-visual-content]", { opacity: .35, y: 14, duration: .45, ease: "power2.out" });
  }, { scope: root, dependencies: [activeService], revertOnUpdate: true });

  const goTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    scrollTween.current?.kill();
    const complete = () => { target.focus({ preventScroll: true }); window.history.replaceState(null, "", `#${id}`); };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      target.scrollIntoView({ behavior: "instant", block: "start" });
      complete();
    } else {
      scrollTween.current = gsap.to(window, { scrollTo: { y: target, offsetY: 115, autoKill: true }, duration: 1, ease: "power3.inOut", onComplete: complete });
    }
  };

  return <div ref={root} className={`${styles.page} ${body.className} ${display.variable}`}>
    <section ref={hero} className={styles.hero} aria-labelledby="web-hero-title">
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.heroKicker} data-hero-kicker>Good design gets attention</p>
          <h1 id="web-hero-title" className={styles.heroHeadline}>
            <span className={styles.lineMask}><span data-hero-line className={styles.heroTitleLineWhite}>A Great Website</span></span>
            <span className={styles.lineMask}><span data-hero-line className={styles.heroTitleLineLime}>Earns The Next Click.</span></span>
          </h1>
          <p className={styles.heroDescription} data-hero-copy>Give your business a website that looks the part, makes things easy and turns more visits into conversations. We take care of everything, from the first design to launch day.</p>
          <div className={styles.heroActions} data-hero-copy><StrategyCTA /><a href="#website-services" onClick={(event) => goTo(event, "website-services")} className={styles.textLink}>Explore our services <ArrowDown size={17} /></a></div>
        </div>
        <WebsiteScene />
      </div>
      <div className={`${styles.container} ${styles.heroBottom}`} data-hero-copy>
        <a href="#selected-work" onClick={(event) => goTo(event, "selected-work")}>See what we’ve made <ArrowUpRight size={19} /></a>
      </div>
    </section>

    <TechStackSection />

    <section className={styles.intro} aria-labelledby="intro-title">
      <div className={`${styles.container} ${styles.introGrid}`}>
        <h2 id="intro-title" data-reveal>Good looks are<br />only the <span>beginning.</span></h2>
        <div data-reveal><p className={styles.largeCopy}>Your website should help someone say,<br className={styles.desktopBreak} /> “Yes. This is who I need.”</p><p>We bring design, words and technology together so people understand your business, trust what they see and know what to do next.</p><div className={styles.promiseList}><span><Check size={17} /> Clear to understand</span><span><Check size={17} /> Easy to use</span><span><Check size={17} /> Ready to grow</span></div></div>
      </div>
    </section>

    <section id="website-services" tabIndex={-1} className={styles.services} aria-labelledby="services-title">
      <div className={styles.container}>
        <div className={styles.sectionHeading} data-reveal><h2 id="services-title">Everything your<br />website <span>needs.</span></h2><p>One team, from your first idea to your next chapter.<br />Choose the support that fits your business.</p></div>
        <div className={styles.servicesLayout}>
          <div className={styles.stickySide} data-sticky-visual><ServiceVisual stage={activeService} /></div>
          <div className={styles.chapters}>
            {services.map((service, index) => <article key={service.id} id={service.id} tabIndex={-1} className={styles.chapter}>
              <div data-reveal><div className={styles.serviceName}>{index === 0 ? <Image src="/assets/tech/figma.svg" alt="" width={22} height={32} /> : <service.icon size={25} strokeWidth={1.5} />}<h3>{service.name}</h3></div><h4>{service.heading}</h4><p>{service.copy}</p><ul>{service.points.map((point) => <li key={point}><Check size={17} /><span>{point}</span></li>)}</ul><a href="/contact" className={styles.textLink}>Let’s talk about your website <ArrowUpRight size={18} /></a></div>
              <div className={styles.mobileVisual}><ServiceVisual stage={index} /></div>
            </article>)}
          </div>
        </div>
      </div>
    </section>

    <section id="selected-work" tabIndex={-1} className={styles.work} aria-labelledby="work-title">
      <div className={styles.container}>
        <div className={styles.sectionHeading} data-reveal><h2 id="work-title">Different businesses.<br /><span>Distinctly theirs.</span></h2><Link href="/projects" className={styles.textLink}>Explore our work <ArrowUpRight size={20} /></Link></div>
        <div className={styles.workGrid}>
          <Link href="/projects" className={styles.workCard} data-reveal><div className={styles.workPicture}><Image src={projectImage} alt="Walker Building Contractors website with bold roofing services and architectural photography" sizes="(max-width: 700px) 90vw, 48vw" placeholder="blur" data-work-image /></div><div className={styles.workCaption}><div><h3>Walker Building Contractors</h3><p>A clear, confident home for a hands-on business.</p></div><ArrowUpRight size={23} /></div></Link>
          <a href="https://www.sanchezwatt.com/" target="_blank" rel="noopener noreferrer" className={styles.workCard} data-reveal><div className={`${styles.workPicture} ${styles.sanchezPicture}`}><Image src={sanchezImage} alt="Sanchez Watt coaching and mentoring website, with bold yellow typography and football photography" sizes="(max-width: 700px) 90vw, 48vw" placeholder="blur" data-work-image /></div><div className={styles.workCaption}><div><h3>Sanchez Watt</h3><p>Personality and purpose, brought to the screen.</p></div><ArrowUpRight size={23} aria-label="Visit website in a new tab" /></div></a>
        </div>
      </div>
    </section>

    <section className={styles.process} aria-labelledby="process-title"><div className={styles.container}>
      <div className={styles.sectionHeading} data-reveal><h2 id="process-title">A clear process.<br /><span>No guessing games.</span></h2><p>You’ll know what’s happening,<br />what we need and what comes next.</p></div>
      <div className={styles.processGrid}>{[
        { icon: MousePointer2, title: "Tell us what you need.", copy: "We talk about your business, your customers and what your website should achieve. Then we agree the scope and budget." },
        { icon: LayoutTemplate, title: "See it take shape.", copy: "Review your designs in Figma. We work through your feedback together before moving into development." },
        { icon: Code2, title: "Try it for yourself.", copy: "Explore your working website on a private preview. We check the pages, forms and mobile experience together." },
        { icon: Globe2, title: "Go live with confidence.", copy: "We manage the launch, show you how things work and agree any support you’d like going forward." },
      ].map((step) => <div className={styles.processStep} key={step.title} data-reveal><step.icon size={28} strokeWidth={1.4} /><h3>{step.title}</h3><p>{step.copy}</p></div>)}</div>
    </div></section>

    <MainCTA id="web-design-closing" />

    <section className={styles.faq} aria-labelledby="faq-title"><div className={`${styles.container} ${styles.faqGrid}`}><div data-reveal><h2 id="faq-title">A few things<br />you might be<br /><span>wondering.</span></h2><p>Still have a question?<br /><Link href="/contact" className={styles.textLink}>Let’s talk <ArrowUpRight size={18} /></Link></p></div><div>{faqs.map(([question, answer]) => <details key={question} onToggle={() => ScrollTrigger.refresh()}><summary>{question}<Plus size={21} /><ChevronDown size={21} /></summary><p>{answer}</p></details>)}</div></div></section>
  </div>;
}
