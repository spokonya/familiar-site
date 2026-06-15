"use client";

// Single Mac OS 9 Platinum window shell.
// Contract: ARCHITECTURE.md window-component-contract.
// Chrome spec: MACOS9_REFERENCE.md title-bar / window-controls / resize-handle.

import { useRef, useState } from "react";
import { useWindowManager } from "@/lib/useWindowManager";
import { MIN_WINDOW_SIZE, type WindowId } from "@/lib/windows";
import { ScrollArea } from "@/components/ui/ScrollArea";

const TITLE_BAR_H = 22;

type WindowProps = {
  id: WindowId;
  title: string;
  children: React.ReactNode;
  draggable?: boolean; // disabled at the tablet breakpoint
  scrollable?: boolean; // default true — shows Mac OS 9 scrollbars
};

export function Window({ id, title, children, draggable = true, scrollable = true }: WindowProps) {
  const win = useWindowManager((s) => s.windows[id]);
  const isFocused = useWindowManager((s) => s.focusedId === id);
  const focusWindow = useWindowManager((s) => s.focusWindow);
  const moveWindow = useWindowManager((s) => s.moveWindow);
  const resizeWindow = useWindowManager((s) => s.resizeWindow);
  const minimizeWindow = useWindowManager((s) => s.minimizeWindow);
  const restoreWindow = useWindowManager((s) => s.restoreWindow);
  const closeWindow = useWindowManager((s) => s.closeWindow);

  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [resize, setResize] = useState<{ width: number; height: number } | null>(null);
  const zoomPrev = useRef<{ position: { x: number; y: number }; size: { width: number; height: number } } | null>(null);

  if (!win || !win.isOpen) return null;

  const pos = drag ?? win.position;
  const size = resize ?? win.size;
  const outerHeight = win.isMinimized ? TITLE_BAR_H : size.height;

  const clamp = (x: number, y: number) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return {
      x: Math.min(Math.max(x, -size.width + 100), vw - 100),
      y: Math.min(Math.max(y, 0), vh - 30),
    };
  };

  const startDrag = (e: React.PointerEvent) => {
    if (!draggable) return;
    e.preventDefault();
    focusWindow(id);
    const start = { px: e.clientX, py: e.clientY, x: win.position.x, y: win.position.y };
    const onMove = (ev: PointerEvent) => {
      setDrag(clamp(start.x + (ev.clientX - start.px), start.y + (ev.clientY - start.py)));
    };
    const onUp = (ev: PointerEvent) => {
      const final = clamp(start.x + (ev.clientX - start.px), start.y + (ev.clientY - start.py));
      moveWindow(id, final);
      setDrag(null);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  };

  const startResize = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    focusWindow(id);
    const start = { px: e.clientX, py: e.clientY, w: win.size.width, h: win.size.height };
    const next = (ev: PointerEvent) => ({
      width: Math.max(MIN_WINDOW_SIZE.width, start.w + (ev.clientX - start.px)),
      height: Math.max(MIN_WINDOW_SIZE.height, start.h + (ev.clientY - start.py)),
    });
    const onMove = (ev: PointerEvent) => setResize(next(ev));
    const onUp = (ev: PointerEvent) => {
      resizeWindow(id, next(ev));
      setResize(null);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  };

  const toggleCollapse = () => (win.isMinimized ? restoreWindow(id) : minimizeWindow(id));

  const toggleZoom = () => {
    focusWindow(id);
    if (zoomPrev.current) {
      moveWindow(id, zoomPrev.current.position);
      resizeWindow(id, zoomPrev.current.size);
      zoomPrev.current = null;
    } else {
      zoomPrev.current = { position: win.position, size: win.size };
      const width = Math.min(win.size.width + 200, window.innerWidth - 48);
      const height = Math.min(window.innerHeight - 80, window.innerHeight - 80);
      moveWindow(id, clamp(24, 40));
      resizeWindow(id, { width, height });
    }
  };

  return (
    <div
      onPointerDown={() => focusWindow(id)}
      className="absolute top-0 left-0 select-none"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        width: size.width,
        height: outerHeight,
        zIndex: win.zIndex,
        background: "var(--platinum-content-bg)",
        border: "1px solid var(--platinum-border-outer)",
        borderRadius: 1,
        boxShadow:
          "inset 1px 1px 0 var(--platinum-border-inner), inset -1px -1px 0 var(--platinum-border-inner-shadow), 2px 2px 0px rgba(0,0,0,0.35)",
        overflow: "hidden",
      }}
    >
      {/* Title bar */}
      <div
        onPointerDown={startDrag}
        onDoubleClick={toggleCollapse}
        className="relative flex items-center"
        style={{
          height: TITLE_BAR_H,
          cursor: draggable ? "default" : "auto",
          background: isFocused ? "var(--platinum-pinstripe)" : "var(--platinum-title-inactive)",
          borderBottom: "1px solid var(--platinum-border-outer)",
        }}
      >
        {/* Close (left) */}
        <ControlButton glyph="×" active={isFocused} left={6} onClick={() => closeWindow(id)} label="Close" />
        {/* Collapse + Zoom (right) */}
        <ControlButton glyph="–" active={isFocused} right={23} onClick={toggleCollapse} label="Collapse" />
        <ControlButton glyph="+" active={isFocused} right={6} onClick={toggleZoom} label="Zoom" />

        <span
          className="pointer-events-none absolute inset-x-0 text-center"
          style={{
            fontFamily: '"Chicago", "Charcoal", ui-sans-serif, -apple-system, system-ui, sans-serif',
            fontSize: 12,
            fontWeight: 700,
            paddingInline: 32,
            color: isFocused ? "var(--platinum-text)" : "var(--platinum-text-inactive)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </span>
      </div>

      {/* Content area — collapses to 0 height on windowshade */}
      <div
        style={{
          height: win.isMinimized ? 0 : outerHeight - TITLE_BAR_H,
          overflow: "hidden",
          transition: "height 160ms cubic-bezier(0.32,0.72,0,1)",
          background: "var(--platinum-content-bg)",
        }}
      >
        {scrollable ? (
          <ScrollArea>
            <div style={{ padding: 16 }}>{children}</div>
          </ScrollArea>
        ) : (
          <div style={{ padding: 16, height: "100%", overflow: "hidden" }}>{children}</div>
        )}
      </div>

      {/* Resize handle (bottom-right) */}
      {win.isResizable && !win.isMinimized && (
        <div
          onPointerDown={startResize}
          aria-hidden
          className="absolute"
          style={{
            right: 0,
            bottom: 0,
            width: 16,
            height: 16,
            cursor: "nwse-resize",
            backgroundColor: "#BBBBBB",
            backgroundImage:
              "linear-gradient(135deg, #808080 1px, transparent 1px), linear-gradient(135deg, #808080 1px, transparent 1px)",
            backgroundSize: "4px 4px",
            backgroundPosition: "0 0, 2px 2px",
          }}
        />
      )}
    </div>
  );
}

function ControlButton({
  glyph,
  active,
  left,
  right,
  onClick,
  label,
}: {
  glyph: string;
  active: boolean;
  left?: number;
  right?: number;
  onClick: () => void;
  label: string;
}) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button
      type="button"
      aria-label={label}
      onPointerDown={(e) => {
        e.stopPropagation(); // don't start a drag
        setPressed(true);
      }}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => {
        setHover(false);
        setPressed(false);
      }}
      onPointerEnter={() => setHover(true)}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="absolute flex items-center justify-center"
      style={{
        left,
        right,
        top: "50%",
        transform: "translateY(-50%)",
        width: 13,
        height: 13,
        opacity: active ? 1 : 0.2,
        transition: "opacity 150ms ease",
        background: pressed ? "#AAAAAA" : hover ? "#BBBBBB" : "#CCCCCC",
        border: `1px solid ${pressed ? "#404040" : hover ? "#606060" : "#808080"}`,
        boxShadow: pressed
          ? "inset 1px 1px 0 #808080"
          : `inset 1px 1px 0 ${hover ? "#DDDDDD" : "#FFFFFF"}`,
        cursor: "default",
        fontSize: 8,
        lineHeight: 1,
        fontWeight: 700,
        color: "#1A1A1A",
      }}
    >
      {active && hover ? glyph : ""}
    </button>
  );
}
