import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Sora, IBM_Plex_Sans } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const ibmPlexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

const trustSignals = [
  "No templates. Ever.",
  "UK-Based Engineering Team",
  "Delivered on Time, Always",
];

export default function CtaSection() {
  return (
    <section className="relative w-full bg-white py-28 sm:py-36 overflow-hidden">

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf608_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf608_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* Top & bottom ruled lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Ambient centre glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[900px] rounded-full bg-violet-100/60 blur-[120px] pointer-events-none" />

      {/* Corner accents */}
      <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-indigo-100/50 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-violet-100/50 blur-[80px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">

        {/* Badge */}
        <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
          <span className={`${ibmPlexSans.className} text-[11px] font-semibold tracking-widest text-slate-500 uppercase`}>
            Let&apos;s Build Together
          </span>
        </div>

        {/* Headline */}
        <h2 className={`${sora.className} mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.75rem]`}>
          Ready to engineer your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
            competitive edge?
          </span>
        </h2>

        {/* Sub-copy */}
        <p className={`${ibmPlexSans.className} mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-slate-500`}>
          Whether it&apos;s a high-performance web app, an AI-powered platform, or a native mobile experience — we build it right, fast, and engineered to last.
        </p>

        {/* CTA Buttons */}
        <div className="mb-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="group flex items-center gap-2.5 rounded-full bg-gradient-to-b from-violet-500 to-violet-700 px-8 py-4 text-base font-bold text-white shadow-[0_8px_30px_rgba(124,58,237,0.25),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(124,58,237,0.35)]"
          >
            Start a Project
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/work"
            className={`${ibmPlexSans.className} flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50`}
          >
            View Our Work
          </Link>
        </div>

        {/* Divider */}
        <div className="mx-auto mb-10 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

        {/* Trust signals */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-10">
          {trustSignals.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle size={14} className="shrink-0 text-violet-500" />
              <span className={`${ibmPlexSans.className} text-sm font-medium text-slate-500`}>
                {item}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
