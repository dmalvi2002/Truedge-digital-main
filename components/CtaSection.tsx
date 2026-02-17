import Link from "next/link";
import { ArrowRight, Swords, Flame, Sparkles } from "lucide-react";
import { Sora, IBM_Plex_Sans } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
const ibmPlexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function CtaSection() {
  return (
    <section className="relative w-full bg-white py-24 sm:py-32 lg:py-44 overflow-hidden">
      
      {/* --- CSS Animation Injection for Floating --- */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-25px) rotate(5deg); }
          }
          @keyframes float-reverse {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(25px) rotate(-5deg); }
          }
          .animate-float { animation: float ease-in-out infinite; }
          .animate-float-reverse { animation: float-reverse ease-in-out infinite; }
        `
      }} />

      {/* --- LAYER 1: Architectural Grid Background --- */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8b5cf615_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf615_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]"></div>

      {/* --- LAYER 2: Large Ambient Gradient Blobs --- */}
      <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-violet-200/40 blur-[120px] mix-blend-multiply pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-indigo-200/40 blur-[120px] mix-blend-multiply pointer-events-none"></div>

      {/* --- LAYER 3: The Cheeky Floating Texture Emojis (Maximum Density!) --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none font-emoji">
        
        {/* Top area */}
        <div className="absolute top-10 left-10 text-6xl opacity-30 mix-blend-multiply animate-float" style={{animationDuration: '12s', animationDelay: '0s'}}>🚀</div>
        <div className="absolute top-24 right-1/4 text-5xl opacity-25 mix-blend-multiply animate-float-reverse" style={{animationDuration: '15s', animationDelay: '-2s'}}>💸</div>
        <div className="absolute top-1/3 left-1/3 text-4xl opacity-20 mix-blend-multiply animate-float" style={{animationDuration: '10s', animationDelay: '-5s'}}>✨</div>
        <div className="absolute top-8 right-16 text-4xl opacity-25 mix-blend-multiply animate-float" style={{animationDuration: '13s', animationDelay: '-4s'}}>💡</div>
        <div className="absolute top-40 left-1/4 text-5xl opacity-20 mix-blend-multiply animate-float-reverse rotate-12" style={{animationDuration: '18s', animationDelay: '-1s'}}>📈</div>
        
        {/* Middle area - Near the card */}
        <div className="absolute top-1/2 right-12 text-7xl opacity-30 mix-blend-multiply animate-float-reverse -rotate-12" style={{animationDuration: '14s', animationDelay: '-1s'}}>🔥</div>
        <div className="absolute top-[55%] left-20 text-5xl opacity-25 mix-blend-multiply animate-float" style={{animationDuration: '11s', animationDelay: '-7s'}}>🎯</div>
        <div className="absolute top-[40%] right-1/3 text-4xl opacity-20 mix-blend-multiply animate-float" style={{animationDuration: '16s', animationDelay: '-3s'}}>💻</div>
        <div className="absolute top-[60%] left-[28%] text-6xl opacity-[0.15] mix-blend-multiply animate-float-reverse rotate-[25deg]" style={{animationDuration: '19s', animationDelay: '-6s'}}>⚙️</div>
        
        {/* Bottom area */}
        <div className="absolute bottom-32 left-1/4 text-6xl opacity-30 mix-blend-multiply animate-float" style={{animationDuration: '13s', animationDelay: '-3s'}}>⚡️</div>
        <div className="absolute bottom-10 right-1/3 text-5xl opacity-25 mix-blend-multiply animate-float-reverse" style={{animationDuration: '16s', animationDelay: '-8s'}}>👀</div>
        <div className="absolute bottom-1/4 right-10 text-4xl opacity-20 mix-blend-multiply animate-float" style={{animationDuration: '9s', animationDelay: '-4s'}}>💎</div>
        <div className="absolute bottom-20 left-10 text-5xl opacity-25 mix-blend-multiply animate-float-reverse -rotate-6" style={{animationDuration: '17s', animationDelay: '-2s'}}>🏆</div>
        <div className="absolute bottom-40 right-1/4 text-4xl opacity-[0.22] mix-blend-multiply animate-float" style={{animationDuration: '12s', animationDelay: '-9s'}}>🧠</div>
        <div className="absolute -bottom-4 left-1/2 text-5xl opacity-20 mix-blend-multiply animate-float rotate-12" style={{animationDuration: '15s', animationDelay: '-5s'}}>📱</div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* --- THE MASSIVE PRISTINE CARD --- */}
        <div className="relative w-full overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border border-violet-100/80 bg-white/70 p-8 text-center shadow-[0_30px_80px_-20px_rgba(139,92,246,0.15)] backdrop-blur-2xl sm:p-16 lg:p-24 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_40px_100px_-20px_rgba(139,92,246,0.25)]">
          
          {/* Subtle inner glow for the card */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-violet-50/30 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            
            {/* The "Unfair Advantage" Tag */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md">
              <Swords size={16} className="text-violet-600" />
              <span className={`${ibmPlexSans.className} text-xs font-bold uppercase tracking-widest text-violet-700`}>
                The Unfair Advantage
              </span>
            </div>

            {/* The Flex Headline */}
            <h2 className={`${sora.className} mb-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl`}>
              Let's build something your competitors will <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 drop-shadow-sm">
                try to copy.
              </span>
            </h2>

            {/* The Cheeky Sub-headline */}
            <p className={`${ibmPlexSans.className} mx-auto mb-12 max-w-2xl text-lg font-medium text-slate-500 sm:text-xl leading-relaxed`}>
              (And fail, obviously. Because they don't have us.) <br className="hidden sm:block" />
              Stop leaving money on the table with a slow, outdated website.
            </p>

            {/* --- THE BUTTON WITH TOOLTIP --- */}
            <div className="relative group inline-flex flex-col items-center">
              
              {/* Cheeky Hover Tooltip */}
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap rounded-xl bg-slate-900 px-4 py-2 text-sm font-black text-white opacity-0 shadow-2xl transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:opacity-100">
                <div className="flex items-center gap-1.5">
                  🔥 Do it. We dare you.
                </div>
                <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-slate-900"></div>
              </div>

              {/* The Main Action Button */}
              <Link
                href="/contact"
                className="flex items-center justify-center gap-3 rounded-full bg-[linear-gradient(180deg,rgba(139,92,246,1)0%,rgba(109,40,217,1)100%)] p-5 lg:px-10 lg:py-5 text-lg font-bold text-white shadow-[0_10px_30px_rgba(124,58,237,0.3),inset_0_2px_2px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_rgba(124,58,237,0.5),inset_0_2px_2px_rgba(255,255,255,0.4)]"
              >
                Start Your Project
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
}