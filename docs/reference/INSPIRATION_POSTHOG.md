# INSPIRATION_POSTHOG.md — What We're Taking From PostHog (and What We're Not)

This document exists because two PostHog design references live in `docs/reference/`:
- `posthog-design-reference.md` — PostHog's full DESIGN.md, verbatim
- `posthog-why-os.md` — Cory's blog post on why PostHog went with the OS metaphor
- `posthog-founders-design.md` — Max's founder design philosophy

Without this framing doc, a fresh session will read those files and reach for cream + yellow + hedgehog references, because that's the most detailed design system in its context. This document prevents that.

---

## What we're taking

### The OS metaphor rationale
PostHog's reason for using a Mac OS 9 / HedgeHog OS metaphor (see `posthog-why-os.md`) is directly applicable:
- An OS metaphor creates a coherent, memorable world around the product
- It turns the site into a product itself — not just a brochure
- It gives you an infinite canvas for new "apps" (docs, pricing, demo, etc.)
- It signals taste and commitment to craft without saying so
- It differentiates radically from generic SaaS landing pages

We're using the same metaphor logic, but our OS is **Mac OS 9** specifically (not a hedgehog OS, not Windows 9x). This is the right choice for Familiar because Familiar IS a Mac app, and Mac OS 9 carries a specific resonance: the era when the Mac felt alive and personal.

### Component vocabulary structure
PostHog's DESIGN.md (`posthog-design-reference.md`) provides a useful vocabulary for organizing a design system:
- Button taxonomy (primary, secondary, outline, ghost)
- Card types (feature cards, doc cards)
- Banner/alert patterns (tip, warning, etc.)
- Content/presentation separation thinking
- Responsive grid thinking

We will create our own component vocabulary in BRAND.md that's structurally similar but Mac OS 9–specific (not PostHog-specific).

### "The website is a product" philosophy
From `posthog-founders-design.md`: treat the website with the same care as the product. Hire people who can do both. Don't outsource the brand. Iterate quickly. This applies directly — familiar-site is built with the same session structure and engineering rigor as the product itself.

### Section structure discipline
PostHog's sections have a logic: hero → use case → proof → features → pricing → bottom CTA. This is good marketing site structure. We'll use a similar rhythm, adapted for the OS window-based layout.

---

## What we're explicitly NOT taking

### The palette
PostHog's palette: cream (#FFFDF4), yellow (#F9BD2B), dark (#1D1D1D). These are specifically theirs. Using similar tones would make Familiar look like a PostHog clone.

**Familiar's palette** is derived from Mac OS 9 Platinum (to be defined in Session 2 / BRAND.md). The anchor color is `#378ADD` — the ghost cursor's blue. Everything else comes from Mac OS 9, not PostHog.

### The typography stack
PostHog uses specific fonts (check `posthog-design-reference.md`). Familiar uses a Mac OS 9–derived type stack. The Charcoal substitute strategy is determined in Session 2.

### The mascot approach
PostHog has a hedgehog mascot. Familiar has no mascot at launch (DECISIONS.md). The ghost cursor is Familiar's visual identity — it doesn't need a separate character on top.

### Hedgehog-specific component names
`banner-tip-hedgehog`, hedgehog illustrations, any PostHog-specific named entities. These are PostHog's brand, not ours. Strip them before using any structural reference.

### Their specific "startup energy" voice
PostHog's copy has a specific irreverent, "we're a startup and proud of it" energy that fits their brand. Familiar's voice is warmer, more personal, more "the Mac feels alive again" — closer to how Apple wrote in the late 90s than how modern SaaS companies write. See POSITIONING.md voice once that's written.

---

## Practical guidance for sessions

When reading `posthog-design-reference.md`, ask:
- "Does this structural decision apply to our Mac OS 9 system?" → if yes, adapt it
- "Is this color / type / mascot / PostHog-specific?" → ignore it, derive ours from Mac OS 9

When in doubt: **Mac OS 9 is the design system.** PostHog is just the structural reference for how to organize a design system.
