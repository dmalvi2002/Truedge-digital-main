"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sora, IBM_Plex_Sans } from "next/font/google";
import { ArrowDown, ArrowUpRight, Check, Phone, PhoneCall, CalendarDays, MessageSquare, ArrowRight, Plus, FileText, Mail, Users, AudioLines } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import styles from "./AiAutomationPage.module.css";
import heroStyles from "./MainHeroTwo.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);
const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

const chapters = [
  { id: "ai-call-agents", name: "AI call agents", title: "Every call.", accent: "A good conversation.", intro: "Your next customer could call while you’re on a job, in a meeting or finished for the day. Give them a helpful voice that knows what to do next.", points: ["Answer enquiries in your business’s voice", "Qualify leads and book appointments", "Hand the conversation to your team when needed"], outcome: "More conversations. Fewer missed opportunities." },
  { id: "agentic-solutions", name: "Agentic AI solutions", title: "Give it a goal.", accent: "Watch work move.", intro: "Go beyond a single automated reply. We build agents that understand a task, find the right information and work across your tools to complete it.", points: ["Research, qualify and route new opportunities", "Work with your documents and business knowledge", "Keep important decisions with your people"], outcome: "From a new request to a clear next step." },
  { id: "workflow-automation", name: "Workflow automation", title: "Join the dots.", accent: "Get your time back.", intro: "The same details shouldn’t need typing into three different systems. Connect your everyday tools so information flows and follow-ups happen.", points: ["Connect your inbox, CRM, calendar and forms", "Automate handovers, reminders and routine admin", "Keep a clear record of what happened and why"], outcome: "Less chasing. Less copying. More moving forward." },
];

const faqs = [
  ["Where should we start with AI?", "Start with one repeated task or a clear bottleneck: missed calls, slow follow-ups or time spent moving information between tools. We review the process with you and recommend a focused first project."],
  ["Can an AI call agent use our existing phone number?", "Often, yes, through call forwarding or a connection to your phone system. We check your current setup, agree when the agent should answer and plan a reliable handoff to your team."],
  ["How is an AI agent different from a chatbot?", "A chatbot usually answers within a conversation. An agent can also use approved tools to carry out a task, such as checking availability, creating a record or preparing a follow-up. We define exactly what it is allowed to do."],
  ["Will this work with our existing systems?", "We review the tools you already use and their available integrations. Where a connection is possible, we build around your current setup and explain any limitations before work starts."],
  ["How do we stay in control?", "We agree permissions, approval steps and escalation rules before launch. Your team can review sensitive actions, and workflows are tested against realistic situations before being introduced gradually."],
];

function Button({ children = "Book a Free Strategy Call" }: { children?: React.ReactNode }) {
  return <Link href="/contact" className={heroStyles.cta}><span>{children}</span><span className={heroStyles.ctaIcon} aria-hidden="true"><ArrowUpRight size={21} /></span></Link>;
}

/** Isometric processor assembly: circuit substrate, floating compute layer and a lit AI die. */
function AiProcessor({ variant = "hero" }: { variant?: "hero" | "story" }) {
  const id = `processor-${variant}`;
  const routes = ["M-80 -34H-126V-108H-162", "M-80 0H-145V53H-165", "M-80 34H-115V127H-163", "M80 -34H121V-120H163", "M80 0H146V52H165", "M80 34H110V127H162", "M-35 -80V-119H-81V-163", "M0 -80V-164", "M35 -80V-137H85V-163", "M-35 80V119H-82V163", "M0 80V164", "M35 80V139H86V164"];
  return <svg className={styles.processor} viewBox="0 0 700 560" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-board`} x1="-170" y1="-170" x2="170" y2="170" gradientUnits="userSpaceOnUse"><stop stopColor="#35452c" stopOpacity=".8" /><stop offset="1" stopColor="#111b13" stopOpacity=".96" /></linearGradient>
      <linearGradient id={`${id}-die`} x1="-80" y1="-80" x2="80" y2="80" gradientUnits="userSpaceOnUse"><stop stopColor="#758e53" /><stop offset=".46" stopColor="#2e4029" /><stop offset="1" stopColor="#14211b" /></linearGradient>
      <linearGradient id={`${id}-edge`}><stop stopColor="#60754a" /><stop offset=".5" stopColor="#d0f895" /><stop offset="1" stopColor="#425d36" /></linearGradient>
      <radialGradient id={`${id}-glow`}><stop stopColor="#a6d45d" stopOpacity=".25" /><stop offset="1" stopColor="#a6d45d" stopOpacity="0" /></radialGradient>
    </defs>
    <ellipse cx="350" cy="390" rx="275" ry="115" fill={`url(#${id}-glow)`} />
    <g className={styles.processorAssembly}>
      <g transform="translate(350 362) matrix(.866 .5 -.866 .5 0 0)">
        <rect x="-177" y="-177" width="354" height="354" rx="17" fill="#0d1510" stroke="#6c875b" strokeOpacity=".35" />
        <rect x="-162" y="-162" width="324" height="324" rx="11" stroke="#668653" strokeOpacity=".24" strokeDasharray="3 8" />
        {[-120, -60, 0, 60, 120].map(value => <path key={value} d={`M${value} -149V149M-149 ${value}H149`} stroke="#6f9254" strokeOpacity=".14" />)}
      </g>
      <path d="M77 296V337M350 138V202M623 296V337M350 454V518" stroke="#b6db83" strokeOpacity=".25" strokeDasharray="3 5" />
      <g transform="translate(350 288) matrix(.866 .5 -.866 .5 0 0)">
        <rect x="-177" y="-169" width="354" height="354" rx="16" fill="#172318" stroke="#698653" strokeOpacity=".5" />
        <rect x="-177" y="-177" width="354" height="354" rx="16" fill={`url(#${id}-board)`} stroke={`url(#${id}-edge)`} strokeOpacity=".7" />
        <rect x="-163" y="-163" width="326" height="326" rx="8" stroke="#9db27e" strokeOpacity=".17" />
        {routes.map((route, index) => <g key={route}><path d={route} stroke="#829d62" strokeWidth="1.5" strokeOpacity=".45" /><path d={route} className={styles.circuitSignal} style={{ "--signal-delay": `${index * -.37}s` } as CSSProperties} stroke={index % 3 === 0 ? "#dbcee9" : "#c1fb00"} strokeWidth="2" strokeLinecap="round" /></g>)}
        <g className={styles.energyOverlay} stroke="#65dfff" strokeLinecap="round">
          <rect x="-173" y="-173" width="346" height="346" rx="14" strokeWidth="2" />
          {routes.map((route, index) => <g key={route}><path d={route} strokeWidth="2" opacity=".35" /><path d={route} pathLength="100" className={styles.energyPulse} style={{ "--pulse-delay": `${index * .045}s` } as CSSProperties} strokeWidth="4" /></g>)}
        </g>
        {[-147, 147].flatMap(x => [-147, 147].map(y => <g key={`${x}-${y}`}><circle cx={x} cy={y} r="5" stroke="#a4bd83" strokeOpacity=".65" /><circle cx={x} cy={y} r="1.5" fill="#c1fb00" /></g>))}
        <rect x="-79" y="-79" width="158" height="158" rx="8" stroke="#c1fb00" strokeOpacity=".3" fill="#b5e27b" fillOpacity=".04" />
      </g>
      <g className={styles.processorDie}>
        <path d="M218 218V235L350 311L482 235V218L350 294Z" fill="#1f321e" stroke="#708b52" strokeWidth="1" />
        <g transform="translate(350 218) matrix(.866 .5 -.866 .5 0 0)">
          {Array.from({ length: 9 }, (_, i) => { const p = -64 + i * 16; return <g key={i} stroke="#9bac84" strokeWidth="5"><path d={`M${p} -88V-103M${p} 88V103M-88 ${p}H-103M88 ${p}H103`} /></g>; })}
          <rect x="-88" y="-88" width="176" height="176" rx="10" fill="#1c2d1c" stroke={`url(#${id}-edge)`} strokeWidth="2" />
          <rect x="-74" y="-74" width="148" height="148" rx="5" fill={`url(#${id}-die)`} stroke="#a0c779" strokeOpacity=".6" />
          <rect className={styles.electricDie} x="-74" y="-74" width="148" height="148" rx="5" fill="#07579a" stroke="#8eeaff" strokeWidth="3" />
          <path d="M-61 -32V-61H-32M32 -61H61V-32M61 32V61H32M-32 61H-61V32" stroke="#d2f4a4" strokeOpacity=".65" strokeWidth="1.5" />
          <text x="0" y="17" textAnchor="middle" fill="#e3ffc0" fontSize="55" fontWeight="500" fontFamily="Arial, sans-serif" letterSpacing="-3">AI</text>
          <path d="M-21 40H21" stroke="#c1fb00" strokeWidth="2" className={styles.processorLight} />
          <circle cx="52" cy="-51" r="3" fill="#c1fb00" className={styles.processorLight} />
        </g>
      </g>
    </g>
  </svg>;
}

function InteractiveProcessor() {
  const [phase, setPhase] = useState<"ready" | "active" | "cooldown">("ready");
  const locked = useRef(false);

  useEffect(() => {
    if (phase === "ready") return;
    // The lock spans the complete visual sequence AND three seconds after it.
    const timer = window.setTimeout(() => {
      if (phase === "active") setPhase("cooldown");
      else { locked.current = false; setPhase("ready"); }
    }, phase === "active" ? 3200 : 3000);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const activate = () => {
    if (locked.current) return;
    locked.current = true;
    setPhase("active");
  };

  return <button type="button" className={styles.processorControl} data-phase={phase}
    aria-label="Activate AI chip: dock and send energy through the circuit board"
    aria-disabled={phase !== "ready"}
    onPointerEnter={event => { if (event.pointerType !== "touch") activate(); }} onClick={activate}>
    <div className={styles.networkNodes} aria-hidden="true">
      <span><AudioLines size={18} />Voice</span><span><MessageSquare size={18} />Reason</span><span><Check size={18} />Action</span>
    </div>
    <AiProcessor />
  </button>;
}

function Waveform() {
  return <div className={styles.waveform} aria-hidden="true">{Array.from({ length: 35 }, (_, i) => <i key={i} style={{ "--height": `${(16 + Math.sin(i * .82) ** 2 * 57 + Math.sin(i * .24) ** 2 * 27).toFixed(2)}%`, "--delay": `${(i * -.08).toFixed(2)}s` } as CSSProperties} />)}</div>;
}

function LiveVoiceCard() {
  const [step, setStep] = useState(0);
  const busy = useRef(false);
  useEffect(() => {
    if (!step) return;
    const timer = window.setTimeout(() => {
      if (step === 3) { busy.current = false; setStep(0); }
      else setStep(step + 1);
    }, 1800);
    return () => window.clearTimeout(timer);
  }, [step]);
  const play = () => { if (!busy.current) { busy.current = true; setStep(1); } };
  const messages = ["Hello. How can I help?", "I’m here. Tell me more.", "Let’s find a time for you.", "You’re all set. Speak soon."];
  return <button type="button" className={styles.liveVoice} data-speaking={step > 0}
    aria-label="Play visual AI conversation demo" onClick={play}
    onPointerEnter={event => { if (event.pointerType !== "touch") play(); }}>
    <span className={styles.voiceOrb}><AudioLines size={25} /></span>
    <span className={styles.voiceWords}><small><i />A voice for your business.</small><strong key={step}>{messages[step]}</strong></span>
    <span className={styles.voicePhone}><Phone size={18} /></span>
    <span className={styles.liveBars} aria-hidden="true">{Array.from({length: 28}, (_, i) => <i key={i} style={{"--bar": `${(12 + Math.sin(i * .8) ** 2 * 88).toFixed(2)}%`, "--beat": `${(i * -.09).toFixed(2)}s`} as CSSProperties} />)}</span>
  </button>;
}

function AutomationVisual() {
  const nodes = [
    { x: 150, y: 18, title: "New enquiry", detail: "Webhook · form submitted", Icon: Mail, tone: "#d9cbed" },
    { x: 150, y: 108, title: "Qualify with AI", detail: "Extract intent & lead details", Icon: MessageSquare, tone: "#c1fb00" },
    { x: 150, y: 198, title: "Ready to book?", detail: "Condition · intent = booking", Icon: ArrowRight, tone: "#e6c885" },
    { x: 28, y: 306, title: "Book a call", detail: "Calendar · create event", Icon: CalendarDays, tone: "#c1fb00" },
    { x: 272, y: 306, title: "Send to team", detail: "CRM · assign follow-up", Icon: Users, tone: "#d9cbed" },
  ];
  return <div className={styles.workflowEditor}>
    <div className={styles.editorHeader}><span className={styles.editorMark}><MessageSquare size={17}/></span><div><small>WORKFLOWS / LEAD INTAKE</small><strong>Enquiry to appointment</strong></div><span className={styles.editorSaved}><Check size={12}/>Saved</span></div>
    <div className={styles.editorToolbar}><span>Editor</span><span>Executions</span><small><i/>Example workflow</small></div>
    <div className={styles.editorCanvas}>
      <svg viewBox="0 0 480 390" fill="none" aria-hidden="true">
        {["M240 72V108", "M240 162V198", "M240 252V270Q240 280 230 280H128Q118 280 118 290V306", "M240 252V270Q240 280 250 280H352Q362 280 362 290V306"].map((d,i)=><g key={d}><path d={d} stroke="#53624f" strokeWidth="1.5"/><path d={d} pathLength="100" className={styles.workflowTrace} style={{"--step-delay":`${i * 1.1}s`} as CSSProperties} stroke={i===3?"#cdbce0":"#c1fb00"} strokeWidth="2"/></g>)}
        <text x="142" y="272" fill="#a5c875" fontSize="10">Yes</text><text x="315" y="272" fill="#b7a7c7" fontSize="10">Review</text>
        {nodes.map(({x,y,title,detail,Icon,tone},i)=><g key={title} transform={`translate(${x} ${y})`} className={styles.workflowNode} style={{"--step-delay":`${i * 1.1}s`} as CSSProperties}>
          <rect className={styles.workflowNodeFrame} width="180" height="54" rx="8" fill="#1b231f" stroke="#465246"/>
          <rect x="10" y="12" width="30" height="30" rx="6" fill={tone} fillOpacity=".12"/><Icon x={17} y={19} size={16} color={tone}/>
          <text x="49" y="23" fill="#f0f1e9" fontSize="11" fontWeight="500">{title}</text><text x="49" y="39" fill="#9da99c" fontSize="8">{detail}</text>
          {i>0 && <circle cx="90" cy="0" r="3" fill="#121915" stroke="#a2b196"/>}
          {i<3 && <circle cx="90" cy="54" r="3" fill="#121915" stroke="#a2b196"/>}
        </g>)}
      </svg>
    </div>
    <div className={styles.editorFooter}><span><i/>Execution preview</span><span>Trigger <ArrowRight size={10}/> AI <ArrowRight size={10}/> Action</span></div>
  </div>;
}

function ServiceScene({ stage }: { stage: number }) {
  return <div className={styles.serviceScene} data-stage={stage} aria-hidden="true">
    <div className={styles.sceneBackdrop} />
    <div className={styles.sceneContent} data-visible={stage === 0}>
      <div className={styles.voicePoster}><span>Good conversations don’t clock off.</span><div className={styles.bookingBadge}><span><CalendarDays size={22} /><Check size={14} /></span><small>A clear next step</small><strong>Consultation<br />booked</strong></div><div className={styles.posterPhone}><PhoneCall size={32} strokeWidth={1.4} /></div><strong>Hello.<br /><em>How can I help?</em></strong><Waveform /><div className={styles.posterBottom}><span>Your business. Your voice.</span><span>AI CALL AGENT</span></div></div>
    </div>
    <div className={styles.sceneContent} data-visible={stage === 1}>
      <AutomationVisual />
    </div>
    <div className={styles.sceneContent} data-visible={stage === 2}>
      <div className={styles.flowPoster}><span>Everything, a little more connected.</span><h3>One enquiry.<br /><em>All in sync.</em></h3><div className={styles.flowSteps}>{[{ icon: Mail, label: "Enquiry received", detail: "From your website" }, { icon: Users, label: "Contact created", detail: "Organised in your CRM" }, { icon: CalendarDays, label: "Follow-up ready", detail: "The right person, notified" }].map(({ icon: Icon, label, detail }) => <div key={label}><span><Icon size={20} /></span><div><strong>{label}</strong><small>{detail}</small></div><Check size={15} /></div>)}</div><span className={styles.flowFoot}>Less admin. More room to grow. <ArrowUpRight size={19} /></span></div>
    </div>
  </div>;
}

export default function AiAutomationPage() {
  const root = useRef<HTMLDivElement>(null);
  const scrollTween = useRef<gsap.core.Tween | null>(null);
  const [active, setActive] = useState(0);

  const navigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    scrollTween.current?.kill();
    scrollTween.current = gsap.to(window, { scrollTo: { y: target, offsetY: 110, autoKill: true }, duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1.1, ease: "power3.inOut", onComplete: () => { target.focus({ preventScroll: true }); window.history.replaceState(null, "", `#${id}`); } });
  };

  useGSAP(() => {
    const media = gsap.matchMedia();
    gsap.utils.toArray<HTMLElement>("[data-ai-chapter]").forEach((chapter, index) => {
      ScrollTrigger.create({ trigger: chapter, start: "top 55%", end: "bottom 55%", onEnter: () => setActive(index), onEnterBack: () => setActive(index) });
    });
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-ai-word]", { yPercent: 110, rotation: 3, stagger: .13, duration: 1.25, ease: "power4.out" });
      gsap.from("[data-ai-intro]", { y: 25, opacity: 0, stagger: .12, delay: .3, duration: 1, ease: "power3.out" });
      gsap.from("[data-ai-art]", { opacity: 0, scale: .94, y: 16, duration: 1.4, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>("[data-ai-reveal]").forEach(element => {
        gsap.from(element, { y: 32, opacity: 0, duration: .9, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 92%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-ai-ink]").forEach(element => {
        gsap.fromTo(element, { backgroundSize: "0% 100%" }, { backgroundSize: "100% 100%", ease: "none", scrollTrigger: { trigger: element, start: "top 88%", end: "top 45%", scrub: .7 } });
      });
      gsap.fromTo("[data-ai-human-image]", { yPercent: -7, scale: 1.15 }, { yPercent: 7, scale: 1.05, ease: "none", scrollTrigger: { trigger: "[data-ai-human]", start: "top bottom", end: "bottom top", scrub: 1 } });
      media.add("(min-width: 1024px)", () => {
        gsap.timeline({ scrollTrigger: { trigger: "[data-ai-hero]", start: "top top", end: "bottom top", scrub: 1 }, defaults: { ease: "none" } })
          .to("[data-ai-composition]", { y: -20 }, 0);
      });
    });
    return () => { scrollTween.current?.kill(); media.revert(); };
  }, { scope: root });

  return <div ref={root} className={`${styles.page} ${sora.className}`}>
    <section className={styles.hero} data-ai-hero aria-labelledby="ai-title">
      <div className={`${styles.container} ${styles.heroLayout}`}>
        <div className={styles.heroCopy} data-ai-hero-copy>
          <h1 id="ai-title"><span className={styles.wordMask}><span data-ai-word>Less busywork.</span></span><span className={styles.wordMask}><span data-ai-word>More <em>possibility.</em></span></span></h1>
          <p className={plex.className} data-ai-intro>AI that answers your calls, takes care of the repetitive work and keeps your business moving. Built around you. Working with your team.</p>
          <div className={styles.heroActions} data-ai-intro><Button /><a href="#ai-services" onClick={event => navigate(event, "ai-services")} className={styles.explore}>Discover what’s possible <ArrowDown size={16} /></a></div>
        </div>
        <div className={styles.heroArt} data-ai-composition>
          <div className={styles.artGlow} />
          <div className={styles.processorWrap} data-ai-art><InteractiveProcessor /></div>
          <LiveVoiceCard />
        </div>
      </div>
    </section>

    <section className={styles.intro} aria-labelledby="ai-intro">
      <div className={styles.container}>
        <div className={styles.headingRow}><h2 id="ai-intro" data-ai-reveal>There’s a better use<br />of your <em>time.</em></h2><p className={plex.className} data-ai-reveal>Answering the same questions. Chasing the next reply. Moving information from one place to another. We help you hand that work to AI, so your people can get back to the work they do best.</p></div>
        <div className={styles.beforeAfter} data-ai-reveal><div><span>THE EVERYDAY FRICTION</span><p>A missed call.<br />Another manual task.<br />A follow-up forgotten.</p></div><div className={styles.shiftArrow} aria-hidden="true"><ArrowRight strokeWidth={1} /></div><div><span>A LITTLE MORE POSSIBILITY</span><p>A conversation started.<br />The details taken care of.<br /><em>Your team, one step ahead.</em></p></div></div>
      </div>
    </section>

    <section id="ai-services" tabIndex={-1} className={styles.services} aria-label="AI automation services">
      <div className={`${styles.container} ${styles.storyLayout}`}>
        <aside className={styles.storyGuide}><ServiceScene stage={active} /></aside>
        <div>{chapters.map((chapter, i) => <section id={chapter.id} tabIndex={-1} key={chapter.id} className={styles.chapter} data-ai-chapter aria-labelledby={`${chapter.id}-title`}>
          <div className={styles.mobileScene}><ServiceScene stage={i} /></div>
          <div className={styles.chapterCopy} data-ai-reveal>{i !== 1 && <span className={styles.serviceLabel}>0{i + 1} · {chapter.name}</span>}<h2 id={`${chapter.id}-title`}>{chapter.title}<br /><em>{chapter.accent}</em></h2><p className={plex.className}>{chapter.intro}</p><ul className={plex.className}>{chapter.points.map(point => <li key={point}><Check size={16} aria-hidden="true" />{point}</li>)}</ul><Link href="/contact" className={styles.inlineLink}>Let’s talk about your business <ArrowUpRight size={17} /></Link></div>
        </section>)}</div>
      </div>
    </section>

    <section className={styles.statement} aria-label="Connected AI for your business"><div className={styles.container}><p data-ai-reveal>Your people. Your processes. Your potential.</p><h2><span data-ai-ink>Working better.</span><br /><em data-ai-ink>Together.</em></h2><div className={styles.statementFoot}><span>Built into the tools you already use.</span><span>CRM <i>·</i> Email <i>·</i> Calendar <i>·</i> Your website</span></div></div></section>

    <section className={styles.moreServices} aria-labelledby="more-ai-title"><div className={styles.container}>
      <div className={styles.headingRow}><h2 id="more-ai-title" data-ai-reveal>More ways to make<br />the everyday <em>easier.</em></h2><p className={plex.className} data-ai-reveal>Useful intelligence, right where you need it. Start with one challenge and build on what works.</p></div>
      <div className={styles.moreGrid}>
        <article className={styles.knowledgeCard} data-ai-reveal><div className={styles.knowledgeVisual} aria-hidden="true"><div className={styles.documentBack}><FileText size={25} /><span>Your expertise.<br />Always to hand.</span></div><div className={styles.answerCard}><span><FileText size={15} /> YOUR BUSINESS KNOWLEDGE</span><strong>“What’s our process<br />for a new customer?”</strong><p>One useful answer, grounded in your own documents.</p><small><Check size={13} /> With a source to check</small></div></div><div className={styles.moreCopy}><h3>Your knowledge.<br /><em>One question away.</em></h3><p className={plex.className}>Private AI assistants that help your team find answers in your documents, processes and product information.</p><Link href="/contact">Explore knowledge assistants <ArrowUpRight size={19} /></Link></div></article>
        <article className={styles.supportCard} data-ai-reveal><div className={styles.supportVisual} aria-hidden="true"><span className={styles.customerMessage}>Can you help me with my booking?</span><span className={styles.agentMessage}><MessageSquare size={18} /><span>Of course. Let’s get that<br />sorted for you.</span></span><div className={styles.channelIcons}><span><MessageSquare size={21} /></span><span><Mail size={21} /></span><span><Users size={21} /></span></div></div><div className={styles.moreCopy}><h3>Helpful answers.<br /><em>Happier customers.</em></h3><p className={plex.className}>Support agents for your website, email and messaging channels, with a thoughtful handover to your team.</p><Link href="/contact">Explore customer support AI <ArrowUpRight size={19} /></Link></div></article>
      </div>
    </div></section>

    <section className={styles.human} data-ai-human aria-labelledby="human-title"><div className={`${styles.container} ${styles.humanLayout}`}>
      <div className={styles.humanImage}><Image src="/team-collaboration.jpg" alt="Colleagues discussing a plan together" fill sizes="(max-width: 767px) 90vw, 45vw" data-ai-human-image /><div><span>Technology takes care of the routine.</span><strong>People make<br />the <em>difference.</em></strong></div></div>
      <div className={styles.humanCopy}><h2 id="human-title" data-ai-reveal>Built to help.<br />Designed around <em>you.</em></h2><p className={plex.className} data-ai-reveal>Good automation should feel like a weight lifted. We build it with you, test it properly and make sure your team knows how to use it.</p><div className={styles.process}>{[["Start with what matters.", "We map where time and opportunities are being lost, then agree on one valuable place to begin."], ["Build it around your business.", "Your voice, your tools, your way of working. With clear rules for when a person should step in."], ["Test, introduce, improve.", "We test real scenarios, roll out carefully and review what’s working with your team."]].map(([title, copy], i) => <article key={title} data-ai-reveal><span>0{i + 1}</span><div><h3>{title}</h3><p className={plex.className}>{copy}</p></div></article>)}</div></div>
    </div></section>

    <section className={styles.closing} aria-labelledby="ai-close"><div className={styles.closeArt} aria-hidden="true"><AiProcessor variant="story" /></div><div className={styles.container}><h2 id="ai-close">Make room<br />for <em data-ai-ink>what’s next.</em></h2><div className={styles.closeBottom}><p className={plex.className}>A smarter way to work starts with a conversation.<br />Let’s find yours.</p><Button /></div></div></section>

    <section className={styles.faq} aria-labelledby="ai-faq"><div className={`${styles.container} ${styles.faqLayout}`}><div data-ai-reveal><h2 id="ai-faq">Good questions.<br /><em>Clear answers.</em></h2><p className={plex.className}>A few things you might be wondering before we talk.</p></div><div>{faqs.map(([question, answer]) => <details key={question} onToggle={() => ScrollTrigger.refresh()}><summary>{question}<Plus size={20} aria-hidden="true" /></summary><p className={plex.className}>{answer}</p></details>)}</div></div></section>
  </div>;
}
