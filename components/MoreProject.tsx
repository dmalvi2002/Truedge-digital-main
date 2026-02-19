"use client";

import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Sora, IBM_Plex_Sans } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function MoreProject() {
  const moreProjects = [
    {
      title: "A2Z Immigration",
      description:
        "A high-converting lead generation platform tailored for international audiences. We streamlined their user journey, dramatically reducing bounce rates and increasing consultation bookings.",
      tags: ["Next.js", "Tailwind CSS"],
      metrics: [
        { value: "0.8s", label: "Page Load", colour: "text-white" },
        { value: "+85%", label: "Lead Gen", colour: "text-emerald-400" },
      ],
      link: "#",
      reverse: false,
    },
    {
      title: "iLearner's Hub",
      description:
        "A bespoke, high-traffic educational portal. We engineered a scalable architecture capable of handling thousands of concurrent users seamlessly, whilst maintaining lightning-fast performance.",
      tags: ["React", "Node.js"],
      metrics: [
        { value: "10k+", label: "Active Users", colour: "text-white" },
        { value: "100/100", label: "Performance", colour: "text-emerald-400" },
      ],
      link: "#",
      reverse: true,
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center lg:text-left">
          <h2
            className={`${sora.className} mb-6 text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl md:text-5xl`}
          >
            More{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
              Case Studies.
            </span>
          </h2>
          <p
            className={`${ibmPlexSans.className} mx-auto max-w-2xl text-lg text-slate-600 lg:mx-0 sm:text-xl`}
          >
            Explore our wider portfolio of engineered solutions. Real
            businesses, real data, brilliant results.
          </p>
        </div>

        <div className="flex flex-col gap-16">
          {moreProjects.map((project, index) => (
            <div
              key={index}
              className={`group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A0A0A] transition-all duration-500 hover:border-violet-500/30 hover:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.2)] lg:flex-row lg:items-stretch ${project.reverse ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="flex flex-1 flex-col justify-center p-8 sm:p-12 sm:py-16 z-10">
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3
                  className={`${sora.className} mb-4 text-3xl font-bold text-white`}
                >
                  {project.title}
                </h3>
                <p
                  className={`${ibmPlexSans.className} mb-8 text-slate-400 leading-relaxed`}
                >
                  {project.description}
                </p>

                <div className="mb-8 grid grid-cols-2 gap-4 border-l-2 border-violet-500/30 pl-4 sm:grid-cols-3">
                  {project.metrics.map((metric, i) => (
                    <div key={i}>
                      <p className={`text-2xl font-bold ${metric.colour}`}>
                        {metric.value}
                      </p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>

                <a
                  href={project.link}
                  className="inline-flex w-max items-center gap-2 text-sm font-bold text-violet-400 transition-colors hover:text-violet-300"
                >
                  Inspect Project{" "}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              </div>

              {/* Added flex flex-col here */}
              <div className="relative flex flex-col min-h-[300px] flex-1 overflow-hidden p-6 sm:p-8 lg:min-h-full bg-white/[0.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-transparent to-indigo-900/10 opacity-50"></div>

                {/* Changed h-full to flex-1 to allow it to stretch */}
                <div className="relative flex-1 w-full rounded-xl border border-white/10 bg-black shadow-2xl flex flex-col overflow-hidden transition-transform duration-700 lg:group-hover:scale-[1.03]">
                  {/* Browser Top Bar with responsive dots */}
                  <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-3">
                    <div className="h-2.5 w-2.5 rounded-full transition-colors duration-300 bg-[#FF5F56] lg:bg-slate-600 lg:group-hover:bg-[#FF5F56]"></div>
                    <div className="h-2.5 w-2.5 rounded-full transition-colors duration-300 delay-75 bg-[#FFBD2E] lg:bg-slate-600 lg:group-hover:bg-[#FFBD2E]"></div>
                    <div className="h-2.5 w-2.5 rounded-full transition-colors duration-300 delay-150 bg-[#27C93F] lg:bg-slate-600 lg:group-hover:bg-[#27C93F]"></div>
                  </div>

                  {/* Mockup Image Area with responsive opacity */}
                  <div className="flex-1 bg-[url('https://res.cloudinary.com/dvvcwzp4n/image/upload/f_webp/14375_c4sbqw')] bg-cover bg-center transition-opacity duration-500 opacity-90 lg:opacity-40 lg:group-hover:opacity-90"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
