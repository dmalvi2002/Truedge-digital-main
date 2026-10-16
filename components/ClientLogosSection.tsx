import Image from "next/image";
import styles from "./ClientLogosSection.module.css";

const clientLogos = [
  { name: "NHI", kind: "nhi" },
  { name: "iLearner’s Hub", src: "/assets/client-logos/ilearners-logo-dark.svg" },
  { name: "DigiTech World UK", src: "/assets/client-logos/digitech-logo.webp", compact: true },
  { name: "ASIS", kind: "asis" },
  { name: "A2Z Immigration", src: "/assets/client-logos/a2z-immigration-logo.svg" },
  { name: "Nelson College London", src: "/assets/client-logos/ncl-coloured-logo.svg" },
  { name: "Kinesis Subsea", src: "/assets/client-logos/kinesis-subsea-logo-dark.svg" },
  { name: "Technology", kind: "technology" },
  { name: "Magix World", src: "/assets/client-logos/magix-world-logo.webp" },
  { name: "Sanchez Watt", src: "/assets/sanchez-watt-logo.webp", compact: true },
];

function Logo({ logo }: { logo: (typeof clientLogos)[number] }) {
  if (logo.src) {
    return <Image src={logo.src} alt={logo.name} width={160} height={64}
      className={logo.compact ? styles.compactLogo : styles.imageLogo}
      loading="eager" sizes={logo.compact ? "72px" : "160px"} />;
  }
  if (logo.kind === "nhi") {
    return <span className="flex items-center gap-0.5 font-black text-2xl tracking-tighter text-emerald-600" role="img" aria-label="NHI">
      <span>N</span><span className="text-slate-900">H</span><span className="text-emerald-500">I</span>
    </span>;
  }
  if (logo.kind === "asis") {
    return <span className="flex items-center gap-2" role="img" aria-label="ASIS">
      <span className="w-8 h-8 rounded-full border-[3px] border-amber-500 relative flex items-center justify-center">
        <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
        <svg className="absolute -top-1 -right-1 w-3.5 h-3.5 text-slate-800" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8Z" />
        </svg>
      </span>
      <span className="flex flex-col leading-none"><span className="text-lg font-black tracking-wider text-slate-900">ASIS</span><span className="text-[8px] font-semibold text-amber-600 tracking-widest uppercase">Stay safe</span></span>
    </span>;
  }
  return <span className="flex items-center gap-2" role="img" aria-label="Technology">
    <svg className="w-7 h-7 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />
      <path d="M6 6h.01M6 18h.01" strokeWidth="3" />
    </svg>
    <span className="flex flex-col leading-none"><span className="text-base font-bold tracking-tight text-slate-800">Technology</span><span className="text-[8px] text-slate-400">Power for logic</span></span>
  </span>;
}

export default function ClientLogosSection() {
  return <section className={styles.section} aria-label="Our clients">
    <div className={styles.heading}><p>Trusted by high-growth UK brands &amp; fast-scaling companies</p></div>
    <div className={styles.ribbon}>
      <div className={styles.track}>
        {[0, 1].map((copy) => <div key={copy} className={styles.group} aria-hidden={copy === 1 ? true : undefined}>
          {clientLogos.map((logo) => <div className={styles.logo} key={logo.name} title={logo.name}><Logo logo={logo} /></div>)}
        </div>)}
      </div>
    </div>
  </section>;
}
