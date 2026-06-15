# familiar-site — CLAUDE.md

## What this is
The marketing and product website for Familiar (a Mac-native ambient agent). Separate repo from the product itself. The site is a Mac OS 9 desktop metaphor — visitors land on a Platinum-chrome desktop with draggable windows, a working "website mode" toggle, and a fake-but-scripted Familiar demo running in one of the windows.

## Stack
- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Tailwind v4 + TypeScript
- **Deploy:** Vercel
- **Dev server:** `npm run dev` (http://localhost:3000)
- **Build:** `npm run build`
- **Type-check:** `npm run typecheck` (or `tsc --noEmit`)

## Key reference docs
Session prompts specify which docs to read. The non-negotiable ones:
- `docs/reference/FAMILIAR_README.md` — what Familiar actually does (product source of truth)
- `docs/reference/ARCHITECTURE.md` — system architecture, component contracts, state model, demo pipeline (read before any implementation session)
- `docs/reference/POSITIONING.md` — voice, forbidden phrases, value props (output of Session 1)
- `docs/reference/BRAND.md` — palette, type, Mac OS 9 rules (output of Session 2)
- `docs/reference/MACOS9_REFERENCE.md` — specific Platinum UI details (output of Session 2)
- `docs/reference/COPY.md` — all on-page copy indexed by section ID (output of Session 3)
- `docs/reference/FAMILIAR_MODES.md` — Guide/Agent/Chat reference for copy sessions

Standing orders are in `docs/reference/CLAUDE.md` — read that at the start of every session.

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
docs/reference/        — session reference docs (not shipped to browser)
public/                — static assets
tailwind.config.ts
skills/                — session skill files (accumulate over time)
```

## Session status
- [x] Session 0 — Repo init + reference docs
- [x] Session 1 — Positioning → `POSITIONING.md`
- [x] Session 2 — Brand foundation → `BRAND.md` + `MACOS9_REFERENCE.md` + Tailwind tokens
- [x] Session 3 — Homepage copy → `COPY.md`
- [x] Session 4 — Mac OS 9 desktop shell (window manager, chrome, mode toggle)
- [x] Session 5 — Homepage content (lib/copy.ts, window content, website mode)
- [x] Session 6 — Fake Familiar demo (scripted ghost-cursor autoplay)
- [x] Session 7 — Desktop icons & desktop surface
- [ ] Session 8 — Functional menu bar & dialogs
- [ ] Session 9 — Stickies & personality pass
- [ ] Session 10 — Polish, performance, launch readiness

## Notes
- The product repo (`familiar/`) is a separate codebase. Sync `FAMILIAR_README.md` periodically by copying from the product's `readme.md`.
- Session-prompt conventions are in `docs/reference/PROMPTS.md`. Session backlog is in `docs/reference/PROMPTS_BACKLOG.md`.
