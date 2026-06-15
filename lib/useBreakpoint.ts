// Viewport breakpoint hook (ARCHITECTURE.md responsive-strategy).
//   ≥1024px      → "desktop"  (windows freely draggable + overlapping)
//   768–1023px   → "tablet"   (Mac OS 9 chrome, stacked, dragging disabled)
//   <768px       → "mobile"   (desktop metaphor unavailable; website mode forced)

import { useEffect, useState } from "react";

export type Breakpoint = "desktop" | "tablet" | "mobile";

function read(): Breakpoint {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

export function useBreakpoint(): Breakpoint {
  // Start undefined-safe: desktop on server, corrected on mount.
  const [bp, setBp] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const update = () => setBp(read());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return bp;
}
