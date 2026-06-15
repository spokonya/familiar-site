"use client";

// Website-mode bottom CTA. Copy: COPY.md website-mode-footer-cta-*.

import { Button } from "@/components/ui/Button";
import { copy } from "@/lib/copy";

export function CTASection() {
  return (
    <section
      className="w-full"
      style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-bg)" }}
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-20">
        <h2
          style={{
            fontSize: "clamp(32px, 4.5vw, 48px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--color-text-primary)",
            maxWidth: 640,
          }}
        >
          {copy["website-mode-footer-cta-headline"]}
        </h2>
        <div className="mt-8">
          <Button size="lg">{copy["website-mode-footer-cta-button"]}</Button>
        </div>
      </div>
    </section>
  );
}
