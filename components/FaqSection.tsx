"use client";
import { useId, useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { Sora } from "next/font/google";
import ScrollRippleTitle from "./ScrollRippleTitle";
import styles from "./ClosingSections.module.css";
const sora = Sora({ subsets: ["latin"], weight: ["400","500","600","700","800"] });
export type FaqItem = { question: string; answer: string };
type FaqSectionProps = {
  faqs: FaqItem[]; title?: string; highlightedTitle?: string; description?: string;
  initialVisibleCount?: number; expandLabel?: string; collapseLabel?: string; defaultOpenIndex?: number | null;
};
export default function FaqSection({
  faqs, title = "A few things", highlightedTitle = "you might be wondering.",
  description = "Straight answers, so you can take the next step with confidence.",
  initialVisibleCount = 5, expandLabel, collapseLabel = "Show fewer questions", defaultOpenIndex = 0,
}: FaqSectionProps) {
  const id = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const [showAll, setShowAll] = useState(false);
  const count = Math.max(0, Math.min(initialVisibleCount, faqs.length));
  const visible = showAll ? faqs : faqs.slice(0,count);
  return <section className={`${styles.faq} ${sora.className}`} aria-labelledby={`${id}-title`}>
    <div className={`${styles.container} ${styles.faqLayout}`}>
      <div className={styles.faqIntro}>
        <ScrollRippleTitle id={`${id}-title`} text={`${title} ${highlightedTitle}`.trim()} className={styles.heading} activeColor="#17151d" baseColor="rgba(23,21,29,.22)" accentColor="#8b5cf6" />
        <p>{description}</p>
        <div className={styles.faqContact}><span>Have something else in mind?</span><Link href="/contact">Let’s have a conversation.</Link></div>
      </div>
      <div>
        <div className={styles.questions}>
          {visible.map((item,index) => {
            const open = openIndex === index;
            return <div key={item.question} className={styles.question} data-open={open}>
              <h3><button type="button" id={`${id}-question-${index}`} aria-expanded={open} aria-controls={`${id}-answer-${index}`} onClick={() => setOpenIndex(open ? null : index)}>
                <span>{item.question}</span><span className={styles.faqIcon}>{open ? <Minus size={20} /> : <Plus size={20} />}</span>
              </button></h3>
              <div id={`${id}-answer-${index}`} role="region" aria-labelledby={`${id}-question-${index}`} hidden={!open}><p className={styles.answer}>{item.answer}</p></div>
            </div>;
          })}
        </div>
        {faqs.length > count && <button className={styles.moreQuestions} type="button" aria-expanded={showAll} onClick={() => setShowAll(!showAll)}>{showAll ? collapseLabel : expandLabel ?? "See all questions"}<Plus size={18} style={{transform: showAll ? "rotate(45deg)" : undefined}} /></button>}
      </div>
    </div>
  </section>;
}
