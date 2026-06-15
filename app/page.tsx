"use client";

// Homepage root. Renders the Mac OS 9 desktop or the conventional website
// layout based on mode state. No content here (ARCHITECTURE.md component-architecture).

import { Desktop } from "@/components/desktop/Desktop";
import { WebsiteLayout } from "@/components/website/WebsiteLayout";
import { useMode } from "@/lib/useMode";

export default function Home() {
  const { mode, setMode, isMobile, mounted, breakpoint } = useMode();

  // Avoid a hydration flash: render nothing until the client has resolved
  // breakpoint + stored mode.
  if (!mounted) {
    return <div style={{ minHeight: "100vh", background: "var(--platinum-desktop-bg)" }} />;
  }

  if (mode === "website") {
    return (
      <WebsiteLayout
        onSwitchToDesktop={() => setMode("desktop")}
        showToggle={!isMobile}
        showMobileBanner={isMobile}
      />
    );
  }

  return (
    <Desktop
      draggable={breakpoint === "desktop"}
      onSwitchToWebsite={() => setMode("website")}
    />
  );
}
