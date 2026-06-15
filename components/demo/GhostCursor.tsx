"use client";

// The ghost cursor — Familiar's visual identity.
// Spec: BRAND.md the-ghost-cursor (#378ADD arrow, glow, 0.85 opacity).
// Purely presentational: renders the arrow at a stage-relative point via
// transform: translate() only (no top/left). The bezier flight is computed by
// DemoPlayer, which feeds this component a new point each frame.

import type { Point } from "./DemoScript";

export function GhostCursor({ at, visible }: { at: Point; visible: boolean }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        transform: `translate(${at.x}px, ${at.y}px)`,
        opacity: visible ? 0.85 : 0,
        transition: "opacity 200ms cubic-bezier(0.32,0.72,0,1)",
        pointerEvents: "none",
        willChange: "transform",
      }}
    >
      {/* Arrow tip sits at the translated point (path origin = 0,0). */}
      <svg
        width="18"
        height="26"
        viewBox="0 0 18 26"
        style={{ filter: "drop-shadow(0 0 8px rgba(55,138,221,0.6))" }}
      >
        <path
          d="M1 1 L1 19 L6 14.5 L9.5 22.5 L12.5 21 L9 13.5 L15.5 13 Z"
          fill="#378ADD"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
