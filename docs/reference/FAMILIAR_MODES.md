# Familiar — Modes Reference

Extracted and expanded from `FAMILIAR_README.md` for use in website copy sessions. This doc is the authoritative source for how to describe Guide, Agent, and Chat on any page.

---

## The Three Modes

Familiar operates in three distinct modes. The mode is selected via a pill in the command bar or the menu bar. Each mode has a distinct promise to the user.

### Guide Mode

**What it does:** Familiar watches your screen, and when you give it a task, it shows you where to click — step by step. A glowing blue ghost cursor appears on your screen, flies to the right element, and shows a short speech bubble telling you what to do. Familiar waits for *your* click before advancing to the next step.

**Key mechanics:**
- The ghost cursor is visible; the real cursor remains yours
- Familiar never clicks or types for you in Guide mode
- Works on every monitor (multi-monitor aware)
- If you click the wrong place, Familiar re-coaches once, then adapts
- Flip to Agent mid-task and Familiar hands off cleanly

**Voice for copy:** "Shows you the way." / "Your on-screen guide." / "Point-by-point navigation without taking over."

**What Guide is NOT:** It is not an autopilot. It does not perform actions. It is a patient teacher standing next to you.

---

### Agent Mode

**What it does:** Familiar takes the wheel. You describe a task; Familiar does it — clicking, typing, navigating — while the ghost cursor narrates every move so you can see what's happening. Before any irreversible action (submit, send, delete, pay), Familiar pauses and asks for your approval.

**Key mechanics:**
- The ghost cursor shows; the real cursor follows
- AX-press + CGEvent: clicks land precisely on small targets
- Before irreversible actions: an approval card appears (Approve / Cancel)
- Press Escape at any time to take back control instantly
- Double-tap Escape or ⌘⇧Space to stop the run completely
- Familiar acts "like a person with the mouse" — clicks real UI, uses the address bar, opens apps from the Dock — not keyboard shortcuts as a default

**Voice for copy:** "Does it for you." / "Your hands on the keyboard." / "Handles the task while you watch."

**What Agent is NOT:** Blind automation. The ghost cursor shows every move. You can stop it at any time. Irreversible actions require your approval.

---

### Chat Mode

**What it does:** Conversational questions and answers, grounded in what's on your screen right now and what's been on your screen recently. No cursor activity. Ask Familiar to summarize a page, explain what you were working on yesterday, or answer a question about something on screen.

**Key mechanics:**
- No cursor movement, no clicks, no keyboard input
- Grounded in the live screen context (screenshots + text)
- Can recall your screen history ("what was I reading this afternoon?")
- Uses the continuous screen-history index built by the recorder
- Model: claude-sonnet-4-6 (stronger reasoning for conversation)

**Voice for copy:** "Ask anything about your screen." / "Context-aware conversation." / "Your ambient memory."

**What Chat is NOT:** A general-purpose chatbot. It's specifically grounded in what's on and has been on your screen.

---

## Mode Switching

- Toggle: `⌘⇧M` or the mode pill in the command bar or the tray menu
- Switching mid-task in Guide mode cancels the pending wait cleanly
- Switching mid-task in Agent mode stops the run and releases the cursor

---

## Privacy & Exclusions

In ALL modes, Familiar refuses to read the screen (no screenshot, no AI call) when:
- Familiar is paused (`⌘⇧P` or tray menu)
- The frontmost app is on your excluded list (default: 1Password, Keychain Access, Wallet, Passwords, NordPass, LastPass — editable in Settings)
- A password/secure text field is focused

The command bar shows a short notice in these cases.

---

## Copy notes for the website

> **These are direction-setting examples, not approved copy.** The "Voice for copy" phrasings under each mode are starting points for the copy session, not finished lines. Final copy goes through Session 3 and is committed to `COPY.md`. Do not use these phrasings verbatim in any component.



- **Always call the ghost cursor "the ghost cursor"** (or just "Familiar") — not "the AI cursor," "the agent cursor," or similar.
- **Guide/Agent/Chat are proper nouns** — capitalize them consistently.
- **"Does it for you"** is Agent's core proposition. Don't dilute it with hedges in hero copy.
- **"Shows you the way"** is Guide's core proposition. Emphasize that you stay in control.
- **The privacy gates are a feature, not a footnote.** Familiar doesn't read sensitive things. Lead with this if the audience is security-conscious.
- **Modes are not tiers.** Guide is not "beginner" and Agent is not "advanced." They're different strategies for different tasks.
