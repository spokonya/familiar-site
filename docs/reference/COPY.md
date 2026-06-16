# COPY.md

> **STATUS: COMPLETE — Session 3 (homepage copy).**
> This is the source of truth for all on-page homepage copy. Implementation
> sessions reference copy by section-id — never hard-code strings in components.

---

## How to use this file

Components do not hard-code copy strings. Instead, they reference a section ID
from this file. When copy changes, it changes here and propagates. This keeps
copy revisions isolated from implementation.

**Reference format in code:** `// COPY.md hero-headline`
**Data layer:** Session 5 translates every section-id below into a key in
`lib/copy.ts` (`as const`). Section-ids here and keys there must match exactly.

**Voice:** Every line follows `POSITIONING.md voice`. Forbidden phrases
(`POSITIONING.md forbidden-phrases`) appear nowhere — not in body, labels, or
context notes. Guide / Agent / Chat are proper nouns, always capitalized. The
ghost cursor is always "the ghost cursor."

---

## PART 1 — Desktop window inventory

The homepage **is** the Mac OS 9 desktop. Four windows open on the desktop,
matching the canonical window IDs scaffolded in Session 4
(`about`, `demo`, `features`, `docs`). There is no separate pricing window —
plans live as a section inside the `features` window, and the primary call to
action lives in the `about` window and the menu bar.

| Window ID | Title bar text | Content purpose |
|-----------|----------------|-----------------|
| `about` | **Familiar** | The hero. What Familiar is (the pitch), the primary CTA, and the trust line. The first window a visitor reads. |
| `demo` | **Familiar — Live** | The scripted autoplay demo (built in Session 6). Title + framing copy only this session; the step script is a later session. |
| `features` | **What Familiar does** | The four value props in priority order (memory, Agent, Guide, privacy), the three-mode explainer, and the Free/Pro plans section. |
| `docs` | **Documentation** | Placeholder. "Coming soon" copy per the launch decision (`CLAUDE.md`: placeholder docs at launch). |

**Menu bar & desktop chrome** also carry copy (Apple menu, app menu, mode
toggle, Trash, the website-mode banner). Those sections are indexed below under
`menu-*`, `chrome-*`, and `mode-toggle-*`.

**Out of scope this session:** the demo step script (the ghost-cursor moves and
speech-bubble lines) — that is written in Session 6 against
`ARCHITECTURE.md demo-system-architecture`.

---

## PART 2 — Window copy (desktop mode)

### about window

### hero-headline
**Where:** `about` window — large type, top of content.
**Copy:** Your Mac remembers. And acts.

### hero-subhead
**Where:** `about` window — body, directly under the headline.
**Copy:** Familiar keeps a private, local memory of what's been on your screen — so you can ask about it later. Describe a task and it does it for you, clicking and typing on your actual Mac. Or it walks you through, one step at a time. You watch the whole way.

### hero-cta-primary
**Where:** `about` window — primary button.
**Copy:** Watch it work

### hero-cta-secondary
**Where:** `about` window — secondary text link beside the primary button.
**Copy:** Download for Mac

### hero-trust-line
**Where:** `about` window — small line under the CTAs.
**Copy:** Runs on your Mac. Sees only your screen — never your passwords.

---

### demo window

### demo-window-title
**Where:** Title bar of the `demo` window.
**Copy:** Familiar — Live

### demo-window-intro
**Where:** `demo` window — one line above the demo stage, framing what the visitor is about to watch.
**Copy:** Watch Familiar book a flight in Safari. The ghost cursor shows every move before it makes it.

### demo-replay-label
**Where:** `demo` window — replay control (UI label register).
**Copy:** Play again

### demo-caption-agent
**Where:** `demo` window — small caption under the stage, naming the mode being shown.
**Copy:** This is Agent mode. Familiar acts; you approve anything that can't be undone.

---

### features window

### features-window-title
**Where:** Title bar of the `features` window.
**Copy:** What Familiar does

### features-intro
**Where:** `features` window — short lead-in at the top of the content.
**Copy:** Three things, in plain terms: it remembers your screen, it can do tasks for you, and it can teach you as you go. Here's each one.

#### Value prop 1 — Your Mac remembers (memory)

### memory-headline
**Where:** `features` window — first value-prop section headline.
**Copy:** Your Mac remembers.

### memory-body
**Where:** `features` window — memory section body.
**Copy:** Familiar keeps a running memory of what's been on your screen — the pages you read, the docs you built, the threads you followed. Ask "what was I working on yesterday afternoon?" and it tells you. You keep no notes. The memory stays on your Mac, encrypted, and you decide how far back it goes.

### memory-example
**Where:** `features` window — memory section example line (italic / inset).
**Copy:** "What was that pricing page I had open before lunch?" — Familiar finds it, no tab-hunting.

#### Value prop 2 — Does it for you (Agent)

### mode-agent-headline
**Where:** `features` window — Agent value-prop section headline.
**Copy:** Does it for you.

### mode-agent-body
**Where:** `features` window — Agent section body.
**Copy:** Describe a task and Familiar handles it — opening apps, clicking, typing, filling in forms — on your real screen, in real apps. The ghost cursor shows every move before it happens, so nothing is a surprise. Before anything it can't take back — sending, paying, deleting — it stops and asks. Press Escape to take over at any moment.

### mode-agent-example
**Where:** `features` window — Agent section example line.
**Copy:** "Book me a flight to Portland, leaving Friday." Familiar opens Safari, fills in the dates, and stops before it pays for anything.

#### Value prop 3 — Or walks you through it (Guide)

### mode-guide-headline
**Where:** `features` window — Guide value-prop section headline.
**Copy:** Or walks you through it.

### mode-guide-body
**Where:** `features` window — Guide section body.
**Copy:** In Guide mode, Familiar points to each step and waits for your click — it never takes the mouse. The ghost cursor flies to the right spot, a short note tells you what to do, and nothing moves until you do. The tutorial sits right on top of the app, so you never leave the screen to learn it.

### mode-guide-example
**Where:** `features` window — Guide section example line.
**Copy:** First time in Blender. Familiar points to the right panel, tells you what to click, and waits. No YouTube tab.

#### Value prop 4 — Doesn't read what it shouldn't (privacy)

### privacy-headline
**Where:** `features` window — privacy value-prop section headline. (Privacy is a feature here, not a footnote.)
**Copy:** Doesn't read what it shouldn't.

### privacy-body
**Where:** `features` window — privacy section body.
**Copy:** Password fields, 1Password, Keychain, Wallet — Familiar refuses to read them. No screenshot, no call, no configuration. Switch to 1Password mid-task and Familiar stops on its own. Pause it any time and it sees nothing until you say go.

### privacy-example
**Where:** `features` window — privacy section example line.
**Copy:** Mid-task, you open 1Password. Familiar stops cold. That's on purpose.

#### The three modes (explainer)

### modes-headline
**Where:** `features` window — short explainer that names the three modes together.
**Copy:** Three modes, one app.

### modes-body
**Where:** `features` window — modes explainer body. (Modes are strategies, not tiers — never frame Guide as beginner or Agent as advanced.)
**Copy:** Pick how much you want Familiar to do. In Chat, it just answers — questions about what's on your screen now, or what was on it last week. In Guide, it shows you the way and waits for your click. In Agent, it does the task while you watch. Switch between them whenever you like.

### mode-chat-headline
**Where:** `features` window — Chat mode label within the modes explainer.
**Copy:** Chat

### mode-chat-body
**Where:** `features` window — Chat mode description.
**Copy:** Ask about what's on your screen, or what's been on it. Familiar answers from your screen memory. No cursor, no clicking — just answers.

#### Plans

### plans-headline
**Where:** `features` window — plans section headline.
**Copy:** Free to start. Pro when you need more.

### plans-body
**Where:** `features` window — plans section intro.
**Copy:** Every mode — Chat, Guide, Agent, the ghost cursor, screen memory — works on the free plan. Pro is for remembering further back and syncing across your Macs.

### plans-free-label
**Where:** `features` window — Free column label.
**Copy:** Free

### plans-free-detail
**Where:** `features` window — Free column body.
**Copy:** Chat, Guide, Agent, and the ghost cursor. Seven days of screen memory, kept on your Mac.

### plans-pro-label
**Where:** `features` window — Pro column label.
**Copy:** Pro

### plans-pro-detail
**Where:** `features` window — Pro column body.
**Copy:** Ninety days of memory, sync across your Macs, and unlimited self-learned skills.

### plans-cta
**Where:** `features` window — plans CTA button.
**Copy:** Get Familiar

---

### docs window

### docs-window-title
**Where:** Title bar of the `docs` window.
**Copy:** Documentation

### docs-placeholder-headline
**Where:** `docs` window — placeholder content (launch decision: docs are a placeholder).
**Copy:** Docs are on the way.

### docs-placeholder-body
**Where:** `docs` window — placeholder body.
**Copy:** Setup guides, the full mode reference, and answers to the common questions are coming soon. For now, the demo and the sections on this desktop cover the basics.

---

### Desktop chrome & menus

### chrome-app-name
**Where:** Menu bar — application menu name, and the app menu title.
**Copy:** Familiar

### menu-apple-about
**Where:** Apple menu — first item.
**Copy:** About This Desktop

### menu-file-label
**Where:** Menu bar — File menu title.
**Copy:** File

### menu-help-label
**Where:** Menu bar — Help menu title.
**Copy:** Help

### chrome-trash-label
**Where:** Desktop — Trash icon label, bottom-right.
**Copy:** Trash

### chrome-desktop-hint
**Where:** Desktop — small one-time hint near the windows (first visit), nudging interaction.
**Copy:** Drag a window. Or switch to a plain webpage, top-right.

---

## PART 3 — Website mode copy (conventional layout)

The "Switch to website mode" toggle swaps the desktop for a conventional
marketing page. Same content, linear arrangement: hero → memory → Agent →
Guide → privacy → plans → bottom CTA. Headlines match the desktop value props;
body copy is lightly re-set for a scrolling page rather than windows.

### website-mode-hero-headline
**Where:** Website mode — hero headline.
**Copy:** Your Mac remembers. And acts.

### website-mode-hero-subhead
**Where:** Website mode — hero subhead.
**Copy:** Familiar keeps a private, local memory of your screen, does tasks for you in your real apps, and walks you through the ones you'd rather learn. The ghost cursor shows every move before it makes it.

### website-mode-cta
**Where:** Website mode — primary hero CTA.
**Copy:** Download for Mac

### website-mode-cta-secondary
**Where:** Website mode — secondary hero CTA.
**Copy:** Watch the demo

### website-mode-memory-headline
**Where:** Website mode — memory section.
**Copy:** Your Mac remembers.

### website-mode-memory-body
**Where:** Website mode — memory section body.
**Copy:** Familiar keeps a running memory of what's been on your screen and answers questions about it later — all on your Mac, encrypted, for as long as you choose. Ask "what was I working on yesterday afternoon?" and skip the notes.

### website-mode-agent-headline
**Where:** Website mode — Agent section.
**Copy:** Does it for you.

### website-mode-agent-body
**Where:** Website mode — Agent section body.
**Copy:** Describe a task and Familiar does it in your real apps — clicking, typing, filling in forms — with the ghost cursor showing each move first. It stops and asks before anything it can't undo. Press Escape to take over.

### website-mode-guide-headline
**Where:** Website mode — Guide section.
**Copy:** Or walks you through it.

### website-mode-guide-body
**Where:** Website mode — Guide section body.
**Copy:** In Guide mode, Familiar points to each step and waits for your click — it never takes the mouse. The tutorial sits on top of the app, so you learn Figma, Blender, or anything else without leaving the screen.

### website-mode-privacy-headline
**Where:** Website mode — privacy section.
**Copy:** Doesn't read what it shouldn't.

### website-mode-privacy-body
**Where:** Website mode — privacy section body.
**Copy:** Password fields, 1Password, Keychain, Wallet — Familiar refuses to read them, with no setup on your part. Switch to one mid-task and it stops on its own. Pause it and it sees nothing.

### website-mode-plans-headline
**Where:** Website mode — plans section.
**Copy:** Free to start. Pro when you need more.

### website-mode-plans-body
**Where:** Website mode — plans section body.
**Copy:** Every mode and the ghost cursor work free, with seven days of on-device memory. Pro adds ninety-day memory, sync across your Macs, and unlimited self-learned skills.

### website-mode-footer-cta-headline
**Where:** Website mode — bottom CTA section headline.
**Copy:** Let your Mac keep up with you.

### website-mode-footer-cta-button
**Where:** Website mode — bottom CTA button.
**Copy:** Download for Mac

---

## PART 4 — Toggle, banner & shared labels

### mode-toggle-to-website
**Where:** Desktop mode — the toggle control (UI label register).
**Copy:** Switch to website mode

### mode-toggle-to-desktop
**Where:** Website mode — the toggle control, switching back.
**Copy:** Back to the desktop

### mode-banner-mobile
**Where:** Forced website mode at <768px — one-line banner explaining why the desktop isn't shown.
**Copy:** The desktop works best on a bigger screen. Here's the short version.

---

## PART 5 — Demo step script (PROPOSAL — Session 6, pending copy-session sign-off)

> **These lines are NOT final copy.** Session 3 deliberately left the demo step
> script out of scope. They were written in Session 6 so the scripted demo could
> function, and are flagged here for a future copy session to confirm or revise.
> They reuse the already-approved Agent scenario (`mode-agent-example`): booking
> a flight to Portland in Safari. Each is a short ghost-cursor speech bubble.

### demo-step-command
**Where:** Opening speech bubble — the task the user gives Familiar.
**Copy:** Book me a flight to Portland, leaving Friday.

### demo-step-open
**Where:** Bubble as the ghost cursor moves to the address bar.
**Copy:** Opening the airline site.

### demo-step-fill
**Where:** Bubble as Familiar fills the form.
**Copy:** Portland, leaving Friday — filling it in.

### demo-step-search
**Where:** Bubble as Familiar runs the search.
**Copy:** Searching for flights.

### demo-step-approve
**Where:** Final bubble — Familiar stops before the irreversible action.
**Copy:** I'll stop here so you can approve the payment.

---

## PART 6 — Desktop icon labels (PROPOSAL — Session 7, pending copy-session sign-off)

> Short labels (≤12 chars) for the desktop icons that open each window, plus the
> Macintosh HD. New on-screen copy written during implementation; flagged for a
> future copy session. "Macintosh HD" is OS set dressing (depicts the system),
> not Familiar's voice.

### icon-label-about
**Where:** Desktop icon that opens the about/hero window.
**Copy:** Familiar

### icon-label-demo
**Where:** Desktop icon that opens the demo window.
**Copy:** Live Demo

### icon-label-features
**Where:** Desktop icon that opens the features window.
**Copy:** Features

### icon-label-docs
**Where:** Desktop icon that opens the docs window.
**Copy:** Read Me

### icon-label-hd
**Where:** The Macintosh HD desktop icon (top-right).
**Copy:** Macintosh HD

### menu-familiar-about
**Where:** Familiar (application) menu — opens the about window.
**Copy:** About Familiar

### menu-file-open
**Where:** File menu — submenu header listing the windows to open.
**Copy:** Open

### menu-file-close
**Where:** File menu — closes the focused window.
**Copy:** Close Window

### menu-help-item
**Where:** Help menu — opens the docs window.
**Copy:** Familiar Help

### about-dialog-version
**Where:** "About This Desktop" dialog — version line.
**Copy:** Familiar 1.0

### about-dialog-line
**Where:** "About This Desktop" dialog — tagline.
**Copy:** A Mac that remembers — and acts.

### about-dialog-memory
**Where:** "About This Desktop" dialog — playful "Built-in Memory" readout.
**Copy:** Built-in Memory: your whole screen, kept on your Mac.

### status-familiar-label
**Where:** Menu-bar status item (right side) — short label beside the ghost cursor glyph.
**Copy:** Watching

### status-familiar-note
**Where:** Familiar status item — the dialog it opens, tying the desktop to the real product.
**Copy:** On your real Mac, Familiar watches your screen and steps in when you ask. This desktop is a preview of that.

---

## Section-id index (for `lib/copy.ts` in Session 5)

hero-headline · hero-subhead · hero-cta-primary · hero-cta-secondary ·
hero-trust-line · demo-window-title · demo-window-intro · demo-replay-label ·
demo-caption-agent · features-window-title · features-intro · memory-headline ·
memory-body · memory-example · mode-agent-headline · mode-agent-body ·
mode-agent-example · mode-guide-headline · mode-guide-body · mode-guide-example ·
privacy-headline · privacy-body · privacy-example · modes-headline · modes-body ·
mode-chat-headline · mode-chat-body · plans-headline · plans-body ·
plans-free-label · plans-free-detail · plans-pro-label · plans-pro-detail ·
plans-cta · docs-window-title · docs-placeholder-headline ·
docs-placeholder-body · chrome-app-name · menu-apple-about · menu-file-label ·
menu-help-label · chrome-trash-label · chrome-desktop-hint ·
website-mode-hero-headline · website-mode-hero-subhead · website-mode-cta ·
website-mode-cta-secondary · website-mode-memory-headline ·
website-mode-memory-body · website-mode-agent-headline ·
website-mode-agent-body · website-mode-guide-headline · website-mode-guide-body ·
website-mode-privacy-headline · website-mode-privacy-body ·
website-mode-plans-headline · website-mode-plans-body ·
website-mode-footer-cta-headline · website-mode-footer-cta-button ·
mode-toggle-to-website · mode-toggle-to-desktop · mode-banner-mobile
