"use client";

// Mac OS 9 menu bar — flush to the top, flat #DDDDDD, 22px.
// Spec: MACOS9_REFERENCE.md menu-bar. Menus are decorative at launch
// (per the reference doc); only hover states are wired.

import { useEffect, useState } from "react";

const CHROME_FONT =
  '"Chicago", "Charcoal", ui-sans-serif, -apple-system, system-ui, sans-serif';

export function MenuBar() {
  return (
    <div
      className="fixed top-0 right-0 left-0 flex items-center"
      style={{
        height: 22,
        zIndex: 10000,
        background: "#DDDDDD",
        borderBottom: "1px solid var(--platinum-border-outer)",
        fontFamily: CHROME_FONT,
        fontSize: 12,
      }}
    >
      <AppleMenu />
      <MenuItem label="Familiar" bold /> {/* COPY.md chrome-app-name */}
      <MenuItem label="File" /> {/* COPY.md menu-file-label */}
      <MenuItem label="Edit" />
      <MenuItem label="Help" /> {/* COPY.md menu-help-label */}
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
      aria-label="Apple menu"
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
          <path d="M21.6 16.1c0-3.3 2.7-4.9 2.8-5-1.5-2.2-3.9-2.5-4.7-2.6-2-.2-3.9 1.2-4.9 1.2s-2.6-1.2-4.2-1.1c-2.2 0-4.2 1.3-5.3 3.2-2.3 4-.6 9.9 1.6 13.1 1.1 1.6 2.4 3.3 4 3.3 1.6-.1 2.2-1 4.1-1s2.5 1 4.2 1c1.7 0 2.8-1.6 3.9-3.2.8-1.2 1.4-2.4 1.8-3.7-3.6-1.4-3.1-5.4-3.1-5.5zM17.8 5.4c.9-1 1.5-2.5 1.3-3.9-1.3.1-2.8.9-3.7 1.9-.8.9-1.5 2.4-1.3 3.8 1.4.1 2.9-.7 3.7-1.8z" />
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
