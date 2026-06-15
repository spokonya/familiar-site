"use client";

// Desktop/website mode toggle button.
// Presentational — mode state lives in lib/useMode.ts, lifted to app/page.tsx.
// Copy: COPY.md mode-toggle-to-website / mode-toggle-to-desktop.

import { CHROME_FONT_VAR } from "@/lib/uiLabels";

export function ModeToggle({
  label,
  onToggle,
  fixed = true,
}: {
  label: string;
  onToggle: () => void;
  fixed?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={fixed ? "fixed" : ""}
      style={
        fixed
          ? { top: 34, right: 24, zIndex: 9000, ...buttonStyle }
          : buttonStyle
      }
    >
      {label}
    </button>
  );
}

const buttonStyle: React.CSSProperties = {
  fontFamily: CHROME_FONT_VAR,
  fontSize: 12,
  fontWeight: 700,
  padding: "4px 12px",
  color: "var(--platinum-text)",
  background: "var(--platinum-mid)",
  border: "1px solid var(--platinum-border-outer)",
  borderRadius: 2,
  boxShadow:
    "inset 1px 1px 0 var(--platinum-border-inner), inset -1px -1px 0 var(--platinum-border-inner-shadow)",
  cursor: "default",
};
