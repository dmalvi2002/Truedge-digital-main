"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { ArrowUpRight, Check, CheckCircle2, Loader2, Mail, MessageCircle, Phone } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { getPricingOffer, carePlans } from "@/lib/pricing";
import { submitToGoogleSheet } from "@/app/actions";
import styles from "./ContactPage.module.css";

const display = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--contact-display" });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });
gsap.registerPlugin(useGSAP);

const services = [
  ["Website Development", "Web design & development"], ["Paid Marketing", "Paid marketing"],
  ["Growth & SEO", "SEO"], ["AI Automation", "AI & automation"],
  ["Website Hosting", "Hosting & website care"], ["SaaS Development", "Web apps & software"],
  ["Mobile App Development", "Mobile apps"], ["Bespoke WordPress", "WordPress"],
  ["Migration", "Website migration"], ["Cloud Architecture", "Cloud infrastructure"],
];
type Offer = { title: string; detail: string; service: string } | null;

export default function ContactPage() {
  const params = useSearchParams();
  const id = params.get("offer");
  const selected = getPricingOffer(id);
  const care = carePlans.find((plan) => plan.id === id);
  const offer: Offer = selected ? {
    title: `${selected.service.name} · ${selected.plan.name}`,
    detail: selected.plan.price ? `From £${selected.plan.price} ${selected.service.billing}, after 50% off.` : "Claim 50% off your tailored quote.",
    service: selected.service.contactService,
  } : care ? { title: care.name, detail: "50% off. Monthly cost and offer terms to be discussed.", service: "Website Hosting" }
    : id === "hosting" ? { title: "Website hosting", detail: "Hosting packages from £5 per month.", service: "Website Hosting" }
    : id === "discount" ? { title: "Your 50% discount enquiry", detail: "We’ll confirm your service, scope and offer in your proposal.", service: "" } : null;
  const project = params.get("project") === "walker" ? "Walker Roofing & Building Contractors" : null;
  return <ContactExperience key={`${offer ? id : "general"}-${project ?? ""}`} offer={offer} project={project} />;
}

function ContactExperience({ offer, project }: { offer: Offer; project: string | null }) {
  const root = useRef<HTMLDivElement>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>(offer?.service ? [offer.service] : project ? ["Website Development"] : []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const sending = useRef(false);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 1100px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-contact-intro]", { y: 28, opacity: 0, duration: .9, stagger: .12, ease: "power3.out" });
    });
    return () => media.revert();
  }, { scope: root });

  const toggle = (service: string) => setSelectedServices((current) => current.includes(service) ? current.filter((value) => value !== service) : [...current, service]);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    sending.current = true;
    setIsSubmitting(true);
    setError("");
    const data = new FormData(event.currentTarget);
    data.set("services", selectedServices.join(", ") || "Not sure yet");
    data.set("phone", data.get("phone") ? `'${data.get("phone")}` : "Not provided");
    data.set("budget", String(data.get("budget") || "To be discussed"));
    data.set("business", String(data.get("business") || "Not specified"));
    data.set("details", [offer && `${offer.title}: ${offer.detail}`, project && `Inspired by: ${project}`, data.get("details") || "No details provided"].filter(Boolean).join("\n\n"));
    try {
      const result = await submitToGoogleSheet(data);
      if (!result.success) throw new Error("Unable to send");
      setIsSubmitted(true);
    } catch {
      setError("Your enquiry couldn’t be sent. Your details are still here—please try again, or email info@truedgedigital.co.uk.");
    } finally {
      sending.current = false;
      setIsSubmitting(false);
    }
  }

  return <div ref={root} className={`${styles.page} ${body.className} ${display.variable}`}>
    <div className={styles.container}><div className={styles.layout}>
      <section className={styles.intro} aria-labelledby="contact-title">
        <h1 id="contact-title" data-contact-intro>Good things<br />start with<br /><span>a conversation.</span></h1>
        <p className={styles.introText} data-contact-intro>A new website. More enquiries. A simpler way to work. Tell us where you want to go—we’ll help you find the next step.</p>
        <a href="#project-enquiry" className={styles.mobileEnquiry}>Start your enquiry <ArrowUpRight size={19} /></a>
        <div className={styles.direct} data-contact-intro>
          <a href="mailto:info@truedgedigital.co.uk"><span className={styles.contactIcon}><Mail size={20} aria-hidden="true" /></span><span><small>Email us</small>info@truedgedigital.co.uk</span></a>
          <a href="https://wa.me/447907901171" target="_blank" rel="noopener noreferrer"><span className={styles.contactIcon}><MessageCircle size={20} aria-hidden="true" /></span><span><small>Prefer a quick chat?</small>Talk to us on WhatsApp</span></a>
          <a href="tel:+447832921562"><span className={styles.contactIcon}><Phone size={20} aria-hidden="true" /></span><span><small>Call us</small>+44 7832 921562</span></a>
        </div>
        <div className={styles.trust} data-contact-intro>
          <p>Trusted by clients who expect quality.</p>
          <div className={styles.trustClients}>
            <div className={styles.clientTile}><Image src="/assets/sanchez-watt-logo.webp" alt="Sanchez Watt" width={64} height={64} className={styles.sanchezLogo} /><span>Sanchez Watt<small>Former Arsenal player</small></span></div>
            <div className={styles.clientTile}><Image src="/assets/nelson-college-logo.svg" alt="Nelson College London" width={160} height={65} className={styles.nelsonLogo} /></div>
            <div className={styles.clientTile}><Image src="/assets/walker-logo.webp" alt="Walker Roofing and Building Contractors" width={160} height={80} className={styles.walkerLogo} /></div>
            <div className={styles.clientTile}><Image src="/assets/ilearners-logo.webp" alt="iLearner’s Hub" width={160} height={65} className={styles.learnerLogo} /></div>
          </div>
          <Link href="/works">Explore our client work <ArrowUpRight size={16} /></Link>
        </div>
      </section>
      <section id="project-enquiry" className={styles.formPanel} aria-labelledby={isSubmitted ? "success-title" : "enquiry-title"} data-contact-intro>
        {isSubmitted ? <div className={styles.success} role="status"><CheckCircle2 size={48} strokeWidth={1.3} /><h2 id="success-title">Thank you.<br />Let’s make it happen.</h2><p>Your enquiry has been sent. We’ll be in touch using the contact details you provided to talk through your project.</p><Link href="/works" className={styles.submit}>Explore our work <ArrowUpRight size={20} /></Link></div> : <>
          <div className={styles.formHeader}><h2 id="enquiry-title">What do you have<br />in mind?</h2><p>A few details are all we need to get started.</p></div>
          {offer && <div className={styles.offer}><span>Your selected offer</span><h3>{offer.title}</h3><p>{offer.detail}</p><Link href="/pricing">Change package <ArrowUpRight size={14} /></Link></div>}
          {project && <p className={styles.projectContext}>Inspired by our work for {project}.</p>}
          <form onSubmit={handleSubmit} className={styles.form}>
            <fieldset disabled={isSubmitting} className={styles.fields}>
              <legend className={styles.srOnly}>Your enquiry</legend>
              <div className={styles.inputGrid}>
                <div><label htmlFor="contact-name">Your name <span>(required)</span></label><input id="contact-name" name="fullName" required autoComplete="name" placeholder="Your full name" maxLength={150} /></div>
                <div><label htmlFor="contact-email">Email address <span>(required)</span></label><input id="contact-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" maxLength={254} /></div>
                <div><label htmlFor="contact-company">Business name <span>(optional)</span></label><input id="contact-company" name="business" autoComplete="organization" placeholder="Your business" maxLength={200} /></div>
                <div><label htmlFor="contact-phone">Phone number <span>(optional)</span></label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" maxLength={50} /></div>
              </div>
              <fieldset className={styles.serviceField}><legend>What can we help with? <span>(choose any)</span></legend><div className={styles.serviceChoices}>{services.slice(0, 6).map(([value, label]) => <button type="button" key={value} aria-pressed={selectedServices.includes(value)} onClick={() => toggle(value)}>{selectedServices.includes(value) && <Check size={14} aria-hidden="true" />}{label}</button>)}</div><details className={styles.moreServices}><summary>More services</summary><div className={styles.serviceChoices}>{services.slice(6).map(([value, label]) => <button type="button" key={value} aria-pressed={selectedServices.includes(value)} onClick={() => toggle(value)}>{selectedServices.includes(value) && <Check size={14} aria-hidden="true" />}{label}</button>)}</div></details><p className={styles.fieldHint}>Not sure yet? Leave this open and we’ll talk it through.</p></fieldset>
              <div><label htmlFor="contact-details">Tell us a little about your project <span>(optional)</span></label><textarea id="contact-details" name="details" rows={4} maxLength={5000} placeholder="What does your business do, and what would you like to improve?" /></div>
              <div><label htmlFor="contact-budget">Budget in mind? <span>(optional)</span></label><select id="contact-budget" name="budget" defaultValue=""><option value="">Let’s discuss what’s right for me</option><option value="Under £500">Under £500</option><option value="£500–£1,500">£500–£1,500</option><option value="£1,500–£5,000">£1,500–£5,000</option><option value="£5,000+">£5,000+</option></select></div>
            </fieldset>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <button className={styles.submit} type="submit" disabled={isSubmitting}>{isSubmitting ? <>Sending your enquiry <Loader2 size={20} className={styles.spinner} aria-hidden="true" /></> : <>Send my enquiry <ArrowUpRight size={21} aria-hidden="true" /></>}</button>
            <p className={styles.privacy}>No payment or commitment. We’ll use your details to respond to your enquiry.</p>
          </form>
        </>}
      </section>
    </div>
    <section className={styles.after} aria-labelledby="next-title"><div><h2 id="next-title">A clear next step,<br /><span>from the very start.</span></h2><p>We’ll discuss your goals, recommend a useful starting point and send a proposal you can review before deciding.</p><Link href="/pricing">Prefer to see prices first? <ArrowUpRight size={17} /></Link></div></section>
    </div>
  </div>;
}
