"use client";

// Mac OS 9 Platinum dialog box.
// Spec: MACOS9_REFERENCE.md dialog-boxes + default-button (pulsing dark ring).
// Centered modal: Escape cancels, Return triggers the default button, focus is
// trapped while open. Single-button (informational) use is the common case here.

import { useEffect, useRef } from "react";
import { CHROME_FONT_VAR } from "@/lib/uiLabels";

export function DialogBox({
  title,
  children,
  defaultLabel,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  defaultLabel: string;
  onClose: () => void;
}) {
  const defaultBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    defaultBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  return (
    <div
      // Backdrop — click-away cancels. Above all windows and the menu bar.
      onPointerDown={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 20000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.08)",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onPointerDown={(e) => e.stopPropagation()}
        style={{
          width: 360,
          maxWidth: "90vw",
          background: "#EEEEEE",
          border: "1px solid var(--platinum-border-outer)",
          boxShadow:
            "inset 1px 1px 0 var(--platinum-border-inner), inset -1px -1px 0 var(--platinum-border-inner-shadow), 2px 2px 0 rgba(0,0,0,0.35)",
          fontFamily: CHROME_FONT_VAR,
          padding: 18,
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--platinum-text)", marginBottom: 10 }}>
          {title}
        </div>
        <div style={{ fontSize: 12, lineHeight: 1.5, color: "var(--platinum-text)" }}>{children}</div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18 }}>
          <DefaultButton ref={defaultBtnRef} onClick={onClose}>
            {defaultLabel}
          </DefaultButton>
        </div>
      </div>
    </div>
  );
}

const DefaultButton = ({
  ref,
  children,
  onClick,
}: {
  ref: React.Ref<HTMLButtonElement>;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    ref={ref}
    type="button"
    onClick={onClick}
    style={{
      height: 20,
      padding: "0 14px",
      fontFamily: CHROME_FONT_VAR,
      fontSize: 11,
      color: "var(--platinum-text)",
      background: "#CCCCCC",
      border: "1px solid var(--platinum-border-outer)",
      borderRadius: 4,
      boxShadow: "inset 1px 1px 0 var(--platinum-border-inner)",
      // The pulsing default-button ring.
      outline: "2px solid #1A1A1A",
      outlineOffset: 1,
      animation: "platinum-default-pulse 0.56s ease-in-out infinite",
      cursor: "default",
    }}
  >
    {children}
  </button>
);
