# POSITIONING.md

> **STATUS: COMPLETE — Session 1**

---

## pitch

**"Familiar is a Mac assistant that keeps a running memory of your screen — and can step in to handle tasks for you, or walk you through them click by click."**

- Non-technical reader gets all three layers: memory, action, guidance
- "Tasks" bridges the memory and action clauses — clear referent for "them"
- No jargon, no AI-product abstractions
- Concrete nouns: Mac, screen, tasks, click by click

---

## audience

### Primary
Knowledge workers and independent professionals (researchers, consultants, designers, engineers, solopreneurs) who spend hours a day on their Mac doing substantive work. They accumulate context across sessions — tabs, documents, apps, notes — and lose track of it. They also encounter tools outside their expertise, and tasks tedious enough to delegate if they could.

They're not early adopters specifically. They're people whose work is complex enough that the gap between "my Mac can handle this" and "I have to do this myself" is real and felt daily.

Age skew: 25–45. Comfortable with their Mac. Willing to give a menu-bar app screen permissions if it earns the trust.

### Secondary
- **Developers and technical users** who want to automate UI tasks without writing scripts.
- **People who train or onboard others.** Guide mode is a teaching instrument — it narrates every step and waits for a click.
- **Anyone who's tried Rewind, Recall, or similar** and wanted it to *do* something with the history, not just show it back.

---

## use-cases

Each names a real app or situation. These are the homepage scenarios, ordered to show all three capabilities.

1. **"What was I working on yesterday afternoon?"** Familiar searches its running memory — tabs open, documents in progress, threads read — and answers. No notes required.

2. **Learning Figma, Blender, or CAD — without opening a YouTube tab.** Familiar reads the screen and guides you through the software: pointing to the right panel, telling you what to click, waiting before moving on. The tutorial is right on top of the app. No pausing, no tabbing away, no losing your place.

3. **"Book me a flight to Portland, leaving Friday."** Familiar opens Safari, navigates to the airline site, fills in the dates, and steps through the booking — the ghost cursor visible at every move — stopping before payment for your approval.

4. **"What does this error mean?"** Terminal or Xcode is frontmost. Familiar already sees the error. You don't copy or describe anything.

5. **"Rename all these files by their date."** Familiar reads the file names in Finder and renames them according to the rule you describe. Done while you do something else.

**Guide mode copy note:** The strongest argument for Guide mode is not "it helps with hard things" — it's "you never have to leave the screen to learn." Figma, Blender, After Effects, CAD tools — software that normally sends you to YouTube. Use that framing in Guide mode copy.

---

## voice

**The register:** Direct, precise, warm without being cute. Treats the reader as a capable adult. A skilled friend sitting next to you at the keyboard — they say "click that blue button," not "navigate to the relevant interface element." Quick, unhedged, quietly confident.

### Headline register

Sounds like:
- "Your Mac remembers."
- "Never leave the screen to learn."
- "Doesn't read what it shouldn't."

Doesn't sound like:
- "AI-powered productivity for Mac users"
- "Your intelligent Mac companion"
- "Supercharge your workflow"

Rules: verbs over nouns, under 8 words, a claim the reader can verify — not a feeling they're supposed to have.

### Body copy register

Sounds like:
- "Type 'book me a flight to Portland' and Familiar opens Safari, finds the page, and fills in the form — stopping before it pays for anything."
- "Switch to 1Password and Familiar stops. That's on purpose. It never reads password fields."
- "The ghost cursor is always visible. You see exactly what Familiar is about to do before it does it."

Doesn't sound like:
- "Leverage Familiar's AI-powered contextual awareness to seamlessly accomplish your goals."
- "Our advanced natural language processing maps your intent to actionable steps."

Rules: name real apps, describe what actually happens, "you" and "Familiar" as the two actors, active voice throughout.

### UI label register

Sounds like: "Guide me through this" / "Do it for me" / "Stop" / "Try again"

Doesn't sound like: "Enable Guided Assistance Mode" / "Activate Agent" / "Cancel current operation"

Rules: imperative, 1–3 words, the user's perspective not the system's. No "AI" in a button label.

### Error / notice register

Sounds like:
- "Can't see password fields — that's on purpose."
- "Paused. Familiar won't read the screen until you resume."
- "1Password is frontmost. Familiar stopped."

Doesn't sound like:
- "An error has occurred. Please try again."
- "Familiar is unable to access the requested screen region at this time."

Rules: specific, honest, never blames the user. Privacy stops are features, not errors.

---

## forbidden-phrases

Do not use these anywhere — copy, UI labels, error messages, alt text.

| Phrase | Why |
|--------|-----|
| **"Seamless"** | Overused filler. If the experience is smooth, the copy will show it. |
| **"Supercharge"** | Hype with no content. |
| **"Intelligent"** (as adjective for Familiar) | Vague and redundant. Show what it does. |
| **"Workflow"** | Bureaucratic. Familiar works with apps and tasks. |
| **"Game-changer"** | Tells the reader how to feel without giving them a reason. |
| **"The future of [X]"** | Every product claims this. Meaningless. |
| **"AI-powered"** (as a headline) | Assumed by 2026. Not differentiating. Lead with what it does. |
| **"Productivity"** (as headline concept) | Wrong category framing. Attracts the wrong comparisons. |
| **"Assistant"** (as primary noun) | Generic category. Familiar is more specific — it's on your screen, operating on your Mac. |
| **"Automation"** (as headline concept) | Implies scripts and pipelines. Familiar is present and visible, not background automation. |
| **"Copilot"** | Microsoft's term, now a category. We're not a copilot. |
| **"Seamlessly integrates"** | Always false, always used to smooth over complexity. |

---

## value-props

Priority order. These become the homepage sections.

### 1. Your Mac remembers

**Headline:** "Your Mac remembers."
**One line:** Familiar keeps a private, local running memory of your screen — what you read, built, and looked at — so you can ask about it later.
**Example:** "What was I working on yesterday at 3pm?" Familiar tells you, without you keeping any notes.

### 2. Does it for you

**Headline:** "Does it for you."
**One line:** Describe a task and Familiar handles it — navigating, clicking, filling in forms — on your actual screen, in real apps, with a ghost cursor visible at every move.
**Example:** "Book me a flight to Portland, leaving Friday." Familiar opens Safari, fills in the dates, and stops before paying for anything.

### 3. Or walks you through it

**Headline:** "Or walks you through it."
**One line:** In Guide mode, Familiar points to each step and waits for your click — the tutorial lives right on top of the app, so you never have to leave the screen to learn.
**Example:** First time in Blender. Familiar reads the screen, points to the right panel, tells you what to click, and waits. No YouTube tab.

### 4. Doesn't read what it shouldn't

**Headline:** "Doesn't read what it shouldn't."
**One line:** Password fields, 1Password, Keychain — blocked automatically, no configuration. Familiar stops when you switch to them.
**Example:** Mid-task, you switch to 1Password. Familiar stops immediately. No screenshot, no AI call.

### Ghost cursor note
The ghost cursor is how Agent and Guide mode look, not a standalone value prop. It appears inside prop #2 ("a ghost cursor visible at every move") and prop #3 ("Familiar points to each step") as a trust mechanic. It does not have its own section.
