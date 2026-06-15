"use client";

// Website-mode hero. Left-aligned (BRAND.md: no centered hero). Flat type, no
// gradient. Copy: COPY.md website-mode-hero-* + website-mode-cta*.

import { Button } from "@/components/ui/Button";
import { copy } from "@/lib/copy";

export function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 pt-20 pb-16">
      <h1
        style={{
          fontSize: "clamp(40px, 6vw, 64px)",
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          color: "var(--color-text-primary)",
          maxWidth: 760,
        }}
      >
        {copy["website-mode-hero-headline"]}
      </h1>
      <p
        style={{
          marginTop: 20,
          maxWidth: 620,
          fontSize: 18,
          lineHeight: 1.65,
          color: "var(--color-text-secondary)",
        }}
      >
        {copy["website-mode-hero-subhead"]}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button size="lg">{copy["website-mode-cta"]}</Button>
        <Button size="lg" variant="secondary">
          {copy["website-mode-cta-secondary"]}
        </Button>
      </div>
    </section>
  );
}
