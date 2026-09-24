"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Sora } from "next/font/google";
import { motion } from "framer-motion";
import ScrollRippleTitle from "./ScrollRippleTitle";
import styles from "./ClosingSections.module.css";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const testimonials = [
  { id: 1, name: "James T.", role: "CEO", company: "Vertex", mark: "V", text: "They didn't just build a website; they built a revenue engine. The bespoke UI/UX work transformed our brand perception, and our mobile conversions are up 120%." },
  { id: 2, name: "Sarah L.", role: "CMO", company: "Lumina", mark: "L", text: "The Next.js architecture is insanely fast. We migrated away from a bloated WordPress setup and our page load times went from 4.2s down to 0.6s. Incredible engineering." },
  { id: 3, name: "Michael B.", role: "Founder", company: "Elevate", mark: "E", text: "Professional, transparent, and ruthlessly effective. Truedge delivered exactly what they promised, entirely bug-free, and two weeks ahead of schedule." },
  { id: 4, name: "Emma D.", role: "Director", company: "Aura E-Commerce", mark: "A", text: "If you want a cheap template, look elsewhere. If you want a scalable digital asset that actually makes you money and can handle high traffic, hire Truedge Digital." },
  { id: 5, name: "David K.", role: "Head of Growth", company: "Nexus.io", mark: "N", text: "The platform migration was completely flawless with zero downtime. Within a month, our technical SEO rankings skyrocketed due to the clean codebase." },
  { id: 6, name: "Rachel M.", role: "VP Marketing", company: "Kinesis Subsea", mark: "K", text: "Their strategic approach during the discovery phase blew us away. They understood our complex industrial business model better than agencies we've worked with for years." },
];

export default function TestimonialSection() {
  const [cards, setCards] = useState(testimonials);
  const active = cards[0];

  const previous = () => setCards((current) => {
    const reordered = [...current];
    reordered.unshift(reordered.pop()!);
    return reordered;
  });

  const next = () => setCards((current) => {
    const reordered = [...current];
    reordered.push(reordered.shift()!);
    return reordered;
  });

  const showReview = (id: number) => setCards((current) => {
    const index = current.findIndex((card) => card.id === id);
    if (index <= 0) return current;
    return [...current.slice(index), ...current.slice(0, index)];
  });

  return <section className={`${styles.testimonials} ${sora.className}`} aria-labelledby="testimonials-title">
    <div className={styles.container}>
      <div className={styles.sectionHeading}>
        <ScrollRippleTitle id="testimonials-title" text="Good work. In their words." className={styles.heading} activeColor="#17151d" baseColor="rgba(23,21,29,.22)" accentColor="#8b5cf6" />
        <p>Behind every project is a business, and people who put their trust in us.</p>
      </div>

      <div className={styles.stackStage}>
        {[...cards].reverse().map((review, reverseIndex) => {
          const position = cards.length - 1 - reverseIndex;
          const visibleDepth = Math.min(position, 2);
          const isActive = position === 0;
          return <motion.article
            className={styles.testimonialCard}
            data-position={position}
            key={review.id}
            aria-hidden={!isActive}
            initial={false}
            animate={{ y: visibleDepth * 12, scale: 1 - visibleDepth * 0.045, zIndex: cards.length - position }}
            transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.85 }}
            style={{ transformOrigin: "bottom center" }}
          >
            <div className={styles.reviewAccent} aria-hidden="true" />
            <div className={styles.cardMeta}>
              <div className={styles.companyLogo} aria-label={`${review.company} logo placeholder`}><span>{review.mark}</span><strong>{review.company}</strong></div>
            </div>
            <figure className={styles.review}>
              <Quote className={styles.cardQuote} size={45} strokeWidth={1.25} aria-hidden="true" />
              <blockquote>{review.text}</blockquote>
              <figcaption><strong>{review.name}</strong><span>{review.role}, {review.company}</span></figcaption>
            </figure>
          </motion.article>;
        })}

        <div className={styles.stackNavigation}>
          <div className={styles.stackDots} aria-label="Choose a testimonial">
            {testimonials.map((item) => <button key={item.id} type="button" aria-label={`Show testimonial from ${item.name}`} aria-pressed={active.id === item.id} onClick={() => showReview(item.id)} />)}
          </div>
          <div className={styles.reviewControls}>
            <button type="button" aria-label="Previous testimonial" onClick={previous}><ArrowLeft /></button>
            <button type="button" aria-label="Next testimonial" onClick={next}><ArrowRight /></button>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
