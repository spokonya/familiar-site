"use client";

// The full Mac OS 9 desktop scene.
// Spec: MACOS9_REFERENCE.md desktop + ARCHITECTURE.md component-architecture.
// Session 4 renders chrome only — window content is placeholder (Session 5).

import { useEffect, useState } from "react";
import { MenuBar } from "@/components/desktop/MenuBar";
import { Trash } from "@/components/desktop/Trash";
import { Window } from "@/components/desktop/Window";
import { DesktopIcon, type IconVariant } from "@/components/desktop/DesktopIcon";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { AboutWindow } from "@/components/windows/AboutWindow";
import { DemoWindow } from "@/components/windows/DemoWindow";
import { FeaturesWindow } from "@/components/windows/FeaturesWindow";
import { DocsWindow } from "@/components/windows/DocsWindow";
import { copy, type CopyKey } from "@/lib/copy";
import { useWindowManager } from "@/lib/useWindowManager";
import { DESKTOP_ICON_LAYOUT, WINDOW_IDS, WINDOW_TITLES, type WindowId } from "@/lib/windows";

// Each window's content component + whether it scrolls (the demo is a stage).
const WINDOW_CONTENT: Record<WindowId, { Content: React.ComponentType; scrollable: boolean }> = {
  about: { Content: AboutWindow, scrollable: true },
  demo: { Content: DemoWindow, scrollable: false },
  features: { Content: FeaturesWindow, scrollable: true },
  docs: { Content: DocsWindow, scrollable: true },
};

// Desktop launcher icon: art variant + label copy key, per window.
const WINDOW_ICON: Record<WindowId, { variant: IconVariant; label: CopyKey }> = {
  about: { variant: "app", label: "icon-label-about" },
  demo: { variant: "demo", label: "icon-label-demo" },
  features: { variant: "doc", label: "icon-label-features" },
  docs: { variant: "doc", label: "icon-label-docs" },
};

export function Desktop({
  draggable,
  onSwitchToWebsite,
}: {
  draggable: boolean;
  onSwitchToWebsite: () => void;
}) {
  const [ready, setReady] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<WindowId | "hd" | null>(null);
  const openWindow = useWindowManager((s) => s.openWindow);
  const layoutKey = draggable ? "desktop" : "tablet";

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
      // Clicking the empty desktop deselects any selected icon.
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelectedIcon(null);
      }}
      className="fixed inset-0 overflow-hidden"
      style={{
        background: "var(--platinum-desktop-bg)",
        // Quiet classic Platinum desktop pattern: a fine 2px weave over the teal,
        // kept faint (BRAND.md: windows are the focus, no ambient gradients).
        backgroundImage:
          "repeating-conic-gradient(rgba(255,255,255,0.05) 0% 25%, transparent 0% 50%), repeating-conic-gradient(rgba(0,0,0,0.05) 0% 25%, transparent 0% 50%)",
        backgroundSize: "2px 2px, 3px 3px",
      }}
    >
      <MenuBar onSwitchToWebsite={onSwitchToWebsite} />
      <ModeToggle label={copy["mode-toggle-to-website"]} onToggle={onSwitchToWebsite} />

      {/* Desktop launcher icons — open/reopen their window on double-click. */}
      {WINDOW_IDS.map((id) => {
        const { variant, label } = WINDOW_ICON[id];
        const pos = DESKTOP_ICON_LAYOUT[layoutKey][id];
        return (
          <DesktopIcon
            key={id}
            label={copy[label]}
            variant={variant}
            selected={selectedIcon === id}
            onSelect={() => setSelectedIcon(id)}
            onOpen={() => {
              setSelectedIcon(id);
              openWindow(id);
            }}
            style={{ left: pos.x, top: pos.y }}
          />
        );
      })}

      {/* Macintosh HD — pinned top-right, just under the menu bar. */}
      <DesktopIcon
        label={copy["icon-label-hd"]}
        variant="drive"
        selected={selectedIcon === "hd"}
        onSelect={() => setSelectedIcon("hd")}
        onOpen={() => {
          setSelectedIcon("hd");
          openWindow("about");
        }}
        style={{ right: 18, top: 76 }}
      />

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
