"use client";

// Scripted demo player — a requestAnimationFrame state machine (no timers in
// React, no useEffect chains driving the sequence).
// Spec: ARCHITECTURE.md demo-system-architecture.
//
// States: idle → playing → paused → complete.
// Autoplays when the demo window is open and visible; pauses when the window is
// minimized, the tab is hidden, or the stage scrolls out of view; resumes on
// return. The Replay button restarts from the top.
//
// No fetch, no API, no streaming — the sequence is local data (DemoScript.ts).

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { copy } from "@/lib/copy";
import { useWindowManager } from "@/lib/useWindowManager";
import { DemoStage } from "./DemoStage";
import { GhostCursor } from "./GhostCursor";
import { SpeechBubble } from "./SpeechBubble";
import {
  DEMO_SCRIPT,
  STAGE_H,
  STAGE_W,
  type FieldId,
  type Point,
  type ScreenId,
} from "./DemoScript";

const TYPE_MS_PER_CHAR = 55;
const INSTANT = new Set(["screen-change", "ghost-show", "ghost-hide", "bubble-hide", "click-ripple"]);

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const bezier = (p0: Point, c: Point, p1: Point, t: number): Point => {
  const u = 1 - t;
  return {
    x: u * u * p0.x + 2 * u * t * c.x + t * t * p1.x,
    y: u * u * p0.y + 2 * u * t * c.y + t * t * p1.y,
  };
};

// Arc control point: perpendicular to the path, bowed toward the top.
const controlPoint = (from: Point, to: Point): Point => {
  const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy) || 1;
  let px = -dy / dist;
  let py = dx / dist;
  if (py > 0) {
    px = -px;
    py = -py;
  } // bow upward
  const mag = Math.min(80, dist * 0.25);
  return { x: mid.x + px * mag, y: mid.y + py * mag };
};

const START: Point = { x: 240, y: 250 };
const emptyTyped = (): Record<FieldId, string> => ({ address: "", to: "", depart: "" });

export function DemoPlayer() {
  const isMinimized = useWindowManager((s) => s.windows.demo?.isMinimized ?? false);

  // ── render-driving state ──────────────────────────────────────────────────
  const [ghostAt, setGhostAt] = useState<Point>(START);
  const [ghostVisible, setGhostVisible] = useState(false);
  const [bubble, setBubble] = useState<{ text: string; anchor: Point } | null>(null);
  const [screen, setScreen] = useState<ScreenId>("blank");
  const [typed, setTyped] = useState<Record<FieldId, string>>(emptyTyped);
  const [ripple, setRipple] = useState<{ at: Point; id: number } | null>(null);
  const [complete, setComplete] = useState(false);

  // ── gates ─────────────────────────────────────────────────────────────────
  const [wantPlay, setWantPlay] = useState(false);
  const [docHidden, setDocHidden] = useState(false);
  const [inView, setInView] = useState(true);
  const stageWrapRef = useRef<HTMLDivElement>(null);

  // ── engine refs (mutated outside React) ─────────────────────────────────────
  const idxRef = useRef(0);
  const elapsedRef = useRef(0);
  const lastNowRef = useRef<number | null>(null);
  const ghostPosRef = useRef<Point>(START);
  const flightRef = useRef<{ from: Point; c: Point; to: Point; dur: number } | null>(null);
  const bubbleFullRef = useRef("");
  const bubbleAnchorRef = useRef<Point>(START);
  const typedRef = useRef<Record<FieldId, string>>(emptyTyped());
  const rippleIdRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const run = wantPlay && !isMinimized && !docHidden && inView && !complete;

  // Start autoplay shortly after mount (feels intentional, well under 1s).
  useEffect(() => {
    const t = setTimeout(() => setWantPlay(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Pause when the tab is hidden.
  useEffect(() => {
    const onVis = () => setDocHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Pause when the stage scrolls out of view (e.g. window dragged off-screen).
  useEffect(() => {
    const el = stageWrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reset = () => {
    idxRef.current = 0;
    elapsedRef.current = 0;
    lastNowRef.current = null;
    ghostPosRef.current = START;
    flightRef.current = null;
    typedRef.current = emptyTyped();
    setGhostAt(START);
    setGhostVisible(false);
    setBubble(null);
    setScreen("blank");
    setTyped(emptyTyped());
    setRipple(null);
    setComplete(false);
  };

  const replay = () => {
    reset();
    setWantPlay(true);
  };

  // Initialize a timed step when first entered.
  const enterStep = () => {
    const step = DEMO_SCRIPT[idxRef.current];
    if (!step) return;
    if (step.type === "ghost-fly") {
      flightRef.current = {
        from: ghostPosRef.current,
        c: controlPoint(ghostPosRef.current, step.to),
        to: step.to,
        dur: step.duration,
      };
    } else if (step.type === "bubble-show") {
      bubbleFullRef.current = copy[step.copyKey];
      bubbleAnchorRef.current = { ...ghostPosRef.current };
      setBubble({ text: "", anchor: bubbleAnchorRef.current });
    } else if (step.type === "type-text") {
      typedRef.current = { ...typedRef.current, [step.target]: "" };
      setTyped({ ...typedRef.current });
    }
  };

  const advance = () => {
    idxRef.current += 1;
    elapsedRef.current = 0;
    if (idxRef.current >= DEMO_SCRIPT.length) {
      setComplete(true);
      return false;
    }
    enterStep();
    return true;
  };

  // The rAF loop. Re-created whenever `run` flips.
  useEffect(() => {
    if (!run) {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastNowRef.current = null; // re-seed delta on resume → no time jump
      return;
    }

    // If we're at the very first step and haven't entered it, initialize.
    if (idxRef.current === 0 && elapsedRef.current === 0) enterStep();

    const frame = (now: number) => {
      if (lastNowRef.current == null) lastNowRef.current = now;
      const dt = now - lastNowRef.current;
      lastNowRef.current = now;
      elapsedRef.current += dt;

      // Process instantaneous steps back-to-back; stop on a timed step or end.
      let guard = 0;
      while (guard++ < DEMO_SCRIPT.length + 1) {
        const step = DEMO_SCRIPT[idxRef.current];
        if (!step) break;

        if (INSTANT.has(step.type)) {
          switch (step.type) {
            case "screen-change":
              setScreen(step.screen);
              break;
            case "ghost-show":
              ghostPosRef.current = step.at;
              setGhostAt(step.at);
              setGhostVisible(true);
              break;
            case "ghost-hide":
              setGhostVisible(false);
              break;
            case "bubble-hide":
              setBubble(null);
              break;
            case "click-ripple":
              rippleIdRef.current += 1;
              setRipple({ at: step.at, id: rippleIdRef.current });
              break;
          }
          if (!advance()) return; // completed
          continue; // process next step this frame
        }

        // Timed steps consume elapsed; break out once handled.
        if (step.type === "wait") {
          if (elapsedRef.current >= step.ms && !advance()) return;
        } else if (step.type === "ghost-fly") {
          const f = flightRef.current!;
          const t = Math.min(1, elapsedRef.current / f.dur);
          const pos = bezier(f.from, f.c, f.to, easeInOutCubic(t));
          ghostPosRef.current = pos;
          setGhostAt(pos);
          if (t >= 1 && !advance()) return;
        } else if (step.type === "bubble-show") {
          const full = bubbleFullRef.current;
          const n = Math.min(full.length, Math.floor(elapsedRef.current / step.streamMs));
          setBubble({ text: full.slice(0, n), anchor: bubbleAnchorRef.current });
          if (n >= full.length && !advance()) return;
        } else if (step.type === "type-text") {
          const full = step.text;
          const n = Math.min(full.length, Math.floor(elapsedRef.current / TYPE_MS_PER_CHAR));
          if (typedRef.current[step.target].length !== n) {
            typedRef.current = { ...typedRef.current, [step.target]: full.slice(0, n) };
            setTyped({ ...typedRef.current });
          }
          if (n >= full.length && !advance()) return;
        }
        break; // handled a timed step this frame
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [run]);

  return (
    <div className="flex h-full flex-col gap-3">
      {/* Stage — fixed coordinate space, centered; ghost + bubble live inside it
          so all coordinates are window-relative by construction. */}
      <div
        ref={stageWrapRef}
        className="flex flex-1 items-center justify-center"
        style={{ minHeight: STAGE_H, overflow: "hidden" }}
      >
        <div
          style={{
            position: "relative",
            width: STAGE_W,
            height: STAGE_H,
            maxWidth: "100%",
            border: "1px solid var(--color-border)",
            borderRadius: 6,
            overflow: "hidden",
            background: "#FFFFFF",
          }}
        >
          <DemoStage screen={screen} typed={typed} ripple={ripple} />
          {bubble && <SpeechBubble text={bubble.text} anchor={bubble.anchor} />}
          <GhostCursor at={ghostAt} visible={ghostVisible} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span style={{ fontSize: 12, lineHeight: 1.45, color: "var(--color-text-muted)" }}>
          {copy["demo-caption-agent"]}
        </span>
        <div className="shrink-0">
          <Button variant="secondary" onClick={replay}>
            {copy["demo-replay-label"]}
          </Button>
        </div>
      </div>
    </div>
  );
}
