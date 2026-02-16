export default function Home() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-20">
        <p className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          Next.js Development Agency
        </p>
        <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          We build fast, scalable websites that grow your business.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          Truedge Digital helps startups and companies launch modern web experiences using Next.js, TypeScript, and
          clean UI systems.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="/projects"
            className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            View Projects
          </a>
          <a
            href="/contact"
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
