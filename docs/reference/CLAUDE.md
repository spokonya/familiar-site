# familiar-site — docs/reference/CLAUDE.md

This is the session-level standing-orders doc for Claude Code working on the familiar-site repo. It lives here (not the root) so it loads explicitly when referenced in a session prompt. The root `CLAUDE.md` has the broader project context.

## Before every session
1. Read `docs/reference/POSITIONING.md` — what Familiar is, who it's for, what voice to use, what phrases to avoid.
2. Read `docs/reference/BRAND.md` — colors, type, Mac OS 9 treatment rules.
3. Read `docs/reference/MACOS9_REFERENCE.md` — the specific Mac OS 9 visual language details. Do not wing this.
4. Read `docs/reference/COPY.md` — page-by-page copy indexed by section ID.
5. Read `docs/reference/FAMILIAR_README.md` — the source of truth for what Familiar actually does.

## Rules
- **Never write copy that isn't in COPY.md** (or explicitly proposed in this session). Copy decisions belong in the copy session, not scattered across implementation sessions.
- **Never deviate from BRAND.md palette or MACOS9_REFERENCE.md window chrome** without raising it as a decision.
- **Reference copy by section ID** — components get their text from `COPY.md §section-id`, not hard-coded strings. This makes copy revisions clean.
- **The PostHog design reference (`posthog-design-reference.md`) is STRUCTURAL REFERENCE ONLY.** Do not copy PostHog's palette (cream, yellow), typography stack, or mascot approach. Use it for: component naming conventions, content/presentation separation thinking, OS-metaphor reasoning. See `INSPIRATION_POSTHOG.md` for the explicit scope.
- **MACOS9_REFERENCE.md governs all OS chrome.** If that doc doesn't answer a question about Platinum UI, raise it rather than guessing.
- **One session = one branch = one PR.** Branch names: `feat/session-NN-description`. Never commit to `main` directly.
- **Run `npm run dev` and test the feature in a browser before marking any visual/interactive task done.**

## Session end
At the end of every session, run the end-of-session update (in `PROMPTS.md`) — update CLAUDE.md session status and commit.
