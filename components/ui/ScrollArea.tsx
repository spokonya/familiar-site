"use client";

// Mac OS 9 Platinum scroll container.
// Spec: MACOS9_REFERENCE.md scrollbars + ARCHITECTURE.md scrollbars.
// Native scrollbars cannot place arrows at BOTH ends of the track, so the
// scrollbar is drawn as a custom overlay. Wheel/trackpad scrolling still uses
// native overflow (native bar hidden via .hide-native-scrollbar); the overlay
// is synced to scrollTop. Arrows and the thumb scroll programmatically.

import { useCallback, useEffect, useRef, useState } from "react";
import { ariaLabels } from "@/lib/uiLabels";

const BAR = 16; // scrollbar width (px)
const ARROW = 16; // arrow button height (px)
const MIN_THUMB = 24; // minimum thumb height (px)
const STEP = 40; // px per arrow click

export function ScrollArea({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState({ scrollTop: 0, scrollHeight: 0, clientHeight: 0 });

  const measure = useCallback(() => {
    const el = contentRef.current;
    if (!el) return;
    setMetrics({
      scrollTop: el.scrollTop,
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
    });
  }, []);

  useEffect(() => {
    measure();
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    for (const child of Array.from(el.children)) ro.observe(child);
    return () => ro.disconnect();
  }, [measure]);

  const { scrollTop, scrollHeight, clientHeight } = metrics;
  const overflowing = scrollHeight > clientHeight + 1;
  const trackHeight = Math.max(0, clientHeight - ARROW * 2);
  const visibleRatio = clientHeight / Math.max(scrollHeight, 1);
  const thumbHeight = overflowing
    ? Math.max(MIN_THUMB, visibleRatio * trackHeight)
    : trackHeight;
  const maxScroll = Math.max(1, scrollHeight - clientHeight);
  const thumbTop = overflowing
    ? (scrollTop / maxScroll) * (trackHeight - thumbHeight)
    : 0;

  const scrollByPx = (delta: number) => {
    contentRef.current?.scrollBy({ top: delta, behavior: "auto" });
  };

  // Thumb drag → map vertical pointer delta to scrollTop.
  const onThumbDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const startY = e.clientY;
    const startScroll = scrollTop;
    const range = trackHeight - thumbHeight;
    const onMove = (ev: PointerEvent) => {
      const el = contentRef.current;
      if (!el || range <= 0) return;
      const dy = ev.clientY - startY;
      el.scrollTop = startScroll + (dy / range) * maxScroll;
    };
    const onUp = () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  };

  return (
    <div className="relative h-full w-full">
      {/* Content — native scroll, native bar hidden, right gutter for the overlay */}
      <div
        ref={contentRef}
        onScroll={measure}
        className="hide-native-scrollbar h-full w-full overflow-y-scroll overflow-x-hidden"
        style={{ paddingRight: BAR }}
      >
        {children}
      </div>

      {/* Custom Platinum scrollbar overlay */}
      <div
        className="absolute top-0 right-0 bottom-0 flex flex-col"
        style={{
          width: BAR,
          borderLeft: "1px solid var(--platinum-border-outer)",
        }}
      >
        <ArrowButton dir="up" onClick={() => scrollByPx(-STEP)} disabled={!overflowing} />
        {/* Track */}
        <div
          className="relative flex-1"
          style={{
            backgroundImage:
              "repeating-conic-gradient(var(--platinum-scrollbar-track-a) 0% 25%, var(--platinum-scrollbar-track-b) 0% 50%)",
            backgroundSize: "2px 2px",
          }}
        >
          <div
            onPointerDown={onThumbDown}
            className="absolute right-0 left-0"
            style={{
              top: thumbTop,
              height: thumbHeight,
              background: "var(--platinum-dark)",
              boxShadow:
                "inset 1px 1px 0 #D0D0D0, inset -1px -1px 0 var(--platinum-border-outer)",
              cursor: overflowing ? "grab" : "default",
            }}
          />
        </div>
        <ArrowButton dir="down" onClick={() => scrollByPx(STEP)} disabled={!overflowing} />
      </div>
    </div>
  );
}

function ArrowButton({
  dir,
  onClick,
  disabled,
}: {
  dir: "up" | "down";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "up" ? ariaLabels.scrollUp : ariaLabels.scrollDown}
      className="flex shrink-0 items-center justify-center active:brightness-90"
      style={{
        width: ARROW,
        height: ARROW,
        background: "#BBBBBB",
        borderTop: dir === "up" ? "none" : "1px solid var(--platinum-border-outer)",
        borderBottom: dir === "down" ? "none" : "1px solid var(--platinum-border-outer)",
        boxShadow: "inset 1px 1px 0 var(--platinum-border-inner)",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 0,
          height: 0,
          borderLeft: "4px solid transparent",
          borderRight: "4px solid transparent",
          ...(dir === "up"
            ? { borderBottom: "5px solid #1A1A1A" }
            : { borderTop: "5px solid #1A1A1A" }),
          opacity: disabled ? 0.3 : 1,
        }}
      />
    </button>
  );
}
