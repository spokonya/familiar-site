# familiar-site — CLAUDE.md

## What this is
The marketing and product website for Familiar (a Mac-native ambient agent). Separate repo from the product itself. The site is a Mac OS 9 desktop metaphor — visitors land on a Platinum-chrome desktop with draggable windows, a working "website mode" toggle, and a fake-but-scripted Familiar demo running in one of the windows.

## Stack
- **Framework:** Next.js 15 (App Router)
- **UI:** React 19 + Tailwind v4 + TypeScript
- **Deploy:** Vercel
- **Dev server:** `npm run dev` (http://localhost:3000)
- **Build:** `npm run build`
- **Type-check:** `npm run typecheck` (or `tsc --noEmit`)

## Critical reads — do these before any session
1. `docs/reference/POSITIONING.md` — before writing any copy or headline
2. `docs/reference/BRAND.md` — before touching any color, type, or window chrome
3. `docs/reference/MACOS9_REFERENCE.md` — before building any window chrome, scrollbars, or OS decoration
4. `docs/reference/COPY.md` — before placing any on-page text
5. `docs/reference/FAMILIAR_README.md` — the single source of truth for what Familiar actually does
6. `docs/reference/FAMILIAR_MODES.md` — before describing Guide/Agent/Chat on any page

## Architecture decisions (see DECISIONS.md for rationale)
- **Pure Option C:** positioning → copy → implementation. No pixels before `COPY.md` is written.
- **"Switch to website mode" toggle:** the desktop metaphor is the default; toggling switches to a conventional marketing layout. Both share the same copy/content.
- **Fake Familiar demo:** a fully-scripted autoplay demo running inside a desktop window. No LLM calls from the browser. No streaming. Deterministic.
- **Placeholder docs at launch:** `/docs` exists but shows "coming soon" UI. No real content needed for launch.
- **No waitlist at launch.**
- **No mascot at launch.**

## File structure (once scaffolded)
```
app/                   — Next.js App Router pages
  page.tsx             — the Mac OS 9 desktop (homepage)
  layout.tsx
components/
  desktop/             — window manager, desktop, taskbar, Trash
  windows/             — individual app windows (demo, about, docs, etc.)
  ui/                  — shared primitives (buttons, scrollbars, etc.)
docs/reference/        — the docs used in sessions (not shipped to browser)
public/                — static assets
tailwind.config.ts
```

## Standing orders
- **Read BRAND.md and MACOS9_REFERENCE.md before touching any window chrome.** Mac OS 9 details are easy to get wrong; hallucinated Platinum UI is a tell.
- **Read POSITIONING.md before writing any copy.** Forbidden phrases are in there.
- **Read COPY.md §section-id before placing copy in a component.** Components reference `COPY.md` by section ID, not by hard-coded strings.
- **The desktop metaphor is not decoration.** It's the product. Every design decision must serve or at least not undermine the OS metaphor.
- **The website mode toggle is a first-class feature.** It must work at every breakpoint. Don't let it regress.
- **Commits:** follow the session branch convention (`feat/session-NN-*`). One session = one branch = one PR.
- **Sessions:** paste the session prompt at the top of a new Claude Code session. Each is fully self-contained.

## Session status
- [ ] Session 0 — Repo init + reference docs
- [ ] Session 1 — Positioning → `POSITIONING.md`
- [ ] Session 2 — Brand foundation → `BRAND.md` + `MACOS9_REFERENCE.md` + Tailwind tokens
- [ ] Session 3 — Homepage copy → `COPY.md` (first chunk)
- [ ] Session 4+ — Implementation

## Notes
- The product repo (`familiar/`) is a separate codebase. Changes to the product do not automatically update the website. Sync `FAMILIAR_README.md` periodically by copying from the product's `readme.md`.
- This repo follows the same PROMPTS.md session format as the product repo. See `docs/reference/PROMPTS.md` for conventions.
