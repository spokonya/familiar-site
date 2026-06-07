# DECISIONS.md — familiar-site

ADR-lite format. One paragraph per decision. Record *what* was decided, *why*, and any alternatives considered. When something seems weird, this document explains it.

---

## 2026-06-06 — Separate repo from the product (not a monorepo)

The website lives in `familiar-site/`, not inside the `familiar/` product repo.

**Why:** The website and the product have completely different deployment cadences, contributors, and stakes. Coupling them means every `npm install` on the product pulls in Next.js, and every Vercel deploy touch triggers product CI. The website doesn't need the product's backend, Swift app, or infra. Product keys should never be near web build tooling. The cost of separation is a periodic manual sync of `FAMILIAR_README.md` — worth it.

**Alternatives considered:** monorepo with workspaces (rejected — surface area too large for no benefit at this scale), submodule (rejected — more friction than a manual sync for a doc file).

---

## 2026-06-06 — Mac OS 9.2.2 aesthetic (not Mac OS X, not Win9x)

The site presents as a Mac OS 9 desktop: Platinum chrome, pinstripe title bars, Charcoal type, classic window controls (square close/zoom/collapse buttons in the title bar), and a Trash in the bottom-right.

**Why:** Familiar is a Mac-native ambient agent with a ghost cursor that appears on your screen — it's "a spirit that lives in your Mac." Mac OS 9 is the last MacOS before OS X redesigned everything, and it carries a specific nostalgia: the era when the Mac felt alive and personal. PostHog used a similar trick with their OS metaphor (see `docs/reference/posthog-why-os.md`) and it gave them a distinctive, memorable presence. Win9x was considered and rejected — Familiar is a Mac-only app and the metaphor should match.

**Alternatives considered:** Mac OS X Aqua (too recent, too expected), a generic retro terminal aesthetic (lacks warmth and specificity), no OS metaphor at all (forgettable).

---

## 2026-06-06 — "Website mode" toggle

Visitors can toggle between the Mac OS 9 desktop metaphor and a conventional marketing layout. The toggle is visible and accessible in both modes.

**Why:** Some visitors want a normal marketing site. Forcing the OS metaphor on everyone creates friction for the impatient, accessibility issues for screen readers, and breaks performance on low-end devices. The toggle gives visitors agency while keeping the metaphor as the default experience. It's also a product statement: Familiar lets you switch modes (Guide / Agent / Chat) — the site demonstrates that same agency.

**Alternatives considered:** OS metaphor only (alienates part of the audience), conventional only (forgettable, inconsistent with product identity), separate URLs (hurts SEO and breaks sharing).

---

## 2026-06-06 — Fake scripted Familiar demo (no LLM)

The homepage features a "running Familiar demo" inside a desktop window. It is fully scripted, deterministic autoplay — not a real LLM call or streaming API.

**Why:** A live demo requires an API key in the browser, which is a security problem. Streaming delays make first impressions dependent on network latency. Scripted autoplay is faster, more controlled, and can be art-directed to show the exact moments that best explain the product. The demo should feel like a magic trick, not a loading spinner.

**Alternatives considered:** real API streaming demo (security + reliability risk), video embed (non-interactive, feels static), no demo (misses the most compelling product moment).

---

## 2026-06-06 — Pure Option C: positioning → copy → implementation

No pixels are rendered until `COPY.md` is written. Session order: positioning → brand foundation → copy → implementation.

**Why:** Building UI before copy is set means every UI decision gets second-guessed when the copy arrives. Layout is determined by the words, not the other way around. The PostHog founders' design doc (see `docs/reference/posthog-founders-design.md`) makes this explicit: the site is a product; build it like one. Option A (copy and pixels simultaneously) creates thrash. Option B (pixels first) creates lock-in to wrong decisions.

---

## 2026-06-06 — Placeholder docs at launch

`/docs` exists in the nav but shows placeholder UI ("coming soon" or a single sparse page) at launch. No real documentation content is required before launch.

**Why:** Writing real docs before anyone is using the product creates churn. The docs placeholder signals that docs exist and are coming — it doesn't block the launch. Real docs can be written in parallel with early users.

---

## 2026-06-06 — No waitlist at launch

The launch does not have a waitlist or email capture.

**Why:** Familiar is currently in active development and doesn't need artificial demand management. A waitlist suggests scarcity that doesn't exist. The goal at launch is to explain the product and build credibility, not to collect emails. If that changes, the toggle-mode layout (see above) provides a natural place to add a CTA.

---

## 2026-06-06 — No mascot at launch

No character, animal, or illustrated mascot appears on the website at launch.

**Why:** The ghost cursor IS Familiar's personality. Adding a mascot would compete with the product's own visual identity (the literal ghost that floats over your screen). At launch we don't have the design bandwidth to create a mascot that doesn't feel generic. The Mac OS 9 aesthetic provides enough personality without one. Revisit post-launch if user research suggests the brand needs more warmth.

---

## 2026-06-06 — Next.js 15 App Router + React 19 + Tailwind v4

The tech stack is Next.js 15 (App Router), React 19, Tailwind v4, TypeScript, deployed on Vercel.

**Why:** This is the current recommended stack for a marketing site that needs SEO, fast first paint, and a small team. Tailwind v4 is the current version and its CSS-variable approach pairs well with a design-token strategy (which the Mac OS 9 Platinum palette needs). App Router is the default going forward. Vercel is the natural deployment target for Next.js with zero config. TypeScript is required — the site will have interactive window-management code that benefits from types.

**Alternatives considered:** Astro (less JS but less component composability for the interactive desktop), plain React SPA (no SSR/SEO), Remix (good but less Vercel-native).

---

## 2026-06-06 — Window state in Zustand, not React context

Window state (positions, z-indices, open/closed, minimized) lives in a Zustand store, not React context.

**Why:** Clicking any window needs to update only that window's z-index without re-rendering every other window. React context rerenders the entire subtree on any state change. Zustand with per-window selectors re-renders only the window whose state changed. At 5–7 overlapping windows with drag interactions on every pointer move, the difference is perceptible.

**Alternatives considered:** React context (rerender problem), URL state (noisy, confusing for users), Redux (too much ceremony for this scope).

---

## 2026-06-06 — Website mode state: URL param + localStorage

The desktop/website mode toggle writes to both the URL (`?mode=website`) and localStorage. Priority on read: URL param > localStorage > default (desktop).

**Why URL param:** Makes the preference shareable — a user who prefers the conventional layout can bookmark `/?mode=website`. **Why localStorage:** Survives a refresh within a session without requiring the URL param every time. **Why not just localStorage:** A shared link should respect the sender's intent.

**Alternatives considered:** React state only (resets on refresh, not shareable), cookie (overkill, GDPR surface), URL only (URL gets noisy when the user navigates).

---

## 2026-06-06 — Copy as a static typed constants file (`lib/copy.ts`)

All on-page copy lives in `lib/copy.ts` as a typed `as const` object keyed by section ID (matching `COPY.md section-id`). Components import `copy["hero-headline"]`. There is no runtime fetch, no CMS, no database.

**Why:** Copy is decided before implementation (Option C). It doesn't change at runtime. A static file gives TypeScript exhaustive checking — remove a key, every reference errors at build time. A CMS would add complexity (API calls, loading states, caching) with no benefit at launch-time traffic.

**How it's written:** The copy session (Session 3) produces `COPY.md`. The content session (Session 5) translates COPY.md section IDs directly to `lib/copy.ts` object keys — a manual one-time step, not codegen.

**Alternatives considered:** CMS (Contentful, Sanity — no benefit at this scale and adds a runtime dependency), i18n library (no internationalization need), inline strings (defeats the purpose of COPY.md discipline).

---

## 2026-06-06 — Desktop navigation is window state, not routing

"Navigating" on the desktop (opening About, Features, Docs) changes window state, not the URL. The URL stays `/` throughout. The `/docs` route exists as a separate page only for direct linking and crawlability.

**Why:** Window-based navigation is the OS metaphor. URL-based navigation would mean each "app" has a URL and the back button navigates between apps — but the desktop metaphor implies apps are all open simultaneously, not a linear history. URL params for each open window would be unwieldy (`/?open=about,features,demo`).

**Trade-off:** Deep-linking to a specific window is not supported at launch. If a user shares a URL, the recipient gets the default desktop layout, not the exact open-window state. Acceptable for launch.

---

## 2026-06-06 — Desktop metaphor disabled below 768px

At viewport widths below 768px, the website mode is forced on. The desktop metaphor is unavailable at mobile widths. The mode toggle is hidden. A brief banner explains why.

**Why:** Freely positioned, overlapping, draggable windows require a minimum viewport to be usable. Below ~768px, the windows would either overflow the viewport or be too small to read. The PostHog OS metaphor has the same limitation. Rather than a degraded desktop experience, the conventional layout is cleaner and serves mobile visitors better.

**Alternatives considered:** Stacked/non-draggable windows at mobile (tried by PostHog, mixed results — it still requires horizontal scroll management and loses the metaphor's appeal without the interactivity), responsive window sizes (the windows become too small to be useful before the viewport does).

---

## 2026-06-07 — Two-layer Tailwind token architecture (`--platinum-*` + `--color-*`)

Brand tokens are split into two layers declared in `app/globals.css`.

**Chrome layer (`--platinum-*`):** Declared in `:root` as plain CSS custom properties. Used via `var(--platinum-*)` directly in chrome components. Not mapped into Tailwind utilities — chrome components are isolated and don't need utility classes.

**Content layer (`--color-*`):** Declared in `@theme` (Tailwind v4 CSS-first config). This makes each token available as both a CSS variable (`var(--color-accent)`) and a Tailwind utility (`bg-accent`, `text-accent`, etc.). Font variables from `next/font` go in `@theme inline` (not `@theme`) to avoid circular references — they reference runtime CSS vars that don't exist at build time.

**Why not put `--platinum-*` in `@theme` too:** Chrome components will be hand-crafted with inline styles or CSS modules to precisely replicate Platinum UI. Utility classes would add indirection without benefit. The separation also makes it obvious which tokens belong to OS chrome vs. content.

---

## 2026-06-07 — `/tokens` route as dev-only visual verification baseline

A swatch page at `/tokens` (app/tokens/page.tsx) renders every brand token, the Geist type scale, the chrome font scale, and active+inactive window chrome samples side-by-side.

**Why:** Session 4 implementation begins with window chrome components. The `/tokens` page serves as a visual regression baseline — if a token value or chrome rule changes, the diff is immediately visible without having to build out real UI. It also verifies that the Tailwind `@theme` tokens actually produce the correct utilities at build time.

**It is not linked from navigation and is never shipped as a real page.** It exists purely as a development tool. The easy-tells checklist on the page mirrors `MACOS9_REFERENCE.md easy-tells` for quick reference during chrome implementation.

---

## 2026-06-06 — Demo ghost cursor coordinates are window-relative

All `{x, y}` coordinates in the demo script (`DemoScript.ts`) are relative to the `DemoWindow` content area, not the viewport. The demo looks correct regardless of where the user has dragged the window.

**Why:** If coordinates were viewport-relative, the demo would point at the wrong things every time the window is moved. Window-relative coordinates mean the demo is always internally consistent. The `GhostCursor` component receives viewport-adjusted coords by adding the window's current position — this transformation happens in `DemoPlayer`, not in the script data.

---

## 2026-06-06 — Zustand for window state, `sessionStorage` persistence

Window positions and open/close state are persisted to `sessionStorage` (not `localStorage`). Every new browser session starts with the designed default layout.

**Why `sessionStorage` over `localStorage`:** If the user rearranges windows and comes back a week later, a restored layout is confusing — the windows might be off-screen or in positions that make no sense without context. `sessionStorage` gives a clean slate on every new visit while preserving state across accidental refreshes within the same session.

**Why not no persistence:** A refresh that resets all window positions mid-exploration is jarring. `sessionStorage` is the minimal persistence that avoids that.
