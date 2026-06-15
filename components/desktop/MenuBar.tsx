"use client";

// Mac OS 9 menu bar — flush to the top, flat #DDDDDD, 22px.
// Spec: MACOS9_REFERENCE.md menu-bar. Menus are decorative at launch
// (per the reference doc); only hover states are wired.

import { useEffect, useState } from "react";
import { copy } from "@/lib/copy";
import { APPLE_LOGO_PATH } from "@/lib/icons";
import { ariaLabels, CHROME_FONT_VAR } from "@/lib/uiLabels";

export function MenuBar() {
  return (
    <div
      className="fixed top-0 right-0 left-0 flex items-center"
      style={{
        height: 22,
        zIndex: 10000,
        background: "#DDDDDD",
        borderBottom: "1px solid var(--platinum-border-outer)",
        fontFamily: CHROME_FONT_VAR,
        fontSize: 12,
      }}
    >
      <AppleMenu />
      <MenuItem label={copy["chrome-app-name"]} bold />
      <MenuItem label={copy["menu-file-label"]} />
      <MenuItem label={copy["menu-help-label"]} />
      <div className="flex-1" />
      <Clock />
    </div>
  );
}

function MenuItem({ label, bold }: { label: string; bold?: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="flex h-full items-center"
      style={{
        paddingInline: 8,
        fontWeight: bold ? 700 : 400,
        background: hover ? "var(--platinum-highlight)" : "transparent",
        color: hover ? "#FFFFFF" : "var(--platinum-text)",
        cursor: "default",
      }}
    >
      {label}
    </button>
  );
}

function AppleMenu() {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      aria-label={ariaLabels.appleMenu}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="flex h-full items-center"
      style={{
        paddingInline: 10,
        background: hover ? "var(--platinum-highlight)" : "transparent",
        cursor: "default",
      }}
    >
      <RainbowApple />
    </button>
  );
}

// The 6-color rainbow Apple logo (MACOS9_REFERENCE.md menu-bar — historically
// correct for Mac OS 9). Drawn as horizontal rainbow bands clipped to the mark.
function RainbowApple() {
  const id = "apple-clip";
  return (
    <svg width="13" height="15" viewBox="0 0 26 30" aria-hidden role="img">
      <defs>
        <clipPath id={id}>
          <path d={APPLE_LOGO_PATH} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect x="0" y="0" width="26" height="5" fill="#5EBD46" />
        <rect x="0" y="5" width="26" height="5" fill="#F9D616" />
        <rect x="0" y="10" width="26" height="5" fill="#F08C00" />
        <rect x="0" y="15" width="26" height="5" fill="#CD202A" />
        <rect x="0" y="20" width="26" height="5" fill="#6E2C8B" />
        <rect x="0" y="25" width="26" height="5" fill="#1B9CD8" />
      </g>
    </svg>
  );
}

function Clock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const tick = () =>
      setNow(
        new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      );
    tick();
    const t = setInterval(tick, 1000 * 30);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ paddingInline: 12, color: "var(--platinum-text)" }} suppressHydrationWarning>
      {now ?? ""}
    </span>
  );
}
