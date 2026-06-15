"use client";

// Features window content. Copy: COPY.md features-window sections — the four
// value props in priority order, the three-mode explainer, and Free/Pro plans.

import { Button } from "@/components/ui/Button";
import { copy, type CopyKey } from "@/lib/copy";

export function FeaturesWindow() {
  return (
    <div className="flex flex-col gap-7">
      <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--color-text-secondary)" }}>
        {copy["features-intro"]}
      </p>

      <ValueProp headline="memory-headline" body="memory-body" example="memory-example" />
      <ValueProp headline="mode-agent-headline" body="mode-agent-body" example="mode-agent-example" />
      <ValueProp headline="mode-guide-headline" body="mode-guide-body" example="mode-guide-example" />
      <ValueProp headline="privacy-headline" body="privacy-body" example="privacy-example" />

      <Divider />

      {/* Three modes explainer */}
      <section className="flex flex-col gap-2">
        <Heading>{copy["modes-headline"]}</Heading>
        <Body>{copy["modes-body"]}</Body>
        <div className="mt-1 flex flex-col gap-1">
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)" }}>
            {copy["mode-chat-headline"]}
          </span>
          <Body>{copy["mode-chat-body"]}</Body>
        </div>
      </section>

      <Divider />

      {/* Plans */}
      <section className="flex flex-col gap-3">
        <Heading>{copy["plans-headline"]}</Heading>
        <Body>{copy["plans-body"]}</Body>
        <div className="flex flex-col gap-3 sm:flex-row">
          <PlanCard label="plans-free-label" detail="plans-free-detail" />
          <PlanCard label="plans-pro-label" detail="plans-pro-detail" />
        </div>
        <div className="mt-1">
          <Button>{copy["plans-cta"]}</Button>
        </div>
      </section>
    </div>
  );
}

function ValueProp({ headline, body, example }: { headline: CopyKey; body: CopyKey; example: CopyKey }) {
  return (
    <section className="flex flex-col gap-2">
      <Heading>{copy[headline]}</Heading>
      <Body>{copy[body]}</Body>
      <p
        style={{
          fontSize: 14,
          fontStyle: "italic",
          lineHeight: 1.55,
          color: "var(--color-text-muted)",
          paddingLeft: 12,
          borderLeft: "2px solid var(--color-accent-border)",
        }}
      >
        {copy[example]}
      </p>
    </section>
  );
}

function PlanCard({ label, detail }: { label: CopyKey; detail: CopyKey }) {
  return (
    <div
      className="flex-1"
      style={{ border: "1px solid var(--color-border)", borderRadius: 6, padding: 12 }}
    >
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-accent)" }}>{copy[label]}</div>
      <p style={{ marginTop: 4, fontSize: 14, lineHeight: 1.55, color: "var(--color-text-secondary)" }}>
        {copy[detail]}
      </p>
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.3, color: "var(--color-text-primary)" }}>
      {children}
    </h2>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--color-text-secondary)" }}>{children}</p>;
}

function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid var(--color-border-subtle)" }} />;
}
