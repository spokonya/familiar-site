# familiar-site — Session Prompt Conventions

> Paste each session's fenced prompt at the start of a **new** Claude Code session.
> Each prompt is fully self-contained — it re-establishes all context so a fresh
> session never depends on a previous one's chat history (only on the *files* the
> previous session committed).
> Run sessions in order. Do not start the next session until the current one's
> **Success conditions** are all met.
> Always run the **END-OF-SESSION UPDATE** (bottom of this file) when done.

---

## Prompt format

Each session prompt follows this structure:

```
Read CLAUDE.md and docs/reference/CLAUDE.md for project context.
[Additional reads specific to this session.]
Create a new git branch named [feat|copy|brand|chore]/session-NN-description.

CONTEXT (session N of M — [phase name]):
- [One paragraph: what has been built/decided so far that this session depends on.]
- [Locked constraints that apply throughout.]

PART 1 — [Name]
[What to build/write/decide. Precise. No ambiguity.]

PART 2 — [Name]
[...]

SUCCESS CONDITIONS:
1. [Specific, verifiable, greppable. Numbered. Each condition stands alone.]
2. [...]
3. [...]
```

---

## Conventions

**Branch naming:** `feat/session-NN-description` (implementation), `copy/session-NN-description` (copy sessions), `brand/session-NN-description` (brand/design token sessions).

**PART breakdowns:** Split the work into named PARTS. Each PART is a coherent chunk that can be reviewed independently. Typically 2–4 PARTs per session.

**Success conditions:** Numbered. Each one is verifiable in isolation — not "the page looks good" but "the window chrome matches MACOS9_REFERENCE.md §title-bar" or "`COPY.md §hero-headline` is rendered at the correct type scale." State what to check and what "passing" looks like.

**Self-contained context:** Every session prompt includes enough context to orient a fresh Claude Code session. Reference specific file paths and section IDs. Never write "as discussed earlier."

**Critical reads:** Always list the docs to read at the top of the prompt. At minimum: CLAUDE.md, docs/reference/CLAUDE.md, and the session-specific docs. Order matters — read POSITIONING.md before BRAND.md before COPY.md.

**END-OF-SESSION UPDATE:** Always run at session end. Updates the CLAUDE.md session status, commits, merges, deletes the branch.

---

## END-OF-SESSION UPDATE

Paste this at the end of every session, every time:

```
Session complete. Do the following:

1. Update the root CLAUDE.md:
   - Mark today's session done in ## Session status.
   - Add any architecture decisions or unexpected issues discovered this session
     to DECISIONS.md (ADR-lite: one paragraph, what + why + alternatives).
   - Preserve all other sections exactly.

2. Show me the diff for CLAUDE.md and DECISIONS.md before writing.

3. Commit and push the session branch. Confirm it merges cleanly with main.
   Then merge and delete the branch. Do not ask — just merge.
```
