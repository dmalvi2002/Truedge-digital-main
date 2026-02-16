import { XCircle, CheckCircle2, AlertTriangle, Zap } from "lucide-react";
import { Sora, IBM_Plex_Sans } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const ibmPlexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function ContrastSection() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 py-24 sm:py-32">
      {/* Subtle Background Glows */}
      <div className="absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-red-500/5 blur-[120px]"></div>
      <div className="absolute bottom-0 right-1/4 h-96 w-96 translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]"></div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 max-w-3xl text-left sm:mx-auto sm:text-center">
          <h2 className={`${sora.className} mb-6 text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl`}>
            Most websites just look good.<br />
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Very few actually drive growth.</span>
          </h2>
          <p className={`${ibmPlexSans.className} text-lg text-slate-400 sm:text-xl`}>
            The hidden cost of settling for a standard template website is the revenue you lose to your competitors every single day.
          </p>
        </div>

        {/* Contrast Grid */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          
          {/* Card 1: The Liability (The Struggle) */}
          <div className="flex flex-col rounded-3xl border border-red-500/15 bg-white/[0.02] p-8 shadow-[0_0_30px_rgba(239,68,68,0.03)] backdrop-blur-md transition-all duration-300 hover:border-red-500/30 hover:bg-white/[0.04]">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                <AlertTriangle size={24} />
              </div>
              <h3 className={`${sora.className} text-2xl font-semibold text-white`}>The Typical Website</h3>
            </div>
            <ul className="flex flex-col gap-6">
              {[
                "Slow load times that frustrate users and kill your conversion rates.",
                "Vulnerable to hacks, malware, and severe security breaches.",
                "A pretty design that completely fails to generate qualified leads.",
                "Built on bloated, outdated, and hard-to-manage templates."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <XCircle className="mt-0.5 shrink-0 text-red-500/60" size={20} />
                  <span className={`${ibmPlexSans.className} text-slate-300 leading-relaxed`}>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: The Asset (The Solution) */}
          <div className="relative flex flex-col rounded-3xl border border-violet-500/30 bg-[linear-gradient(145deg,rgba(139,92,246,0.08)0%,rgba(15,23,42,0)100%)] p-8 shadow-[0_0_40px_rgba(139,92,246,0.1)] backdrop-blur-md transition-all duration-300 hover:border-violet-500/50 hover:shadow-[0_0_50px_rgba(139,92,246,0.15)]">
            
            {/* Premium Floating Badge */}
            <div className="absolute -top-4 right-8 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
              The Asset
            </div>

            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.3)] border border-violet-500/30">
                <Zap size={24} />
              </div>
              <h3 className={`${sora.className} text-2xl font-semibold text-white`}>The Truedge Standard</h3>
            </div>
            <ul className="flex flex-col gap-6">
              {[
                "Sub-second load times built on modern Next.js architecture.",
                "Bank-grade security keeping your business and client data safe.",
                "Data-driven, psychological design engineered specifically to convert.",
                "Fully bespoke, scalable digital assets that grow with your business."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-400" size={20} />
                  <span className={`${ibmPlexSans.className} text-slate-200 leading-relaxed`}>{text}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}