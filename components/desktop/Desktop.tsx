"use client";

// The full Mac OS 9 desktop scene.
// Spec: MACOS9_REFERENCE.md desktop + ARCHITECTURE.md component-architecture.
// Session 4 renders chrome only — window content is placeholder (Session 5).

import { useEffect, useState } from "react";
import { MenuBar } from "@/components/desktop/MenuBar";
import { Trash } from "@/components/desktop/Trash";
import { Window } from "@/components/desktop/Window";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { AboutWindow } from "@/components/windows/AboutWindow";
import { DemoWindow } from "@/components/windows/DemoWindow";
import { FeaturesWindow } from "@/components/windows/FeaturesWindow";
import { DocsWindow } from "@/components/windows/DocsWindow";
import { copy } from "@/lib/copy";
import { useWindowManager } from "@/lib/useWindowManager";
import { WINDOW_IDS, WINDOW_TITLES, type WindowId } from "@/lib/windows";

// Each window's content component + whether it scrolls (the demo is a stage).
const WINDOW_CONTENT: Record<WindowId, { Content: React.ComponentType; scrollable: boolean }> = {
  about: { Content: AboutWindow, scrollable: true },
  demo: { Content: DemoWindow, scrollable: false },
  features: { Content: FeaturesWindow, scrollable: true },
  docs: { Content: DocsWindow, scrollable: true },
};

export function Desktop({
  draggable,
  onSwitchToWebsite,
}: {
  draggable: boolean;
  onSwitchToWebsite: () => void;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // Rehydrate sessionStorage first, then fall back to the default layout
      // for the current viewport if nothing was persisted this session.
      await useWindowManager.persist.rehydrate();
      const bp = window.innerWidth < 1024 ? "tablet" : "desktop";
      useWindowManager.getState().initLayout(bp);
      if (!cancelled) setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        background: "var(--platinum-desktop-bg)",
        // Subtle 2px dither over the desktop teal (kept faint — windows are the focus).
        backgroundImage:
          "repeating-conic-gradient(rgba(255,255,255,0.04) 0% 25%, transparent 0% 50%)",
        backgroundSize: "2px 2px",
      }}
    >
      <MenuBar />
      <ModeToggle label={copy["mode-toggle-to-website"]} onToggle={onSwitchToWebsite} />

      {ready &&
        WINDOW_IDS.map((id) => {
          const { Content, scrollable } = WINDOW_CONTENT[id];
          return (
            <Window key={id} id={id} title={WINDOW_TITLES[id]} draggable={draggable} scrollable={scrollable}>
              <Content />
            </Window>
          );
        })}

      <Trash />
    </div>
  );
}
