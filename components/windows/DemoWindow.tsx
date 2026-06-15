"use client";

// Demo window content. Copy: COPY.md demo-* sections.
// The scripted autoplay run (ghost cursor + speech bubbles) is built in
// Session 6 and mounts into the "stage" area below; for now the stage is a
// placeholder. Layout/framing copy is final.

import { Button } from "@/components/ui/Button";
import { copy } from "@/lib/copy";

export function DemoWindow() {
  return (
    <div className="flex h-full flex-col gap-3">
      <p style={{ fontSize: 14, lineHeight: 1.5, color: "var(--color-text-secondary)" }}>
        {copy["demo-window-intro"]}
      </p>

      {/* Stage — Session 6 mounts the DemoPlayer here. */}
      <div
        className="flex flex-1 items-center justify-center"
        style={{
          minHeight: 200,
          background: "var(--color-bg-subtle)",
          border: "1px solid var(--color-border)",
          borderRadius: 4,
        }}
        aria-hidden
      />

      <div className="flex items-center justify-between gap-3">
        <span style={{ fontSize: 12, lineHeight: 1.45, color: "var(--color-text-muted)" }}>
          {copy["demo-caption-agent"]}
        </span>
        <div className="shrink-0">
          <Button variant="secondary">{copy["demo-replay-label"]}</Button>
        </div>
      </div>
    </div>
  );
}
