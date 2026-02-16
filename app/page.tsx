import Image from "next/image";
import Link from "next/link";
// Added Star to the imports for the 5/5 review
import { ArrowRight, PlayCircle, ShieldCheck, TrendingUp, CheckCircle2, Star } from "lucide-react";

// --- Import Google Fonts ---
import { Sora, IBM_Plex_Sans } from "next/font/google";
import ContrastSection from "../components/ContrastSection";
import ProofSection from "../components/ProofSection";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600"], // Kept at medium weights for that premium feel
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function Home() {
  return (
    <main>
    <div className="relative flex min-h-[calc(100vh-5rem)] w-full items-center overflow-hidden bg-slate-950">
      
      {/* --- Background Image --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dvvcwzp4n/image/upload/f_webp/14375_c4sbqw"
          alt="Truedge Digital Team Collaboration"
          fill
          priority
          className="object-cover object-[55%_center] md:object-center"
          quality={100}
        />
      </div>

      {/* --- The "Fade to Clear" Glass Overlay --- */}
      {/* 1. The Dark Color Gradient (Solid dark on left -> transparent on right) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent md:via-slate-950/60"></div>
      
      {/* 2. The Blurred Glass Gradient (Blurs the left, stays crisp on the right) */}
      <div className="absolute inset-0 z-0 backdrop-blur-md [mask-image:linear-gradient(to_right,rgba(0,0,0,1)_30%,rgba(0,0,0,0)_70%)]"></div>

      {/* --- Floating SVG Widgets (Absolute ones) --- */}
      
      {/* SVG 2: Growth Badge (Bottom Right - Green Arrow) remains absolute and hidden on mobile */}
      <div className="absolute bottom-[15%] right-[40%] z-10 hidden animate-[bounce_5s_infinite_1s] sm:block">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md shadow-[0_0_20px_rgba(124,58,237,0.1)] transition-all hover:bg-white/10">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/20 p-2 shadow-[0_0_10px_rgba(52,211,153,0.3)]">
            {/* Arrow icon is now green */}
            <TrendingUp size={20} className="text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white leading-none mb-1">+120%</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 leading-none">
              Client Growth
            </span>
          </div>
        </div>
      </div>

      {/* --- Main Hero Content (Flex Layout for Left/Right Alignment) --- */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Changed to flex container to perfectly push the review box to the right edge */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 pt-10 pb-20">
          
          {/* LEFT SIDE: Text & Buttons */}
          <div className="max-w-3xl lg:max-w-[45rem] text-left">
            
            {/* SVG 1: Security Badge - IN FLOW. Visible on mobile, animates ONLY on sm+ */}
            <div className="relative z-30 mb-6 flex w-max sm:animate-[bounce_4s_infinite]">
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-all hover:bg-white/10">
                <div className="flex items-center justify-center rounded-full bg-cyan-950/30 p-1.5 shadow-[0_0_10px_rgba(34,211,238,0.15)] border border-cyan-500/20">
                  <ShieldCheck size={16} className="text-cyan-300" />
                </div>
                <span className="pr-1 text-sm font-medium tracking-wide text-white/90">
                  Secured
                </span>
              </div>
            </div>

            {/* Main Headline (Sora - Medium Weight) */}
            <h1 
              className={`${sora.className} mb-6 text-4xl font-medium leading-[1.15] tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150 fill-mode-both`}
            >
              Designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400">Impact.</span><br />
              Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">Growth.</span>
            </h1>
            
            {/* Sub-headline (IBM Plex Sans) */}
            <p 
              className={`${ibmPlexSans.className} mb-10 max-w-2xl text-lg text-slate-300 drop-shadow-md md:text-xl leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300 fill-mode-both`}
            >
              Partner with Aberdeen's premium web development agency to build fast, secure, and modern websites.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-start gap-5 sm:flex-row animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500 fill-mode-both">
              {/* Primary Action */}
              <Link
                href="/contact"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,rgba(139,92,246,1)0%,rgba(109,40,217,1)100%)] px-8 py-4 text-base font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.5),inset_0_2px_2px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(124,58,237,0.7),inset_0_2px_2px_rgba(255,255,255,0.4)] sm:w-auto"
              >
                Start a Project
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Secondary Action */}
              <Link
                href="/projects"
                className="group flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] sm:w-auto"
              >
                <PlayCircle size={18} className="transition-transform group-hover:scale-110" />
                View Our Work
              </Link>
            </div>

            {/* --- Clean Trust Row --- */}
          {/* Stacked vertically on mobile (flex-col items-start), inline row on larger screens (sm:flex-row sm:items-center) */}
          <div className="mt-8 flex flex-col items-start gap-y-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 text-sm font-medium text-gray-300 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-700 fill-mode-both">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={18} className="text-emerald-400" />
              <span>Bank-Grade Security</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={18} className="text-emerald-400" />
              <span>Next.js Architecture</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={18} className="text-emerald-400" />
              <span>UK Based Team</span>
            </div>
          </div>
            
          </div>

          {/* RIGHT SIDE: Google Review Box */}
          {/* Visible on mobile at the end, no animation, compact sizing via md: prefix */}
          <div className="z-30 mt-4 shrink-0 lg:mt-0 lg:block w-full sm:w-auto self start lg:self-end">
            <Link 
              href="YOUR_GOOGLE_REVIEW_LINK" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(0,0,0,0.18)] md:gap-4 md:rounded-3xl md:p-6"
            >
              
              {/* Top Section: Logo, Rating, and Stars */}
              <div className="flex items-center gap-4 md:gap-5">
                {/* Google G Logo - smaller on mobile */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-md md:h-14 md:w-14">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5 md:h-7 md:w-7">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                  </svg>
                </div>
                
                {/* Review Stats */}
                <div className="flex flex-col justify-center">
                  <div className="mb-1 flex items-center gap-1.5 md:gap-2">
                    <span className="text-2xl font-extrabold leading-none text-slate-900 md:text-3xl">5.0</span>
                    <div className="flex gap-1 text-amber-400">
                      <Star className="h-[14px] w-[14px] md:h-[18px] md:w-[18px]" fill="currentColor" strokeWidth={0} />
                      <Star className="h-[14px] w-[14px] md:h-[18px] md:w-[18px]" fill="currentColor" strokeWidth={0} />
                      <Star className="h-[14px] w-[14px] md:h-[18px] md:w-[18px]" fill="currentColor" strokeWidth={0} />
                      <Star className="h-[14px] w-[14px] md:h-[18px] md:w-[18px]" fill="currentColor" strokeWidth={0} />
                      <Star className="h-[14px] w-[14px] md:h-[18px] md:w-[18px]" fill="currentColor" strokeWidth={0} />
                    </div>
                  </div>
                  {/* Trust/Credibility Phrase */}
                  <span className="text-xs font-bold text-slate-800 md:text-sm">
                    Top-Rated Web Development
                  </span>
                </div>
              </div>

              {/* Elegant Divider Line */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

              {/* Bottom Section: Verification and Credibility */}
              <div className="flex items-center justify-start gap-1.5 md:gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 md:h-5 md:w-5" />
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 md:text-[13px]">
                  8+ Google Reviews
                </span>
              </div>
              <div className="flex items-center justify-start gap-1.5 md:gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 md:h-5 md:w-5" />
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 md:text-[13px]">
                  100% Client Satisfaction
                </span>
              </div>
              
            </Link>
          </div>
          
        </div>
      </div>
    </div>
    <ContrastSection />
    <ProofSection />
    </main>
  );
}