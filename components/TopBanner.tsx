import React from "react";

const TopBanner = () => {
  return (
    <div
      className="relative z-[60] flex h-12 w-full items-center justify-center px-4 text-sm font-medium text-white overflow-hidden
      bg-[linear-gradient(90deg,rgba(109,40,217,1)0%,rgba(99,102,241,1)50%,rgba(37,99,235,1)100%)]
      border-b border-white/10
      shadow-[0_5px_20px_-5px_rgba(124,58,237,0.5),inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-3px_6px_rgba(0,0,0,0.25)]"
    >
      {/* Shiny overlay element for the 3D gloss */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50"></div>

      <div className="relative flex items-center gap-3">
        {/* --- Bright Green Pulsing Dot Animation --- */}
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          {/* Outer expanding ring (light green) */}
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
          
          {/* Solid inner dot with a bright green glow shadow */}
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400 shadow-[0_0_10px_rgba(34,197,94,1)]"></span>
        </span>

        {/* Banner Text */}
        <span className="tracking-wide drop-shadow-sm">
          We Are Available For New Project
        </span>
      </div>
    </div>
  );
};

export default TopBanner;