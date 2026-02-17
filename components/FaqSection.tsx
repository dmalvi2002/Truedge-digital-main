"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Sora, IBM_Plex_Sans } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const ibmPlexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const faqs = [
    {
      question: "How much does a bespoke digital asset cost?",
      answer: "We don't offer off-the-shelf pricing because we don't build off-the-shelf websites. Projects typically start at £5,000, but the final investment depends entirely on the complexity, architecture, and custom features required to hit your specific revenue goals."
    },
    {
      question: "Can you just build it in WordPress using a £50 theme?",
      answer: "We could. But we won't. If you want a slow, bloated website that looks exactly like your competitors and breaks every time a plugin updates, there are thousands of cheap freelancers who would love to help you. We exclusively engineer bespoke, high-performance assets."
    },
    {
      question: "How long does a typical project take to launch?",
      answer: "Most bespoke Next.js platforms take between 4 to 8 weeks from the initial discovery call to final deployment. Complex custom SaaS or cloud applications will naturally take longer. We map out strict, transparent timelines before you sign anything."
    },
    {
      question: "I need a website launched by tomorrow. Can you do it?",
      answer: "Unless you have a time machine, no. Elite engineering takes time. If you want it done fast and cheap, it won't be good. If you want it good, we need the time to architect it properly."
    },
    {
      question: "Why do you use Next.js instead of traditional CMS platforms?",
      answer: "In plain English: it makes your website lightning-fast, incredibly secure, and significantly better for Google SEO rankings. Next.js allows us to build modern, server-rendered applications that outperform legacy platforms like WordPress or Wix in every measurable metric."
    },
    {
      question: "My nephew knows a bit of HTML. Can he help out to lower the cost?",
      answer: "We're sure your nephew is a lovely lad, but we don't co-code with family members. We take 100% responsibility for the performance of our digital assets, which means our internal UK-based engineering team handles the entire build."
    },
    {
      question: "Do you provide hosting and ongoing support after launch?",
      answer: "Absolutely. We don't just hand over the keys and vanish. We offer comprehensive, zero-headache hosting infrastructure and ongoing maintenance packages. We monitor uptime, handle security, and refine performance so you can focus on running your business."
    },
    {
      question: "Do we need to have a 2-hour meeting every week?",
      answer: "Please, no. We hate pointless meetings as much as you do. Our process is designed to be completely transparent but asynchronous. We'll give you clear, concise updates and ask for specific feedback so you can get back to running your company."
    },
    {
      question: "Will my new website rank on the first page of Google?",
      answer: "We build every platform with an SEO-optimised architecture—meaning lightning-fast load times, clean code, and perfect meta structures. While we lay a flawless technical foundation, ongoing content and keyword strategy is required to dominate highly competitive search results."
    },
    {
      question: "Do you build custom e-commerce stores?",
      answer: "Yes. We engineer high-converting digital storefronts, often utilising headless Shopify architectures or bespoke Next.js builds. This ensures your customers experience a frictionless, instant checkout process that scales effortlessly during high-traffic events."
    }
  ];

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 5);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full bg-slate-50 py-24 sm:py-32">
      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-white p-4 shadow-sm border border-slate-100 text-violet-600">
            <HelpCircle size={32} />
          </div>
          <h2 className={`${sora.className} mb-6 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl`}>
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Questions.</span>
          </h2>
          <p className={`${ibmPlexSans.className} mx-auto max-w-2xl text-lg text-slate-600`}>
            Straight answers to common questions. No fluff, no agency jargon.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="flex flex-col gap-4">
          {visibleFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index}
                className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen ? 'border-violet-200 bg-white shadow-md' : 'border-slate-200 bg-white/50 hover:bg-white hover:border-violet-200'}`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-6 text-left sm:p-8"
                >
                  <h3 className={`${sora.className} pr-8 text-lg font-semibold text-slate-900 sm:text-xl`}>
                    {faq.question}
                  </h3>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'bg-violet-100 text-violet-600 rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-violet-50 group-hover:text-violet-500'}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                
                {/* Smooth Height Animation using CSS Grid */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className={`${ibmPlexSans.className} px-6 pb-8 text-slate-600 leading-relaxed sm:px-8 text-base sm:text-lg`}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* See More / See Less Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group relative inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-bold tracking-wide text-slate-700 shadow-sm transition-all duration-300 hover:border-violet-200 hover:text-violet-600 hover:shadow-md focus:outline-none"
          >
            {showAll ? "Hide extra questions" : "Reveal 5 more questions"}
            <ChevronDown size={18} className={`transition-transform duration-300 ${showAll ? 'rotate-180' : 'group-hover:translate-y-1'}`} />
          </button>
        </div>

      </div>
    </section>
  );
}