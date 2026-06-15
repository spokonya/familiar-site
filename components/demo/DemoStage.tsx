"use client";

// The fake "screen" the ghost cursor operates on — a CSS-drawn mock browser
// (no raster assets). The screen state is swapped by screen-change steps; typed
// field values come from type-text steps (both driven by DemoPlayer).
//
// The mock-site labels (FlyExample, To, Depart, Search, Pay…) are set dressing
// depicting a fictional third-party website — not Familiar copy — so they live
// here rather than in COPY.md, the same way text inside a screenshot would.

import type { FieldId, Point, ScreenId } from "./DemoScript";

type Typed = Record<FieldId, string>;

const field: React.CSSProperties = {
  position: "absolute",
  height: 30,
  borderRadius: 5,
  border: "1px solid #C8CDD3",
  background: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  padding: "0 8px",
  fontSize: 12,
  color: "#1A1A1A",
};
const label: React.CSSProperties = {
  position: "absolute",
  fontSize: 10,
  fontWeight: 600,
  color: "#8A8A8E",
  letterSpacing: "0.02em",
};

export function DemoStage({
  screen,
  typed,
  ripple,
}: {
  screen: ScreenId;
  typed: Typed;
  ripple: { at: Point; id: number } | null;
}) {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#FFFFFF", overflow: "hidden" }}>
      {/* Browser chrome */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 36,
          background: "#ECEDEF",
          borderBottom: "1px solid #D5D8DC",
          display: "flex",
          alignItems: "center",
          gap: 6,
          paddingInline: 10,
        }}
      >
        <Dot color="#FF5F57" />
        <Dot color="#FEBC2E" />
        <Dot color="#28C840" />
        <div
          style={{
            marginLeft: 8,
            flex: 1,
            height: 20,
            borderRadius: 5,
            background: "#FFFFFF",
            border: "1px solid #D5D8DC",
            display: "flex",
            alignItems: "center",
            paddingInline: 8,
            fontSize: 11,
            color: typed.address ? "#1A1A1A" : "#B8B8BC",
          }}
        >
          {typed.address || "search or enter address"}
        </div>
      </div>

      {/* Page content */}
      <div style={{ position: "absolute", top: 36, left: 0, right: 0, bottom: 0 }}>
        {screen === "form" && <FormScreen typed={typed} />}
        {screen === "results" && <ResultsScreen />}
        {screen === "checkout" && <CheckoutScreen />}
      </div>

      {/* Click ripple */}
      {ripple && (
        <span
          key={ripple.id}
          style={{
            position: "absolute",
            top: ripple.at.y,
            left: ripple.at.x,
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "2px solid var(--color-accent)",
            animation: "demo-ripple 480ms cubic-bezier(0.32,0.72,0,1) forwards",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}

function Dot({ color }: { color: string }) {
  return <span style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />;
}

// Content coordinates are offset by the 36px chrome (script y minus 36).
function FormScreen({ typed }: { typed: Typed }) {
  return (
    <>
      <div style={{ position: "absolute", top: 12, left: 24, fontSize: 16, fontWeight: 700, color: "#1A1A1A" }}>
        FlyExample
      </div>
      <span style={{ ...label, top: 44, left: 44 }}>TO</span>
      <div style={{ ...field, top: 56, left: 44, width: 180 }}>
        {typed.to || <span style={{ color: "#B8B8BC" }}>City</span>}
      </div>
      <span style={{ ...label, top: 44, left: 256 }}>DEPART</span>
      <div style={{ ...field, top: 56, left: 256, width: 180 }}>
        {typed.depart || <span style={{ color: "#B8B8BC" }}>Date</span>}
      </div>
      <Button top={98} left={180} width={120}>
        Search
      </Button>
    </>
  );
}

function ResultsScreen() {
  return (
    <>
      <div style={{ position: "absolute", top: 14, left: 24, fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>
        SFO → PDX · Fri
      </div>
      <Row top={42}>8:05a — 10:18a · $248</Row>
      <Button top={64} left={336} width={104}>
        Select
      </Button>
      <Row top={104}>11:40a — 1:52p · $263</Row>
    </>
  );
}

function CheckoutScreen() {
  return (
    <>
      <div style={{ position: "absolute", top: 16, left: 24, fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>
        Review your trip
      </div>
      <div style={{ position: "absolute", top: 44, left: 24, right: 24, fontSize: 12, color: "#555558", lineHeight: 1.6 }}>
        San Francisco → Portland
        <br />
        Friday · 8:05a — 10:18a · $248
      </div>
      <Button top={172} left={170} width={140} primary>
        Pay $248
      </Button>
    </>
  );
}

function Row({ top, children }: { top: number; children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 24,
        right: 24,
        height: 30,
        display: "flex",
        alignItems: "center",
        fontSize: 12,
        color: "#1A1A1A",
        borderBottom: "1px solid #EFEFEF",
      }}
    >
      {children}
    </div>
  );
}

function Button({
  top,
  left,
  width,
  primary,
  children,
}: {
  top: number;
  left: number;
  width: number;
  primary?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
        fontSize: 13,
        fontWeight: 600,
        background: primary ? "#0B7A3B" : "#2D72D2",
        color: "#FFFFFF",
      }}
    >
      {children}
    </div>
  );
}
