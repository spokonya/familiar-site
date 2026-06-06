# POSITIONING.md

> **STATUS: IN PROGRESS — Session 1**
> Parts 1–4 revised (ambient-memory-first framing). Part 5 (final synthesis) pending review.

---

## §pitch

### Context
Familiar is three things layered on top of each other:
1. **Ambient screen memory** (like Rewind / littlebird) — runs quietly in the background, indexes your screen, lets you recall anything you've worked on
2. **An agent that acts on your Mac** (like Claude computer use) — does tasks for you in real apps, on your actual screen
3. **A guide mode** (like Clicky) — walks you through tasks step by step, you stay in control

The ghost cursor is the *visible mechanism* for modes 2 and 3 — how you see what's happening — not the product's identity. Lead with the memory + action stack.

### Locked
**"Familiar is a Mac assistant that keeps a running memory of your screen — and can step in to handle tasks for you, or walk you through them click by click."**

Passes the checks:
- Non-technical reader understands all three layers: memory, action, guidance
- "Tasks" bridges the memory layer to the action layer — clear referent for "them"
- No jargon, no AI-product abstractions
- Concrete: Mac, screen, tasks, click by click
- Positions it above "AI chatbot" — this thing operates on your computer

### Alternatives considered
- "...and can do things on it when you ask, or walk you through them" — rejected, "do things" is too vague
- "...and can take over and do the work, or show you exactly where to click" — good but "take over" reads slightly aggressive
- "...and can do the work for you, or point you through it step by step" — solid fallback

---

## §audience

### Primary (at launch)
**Mac users who are deep in their own work and need a computer that can keep up — recalling what they've been doing, taking over repetitive tasks, or showing them the way through unfamiliar territory.**

More precisely: knowledge workers and independent professionals (researchers, consultants, designers, engineers, solopreneurs) who spend hours a day on their Mac doing substantive work. They accumulate context across sessions — tabs, documents, apps, notes — and currently lose track of it. They also do tasks that are tedious or outside their expertise and want to delegate them without leaving their Mac or switching tools.

They're not early adopters specifically — but they're people whose work has enough complexity that the productivity gap between "I can ask my Mac to do this" and "I have to do this myself" is real and felt daily.

Age skew: 25–45. Comfortable with their Mac. Willing to give a menu-bar app screen permissions if it earns the trust.

### Secondary (growth)
- **Developers and technical users** who want to automate UI tasks without writing scripts. Familiar's Agent mode does it from natural language.
- **People who train or onboard others.** Guide mode walks someone through a tool step by step — it's a teaching instrument.
- **Anyone who's tried Rewind, Recall, or similar** and wanted it to *do* something with the history, not just show it back.

---

## §use-cases

Concrete. Each names a real app or situation. These are the scenarios for the homepage — ordered to show all three capabilities.

1. **"What was I working on yesterday afternoon?"** In Chat mode: Familiar searches its screen history — the tabs you had open, the documents you were in, the threads you read — and answers. No notes required.

2. **"Book me a flight to Portland, leaving Friday."** In Agent mode: Familiar opens Safari, navigates to the airline site, fills in the dates, and steps through the booking — the ghost cursor visible at every move, stopping before payment for your approval.

3. **"Walk me through setting up this Postgres database."** In Guide mode: Familiar reads your screen, points to each field or command, tells you what to do, and waits for your click before moving on. You stay at the keyboard; it's the expert.

4. **"What does this error mean?"** In Chat mode, with Terminal or Xcode frontmost: Familiar already sees the error. You don't copy or describe anything — it reads your screen and explains it.

5. **"Rename all these files by their date."** In Agent mode, in Finder: Familiar reads the file names and renames them according to the rule you describe. Done while you do something else.

---

## §voice

### The register
One voice, four contexts. Always: direct, precise, warm without being cute. Treats the reader as a capable adult. Never explains what the reader already knows.

The mental model: a skilled friend sitting next to you at the keyboard. They say "click that blue button" not "please navigate to the relevant interface element." They're quick. They don't over-explain. They're quietly confident.

---

### Headline register

**Sounds like:**
- "Shows you where. Or does it for you."
- "It sees what you're looking at."
- "Doesn't read what it shouldn't."
- "Yours to stop at any time."

**Doesn't sound like:**
- "AI-powered productivity for Mac users" (category label, not a claim)
- "Your intelligent Mac companion" (vague, soft)
- "Supercharge your workflow with Familiar" (hype register, meaningless)
- "The future of human-computer interaction" (grandiose and empty)

**Rules:** Use verbs. Keep it under 8 words. Make it a claim the reader can verify or challenge, not a feeling they're supposed to have.

---

### Body copy register

**Sounds like:**
- "Type 'book me a flight to Portland' and Familiar opens Safari, finds the right page, and fills in the form — stopping before it pays for anything."
- "Switch to 1Password and Familiar stops. That's on purpose. It never reads password fields."
- "The ghost cursor is always visible. You see exactly what Familiar is about to do before it does it."

**Doesn't sound like:**
- "Leverage Familiar's AI-powered contextual awareness to seamlessly accomplish your goals."
- "Our advanced natural language processing understands your intent and maps it to actionable steps."
- "Familiar helps users achieve their productivity objectives through intelligent automation."

**Rules:** Name real apps. Describe what actually happens. Use "you" and "Familiar" as the two actors. Active voice throughout.

---

### UI label register

**Sounds like:**
- "Guide me through this" (not "Enable Guided Assistance Mode")
- "Do it for me" (not "Activate Agent")
- "Stop" (not "Cancel current operation")
- "Try again" (not "Retry")

**Doesn't sound like:**
- Verbs longer than two syllables in a button
- Labels that assume the user already knows the system ("Toggle LLM mode")
- Anything with "AI" in a button label

**Rules:** Imperative, one to three words, describes what happens from the user's perspective not the system's.

---

### Error / notice register

**Sounds like:**
- "Can't see password fields — that's on purpose."
- "Paused. Familiar won't read the screen until you resume."
- "1Password is frontmost. Familiar stopped."

**Doesn't sound like:**
- "An error has occurred. Please try again."
- "Familiar is unable to access the requested screen region at this time."
- "Your privacy settings have prevented Familiar from proceeding."

**Rules:** Specific, honest, never blames the user. If Familiar stopped, say why in plain English. Privacy stops are framed as features, not errors.

---

## §forbidden-phrases

Phrases that make the site sound like every other AI product. **Do not use these in any copy, including UI labels, error messages, or alt text.**

| Phrase | Why |
|--------|-----|
| **"Seamless"** | The most overused word in SaaS copy. Means nothing. If the experience is smooth, the copy will show it. |
| **"Supercharge"** | Pure hype with no content. Every product says this. |
| **"Intelligent"** (as adjective for Familiar) | "Intelligent AI assistant" is redundant and vague. Show what it does, not that it's smart. |
| **"Workflow"** | Bureaucratic. Familiar works with apps and tasks, not workflows. |
| **"Game-changer"** | Tells the reader how to feel, doesn't give them a reason to. |
| **"The future of [X]"** | Every product since 2010 has been the future of something. Means nothing. |
| **"AI-powered"** (as a headline) | By 2026 this is assumed, not differentiating. Lead with what it does, not how it works. |
| **"Productivity"** (as a headline concept) | Familiar isn't a Notion-category productivity tool. "Productivity" positions it wrong and attracts the wrong comparisons. |
| **"Assistant"** (as the primary noun) | "AI assistant" is the generic category. Familiar is more specific than that — it's physically on your screen. Lead with what makes it different. |
| **"Automation"** (as headline concept) | Implies scripts, pipelines, Zapier. Familiar is a ghost cursor that does things — it's more visceral and present than "automation" suggests. |
| **"Copilot"** | Microsoft's trademark and now a generic category term. We're not a copilot. |
| **"Seamlessly integrates"** | Always false, always used to smooth over complexity. |

---

## §value-props

In priority order. These become the homepage sections.

**Priority rationale:** Lead with ambient memory — it's the foundational layer and the most differentiated single feature (passive, always-on, no competitor does it + acts). Then action (Agent), then guided action (Guide), then the privacy layer that makes all of it trustworthy. The ghost cursor is a feature of Agent and Guide, introduced there, not a standalone prop.

---

### 1. Your Mac remembers

**Headline form:** "Your Mac remembers."
**Explanation:** Familiar runs quietly in the background and keeps a private, local index of your screen. What you read, what you built, what you were looking at — ask it later and it knows.
**Concrete example:** "What was I working on yesterday at 3pm?" — Familiar searches its screen history and tells you, without you keeping any notes.
**Why it's #1:** This is the ambient layer — the thing that makes Familiar qualitatively different from a chatbot or a one-shot tool. It accumulates value over time. It's also the hook: once someone understands their Mac can *remember*, they want it. Lead with the hook.

---

### 2. Does it for you

**Headline form:** "Does it for you."
**Explanation:** Describe a task and Familiar handles it — navigating, clicking, filling in forms — on your actual screen, in real apps. A ghost cursor traces every move so you can watch and stop it at any time.
**Concrete example:** "Book me a flight to Portland, leaving Friday." — Familiar opens Safari, finds the page, fills in the dates, and stops before paying for anything.
**Why it's #2:** Agent mode is the most powerful and most surprising capability. "Does it for you" is the clearest value claim in the product. The ghost cursor gets mentioned here as a trust mechanic, not a lead feature.

---

### 3. Or walks you through it

**Headline form:** "Or walks you through it."
**Explanation:** In Guide mode, Familiar points to each step and waits for your click — you stay at the keyboard, it provides the expertise. Same command, different amount of control.
**Concrete example:** "Walk me through setting up this database." — Familiar reads the screen, points to each field, and tells you exactly what to type before moving on.
**Why it's #3:** Guide mode is the conservative, trust-building mode. It pairs with Agent on the same page to show that Familiar adjusts to how much you want to hand off.

---

### 4. Doesn't read what it shouldn't

**Headline form:** "Doesn't read what it shouldn't."
**Explanation:** Password fields, 1Password, Keychain, and other sensitive apps are blocked automatically — no configuration. Familiar stops when you switch to them. You can also pause it entirely with ⌘⇧P.
**Concrete example:** You're mid-task and switch to 1Password. Familiar stops immediately. No screenshot taken, no AI call made.
**Why it's #4:** The ambient memory and agent capabilities both require screen access. Privacy gates are what make that access trustworthy. This isn't a footnote — it's the reason a careful person says yes.

---

### Note on the ghost cursor
The ghost cursor is *how Agent and Guide mode look*, not a value prop on its own. It earns a mention inside prop #2 ("a ghost cursor traces every move") and prop #3 ("Familiar points to each step"). It does not have its own section. Its job is to make the agent/guide capabilities feel transparent and controllable — it serves the trust argument, not the acquisition argument.
