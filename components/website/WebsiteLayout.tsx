"use client";

// Conventional "website mode" layout — empty shell for Session 4.
// Content sections are populated in Session 5 from lib/copy.ts (website-mode-*).
// Spec: ARCHITECTURE.md mental-model (website mode) + responsive-strategy.

import { ModeToggle } from "@/components/ui/ModeToggle";

export function WebsiteLayout({
  onSwitchToDesktop,
  showToggle,
  mobileBanner,
}: {
  onSwitchToDesktop: () => void;
  showToggle: boolean;
  mobileBanner?: string;
}) {
  return (
    <div className="min-h-screen w-full" style={{ background: "var(--color-bg-subtle)" }}>
      {mobileBanner && (
        <div
          className="w-full px-4 py-2 text-center"
          style={{
            background: "var(--color-accent-soft)",
            color: "var(--color-text-secondary)",
            fontSize: 14,
            borderBottom: "1px solid var(--color-accent-border)",
          }}
        >
          {mobileBanner}
        </div>
      )}

      {/* Full-width nav (no float — BRAND.md layout do-not). */}
      <header
        className="flex w-full items-center justify-between px-6"
        style={{
          height: 56,
          borderBottom: "1px solid var(--color-border)",
          background: "var(--color-bg)",
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 18 }}>Familiar</span>
        {showToggle && (
          <ModeToggle label="Back to the desktop" onToggle={onSwitchToDesktop} fixed={false} />
        )}
      </header>

      {/* Empty content shell — populated in Session 5. */}
      <main className="mx-auto w-full max-w-5xl px-6 py-16" />
    </div>
  );
}
