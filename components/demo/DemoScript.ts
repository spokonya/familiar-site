// Scripted Familiar demo — data, not React.
// Contract: ARCHITECTURE.md demo-system-architecture (DemoStep union).
//
// Two adaptations from the ARCHITECTURE sketch, both recorded in DECISIONS.md:
//  • `bubble-show` carries `copyKey` (a COPY.md section-id) instead of raw text,
//    so all on-screen Familiar copy references lib/copy.ts.
//  • `screen-change` carries a `screen` id (a CSS-drawn mock screen in
//    DemoStage) instead of a `screenshot` path — no raster assets exist.
//
// All coordinates are relative to the demo STAGE (STAGE_W × STAGE_H), not the
// viewport. The ghost cursor renders inside the stage, so the demo stays correct
// no matter where the window is dragged (window-relative by construction).

import type { CopyKey } from "@/lib/copy";

export const STAGE_W = 480;
export const STAGE_H = 288;

export type Point = { x: number; y: number };
export type ScreenId = "blank" | "form" | "results" | "checkout";
export type FieldId = "address" | "to" | "depart";

export type DemoStep =
  | { type: "wait"; ms: number }
  | { type: "screen-change"; screen: ScreenId }
  | { type: "ghost-show"; at: Point }
  | { type: "ghost-hide" }
  | { type: "ghost-fly"; to: Point; duration: number }
  | { type: "bubble-show"; copyKey: CopyKey; streamMs: number }
  | { type: "bubble-hide" }
  | { type: "type-text"; target: FieldId; text: string }
  | { type: "click-ripple"; at: Point };

// Element coordinates on the stage — these match the elements DemoStage draws.
const ADDRESS_BAR: Point = { x: 240, y: 18 };
const FIELD_TO: Point = { x: 134, y: 92 };
const FIELD_DEPART: Point = { x: 346, y: 92 };
const SEARCH_BTN: Point = { x: 240, y: 150 };
const SELECT_BTN: Point = { x: 388, y: 116 };
const PAY_BTN: Point = { x: 240, y: 224 };
const GHOST_START: Point = { x: 240, y: 250 };

// Agent mode: book a flight to Portland in Safari (reuses mode-agent-example).
export const DEMO_SCRIPT: DemoStep[] = [
  { type: "screen-change", screen: "blank" },
  { type: "ghost-show", at: GHOST_START },
  { type: "wait", ms: 350 },

  // The task.
  { type: "bubble-show", copyKey: "demo-step-command", streamMs: 26 },
  { type: "wait", ms: 1500 },
  { type: "bubble-hide" },

  // Navigate to the airline site.
  { type: "ghost-fly", to: ADDRESS_BAR, duration: 700 },
  { type: "click-ripple", at: ADDRESS_BAR },
  { type: "bubble-show", copyKey: "demo-step-open", streamMs: 22 },
  { type: "type-text", target: "address", text: "flyexample.com" },
  { type: "wait", ms: 450 },
  { type: "screen-change", screen: "form" },
  { type: "bubble-hide" },

  // Fill the form.
  { type: "ghost-fly", to: FIELD_TO, duration: 650 },
  { type: "click-ripple", at: FIELD_TO },
  { type: "bubble-show", copyKey: "demo-step-fill", streamMs: 22 },
  { type: "type-text", target: "to", text: "Portland" },
  { type: "ghost-fly", to: FIELD_DEPART, duration: 600 },
  { type: "click-ripple", at: FIELD_DEPART },
  { type: "type-text", target: "depart", text: "Fri" },
  { type: "wait", ms: 450 },
  { type: "bubble-hide" },

  // Search.
  { type: "ghost-fly", to: SEARCH_BTN, duration: 600 },
  { type: "click-ripple", at: SEARCH_BTN },
  { type: "bubble-show", copyKey: "demo-step-search", streamMs: 22 },
  { type: "wait", ms: 650 },
  { type: "screen-change", screen: "results" },
  { type: "bubble-hide" },

  // Pick a flight.
  { type: "ghost-fly", to: SELECT_BTN, duration: 700 },
  { type: "click-ripple", at: SELECT_BTN },
  { type: "wait", ms: 400 },
  { type: "screen-change", screen: "checkout" },

  // Stop before payment (the irreversible action).
  { type: "ghost-fly", to: PAY_BTN, duration: 700 },
  { type: "bubble-show", copyKey: "demo-step-approve", streamMs: 28 },
  { type: "wait", ms: 2000 },
];
