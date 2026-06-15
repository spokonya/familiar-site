"use client";

// Docs window — placeholder at launch (CLAUDE.md: docs are a placeholder).
// Copy: COPY.md docs-placeholder-* sections.

import { copy } from "@/lib/copy";

export function DocsWindow() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-center" style={{ minHeight: 160 }}>
      <h2 style={{ fontSize: 22, fontWeight: 600, color: "var(--color-text-primary)" }}>
        {copy["docs-placeholder-headline"]}
      </h2>
      <p
        style={{
          maxWidth: 320,
          fontSize: 15,
          lineHeight: 1.6,
          color: "var(--color-text-secondary)",
        }}
      >
        {copy["docs-placeholder-body"]}
      </p>
    </div>
  );
}
