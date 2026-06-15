"use client";

// The ghost cursor's speech bubble.
// Spec: ARCHITECTURE.md demo (char-by-char streaming, scale-bounce entrance).
// Streaming is driven by DemoPlayer (it passes the already-revealed substring);
// this component owns only the entrance animation and positioning.

import { useEffect, useState } from "react";
import type { Point } from "./DemoScript";
import { STAGE_W } from "./DemoScript";

export function SpeechBubble({ text, anchor }: { text: string; anchor: Point }) {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(r);
  }, []);

  // Flip the bubble to the left of the cursor if it's near the right edge.
  const flipLeft = anchor.x > STAGE_W * 0.6;
  const left = flipLeft ? anchor.x - 12 : anchor.x + 16;

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: anchor.y + 18,
        left,
        transform: `translateX(${flipLeft ? "-100%" : "0"}) scale(${entered ? 1 : 0.85})`,
        transformOrigin: flipLeft ? "right top" : "left top",
        opacity: entered ? 1 : 0,
        transition: "transform 220ms cubic-bezier(0.32,0.72,0,1), opacity 180ms ease",
        maxWidth: 240,
        padding: "7px 11px",
        background: "var(--color-accent)",
        color: "var(--color-text-on-accent)",
        fontSize: 13,
        lineHeight: 1.4,
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(55,138,221,0.35)",
        pointerEvents: "none",
        whiteSpace: "normal",
      }}
    >
      {text}
    </div>
  );
}
