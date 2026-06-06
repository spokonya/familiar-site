# familiar-site — Session Backlog

> Sessions in order. Each session is fully self-contained (see PROMPTS.md for conventions).
> Do not start a session until the previous one's success conditions are met.
> Sessions 1–3 produce no code. Session 4 is when pixels happen.

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

CONTEXT (session 1 of N, positioning phase — no code this session):
- Familiar is a Mac-native ambient agent. It reads your screen and either guides you
  (ghost cursor shows where to click, you click) or acts for you (ghost cursor shows,
  real cursor follows). The ghost cursor IS the product's visual identity.
- The website is a Mac OS 9 desktop. Visitors land on a Platinum-chrome desktop with
  draggable windows. This is not decoration — the OS metaphor is the product's personality.
- This session produces POSITIONING.md only. No UI, no code, no Tailwind tokens.
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
2. The one-sentence pitch passes the non-technical-person test (show it to someone unfamiliar
   with the product and they can explain it back).
3. The forbidden phrases list has at least 8 entries with brief rationale for each.
4. The value props are in priority order and match what's visible in FAMILIAR_README.md
   (nothing promised that doesn't exist).
5. The voice section has at least one example of each register.
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

PART 3 — Scaffold and implement Tailwind tokens
If the Next.js project doesn't exist: `npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --no-import-alias`.
Implement all brand tokens from BRAND.md as CSS variables in globals.css and as
Tailwind theme extensions in tailwind.config.ts.
Build a single route `app/tokens/page.tsx` — a swatch page showing every color,
every type style, and a sample Platinum window chrome — for visual verification.

SUCCESS CONDITIONS:
1. MACOS9_REFERENCE.md has the "easy tell" list and covers all the listed elements.
2. BRAND.md has all five sections populated.
3. `npm run dev` serves the swatch page at /tokens without errors.
4. The swatch page shows all color tokens, all type styles, and a sample window chrome
   that matches MACOS9_REFERENCE.md §window-controls and §title-bar.
5. `npm run typecheck` passes clean.
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
Read docs/reference/BRAND.md in full.
Read docs/reference/MACOS9_REFERENCE.md in full — do not wing any Mac OS 9 chrome details.
Read docs/reference/COPY.md for window titles (use §window-title-* IDs).
Create a new git branch named feat/session-04-desktop-shell.

CONTEXT (session 4 of N, implementation phase begins):
- The Next.js 15 app exists with Tailwind tokens (Session 2).
- The desktop is the homepage (app/page.tsx).
- Window chrome must match MACOS9_REFERENCE.md exactly — especially title bar height,
  pinstripe pattern, window control button positions and sizes, scrollbar arrow positions.
- The "website mode" toggle is a first-class feature, not an afterthought.
  It must work at every viewport size.

PART 1 — Window manager
Build components/desktop/WindowManager.tsx: manages z-index, focus, drag state for
multiple overlapping windows. Each window has an id, position, size, minimized state,
and z-index. Dragging a title bar moves the window. Clicking any part of a window
brings it to front.

PART 2 — Window chrome component
Build components/desktop/Window.tsx: renders a single Platinum window with:
- Title bar (pinstripes, title text, close/zoom/collapse controls per MACOS9_REFERENCE.md)
- Content area with proper border and inset
- Resize handle (bottom-right, per MACOS9_REFERENCE.md)
- Scrollbar if content overflows (arrows at BOTH ends per MACOS9_REFERENCE.md)
No window content yet — just the chrome around an empty content area.

PART 3 — Desktop and Trash
Build components/desktop/Desktop.tsx: the desktop background (Platinum/dark texture),
a menu bar at the top (per MACOS9_REFERENCE.md), and a Trash icon bottom-right.
Wire in the WindowManager.

PART 4 — Website mode toggle
Build the toggle component and wire it to switch between the desktop layout and a
conventional marketing layout shell. The conventional layout can be empty for now —
just verify the toggle works and the state persists through re-renders.

SUCCESS CONDITIONS:
1. `npm run dev` renders the desktop at localhost:3000.
2. At least two windows can be dragged independently and brought to front by clicking.
3. Window chrome (title bar, controls, scrollbar) matches MACOS9_REFERENCE.md §title-bar,
   §window-controls, and §scrollbar (screenshot and compare).
4. The Trash appears bottom-right on the desktop.
5. The website mode toggle renders and switches between the two layout shells.
6. `npm run typecheck` and `npm run build` both pass clean.
```

---

## SESSION 5 — Homepage Content
**Branch:** `feat/session-05-homepage-content`
**Output:** All homepage windows populated with content from COPY.md
**Depends on:** Session 4 (desktop shell), Session 3 (COPY.md)

**Goal:** All homepage windows have their content. The site is readable end-to-end.

```
[Full prompt TBD after Session 3 and 4 are complete — COPY.md section IDs
and window inventory will be known then.]

SUCCESS CONDITIONS:
1. Every window in the desktop layout has content matching COPY.md §[section-id].
2. The website mode layout shows equivalent content.
3. No hard-coded copy strings — all copy is referenced by section ID from COPY.md
   (or a constants file that mirrors it).
4. The site is readable on 1280px viewport.
5. `npm run typecheck` and `npm run build` pass clean.
```

---

## SESSION 6 — Fake Familiar Demo
**Branch:** `feat/session-06-demo-window`
**Output:** The scripted autoplay Familiar demo window
**Depends on:** Session 5 (homepage content)

**Goal:** The demo window shows a convincing fake Familiar run — ghost cursor flying around, speech bubbles, the whole effect. Fully scripted, no LLM.

```
[Full prompt TBD — demo script is written in Session 3 or a separate copy session.]

SUCCESS CONDITIONS:
1. The demo plays automatically when the window is open/visible.
2. The ghost cursor flies along bezier arcs and shows speech bubbles.
3. The demo is deterministic — same sequence every time.
4. No LLM calls, no API keys, no streaming — purely client-side.
5. The demo loops or has a replay button.
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
