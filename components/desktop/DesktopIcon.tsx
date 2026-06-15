"use client";

// A Mac OS 9 desktop icon.
// Spec: MACOS9_REFERENCE.md desktop-icons (32×32 art, 48px hit zone, 11px white
// label, blue selected state) + BRAND.md icon-style (subtle bottom-right cast
// shadow; the Familiar app icon uses the ghost-cursor blue).
// Single-click selects; double-click or Enter/Space activates (onOpen).

import { CHROME_FONT_VAR } from "@/lib/uiLabels";

export type IconVariant = "app" | "doc" | "demo" | "drive";

export function DesktopIcon({
  label,
  variant,
  selected,
  onSelect,
  onOpen,
  style,
}: {
  label: string;
  variant: IconVariant;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
  style: React.CSSProperties;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className="absolute flex select-none flex-col items-center"
      style={{ width: 64, cursor: "default", outline: "none", ...style }}
    >
      <div style={{ position: "relative", width: 32, height: 32 }}>
        <IconArt variant={variant} />
        {selected && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(55,138,221,0.45)",
              mixBlendMode: "multiply",
            }}
          />
        )}
      </div>
      <span
        style={{
          marginTop: 3,
          maxWidth: 88,
          padding: "0 3px",
          fontFamily: CHROME_FONT_VAR,
          fontSize: 11,
          lineHeight: 1.3,
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "#FFFFFF",
          background: selected ? "var(--platinum-highlight)" : "transparent",
          textShadow: selected ? "none" : "0 1px 1px rgba(0,0,0,0.45)",
          borderRadius: 2,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function IconArt({ variant }: { variant: IconVariant }) {
  const shadow = { filter: "drop-shadow(1px 1px 0 rgba(0,0,0,0.28))" } as const;
  switch (variant) {
    case "app":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden style={shadow}>
          <rect x="4" y="4" width="24" height="24" rx="5" fill="#378ADD" />
          <rect x="4" y="4" width="24" height="24" rx="5" fill="none" stroke="#1D4E87" />
          {/* ghost-cursor arrow */}
          <polygon points="12,9 12,23 16,19 19,25 21.5,24 18.5,18 24,17.5"
            fill="#FFFFFF" stroke="#1D4E87" strokeWidth="0.5" strokeLinejoin="round" />
        </svg>
      );
    case "doc":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden style={shadow}>
          <polygon points="7,3 21,3 26,8 26,29 7,29" fill="#FFFFFF" stroke="#6A6A6E" />
          <polygon points="21,3 21,8 26,8" fill="#DDE0E3" stroke="#6A6A6E" />
          <rect x="10" y="13" width="13" height="1.5" fill="#B8B8BC" />
          <rect x="10" y="17" width="13" height="1.5" fill="#B8B8BC" />
          <rect x="10" y="21" width="9" height="1.5" fill="#B8B8BC" />
        </svg>
      );
    case "demo":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden style={shadow}>
          <rect x="3" y="5" width="26" height="18" rx="2" fill="#EAF0F6" stroke="#6A6A6E" />
          <rect x="13" y="23" width="6" height="3" fill="#C8CDD3" />
          <rect x="9" y="26" width="14" height="2" rx="1" fill="#9A9A9E" />
          <polygon points="13,10 13,18 20,14" fill="#378ADD" />
        </svg>
      );
    case "drive":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden style={shadow}>
          <rect x="3" y="9" width="26" height="15" rx="2" fill="#D8D8D8" stroke="#6A6A6E" />
          <rect x="4" y="10" width="24" height="2" fill="#FFFFFF" opacity="0.8" />
          <rect x="7" y="18" width="12" height="2.5" rx="1" fill="#9A9A9E" />
          <circle cx="24" cy="19" r="1.6" fill="#378ADD" />
        </svg>
      );
  }
}
