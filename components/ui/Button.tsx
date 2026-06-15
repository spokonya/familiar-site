"use client";

// Shared content/website button. Copy is passed as children — never embedded.
// Accent (#378ADD) is the only chromatic color (BRAND.md palette).

import { useState } from "react";

type Variant = "primary" | "secondary";

export function Button({
  children,
  variant = "primary",
  onClick,
  size = "md",
}: {
  children: React.ReactNode;
  variant?: Variant;
  onClick?: () => void;
  size?: "md" | "lg";
}) {
  const [hover, setHover] = useState(false);
  const pad = size === "lg" ? "10px 20px" : "7px 14px";
  const base: React.CSSProperties = {
    padding: pad,
    fontSize: size === "lg" ? 16 : 14,
    fontWeight: 600,
    borderRadius: 6,
    cursor: "pointer",
    transition: "background 140ms cubic-bezier(0.32,0.72,0,1), color 140ms cubic-bezier(0.32,0.72,0,1)",
    lineHeight: 1.2,
  };
  const styles: Record<Variant, React.CSSProperties> =
    {
      primary: {
        ...base,
        background: hover ? "var(--color-accent-hover)" : "var(--color-accent)",
        color: "var(--color-text-on-accent)",
        border: "1px solid transparent",
      },
      secondary: {
        ...base,
        background: hover ? "var(--color-accent-soft)" : "transparent",
        color: "var(--color-accent)",
        border: "1px solid var(--color-accent-border)",
      },
    };
  return (
    <button
      type="button"
      onClick={onClick}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      style={styles[variant]}
    >
      {children}
    </button>
  );
}
