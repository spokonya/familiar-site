# BRAND.md — Familiar Brand System

> **STATUS: COMPLETE — Session 2**
>
> Source of truth for palette, typography, and Mac OS 9 chrome rules.
> MACOS9_REFERENCE.md governs all specific Platinum chrome measurements (title bar height,
> pinstripe hex values, control button sizes). This document maps those into semantic roles
> and adds the content-layer design system that sits inside the windows.

---

## Palette

Two layers. The **chrome layer** is Platinum — sourced from MACOS9_REFERENCE.md and not
duplicated here. The **content layer** is Familiar's own — these tokens govern what's inside
the windows and the website-mode marketing layout.

### Chrome layer (Platinum)

All `--platinum-*` variables are defined in MACOS9_REFERENCE.md (Platinum Color System
section) and declared in `app/globals.css`. Do not redefine them in BRAND.md. Reference by
variable name only:

| Variable | Role |
|---|---|
| `--platinum-bg` | Menu bar, inactive surfaces |
| `--platinum-mid` | Button faces, control backgrounds |
| `--platinum-title-inactive` | Inactive title bar |
| `--platinum-stripe-a / -b` | Active title bar pinstripes |
| `--platinum-border-outer` | Window outer border |
| `--platinum-border-inner` | 3D bevel highlight (top+left) |
| `--platinum-border-inner-shadow` | 3D bevel shadow (bottom+right) |
| `--platinum-highlight` | `#378ADD` — selection and focus |
| `--platinum-desktop-bg` | Desktop background |

### Content layer

These tokens govern window interiors and the website-mode layout.
All declared as `--color-*` CSS custom properties in `app/globals.css`.

#### Base surfaces

| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#FFFFFF` | Window content area background; default page background |
| `--color-bg-subtle` | `#F5F6F7` | Website-mode page background; nested surface in windows |
| `--color-bg-elevated` | `#FFFFFF` | Cards and elevated containers in website mode |
| `--color-border` | `#E0E0E2` | Content dividers, card borders — lighter than Platinum chrome |
| `--color-border-subtle` | `#EFEFEF` | Row dividers, inline separators |

`--color-bg` (`#FFFFFF`) is the default window interior. `--color-bg-subtle` (`#F5F6F7`)
is a cool near-white for the website-mode page canvas — distinct from Platinum chrome gray
and intentionally NOT warm (warm backgrounds belong to PostHog, not Familiar).

#### Text hierarchy

| Token | Hex | Use |
|---|---|---|
| `--color-text-primary` | `#1A1A1A` | Headlines, primary body copy |
| `--color-text-secondary` | `#555558` | Secondary labels, sub-headlines |
| `--color-text-muted` | `#8A8A8E` | Captions, placeholders, metadata |
| `--color-text-disabled` | `#B8B8BC` | Disabled state text |
| `--color-text-on-accent` | `#FFFFFF` | Text on `--color-accent` backgrounds |

`--color-text-primary` is the same hex as `--platinum-text` — one near-black across chrome
and content, not two different blacks.

#### Accent — the ghost cursor's blue

`#378ADD` is the anchor. Every selection highlight, focus ring, primary CTA, and link uses
this blue. It also doubles as `--platinum-highlight` in the chrome layer — so there is exactly
one blue in the system.

| Token | Hex | Use |
|---|---|---|
| `--color-accent` | `#378ADD` | Primary CTA buttons, links, focus rings, active states |
| `--color-accent-hover` | `#2B6CB0` | Hover state for accent elements |
| `--color-accent-active` | `#1D4E87` | Pressed/active state |
| `--color-accent-soft` | `#E3EDF8` | Badge backgrounds, info banners, selection tints |
| `--color-accent-border` | `#B3CDE8` | Bordered accent containers |

Do not add a second accent color. `#378ADD` is the only chromatic moment in Familiar's
content layer — the Platinum chrome grays and near-blacks handle everything else.

#### Semantic (for demo UI and error states)

| Token | Hex | Use |
|---|---|---|
| `--color-error` | `#C53030` | Error text, error borders |
| `--color-error-soft` | `#FEE8E8` | Error banner backgrounds |
| `--color-success` | `#2D7D4E` | Success text, confirmation states |
| `--color-success-soft` | `#E6F4EC` | Success banner backgrounds |
| `--color-warning` | `#C47A1A` | Warning text |
| `--color-warning-soft` | `#FEF3E2` | Warning banner backgrounds |

These appear primarily in the scripted demo window and any dialog chrome. Keep them
subdued — these are functional colors, not brand moments.

---

## Typography

Two typefaces. One for chrome, one for content. No mixing within a context.

### Chrome typeface — system stack

All Mac OS 9 chrome text (title bars, menu bar, dialog buttons, desktop labels) uses:

```css
font-family: "Chicago", "Charcoal", ui-sans-serif, -apple-system, system-ui, sans-serif;
```

See the Typography section of MACOS9_REFERENCE.md for the chrome size scale (12 px window
titles, 12 px menu items, etc.). The chrome typeface is never used for marketing copy or
window content bodies.

### Content typeface — Geist

All content inside windows (marketing copy, feature descriptions, body text) and the entire
website-mode layout uses **Geist** by Vercel. Code samples and the terminal/demo UI
use **Geist Mono**.

**Why Geist:**
- Geometric grotesque with a clean, slightly technical quality — fits a Mac productivity tool
- Precise and unornamented, matching the "direct, quiet confidence" voice
- Variable font: weight range 100–900, single file for all weights
- Geist Mono is built as its companion, so the system is internally coherent
- MIT licensed, shipped via the `geist` npm package (use `next/font/local` in Next.js)

**Loading in Next.js (app/layout.tsx):**
```tsx
import { GeistSans, GeistMono } from "geist/font";
// or via next/font/local if using the local font files
```

**Fallback stack:**
```css
font-family: "Geist", ui-sans-serif, -apple-system, system-ui, sans-serif;
font-family: "Geist Mono", ui-monospace, "SFMono-Regular", monospace;
```

### Type scale

Content and website-mode type scale. All implemented as CSS custom properties and Tailwind
utilities (see Part 4 — Tailwind tokens).

| Token | Size | Weight | Line Height | Tracking | Use |
|---|---|---|---|---|---|
| `--text-display-xl` | 64px | 700 | 1.05 | -0.03em | Hero headline (website mode) |
| `--text-display-lg` | 48px | 700 | 1.1 | -0.02em | Section headline |
| `--text-display-md` | 36px | 600 | 1.15 | -0.015em | Window content headline |
| `--text-heading-lg` | 28px | 600 | 1.25 | -0.01em | Sub-section heading |
| `--text-heading-md` | 22px | 600 | 1.3 | 0 | Card heading |
| `--text-heading-sm` | 18px | 600 | 1.4 | 0 | Feature label |
| `--text-body-lg` | 18px | 400 | 1.65 | 0 | Intro paragraph |
| `--text-body-md` | 16px | 400 | 1.65 | 0 | Default body copy |
| `--text-body-sm` | 14px | 400 | 1.6 | 0 | Secondary copy, window captions |
| `--text-caption` | 12px | 500 | 1.45 | 0.01em | Labels, metadata, timestamps |
| `--text-mono` | 14px | 400 | 1.6 | 0 | Geist Mono — code, terminal text |

### Weight rules

- 700 (bold): display sizes only — hero headline, section headline
- 600 (semibold): all headings md and below, UI labels
- 500 (medium): captions, metadata, emphasis inside body
- 400 (regular): all body copy, all descriptive text

Do not use 800 or 900 weights. The heaviness of Geist 700 at display sizes is enough.
Going heavier breaks the "quiet confidence" — it starts to shout.

### Tracking rules

- Negative tracking (`-0.03em` to `-0.01em`) only at display sizes (36px+)
- Neutral tracking (`0`) at heading and body sizes
- Slight positive tracking (`+0.01em`) at caption size only
- Never use uppercase letter-spacing on body or heading copy — only on labels/UI if genuinely needed

---

## Window Chrome

MACOS9_REFERENCE.md is the source of truth for all measurements, colors, and CSS implementations.
This section records only brand-specific overlays and site-specific decisions.

### Brand overlay on Platinum

**Highlight color:** Use `#378ADD` (`--color-accent`) everywhere Mac OS 9 would use the
system "Appearance" highlight color. This means:
- Menu item hover/selected state: `#378ADD` background, `#FFFFFF` text
- Text selection highlight: `#378ADD` at 40% opacity
- Window focus ring: `--color-accent` at 50% opacity (`rgba(55, 138, 221, 0.5)`)
- Control button active state: `#378ADD` tint

There is no configurable highlight color in the website. `#378ADD` is fixed.

### Window depth

Every window shell gets the hard shadow from MACOS9_REFERENCE.md (Window Shadow section):
```css
box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.35);
```

Do not add additional shadows to window content. Depth comes only from the window frame
and shadow — not from cards or layers inside the window.

### Content area padding

Window content area internal padding: `16px` on all sides. Do not use tighter or wider
padding — windows should feel substantial but not cramped.

### Scrollbars

All scrollable window content uses the custom `<ScrollArea>` component (see
ARCHITECTURE.md). The scroll arrow design follows MACOS9_REFERENCE.md (Scrollbars section).
Never use native browser scrollbars inside windows — they will not have arrows at both ends.

---

## Icon Style

### Desktop icons (32×32)

Desktop icons follow Mac OS 9 icon conventions:
- **Style:** Flat-ish, slightly perspective-tilted isometric. The Mac OS 9 icon style is not
  flat-modern (no material design) and not fully 3D (no high-spec renders). It's the specific
  "pixel-art with depth" quality of late 90s Mac icons.
- **Size:** 32×32 px art, 48×48 px hit zone
- **Rendering:** SVG preferred. If using raster, provide @2x for Retina.
- **Shadows:** A very subtle "cast shadow" below-right on the icon, matching the window
  drop shadow direction (bottom-right, hard offset)
- **Color:** Icons use the content palette. The Familiar app icon uses `#378ADD` as its
  primary color — the ghost cursor blue identifies the product icon on the desktop.

### Interface icons (inside windows and website mode)

- **Library:** Phosphor Icons (Light weight, `strokeWidth` 1.5)
- **Size:** 16px for inline/UI, 20px for standalone/emphasized
- **Color:** Inherits text color by default (`currentColor`). Use `--color-accent` only
  for interactive icons that perform an action.
- **No icon fonts.** SVG only. Import from `@phosphor-icons/react`.

### The ghost cursor

The ghost cursor is Familiar's most distinctive visual element — it appears in the demo
window and in any illustration context where Familiar is depicted "doing something."

- **Shape:** The standard macOS/Mac OS 9 arrow cursor outline — a filled arrowhead with a
  slight tail. Not a pointer finger. Not a crosshair.
- **Color:** `#378ADD` with a `0 0 8px rgba(55, 138, 221, 0.6)` glow (this is the one
  exception to the no-glow rule — the ghost cursor is supposed to look like it doesn't
  fully belong to the screen)
- **Opacity:** 0.85 — slightly translucent to communicate "ghost" quality
- **Animation:** When in motion, follows a bezier arc (not linear, not teleport).
  See ARCHITECTURE.md for the animation model.

---

## Do-Not

Visual anti-patterns that break the Familiar aesthetic. Check this before marking any
implementation task done.

### OS chrome mistakes

- **No rounded window corners.** `border-radius` on the outer window shell must be 0–2 px.
  Large radii belong to iOS, not Mac OS 9.
- **No blurred window shadows.** The window shadow is a hard 2px offset (see MACOS9_REFERENCE.md).
  A soft CSS `box-shadow` with blur immediately reads as modern macOS.
- **No red/yellow/green window controls.** Those are Mac OS X (2001+). Mac OS 9 controls
  are Platinum gray squares.
- **No Dock.** Mac OS 9 didn't have a Dock. Taskbar UI at the bottom is Windows. Neither belongs.
- **No native browser scrollbars inside windows.** They will render wrong on every OS.
  The `<ScrollArea>` component is required.
- **No circle control buttons.** Square only.
- **No pinstripes on inactive title bars.** Flat gray only when unfocused.

### Typography mistakes

- **Never use Inter, Helvetica, Arial, Roboto, or Open Sans** for content text.
  These are category defaults — they read as "no typographic opinion." Familiar has
  one (Geist). If Geist fails to load, the system-ui fallback is acceptable; a
  deliberate Inter swap is not.
- **Never use the chrome typeface (system-ui) for marketing copy.** The 12px system
  stack is for the OS chrome only. Body copy at 16px+ uses Geist.
- **No uppercase transforms on body text.** Uppercase is reserved for: captions at
  12px, button labels when genuinely necessary. It reads as shouting at body sizes.
- **No gradient text fills on headlines.** This is the most common "AI product" visual
  tell in 2024–2026. Familiar headlines are flat `#1A1A1A` or `#378ADD`. No gradients.

### Color mistakes

- **No second accent color.** `#378ADD` is the only chromatic moment. If a UI moment
  seems to need a new color, solve it with opacity, weight, or size.
- **No warm canvas.** PostHog's cream (`#EEEFE9`), macOS Sonoma's warm grays — these
  read as other brands. Familiar's backgrounds are cool (`#FFFFFF`, `#F5F6F7`).
- **No purple, no teal, no gradient mesh.** These are the visual language of "AI product"
  and actively contradict Familiar's direct, quiet-confidence positioning.
- **No saturated color outside of `#378ADD`.** All text, borders, and surfaces stay
  in the near-black / gray / white range except for the accent and the semantic colors.

### Layout and motion mistakes

- **No soft drop shadows on content cards.** Cards inside windows (if any) use a
  1px `--color-border` border, not a shadow. Depth inside a window comes from the
  window itself, not nested elevation.
- **No `ease-in-out` or `linear` transitions.** Use `cubic-bezier(0.32, 0.72, 0, 1)`
  for any UI animation. Mac OS 9 motion is snappy and physical.
- **No animated gradients as "ambient" backgrounds.** Not in the desktop, not in
  windows, not in the website mode hero. The desktop texture is flat `#335577`.
- **No floating nav bar.** The Mac OS 9 menu bar is flush to the top of the viewport,
  full width, no float. In website mode, the equivalent nav is also full-width.
- **No centered hero headline.** Website mode hero is left-aligned. Centered heroes
  read as "startup website." The layout is asymmetric (large type left, visual right).

### Content mistakes (cross-reference with POSITIONING.md)

- All forbidden phrases from POSITIONING.md (forbidden-phrases section) apply here too.
- **No "AI" as a visual identity.** No robot icons, no neural-network illustrations,
  no brain graphics. Familiar's identity is the ghost cursor and the Mac OS 9 chrome —
  not generic AI imagery.
- **No mascot.** Confirmed in DECISIONS.md. The ghost cursor is the visual identity.

---

## Token Implementation Note

All `--platinum-*` and `--color-*` tokens are declared in `app/globals.css` once.
Tailwind v4 reads them via `@theme` (CSS-first config — no `tailwind.config.ts`).
The swatch page at `/tokens` (Part 4 of this session) verifies all tokens visually
before Session 4 begins implementation.
