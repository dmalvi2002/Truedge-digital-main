'use client';

// Adapted from React Bits Scroll Expand: https://reactbits.dev/animations/scroll-expand
// Local additions: composed media, accessible reveal, responsive timing and reduced motion.

import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import './ScrollExpand.css';

const clamp = (v: number, a: number, b: number): number => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

export interface ScrollExpandProps {
  src?: string;
  mediaType?: 'image' | 'video';
  poster?: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  children?: ReactNode;
  mediaContent?: ReactNode;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

const ScrollExpand: React.FC<ScrollExpandProps> = ({
  src = '',
  mediaType = 'image',
  poster = '',
  alt = '',
  title = '',
  scrollHint = '',
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  enabled = true,
  children,
  mediaContent,
  className = '',
  style,
  ...rest
}: ScrollExpandProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 760px)');
    const applyProgress = (p: number) => {
      const frame = frameRef.current;
      const media = mediaRef.current;
      if (!frame || !media) return;
      const c = { startWidth: mobileQuery.matches ? Math.max(startWidth, 91) : startWidth, startHeight: mobileQuery.matches ? Math.max(startHeight, 80) : startHeight, startRadius, endRadius, mediaZoom, overlayScrim };

      const e = smoothstep(0, 1, p);

      const w = c.startWidth + (100 - c.startWidth) * e;
      const h = c.startHeight + (100 - c.startHeight) * e;
      const ix = Math.max(0, (100 - w) / 2);
      const iy = Math.max(0, (100 - h) / 2);
      const r = c.startRadius + (c.endRadius - c.startRadius) * e;
      frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;

      media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * e})`;

      if (scrimRef.current) scrimRef.current.style.opacity = `${c.overlayScrim * e}`;

      if (titleRef.current) {
        const out = smoothstep(0.4, 0.88, p);
        titleRef.current.style.opacity = `${1 - out}`;
        titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`;
      }

      if (hintRef.current) {
        const gone = smoothstep(0, 0.12, p);
        hintRef.current.style.opacity = `${1 - gone}`;
        hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
      }

      if (overlayRef.current) {
        const inn = smoothstep(0.68, 1, p);
        overlayRef.current.style.opacity = `${inn}`;
        overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - inn)}px, 0)`;
        overlayRef.current.inert = inn < .9;
      }
    };

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;

    const measure = () => {
      if (useWindowScroll) stage.style.removeProperty('height');
      stageH = useWindowScroll ? stage.clientHeight : root.clientHeight;
      if (stageH <= 0) return;
      if (!useWindowScroll) stage.style.height = `${stageH}px`;
      const distance = mobileQuery.matches ? Math.min(scrollDistance, .65) : scrollDistance;
      track.style.height = `${stageH * (motionQuery.matches || !enabled ? 1 : 1 + Math.max(0, distance) + Math.max(0, holdDistance))}px`;

      const w = root.clientWidth || stageH;
      stage.style.setProperty('--se-title-size', `${clamp(w * 0.075, 20, 84)}px`);
    };

    const readProgress = () => {
      if (!enabled || motionQuery.matches) return 1;
      const span = stageH * Math.max(0.01, mobileQuery.matches ? Math.min(scrollDistance, .65) : scrollDistance);
      if (useWindowScroll) {
        const top = track.getBoundingClientRect().top;
        return clamp(-top / span, 0, 1);
      }
      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = () => {
      const k = smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (smoothing <= 0 || motionQuery.matches) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    const scroller = useWindowScroll ? window : root;
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    motionQuery.addEventListener('change', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      motionQuery.removeEventListener('change', onResize);
      ro.disconnect();
    };
  }, [useWindowScroll, enabled, startWidth, startHeight, startRadius, endRadius, mediaZoom, scrollDistance, holdDistance, smoothing, overlayScrim]);

  const media =
    mediaType === 'video' ? (
      <video
        className="scroll-expand__asset"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      // The upstream component supports arbitrary image URLs; custom media slots can use Next Image.
      // eslint-disable-next-line @next/next/no-img-element
      <img className="scroll-expand__asset" src={src} alt={alt} draggable={false} />
    );

  return (
    <div
      ref={rootRef}
      className={`scroll-expand ${useWindowScroll ? '' : 'scroll-expand--scroller'} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className="scroll-expand__track" style={{ '--se-distance': scrollDistance, '--se-mobile-distance': Math.min(scrollDistance, .65), '--se-hold': holdDistance } as CSSProperties}>
        <div ref={stageRef} className="scroll-expand__stage">
          <div ref={frameRef} className="scroll-expand__frame">
            <div ref={mediaRef} className="scroll-expand__media">{mediaContent || media}</div>
            <div ref={scrimRef} className="scroll-expand__scrim" />
            {children ? (
              <div ref={overlayRef} className="scroll-expand__overlay" inert>
                {children}
              </div>
            ) : null}
          </div>
          {title ? (
            <div ref={titleRef} className="scroll-expand__title">
              {title}
            </div>
          ) : null}
          {scrollHint ? (
            <div ref={hintRef} className="scroll-expand__hint">
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ScrollExpand;
