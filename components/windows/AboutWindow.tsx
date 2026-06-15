"use client";

// Hero / about window content. Copy: COPY.md about-window sections.
// The primary CTA brings the demo window to front (the scripted run lands in
// Session 6). The secondary CTA has no destination yet (no download at launch).

import { Button } from "@/components/ui/Button";
import { copy } from "@/lib/copy";
import { useWindowManager } from "@/lib/useWindowManager";

export function AboutWindow() {
  const openWindow = useWindowManager((s) => s.openWindow);
  return (
    <div className="flex flex-col gap-4">
      <h1
        style={{
          fontSize: 30,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "var(--color-text-primary)",
        }}
      >
        {copy["hero-headline"]}
      </h1>

      <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--color-text-secondary)" }}>
        {copy["hero-subhead"]}
      </p>

      <div className="mt-1 flex flex-wrap items-center gap-3">
        <Button onClick={() => openWindow("demo")}>{copy["hero-cta-primary"]}</Button>
        <Button variant="secondary">{copy["hero-cta-secondary"]}</Button>
      </div>

      <p style={{ fontSize: 12, lineHeight: 1.45, color: "var(--color-text-muted)" }}>
        {copy["hero-trust-line"]}
      </p>
    </div>
  );
}
