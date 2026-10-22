"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Folder, House, Mail, Menu, Newspaper, Users, X } from "lucide-react";
import { Barlow_Semi_Condensed, Sora } from "next/font/google";
import styles from "./Navbar.module.css";
import ctaStyles from "./MainHeroTwo.module.css";
import { LiquidGlassBackground } from "@/components/ui/liquid-glass-button";

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

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>;
}

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
  const [overLightBackground, setOverLightBackground] = useState(false);

  useEffect(() => {
    // Read the page beneath the fixed header, excluding the header and its menus.
    // A majority across three points avoids switching for a small card or image.
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    let frame = 0;
    const measure = () => {
      frame = 0;
      const nav = header.current;
      if (!nav || !context) return;
      const rect = nav.getBoundingClientRect();
      const lightPoints = [0.2, 0.5, 0.8].filter(position => {
        const underneath = document.elementsFromPoint(rect.left + rect.width * position, rect.top + rect.height / 2)
          .find(element => !nav.contains(element));
        let red = 0, green = 0, blue = 0, remaining = 1;
        for (let element = underneath; element && remaining > 0.01; element = element.parentElement ?? undefined) {
          context.clearRect(0, 0, 1, 1);
          context.fillStyle = getComputedStyle(element).backgroundColor;
          context.fillRect(0, 0, 1, 1);
          const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
          const alpha = a / 255;
          red += r * alpha * remaining;
          green += g * alpha * remaining;
          blue += b * alpha * remaining;
          remaining *= 1 - alpha;
        }
        // The browser canvas beneath transparent ancestors defaults to white.
        const brightness = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255 + remaining;
        return brightness > 0.6;
      }).length;
      setOverLightBackground(lightPoints >= 2);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true, capture: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

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
    <header ref={header} data-glass-mode={overLightBackground ? "frosted" : "refractive"} className={`${styles.header} ${sora.className}`} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) close(); }}>
      <div className={styles.background} aria-hidden="true">
        <LiquidGlassBackground dark liquid frosted={overLightBackground} />
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
