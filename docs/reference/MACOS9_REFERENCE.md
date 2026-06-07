# MACOS9_REFERENCE.md — Mac OS 9 Platinum Chrome Specification

> **STATUS: COMPLETE — Session 2**
>
> This document is the implementation ground truth for all Mac OS 9 chrome in familiar-site.
> Implementation sessions MUST read this before touching any window chrome.
> If a question about Platinum UI isn't answered here, raise it as a decision — don't improvise.

---

## Easy Tells

**The pre-commit checklist.** Before finishing any window chrome work, verify every item.

1. **Square window controls** — buttons are squares (~13×13 px). NOT circles. Circles = Mac OS X. Squares = Mac OS 9.
2. **Scrollbar arrows at both ends** — the vertical scrollbar has a ↑ arrow at the TOP and a ↓ arrow at the BOTTOM of the track. Not just one end.
3. **Title bar height ~22 px** — modern title bars are 28–52 px. Platinum's is narrow.
4. **Pinstripes on active window only** — horizontal 1 px alternating stripe pairs tile across the active window title bar. The inactive title bar is flat gray with no pinstripes.
5. **Window corners square or near-zero radius** — border-radius 0–2 px on the outer window shell. Not a large modern radius.
6. **Resize handle only at bottom-right** — a small hatched corner grip (~16×16 px). Not edge-draggable (that's OS X/Windows behavior).
7. **Scrollbar thumb is a flat beveled slab** — not a rounded pill. The Mac OS 9 thumb looks like a raised gray rectangle with a 1 px light top-left highlight and 1 px dark bottom-right shadow.
8. **Title text is horizontally centered** — not left-aligned (that's modern macOS and Windows). The title sits centered between the left control cluster and the right control cluster.
9. **Default dialog button has a thick outer ring** — the default action button in dialogs is surrounded by a 2–3 px dark border ring, distinct from focus styling.
10. **Menu bar is flush to the top edge** — zero gap between the menu bar and the top of the viewport. The Apple menu is the leftmost item.

---

## Title Bar

### Dimensions
- **Height:** 22 px (from outer top border to top of content area, inclusive of the 1 px top outer border)
- **Width:** full window width minus 1 px left and 1 px right outer borders
- **Minimum window width:** 128 px (title is ellipsized before control buttons are affected)

### Pinstripe pattern — active window
The active title bar tiles horizontal 1 px alternating stripes across its full width.

```css
background: repeating-linear-gradient(
  to bottom,
  #B8B8B8 0px,
  #B8B8B8 1px,
  #D8D8D8 1px,
  #D8D8D8 2px
);
```

Colors:
- Dark stripe: `#B8B8B8`
- Light stripe: `#D8D8D8`
- Each stripe: 1 px. Pattern repeats every 2 px.

The contrast gap is intentionally wide — the stripes need to read visually at a glance. Values that are too close (`#CB`/`#DE`) produce an undifferentiated texture rather than visible stripes.

**CSS variable (define in globals.css):**
```css
--platinum-pinstripe: repeating-linear-gradient(
  to bottom,
  #B8B8B8 0px, #B8B8B8 1px,
  #D8D8D8 1px, #D8D8D8 2px
);
```

### Title bar — inactive window
When the window does not have focus:
- Background: flat `#D5D5D5` (no pinstripes — note: `#D4D0C8` is a Windows 95 warm gray; Platinum inactive stays in the cool gray family)
- Title text: `#808080`
- **Control buttons are hidden on inactive windows.** This is the single biggest OS 9 tell — inactive windows show only the title text with faint ghosted button outlines, no visible close/collapse/zoom. Implement as `opacity: 0` on the button content (`transition: opacity 150ms`) and restore to `opacity: 1` when the window receives focus. This is a deliberate departure from default (visible-but-dimmed) and is the correct OS 9 behavior.

### Title text
- Size: **12 px** (deliberately scaled up from the original 11 px spec for modern legibility; hold this consistently across all chrome text)
- Weight: 700 (bold)
- Color active: `#1A1A1A`
- Color inactive: `#808080`
- Alignment: **horizontally centered** between the leftmost button edge and the rightmost button edge
- Overflow: `text-overflow: ellipsis` before touching either control cluster (8 px clearance on each side)
- Font: see the Typography section below

### Outer window border (the 3D bevel)
- 1 px solid `#808080` on all four outer sides
- Inside that: 1 px `#FFFFFF` highlight on the **top and left** edges
- Inside that: 1 px `#888888` shadow on the **bottom and right** edges

In CSS:
```css
border: 1px solid #808080;
box-shadow:
  inset 1px 1px 0 #FFFFFF,
  inset -1px -1px 0 #888888;
```

All three layers are required to produce the "raised Platinum frame." A bevel with only the `#FFFFFF` top-left highlight looks raised on two sides and flat on the other two — incomplete and wrong.

### Window Shadow
Mac OS 9 windows cast a **hard 2 px offset shadow** — no blur, no spread, flat offset to the bottom-right. This is one of the clearest Mac OS 9 tells; a modern soft CSS shadow instantly breaks the illusion.

```css
box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.35);
```

**Rules:**
- Offset: `2px 2px`
- Blur: `0px` — no blur. A blurred shadow reads as modern macOS. Do not add blur.
- Color: `rgba(0, 0, 0, 0.35)` — semi-transparent so the desktop texture shows through faintly
- Apply to the outermost window `div`, not the title bar or content area
- Active and inactive windows get the same shadow (focus doesn't change the shadow)

---

## Window Controls

### Layout
Three buttons in the title bar. In Mac OS 9, the **close box is on the left** and the **zoom box is on the far right**. The **collapse (windowshade) box** is immediately to the left of the zoom box.

```
| [close] ────────── WINDOW TITLE ────────── [collapse][zoom] |
```

### Positions
- **Close box:** 6 px from the left inner edge, vertically centered in the title bar
- **Zoom box:** 6 px from the right inner edge, vertically centered
- **Collapse box:** 23 px from the right inner edge (6 px outer + 13 px zoom width + 4 px gap = 23 px), vertically centered
- **Gap between collapse and zoom:** 4 px

### Sizes
Each button: **13 × 13 px** square.

### Appearance and states

| State | Fill | Outer border | Inner highlight | Glyph |
|-------|------|--------------|-----------------|-------|
| Default | `#CCCCCC` | 1 px `#808080` | 1 px `#FFFFFF` top+left | none |
| Hover | `#BBBBBB` | 1 px `#606060` | 1 px `#DDDDDD` top+left | × / + / – (see below) |
| Pressed | `#AAAAAA` | 1 px `#404040` | inverted (dark top+left) | same as hover |

**On hover glyphs:**
- Close box: `×` centered at 8 px, weight 700, `#1A1A1A`
- Zoom box: `+` centered at 8 px, weight 700, `#1A1A1A`
- Collapse box: `–` centered at 8 px, weight 700, `#1A1A1A`

The top+left 1 px inner highlight + bottom+right 1 px dark outer border creates the 3D raised button illusion. On press, swap: the button inverts (looks pushed in).

**Inactive window button state:** When the window loses focus, all three control buttons (`opacity: 0` on their content). The button shell remains — a very faint 13×13 ghost outline (`opacity: 0.2`) indicates where the buttons are. Restore to `opacity: 1` on focus. Use `transition: opacity 150ms ease`. This is the single most visually distinct OS 9 behavior — every other windowing system keeps controls visible on inactive windows. Getting this right immediately reads as "Mac."

### Windowshade behavior
Clicking the collapse button collapses the window to title-bar-only height (content area hidden, `height: 0`). The window retains its width. A second click restores. This behavior must be supported in the `WindowManager` store as `minimizeWindow` (see `ARCHITECTURE.md (window-manager-contract section)`, which exists and is complete).

### NOT present in Mac OS 9
- ❌ Red / yellow / green colored dots (Mac OS X)
- ❌ Circle shapes (Mac OS 9 = squares only)
- ❌ SF Symbols or any modern icon glyph
- ❌ A Dock-style minimize animation (the Dock didn't exist until Mac OS X)

---

## Scrollbars

### Why custom implementation is required
Mac OS 9 scrollbars have **scroll arrows at both ends of the track**. CSS `scrollbar-*` APIs cannot produce this. The `<ScrollArea>` component must be custom-built with `overflow: hidden` on the content container and a rendered overlay for the track, thumb, and arrows. See `ARCHITECTURE.md (scrollbars section)`.

### Anatomy — vertical scrollbar
```
┌────┐  ← top arrow (↑) — scrolls up
│    │  ← track (stippled)
│ ■■ │  ← thumb
│    │  ← track (stippled)
└────┘  ← bottom arrow (↓) — scrolls down
```

Both arrows are always rendered. Both are interactive.

### Dimensions
- Scrollbar width (vertical): **16 px**
- Scrollbar height (horizontal): **16 px**
- Arrow button area: **16 × 16 px** each
- Track: occupies the remaining height between the two arrow buttons
- Minimum thumb height: **24 px**
- Thumb height scales proportionally: `visibleRatio * trackHeight`

### Colors

| Part | Color |
|------|-------|
| Track background | stipple: `#C8C8C8` / `#D4D4D4` (see below) |
| Thumb fill | `#AAAAAA` |
| Thumb top+left highlight | 1 px `#D0D0D0` |
| Thumb bottom+right shadow | 1 px `#808080` |
| Arrow button fill | `#BBBBBB` |
| Arrow button pressed | `#999999` |
| Arrow glyph | filled triangle `#1A1A1A`, ~6 × 4 px |

### Track stipple pattern
The scrollbar track uses a 2 × 2 px checkerboard. In CSS:
```css
background-image: repeating-conic-gradient(#C8C8C8 0% 25%, #D4D4D4 0% 50%);
background-size: 2px 2px;
```
This is one of the most recognizable Platinum details and is highly achievable in CSS.

### Scroll corner
When both scrollbars are present, the 16 × 16 px bottom-right corner box is flat `#BBBBBB` — no resize affordance here. The resize handle is in the window's outer bottom-right (see the Resize Handle section above), not the scroll corner.

---

## Resize Handle

- **Position:** bottom-right corner of the window, inside the 1 px outer border — a 16 × 16 px zone
- **Appearance:** hatch marks — diagonal parallel lines in `#808080` on `#BBBBBB`

```css
background-color: #BBBBBB;
background-image:
  linear-gradient(135deg, #808080 1px, transparent 1px),
  linear-gradient(135deg, #808080 1px, transparent 1px);
background-size: 4px 4px;
background-position: 0 0, 2px 2px;
```

- **Cursor:** `nwse-resize` on hover
- **Not present** on non-resizable windows (`isResizable: false`)

---

## Typography

### Charcoal — the Mac OS 9 system font
Charcoal is Apple's proprietary sans-serif for Mac OS 8/9. It is not available as a web font. It is a low-contrast grotesque, slightly rounded terminals, x-height similar to Helvetica Neue — neutrally legible at 11–12 px screen sizes.

### Web substitution strategy

For **window chrome text** (title bars, menus, labels):
```css
font-family: "Chicago", "Charcoal", ui-sans-serif, -apple-system, system-ui, sans-serif;
```
On macOS, `-apple-system` resolves to SF Pro which is acceptable for small UI labels. The `Chicago` and `Charcoal` declarations trigger for anyone who has them installed (rare, but harmless).

For **content inside windows** (body copy, headings, descriptions):
Defined in `BRAND.md (typography section)`. Content typeface differs from chrome typeface.

### Chrome font size scale

| Element | Size | Weight |
|---------|------|--------|
| Window title | 12 px | 700 |
| Menu bar items | 12 px | 400 |
| Dialog button labels | 11 px | 400 |
| Desktop icon labels | 11 px | 400 |
| Tooltip text | 11 px | 400 |

### Anti-aliasing note
Mac OS 9 did not anti-alias text below ~16 px. For implementation: allow the browser default (`antialiased`). Do not use `-webkit-font-smoothing: none` — it reads as a rendering bug on modern displays, not as authentic pixelation. The chrome font stack (`ui-sans-serif`) at 12 px on a modern display looks close enough.

---

## Menu Bar

### Position and dimensions
- `position: fixed; top: 0; left: 0; right: 0`
- **Height:** 22 px
- **Background:** flat `#DDDDDD` (no pinstripes — menu bar is always flat)
- **Bottom border:** 1 px solid `#808080`

### Layout (left → right)
```
[ Apple ▸ ] [ Familiar ]  [ File ]  [ Edit ]  [ View ]    ···    [ 10:42 AM ]
```

1. **Apple menu** — leftmost. Use the **6-color rainbow Apple logo** SVG — the historically correct icon for Mac OS 9 (it ran 1977–2001 before Mac OS X replaced it with a solid translucent apple). The rainbow apple is one of the most recognizable and evocative details of this era. If trademark concerns arise post-launch, swap to a monochrome apple — but start with rainbow. Clicking opens a dropdown; on the marketing site this is decorative or an Easter egg.
2. **Application name "Familiar"** — bold, immediately right of Apple menu, 8 px gap. This is the active application's name.
3. **Application menus** — File, Edit, etc. Each 8 px horizontal padding on each side.
4. **Clock** — rightmost. Updates every minute. Format: `10:42 AM`.

### Menu item states

| State | Background | Text |
|-------|-----------|------|
| Default | transparent | `#1A1A1A` |
| Hover / selected | `#378ADD` (brand highlight color) | `#FFFFFF` |
| Disabled | transparent | `#999999` |

The OS 9 default highlight color is `#2244CC`. Familiar uses `#378ADD` consistently across all selection/highlight moments.

### Dropdown menus
- Background: `#FFFFFF`
- Outer border: 1 px `#808080` on all sides
- Drop shadow: 2 px offset to the right and bottom, color `#404040`, no blur (this is the flat "Mac menu shadow" — not a CSS blur shadow)
- Item height: 18 px, 8 px horizontal padding
- Separator: 1 px `#C0C0C0` rule
- Checkmark prefix: `✓` at left margin when item is active

---

## Desktop

### Background
- **Base color:** `#335577` — a deep teal-blue that approximates the Mac OS 9 default desktop pattern
- **Optional texture:** A very subtle 2 × 2 px dither overlay at 5–10% opacity. Keep it subtle — the windows are the focus, not the desktop texture.
- The desktop is the base layer. All windows render above it.

### Desktop icons
- Icon art size: 32 × 32 px
- Total click zone: 48 px square (8 px padding around the icon art)
- Label: 11 px, `#FFFFFF`, centered below the icon, truncated at ~12 characters with ellipsis
- Label selected: `#FFFFFF` text on `#378ADD` highlight background
- Icon selected: a blue tint overlay on the icon graphic

### Icon grid
Icons snap to a 64 × 64 px grid on the desktop. Default positions for all desktop icons are defined per breakpoint in `lib/windows.ts`.

---

## Trash

### Position
Bottom-right corner of the desktop. Fixed to the viewport. Z-index below all windows.

### Visual states
- **Empty:** the classic Mac trash can — a wire-mesh wastebasket outline icon, 32 × 32 px
- **Full:** same can shape with crumpled paper visible above the rim
- Label: "Trash" in 11 px, `#FFFFFF`, below icon

### Interaction
At launch the Trash is decorative — clicking it does nothing functional. On hover: 1.05 scale with a subtle icon highlight. The trash does not receive dragged items at launch (post-launch feature).

---

## Dialog Boxes

### Chrome
Dialog boxes use the same Platinum outer bevel (1 px `#808080` outer border + 1 px `#FFFFFF` inner highlight on top+left). Background is `#EEEEEE` (slightly lighter than `#DDDDDD` — dialogs feel slightly "elevated" from the desktop).

Dialogs do not always have a title bar. Alert dialogs are chrome-free rectangles. Sheet dialogs attach to their parent window.

### Buttons in dialogs
- Shape: slightly rounded rect — `border-radius: 4px` (more rounded than window controls)
- Height: 20 px
- Padding: 0 8 px
- Background: `#CCCCCC`
- Border: 1 px `#808080` outer + 1 px `#FFFFFF` top+left inner bevel
- Pressed: inverted bevel, `#AAAAAA` background

### Default button (Return key action)
The default button has a **thick dark ring** just outside its border:
```css
outline: 2px solid #1A1A1A;
outline-offset: 1px;
```
In Mac OS 9, this ring pulses (alternating dark/medium) at ~1 Hz. Implement as a `@keyframes` CSS animation:
```css
@keyframes platinum-default-pulse {
  0%, 100% { outline-color: #1A1A1A; }
  50%       { outline-color: #555555; }
}
animation: platinum-default-pulse 0.56s ease-in-out infinite;
```

### Button layout
Mac convention: Cancel on the left, default action (OK/Save/Open) on the right. Default is always on the right and pulses.

---

## Platinum Color System

The complete Platinum chrome palette. These are the **chrome-layer tokens**. `BRAND.md (palette section)` references these as the chrome sub-layer and adds content-layer tokens (body type, accent colors, etc.) on top. Do not duplicate these in BRAND.md — import by reference. The CSS variables are defined once in `app/globals.css` and used in both chrome components and BRAND.md semantic mappings.

| CSS var name | Hex | Role |
|---|---|---|
| `--platinum-bg` | `#DDDDDD` | Menu bar, inactive surfaces |
| `--platinum-mid` | `#CCCCCC` | Button faces, control backgrounds |
| `--platinum-dark` | `#AAAAAA` | Scrollbar thumb, pressed states |
| `--platinum-border-outer` | `#808080` | Window border, scrollbar track border |
| `--platinum-border-inner` | `#FFFFFF` | Inner 3D bevel highlight |
| `--platinum-stripe-a` | `#B8B8B8` | Pinstripe — dark band |
| `--platinum-stripe-b` | `#D8D8D8` | Pinstripe — light band |
| `--platinum-border-inner-shadow` | `#888888` | Inner 3D bevel shadow (bottom+right) |
| `--platinum-title-inactive` | `#D5D5D5` | Inactive title bar (flat, cool gray) |
| `--platinum-content-bg` | `#FFFFFF` | Window content area default |
| `--platinum-desktop-bg` | `#335577` | Desktop background |
| `--platinum-text` | `#1A1A1A` | Primary label text |
| `--platinum-text-inactive` | `#808080` | Inactive/disabled text |
| `--platinum-highlight` | `#378ADD` | Selection highlight (brand anchor) |
| `--platinum-scrollbar-track-a` | `#C8C8C8` | Scrollbar track stipple dark |
| `--platinum-scrollbar-track-b` | `#D4D4D4` | Scrollbar track stipple light |

---

## Web Adaptation Notes

### Retina / HiDPI displays
Mac OS 9 was designed for **pixel-precise rendering at 1× scale**. At 2× (Retina), the pixelated quality is lost — this is expected and acceptable. Two approaches:
- **Accept the modern rendering** — the spirit of Mac OS 9 without pixel-level fidelity (recommended)
- **Use `image-rendering: pixelated`** on specific icon elements to force crisp 2× rendering (test carefully — can look harsh)

Pinstripes and hatch patterns must use integer pixel sizes (`1px` stripes, `2px` stipple) so they render correctly at all DPR values. Use `repeating-linear-gradient` and `repeating-conic-gradient` — these are GPU-composited and DPI-aware.

### Motion
Mac OS 9 had minimal animation:
- Window open/close: a brief "zoom-out" outline effect (a rect expanding from the icon to the window bounds)
- Window minimize: the windowshade collapse (the window height collapses to the title bar)

For familiar-site: implement the zoom-rect open animation if it doesn't hurt performance. The windowshade collapse should animate (CSS `height` transition on the content area). Keep motion subtle — OS 9 was not animated.

### Minimum window sizes
Match Mac OS 9 behavior: windows cannot be resized below ~128 × 64 px. The `resizeWindow` action in the Zustand store should clamp to these minimums.
