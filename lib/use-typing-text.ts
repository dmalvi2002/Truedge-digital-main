"use client";

import { useEffect, useState } from "react";

/** Type, pause, erase, and advance without synchronous effect updates. */
export function useTypingText(lines: readonly string[]) {
  const [state, setState] = useState({ lineIndex: 0, charIndex: 0, deleting: false });
  const currentLine = lines[state.lineIndex] ?? "";

  useEffect(() => {
    if (lines.length === 0) return;
    const delay = state.deleting
      ? (state.charIndex > 0 ? 35 : 0)
      : (state.charIndex === currentLine.length ? 1800 : 65);

    const timer = setTimeout(() => {
      setState((current) => {
        if (!current.deleting && current.charIndex < currentLine.length) {
          return { ...current, charIndex: current.charIndex + 1 };
        }
        if (!current.deleting) return { ...current, deleting: true };
        if (current.charIndex > 0) return { ...current, charIndex: current.charIndex - 1 };
        return { lineIndex: (current.lineIndex + 1) % lines.length, charIndex: 0, deleting: false };
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [currentLine, lines.length, state.charIndex, state.deleting]);

  return currentLine.slice(0, state.charIndex);
}
