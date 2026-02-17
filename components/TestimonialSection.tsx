import { Star, Quote, CheckCircle2 } from "lucide-react";
import { Sora, IBM_Plex_Sans } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const ibmPlexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

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

  return (
    <section className="relative w-full bg-slate-950 py-24 sm:py-32 overflow-hidden">
      {/* Subtle Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/5"></div>

      {/* Ambient background glows */}
      <div className="absolute left-0 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute right-0 bottom-1/4 h-96 w-96 translate-x-1/2 rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center">
          <h2 className={`${sora.className} mb-6 text-4xl font-semibold leading-tight text-white sm:text-5xl`}>
            Don't just take our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 drop-shadow-sm">word for it.</span>
          </h2>
          <p className={`${ibmPlexSans.className} text-lg text-slate-400 sm:text-xl leading-relaxed max-w-2xl mx-auto`}>
            We partner with ambitious brands to engineer digital assets that drive real, measurable ROI. Here is what they have to say.
          </p>
        </div>

        {/* Masonry Grid Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              // break-inside-avoid prevents the cards from being split in half across columns
              className="group relative break-inside-avoid flex flex-col overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/10 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04] shadow-[0_0_30px_rgba(0,0,0,0.2)]"
            >
              {/* Giant Watermark Quote Icon */}
              <Quote className="absolute -left-4 -top-4 h-24 w-24 rotate-12 text-white/5 transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-0" />

              <div className="relative z-10">
                {/* Stars & Verified Badge */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex gap-1 text-amber-400">
                    <Star size={16} fill="currentColor" strokeWidth={0} />
                    <Star size={16} fill="currentColor" strokeWidth={0} />
                    <Star size={16} fill="currentColor" strokeWidth={0} />
                    <Star size={16} fill="currentColor" strokeWidth={0} />
                    <Star size={16} fill="currentColor" strokeWidth={0} />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 border border-emerald-500/20">
                    <CheckCircle2 size={12} className="text-emerald-400" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-300">Verified</span>
                  </div>
                </div>

                {/* The Review Text */}
                <p className={`${ibmPlexSans.className} text-slate-300 leading-relaxed mb-8 text-base sm:text-lg`}>
                  "{testimonial.text}"
                </p>

                {/* Highlight Tag */}
                <div className="mb-6 inline-block rounded-lg bg-white/5 px-3 py-1.5 border border-white/10">
                  <span className="text-xs font-bold tracking-wide text-white/90">
                    <span className="text-violet-400 mr-1.5">↳</span>
                    {testimonial.highlight}
                  </span>
                </div>

                {/* Client Info Line */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-sm font-bold text-white shadow-inner">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className={`${sora.className} text-sm font-bold text-white leading-tight mb-0.5`}>
                      {testimonial.name}
                    </p>
                    <p className="text-xs font-medium text-slate-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}