"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Adapted from the user-supplied 21st.dev component. Its decorative layers
// are exported separately so navigation can use the surface without a button.
const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-primary-foreground hover:bg-destructive/90",
        cool: "dark:inset-shadow-2xs dark:inset-shadow-white/10 bg-linear-to-t border border-b-2 border-zinc-950/40 from-primary to-primary/85 shadow-md shadow-primary/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-110 active:brightness-90 dark:border-x-0 text-primary-foreground dark:text-primary-foreground dark:border-t-0 dark:border-primary/50 dark:ring-white/5",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: { default: "h-9 px-4 py-2", sm: "h-8 rounded-md px-3 text-xs", lg: "h-10 rounded-md px-8", icon: "h-9 w-9" },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

const liquidbuttonVariants = cva(
  "inline-flex items-center transition-colors justify-center cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:scale-105 duration-300 transition text-primary",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3", sm: "h-8 text-xs gap-1.5 px-4 has-[>svg]:px-4",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4", xl: "h-12 rounded-md px-8 has-[>svg]:px-6",
        xxl: "h-14 rounded-md px-10 has-[>svg]:px-8", icon: "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "xxl" },
  }
);

const lightShadow = "0 0 6px rgba(0,0,0,0.03),0 2px 6px rgba(0,0,0,0.08),inset 3px 3px 0.5px -3px rgba(0,0,0,0.9),inset -3px -3px 0.5px -3px rgba(0,0,0,0.85),inset 1px 1px 1px -0.5px rgba(0,0,0,0.6),inset -1px -1px 1px -0.5px rgba(0,0,0,0.6),inset 0 0 6px 6px rgba(0,0,0,0.12),inset 0 0 2px 2px rgba(0,0,0,0.06),0 0 12px rgba(255,255,255,0.15)";
const darkShadow = "0 0 8px rgba(0,0,0,0.03),0 2px 6px rgba(0,0,0,0.08),inset 3px 3px 0.5px -3.5px rgba(255,255,255,0.09),inset -3px -3px 0.5px -3.5px rgba(255,255,255,0.85),inset 1px 1px 1px -0.5px rgba(255,255,255,0.6),inset -1px -1px 1px -0.5px rgba(255,255,255,0.6),inset 0 0 6px 6px rgba(255,255,255,0.12),inset 0 0 2px 2px rgba(255,255,255,0.06),0 0 12px rgba(0,0,0,0.15)";
const softEdgeShadow = "inset 0 0 0 1px rgba(130,137,145,0.24),0 5px 18px rgba(8,10,16,0.12)";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
function subscribeToMotionPreference(callback: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const prefersReducedMotion = () => window.matchMedia(reducedMotionQuery).matches;
const serverReducedMotion = () => true;

export function LiquidGlassBackground({ className, dark = false, frosted = false, liquid = false, softEdges = false }: {
  className?: string;
  dark?: boolean;
  frosted?: boolean;
  liquid?: boolean;
  softEdges?: boolean;
}) {
  const filterId = `container-glass-${React.useId().replace(/:/g, "")}`;
  const reducedMotion = React.useSyncExternalStore(subscribeToMotionPreference, prefersReducedMotion, serverReducedMotion);
  const backdropFilter = frosted
    ? `blur(10px) saturate(1.4) brightness(1.04)${liquid ? ` url("#${filterId}")` : ""}`
    : `url("#${filterId}") blur(1px)`;
  return <span aria-hidden="true" className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", className)}>
    <span className="absolute inset-0 rounded-[inherit]" style={{
      backdropFilter,
      WebkitBackdropFilter: backdropFilter,
    }} />
    <span className="absolute inset-0 rounded-[inherit]" style={{ boxShadow: softEdges ? softEdgeShadow : dark ? darkShadow : lightShadow }} />
    <GlassFilter id={filterId} liquid={liquid} frosted={frosted} animate={liquid && !reducedMotion} />
  </span>;
}

function LiquidButton({ className, variant, size, asChild = false, children, ...props }:
  React.ComponentProps<"button"> & VariantProps<typeof liquidbuttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn("relative isolate", liquidbuttonVariants({ variant, size, className }))} {...props}>
    <LiquidGlassBackground className="rounded-full dark:hidden" />
    <LiquidGlassBackground className="hidden rounded-full dark:block" dark />
    <span className="relative z-10">{children}</span>
  </Comp>;
}

function GlassFilter({ id, liquid = false, frosted = false, animate = false }: { id: string; liquid?: boolean; frosted?: boolean; animate?: boolean }) {
  return <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true" focusable="false">
    <defs><filter id={id} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency={liquid ? "0.012 0.035" : "0.05 0.05"} numOctaves="1" seed="1" result="turbulence">
        {animate && <animate attributeName="baseFrequency" values="0.012 0.035;0.015 0.028;0.012 0.035" dur="16s" repeatCount="indefinite" />}
      </feTurbulence>
      <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
      <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale={liquid ? (frosted ? 12 : 28) : 70} xChannelSelector="R" yChannelSelector="B" result="displaced" />
      <feGaussianBlur in="displaced" stdDeviation={liquid ? 1.5 : 4} result="finalBlur" />
      <feComposite in="finalBlur" in2="finalBlur" operator="over" />
    </filter></defs>
  </svg>;
}

type ColorVariant = "default" | "primary" | "success" | "error" | "gold" | "bronze";
interface MetalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: ColorVariant }
const colorVariants = {
  default: { outer: "bg-gradient-to-b from-[#000] to-[#A0A0A0]", inner: "bg-gradient-to-b from-[#FAFAFA] via-[#3E3E3E] to-[#E5E5E5]", button: "bg-gradient-to-b from-[#B9B9B9] to-[#969696]", textColor: "text-white", textShadow: "[text-shadow:_0_-1px_0_rgb(80_80_80_/_100%)]" },
  primary: { outer: "bg-gradient-to-b from-[#000] to-[#A0A0A0]", inner: "bg-gradient-to-b from-primary via-secondary to-muted", button: "bg-gradient-to-b from-primary to-primary/40", textColor: "text-white", textShadow: "[text-shadow:_0_-1px_0_rgb(30_58_138_/_100%)]" },
  success: { outer: "bg-gradient-to-b from-[#005A43] to-[#7CCB9B]", inner: "bg-gradient-to-b from-[#E5F8F0] via-[#00352F] to-[#D1F0E6]", button: "bg-gradient-to-b from-[#9ADBC8] to-[#3E8F7C]", textColor: "text-[#FFF7F0]", textShadow: "[text-shadow:_0_-1px_0_rgb(6_78_59_/_100%)]" },
  error: { outer: "bg-gradient-to-b from-[#5A0000] to-[#FFAEB0]", inner: "bg-gradient-to-b from-[#FFDEDE] via-[#680002] to-[#FFE9E9]", button: "bg-gradient-to-b from-[#F08D8F] to-[#A45253]", textColor: "text-[#FFF7F0]", textShadow: "[text-shadow:_0_-1px_0_rgb(146_64_14_/_100%)]" },
  gold: { outer: "bg-gradient-to-b from-[#917100] to-[#EAD98F]", inner: "bg-gradient-to-b from-[#FFFDDD] via-[#856807] to-[#FFF1B3]", button: "bg-gradient-to-b from-[#FFEBA1] to-[#9B873F]", textColor: "text-[#FFFDE5]", textShadow: "[text-shadow:_0_-1px_0_rgb(178_140_2_/_100%)]" },
  bronze: { outer: "bg-gradient-to-b from-[#864813] to-[#E9B486]", inner: "bg-gradient-to-b from-[#EDC5A1] via-[#5F2D01] to-[#FFDEC1]", button: "bg-gradient-to-b from-[#FFE3C9] to-[#A36F3D]", textColor: "text-[#FFF7F0]", textShadow: "[text-shadow:_0_-1px_0_rgb(124_45_18_/_100%)]" },
};

const metalButtonVariants = (variant: ColorVariant, isPressed: boolean, isHovered: boolean, isTouchDevice: boolean) => {
  const colors = colorVariants[variant];
  const transition = "all 250ms cubic-bezier(0.1, 0.4, 0.2, 1)";
  return {
    wrapper: cn("relative inline-flex transform-gpu rounded-md p-[1.25px] will-change-transform", colors.outer),
    wrapperStyle: { transform: isPressed ? "translateY(2.5px) scale(0.99)" : "translateY(0) scale(1)", boxShadow: isPressed ? "0 1px 2px rgba(0, 0, 0, 0.15)" : isHovered && !isTouchDevice ? "0 4px 12px rgba(0, 0, 0, 0.12)" : "0 3px 8px rgba(0, 0, 0, 0.08)", transition, transformOrigin: "center center" },
    inner: cn("absolute inset-[1px] transform-gpu rounded-lg will-change-transform", colors.inner),
    innerStyle: { transition, transformOrigin: "center center", filter: isHovered && !isPressed && !isTouchDevice ? "brightness(1.05)" : "none" },
    button: cn("relative z-10 m-[1px] rounded-md inline-flex h-11 transform-gpu cursor-pointer items-center justify-center overflow-hidden px-6 py-2 text-sm leading-none font-semibold will-change-transform outline-none", colors.button, colors.textColor, colors.textShadow),
    buttonStyle: { transform: isPressed ? "scale(0.97)" : "scale(1)", transition, transformOrigin: "center center", filter: isHovered && !isPressed && !isTouchDevice ? "brightness(1.02)" : "none" },
  };
};

const ShineEffect = ({ isPressed }: { isPressed: boolean }) => <span className={cn("pointer-events-none absolute inset-0 z-20 overflow-hidden transition-opacity duration-300", isPressed ? "opacity-20" : "opacity-0")}><span className="absolute inset-0 rounded-md bg-gradient-to-r from-transparent via-neutral-100 to-transparent" /></span>;

const MetalButton = React.forwardRef<HTMLButtonElement, MetalButtonProps>(({ children, className, variant = "default", ...props }, ref) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);
  React.useEffect(() => {
    const media = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouchDevice(media.matches);
    const frame = requestAnimationFrame(update);
    media.addEventListener("change", update);
    return () => { cancelAnimationFrame(frame); media.removeEventListener("change", update); };
  }, []);
  const variants = metalButtonVariants(variant, isPressed, isHovered, isTouchDevice);
  return <div className={variants.wrapper} style={variants.wrapperStyle}>
    <div className={variants.inner} style={variants.innerStyle} />
    <button ref={ref} className={cn(variants.button, className)} style={variants.buttonStyle} {...props}
      onMouseDown={event => { setIsPressed(true); props.onMouseDown?.(event); }}
      onMouseUp={event => { setIsPressed(false); props.onMouseUp?.(event); }}
      onMouseLeave={event => { setIsPressed(false); setIsHovered(false); props.onMouseLeave?.(event); }}
      onMouseEnter={event => { if (!isTouchDevice) setIsHovered(true); props.onMouseEnter?.(event); }}
      onTouchStart={event => { setIsPressed(true); props.onTouchStart?.(event); }}
      onTouchEnd={event => { setIsPressed(false); props.onTouchEnd?.(event); }}
      onTouchCancel={event => { setIsPressed(false); props.onTouchCancel?.(event); }}>
      <ShineEffect isPressed={isPressed} />{children || "Button"}
      {isHovered && !isPressed && !isTouchDevice && <span className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-t from-transparent to-white/5" />}
    </button>
  </div>;
});
MetalButton.displayName = "MetalButton";

export { Button, buttonVariants, liquidbuttonVariants, LiquidButton, MetalButton };
