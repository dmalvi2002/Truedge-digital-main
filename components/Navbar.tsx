"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Barlow_Semi_Condensed, Sora } from "next/font/google";
import styles from "./Navbar.module.css";

const sora = Sora({ subsets: ["latin"], weight: ["500", "600", "700"] });
const brandFont = Barlow_Semi_Condensed({ subsets: ["latin"], weight: ["600"] });
const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Works", href: "/projects" },
  { name: "Marketing", href: "/marketing" },
];

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>;
}

function WhatsAppButton({ onClick }: { onClick?: () => void }) {
  return <a href="https://wa.me/447907901171" target="_blank" rel="noopener noreferrer" className={styles.contact} onClick={onClick} aria-label="Chat with us on WhatsApp"><span className={styles.contactLabel}>Chat With Us</span><span className={styles.contactIcon}><WhatsAppIcon /></span></a>;
}

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
const getScrolled = () => window.scrollY > 40;
const getServerScrolled = () => false;

export default function Navbar() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrolled, getServerScrolled);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const isOpen = openPath === pathname;
  const trigger = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPath(null);
        trigger.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpenPath(null);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const resize = () => { if (desktop.matches) setOpenPath(null); };
    window.addEventListener("keydown", dismiss);
    window.addEventListener("pointerdown", outside);
    desktop.addEventListener("change", resize);
    return () => {
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("pointerdown", outside);
      desktop.removeEventListener("change", resize);
    };
  }, [isOpen]);

  const isActive = (href: string) => href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <header ref={header} className={`${styles.header} ${(pathname === "/" || pathname === "/marketing") && !scrolled ? styles.dark : ""} ${scrolled ? styles.scrolled : ""} ${sora.className}`}>
      <div className={styles.inner}>
        <Link href="/" aria-label="Truedge Digital home" className={styles.brand} onClick={() => setOpenPath(null)}>
          <Image src="/truedge-logo.webp" alt="" width={64} height={72} priority />
          <span className={`${styles.wordmark} ${brandFont.className}`}><span>TRUEDGE</span><span>DIGITAL</span></span>
        </Link>
        <nav aria-label="Main navigation" className={styles.navigation}>
          {links.map((link) => <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? "page" : undefined}>{link.name}</Link>)}
        </nav>
        <div className={styles.right}>
          <WhatsAppButton />
          <button ref={trigger} type="button" className={styles.menuButton} aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label={isOpen ? "Close navigation" : "Open navigation"} onClick={() => setOpenPath(isOpen ? null : pathname)}>
            {isOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!isOpen} className={styles.mobile}>
        {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpenPath(null)} aria-current={isActive(link.href) ? "page" : undefined}>{link.name}</Link>)}
        <div className={styles.mobileContact}><WhatsAppButton onClick={() => setOpenPath(null)} /></div>
      </nav>
    </header>
  );
}
