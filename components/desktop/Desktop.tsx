"use client";

// The full Mac OS 9 desktop scene.
// Spec: MACOS9_REFERENCE.md desktop + ARCHITECTURE.md component-architecture.
// Session 4 renders chrome only — window content is placeholder (Session 5).

import { useEffect, useState } from "react";
import { MenuBar } from "@/components/desktop/MenuBar";
import { Trash } from "@/components/desktop/Trash";
import { Window } from "@/components/desktop/Window";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { useWindowManager } from "@/lib/useWindowManager";
import { WINDOW_IDS, WINDOW_TITLES } from "@/lib/windows";

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
      <ModeToggle label="Switch to website mode" onToggle={onSwitchToWebsite} />

      {ready &&
        WINDOW_IDS.map((id) => (
          <Window key={id} id={id} title={WINDOW_TITLES[id]} draggable={draggable}>
            <PlaceholderContent />
          </Window>
        ))}

      <Trash />
    </div>
  );
}

// Visual-only placeholder skeleton — NOT copy. Real content arrives in Session 5
// from lib/copy.ts. Tall enough to exercise the scrollbar in smaller windows.
function PlaceholderContent() {
  const widths = ["92%", "78%", "85%", "60%", "88%", "70%", "95%", "66%", "82%", "74%", "90%", "58%"];
  return (
    <div className="flex flex-col gap-3" aria-hidden>
      <div style={{ height: 22, width: "55%", background: "var(--color-border)", borderRadius: 2 }} />
      <div style={{ height: 12 }} />
      {widths.map((w, i) => (
        <div
          key={i}
          style={{ height: 12, width: w, background: "var(--color-border-subtle)", borderRadius: 2 }}
        />
      ))}
    </div>
  );
}
