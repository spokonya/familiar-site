"use client";

// Conventional "website mode" layout. Same content as the desktop, linear:
// hero → memory → Agent → Guide → privacy → plans → bottom CTA.
// Copy comes from lib/copy.ts; sections live in components/website/*.
// Spec: ARCHITECTURE.md mental-model (website mode) + responsive-strategy.

import { ModeToggle } from "@/components/ui/ModeToggle";
import { CTASection } from "@/components/website/CTASection";
import { FeaturesSection } from "@/components/website/FeaturesSection";
import { HeroSection } from "@/components/website/HeroSection";
import { copy } from "@/lib/copy";

export function WebsiteLayout({
  onSwitchToDesktop,
  showToggle,
  showMobileBanner = false,
}: {
  onSwitchToDesktop: () => void;
  showToggle: boolean;
  showMobileBanner?: boolean;
}) {
  return (
    <div className="min-h-screen w-full" style={{ background: "var(--color-bg-subtle)" }}>
      {showMobileBanner && (
        <div
          className="w-full px-4 py-2 text-center"
          style={{
            background: "var(--color-accent-soft)",
            color: "var(--color-text-secondary)",
            fontSize: 14,
            borderBottom: "1px solid var(--color-accent-border)",
          }}
        >
          {copy["mode-banner-mobile"]}
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
        <span style={{ fontWeight: 600, fontSize: 18 }}>{copy["chrome-app-name"]}</span>
        {showToggle && (
          <ModeToggle label={copy["mode-toggle-to-desktop"]} onToggle={onSwitchToDesktop} fixed={false} />
        )}
      </header>

      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}
