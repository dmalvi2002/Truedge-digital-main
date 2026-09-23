"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Sora } from "next/font/google";
import ScrollRippleTitle from "./ScrollRippleTitle";
import styles from "./ClosingSections.module.css";
const sora = Sora({ subsets: ["latin"], weight: ["400","500","600","700","800"] });
export default function TestimonialSection() {
  const testimonials = [
    {
      name: "James T.",
      role: "CEO, Vertex",
      text: "They didn't just build a website; they built a revenue engine. The bespoke UI/UX work transformed our brand perception, and our mobile conversions are up 120%.",
      highlight: "Conversions up 120%",
    },
    {
      name: "Sarah L.",
      role: "CMO, Lumina",
      text: "The Next.js architecture is insanely fast. We migrated away from a bloated WordPress setup and our page load times went from 4.2s down to 0.6s. Incredible engineering.",
      highlight: "Load time dropped to 0.6s",
    },
    {
      name: "Michael B.",
      role: "Founder, Elevate",
      text: "Professional, transparent, and ruthlessly effective. Truedge delivered exactly what they promised, entirely bug-free, and two weeks ahead of schedule.",
      highlight: "Delivered ahead of schedule",
    },
    {
      name: "Emma D.",
      role: "Director, Aura E-Commerce",
      text: "If you want a cheap template, look elsewhere. If you want a scalable digital asset that actually makes you money and can handle high traffic, hire Truedge Digital.",
      highlight: "Scalable digital asset",
    },
    {
      name: "David K.",
      role: "Head of Growth, Nexus.io",
      text: "The platform migration was completely flawless with zero downtime. Within a month, our technical SEO rankings skyrocketed due to the clean codebase.",
      highlight: "Zero downtime migration",
    },
    {
      name: "Rachel M.",
      role: "VP Marketing, Kinesis Subsea",
      text: "Their strategic approach during the discovery phase blew us away. They understood our complex industrial business model better than agencies we've worked with for years.",
      highlight: "Elite strategic approach",
    },
  ];

  const [active, setActive] = useState(0);
  const review = testimonials[active];
  return <section className={`${styles.testimonials} ${sora.className}`} aria-labelledby="testimonials-title">
    <div className={styles.container}>
      <div className={styles.sectionHeading}>
        <ScrollRippleTitle id="testimonials-title" text="Good work. In their words." className={styles.heading} activeColor="#17151d" baseColor="rgba(23,21,29,.22)" accentColor="#8b5cf6" />
        <p>Behind every project is a business, and people who put their trust in us.</p>
      </div>
      <div className={styles.reviewStage}>
        <div className={styles.quoteMark} aria-hidden="true"><Quote size={74} strokeWidth={1} /></div>
        <div aria-live="polite" aria-atomic="true" className={styles.reviewBody}>
          <figure key={active} className={styles.review}>
            <blockquote>{review.text}</blockquote>
            <figcaption><strong>{review.name}</strong><span>{review.role}</span></figcaption>
          </figure>
        </div>
        <div className={styles.reviewControls}>
          <span>{String(active + 1).padStart(2,"0")} <span>/ {testimonials.length}</span></span>
          <div><button type="button" aria-label="Previous testimonial" onClick={() => setActive((active + testimonials.length - 1) % testimonials.length)}><ArrowLeft /></button><button type="button" aria-label="Next testimonial" onClick={() => setActive((active + 1) % testimonials.length)}><ArrowRight /></button></div>
        </div>
      </div>
      <div className={styles.clientSelector} aria-label="Choose a testimonial">
        {testimonials.map((item,index) => <button key={item.name} type="button" aria-pressed={active === index} onClick={() => setActive(index)}><strong>{item.role.split(", ")[1]}</strong><span>{item.name}</span></button>)}
      </div>
    </div>
  </section>;
}
