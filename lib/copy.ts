// All on-page copy, keyed by section-id.
// Source of truth: docs/reference/COPY.md. Every key here matches a section-id
// there exactly. Components reference copy["section-id"] — never hard-code strings.
// Contract: ARCHITECTURE.md copy (static constants, manual translation from COPY.md).

export const copy = {
  // ── about window ──────────────────────────────────────────────────────────
  "hero-headline": `Your Mac remembers. And acts.`,
  "hero-subhead": `Familiar keeps a private, local memory of what's been on your screen — so you can ask about it later. Describe a task and it does it for you, clicking and typing on your actual Mac. Or it walks you through, one step at a time. You watch the whole way.`,
  "hero-cta-primary": `Watch it work`,
  "hero-cta-secondary": `Download for Mac`,
  "hero-trust-line": `Runs on your Mac. Sees only your screen — never your passwords.`,

  // ── demo window ───────────────────────────────────────────────────────────
  "demo-window-title": `Familiar — Live`,
  "demo-window-intro": `Watch Familiar book a flight in Safari. The ghost cursor shows every move before it makes it.`,
  "demo-replay-label": `Play again`,
  "demo-caption-agent": `This is Agent mode. Familiar acts; you approve anything that can't be undone.`,

  // ── features window ───────────────────────────────────────────────────────
  "features-window-title": `What Familiar does`,
  "features-intro": `Three things, in plain terms: it remembers your screen, it can do tasks for you, and it can teach you as you go. Here's each one.`,

  "memory-headline": `Your Mac remembers.`,
  "memory-body": `Familiar keeps a running memory of what's been on your screen — the pages you read, the docs you built, the threads you followed. Ask "what was I working on yesterday afternoon?" and it tells you. You keep no notes. The memory stays on your Mac, encrypted, and you decide how far back it goes.`,
  "memory-example": `"What was that pricing page I had open before lunch?" — Familiar finds it, no tab-hunting.`,

  "mode-agent-headline": `Does it for you.`,
  "mode-agent-body": `Describe a task and Familiar handles it — opening apps, clicking, typing, filling in forms — on your real screen, in real apps. The ghost cursor shows every move before it happens, so nothing is a surprise. Before anything it can't take back — sending, paying, deleting — it stops and asks. Press Escape to take over at any moment.`,
  "mode-agent-example": `"Book me a flight to Portland, leaving Friday." Familiar opens Safari, fills in the dates, and stops before it pays for anything.`,

  "mode-guide-headline": `Or walks you through it.`,
  "mode-guide-body": `In Guide mode, Familiar points to each step and waits for your click — it never takes the mouse. The ghost cursor flies to the right spot, a short note tells you what to do, and nothing moves until you do. The tutorial sits right on top of the app, so you never leave the screen to learn it.`,
  "mode-guide-example": `First time in Blender. Familiar points to the right panel, tells you what to click, and waits. No YouTube tab.`,

  "privacy-headline": `Doesn't read what it shouldn't.`,
  "privacy-body": `Password fields, 1Password, Keychain, Wallet — Familiar refuses to read them. No screenshot, no call, no configuration. Switch to 1Password mid-task and Familiar stops on its own. Pause it any time and it sees nothing until you say go.`,
  "privacy-example": `Mid-task, you open 1Password. Familiar stops cold. That's on purpose.`,

  "modes-headline": `Three modes, one app.`,
  "modes-body": `Pick how much you want Familiar to do. In Chat, it just answers — questions about what's on your screen now, or what was on it last week. In Guide, it shows you the way and waits for your click. In Agent, it does the task while you watch. Switch between them whenever you like.`,
  "mode-chat-headline": `Chat`,
  "mode-chat-body": `Ask about what's on your screen, or what's been on it. Familiar answers from your screen memory. No cursor, no clicking — just answers.`,

  "plans-headline": `Free to start. Pro when you need more.`,
  "plans-body": `Every mode — Chat, Guide, Agent, the ghost cursor, screen memory — works on the free plan. Pro is for remembering further back and syncing across your Macs.`,
  "plans-free-label": `Free`,
  "plans-free-detail": `Chat, Guide, Agent, and the ghost cursor. Seven days of screen memory, kept on your Mac.`,
  "plans-pro-label": `Pro`,
  "plans-pro-detail": `Ninety days of memory, sync across your Macs, and unlimited self-learned skills.`,
  "plans-cta": `Get Familiar`,

  // ── docs window ───────────────────────────────────────────────────────────
  "docs-window-title": `Documentation`,
  "docs-placeholder-headline": `Docs are on the way.`,
  "docs-placeholder-body": `Setup guides, the full mode reference, and answers to the common questions are coming soon. For now, the demo and the sections on this desktop cover the basics.`,

  // ── desktop chrome & menus ────────────────────────────────────────────────
  "chrome-app-name": `Familiar`,
  "menu-apple-about": `About This Desktop`,
  "menu-file-label": `File`,
  "menu-help-label": `Help`,
  "chrome-trash-label": `Trash`,
  "chrome-desktop-hint": `Drag a window. Or switch to a plain webpage, top-right.`,

  // ── website mode ──────────────────────────────────────────────────────────
  "website-mode-hero-headline": `Your Mac remembers. And acts.`,
  "website-mode-hero-subhead": `Familiar keeps a private, local memory of your screen, does tasks for you in your real apps, and walks you through the ones you'd rather learn. The ghost cursor shows every move before it makes it.`,
  "website-mode-cta": `Download for Mac`,
  "website-mode-cta-secondary": `Watch the demo`,
  "website-mode-memory-headline": `Your Mac remembers.`,
  "website-mode-memory-body": `Familiar keeps a running memory of what's been on your screen and answers questions about it later — all on your Mac, encrypted, for as long as you choose. Ask "what was I working on yesterday afternoon?" and skip the notes.`,
  "website-mode-agent-headline": `Does it for you.`,
  "website-mode-agent-body": `Describe a task and Familiar does it in your real apps — clicking, typing, filling in forms — with the ghost cursor showing each move first. It stops and asks before anything it can't undo. Press Escape to take over.`,
  "website-mode-guide-headline": `Or walks you through it.`,
  "website-mode-guide-body": `In Guide mode, Familiar points to each step and waits for your click — it never takes the mouse. The tutorial sits on top of the app, so you learn Figma, Blender, or anything else without leaving the screen.`,
  "website-mode-privacy-headline": `Doesn't read what it shouldn't.`,
  "website-mode-privacy-body": `Password fields, 1Password, Keychain, Wallet — Familiar refuses to read them, with no setup on your part. Switch to one mid-task and it stops on its own. Pause it and it sees nothing.`,
  "website-mode-plans-headline": `Free to start. Pro when you need more.`,
  "website-mode-plans-body": `Every mode and the ghost cursor work free, with seven days of on-device memory. Pro adds ninety-day memory, sync across your Macs, and unlimited self-learned skills.`,
  "website-mode-footer-cta-headline": `Let your Mac keep up with you.`,
  "website-mode-footer-cta-button": `Download for Mac`,

  // ── toggle, banner & shared labels ────────────────────────────────────────
  "mode-toggle-to-website": `Switch to website mode`,
  "mode-toggle-to-desktop": `Back to the desktop`,
  "mode-banner-mobile": `The desktop works best on a bigger screen. Here's the short version.`,

  // ── demo step script (PROPOSAL — COPY.md PART 5, pending copy-session sign-off) ──
  "demo-step-command": `Book me a flight to Portland, leaving Friday.`,
  "demo-step-open": `Opening the airline site.`,
  "demo-step-fill": `Portland, leaving Friday — filling it in.`,
  "demo-step-search": `Searching for flights.`,
  "demo-step-approve": `I'll stop here so you can approve the payment.`,

  // ── desktop icon labels (PROPOSAL — COPY.md PART 6, pending copy-session sign-off) ──
  "icon-label-about": `Familiar`,
  "icon-label-demo": `Live Demo`,
  "icon-label-features": `Features`,
  "icon-label-docs": `Read Me`,
  "icon-label-hd": `Macintosh HD`,
} as const;

export type CopyKey = keyof typeof copy;
