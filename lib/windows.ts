// Window data model + default layouts.
// Contract: ARCHITECTURE.md window-data-model.
// Titles come from COPY.md (the listed section-id per window). They are held
// here as constants for Session 4; Session 5 migrates them into lib/copy.ts and
// these reference copy["<section-id>"] instead.

export type WindowId = "about" | "demo" | "features" | "docs";

export type WindowState = {
  id: WindowId;
  title: string;
  position: { x: number; y: number }; // top-left in viewport px
  size: { width: number; height: number };
  isMinimized: boolean; // windowshade collapse (content hidden, title bar only)
  isOpen: boolean; // closed windows are hidden from the desktop, reopenable from the menu
  zIndex: number; // managed by the store, never set by hand
  isCloseable: boolean;
  isResizable: boolean;
};

export const WINDOW_IDS: WindowId[] = ["about", "demo", "features", "docs"];

// Title bar text. Comment marks the COPY.md section-id each one renders.
export const WINDOW_TITLES: Record<WindowId, string> = {
  about: "Familiar", //              COPY.md chrome-app-name
  demo: "Familiar — Live", //        COPY.md demo-window-title
  features: "What Familiar does", // COPY.md features-window-title
  docs: "Documentation", //          COPY.md docs-window-title
};

type Frame = { position: { x: number; y: number }; size: { width: number; height: number } };

// Default layout per breakpoint — the "screenshot the designer intended"
// (ARCHITECTURE.md). `desktop` (≥1024px) is freely positioned and overlapping.
// `tablet` (768–1023px) is a non-draggable vertical stack.
export const DEFAULT_LAYOUTS: Record<"desktop" | "tablet", Record<WindowId, Frame>> = {
  desktop: {
    about: { position: { x: 64, y: 60 }, size: { width: 380, height: 420 } },
    demo: { position: { x: 488, y: 84 }, size: { width: 560, height: 430 } },
    features: { position: { x: 168, y: 224 }, size: { width: 452, height: 470 } },
    docs: { position: { x: 712, y: 360 }, size: { width: 340, height: 300 } },
  },
  tablet: {
    about: { position: { x: 24, y: 44 }, size: { width: 720, height: 300 } },
    demo: { position: { x: 24, y: 360 }, size: { width: 720, height: 360 } },
    features: { position: { x: 24, y: 736 }, size: { width: 720, height: 380 } },
    docs: { position: { x: 24, y: 1132 }, size: { width: 720, height: 260 } },
  },
};

// Capability flags per window (ARCHITECTURE.md window-data-model).
const WINDOW_FLAGS: Record<WindowId, { isCloseable: boolean; isResizable: boolean }> = {
  about: { isCloseable: true, isResizable: true },
  demo: { isCloseable: true, isResizable: true },
  features: { isCloseable: true, isResizable: true },
  docs: { isCloseable: true, isResizable: true },
};

// Mac OS 9 minimum window size (MACOS9_REFERENCE.md minimum-window-sizes).
export const MIN_WINDOW_SIZE = { width: 128, height: 64 } as const;

export function buildDefaultWindows(
  breakpoint: "desktop" | "tablet",
): Record<WindowId, WindowState> {
  const layout = DEFAULT_LAYOUTS[breakpoint];
  const windows = {} as Record<WindowId, WindowState>;
  WINDOW_IDS.forEach((id, i) => {
    windows[id] = {
      id,
      title: WINDOW_TITLES[id],
      position: { ...layout[id].position },
      size: { ...layout[id].size },
      isMinimized: false,
      isOpen: true,
      zIndex: i + 1,
      ...WINDOW_FLAGS[id],
    };
  });
  return windows;
}
