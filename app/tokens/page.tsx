// Dev-only verification page. Never linked from the homepage.
// Shows all color tokens, type scale, and a Platinum window chrome sample.

type Swatch = { name: string; hex: string; label: string; dark?: boolean };

const platinumTokens: Swatch[] = [
  { name: "--platinum-bg",                  hex: "#DDDDDD", label: "BG" },
  { name: "--platinum-mid",                 hex: "#CCCCCC", label: "Mid" },
  { name: "--platinum-dark",                hex: "#AAAAAA", label: "Dark" },
  { name: "--platinum-border-outer",        hex: "#808080", label: "Border outer" },
  { name: "--platinum-border-inner",        hex: "#FFFFFF", label: "Border inner" },
  { name: "--platinum-border-inner-shadow", hex: "#888888", label: "Border inner shadow" },
  { name: "--platinum-stripe-a",            hex: "#B8B8B8", label: "Stripe A (dark)" },
  { name: "--platinum-stripe-b",            hex: "#D8D8D8", label: "Stripe B (light)" },
  { name: "--platinum-title-inactive",      hex: "#D5D5D5", label: "Title inactive" },
  { name: "--platinum-content-bg",          hex: "#FFFFFF", label: "Content BG" },
  { name: "--platinum-desktop-bg",          hex: "#335577", label: "Desktop BG", dark: true },
  { name: "--platinum-text",                hex: "#1A1A1A", label: "Text", dark: true },
  { name: "--platinum-text-inactive",       hex: "#808080", label: "Text inactive" },
  { name: "--platinum-highlight",           hex: "#378ADD", label: "Highlight", dark: true },
  { name: "--platinum-scrollbar-track-a",   hex: "#C8C8C8", label: "Track A" },
  { name: "--platinum-scrollbar-track-b",   hex: "#D4D4D4", label: "Track B" },
];

const surfaceTokens: Swatch[] = [
  { name: "--color-bg",            hex: "#FFFFFF",  label: "BG" },
  { name: "--color-bg-subtle",     hex: "#F5F6F7",  label: "BG subtle" },
  { name: "--color-bg-elevated",   hex: "#FFFFFF",  label: "BG elevated" },
  { name: "--color-border",        hex: "#E0E0E2",  label: "Border" },
  { name: "--color-border-subtle", hex: "#EFEFEF",  label: "Border subtle" },
];

const textTokens: Swatch[] = [
  { name: "--color-text-primary",   hex: "#1A1A1A", label: "Primary",   dark: true },
  { name: "--color-text-secondary", hex: "#555558", label: "Secondary",  dark: true },
  { name: "--color-text-muted",     hex: "#8A8A8E", label: "Muted",      dark: true },
  { name: "--color-text-disabled",  hex: "#B8B8BC", label: "Disabled" },
  { name: "--color-text-on-accent", hex: "#FFFFFF", label: "On accent" },
];

const accentTokens: Swatch[] = [
  { name: "--color-accent",        hex: "#378ADD", label: "Accent",        dark: true },
  { name: "--color-accent-hover",  hex: "#2B6CB0", label: "Accent hover",  dark: true },
  { name: "--color-accent-active", hex: "#1D4E87", label: "Accent active", dark: true },
  { name: "--color-accent-soft",   hex: "#E3EDF8", label: "Accent soft" },
  { name: "--color-accent-border", hex: "#B3CDE8", label: "Accent border" },
];

const semanticTokens: Swatch[] = [
  { name: "--color-error",        hex: "#C53030", label: "Error",         dark: true },
  { name: "--color-error-soft",   hex: "#FEE8E8", label: "Error soft" },
  { name: "--color-success",      hex: "#2D7D4E", label: "Success",       dark: true },
  { name: "--color-success-soft", hex: "#E6F4EC", label: "Success soft" },
  { name: "--color-warning",      hex: "#C47A1A", label: "Warning",       dark: true },
  { name: "--color-warning-soft", hex: "#FEF3E2", label: "Warning soft" },
];

const typeScale = [
  { token: "--text-display-xl", size: "64px", weight: 700, tracking: "-0.03em",  sample: "Your Mac remembers." },
  { token: "--text-display-lg", size: "48px", weight: 700, tracking: "-0.02em",  sample: "Does it for you." },
  { token: "--text-display-md", size: "36px", weight: 600, tracking: "-0.015em", sample: "Or walks you through it." },
  { token: "--text-heading-lg", size: "28px", weight: 600, tracking: "-0.01em",  sample: "Doesn't read what it shouldn't." },
  { token: "--text-heading-md", size: "22px", weight: 600, tracking: "0",        sample: "Agent · Guide · Chat" },
  { token: "--text-heading-sm", size: "18px", weight: 600, tracking: "0",        sample: "Memory · Action · Guidance" },
  { token: "--text-body-lg",    size: "18px", weight: 400, tracking: "0",        sample: "Familiar keeps a private, local running memory of your screen." },
  { token: "--text-body-md",    size: "16px", weight: 400, tracking: "0",        sample: "Type a task and Familiar handles it in real apps, on your screen." },
  { token: "--text-body-sm",    size: "14px", weight: 400, tracking: "0",        sample: "The ghost cursor is always visible. You see what Familiar is about to do." },
  { token: "--text-caption",    size: "12px", weight: 500, tracking: "0.01em",   sample: "MEMORY · SCREEN · MAC OS 9" },
  { token: "--text-mono",       size: "14px", weight: 400, tracking: "0",        sample: "if (screen.active) familiar.read()" },
];

function SwatchGrid({ tokens, bg = "#F5F6F7" }: { tokens: Swatch[]; bg?: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px" }}>
      {tokens.map((t) => (
        <div key={t.name} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div
            style={{
              height: "48px",
              background: t.hex,
              border: "1px solid #D0D0D0",
              borderRadius: "4px",
            }}
          />
          <div style={{ fontSize: "11px", fontFamily: "ui-monospace, monospace", color: "#555558", lineHeight: 1.4 }}>
            <div style={{ fontWeight: 600, color: "#1A1A1A" }}>{t.hex}</div>
            <div>{t.name}</div>
            <div style={{ color: "#8A8A8E" }}>{t.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em",
      textTransform: "uppercase", color: "#8A8A8E",
      marginBottom: "16px", marginTop: "40px",
      borderBottom: "1px solid #E0E0E2", paddingBottom: "8px",
    }}>
      {children}
    </h2>
  );
}

// ── Platinum window chrome sample ─────────────────────────────────────────

function ControlButton() {
  return (
    <div style={{
      width: "13px", height: "13px", flexShrink: 0,
      background: "#CCCCCC",
      border: "1px solid #808080",
      boxShadow: "inset 1px 1px 0 #FFFFFF, inset -1px -1px 0 #888888",
    }} />
  );
}

function WindowSample({ active = true, title = "Sample Window" }: { active?: boolean; title?: string }) {
  const titleBg = active
    ? "repeating-linear-gradient(to bottom, #B8B8B8 0px, #B8B8B8 1px, #D8D8D8 1px, #D8D8D8 2px)"
    : "#D5D5D5";

  return (
    <div style={{
      display: "inline-flex", flexDirection: "column",
      width: "380px", height: "260px",
      border: "1px solid #808080",
      boxShadow: "inset 1px 1px 0 #FFFFFF, inset -1px -1px 0 #888888, 2px 2px 0 rgba(0,0,0,0.35)",
    }}>
      {/* Title bar */}
      <div style={{
        height: "22px", flexShrink: 0,
        background: titleBg,
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 6px",
        position: "relative",
        borderBottom: "1px solid #808080",
      }}>
        <div style={{ opacity: active ? 1 : 0.15 }}><ControlButton /></div>
        <span style={{
          position: "absolute", left: "50%", transform: "translateX(-50%)",
          fontSize: "12px", fontWeight: 700,
          fontFamily: "ui-sans-serif, -apple-system, system-ui, sans-serif",
          color: active ? "#1A1A1A" : "#808080",
          whiteSpace: "nowrap", userSelect: "none",
        }}>
          {title}
        </span>
        <div style={{ display: "flex", gap: "4px", opacity: active ? 1 : 0.15 }}>
          <ControlButton />
          <ControlButton />
        </div>
      </div>

      {/* Content + scrollbar */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Content area */}
        <div style={{
          flex: 1, padding: "16px",
          background: "#FFFFFF",
          fontSize: "13px", lineHeight: 1.5, color: "#1A1A1A",
          fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
          overflow: "hidden",
        }}>
          <p style={{ marginBottom: "8px" }}>
            <strong>Familiar</strong> keeps a running memory of your screen.
          </p>
          <p style={{ color: "#555558" }}>
            Type a task and the ghost cursor takes it from there — navigating, clicking, filling in
            forms — stopping before anything irreversible.
          </p>
        </div>

        {/* Scrollbar */}
        <div style={{
          width: "16px", flexShrink: 0,
          display: "flex", flexDirection: "column",
          borderLeft: "1px solid #808080",
        }}>
          {/* Top arrow */}
          <div style={{
            width: "16px", height: "16px", flexShrink: 0,
            background: "#BBBBBB",
            border: "1px solid #808080",
            boxSizing: "border-box",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "7px", color: "#1A1A1A",
          }}>
            ▲
          </div>

          {/* Track + thumb */}
          <div style={{
            flex: 1, position: "relative",
            backgroundImage: "repeating-conic-gradient(#C8C8C8 0% 25%, #D4D4D4 0% 50%)",
            backgroundSize: "2px 2px",
          }}>
            <div style={{
              position: "absolute",
              top: "16px", left: "1px", right: "1px",
              height: "56px",
              background: "#AAAAAA",
              boxShadow: "inset 1px 1px 0 #D0D0D0, inset -1px -1px 0 #808080",
            }} />
          </div>

          {/* Bottom arrow */}
          <div style={{
            width: "16px", height: "16px", flexShrink: 0,
            background: "#BBBBBB",
            border: "1px solid #808080",
            boxSizing: "border-box",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "7px", color: "#1A1A1A",
          }}>
            ▼
          </div>
        </div>
      </div>

      {/* Resize handle row */}
      <div style={{
        height: "16px", flexShrink: 0,
        display: "flex", justifyContent: "flex-end",
        borderTop: "1px solid #808080",
        background: "#FFFFFF",
      }}>
        <div style={{
          width: "16px", height: "16px",
          backgroundColor: "#BBBBBB",
          backgroundImage:
            "linear-gradient(135deg, #808080 1px, transparent 1px), linear-gradient(135deg, #808080 1px, transparent 1px)",
          backgroundSize: "4px 4px",
          backgroundPosition: "0 0, 2px 2px",
          cursor: "nwse-resize",
        }} />
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function TokensPage() {
  return (
    <div style={{
      padding: "48px",
      background: "#F5F6F7",
      minHeight: "100vh",
      fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1A1A1A", marginBottom: "6px" }}>
            Design Tokens
          </h1>
          <p style={{ fontSize: "14px", color: "#8A8A8E" }}>
            familiar-site · Session 2 verification · never linked from homepage
          </p>
        </div>

        {/* ── Chrome layer ── */}
        <SectionHeader>Chrome layer — Platinum (MACOS9_REFERENCE.md)</SectionHeader>
        <SwatchGrid tokens={platinumTokens} />

        {/* ── Content layer ── */}
        <SectionHeader>Content layer — Surfaces (BRAND.md)</SectionHeader>
        <SwatchGrid tokens={surfaceTokens} />

        <SectionHeader>Content layer — Text</SectionHeader>
        <SwatchGrid tokens={textTokens} />

        <SectionHeader>Content layer — Accent (#378ADD)</SectionHeader>
        <SwatchGrid tokens={accentTokens} />

        <SectionHeader>Content layer — Semantic</SectionHeader>
        <SwatchGrid tokens={semanticTokens} />

        {/* ── Type scale ── */}
        <SectionHeader>Type scale — Geist (BRAND.md)</SectionHeader>
        <div style={{ background: "#FFFFFF", border: "1px solid #E0E0E2", borderRadius: "6px", overflow: "hidden" }}>
          {typeScale.map((row, i) => (
            <div
              key={row.token}
              style={{
                display: "flex", alignItems: "baseline", gap: "24px",
                padding: "20px 24px",
                borderBottom: i < typeScale.length - 1 ? "1px solid #EFEFEF" : "none",
              }}
            >
              <div style={{ width: "180px", flexShrink: 0 }}>
                <div style={{ fontSize: "11px", fontFamily: "ui-monospace, monospace", color: "#378ADD", fontWeight: 600 }}>
                  {row.token}
                </div>
                <div style={{ fontSize: "11px", fontFamily: "ui-monospace, monospace", color: "#8A8A8E", marginTop: "2px" }}>
                  {row.size} / {row.weight}
                </div>
              </div>
              <div style={{
                fontSize: row.size,
                fontWeight: row.weight,
                letterSpacing: row.tracking,
                color: "#1A1A1A",
                lineHeight: 1.15,
                fontFamily: row.token === "--text-mono"
                  ? "var(--font-mono), ui-monospace, monospace"
                  : "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
              }}>
                {row.sample}
              </div>
            </div>
          ))}
        </div>

        {/* Chrome font scale */}
        <SectionHeader>Chrome font scale — system-ui stack (MACOS9_REFERENCE.md)</SectionHeader>
        <div style={{ background: "#CCCCCC", border: "1px solid #808080", borderRadius: "2px", overflow: "hidden" }}>
          {[
            { label: "Window title", size: "12px", weight: 700 },
            { label: "Menu bar items", size: "12px", weight: 400 },
            { label: "Dialog button labels", size: "11px", weight: 400 },
            { label: "Desktop icon labels", size: "11px", weight: 400 },
          ].map((row, i, arr) => (
            <div
              key={row.label}
              style={{
                display: "flex", alignItems: "center", gap: "24px",
                padding: "10px 16px",
                borderBottom: i < arr.length - 1 ? "1px solid #AAAAAA" : "none",
              }}
            >
              <div style={{ width: "180px", fontSize: "11px", color: "#555558", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                {row.label}
              </div>
              <div style={{
                fontSize: row.size, fontWeight: row.weight,
                fontFamily: "\"Chicago\", \"Charcoal\", ui-sans-serif, -apple-system, system-ui, sans-serif",
                color: "#1A1A1A",
              }}>
                Sample Window — Familiar
              </div>
              <div style={{ fontSize: "11px", fontFamily: "ui-monospace, monospace", color: "#808080" }}>
                {row.size} / {row.weight}
              </div>
            </div>
          ))}
        </div>

        {/* ── Window chrome sample ── */}
        <SectionHeader>Platinum window chrome — active + inactive</SectionHeader>
        <p style={{ fontSize: "13px", color: "#555558", marginBottom: "24px" }}>
          Verify: pinstripes visible, square controls (not circles), title centered, scrollbar arrows
          at both top AND bottom, hard 2px shadow (no blur), resize handle bottom-right only.
        </p>
        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "11px", color: "#8A8A8E", marginBottom: "8px", fontFamily: "ui-monospace, monospace" }}>
              Active (focused)
            </div>
            <WindowSample active={true} title="Familiar — About" />
          </div>
          <div>
            <div style={{ fontSize: "11px", color: "#8A8A8E", marginBottom: "8px", fontFamily: "ui-monospace, monospace" }}>
              Inactive (unfocused) — flat title bar, no pinstripes, gray title text
            </div>
            <WindowSample active={false} title="Familiar — Features" />
          </div>
        </div>

        {/* Easy-tells checklist */}
        <SectionHeader>Easy-tells checklist (MACOS9_REFERENCE.md)</SectionHeader>
        <div style={{
          background: "#FFFFFF", border: "1px solid #E0E0E2", borderRadius: "6px",
          padding: "20px 24px", fontSize: "13px", color: "#1A1A1A", lineHeight: 1.7,
        }}>
          {[
            "Square window controls — NOT circles",
            "Scrollbar arrows at both ends (top ↑ AND bottom ↓)",
            "Title bar height ~22 px — not a modern fat title bar",
            "Pinstripes on ACTIVE window only — inactive is flat gray",
            "Window corners square or near-zero radius",
            "Resize handle at bottom-right only",
            "Scrollbar thumb is a flat beveled slab — not a rounded pill",
            "Title text horizontally centered between control clusters",
            "Default dialog button has a thick outer ring",
            "Menu bar flush to top edge — zero gap",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span style={{ color: "#378ADD", fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ height: "80px" }} />
      </div>
    </div>
  );
}
