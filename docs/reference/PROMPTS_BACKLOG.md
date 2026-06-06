# familiar-site — Session Backlog

> Sessions in order. Each session is fully self-contained (see PROMPTS.md for conventions).
> Do not start a session until the previous one's success conditions are met.
> Sessions 1–3 produce no UI code. Session 4 is when pixels happen.

---

## SESSION 0 — Repo Init + Reference Docs
**Status: COMPLETE** — commit `97f065e` on `main`.
This session seeded all `docs/reference/` stubs, wrote `CLAUDE.md`, `DECISIONS.md`, `README.md`, `PROMPTS.md`, `PROMPTS_BACKLOG.md`, and this file. No Next.js project yet. No Tailwind. No UI.

---

## SESSION 1 — Positioning
**Branch:** `copy/session-01-positioning`
**Output:** `docs/reference/POSITIONING.md` (fully written)
**Depends on:** Session 0 (this repo exists with reference docs)

**Goal:** Lock in who Familiar is for, what it does, how we talk about it, and what we never say.

```
Read CLAUDE.md and docs/reference/CLAUDE.md.
Read docs/reference/FAMILIAR_README.md and docs/reference/FAMILIAR_MODES.md in full.
Read docs/reference/INSPIRATION_POSTHOG.md for framing context.
Read docs/reference/posthog-founders-design.md for product-site philosophy.
Create a new git branch named copy/session-01-positioning.

CONTEXT (session 1 of N, positioning phase — no UI code this session):
- Familiar is a Mac-native ambient agent. It reads your screen and either guides you
  (ghost cursor shows where to click, you click) or acts for you (ghost cursor shows,
  real cursor follows). The ghost cursor IS the product's visual identity.
- The website is a Mac OS 9 desktop. Visitors land on a Platinum-chrome desktop with
  draggable windows. This is not decoration — the OS metaphor is the product's personality.
- This session produces POSITIONING.md only. No Tailwind, no Next.js scaffolding,
  no UI code of any kind — only markdown documents.
- Constraint: no rendered pixels before COPY.md is written (Option C, DECISIONS.md).

PART 1 — One-sentence pitch
Write the single sentence that explains what Familiar is. Must pass: (a) a non-technical
person understands it in one read, (b) it differentiates from generic "AI assistant" framing,
(c) it captures the ghost cursor's physicality. Offer 3 candidates with a recommendation.

PART 2 — Audience and use cases
Define the primary audience (who it's for today, at launch), the secondary audience
(who it could grow to), and the 3–5 specific use cases that will appear on the homepage.
Use cases should be concrete ("book a flight in Safari while I watch") not abstract
("automates repetitive tasks").

PART 3 — Voice and tone
Define the voice for all copy: headline register, body copy register, error message register,
UI label register. Give 3–5 "sounds like / doesn't sound like" examples for each.
List the forbidden phrases — words/framings that would make the site sound like every other
AI product.

PART 4 — Value propositions (ordered)
List the 3–5 value props in priority order. These become the homepage sections.
For each: a one-line headline form, a one-sentence explanation, and one concrete example.

PART 5 — Write POSITIONING.md
Synthesize PARTS 1–4 into the final file. Structure: §pitch, §audience, §use-cases,
§voice, §forbidden-phrases, §value-props. This file is referenced by every subsequent
copy session.

SUCCESS CONDITIONS:
1. POSITIONING.md exists and has all five sections populated.
2. The one-sentence pitch is written in plain English: no jargon, no acronyms, uses
   concrete nouns (cursor, screen, click, Mac) rather than abstractions (workflow,
   automation, intelligence, seamless).
3. The forbidden phrases list has at least 8 entries with brief rationale for each.
4. The value props are in priority order and match what's visible in FAMILIAR_README.md
   (nothing promised that doesn't exist in the product today).
5. The voice section has at least one "sounds like / doesn't sound like" example for
   each register (headline, body, UI label).
```

---

## SESSION 2 — Brand Foundation
**Branch:** `brand/session-02-brand-foundation`
**Output:** `docs/reference/BRAND.md`, `docs/reference/MACOS9_REFERENCE.md`, initial Tailwind tokens
**Depends on:** Session 1 (POSITIONING.md written)

**Goal:** Lock in the palette, type stack, and Mac OS 9 treatment rules. Produce a single rendered swatch/type page to verify tokens visually.

```
Read CLAUDE.md and docs/reference/CLAUDE.md.
Read docs/reference/POSITIONING.md (output of Session 1).
Read docs/reference/posthog-design-reference.md — STRUCTURAL REFERENCE ONLY (do not copy palette/type/mascots; use it for component vocabulary and design-system structure).
Read docs/reference/INSPIRATION_POSTHOG.md for scope guidance.
Create a new git branch named brand/session-02-brand-foundation.

CONTEXT (session 2 of N, brand phase):
- The aesthetic is Mac OS 9 Platinum. Not Mac OS X Aqua. Not iOS. Mac OS 9.2.2.
- Familiar's accent color is #378ADD (the ghost cursor's blue). This is the one
  anchor color we know. Everything else is to be determined this session.
- The Tailwind v4 config should use CSS variables so tokens are easy to swap in later sessions.
- This session scaffolds the Next.js 15 project (if not already done) just enough
  to render a swatch page.

PART 1 — Write MACOS9_REFERENCE.md
A dedicated reference doc on Mac OS 9 visual language: Platinum chrome, title bar pinstripes,
window controls (square close/zoom/collapse in title bar — positions, sizes, colors),
scrollbar treatment (arrows at BOTH ends of the track), Charcoal font + web substitutes,
Apple/Application menu behavior, folder icons, Trash treatment, menu bar styling,
dialog box chrome. This prevents hallucinated Mac OS 9 details in implementation sessions.
Include: "easy tell" list — small details that reveal whether someone got Mac OS 9 right
(e.g., scrollbar arrow positions, title bar height, resize handle position, window control
button style).

PART 2 — Write BRAND.md
Define the Familiar brand palette, type stack, and Mac OS 9 treatment rules.
Sections: §palette (all color tokens, mapped to Mac OS 9 roles), §typography
(web font choices, size scale, weight usage, Charcoal-substitute strategy),
§window-chrome (specific rules: "when to use pinstripes," "title bar height,"
"window control button spec"), §icon-style, §do-not (visual anti-patterns).

PART 3 — Scaffold the Next.js project
If `package.json` doesn't exist at the repo root: run
`npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --no-import-alias`.
Confirm: `npm run dev` starts without errors, `npm run typecheck` passes clean.
Note: Tailwind v4 uses a CSS-first config (no tailwind.config.ts by default in v4 — confirm
the installed version and follow the correct config path for that version before proceeding
to PART 4).

PART 4 — Tailwind tokens + swatch page
Implement all brand tokens from BRAND.md as CSS custom properties in `app/globals.css`
and wire them into Tailwind's theme (the approach differs between Tailwind v3 and v4 —
use the installed version's documented method, not a guess).
Build `app/tokens/page.tsx` — a swatch page showing every color token, every type style
at each scale level, and a sample Platinum window chrome (title bar + content area +
scrollbar) for visual verification. This page is never linked from the homepage; it
exists for session verification only.

SUCCESS CONDITIONS:
1. MACOS9_REFERENCE.md has the §easy-tells list and covers all eight listed sections.
2. BRAND.md has all five sections populated (§palette, §typography, §window-chrome,
   §icon-style, §do-not).
3. `npm run dev` starts cleanly and serves the swatch page at /tokens.
4. The swatch page displays all color tokens labeled by CSS variable name, all type
   styles labeled by scale level, and a window chrome sample where the title bar
   height, pinstripe, and control buttons match MACOS9_REFERENCE.md §title-bar and
   §window-controls.
5. `npm run typecheck` passes clean with zero errors.
```

---

## SESSION 3 — Homepage Copy
**Branch:** `copy/session-03-homepage-copy`
**Output:** `docs/reference/COPY.md` (homepage sections)
**Depends on:** Session 1 (POSITIONING.md), Session 2 (BRAND.md)

**Goal:** Write the full homepage copy, indexed by section ID, ready for implementation.

```
Read CLAUDE.md and docs/reference/CLAUDE.md.
Read docs/reference/POSITIONING.md in full.
Read docs/reference/BRAND.md — specifically §voice-and-tone if present.
Read docs/reference/FAMILIAR_README.md and docs/reference/FAMILIAR_MODES.md.
Read docs/reference/INSPIRATION_POSTHOG.md — note what PostHog does with section structure
  but NOT their copy voice.
Create a new git branch named copy/session-03-homepage-copy.

CONTEXT (session 3 of N, copy phase — no code this session):
- The homepage IS the Mac OS 9 desktop. Copy appears inside window titles, window content,
  and possibly on the conventional "website mode" layout.
- Copy is indexed by section ID (e.g., §hero-headline, §hero-subhead, §mode-guide-headline).
  Components will reference these IDs; this makes copy revisions isolated.
- Copy for the fake Familiar demo is NOT in scope this session — that's a later session
  with its own script.

PART 1 — Desktop window inventory
List every window that appears on the homepage desktop and what it contains.
Minimum expected windows: hero/about window, demo window (scripted Familiar), features
window, pricing/plans window (or CTA). Name each window, its title bar text, and its
rough content purpose.

PART 2 — Write copy for each window
For each window from PART 1: write the full copy — headline, subhead, body paragraphs,
CTAs, labels — at the level of detail needed for implementation. All copy follows the
voice in POSITIONING.md. Reference the value props in order.

PART 3 — Write copy for the "website mode" layout
The toggle switches to a conventional marketing layout. Write the equivalent copy for
that layout (same content, different arrangement). Section headers, body, CTAs.

PART 4 — Write COPY.md
Organize all copy from PARTS 2–3 into COPY.md with section IDs. Format:
  ## §section-id
  **Label/context:** what this piece of copy is and where it appears
  **Copy:** the actual text

SUCCESS CONDITIONS:
1. COPY.md has at least 15 sections populated, covering hero, all major homepage sections,
   and CTAs.
2. Every section has a unique §section-id.
3. The copy does not use any phrase from POSITIONING.md §forbidden-phrases.
4. The hero headline is ≤8 words.
5. All mode names (Guide, Agent, Chat) are capitalized consistently.
6. No copy promises a feature not in FAMILIAR_README.md.
```

---

## SESSION 4 — Mac OS 9 Desktop Shell
**Branch:** `feat/session-04-desktop-shell`
**Output:** The desktop, window manager, and "website mode" toggle — no content yet, just chrome
**Depends on:** Session 3 (COPY.md written), Session 2 (Tailwind tokens)

**Goal:** The Mac OS 9 desktop renders. Windows can be dragged, minimized, and brought to front. The "website mode" toggle works. No content in the windows yet.

```
Read CLAUDE.md and docs/reference/CLAUDE.md.
Read docs/reference/ARCHITECTURE.md in full — component contracts, window data model,
  state architecture, Zustand store shape, drag implementation, scrollbar notes.
Read docs/reference/BRAND.md in full.
Read docs/reference/MACOS9_REFERENCE.md in full — do not wing any Mac OS 9 chrome details.
Read docs/reference/COPY.md for window titles (use §window-title-* IDs).
Create a new git branch named feat/session-04-desktop-shell.

CONTEXT (session 4 of N, implementation phase begins):
- The Next.js 15 app exists with Tailwind tokens (Session 2).
- The desktop is the homepage (app/page.tsx). All architecture decisions are in
  ARCHITECTURE.md — follow them. Do not invent a different state model.
- Window chrome must match MACOS9_REFERENCE.md exactly — especially title bar height,
  pinstripe pattern, window control button positions and sizes, scrollbar arrow positions.
- The website mode toggle reads from URL param + localStorage per ARCHITECTURE.md §state.
- At <768px viewport, website mode is forced on and the toggle is hidden.

PART 1 — Zustand window store
Install zustand. Build `lib/useWindowManager.ts`:
The `WindowState` type and `WindowManagerStore` interface match ARCHITECTURE.md §window-data-model
and §window-manager-contract exactly. Actions: focusWindow, moveWindow, resizeWindow,
minimizeWindow, restoreWindow, openWindow, closeWindow. Z-index strategy: monotonically
incrementing counter (ARCHITECTURE.md §z-index-strategy). Persist to sessionStorage
(not localStorage — ARCHITECTURE.md §state-architecture).
Build `lib/windows.ts`: default layout constants (positions + sizes) for two breakpoints
(≥1024px, 768–1023px). Define the window IDs: "about", "demo", "features", "docs".

PART 2 — Window chrome component
Build `components/desktop/Window.tsx` matching the WindowProps contract in ARCHITECTURE.md.
Render: title bar (pinstripes via CSS repeating-linear-gradient, title text, square
close/zoom/collapse buttons per MACOS9_REFERENCE.md), content area, resize handle.
Drag: pointer events on the title bar (onPointerDown → document onPointerMove/onPointerUp).
Use `transform: translate()` for position — never `top`/`left` during drag.
Boundary constraints: clamp so title bar stays in viewport (ARCHITECTURE.md §boundary-constraints).
Scrollbar: build `components/ui/ScrollArea.tsx` with arrows at BOTH ends of the track
(ARCHITECTURE.md §scrollbars — do NOT use CSS scrollbar-* APIs, they cannot produce this layout).

PART 3 — Desktop, MenuBar, Trash
Build `components/desktop/Desktop.tsx`: desktop background, MenuBar at top, Trash bottom-right,
and the four windows positioned at their defaults from `lib/windows.ts`.
Build `components/desktop/MenuBar.tsx`: Apple menu, app name "Familiar", clock.
Build `components/desktop/Trash.tsx`: Trash icon, bottom-right, empty state.

PART 4 — Website mode toggle
Build `components/ui/ModeToggle.tsx` and `lib/useMode.ts`.
State reads: URL param > localStorage > default (desktop). Writes both on toggle.
At <768px: force website mode, hide the toggle, show a one-line banner.
Wire `app/page.tsx` to render `<Desktop>` or `<WebsiteLayout>` based on mode.
`<WebsiteLayout>` is an empty shell for now — just a div with background color.

SUCCESS CONDITIONS:
1. `npm run dev` renders the Mac OS 9 desktop at localhost:3000 on a ≥1024px viewport.
2. Four empty windows ("about", "demo", "features", "docs") appear at their default positions.
3. Dragging a window's title bar moves it smoothly. Clicking any window brings it to front.
   Two windows can be dragged to overlap; z-index stacking is correct.
4. Window chrome passes the MACOS9_REFERENCE.md §easy-tells checklist — specifically:
   scrollbar arrows appear at BOTH top AND bottom of the vertical track; window control
   buttons are square, not round; title bar pinstripes render.
5. Refreshing the page restores the last window positions (sessionStorage).
6. The mode toggle switches to website mode (empty shell). At 375px viewport width,
   website mode is forced and the toggle is hidden.
7. `npm run typecheck` and `npm run build` both pass clean.
```

---

## SESSION 5 — Homepage Content
**Branch:** `feat/session-05-homepage-content`
**Output:** All homepage windows populated with content from COPY.md
**Depends on:** Session 4 (desktop shell), Session 3 (COPY.md)

**Goal:** All homepage windows have their content. The site is readable end-to-end.

```
[Full prompt written after Sessions 3 and 4 complete. The outline below is fixed.]

Read CLAUDE.md and docs/reference/CLAUDE.md.
Read docs/reference/ARCHITECTURE.md §copy-data-layer.
Read docs/reference/COPY.md in full.
Create a new git branch named feat/session-05-homepage-content.

CONTEXT (session 5 of N):
- The desktop shell exists (Session 4): four empty windows, window manager, mode toggle.
- COPY.md has all section IDs and final copy (Session 3).
- The copy data layer (ARCHITECTURE.md §copy): translate COPY.md into `lib/copy.ts` as
  a typed `as const` object — never hard-code strings in components.

PART 1 — Write lib/copy.ts
Translate every §section-id in COPY.md to a key in `lib/copy.ts` as `as const`.
Format: `export const copy = { "hero-headline": "...", ... } as const;`
Export `CopyKey = keyof typeof copy` for use in components.
Every key must match a §section-id in COPY.md exactly.

PART 2 — Populate window content components
Build each window's content component (AboutWindow, FeaturesWindow, DocsWindow) using
copy["§section-id"] — no hard-coded strings. Mount them inside the Window chrome from Session 4.

PART 3 — Website mode content
Populate WebsiteLayout with the website-mode copy sections. Same lib/copy.ts source.

SUCCESS CONDITIONS:
1. `lib/copy.ts` exists, is typed `as const`, and has a key for every §section-id in COPY.md.
2. `grep -r "\"[A-Z]" components/` returns no hard-coded copy strings in components
   (all strings come from lib/copy.ts).
3. Every window shows content matching its COPY.md sections.
4. The website mode layout shows equivalent content.
5. The site is readable on a 1280px viewport.
6. `npm run typecheck` and `npm run build` pass clean.
```

---

## SESSION 6 — Fake Familiar Demo
**Branch:** `feat/session-06-demo-window`
**Output:** The scripted autoplay Familiar demo window
**Depends on:** Session 5 (homepage content)

**Goal:** The demo window shows a convincing fake Familiar run — ghost cursor flying around, speech bubbles, the whole effect. Fully scripted, no LLM.

```
Read CLAUDE.md and docs/reference/CLAUDE.md.
Read docs/reference/ARCHITECTURE.md §demo-system-architecture in full — the DemoStep
  type, DemoPlayer state machine, coordinate system, ghost cursor constraints.
Read docs/reference/COPY.md for the demo script content (§demo-* sections).
Create a new git branch named feat/session-06-demo-window.

CONTEXT (session 6 of N):
- The desktop with content windows exists (Session 5).
- The demo system architecture is fully specified in ARCHITECTURE.md §demo-system-architecture.
  Follow it exactly: DemoStep union type, requestAnimationFrame player, window-relative coords.
- The demo script content (the specific sequence of steps) comes from COPY.md §demo-* sections.

PART 1 — DemoScript.ts
Build `components/demo/DemoScript.ts` with the DemoStep type from ARCHITECTURE.md.
Write the DEMO_SCRIPT array from COPY.md §demo-* sections.

PART 2 — GhostCursor and SpeechBubble
Build `components/demo/GhostCursor.tsx`: a glowing blue (#378ADD) triangle cursor that
renders at a given position (window-relative, converted to viewport coords by adding
the DemoWindow's current position). Animates along a bezier arc (same physics as
Familiar's real ghost cursor). Uses `transform: translate()` only — no top/left.
Build `components/demo/SpeechBubble.tsx`: renders text char-by-char at the streaming
rate in the DemoStep. Scale-bounce entrance. Positioned relative to the ghost cursor.

PART 3 — DemoPlayer
Build `components/demo/DemoPlayer.tsx` as the requestAnimationFrame state machine
described in ARCHITECTURE.md. States: idle → playing → paused → complete.
Autoplay starts when the window is visible and focused. Pauses when the window is
minimized or off-screen. A Replay button is always visible.

PART 4 — Wire into DemoWindow
Mount DemoPlayer inside the DemoWindow from Session 4/5. The "screen" area of the demo
window shows the current demo screenshot (swapped via screen-change steps). All ghost
cursor coords are window-relative.

SUCCESS CONDITIONS:
1. Opening the demo window starts the autoplay sequence within 1s.
2. The ghost cursor flies along curved bezier arcs (not straight lines, not teleports).
3. Speech bubbles stream text char-by-char, not all at once.
4. Moving the demo window to a different position and replaying shows the ghost cursor
   pointing at the correct elements (window-relative coords confirmed).
5. Minimizing the demo window pauses the sequence. Restoring it resumes.
6. The Replay button replays from the start.
7. No fetch() calls, no API keys, no streaming — `npm run build` confirms no server actions.
8. `npm run typecheck` passes clean.
```

---

## SESSION 7 — Polish, Performance, Launch Readiness
**Branch:** `feat/session-07-polish`
**Output:** Vercel deployment live, performance passing, accessibility baseline
**Depends on:** Session 6 (demo working)

```
[Full prompt TBD]

SUCCESS CONDITIONS:
1. Vercel deployment live and accessible.
2. Lighthouse performance score ≥ 90 on desktop.
3. No console errors on load.
4. Website mode works at 375px (mobile viewport).
5. All images have alt text.
```

---

## BACKLOG (future sessions, unsequenced)

- **Docs placeholder** — `/docs` route with "coming soon" UI and a reasonable structure to fill in later
- **SEO** — meta tags, OG images, sitemap
- **Analytics** — PostHog web analytics (ironic)
- **Demo script refinement** — more sequences, more apps shown
- **Mobile layout** — the desktop metaphor works differently at narrow viewports
- **Pricing page** — once Free/Pro details are finalized
- **Blog/changelog** — if/when there's content to post
