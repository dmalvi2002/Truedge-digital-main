"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface SectionCursorProps {
  targetRef: React.RefObject<HTMLElement | null>;
  color?: string; // default electric lime #d2f83a
}

export default function SectionCursor({
  targetRef,
  color = "#d2f83a",
}: SectionCursorProps) {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only run on desktop devices with fine pointer (mouse/trackpad)
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const target = targetRef.current;

    if (!cursor || !ring || !dot || !target) return;

    // High-performance GPU quickTo setters (zero layout thrashing, 120Hz-ready)
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.24, ease: "power3.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.24, ease: "power3.out" });

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });

    let isInside = false;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (!isInside) {
        isInside = true;
        gsap.to(cursor, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: "power2.out",
        });
      }

      xToRing(clientX);
      yToRing(clientY);
      xToDot(clientX);
      yToDot(clientY);

      // Interactive hover expansion when hovering clickable links or buttons
      const hoveredElement = document.elementFromPoint(clientX, clientY);
      const isInteractive = Boolean(
        hoveredElement?.closest("a, button, [role='button'], .cursor-pointer")
      );

      if (isInteractive) {
        gsap.to(ring, {
          scale: 1.45,
          backgroundColor: "rgba(210, 248, 58, 0.22)",
          borderColor: "rgba(210, 248, 58, 0.8)",
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(dot, {
          scale: 0.6,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        gsap.to(ring, {
          scale: 1,
          backgroundColor: "rgba(210, 248, 58, 0.12)",
          borderColor: "rgba(210, 248, 58, 0.5)",
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(dot, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const onMouseEnter = () => {
      isInside = true;
      gsap.to(cursor, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    const onMouseLeave = () => {
      isInside = false;
      gsap.to(cursor, {
        opacity: 0,
        scale: 0.3,
        duration: 0.2,
        ease: "power2.in",
      });
    };

    const onWindowLeave = (e: MouseEvent) => {
      if (!e.relatedTarget && isInside) {
        onMouseLeave();
      }
    };

    target.addEventListener("mousemove", onMouseMove);
    target.addEventListener("mouseenter", onMouseEnter);
    target.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseout", onWindowLeave);

    return () => {
      target.removeEventListener("mousemove", onMouseMove);
      target.removeEventListener("mouseenter", onMouseEnter);
      target.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseout", onWindowLeave);
    };
  }, [targetRef, color]);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed inset-0 z-[9999] opacity-0 scale-50 transition-opacity duration-200"
      aria-hidden="true"
    >
      {/* Outer Translucent Green Halo / Ring with Subtle Blur */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-[#d2f83a]/50 bg-[#d2f83a]/12 backdrop-blur-[1.5px] shadow-[0_0_22px_rgba(210,248,58,0.35)] will-change-transform"
      />

      {/* Inner Neon Green Tracking Core */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#d2f83a] shadow-[0_0_10px_#d2f83a] will-change-transform"
      />
    </div>
  );
}
