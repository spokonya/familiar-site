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
