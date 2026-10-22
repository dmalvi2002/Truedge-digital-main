"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Sora } from "next/font/google";
import { motion } from "framer-motion";
import ScrollRippleTitle from "./ScrollRippleTitle";
import styles from "./ClosingSections.module.css";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const testimonials = [
  { id: 1, name: "Steven", company: "Walker Roofing", logo: "/assets/walker-logo.webp", compact: false, monochrome: true, text: "Really happy with the website they built for us. They took the time to understand our business and what we wanted from the site. Easy to work with, quick to get back to us and reasonably priced too. Would happily recommend them." },
  { id: 2, name: "", company: "Digitech World", logo: "/assets/client-logos/digitech-logo.webp", compact: true, monochrome: false, text: "Really impressed with the service from Truedge. They're always quick to respond, easy to work with and genuinely willing to go the extra mile when needed. The quality of work has been great, especially for the price. Would definitely recommend them." },
  { id: 3, name: "", company: "iLearners Hub", logo: "/assets/client-logos/ilearners-logo-dark.svg", compact: false, monochrome: false, text: "We're really glad we chose to work with Truedge. Such a helpful and professional team who listen to what you want and also know what's best for your business. Genuinely impressed with the results they've delivered for us." },
  { id: 4, name: "", company: "A2Z Immigration Solutions", logo: "/assets/client-logos/a2z-immigration-logo.svg", compact: false, monochrome: false, text: "We wanted more than just a good-looking website, and Truedge really delivered on that. Our services are now presented much better, and it's easier for clients to find what they need. We're genuinely pleased with the results and the difference their work has made for our business." },
  { id: 5, name: "", company: "Kinesis Subsea", logo: "/assets/client-logos/kinesis-subsea-logo-dark.svg", compact: false, monochrome: false, text: "The quality of work from Truedge has been excellent. They've been professional throughout, always responsive and happy to help whenever we needed anything. It's been a pleasure dealing with a team that takes their work seriously and delivers to a high standard. Very pleased with the results." },
  { id: 6, name: "", company: "Sanchez Watt", logo: "/assets/sanchez-watt-logo.webp", compact: true, monochrome: false, text: "I had a lot of different ideas for my personal brand website, and Truedge did a fantastic job bringing them all together. They really understood what I wanted and offered some great suggestions along the way. Professional, patient and easy to work with. Couldn't be happier with the result." },
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
              <div className={styles.companyLogo}>
                <Image src={review.logo} alt={review.compact ? "" : review.company} width={review.compact ? 48 : 180} height={54} sizes={review.compact ? "48px" : "180px"} className={`${styles.clientLogo} ${review.compact ? styles.compactClientLogo : ""} ${review.monochrome ? styles.monochromeClientLogo : ""}`} />
                {review.compact && <strong>{review.company}</strong>}
              </div>
            </div>
            <figure className={styles.review}>
              <Quote className={styles.cardQuote} size={45} strokeWidth={1.25} aria-hidden="true" />
              <blockquote>{review.text}</blockquote>
            </figure>
          </motion.article>;
        })}

        <div className={styles.stackNavigation}>
          <div className={styles.stackDots} aria-label="Choose a testimonial">
            {testimonials.map((item) => <button key={item.id} type="button" aria-label={`Show testimonial from ${item.name || item.company}`} aria-pressed={active.id === item.id} onClick={() => showReview(item.id)} />)}
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
