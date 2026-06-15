"use client";

// Mac OS 9 Trash — bottom-right, fixed, below all windows, decorative at launch.
// Spec: MACOS9_REFERENCE.md trash.

import { useState } from "react";
import { copy } from "@/lib/copy";
import { TRASH_BANDS_PATH, TRASH_CAN_PATH, TRASH_RIBS_PATH } from "@/lib/icons";
import { ariaLabels, CHROME_FONT_VAR } from "@/lib/uiLabels";

export function Trash() {
  const [hover, setHover] = useState(false);
  return (
    <div
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="fixed flex flex-col items-center select-none"
      style={{
        right: 24,
        bottom: 24,
        zIndex: 1,
        width: 48,
        cursor: "default",
        transform: hover ? "scale(1.05)" : "scale(1)",
        transition: "transform 120ms cubic-bezier(0.32,0.72,0,1)",
      }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" role="img" aria-label={ariaLabels.trashIcon}>
        {/* lid */}
        <rect x="7" y="5" width="18" height="3" rx="1" fill="#C8C8C8" stroke="#5A5A5A" strokeWidth="1" />
        <rect x="13" y="3" width="6" height="2" rx="1" fill="#C8C8C8" stroke="#5A5A5A" strokeWidth="1" />
        {/* can body — wire-mesh wastebasket */}
        <path d={TRASH_CAN_PATH} fill="#D8D8D8" stroke="#5A5A5A" strokeWidth="1" />
        <path d={TRASH_RIBS_PATH} stroke="#9A9A9A" strokeWidth="1" />
        <path d={TRASH_BANDS_PATH} stroke="#9A9A9A" strokeWidth="1" />
      </svg>
      <span
        style={{
          marginTop: 2,
          fontFamily: CHROME_FONT_VAR,
          fontSize: 11,
          color: "#FFFFFF",
          textShadow: "0 1px 1px rgba(0,0,0,0.4)",
        }}
      >
        {copy["chrome-trash-label"]}
      </span>
    </div>
  );
}
