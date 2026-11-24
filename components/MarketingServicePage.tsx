import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { marketingServices } from '@/lib/marketing-services';

type Service = (typeof marketingServices)[keyof typeof marketingServices];

export default function MarketingServicePage({ service }: { service: Service }) {
  return <article className="bg-slate-950 text-slate-100">
    <header className="border-b border-white/10 bg-gradient-to-br from-slate-950 to-violet-950 px-6 pb-20 pt-32 sm:pt-40">
      <div className="mx-auto max-w-5xl">
        <Link href="/marketing#get-found" className="inline-flex items-center gap-2 text-sm text-violet-200 hover:text-white"><ArrowLeft size={17} aria-hidden="true" /> Marketing services</Link>
        <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-tight sm:text-7xl">{service.name}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">{service.intro}</p>
        <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-slate-950 hover:bg-violet-100">Book a free strategy call <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </header>
    <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:grid-cols-3">
      {service.sections.map(section => <section key={section.title}>
        <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
        <p className="mt-4 leading-relaxed text-slate-300">{section.body}</p>
      </section>)}
    </div>
    <section className="mx-auto max-w-5xl px-6 pb-20">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-10">
        <h2 className="text-3xl font-semibold tracking-tight">What to bring to your first call</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-slate-300">{service.firstStep}</p>
        <Link href="/contact" className="mt-6 inline-flex items-center gap-2 font-medium text-violet-200 hover:text-white">Talk to Truedge Digital <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </section>
  </article>;
}
