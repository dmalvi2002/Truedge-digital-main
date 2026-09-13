'use client';

import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRippleTitleProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';
  className?: string;
  accentColor?: string; // default electric lime #d2f83a
  baseColor?: string;   // default dark grey transparent
  activeColor?: string; // default white
}

export default function ScrollRippleTitle({
  text,
  as: Component = 'h2',
  className = '',
  accentColor = '#d2f83a',
  baseColor = 'rgba(255, 255, 255, 0.22)',
  activeColor = '#ffffff',
}: ScrollRippleTitleProps) {
  const containerRef = useRef<HTMLHeadingElement | null>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Split text into words, then letters
  const words = useMemo(() => {
    return text.split(' ').map((word) => word.split(''));
  }, [text]);

  // Total letters count (excluding spaces between words)
  const totalLetters = useMemo(() => {
    return words.reduce((acc, word) => acc + word.length, 0);
  }, [words]);

  // Continuous, ultra-smooth scroll calculation
  const updateScrollLetters = useCallback(
    (progress: number) => {
      // Cursor position in letter index space
      // Slightly padded so 0 is clean start and 1 is full reveal
      const cursor = progress * (totalLetters + 4) - 2;

      for (let i = 0; i < totalLetters; i++) {
        const el = letterRefs.current[i];
        if (!el) continue;

        const dist = cursor - i;

        if (dist <= 0) {
          // Unrevealed: translucent state
          el.style.color = baseColor;
          el.style.opacity = baseColor.startsWith('rgba') ? '1' : '0.35';
          el.style.textShadow = 'none';
          el.style.transform = 'translateY(0)';
        } else if (dist < 2.2) {
          // Leading edge: vibrant accent ripple wave with intense glow
          const peak = Math.sin((dist / 2.2) * Math.PI);
          el.style.color = peak > 0.35 ? accentColor : (dist > 1.1 ? activeColor : baseColor);
          el.style.opacity = '1';
          el.style.textShadow = peak > 0.3 ? `0 0 16px ${accentColor}, 0 0 30px ${accentColor}` : 'none';
          el.style.transform = `translateY(${-2 * peak}px)`;
        } else {
          // Revealed: crisp active color
          el.style.color = activeColor;
          el.style.opacity = '1';
          el.style.textShadow = 'none';
          el.style.transform = 'translateY(0)';
        }
      }
    },
    [accentColor, activeColor, baseColor, totalLetters]
  );

  // Setup GSAP ScrollTrigger
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Set initial unrevealed state
    for (let i = 0; i < totalLetters; i++) {
      const node = letterRefs.current[i];
      if (node) {
        node.style.color = baseColor;
        node.style.opacity = baseColor.startsWith('rgba') ? '1' : '0.35';
        node.style.textShadow = 'none';
        node.style.transform = 'translateY(0)';
      }
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      end: 'top 32%',
      scrub: 0.8, // Smooth damping for silky inertia
      onUpdate: (self) => {
        updateScrollLetters(self.progress);
      },
    });

    // Check initial position on mount
    updateScrollLetters(st.progress);

    return () => {
      st.kill();
    };
  }, [baseColor, totalLetters, updateScrollLetters]);

  // Track global letter index across words
  let globalLetterIndex = 0;

  return (
    <Component
      ref={containerRef as any}
      aria-label={text}
      className={`relative inline-block select-none ${className}`}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.map((char, charIndex) => {
            const currentIndex = globalLetterIndex++;
            return (
              <span
                key={charIndex}
                ref={(node) => {
                  letterRefs.current[currentIndex] = node;
                }}
                aria-hidden="true"
                className="inline-block transition-all duration-200 ease-out will-change-transform"
                style={{
                  color: baseColor,
                  opacity: 0.35,
                  transform: 'translateY(0)',
                }}
              >
                {char}
              </span>
            );
          })}
          {wordIndex < words.length - 1 && (
            <span aria-hidden="true" className="inline-block">
              &nbsp;
            </span>
          )}
        </span>
      ))}
    </Component>
  );
}
