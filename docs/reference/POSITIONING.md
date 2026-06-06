# POSITIONING.md

> **STATUS: IN PROGRESS — Session 1**
> Parts 1–4 written. Part 5 (final synthesis) pending review.

---

## §pitch

### Recommended
**"Familiar puts a ghost cursor on your Mac's screen — it shows you where to click, or clicks there for you."**

Passes the checks:
- Non-technical reader sees the image immediately (cursor, screen, click)
- Zero AI-product jargon (no "assistant," "copilot," "intelligent," "workflow")
- Captures physicality: something *appears on your screen*
- Concrete nouns throughout: Mac, cursor, screen, click

### Alternative A
"Familiar is a Mac app that walks you through anything on your screen — step by step, with a glowing cursor you can see — or just does it for you."

Longer, warmer, captures the two modes explicitly. Trades punching power for accessibility.

### Alternative B
"Tell Familiar what you want, and a glowing cursor appears on your Mac — pointing the way, or taking over the mouse entirely."

Input → output structure. "Taking over the mouse" is viscerally vivid but may read as threatening to cautious users.

### Recommendation
Go with the recommended. The ghost cursor is the product's entire personality; putting it first sentence-one is right. "Shows you where to click, or clicks there for you" handles both Guide and Agent in eight words.

---

## §audience

### Primary (at launch)
**Mac users who know there's a better way but don't want to become an expert in every app they touch.**

More precisely: independent professionals (freelancers, consultants, solopreneurs, researchers) who spend time in apps outside their area of expertise — filing taxes in TurboTax, managing travel on an airline site, navigating an unfamiliar CMS. They're comfortable with their Mac. They've tried asking ChatGPT and found it doesn't help with the actual screen in front of them. They're not looking for automation — they're looking for a skilled friend sitting next to them.

Age skew: 25–45. Technical enough to download a menu-bar app from a website. Non-technical enough that complex unfamiliar UIs are still friction.

### Secondary (growth)
- **Developers who want to automate without writing scripts.** Familiar's Agent mode can handle multi-step UI tasks. No AppleScript, no browser plugins.
- **People who train or teach others.** Guide mode is literally a teaching tool — it narrates every step and waits for a click. Onboarding new team members to a tool, teaching a parent how to use their Mac.
- **Power users who want less friction with complex apps.** Photoshop menus, Excel formulas, Logic Pro routing — tasks where knowing *what* to do isn't the problem, finding *where* it is takes half the time.

---

## §use-cases

Concrete. These are the scenarios that will appear on the homepage. Each names a real app or site.

1. **"Book me a flight."** In Agent mode: Familiar opens Safari, navigates to the airline site, fills in the dates and destination, and walks through the booking steps while you watch — stopping before payment for your approval.

2. **"Walk me through my taxes."** In Guide mode: Familiar points to each field in TurboTax, tells you what to enter, and waits for your click at each step. You stay in control; it's the expert.

3. **"What does this error mean?"** In Chat mode, with Xcode or Terminal frontmost: Familiar reads the error on your screen and explains it without you copying or describing anything. It already knows what you're looking at.

4. **"Move all these screenshots into the right folders."** In Agent mode, in Finder: Familiar reads the file names and moves them according to a rule you describe. Repetitive work done while you do something else.

5. **"What was I reading last Thursday about typography?"** In Chat mode: Familiar searches its screen history and finds the article — because it's been watching your screen (privately, locally, for you only).

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

**Priority rationale:** Lead with what's most differentiated (visibility/trust), then the core value (two modes), then what makes it feel magic (screen context), then what makes it trustworthy (privacy), then the memory feature (which requires the most user trust).

---

### 1. You see every move

**Headline form:** "You see every move."
**Explanation:** The ghost cursor is always visible. Familiar shows you exactly what it's about to do before it does it — you stay in control because you can see what's happening.
**Concrete example:** Watch the ghost cursor fly to System Settings, find the Night Shift toggle, and flip it — every step visible, any step stoppable.
**Why it's #1:** Trust is the primary objection to handing your screen to software. Visibility is the answer. Lead with it.

---

### 2. Guide me or do it for me

**Headline form:** "Guide me, or do it for me."
**Explanation:** In Guide mode, Familiar points — you click. In Agent mode, Familiar does it for you. Same question, different amount of trust. You decide per task.
**Concrete example:** "Book a flight" in Guide walks you through every click. In Agent, Familiar opens the site, fills the form, and stops before payment for your approval.
**Why it's #2:** This is the core product differentiator. Two modes on one input.

---

### 3. It sees what you're looking at

**Headline form:** "It sees what you're looking at."
**Explanation:** Familiar reads your live screen — you never have to copy, paste, or describe what's in front of you. Chat mode is grounded in actual screen content.
**Concrete example:** Terminal shows an error. Ask "what does this mean?" — Familiar already sees it.
**Why it's #3:** Chat mode's magic is the real-time screen grounding. This is what makes it different from asking ChatGPT in a separate window.

---

### 4. Doesn't read what it shouldn't

**Headline form:** "Doesn't read what it shouldn't."
**Explanation:** Familiar never reads password fields, 1Password, Keychain, or other sensitive apps — automatically, by default, no configuration needed. You can also pause it with ⌘⇧P.
**Concrete example:** Switch to 1Password mid-task. Familiar stops. No screenshot taken. No AI call made.
**Why it's #4:** Privacy gates make the product trustworthy on screens that matter. This is a feature lead, not a legal disclaimer.

---

### 5. Remembers your screen

**Headline form:** "Remembers your screen."
**Explanation:** Familiar keeps a private, local history of your screen — for you only, on your machine. Chat can recall things you read days ago without you keeping notes.
**Concrete example:** "What was that typography article I was reading Thursday?" — Familiar finds it from your screen history.
**Why it's #5:** This is the most powerful but also the most trust-dependent feature. Put it after trust has been established by props 1 and 4.
