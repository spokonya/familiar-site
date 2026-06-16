// Accessibility labels (aria-label text). These are NOT marketing copy and have
// no COPY.md section-id — they live here so components carry no hard-coded
// strings and lib/copy.ts stays a 1:1 mirror of COPY.md.

export const ariaLabels = {
  close: "Close",
  collapse: "Collapse",
  zoom: "Zoom",
  scrollUp: "Scroll up",
  scrollDown: "Scroll down",
  appleMenu: "Apple menu",
  trashIcon: "Trash",
  familiarStatus: "Familiar status",
} as const;

// Generic dialog button text — standard UI chrome, not marketing copy.
export const buttonLabels = {
  ok: "OK",
} as const;

// Chrome font stack lives in CSS as --font-chrome (app/globals.css).
export const CHROME_FONT_VAR = "var(--font-chrome)";
