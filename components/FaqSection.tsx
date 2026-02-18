"use client";

import { useMemo, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Sora, IBM_Plex_Sans } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const ibmPlexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  faqs: FaqItem[];
  title?: string;
  highlightedTitle?: string;
  description?: string;
  initialVisibleCount?: number;
  expandLabel?: string;
  collapseLabel?: string;
  defaultOpenIndex?: number | null;
};

export default function FaqSection({
  faqs,
  title = "Frequently Asked",
  highlightedTitle = "Questions.",
  description = "Straight answers to common questions. No fluff, no agency jargon.",
  initialVisibleCount = 5,
  expandLabel,
  collapseLabel = "Hide extra questions",
  defaultOpenIndex = 0,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpenIndex !== null && defaultOpenIndex >= 0 ? defaultOpenIndex : null
  );
  const [showAll, setShowAll] = useState(false);

  const safeVisibleCount = Math.max(0, Math.min(initialVisibleCount, faqs.length));
  const visibleFaqs = showAll ? faqs : faqs.slice(0, safeVisibleCount);
  const hasHiddenFaqs = faqs.length > safeVisibleCount;
  const hiddenFaqCount = Math.max(0, faqs.length - safeVisibleCount);
  const resolvedExpandLabel =
    expandLabel ?? `Reveal ${hiddenFaqCount} more question${hiddenFaqCount === 1 ? "" : "s"}`;
  const effectiveOpenIndex =
    openIndex !== null && openIndex >= 0 && openIndex < visibleFaqs.length ? openIndex : null;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const titleBlock = useMemo(() => {
    if (!highlightedTitle) {
      return title;
    }

    return (
      <>
        {title}{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
          {highlightedTitle}
        </span>
      </>
    );
  }, [highlightedTitle, title]);

  return (
    <section className="relative w-full bg-slate-50 py-20">
      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-2xl border border-slate-100 bg-white p-4 text-violet-600 shadow-sm">
            <HelpCircle size={32} />
          </div>
          <h2 className={`${sora.className} mb-6 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl`}>
            {titleBlock}
          </h2>
          <p className={`${ibmPlexSans.className} mx-auto max-w-2xl text-lg text-slate-600`}>
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {visibleFaqs.map((faq, index) => {
            const isOpen = effectiveOpenIndex === index;

            return (
              <div
                key={`${faq.question}-${index}`}
                className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-violet-200 bg-white shadow-md"
                    : "border-slate-200 bg-white/50 hover:border-violet-200 hover:bg-white"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-6 text-left sm:p-8"
                >
                  <h3 className={`${sora.className} pr-8 text-lg font-semibold text-slate-900 sm:text-xl`}>
                    {faq.question}
                  </h3>
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 bg-violet-100 text-violet-600"
                        : "bg-slate-100 text-slate-400 group-hover:bg-violet-50 group-hover:text-violet-500"
                    }`}
                  >
                    <ChevronDown size={20} />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`${ibmPlexSans.className} px-6 pb-8 text-base leading-relaxed text-slate-600 sm:px-8 sm:text-lg`}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {hasHiddenFaqs && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group relative inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-bold tracking-wide text-slate-700 shadow-sm transition-all duration-300 hover:border-violet-200 hover:text-violet-600 hover:shadow-md focus:outline-none"
            >
              {showAll ? collapseLabel : resolvedExpandLabel}
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${showAll ? "rotate-180" : "group-hover:translate-y-1"}`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
