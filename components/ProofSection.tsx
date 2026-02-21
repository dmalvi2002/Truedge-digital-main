import {
  ArrowUpRight,
  Hexagon,
  Triangle,
  Circle,
  Square,
  ArrowRight,
} from "lucide-react";
import { Sora, IBM_Plex_Sans } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function ProofSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-24 sm:py-32">
      {/* --- Inline Style for Custom Marquee Animation --- */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 60s linear infinite;
          }
        `,
        }}
      />

      {/* Subtle Background Separator Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* --- PART 1: The Trust Bar (Infinite Scrolling Logos) --- */}
        <div className="mb-24 flex flex-col items-center justify-center gap-10">
          <p
            className={`${ibmPlexSans.className} text-xs font-bold uppercase tracking-[0.2em] text-black`}
          >
            Trusted by Ambitious Brands
          </p>

          {/* Marquee Container with fade masks on the edges */}
          <div className="relative flex w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            {/* The animated track */}
            <div className="animate-marquee flex w-max items-center">
              {/* First Set of Logos */}
              <div className="flex items-center justify-around gap-16 px-8 sm:gap-24 sm:px-12">
                <div className="flex shrink-0 items-center gap-2 text-slate-400 transition-colors hover:text-slate-900">
                  <Hexagon size={28} />{" "}
                  <span className="whitespace-nowrap text-xl font-bold tracking-tight">
                    A2Z Immigration
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-slate-400 transition-colors hover:text-slate-900">
                  <Triangle size={28} />{" "}
                  <span className="whitespace-nowrap text-xl font-bold tracking-tight">
                    iLearner's Hub
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-slate-400 transition-colors hover:text-slate-900">
                  <Circle size={28} />{" "}
                  <span className="whitespace-nowrap text-xl font-bold tracking-tight">
                    Kinesis Subsea
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-slate-400 transition-colors hover:text-slate-900">
                  <Triangle size={28} />{" "}
                  <span className="whitespace-nowrap text-xl font-bold tracking-tight">
                    A2Z Accounting Dubai
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-slate-400 transition-colors hover:text-slate-900">
                  <Square size={28} />{" "}
                  <span className="whitespace-nowrap text-xl font-bold tracking-tight">
                    Magic World
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-slate-400 transition-colors hover:text-slate-900">
                  <Hexagon size={28} />{" "}
                  <span className="whitespace-nowrap text-xl font-bold tracking-tight">
                    MyHRspace
                  </span>
                </div>
              </div>

              {/* Second Set of Logos (Duplicate for seamless infinite looping) */}
              <div className="flex items-center justify-around gap-16 px-8 sm:gap-24 sm:px-12">
                <div className="flex shrink-0 items-center gap-2 text-slate-400 transition-colors hover:text-slate-900">
                  <Hexagon size={28} />{" "}
                  <span className="whitespace-nowrap text-xl font-bold tracking-tight">
                    A2Z Immigration
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-slate-400 transition-colors hover:text-slate-900">
                  <Triangle size={28} />{" "}
                  <span className="whitespace-nowrap text-xl font-bold tracking-tight">
                    iLearner's Hub
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-slate-400 transition-colors hover:text-slate-900">
                  <Circle size={28} />{" "}
                  <span className="whitespace-nowrap text-xl font-bold tracking-tight">
                    Kinesis Subsea
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-slate-400 transition-colors hover:text-slate-900">
                  <Triangle size={28} />{" "}
                  <span className="whitespace-nowrap text-xl font-bold tracking-tight">
                    A2Z Accounting Dubai
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-slate-400 transition-colors hover:text-slate-900">
                  <Square size={28} />{" "}
                  <span className="whitespace-nowrap text-xl font-bold tracking-tight">
                    Magic World
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-slate-400 transition-colors hover:text-slate-900">
                  <Hexagon size={28} />{" "}
                  <span className="whitespace-nowrap text-xl font-bold tracking-tight">
                    MyHRspace
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- PART 2: Proof of Execution (Case Studies) --- */}
        <div className="mb-16 text-center lg:text-left">
          <h2
            className={`${sora.className} mb-6 text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl md:text-5xl`}
          >
            Proof of{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Execution.
            </span>
          </h2>
          <p
            className={`${ibmPlexSans.className} mx-auto max-w-2xl text-lg text-slate-600 lg:mx-0 sm:text-xl`}
          >
            We don't just build websites. We engineer high-performance digital
            assets that drive measurable business growth. Look at the data.
          </p>
        </div>

        {/* Case Studies Container */}
        <div className="flex flex-col gap-16">
          {/* FEATURED PROJECT 1 (Content Left, Image Right) */}
          <div className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50/50 transition-all duration-500 hover:border-violet-200 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.1)] lg:flex-row lg:items-stretch">
            {/* Left Content Area */}
            <div className="flex flex-1 flex-col justify-center p-8 sm:p-12">
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                  Next.js
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                  Sanity CMS
                </span>
              </div>

              <h3
                className={`${sora.className} mb-4 text-3xl font-bold text-slate-900`}
              >
                A2Z Immigration
              </h3>
              <p
                className={`${ibmPlexSans.className} mb-8 text-slate-600 leading-relaxed`}
              >
                A2Z Immigration required an authoritative platform to streamline
                UK Sponsor Licence and Skilled Worker Visa services. We
                engineered a high-converting, compliance-focused digital asset
                that simplifies complex legal pathways and drives qualified B2B
                lead generation.
              </p>

              {/* Metric Highlights */}
              <div className="mb-8 grid grid-cols-2 gap-4 border-l-2 border-violet-200 pl-4 sm:grid-cols-3">
                <div>
                  <p className="text-2xl font-bold text-slate-900">+85%</p>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mt-0.5">
                    Lead Gen
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600">91/100</p>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mt-0.5">
                    SEO Score
                  </p>
                </div>
              </div>

              <a
                href="https://www.a2zimmigrations.co.uk/"
                className="inline-flex w-max items-center gap-2 text-sm font-bold text-violet-600 transition-colors hover:text-violet-700"
              >
                View Live Site{" "}
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </div>

            {/* Right Image/Mockup Area - FIXED FOR MOBILE */}
            <div className="relative min-h-[300px] flex-1 flex flex-col overflow-hidden p-6 sm:p-8 lg:min-h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-100 via-white to-indigo-50"></div>
              <div className="relative flex-1 w-full rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 flex flex-col overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]">
                <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400"></div>
                </div>
                <div className="flex-1 bg-[url('https://res.cloudinary.com/dvvcwzp4n/image/upload/v1771632608/881bb1b0-fdc5-4d23-b193-ce556319128e.png')] bg-contain bg-no-repeat bg-center mix-blend-multiply"></div>
              </div>
            </div>
          </div>

          {/* FEATURED PROJECT 2 (Image Left, Content Right using lg:flex-row-reverse) */}
          <div className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50/50 transition-all duration-500 hover:border-violet-200 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.1)] lg:flex-row-reverse lg:items-stretch">
            {/* Right Content Area (Appears on right due to flex-row-reverse) */}
            <div className="flex flex-1 flex-col justify-center p-8 sm:p-12">
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                  Next js
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                  Tailwind CSS
                </span>
              </div>

              <h3
                className={`${sora.className} mb-4 text-3xl font-bold text-slate-900`}
              >
                iLearner's Hub
              </h3>
              <p
                className={`${ibmPlexSans.className} mb-8 text-slate-600 leading-relaxed`}
              >
                We engineered a high-speed, conversion-focused digital asset to
                scale this Aberdeen tuition centre. The intuitive UI streamlines
                parent bookings and maximises local student acquisition.
              </p>

              {/* Metric Highlights */}
              <div className="mb-8 grid grid-cols-2 gap-4 border-l-2 border-violet-200 pl-4 sm:grid-cols-3">
                <div>
                  <p className="text-2xl font-bold text-blue-500">94/100</p>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mt-0.5">
                    Performance
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600">100/100</p>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mt-0.5">
                    SEO Score
                  </p>
                </div>
              </div>

              <a
                href="https://www.ilearnershub.co.uk/"
                className="inline-flex w-max items-center gap-2 text-sm font-bold text-violet-600 transition-colors hover:text-violet-700"
              >
                View Live Site{" "}
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </div>

            {/* Left Image/Mockup Area - FIXED FOR MOBILE */}
            <div className="relative min-h-[300px] flex-1 flex flex-col overflow-hidden p-6 sm:p-8 lg:min-h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-100"></div>
              <div className="relative flex-1 w-full rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 flex flex-col overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]">
                <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400"></div>
                </div>
                <div className="flex-1 bg-[url('https://res.cloudinary.com/dvvcwzp4n/image/upload/v1771634405/c4dd4da1-70ef-443b-9f4f-33d476f85eba.png')] bg-contain bg-no-repeat bg-center md:bg-cover mix-blend-multiply"></div>
              </div>
            </div>
          </div>

          {/* FEATURED PROJECT 3 (Content Left, Image Right again) */}
          <div className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50/50 transition-all duration-500 hover:border-violet-200 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.1)] lg:flex-row lg:items-stretch">
            {/* Left Content Area */}
            <div className="flex flex-1 flex-col justify-center p-8 sm:p-12">
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                  TypeScript
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                  Framer Motion
                </span>
              </div>

              <h3
                className={`${sora.className} mb-4 text-3xl font-bold text-slate-900`}
              >
                Kinesis Subsea
              </h3>
              <p
                className={`${ibmPlexSans.className} mb-8 text-slate-600 leading-relaxed`}
              >
                We engineered a high-performance web platform for a global
                subsea engineering firm. The bespoke Next.js architecture
                showcases complex energy infrastructure, establishing absolute
                technical authority to drive enterprise-level contracts.
              </p>

              {/* Metric Highlights */}
              <div className="mb-8 grid grid-cols-2 gap-4 border-l-2 border-violet-200 pl-4 sm:grid-cols-3">
                <div>
                  <p className="text-2xl font-bold text-slate-900">2.5x</p>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mt-0.5">
                    Site Loadtime
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600">100/100</p>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mt-0.5">
                    SEO Score
                  </p>
                </div>
              </div>

              <a
                href="#"
                className="inline-flex w-max items-center gap-2 text-sm font-bold text-violet-600 transition-colors hover:text-violet-700"
              >
                View Live Site{" "}
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </div>

            {/* Right Image/Mockup Area - FIXED FOR MOBILE */}
            <div className="relative min-h-[300px] flex-1 flex flex-col overflow-hidden p-6 sm:p-8 lg:min-h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-100 via-white to-indigo-50"></div>
              <div className="relative flex-1 w-full rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 flex flex-col overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]">
                <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400"></div>
                </div>
                <div className="flex-1 bg-[url('https://res.cloudinary.com/dvvcwzp4n/image/upload/v1771634697/c3f54d73-40a0-4dcc-9d28-b91ae55623db.png')] bg-cover bg-center mix-blend-multiply"></div>
              </div>
            </div>
          </div>
        </div>

        {/* --- PART 3: Call To Action Button --- */}
        <div className="mt-16 flex justify-center">
          <a
            href="/projects"
            className="group flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,rgba(139,92,246,1)0%,rgba(109,40,217,1)100%)] px-10 py-4 text-base font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.5),inset_0_2px_2px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(124,58,237,0.7),inset_0_2px_2px_rgba(255,255,255,0.4)]"
          >
            View All Projects
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
