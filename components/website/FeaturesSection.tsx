"use client";

// Website-mode features — value props in priority order then plans.
// Copy: COPY.md website-mode-{memory,agent,guide,privacy,plans}-*.

import { copy, type CopyKey } from "@/lib/copy";

const BLOCKS: { headline: CopyKey; body: CopyKey }[] = [
  { headline: "website-mode-memory-headline", body: "website-mode-memory-body" },
  { headline: "website-mode-agent-headline", body: "website-mode-agent-body" },
  { headline: "website-mode-guide-headline", body: "website-mode-guide-body" },
  { headline: "website-mode-privacy-headline", body: "website-mode-privacy-body" },
  { headline: "website-mode-plans-headline", body: "website-mode-plans-body" },
];

export function FeaturesSection() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="flex flex-col gap-16">
        {BLOCKS.map((b) => (
          <div key={b.headline} className="max-w-3xl">
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 36px)",
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
                color: "var(--color-text-primary)",
              }}
            >
              {copy[b.headline]}
            </h2>
            <p
              style={{
                marginTop: 12,
                fontSize: 18,
                lineHeight: 1.65,
                color: "var(--color-text-secondary)",
              }}
            >
              {copy[b.body]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
