"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Script from "next/script";
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

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "auto" | "light" | "dark";
          size?: "normal" | "compact" | "flexible";
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

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
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<string[]>(offer?.service ? [offer.service] : project ? ["Website Development"] : []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [messageLength, setMessageLength] = useState(0);
  const sending = useRef(false);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAFTF0BiU3fKk0Ogf";

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const renderTurnstile = () => {
      if (typeof window !== "undefined" && window.turnstile && turnstileContainerRef.current) {
        if (widgetIdRef.current) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch {}
          widgetIdRef.current = null;
        }

        widgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            setTurnstileToken(token);
            setError("");
          },
          "expired-callback": () => setTurnstileToken(""),
          "error-callback": () => setTurnstileToken(""),
          theme: "light",
        });
        return true;
      }
      return false;
    };

    if (!renderTurnstile()) {
      interval = setInterval(() => {
        if (renderTurnstile()) {
          clearInterval(interval);
        }
      }, 300);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (typeof window !== "undefined" && window.turnstile && widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {}
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

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

    const data = new FormData(event.currentTarget);
    const fullName = String(data.get("fullName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const business = String(data.get("business") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const details = String(data.get("details") || "").trim();

    const errors: Record<string, string> = {};

    // 1. Name validation (2-60 chars, letters, spaces, hyphens, apostrophes)
    if (!fullName) {
      errors.fullName = "Please enter your name.";
    } else if (fullName.length < 2) {
      errors.fullName = "Name is too short (minimum 2 characters).";
    } else if (fullName.length > 60) {
      errors.fullName = "Name cannot exceed 60 characters.";
    } else if (!/^[a-zA-Z\u00C0-\u024F\s'.\-_]+$/.test(fullName)) {
      errors.fullName = "Name contains invalid characters.";
    }

    // 2. Email validation (under 100 chars, strict format)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!email) {
      errors.email = "Please enter your email address.";
    } else if (email.length > 100) {
      errors.email = "Email address cannot exceed 100 characters.";
    } else if (!emailRegex.test(email) || !email.includes(".")) {
      errors.email = "Please provide a valid email address (e.g. name@company.com).";
    }

    // 3. Business Name validation (max 80 chars, allows dots, ampersand, dash, etc.)
    if (business) {
      if (business.length > 80) {
        errors.business = "Business name cannot exceed 80 characters.";
      } else if (!/^[a-zA-Z0-9\u00C0-\u024F\s'.\-&,/()]+$/.test(business)) {
        errors.business = "Business name contains invalid characters.";
      }
    }

    // 4. Phone number validation (optional, but if provided: 7 to 18 digits, at most one leading +, spaces, -, ())
    if (phone) {
      const digitsOnly = phone.replace(/\D/g, "");
      if (phone.length > 25 || digitsOnly.length < 7 || digitsOnly.length > 16) {
        errors.phone = "Please enter a valid phone number (7 to 16 digits).";
      } else if (!/^\+?[0-9\s\-()]+$/.test(phone) || (phone.match(/\+/g) || []).length > 1) {
        errors.phone = "Phone number contains invalid characters.";
      }
    }

    // 5. Message details validation (max 500 chars, no links or spam URLs)
    const urlPattern = /(https?:\/\/|www\.|\.com|\.ru|\.xyz|\.top|\.online|\.site|\.cn|\.info|\.net|\.org|t\.me|wa\.me)/i;
    if (details) {
      if (details.length > 500) {
        errors.details = "Message cannot exceed 500 characters.";
      } else if (urlPattern.test(details)) {
        errors.details = "Links or website URLs are not allowed in the message to prevent spam.";
      }
    }

    // 6. Turnstile security check
    if (!turnstileToken) {
      setError("Please complete the security check before submitting.");
      setFieldErrors(errors);
      return;
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError("Please check your details above before sending.");
      return;
    }

    setFieldErrors({});
    sending.current = true;
    setIsSubmitting(true);
    setError("");

    data.set("fullName", fullName);
    data.set("email", email.toLowerCase());
    data.set("cf-turnstile-response", turnstileToken);
    data.set("services", selectedServices.join(", ") || "Not sure yet");
    data.set("phone", phone ? `'${phone}` : "Not provided");
    data.set("budget", String(data.get("budget") || "To be discussed"));
    data.set("business", business || "Not specified");
    data.set("details", [offer && `${offer.title}: ${offer.detail}`, project && `Inspired by: ${project}`, details || "No details provided"].filter(Boolean).join("\n\n"));

    try {
      const result = await submitToGoogleSheet(data);
      if (!result.success) {
        throw new Error(result.error || "Unable to send");
      }
      setIsSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Your enquiry couldn’t be sent. Your details are still here—please try again, or email info@truedgedigital.co.uk.";
      setError(message);
      if (typeof window !== "undefined" && window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current);
        setTurnstileToken("");
      }
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
            <div className={styles.clientTile}><Image src="/assets/ilearners-logo-dark.svg" alt="iLearner’s Hub" width={160} height={65} className={styles.learnerLogo} /></div>
            <div className={styles.clientTile}><Image src="/assets/kinesis-subsea-logo.svg" alt="Kinesis Subsea" width={160} height={65} className={styles.kinesisLogo} /></div>
            <div className={styles.clientTile}><Image src="/assets/a2z-immigration-logo.svg" alt="A2Z Immigration UK" width={160} height={65} className={styles.a2zLogo} /></div>
            <div className={`${styles.clientTile} ${styles.digitechTile}`}>
              <Image src="/assets/digitech-logo.png" alt="Digitech" width={40} height={40} className={styles.digitechLogo} />
              <span className={styles.digitechText}>Digitech</span>
            </div>
            <div className={`${styles.clientTile} ${styles.nextClientTile}`}>
              <div className={styles.nextClientContent}>
                <strong>You could be next.</strong>
                <small>Let’s build your vision</small>
              </div>
            </div>
          </div>
          <Link href="/works">Explore our client work <ArrowUpRight size={16} /></Link>
        </div>
      </section>
      <section id="project-enquiry" className={styles.formPanel} aria-labelledby={isSubmitted ? "success-title" : "enquiry-title"} data-contact-intro>
        {isSubmitted ? <div className={styles.success} role="status"><CheckCircle2 size={48} strokeWidth={1.3} /><h2 id="success-title">Thank you.<br />Let’s make it happen.</h2><p>Your enquiry has been sent. We’ll be in touch using the contact details you provided to talk through your project.</p><Link href="/works" className={styles.submit}>Explore our work <ArrowUpRight size={20} /></Link></div> : <>
          <div className={styles.formHeader}><h2 id="enquiry-title">What do you have<br />in mind?</h2><p>A few details are all we need to get started.</p></div>
          {offer && <div className={styles.offer}><span>Your selected offer</span><h3>{offer.title}</h3><p>{offer.detail}</p><Link href="/pricing">Change package <ArrowUpRight size={14} /></Link></div>}
          {project && <p className={styles.projectContext}>Inspired by our work for {project}.</p>}
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <fieldset disabled={isSubmitting} className={styles.fields}>
              <legend className={styles.srOnly}>Your enquiry</legend>
              <div className={styles.inputGrid}>
                <div>
                  <label htmlFor="contact-name">Your name <span>(required)</span></label>
                  <input
                    id="contact-name"
                    name="fullName"
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                    maxLength={60}
                    aria-invalid={Boolean(fieldErrors.fullName)}
                    onChange={() => setFieldErrors((prev) => ({ ...prev, fullName: "" }))}
                  />
                  {fieldErrors.fullName && <span className={styles.fieldError} role="alert">{fieldErrors.fullName}</span>}
                </div>
                <div>
                  <label htmlFor="contact-email">Email address <span>(required)</span></label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    maxLength={100}
                    aria-invalid={Boolean(fieldErrors.email)}
                    onChange={() => setFieldErrors((prev) => ({ ...prev, email: "" }))}
                  />
                  {fieldErrors.email && <span className={styles.fieldError} role="alert">{fieldErrors.email}</span>}
                </div>
                <div>
                  <label htmlFor="contact-company">Business name <span>(optional)</span></label>
                  <input
                    id="contact-company"
                    name="business"
                    autoComplete="organization"
                    placeholder="e.g. Acme Co."
                    maxLength={80}
                    aria-invalid={Boolean(fieldErrors.business)}
                    onChange={() => setFieldErrors((prev) => ({ ...prev, business: "" }))}
                  />
                  {fieldErrors.business && <span className={styles.fieldError} role="alert">{fieldErrors.business}</span>}
                </div>
                <div>
                  <label htmlFor="contact-phone">Phone number <span>(optional)</span></label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+44 7123 456789"
                    maxLength={25}
                    aria-invalid={Boolean(fieldErrors.phone)}
                    onInput={(e) => {
                      const target = e.currentTarget;
                      const raw = target.value;
                      // Only allow a single '+' if it is the very first character
                      const hasLeadingPlus = raw.startsWith("+");
                      // Strip all characters except digits, spaces, hyphens, and brackets
                      let cleaned = raw.replace(/[^0-9\s\-()]/g, "");
                      if (hasLeadingPlus) {
                        cleaned = "+" + cleaned;
                      }
                      // Prevent repeated '+' anywhere
                      if (target.value !== cleaned) {
                        target.value = cleaned;
                      }
                      setFieldErrors((prev) => ({ ...prev, phone: "" }));
                    }}
                  />
                  {fieldErrors.phone && <span className={styles.fieldError} role="alert">{fieldErrors.phone}</span>}
                </div>
              </div>
              <fieldset className={styles.serviceField}><legend>What can we help with? <span>(choose any)</span></legend><div className={styles.serviceChoices}>{services.slice(0, 6).map(([value, label]) => <button type="button" key={value} aria-pressed={selectedServices.includes(value)} onClick={() => toggle(value)}>{selectedServices.includes(value) && <Check size={14} aria-hidden="true" />}{label}</button>)}</div><details className={styles.moreServices}><summary>More services</summary><div className={styles.serviceChoices}>{services.slice(6).map(([value, label]) => <button type="button" key={value} aria-pressed={selectedServices.includes(value)} onClick={() => toggle(value)}>{selectedServices.includes(value) && <Check size={14} aria-hidden="true" />}{label}</button>)}</div></details><p className={styles.fieldHint}>Not sure yet? Leave this open and we’ll talk it through.</p></fieldset>
              <div>
                <label htmlFor="contact-details">Tell us a little about your project <span>(optional, max 500 chars)</span></label>
                <textarea
                  id="contact-details"
                  name="details"
                  rows={4}
                  maxLength={500}
                  placeholder="What does your business do, and what would you like to improve?"
                  aria-invalid={Boolean(fieldErrors.details)}
                  onChange={(e) => {
                    setMessageLength(e.target.value.length);
                    setFieldErrors((prev) => ({ ...prev, details: "" }));
                  }}
                />
                <span className={styles.charCount}>{messageLength}/500</span>
                {fieldErrors.details && <span className={styles.fieldError} role="alert">{fieldErrors.details}</span>}
              </div>
              <div><label htmlFor="contact-budget">Budget in mind? <span>(optional)</span></label><select id="contact-budget" name="budget" defaultValue=""><option value="">Let’s discuss what’s right for me</option><option value="Under £500">Under £500</option><option value="£500–£1,500">£500–£1,500</option><option value="£1,500–£5,000">£1,500–£5,000</option><option value="£5,000+">£5,000+</option></select></div>
              <div className={styles.turnstileWrapper}>
                <div ref={turnstileContainerRef} />
              </div>
            </fieldset>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <button className={styles.submit} type="submit" disabled={isSubmitting}>{isSubmitting ? <>Sending your enquiry <Loader2 size={20} className={styles.spinner} aria-hidden="true" /></> : <>Send my enquiry <ArrowUpRight size={21} aria-hidden="true" /></>}</button>
            <p className={styles.privacy}>No payment or commitment. We’ll use your details to respond to your enquiry.</p>
          </form>
        </>}
      </section>
    </div>
    <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="lazyOnload" />
    <section className={styles.after} aria-labelledby="next-title"><div><h2 id="next-title">A clear next step,<br /><span>from the very start.</span></h2><p>We’ll discuss your goals, recommend a useful starting point and send a proposal you can review before deciding.</p><Link href="/pricing">Prefer to see prices first? <ArrowUpRight size={17} /></Link></div></section>
    </div>
  </div>;
}
