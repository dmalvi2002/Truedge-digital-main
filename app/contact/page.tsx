"use client";

import { useState } from "react";
import { Sora, IBM_Plex_Sans } from "next/font/google";
import { ArrowRight, Mail, MapPin, Phone, CheckCircle2 } from "lucide-react";

// Strict Truedge Standard Fonts
const sora = Sora({ subsets: ["latin"], weight: ["600", "700"] });
const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Custom Proper WhatsApp SVG Icon
const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

// Data for our interactive pills
const services = [
  "Website Development",
  "SaaS Development",
  "Cloud Architecture",
  "Mobile App Development",
  "Bespoke WordPress",
  "Migration",
  "Growth & SEO",
];
const budgets = ["< £5k", "£5k - £10k", "£10k - £20k", "£20k+"];

export default function ContactPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [hasCompany, setHasCompany] = useState<boolean | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  return (
    <main className="min-h-screen bg-[#fafafa] py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle Ambient Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-purple-400/10 to-transparent blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          {/* --- LEFT SIDE: The Pitch & Premium Mini Boxes (Sticky) --- */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-32 h-fit">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
              </span>
              <span
                className={`${ibm.className} text-xs font-bold tracking-widest text-purple-700 uppercase`}
              >
                Project Discovery
              </span>
            </div>

            <h1
              className={`${sora.className} text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 leading-[1.1] mb-6`}
            >
              Let's build your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                unfair advantage.
              </span>
            </h1>

            <p
              className={`${ibm.className} text-lg text-slate-600 leading-relaxed mb-8 max-w-md`}
            >
              Fill out the form to initiate a discovery call. We'll audit your
              current digital infrastructure and map out a bespoke architecture
              designed for aggressive scaling.
            </p>

            {/* Premium Contact Mini Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 w-full border-t border-slate-200 pt-8">
              {/* Email Box */}
              <div className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-purple-200">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                  <Mail size={20} />
                </div>
                <div>
                  <p
                    className={`${ibm.className} text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1`}
                  >
                    Email Us
                  </p>
                  <a
                    href="mailto:info@truedgedigital.co.uk"
                    className={`${ibm.className} text-sm sm:text-base font-semibold text-slate-900 transition-colors hover:text-purple-600`}
                  >
                    info@truedgedigital.co.uk
                  </a>
                </div>
              </div>

              {/* Call Box */}
              <div className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-purple-200">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                  <Phone size={20} />
                </div>
                <div>
                  <p
                    className={`${ibm.className} text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1`}
                  >
                    Call Us
                  </p>
                  <a
                    href="tel:+447832921562"
                    className={`${ibm.className} text-sm sm:text-base font-semibold text-slate-900 transition-colors hover:text-purple-600`}
                  >
                    +44 7832 921562
                  </a>
                </div>
              </div>

              {/* WhatsApp Box */}
              <div className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-emerald-200">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  <WhatsAppIcon size={22} />
                </div>
                <div>
                  <p
                    className={`${ibm.className} text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1`}
                  >
                    WhatsApp
                  </p>
                  <a
                    href="https://wa.me/447907901171"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${ibm.className} text-sm sm:text-base font-semibold text-slate-900 transition-colors hover:text-emerald-600`}
                  >
                    +44 7907 901171
                  </a>
                </div>
              </div>

              {/* Address Box (Not clickable, purely informational) */}
              <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md sm:col-span-2 lg:col-span-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-colors group-hover:bg-slate-800 group-hover:text-white">
                  <MapPin size={20} />
                </div>
                <div>
                  <p
                    className={`${ibm.className} text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1`}
                  >
                    Headquarters
                  </p>
                  <p
                    className={`${ibm.className} text-sm font-medium text-slate-700 leading-relaxed`}
                  >
                    82 Dunlin Road, Cove Bay
                    <br />
                    Aberdeen, United Kingdom
                    <br />
                    AB12 3WD
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: The Premium Interactive Form --- */}
          <div className="lg:col-span-7">
            <div className="rounded-[2.5rem] bg-white p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.04)] ring-1 ring-slate-100">
              <form className="flex flex-col gap-8">
                {/* 1. REQUIRED FIELDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="group sm:col-span-2">
                    <label
                      className={`${ibm.className} mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors group-focus-within:text-purple-600`}
                    >
                      Full Name{" "}
                      <span className="text-xs font-normal text-slate-400">
                        (Required)
                      </span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      className={`${ibm.className} w-full rounded-2xl border border-slate-200 bg-[#fafafa] px-5 py-4 text-slate-900 placeholder:text-slate-400 transition-all duration-300 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/10 hover:border-slate-300`}
                    />
                  </div>

                  {/* Email Address */}
                  <div className="group">
                    <label
                      className={`${ibm.className} mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors group-focus-within:text-purple-600`}
                    >
                      Email Address{" "}
                      <span className="text-xs font-normal text-slate-400">
                        (Required)
                      </span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      className={`${ibm.className} w-full rounded-2xl border border-slate-200 bg-[#fafafa] px-5 py-4 text-slate-900 placeholder:text-slate-400 transition-all duration-300 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/10 hover:border-slate-300`}
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="group">
                    <label
                      className={`${ibm.className} mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors group-focus-within:text-purple-600`}
                    >
                      Phone Number{" "}
                      <span className="text-xs font-normal text-slate-400">
                        (Required)
                      </span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="07123 456789"
                      className={`${ibm.className} w-full rounded-2xl border border-slate-200 bg-[#fafafa] px-5 py-4 text-slate-900 placeholder:text-slate-400 transition-all duration-300 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/10 hover:border-slate-300`}
                    />
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* 2. OPTIONAL FIELDS (Interactive Pills) */}
                <div className="flex flex-col gap-8">
                  {/* Services / Solutions */}
                  <div>
                    <label
                      className={`${ibm.className} mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700`}
                    >
                      What do you need?{" "}
                      <span className="text-xs font-normal text-slate-400">
                        (Optional)
                      </span>
                    </label>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {services.map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`${ibm.className} cursor-pointer flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                            selectedServices.includes(service)
                              ? "border-purple-600 bg-purple-600 text-white shadow-[0_4px_12px_rgba(147,51,234,0.25)]"
                              : "border-slate-200 bg-white text-slate-600 hover:border-purple-300 hover:bg-purple-50"
                          }`}
                        >
                          {service}
                          {selectedServices.includes(service) && (
                            <CheckCircle2 size={14} className="text-white" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Do you have a company? */}
                    <div>
                      <label
                        className={`${ibm.className} mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700`}
                      >
                        Operating Business?{" "}
                        <span className="text-xs font-normal text-slate-400">
                          (Optional)
                        </span>
                      </label>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setHasCompany(true)}
                          className={`${ibm.className} cursor-pointer flex-1 rounded-2xl border py-3 text-sm font-medium transition-all duration-300 ${
                            hasCompany === true
                              ? "border-purple-600 bg-purple-50 text-purple-700 shadow-sm"
                              : "border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:bg-slate-50"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setHasCompany(false)}
                          className={`${ibm.className} cursor-pointer flex-1 rounded-2xl border py-3 text-sm font-medium transition-all duration-300 ${
                            hasCompany === false
                              ? "border-purple-600 bg-purple-50 text-purple-700 shadow-sm"
                              : "border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:bg-slate-50"
                          }`}
                        >
                          No (Startup)
                        </button>
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <label
                        className={`${ibm.className} mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700`}
                      >
                        Project Budget{" "}
                        <span className="text-xs font-normal text-slate-400">
                          (Optional)
                        </span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {budgets.map((budget) => (
                          <button
                            key={budget}
                            type="button"
                            onClick={() => setSelectedBudget(budget)}
                            className={`${ibm.className} cursor-pointer rounded-xl border py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 ${
                              selectedBudget === budget
                                ? "border-purple-600 bg-purple-50 text-purple-700 shadow-sm"
                                : "border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:bg-slate-50"
                            }`}
                          >
                            {budget}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="group">
                    <label
                      className={`${ibm.className} mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors group-focus-within:text-purple-600`}
                    >
                      Project Details{" "}
                      <span className="text-xs font-normal text-slate-400">
                        (Optional)
                      </span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your current infrastructure and what you want to build..."
                      className={`${ibm.className} w-full resize-y rounded-2xl border border-slate-200 bg-[#fafafa] px-5 py-4 text-slate-900 placeholder:text-slate-400 transition-all duration-300 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/10 hover:border-slate-300`}
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button & Updated Disclaimer */}
                <div>
                  <button
                    type="submit"
                    className="group cursor-pointer flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,rgba(139,92,246,1)0%,rgba(109,40,217,1)100%)] px-6 py-4 text-md md:px-10 md:py-5 md:text-lg font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.4),inset_0_2px_2px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(124,58,237,0.6),inset_0_2px_2px_rgba(255,255,255,0.4)]"
                  >
                    Book a Strategy Call
                    <ArrowRight
                      size={20}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                  <p
                    className={`${ibm.className} text-center text-xs text-slate-500 mt-4 px-4 leading-relaxed`}
                  >
                    By submitting, you agree to our privacy policy. We will get
                    back to you within 6 hours. You can call us directly if it's
                    urgent.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
