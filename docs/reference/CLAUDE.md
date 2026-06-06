# familiar-site — Standing Orders

Read this at the start of every session. It contains rules only — no stack info, no file structure, no status. Those live in the root `CLAUDE.md`.

## Copy rules
- **Never write on-page copy that isn't in `COPY.md`.** Copy decisions belong in the copy session (Session 3), not scattered across implementation sessions. If this session proposes new copy, mark it explicitly as a proposal and note it needs a copy-session sign-off before it's committed as final.
- **Reference copy by §section-id.** Components get their text from `COPY.md §section-id`, not hard-coded strings. This keeps copy revisions isolated from implementation.
- **Read `POSITIONING.md §forbidden-phrases` before writing any copy.** If a phrase appears there, don't use it anywhere — not in body copy, not in UI labels, not in comments.

## Mac OS 9 chrome rules
- **`MACOS9_REFERENCE.md` governs all OS window chrome.** Title bar height, pinstripe colors, window control button shapes and positions, scrollbar arrow placement — these are all specified there. Do not guess.
- **The "easy tell" list in `MACOS9_REFERENCE.md §easy-tells` is a pre-commit checklist.** Before finishing any window chrome work, verify each item on that list.
- **If `MACOS9_REFERENCE.md` doesn't answer a question about Platinum UI, raise it as a decision rather than improvising.** Add the answer to the doc once confirmed.

## PostHog reference scope
- **`posthog-design-reference.md` is STRUCTURAL REFERENCE ONLY.** Read `INSPIRATION_POSTHOG.md` for the full scope. Short version: use it for component vocabulary and design-system structure. Do not touch the PostHog palette (cream, yellow), typography, or mascot.

## Branching
- **One session = one branch = one PR.** Branch names: `feat/session-NN-description` (implementation), `copy/session-NN-description` (copy), `brand/session-NN-description` (brand/tokens). Never commit to `main` directly.
- **After the session's success conditions are met:** run the END-OF-SESSION UPDATE from `PROMPTS.md`, merge the branch, delete it.

## Before marking any implementation task done
- `npm run dev` is running and the feature is visible in a browser.
- `npm run typecheck` passes clean.
- `npm run build` passes clean (run at session end, not after every change).
