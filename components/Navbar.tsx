"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Folder, House, Mail, Menu, Newspaper, Users, X } from "lucide-react";
import { Barlow_Semi_Condensed, Sora } from "next/font/google";
import styles from "./Navbar.module.css";
import WhatsAppIcon from "./WhatsAppIcon";
import ctaStyles from "./MainHeroTwo.module.css";
import { LiquidGlassBackground } from "./ui/liquid-glass-button";

const sora = Sora({ subsets: ["latin"], weight: ["500", "600", "700"] });
const brandFont = Barlow_Semi_Condensed({ subsets: ["latin"], weight: ["600"] });
const links = [
  { name: "Marketing", href: "/marketing" },
  { name: "AI Automation", href: "/ai-automation" },
  { name: "Web Design", href: "/web-design" },
  { name: "Pricing", href: "/pricing" },
];
const moreLinks = [
  { name: "Home", href: "/", description: "Back to the beginning", icon: House },
  { name: "About Us", href: "/about", description: "Meet Truedge", icon: Users },
  { name: "Our Work", href: "/works", description: "Selected projects", icon: Folder },
  { name: "Blog", href: "/blog", description: "Ideas and insights", icon: Newspaper },
  { name: "Contact", href: "/contact", description: "Start a conversation", icon: Mail },
];


function WhatsAppButton({ onClick }: { onClick?: () => void }) {
  return <a href="https://wa.me/447907901171" target="_blank" rel="noopener noreferrer" className={styles.whatsapp} onClick={onClick} aria-label="Chat with us on WhatsApp"><WhatsAppIcon /></a>;
}

function ContactButton({ onClick }: { onClick?: () => void }) {
  return <Link href="/contact" onClick={onClick} className={`${ctaStyles.cta} ${styles.contact}`}><span>Contact Us</span><span className={ctaStyles.ctaIcon} aria-hidden="true"><ArrowUpRight size={21} /></span></Link>;
}

export default function Navbar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<{ path: string; kind: "mobile" | "more" } | null>(null);
  const isOpen = openMenu?.path === pathname && openMenu.kind === "mobile";
  const moreOpen = openMenu?.path === pathname && openMenu.kind === "more";
  const close = () => setOpenMenu(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const moreTrigger = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!isOpen && !moreOpen) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        (moreOpen ? moreTrigger : trigger).current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpenMenu(null);
    };
    const desktop = window.matchMedia("(min-width: 1200px)");
    const resize = () => setOpenMenu(null);
    window.addEventListener("keydown", dismiss);
    window.addEventListener("pointerdown", outside);
    desktop.addEventListener("change", resize);
    return () => {
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("pointerdown", outside);
      desktop.removeEventListener("change", resize);
    };
  }, [isOpen, moreOpen]);

  const isActive = (href: string) => pathname !== "/" && href !== "/" && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
    {pathname !== "/marketing" && <div aria-hidden="true" className={styles.spacer} style={{ background: "#06070b" }} />}
    <header ref={header} className={`${styles.header} ${sora.className}`} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) close(); }}>
      <div className={styles.background} aria-hidden="true">
        <LiquidGlassBackground dark liquid softEdges />
      </div>
      <div className={styles.inner}>
        <Link href="/" aria-label="Truedge Digital home" className={styles.brand} onClick={close}>
          <span className={styles.logoFrame} aria-hidden="true">
            <Image src="/truedge-logo-white.svg" alt="" width={64} height={72} priority />
          </span>
          <span className={`${styles.wordmark} ${brandFont.className}`}><span>TRUEDGE</span><span>DIGITAL</span></span>
        </Link>
        <nav aria-label="Main navigation" className={styles.navigation}>
          {links.map((link) => <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? "page" : undefined}>{link.name}</Link>)}
          <div className={styles.more}>
            <button ref={moreTrigger} type="button" className={styles.moreButton} aria-expanded={moreOpen} aria-controls="more-navigation" data-active={moreLinks.some(link => isActive(link.href)) || undefined} onClick={() => setOpenMenu(moreOpen ? null : { path: pathname, kind: "more" })}>More <ChevronDown size={14} aria-hidden="true" /></button>
            <div id="more-navigation" hidden={!moreOpen} className={styles.dropdown}>
              <p className={styles.menuLabel}>Explore Truedge</p>
              <div className={styles.moreGrid}>{moreLinks.map(({ name, href, description, icon: Icon }) => <Link key={href} href={href} onClick={close} aria-current={isActive(href) ? "page" : undefined}><Icon size={20} aria-hidden="true" /><span><strong>{name}</strong><small>{description}</small></span><ArrowUpRight size={15} className={styles.itemArrow} aria-hidden="true" /></Link>)}</div>
            </div>
          </div>
        </nav>
        <div className={styles.right}>
          <WhatsAppButton />
          <ContactButton onClick={close} />
          <button ref={trigger} type="button" className={styles.menuButton} aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label={isOpen ? "Close navigation" : "Open navigation"} onClick={() => setOpenMenu(isOpen ? null : { path: pathname, kind: "mobile" })}>
            {isOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!isOpen} className={styles.mobile}>
        <p className={styles.menuLabel}>What we do</p>
        <div className={styles.mobilePrimary}>{links.map((link) => <Link key={link.href} href={link.href} onClick={close} aria-current={isActive(link.href) ? "page" : undefined}>{link.name}<ArrowUpRight size={19} aria-hidden="true" /></Link>)}</div>
        <details className={styles.mobileMore}><summary>More <ChevronDown size={17} aria-hidden="true" /></summary><div className={styles.moreGrid}>{moreLinks.map(({ name, href, icon: Icon }) => <Link key={href} href={href} onClick={close} aria-current={isActive(href) ? "page" : undefined}><Icon size={18} aria-hidden="true" />{name}</Link>)}</div></details>
      </nav>
    </header>
    </>
  );
}
