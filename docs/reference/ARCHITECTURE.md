# ARCHITECTURE.md — familiar-site

System architecture for the familiar-site Next.js app. This document answers the questions that `CLAUDE.md` doesn't: data models, state homes, component contracts, routing strategy, and the demo pipeline. Read this before any implementation session (Sessions 4+).

---

## Mental model first

The site has two distinct rendering modes that share all content:

```
DESKTOP MODE (default)
  A Mac OS 9 desktop rendered in the browser viewport.
  Windows are draggable, overlapping, resizable.
  Each "app" window is a React component mounted inside a chrome wrapper.
  Navigation = opening/closing/focusing windows, not page loads.

WEBSITE MODE (toggled)
  A conventional vertical-scroll marketing layout.
  Same content as Desktop mode, different arrangement.
  Standard Next.js page layout.
```

These are NOT two separate pages. They are two layout strategies over the same content. The toggle switches the layout; the content components are shared.

---

## Routing strategy

```
/              → Homepage (Desktop mode by default)
/docs          → Docs placeholder (opens in-window on desktop, own page in website mode)
/tokens        → Dev-only swatch page (Session 2, never linked from homepage)
```

**All "navigation" on the desktop happens via window state, not URL changes.**
- Clicking "About" opens a window. The URL stays `/`.
- Clicking "Docs" opens the docs window. The URL stays `/`.
- The "website mode" toggle switches layout but stays on `/`.

**Why not deep-link windows via URL hash?** Tempting, but it complicates the window manager and buys nothing at launch. Revisit post-launch if SEO or sharing is a need.

**`/docs` as a separate route:** Exists so the page can be crawled and linked directly even in website mode. In desktop mode, navigating to `/docs` redirects to `/` and opens the docs window.

---

## Window data model

Every window in the window manager is one of these:

```typescript
type WindowState = {
  id: string;              // stable, e.g. "about", "demo", "features", "docs"
  title: string;           // title bar text — from COPY.md §window-title-{id}
  position: { x: number; y: number };  // top-left in desktop coordinates (px)
  size: { width: number; height: number };
  isMinimized: boolean;
  zIndex: number;          // managed by WindowManager, never set manually
  isCloseable: boolean;    // some windows can't be closed (e.g. main desktop)
  isResizable: boolean;
};

type WindowRegistry = {
  [id: string]: {
    state: WindowState;
    component: React.ComponentType; // the content component
  };
};
```

**Default layout:** the initial positions and sizes of all windows on a fresh load. Defined as constants per viewport breakpoint (not generated dynamically). Think of it like a `.layout` file — the "screenshot" the designer intended.

---

## State architecture

### Window state: Zustand

Window state (positions, z-indices, open/closed, minimized) lives in a **Zustand store**.

- **Why Zustand, not React context?** The window manager needs to update z-index on every window click without re-rendering every window. Context rerenders the whole tree. Zustand with selectors rerenders only the affected window.
- **Why not URL?** Window positions in the URL are noisy and confusing for users sharing links.
- **Persistence:** On first load, use the default layout. Optionally persist to `sessionStorage` (not `localStorage`) so the layout survives a refresh within a tab but resets on a new visit. Do not persist cross-session — every first visit gets the designed layout.

### Website mode: URL param + localStorage

```
?mode=website  →  website mode
(no param)     →  desktop mode (default)
```

- **URL param** makes it shareable: someone who prefers the conventional layout can bookmark `/?mode=website`.
- **localStorage** remembers the preference within the session so a reload doesn't reset it.
- Priority: URL param > localStorage > default (desktop).
- The toggle writes both the URL (via `router.push`) and localStorage.

### Copy: static constants file (generated from COPY.md)

Copy does NOT come from an API. It is statically typed:

```typescript
// lib/copy.ts — generated from COPY.md in Session 3
export const copy = {
  "hero-headline": "...",
  "hero-subhead": "...",
  // etc.
} as const;

export type CopyKey = keyof typeof copy;
```

Components import `copy["hero-headline"]` — never hard-code strings. The `as const` gives TypeScript exhaustive checking: if a copy key is removed, every reference errors at build time.

**How `lib/copy.ts` gets written:** In Session 3 (copy session), the copy is decided as markdown in `COPY.md`. At the start of Session 5 (content session), `lib/copy.ts` is written by translating COPY.md section IDs directly to object keys. This is a manual one-time translation — not a build-time codegen step. Codegen would add complexity for no benefit at this scale.

---

## Component architecture

```
app/
  page.tsx                  — Root page. Renders <Desktop> or <WebsiteLayout>
                              based on mode state. No content here.
  layout.tsx                — Global HTML shell, fonts, metadata
  tokens/page.tsx           — Dev-only swatch page (Session 2)
  docs/page.tsx             — Docs placeholder (redirects to / in desktop mode)

components/
  desktop/
    Desktop.tsx             — The full Mac OS 9 desktop scene
    WindowManager.tsx       — Zustand store + provider. Manages all window state.
    Window.tsx              — Single window chrome (title bar, controls, scroll, resize)
    MenuBar.tsx             — Top menu bar (Apple menu, app name, clock)
    Trash.tsx               — Bottom-right Trash icon
    DesktopIcon.tsx         — Clickable icon on the desktop background

  windows/
    AboutWindow.tsx         — Hero/about content
    DemoWindow.tsx          — The scripted Familiar demo
    FeaturesWindow.tsx      — Feature breakdown (modes, privacy, etc.)
    DocsWindow.tsx          — Docs placeholder content
    [future: PricingWindow.tsx, etc.]

  website/
    WebsiteLayout.tsx       — Conventional marketing layout shell
    HeroSection.tsx         — Website mode hero
    FeaturesSection.tsx     — Website mode features
    CTASection.tsx          — Website mode CTA
    [etc.]

  demo/
    DemoPlayer.tsx          — Orchestrates the scripted demo sequence
    GhostCursor.tsx         — The animated ghost cursor (bezier flight)
    SpeechBubble.tsx        — The streaming speech bubble
    DemoScript.ts           — The sequence definition (data, not React)

  ui/
    Button.tsx              — Shared button (inside conventional layout)
    ScrollArea.tsx          — Mac OS 9 scrollbar-styled scroll container
    ModeToggle.tsx          — The "Switch to website mode" toggle

lib/
  copy.ts                   — All on-page copy, keyed by section ID
  windows.ts                — Default window layouts per breakpoint
  useWindowManager.ts       — Zustand store definition + selectors
  useMode.ts                — Desktop/website mode state hook
```

---

## Window manager contract

The `WindowManager` exposes these actions (via Zustand):

```typescript
type WindowManagerStore = {
  windows: Record<string, WindowState>;

  // Actions
  focusWindow: (id: string) => void;          // brings to front (max zIndex + 1)
  moveWindow: (id: string, pos: {x,y}) => void;
  resizeWindow: (id: string, size: {w,h}) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  openWindow: (id: string) => void;           // restores if minimized, focuses if open
  closeWindow: (id: string) => void;          // only if isCloseable
};
```

**Drag implementation:** Title bar has `onPointerDown` → sets dragging state → `onPointerMove` on `document` → `onPointerUp` clears. Uses pointer events (not mouse events) for consistent cross-device behavior. No drag libraries — the logic is simple enough to own.

**Z-index strategy:** A single monotonically incrementing counter. `focusWindow` assigns `++maxZ`. No sorting, no recomputation. Windows never fight over z-index.

**Boundary constraints:** Windows cannot be dragged fully off-screen. Clamp position so at least the title bar remains visible (min: `{x: -width+100, y: 0}`, max: `{x: viewportWidth-100, y: viewportHeight-30}`).

---

## Demo system architecture

The scripted Familiar demo is the most architecturally distinct piece. It needs its own pipeline.

### The sequence model

```typescript
// components/demo/DemoScript.ts

type DemoStep =
  | { type: "ghost-fly"; to: { x: number; y: number }; duration: number }
  | { type: "ghost-show"; at: { x: number; y: number } }
  | { type: "ghost-hide" }
  | { type: "bubble-show"; text: string; streamMs: number }  // char-by-char streaming
  | { type: "bubble-hide" }
  | { type: "screen-change"; screenshot: string }  // swap the "screen" background image
  | { type: "wait"; ms: number }
  | { type: "type-text"; target: string; text: string }  // animate typing in a fake field
  | { type: "click-ripple"; at: { x: number; y: number } }  // click visual effect

export const DEMO_SCRIPT: DemoStep[] = [
  // Defined in Session 6 — the specific sequence is a copy/creative decision
];
```

### The player

`DemoPlayer.tsx` is a pure state machine — no timers in React, no useEffect chains:

```
STATES: idle → playing → paused → complete
```

The player uses a `useRef` to hold the sequence index and a single `requestAnimationFrame` loop. Each step runs, waits its duration, advances. The ghost cursor position and bubble text are the only React state that drives renders.

**Why not a CSS animation or GSAP timeline?** The sequence needs to be easily editable as data (a copy decision, not a CSS decision), and needs to react to visibility (pause when the window is not visible).

**Autoplay trigger:** The demo starts when the `DemoWindow` is visible in the viewport AND has been focused (not just rendered). It replays on focus after completion. A "Replay" button is always visible in the window.

**Ghost cursor coordinates:** All `{x, y}` in the demo script are relative to the `DemoWindow`'s content area, not the viewport. This means the demo looks correct regardless of where the user has dragged the window.

---

## Mac OS 9 chrome implementation

### The Window component contract

```typescript
type WindowProps = {
  id: string;
  title: string;                    // from COPY.md §window-title-{id}
  children: React.ReactNode;        // the window's content component
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  isResizable?: boolean;            // default: true
  isCloseable?: boolean;            // default: true
  scrollable?: boolean;             // default: true — shows Mac OS 9 scrollbars
};
```

### Scrollbars

Mac OS 9 scrollbars have arrows at **both** ends of the track (top AND bottom for vertical; left AND right for horizontal). This is implemented as a custom `<ScrollArea>` component — not a native scrollbar — because CSS cannot place arrows at both ends with the `scrollbar-*` APIs.

The `ScrollArea` is a div with `overflow: hidden` + a custom track-and-thumb overlay driven by scroll position. The arrows at both ends are actual clickable `<button>` elements that programmatically scroll the content.

**Do not use `overflow-y: auto` with `scrollbar` CSS properties.** It cannot produce the Mac OS 9 arrow layout.

### Title bar pinstripes

Implemented as a CSS `repeating-linear-gradient`, not an image. The exact colors and stripe width come from `MACOS9_REFERENCE.md §title-bar` (written in Session 2). The gradient is defined as a CSS custom property so it's editable in one place.

### Window controls

Three square buttons (not circles — that's macOS X). Each has hover and active states. The close button has a visual affordance on hover (an × glyph). Clicking close calls `windowManager.closeWindow(id)`. These are plain `<button>` elements positioned absolutely in the title bar.

---

## Responsive strategy

The desktop metaphor at narrow viewports is a different UX problem. Decisions:

- **≥1024px:** Full desktop metaphor. Windows are draggable and overlapping.
- **768–1023px:** Desktop with simplified layout. Windows are stacked (not freely positioned), still have Mac OS 9 chrome. Dragging disabled.
- **<768px:** Website mode is forced on. Desktop mode is unavailable at mobile widths — the metaphor doesn't translate. The mode toggle is hidden. A banner explains this.

This is in `DECISIONS.md` — it's a product decision, not an implementation detail.

---

## Performance considerations

- **No dynamic imports for window content.** At this scale (5–7 windows), the bundle size doesn't warrant it. All window components are statically imported.
- **Demo assets (screenshots) are in `public/demo/`.** They are `<img>` tags, not CSS backgrounds, so they can be preloaded with `<link rel="preload">`.
- **The ghost cursor uses `transform: translate()` only.** No `top`/`left` during animation — GPU composited, no layout thrash.
- **Window drag uses `transform: translate()`.** Same reason. The window's CSS position is `position: fixed` with an initial `translate` derived from `state.position`.

---

## What's missing / deferred

- **SEO:** The desktop metaphor is mostly client-rendered. A short static `og:description` and title is fine for launch; structured data and full SSR of window content is a post-launch concern.
- **Analytics:** PostHog (fitting) — one script tag, post-launch.
- **Accessibility:** The desktop metaphor has real accessibility challenges (drag interactions, focus management across overlapping windows). Session 7 (polish) sets a baseline; full WCAG compliance is post-launch.
- **Demo script content:** The specific sequence is a creative/copy decision, not an architecture decision. It's defined in Session 6 using the data model above.

---

## Review of current reference doc gaps (against this architecture)

| Doc | Issue | Fix |
|-----|-------|-----|
| `CLAUDE.md` §file-structure | Lists folders but not what goes in each or the component contracts | Update after Session 4 with actual paths |
| `DECISIONS.md` | Missing: routing strategy, website-mode state home, window state persistence, mobile breakpoints | Add those decisions |
| `PROMPTS_BACKLOG.md` Session 4 | "Window manager" is listed but demo system isn't mentioned — Session 6 will be underspecified | Session 6 prompt should reference `ARCHITECTURE.md §demo` |
| `PROMPTS_BACKLOG.md` Session 5 | "`lib/copy.ts` translation from COPY.md" is implicit | Make it explicit in the prompt |
| `BRAND.md` stub | Doesn't mention `ScrollArea` custom component or why native scrollbars can't be used | Add a note to the §window-chrome section |

These gaps don't block Session 1 (positioning) or Session 2 (brand). They matter from Session 4 onward. The Session 4 prompt in `PROMPTS_BACKLOG.md` should reference `ARCHITECTURE.md` as a required read.
