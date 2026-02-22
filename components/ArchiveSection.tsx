"use client";

import { ArrowUpRight, Layers, Server, TvMinimal } from "lucide-react";
import { Sora, IBM_Plex_Sans } from "next/font/google";
import Image from "next/image";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function ArchiveSection() {
  const projects = [
    {
      id: "01",
      client: "A2Z Immigration UK",
      category: "Bespoke Web Design",
      image:
        "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1771632608/881bb1b0-fdc5-4d23-b193-ce556319128e.png", // Add your image to public/projects/
      problem:
        "A slow, outdated WordPress site plagued by broken navigation and failing page loads, severely damaging brand authority and frustrating prospective clients.",
      solution:
        "Engineered a lightning-fast, SEO-optimised Next.js platform featuring a premium modern UI and flawless user journeys to maximise lead conversions.",
      roi: "+210%",
      roiText: "Conversion Lift",
      tech: ["Next.js", "TypeScript", "Tailwind", "Sanity"],
      icon: TvMinimal,
      link: "https://a2zimmigrations.co.uk",
    },
    {
      id: "02",
      client: "iLearner's Hub",
      category: "Bespoke Web Design",
      image:
        "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1771634405/c4dd4da1-70ef-443b-9f4f-33d476f85eba.png",
      problem:
        "A static, broken animated & links, low-converting brochure site that created friction for parents trying to discover courses and book tuition sessions, bottlenecking local growth.",
      solution:
        "Engineered an interactive, high-speed platform with a frictionless UI, specifically designed to streamline course discovery and instantly scale student acquisition.",
      roi: "0.8s",
      roiText: "Page Load Time",
      tech: ["Next.js", "TypeScript", "Tailwind", "Motion"],
      icon: TvMinimal,
      link: "https://ilearnershub.co.uk",
    },
    {
      id: "03",
      client: "Kinesis Subsea",
      category: "Industry Level Website",
      image:
        "https://res.cloudinary.com/dvvcwzp4n/image/upload/v1771634697/c3f54d73-40a0-4dcc-9d28-b91ae55623db.png",
      problem:
        "A fragmented, legacy digital presence that undermined their position as an industry leader and failed to effectively communicate complex, enterprise-level subsea capabilities.",
      solution:
        "Engineered a bespoke, high-performance Next.js architecture to seamlessly structure their massive service portfolio, establishing absolute technical authority to drive global energy contracts.",
      roi: "100/100",
      roiText: "Seo Performance",
      tech: ["Next.js", "TypeScript", "Tailwind", "Motion"],
      icon: TvMinimal,
      link: "http://kinesis-subsea-eng-site.vercel.app/",
    },
  ];

  return (
    <section className="relative w-full bg-[#fafafa] py-16 md:py-24 text-slate-900">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-50"></div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* --- LEFT COLUMN: Sticky Header --- */}
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 px-4 py-2 backdrop-blur-md">
                <Layers className="h-4 w-4 text-violet-600" />
                <span
                  className={`${ibmPlexSans.className} text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600`}
                >
                  The Archive
                </span>
              </div>

              <h2
                className={`${sora.className} mb-6 text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl md:text-5xl`}
              >
                Proof of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                  Execution.
                </span>
              </h2>

              <p
                className={`${ibmPlexSans.className} mb-10 text-base text-slate-600 md:text-lg leading-relaxed max-w-sm`}
              >
                We despise bloated templates and off-the-shelf rubbish. Inspect
                our latest high-performance assets engineered for market
                dominance.
              </p>

              <div className="hidden lg:flex flex-col gap-4 rounded-3xl bg-slate-950 p-6 shadow-2xl">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <Server className="text-emerald-400 h-5 w-5" />
                  <span
                    className={`${sora.className} text-white font-semibold`}
                  >
                    Systems Online
                  </span>
                </div>
                <p
                  className={`${ibmPlexSans.className} text-slate-400 text-sm leading-relaxed`}
                >
                  Select a case study to inspect the architecture, stack, and
                  raw revenue impact.
                </p>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Project Cards --- */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {projects.map((project, index) => {
              const Icon = project.icon;

              return (
                <div
                  key={index}
                  className="flex flex-col overflow-hidden rounded-[2rem] bg-slate-950 border border-slate-800 shadow-xl transition-all hover:border-slate-700 group"
                >
                  {/* Top Content Section */}
                  <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 justify-between border-b border-slate-800">
                    <div className="flex-1">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 border border-slate-700">
                          <Icon className="h-4 w-4 text-violet-400" />
                        </div>
                        <p
                          className={`${ibmPlexSans.className} text-xs font-bold uppercase tracking-widest text-slate-400`}
                        >
                          Project {project.id}
                        </p>
                      </div>

                      <h3
                        className={`${sora.className} mb-2 text-2xl font-bold text-white md:text-3xl`}
                      >
                        {project.client}
                      </h3>
                      <p
                        className={`${ibmPlexSans.className} mb-6 text-sm font-medium text-violet-400`}
                      >
                        {project.category}
                      </p>

                      <div className="mb-6 space-y-3">
                        <p
                          className={`${ibmPlexSans.className} text-sm text-slate-400 leading-relaxed`}
                        >
                          <strong className="text-slate-200">The Flaw:</strong>{" "}
                          {project.problem}
                        </p>
                        <p
                          className={`${ibmPlexSans.className} text-sm text-slate-400 leading-relaxed`}
                        >
                          <strong className="text-slate-200">The Fix:</strong>{" "}
                          {project.solution}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, i) => (
                          <span
                            key={i}
                            className="rounded-lg bg-slate-900 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-300 border border-slate-800"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Impact & Action */}
                    <div className="flex flex-col items-start md:items-end justify-between shrink-0">
                      <div className="mb-6 md:mb-0 md:text-right">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                          Impact
                        </p>
                        <p
                          className={`${sora.className} text-4xl font-black text-white`}
                        >
                          {project.roi}
                        </p>
                        <p
                          className={`${ibmPlexSans.className} mt-1 text-xs text-slate-400`}
                        >
                          {project.roiText}
                        </p>
                      </div>

                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="flex items-center gap-2 rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-500 w-full md:w-auto justify-center cursor-pointer">
                          Inspect <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </a>
                    </div>
                  </div>

                  {/* Bottom Image Section */}
                  <div className="relative w-full h-72 md:h-96 overflow-hidden bg-slate-900">
                    <Image
                      src={project.image}
                      alt={`${project.client} visual`}
                      fill
                      className="md:object-cover object-contain md:object-top transition-transform duration-1000 ease-in-out group-hover:scale-103"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                    {/* Darker overlay for text legibility and "premium" depth */}
                    <div className="absoluteduration-500" />

                    {/* Subtle Violet Tint on Hover */}
                    <div className="absolute inset-0 bg-violet-600/0 transition-colors duration-500 group-hover:bg-violet-600/5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
