"use client";

// Demo window content. Copy: COPY.md demo-* sections.
// The scripted autoplay run (ghost cursor + speech bubbles) lives in DemoPlayer
// (Session 6); this window provides the framing intro above it.

import { DemoPlayer } from "@/components/demo/DemoPlayer";
import { copy } from "@/lib/copy";

export function DemoWindow() {
  return (
    <div className="flex h-full flex-col gap-3">
      <p style={{ fontSize: 14, lineHeight: 1.5, color: "var(--color-text-secondary)" }}>
        {copy["demo-window-intro"]}
      </p>
      <DemoPlayer />
    </div>
  );
}
