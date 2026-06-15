// Desktop / website mode state (ARCHITECTURE.md state-architecture).
// Priority: URL param > localStorage > default (desktop).
// At <768px, website mode is forced regardless of stored preference.

import { useCallback, useEffect, useState } from "react";
import { useBreakpoint } from "./useBreakpoint";

export type Mode = "desktop" | "website";

const STORAGE_KEY = "familiar-mode";

function readInitial(): Mode {
  if (typeof window === "undefined") return "desktop";
  const param = new URLSearchParams(window.location.search).get("mode");
  if (param === "website" || param === "desktop") return param;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "website" || stored === "desktop") return stored;
  return "desktop";
}

export function useMode() {
  const breakpoint = useBreakpoint();
  const [stored, setStored] = useState<Mode>("desktop");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setStored(readInitial());
    setMounted(true);
  }, []);

  const setMode = useCallback((next: Mode) => {
    setStored(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    const url = new URL(window.location.href);
    if (next === "website") url.searchParams.set("mode", "website");
    else url.searchParams.delete("mode");
    window.history.replaceState(null, "", url.toString());
  }, []);

  const isMobile = breakpoint === "mobile";
  // Forced website on mobile; otherwise the stored/url/default preference.
  const mode: Mode = isMobile ? "website" : stored;

  return { mode, setMode, isMobile, mounted, breakpoint };
}
