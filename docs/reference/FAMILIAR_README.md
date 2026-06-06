# Familiar

A Mac-native ambient agent. Reads the active window (and surrounding session)
via the macOS Accessibility API, passes context to an LLM, and can either
**guide** the user (ghost cursor shows where to click — user clicks), **act** for
them (ghost cursor moves and clicks automatically), or **chat** context-aware about
what's currently on screen and what's been on screen recently.

Familiar runs on two machines: a **Mac Studio (server)** that holds the
Anthropic + Voyage keys and exposes the API over ngrok, and **your
laptop (client)** running the Electron app. Setup for each is below.

## Native Swift rewrite (in progress)

The desktop **client** is being rebuilt as a native macOS **Swift/AppKit** app under
[`mac/`](mac/); the Mac Studio backend (`services/api`) + Supabase are reused as-is.
Everything else in this README — and `app/` · `core/` · `tools/` — describes the
**Electron** client, which stays in the tree until the final cutover. The migration is
planned end-to-end in [`PROMPTS.md`](PROMPTS.md) (20 sessions, 4 phases).

Build the native app in **Xcode only**: `cd mac && xcodegen generate`, open
`mac/Familiar.xcodeproj`, set your signing team, Cmd+R. Never run `xcodebuild` from the
terminal — it resets macOS TCC permissions. The `.xcodeproj` is gitignored and
regenerated; `mac/project.yml` is the source of truth.

The native app ships the same **three public values** the Electron client uses, in
its bundle `Info.plist` (`mac/Familiar/Info.plist`): `SUPABASE_URL` +
`SUPABASE_ANON_KEY` (for sign-in) and `FAMILIAR_SERVER_URL` (the ngrok URL of your
Mac Studio backend — used by the agent loop, `/v1/locate`, voice, and
`/v1/me/entitlements`). No third-party API keys ever ship in the app; everything
privileged stays on the backend. The backend keys are exactly as documented under
[Setup](#setup) below — Session 8 added `ASSEMBLYAI_API_KEY`, `ELEVENLABS_API_KEY`,
and `ELEVENLABS_VOICE_ID` to `services/api/.env` for the voice routes. On first run
the native app writes only `~/.familiar/config.json`
(`{ onboarding_complete, excluded_apps, paused }`).

- **Session 1 (2026-06-02)** — `mac/` skeleton: menu-bar-only app (no Dock icon), a
  floating command bar (⌘⇧Space), Guide/Agent mode toggle (⌘⇧M, synced to the menu),
  and a `CommandRouter` stub logging `[<Mode>] <text>` to `/tmp/familiar-mac.log`.
- **Session 2 (2026-06-02)** — Supabase sign-in + macOS permissions. Sign in / create
  an account (or send yourself a password-reset link) from a native window that opens
  on first launch and from the menu bar. Your session is stored in the macOS Keychain
  and the access token auto-refreshes, so you stay signed in across relaunches. A
  Permissions window shows live Accessibility / Screen Recording / Input Monitoring /
  Microphone status with one-tap Grant buttons that open the right System Settings pane.
- **Session 3 (2026-06-02)** — Vision capture + a backend element locator. Familiar can
  now grab one screenshot per display (longest side ≤1280px, its own windows hidden, the
  cursor's screen first); a "Debug: capture screens" menu item writes them to
  `/tmp/familiar-capture-<n>.jpg`. The Mac Studio backend gains `POST /v1/locate`, which
  turns a screenshot + a plain-language element description into pixel coordinates via
  Anthropic Computer Use — the API key stays on the server, and the request logs no image data.
- **Session 4 (2026-06-02)** — The agent loop — Familiar's brain. When you type a command,
  it screenshots your screen, asks Claude what to do next, and pinpoints exactly where each
  described target sits on screen (via the backend locator), one step at a time (up to 20),
  in Guide or Agent mode. This session **resolves and logs** each action to
  `/tmp/familiar-mac.log` — the visible ghost cursor and real clicks land in the next
  sessions. ⌘⇧Space cancels a run in progress.
- **Session 5 (2026-06-03)** — The ghost cursor you can see. A glowing blue
  cursor now appears on screen, flies in a smooth curved arc to wherever
  Familiar wants to point, rotates to face the way it's moving, pulses and
  glows mid-flight, and pops up a small speech bubble that types itself out
  beside it. It works on **every** monitor — fixing an old limitation where the
  ghost only ever showed on the main display. Try it from the tray menu →
  **"Debug: fly ghost"**: the ghost appears at your pointer and flies to the
  center of each screen in turn. (Wiring it into the actual Guide/Agent steps
  comes next.)
- **Session 6 (2026-06-03)** — Guide mode works end to end. Ask Familiar to do
  something ("search Wikipedia for otters") in **Guide** mode and the blue ghost
  now flies to each spot you need, shows a short bubble telling you what to do,
  and **waits for your own click** before moving on — it never clicks or types
  for you. Click the highlighted spot and it advances; click somewhere else and
  it nudges you once, then adapts. Flip the pill to Agent mid-task and it hands
  off cleanly; ⌘⇧Space cancels. (Agent mode performing the clicks *itself* is
  the next session.)
- **Session 7 (2026-06-03)** — Agent mode acts for you. Ask Familiar to do
  something in **Agent** mode and it now performs it like a person at the
  keyboard: the ghost flies to the real button / Dock icon / address bar and
  the real cursor and keyboard click and type there. Clicks are precise (it
  uses the accessibility action of whatever's under the point, falling back to
  a normal click), and keyboard shortcuts / launching an app / opening a URL
  are used only as *backups* when the on-screen UI can't be used. It asks for
  **approval** before anything irreversible (send, submit, delete, pay). If a
  step does nothing it tries a different approach, and after two dead ends it
  pauses and asks you to finish that step by hand ("Done, continue" / "Skip").
  **Press Escape** to grab the mouse back instantly; **double-tap Escape** (or
  ⌘⇧Space) to stop the run completely. The whole loop runs on Claude Sonnet 4.6.
- **Session 8 (2026-06-03)** — Talk to Familiar. Hold **⌃⌥ (Control+Option)**
  and speak a command instead of typing it — a small waveform appears near the
  command bar and your words stream into it live; release the keys and the
  transcript drives the **same** Guide or Agent run typing would, in whatever
  mode the pill is on. Speech is transcribed by AssemblyAI, and Familiar can
  speak its reply back (ElevenLabs) while the ghost's bubble streams the same
  text — toggle **"Speak replies"** in the menu (on by default). Both voices go
  through the Mac Studio backend, so no AssemblyAI / ElevenLabs keys ever live
  in the app. Needs Microphone (first use prompts) + Input Monitoring.
- **Session 9 (2026-06-03)** — First-launch onboarding, your plan, and privacy
  gates — closing out **Phase 1**. On first launch a native **4-screen wizard**
  walks you through Welcome → **Sign in / Create account** (required) →
  **Permissions** (Accessibility, Screen Recording, Input Monitoring; Microphone
  optional) → Done, then never appears again. The menu shows your live plan
  (**Plan: Free / Pro**), fetched from the backend. And Familiar now **refuses to
  read the screen** — no screenshot taken, no AI call made — whenever you've
  **paused** it (menu or the new **⌘⇧P**, which greys the status dot), whenever
  the frontmost app is on your **excluded list** (1Password, Keychain Access,
  Wallet, Passwords, NordPass, LastPass by default), or whenever a **password
  field is focused**; the command bar shows a short notice instead. This applies
  to both typed and spoken commands.

> **Native client status (Phase 1 complete).** The `mac/` app is now a full live
> assistant: menu bar + command bar, sign-in, vision capture + element locating,
> the agent loop, the multi-monitor ghost cursor, Guide mode, Agent mode, voice,
> onboarding, a plan readout, and the privacy gates. Vision-first design: Familiar
> reasons over screenshots and names targets in plain language, which the backend
> turns into coordinates via Anthropic Computer Use (`/v1/locate`); in Agent mode
> it acts like a person (the ghost shows, and a precise AX-press / synthetic click
> does), preferring real UI over shortcuts. Still **deferred to Phases 2–4** (and
> available only in the Electron client until the cutover): Chat mode, the
> encrypted memory store + continuous recorder + recall, cloud sync + multi-device,
> self-learning skills, the full Settings window + data export, and authoritative
> free/pro enforcement (Phase 1 only *reads* your plan). The legacy Electron client
> below stays the full-featured product until then.

## Modes

- **Guide** — ghost cursor narrates each step (`move_cursor` + `bubble_text`),
  intercepts `click`/`type_text` and waits for the user's physical click in the
  hit zone around the ghost.
- **Agent** — real cursor follows the ghost. Familiar performs the task for the
  user. Before any irreversible action (Submit / Send / Confirm / Delete / Pay)
  the bar shows an approval card with Approve / Cancel buttons. Press Escape
  any time to fully release control (the agent's clicks and keypresses also
  stop, not just the cursor lock).
- **Chat** — no cursor activity. Conversational answers grounded in screen
  context + the continuous screen-history index.

## Setup

Familiar has two halves. Set up the server first; the laptop needs
the server's URL to function.

### 1. Mac Studio (server)

Requirements: macOS 14+, Node 20+, an [ngrok](https://ngrok.com)
account (free tier is fine), an **Anthropic API key**, a
**Voyage AI API key**, and the shared Supabase project (URL + service
key + JWT secret — the same project the laptop's auth uses).

Secrets live in `services/api/.env` (copy from `.env.example` and fill in
the values below). The Dockerized stack reads the same file via the compose
`env_file` directive. `infra/.env` holds the ngrok variables — copy from
`infra/.env.example` and add your `NGROK_AUTHTOKEN` + `NGROK_STATIC_DOMAIN`.

#### Docker-first setup (recommended)

The full backend stack — `familiar-api` + `ngrok` — runs in
[OrbStack](https://orbstack.dev) via Docker Compose. Both services
auto-restart on crash and come up with a single command. See
[`infra/README.md`](infra/README.md) for the complete walkthrough;
the short version:

```bash
brew install orbstack ngrok
ngrok config add-authtoken <YOUR-NGROK-TOKEN>
# Reserve a static domain at https://dashboard.ngrok.com/domains.

git clone https://github.com/nickkozh/familiar.git
cd familiar
cp infra/.env.example infra/.env             # fill in NGROK_AUTHTOKEN + NGROK_STATIC_DOMAIN
cp services/api/.env.example services/api/.env  # fill in API keys (below)

npm run api:docker:build
npm run api:docker:up
npm run api:docker:health
# → {"ok": true, "service": "familiar-api", "ts": "..."}
```

The ngrok inspector lives at http://localhost:4040.
`npm run api:docker:down` stops the stack; the SQLite db survives.

#### Manual setup (without Docker)

If you'd rather run the API as a plain Node process (handy for
iterating on `services/api/src`), clone the repo and install just
the backend's deps:

```bash
git clone https://github.com/nickkozh/familiar.git
cd familiar/services/api
npm install
cp .env.example .env
```

Edit `services/api/.env` and fill in real values for at minimum:

```
ANTHROPIC_API_KEY=sk-ant-...           # the Claude key the laptop no longer holds
VOYAGE_API_KEY=pa-...                  # the Voyage key the laptop no longer holds
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SERVICE_KEY=eyJ...            # server-only; bypasses RLS for /v1/recall + profiles.plan
SUPABASE_JWT_SECRET=...                # Dashboard → Settings → API → JWT Secret; verifies the desktop's session token
PORT=8787
```

Start the API:

```bash
npm run dev
# → familiar-api listening on http://0.0.0.0:8787
# → familiar-api: set FAMILIAR_SERVER_URL=http://localhost:8787 in desktop .env
```

Confirm with `curl localhost:8787/health` from another terminal on
the Mac Studio.

**Expose it over ngrok** with a stable reserved domain so the URL
doesn't change between Mac Studio restarts:

```bash
# One-time:
ngrok config add-authtoken <YOUR-NGROK-TOKEN>
# Then reserve a static domain in the ngrok dashboard → Domains.

# Every time the Mac Studio boots:
ngrok http --domain=your-static-domain.ngrok-free.app 8787
```

Smoke from another machine:

```bash
curl https://your-static-domain.ngrok-free.app/health
# → {"ok":true,"service":"familiar-api","ts":"..."}
```

For launchd auto-start (so the API + ngrok survive reboots), see
[`infra/README.md`](infra/README.md).

### 2. Your laptop (client)

Requirements: macOS 14+ on Apple Silicon, Node 20+, Python 3.11,
and the ngrok URL from the Mac Studio above. You do **not** need an
Anthropic or Voyage key on the laptop — the backend holds those — and
there is no shared API token (SESSION 24): the laptop authenticates to
the backend with your live Supabase session, so you just sign in.

```bash
git clone https://github.com/nickkozh/familiar.git
cd familiar
npm install
npx @electron/rebuild -v 41.7.0 -w better-sqlite3 -p   # ABI lock to Electron 41
python3.11 -m venv .venv && .venv/bin/pip install -r requirements.txt
```

The desktop needs only three variables — `FAMILIAR_SERVER_URL`,
`SUPABASE_URL`, and `SUPABASE_ANON_KEY` — in the root `.env`. The anon key
is public and RLS-bound (safe in the client); the desktop never holds the
Supabase service key or any Anthropic/Voyage key.

Launch:

```bash
npm run dev          # → npm start (loads root .env via dotenv)
```

On first launch Familiar walks you through a **4-screen onboarding flow**:
Welcome → **Sign in / Create account** (email + password — the only thing
you ever type) → **Permissions** (grant **Accessibility**, **Screen
Recording**, **Input Monitoring**) → Done. Signing in is required: the
agent, chat, and recall all run through the backend authenticated by your
Supabase session, so there is no local-only mode. The flow writes
`~/.familiar/config.json` (`{ onboarding_complete, excluded_apps, paused }`
— no keys, no provider, no server URL) and never appears again. Manage your
account, plan, privacy, and permissions anytime via the tray icon →
Settings.

Watch `/tmp/familiar-main.log` while you use the app — once signed in
you should see `[server] health: ok` and `[server] entitlements: free`
(or `pro`) shortly after boot. If you see `Cannot reach Familiar
server`, your `FAMILIAR_SERVER_URL` is wrong or the Mac Studio is down.
Entitlements only load while signed in; signed-out runs prompt the
account screen.

The command bar appears at the bottom-centre of the primary display.

- **`Cmd+Shift+Space`** or **click the tray icon** — toggle bar
  visibility.
- **`Cmd+Shift+M`** or **the `[Guide | Agent | Chat]` pill** — cycle
  modes.
- **Tray right-click → Mode** — pick Guide / Agent / Chat directly. The
  current mode shows a radio checkmark. Useful when the bar is hidden
  during a run; the bar pops back open so you can see the new pill.
- **Escape** — close the bar (with empty input) or collapse the
  expanded panel.
- **`Cmd+Shift+P`** — pause / resume Familiar. While paused, the
  recorder stops capturing snapshots, the agent loop refuses to
  run, and the tray icon turns gray with a pause-bars overlay.
  The right-click menu shows "Resume Familiar" while paused.
- **Tray right-click** — Pause / Resume Familiar, Settings, About
  Familiar, Quit. The Settings window has four tabs: **Account**
  (signed-in email, Sign Out, devices, password reset), **Plan**
  (current free/pro plan + "Upgrade to Pro"), **Privacy** (pause
  toggle, excluded-apps list, data management — delete last hour /
  today / everything, export to zip), and **Permissions** (re-check /
  re-grant the three macOS permissions). The bar's logo icon opens the
  same window. "About Familiar" opens the macOS-native About panel
  (name, version, tagline).

Familiar will not read the screen when:

- The recorder is paused (tray menu or `Cmd+Shift+P`).
- The frontmost app's name matches an entry in **Excluded Apps**
  (defaults include 1Password, Keychain Access, Wallet, Passwords,
  NordPass, LastPass — editable in Settings).
- A password / secure text field is focused (auto-exclusion via
  AXSecureTextField).

In any of these cases the bar surfaces a short notice and no LLM
call is made.

Logs: every line from the Electron main process goes to
`/tmp/familiar-main.log`. `tail -f /tmp/familiar-main.log` while you
use the app.

### Environment variables (reference)

Secrets live in `.env` files, not a secret manager. Copy the `.env.example`
for each side and fill in the real values.

**Desktop app — root `.env`:**

```
FAMILIAR_SERVER_URL    # https://your-static-domain.ngrok-free.app
SUPABASE_URL           # https://<project>.supabase.co
SUPABASE_ANON_KEY      # public, RLS-bound — safe in the client
```

The desktop holds **only** these three. `ANTHROPIC_API_KEY`,
`VOYAGE_API_KEY`, `ASSEMBLYAI_API_KEY`, `ELEVENLABS_API_KEY`, and the
Supabase **service** key are never present on the desktop — it
authenticates to the backend with the Supabase access token (JWT) it
gets when you sign in.

**Backend server — `services/api/.env`:**

```
ANTHROPIC_API_KEY
VOYAGE_API_KEY
ASSEMBLYAI_API_KEY       # voice: mints short-lived streaming-STT tokens
ELEVENLABS_API_KEY       # voice: text-to-speech for spoken replies
ELEVENLABS_VOICE_ID      # voice: which ElevenLabs voice speaks
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_KEY     # bypasses RLS — backend only
SUPABASE_JWT_SECRET      # Dashboard → Settings → API → JWT Secret
PORT                     # default 8787
```

**ngrok / infra — `infra/.env`:**

```
NGROK_AUTHTOKEN          # from dashboard.ngrok.com
NGROK_STATIC_DOMAIN      # your-static-domain.ngrok-free.app
```

### Smoke tests

Run each from the project root:

```bash
npm run agent:test       # guide-mode end-to-end with Safari frontmost
npm run cursor:test      # ghost + real cursor sync demo
npm run overlay:test     # standalone overlay window
npm run memory:test      # SQLite session/summary round-trip (plain Node)
npm run skills:test      # skill write/load round-trip
npm run quickinput:test  # bar autotest, tails /tmp/familiar-main.log
npm run native:test      # label-based click/type test in Finder + Mail
npm run fallback:test    # vision-fallback smoke (plain Node, Sonnet 4.6)
npm run onboarding:test  # force-shows the 5-screen onboarding window
npm run settings:test    # auto-opens the settings window on boot
npm run api:test         # Mac Studio backend smoke (spawns services/api)
npm run server:test      # desktop server.js smoke — 4 scenarios end-to-end
```

Electron-loaded scripts all clear the project-wide
`ELECTRON_RUN_AS_NODE` env var via an `ELECTRON_RUN_AS_NODE=` prefix
— see `package.json`. If a script ever appears to behave like plain
Node (`require("electron")` returns a path string), check that prefix
is in place.

## Continuous screen history

A background recorder captures text-only snapshots of the user's
screen state and indexes them for retrieval via the `recall` agent
tool. Chat mode uses this to answer questions like *"what was I
working on yesterday afternoon?"*. The index lives in the encrypted
`~/.familiar/memory.db` with 30-day retention by default
(configurable). Behind-the-scenes framework — not a user-facing
surface on its own.

## Cloud sync & account

Familiar uses **one shared Supabase project** (the Pro project). Every
user lives in that single project, isolated by `user_id` + row-level
security (RLS) — you never create a project, see a key, or configure
anything. The desktop holds only the public **anon key** (via Doppler)
and uses it solely for `supabase.auth` (sign in / sign up / session
refresh); all privileged database work is done by the Mac Studio backend
with the **service key**, scoped to your verified JWT `user_id`.

Signing in is **required** — the agent, chat, and recall all run through
the backend authenticated by your Supabase session, so there is no
local-only mode. Once signed in, Familiar syncs your sessions, messages,
snapshots, and skills so they're available on every Mac you sign in from:

- Local SQLite stays the primary read/write path. Cloud writes
  happen in the background; if the network is down they queue to
  `~/.familiar/sync_queue.json` and retry on a 60s timer + on app
  focus + on the next successful write.
- Sign in / out anytime via the **Settings → Account** tab. The
  same tab shows a live sync-queue status ("Synced" or "N
  pending") so you can tell whether anything is still waiting
  to upload. Local data stays on the Mac when you sign out; new
  captures simply stop syncing until you sign back in.
- **Devices.** Below the sign-in status, Settings → Account
  lists every Mac you've signed into. Each row shows a
  friendly name (defaults to your Mac's hostname; click
  Rename to customize), an "Active just now / N hours ago"
  timestamp, and a "This device" badge on the current Mac.
  Rename persists to the cloud so all your devices see the
  new label. Sessions, snapshots, and activity blocks are
  stamped with a stable per-device UUID so the cloud timeline
  can attribute each row correctly. (Skills are merged across
  devices instead — see below.)
- **Skills aggregate across devices.** Familiar's
  self-learned skill files (`success_rate`, `times_used`) are
  merged server-side via a Postgres function so running the
  same skill from two Macs counts as two attempts on the same
  cloud row — not two competing rows. The local Markdown file
  on each Mac still reflects only that Mac's usage; the cloud
  is the source of truth for cross-device totals.
- **Forgot password?** Both onboarding and Settings → Account
  expose a "Forgot password?" link. Familiar emails a reset link
  via Supabase; clicking it opens Familiar (custom protocol
  `familiar://`) and pops the "Set new password" modal in
  Settings. If you self-host Supabase, add `familiar://reset`
  to **Authentication → URL Configuration → Redirect URLs** in
  the dashboard for the reset email to work.
- The agent's `recall` tool reaches your cloud snapshots
  transparently when the local FTS5 index returns fewer matches
  than requested AND you're signed in. New-device seeding caps
  the local cache at the most recent 100 sessions / 2000
  snapshots; anything older comes in lazily from Supabase at
  recall time via a `pgvector`-backed RPC.
- Screenshots from SESSION 15's vision-LLM fallback are
  ephemeral (`/tmp/familiar_screen.png`, unlinked after use) and
  are **never** persisted to Supabase. The cloud schema has no
  image column. Only the AX-tree text summary is synced.

Setup (one-time, from a trusted dev machine): create the shared Supabase
project, enable the `vector` extension under Database → Extensions, and
run `supabase/migrations/001_initial.sql` in the SQL editor. Put the
Project URL + anon key into the Doppler `dev_familiar` config (desktop)
and the URL + anon key + **service key** + JWT secret into `dev_api`
(backend). The service key is server-side only and is never bundled with
the desktop app.

## Mac Studio backend — reference

The setup steps for both sides live under [Setup](#setup) above.
This section is the reference for what's actually on the server.

`services/api` is a Node + Fastify service. The Familiar desktop
client depends on it for **every external API call**:

- `POST /v1/agent` — JWT-gated SSE proxy for Claude (and Ollama,
  for symmetry). The desktop's `core/llm.js` is a thin SSE consumer;
  no Anthropic SDK on the desktop.
- `POST /v1/embed` — JWT-gated Voyage embeddings proxy with a
  server-side SHA-1 dedup cache. The desktop's `core/embeddings.js`
  is a thin HTTP client.
- `POST /v1/recall` — JWT-gated hybrid search over Supabase pgvector,
  scoped to the verified user (server generates the query embedding,
  calls the SESSION 21 `search_snapshots_hybrid` RPC, returns ranked
  rows).
- `POST /v1/locate` — JWT-gated Computer-Use element locator (native
  rewrite). A screenshot (base64, longest side ≤1280px) + a
  plain-language element description → `{ found, x, y }` pixel
  coordinates. The image is never persisted; the event log records
  metadata only (description length, dims, found, latency) — never
  image bytes.
- `POST /v1/transcribe-token` — JWT-gated. Mints a short-lived AssemblyAI
  v3 streaming token so the desktop can open the speech-to-text websocket
  directly; the real `ASSEMBLYAI_API_KEY` never leaves the server. Logs
  metadata only (never the token).
- `POST /v1/tts` — JWT-gated ElevenLabs text-to-speech proxy. `{ text }` →
  streamed `audio/mpeg` (model `eleven_flash_v2_5`). Logs `{ text_length }`
  metadata only — never the spoken text.
- Health, entitlements, and event logging from SESSION 22.5
  (`/health`, `/v1/me/entitlements`, `/v1/events`, `/v1/admin/events`).

**The desktop requires `FAMILIAR_SERVER_URL` to be set** — without it,
`core/llm.js` throws a clear "Familiar requires a backend server"
error at first call and refuses to fall back to direct API calls.
The whole point of SESSION 22.5.2 is that Anthropic + Voyage keys
live on the server only; the Electron app never holds them.

The backend is **not** a Supabase replacement. Authentication, cloud
sync of sessions/messages/snapshots/skills, and account UI all stay
in Supabase exactly as documented under "Cloud sync".

### Authentication & per-user data isolation (SESSION 24)

The **only** auth mechanism is Supabase JWT verification — there is no
shared API token. When you sign in, the desktop holds your Supabase
session; on every backend call it sends the live access token (a JWT),
refreshing it automatically before expiry. The backend verifies that
token against `SUPABASE_JWT_SECRET` (HS256), reads the user id from the
JWT `sub` claim, and scopes **all** data to that user — server events
carry a `user_id`, and `/v1/recall` only ever queries the verified
user's snapshots. A `service_role` JWT (signed with the same secret)
unlocks the cross-user admin view on `/v1/admin/events`. If you're
signed out, the desktop opens the account screen instead of making a
tokenless call.

### Plans & feature matrix

`GET /v1/me/entitlements` reads `profiles.plan` (default `free`) and
returns the feature object below (60s per-user cache). The desktop
enforces it; when entitlements haven't loaded (signed out / backend
down) it stays permissive — full local features, caps off, cloud off —
so a transient outage never deletes local data.

| Feature | Free | Pro |
| --- | --- | --- |
| Screen awareness · Guide · Agent · Chat · Ghost cursor | ✓ | ✓ |
| Memory retention | 7 days | 90 days |
| Max local snapshots | 500 (rolling window) | unlimited |
| Max self-learned skills | 10 | unlimited |
| Cloud sync | — | ✓ |
| Server recall (pgvector hybrid) | — (local FTS5 only) | ✓ |
| Cross-device | — | ✓ |

Set a user's plan with `update profiles set plan = 'pro' where id =
'<user-uuid>'` in the Supabase SQL editor. A future session wires a
Stripe webhook to flip `profiles.plan` automatically.

Smoke tests:

- `npm run api:test` — backend endpoints (run from the Mac Studio
  or anywhere the repo lives; spawns the API on an ephemeral port).
- `npm run server:test` — desktop client `core/server.js`; covers
  unconfigured / server-up / server-unreachable / drain-after-restart.

For deeper deployment notes (launchd template, ngrok reserved-domain
flow, Docker, the SQLite → Postgres swap path), see
[`infra/README.md`](infra/README.md).

## Stack

- **Container runtime (Mac Studio backend):** OrbStack — Apple-Silicon
  native, fully Docker + Docker Compose compatible.
- **Service orchestration:** Docker Compose, running `familiar-api` +
  `ngrok` side by side with restart-on-crash.
- **Public tunnel:** ngrok with a reserved static domain, so the
  desktop's `FAMILIAR_SERVER_URL` never has to change across Mac Studio
  reboots.
- **Screen reading:** Python + atomacos (AXUIElement) + pyobjc/Quartz
- **Cursor & keyboard control:** Node.js + @nut-tree-fork/nut-js
- **Ghost cursor overlay:** Electron transparent window
- **Browser automation:** Playwright
- **Agent loop:** custom (no Hermes)
- **Memory + recall:** SQLite + FTS5 locally; optional Supabase +
  pgvector mirror via `@supabase/supabase-js` for cross-device sync.
- **Skills:** markdown files in `/skills` (cloud-mirrored as the
  `skills` table when signed in).
- **LLM:** Claude API (Haiku 4.5 for the agent loop, Sonnet 4.6 for chat) —
  configurable via `LLM_PROVIDER`/`OLLAMA_MODEL` env vars.
- **Embeddings:** Voyage AI (`voyage-3-lite`, cloud API) for the semantic
  layer of recall.
- **Storage encryption:** SQLCipher via `better-sqlite3-multiple-ciphers`;
  passphrase in the macOS Keychain via `keytar`.
- **Click-hit detection (Guide mode):** Python helper using
  CGEventTap (listen-only) — observes user clicks without consuming them.

## Architecture

Familiar spans three runtime homes. Knowing which code lives where
is the fastest way to navigate the repo.

**On the user's Mac (always local, never in Docker):**

- The Electron desktop app and the command bar.
- Screen capture, Accessibility API reads, the recorder.
- The ghost cursor overlay and real cursor movement.
- Guide / Agent / Chat modes and the agent loop.
- The local SQLCipher `memory.db`, FTS5 index, and skill files.

**On the Mac Studio in Docker via OrbStack (`infra/docker-compose.yml`):**

- `familiar-api` — the Fastify backend.
- `ngrok` — public tunnel to `familiar-api:8787`.
- Anthropic + Voyage + Supabase **service-key** calls (these keys
  live in `services/api/.env` and nowhere else).
- Server-side event logging (`/v1/events`) and entitlement checks
  (`/v1/me/entitlements`).

**On Supabase (external hosted service, unchanged):**

- User authentication (signup / signin / password reset).
- Cloud sync of sessions, messages, snapshots, activity blocks,
  entities, and skills.
- Cloud recall via the `search_snapshots_hybrid` pgvector RPC.
- Per-user profile and per-device state.

Local SQLite is the primary store; Supabase + pgvector is the
optional cross-device mirror for users who sign in (see Cloud sync
above).

```
tools/screen.py            (reads active window + dock + menu bar + other windows)
tools/screen.py --lite     (fast text-only variant for the recorder)
tools/cursor.js            (ghost + real cursor; per-mode safety)
tools/click_listener.py    (CGEventTap listen-only; powers Guide-mode hit zone)
tools/browser.js           (Playwright wrapper for open_url)
core/llm.js                (Claude / Ollama abstraction)
core/agent.js              (loop, system prompts per mode, recall tool)
core/memory.js             (SQLite + FTS5: sessions, messages, facts, snapshots — sync-mirrored)
core/skills.js             (self-learning skill files in ~/.familiar/skills — sync-mirrored)
core/recorder.js           (continuous screen-history capture loop)
core/supabase.js           (cloud client wrapper; URL + anon key only)
core/sync.js               (background dual-write + ~/.familiar/sync_queue.json retry)
app/main.js                (Electron main; tray + bar; runFromBar; session restore; seeding)
app/menubar.js             (status-dot tray icon; Sign Out item when signed in)
app/overlay.{html,css,js}  (transparent fullscreen ghost-cursor renderer)
app/quick-input/*          (the Familiar command bar — Guide/Agent/Chat toggle)
app/onboarding/*           (4-screen first-launch flow: welcome, sign-in/up, permissions, done)
app/settings/*             (tabbed settings window — Account, Plan, Privacy, Permissions)
app/permissions.js         (macOS Accessibility / Screen Recording / Input Monitoring probes)
core/config.js             (~/.familiar/config.json read/write surface; cloud_sync flag)
supabase/migrations/*.sql  (cloud schema; run from a dev machine, never the desktop app)
```

## Project structure

```
/core            — agent loop, memory, skills, recorder, LLM abstraction
/tools           — screen.py, cursor.js, browser.js, click_listener.py
/app             — Electron main, overlay window, command bar
/services/api    — Mac Studio backend (Node + Fastify); SSE proxy +
                   Voyage + Supabase recall; never holds desktop secrets
/packages/shared — shared schemas, types, constants (event types,
                   routes — required by both backend and desktop)
/infra           — docker-compose, OrbStack + ngrok config for the
                   containerized backend
/skills          — accumulated skill files (gitignored)
```

## Key constraints

- macOS only (Apple Silicon first).
- Never capture password fields (AXSecureTextField marked).
- Never capture private/incognito browser windows.
- Local-first by default: `memory.db` is encrypted at rest via SQLCipher
  with the passphrase in the macOS Keychain. Semantic-recall embeddings
  are computed via Voyage AI (Anthropic's recommended embeddings partner
  — data not used for training); no other content leaves the machine
  unless the user supplies an LLM API key.
- Approval required before irreversible actions (form submit, file delete,
  send) in Agent mode.

## Branches

- **`main`** — current shipping branch.
- **`local-only-archive`** — snapshot of Familiar before the SESSION 20
  SaaS migration (the last local-only commit, `a1c5d69`, SESSION 18 polish
  framework). Preserved for reference. **Do not merge back into `main`.**
- **`session-NN-*`** — work-in-progress feature branches.

## Notes

Native-rewrite gotchas (full engineering detail in `CLAUDE.md` → Notes):
- The `mac/` global hotkeys use a listen-only `CGEvent` tap → needs **Input Monitoring**
  (System Settings ▸ Privacy & Security ▸ Input Monitoring). First launch fires the
  prompt; **grant it, then relaunch** so the tap is created with access.
- `.xcodeproj` is gitignored and regenerated from `mac/project.yml` (`xcodegen generate`);
  build in Xcode only, static-check without Xcode via `swiftc -typecheck`.
- The Swift app ships only public config (`SUPABASE_URL`, `SUPABASE_ANON_KEY`,
  `FAMILIAR_SERVER_URL`) — no third-party API keys, same invariant as the Electron client.
- **The signing team is pinned in `mac/project.yml`** (`DEVELOPMENT_TEAM`), not just set in
  Xcode's UI — otherwise every `xcodegen generate` resets it to ad-hoc, the app's identity
  changes each build, and macOS re-prompts for **Screen & System Audio Recording** /
  Accessibility / Input Monitoring on every run (grants never stick). On a different machine,
  change it to your own Team ID (`security find-identity -v -p codesigning`). A free personal
  team is enough. Input Monitoring won't re-prompt over a previously-denied record
  (`tccutil reset ListenEvent app.familiar.Familiar`, then relaunch). ("System Audio" is just
  Sequoia's renamed Screen-Recording pane — Familiar captures image-only, no audio.)
- **Redeploying the backend rebuilds the image:** `npm run api:docker:build` then
  `npm run api:docker:up` (a plain `up` reuses the cached image — the code is baked in at
  build time, not bind-mounted).
- **Guide mode never sends synthetic input.** It observes your click via a listen-only
  `CGEvent` tap (`ClickWatcher`) and the click still reaches the app underneath; Familiar
  only ever shows the ghost + a bubble. (Agent mode now performs the clicks — see below.)
- **Agent mode acts like a person, mouse-first (Session 7).** The "do" layer lives entirely in
  `mac/Familiar/Actuator.swift` (synthetic `CGEvent` + AX-press input) and is invoked ONLY from
  Agent dispatch — Guide mode still posts zero synthetic input. Keyboard shortcuts / `open_app` /
  `open_url` are *backups* (used when a click can't be made or has no effect), not the default.
  Single Escape frees the mouse; double-tap Escape force-stops the run. Needs Accessibility (to
  click / type) + Input Monitoring (the Escape tap).
- **Voice is push-to-talk (Session 8).** Hold **⌃⌥** to dictate; release to run. Speech-to-text
  (AssemblyAI) and text-to-speech (ElevenLabs) are both proxied through `services/api`
  (`/v1/transcribe-token` mints a short-lived streaming token; `/v1/tts` returns `audio/mpeg`),
  so no third-party voice keys ship in the app — set `ASSEMBLYAI_API_KEY`, `ELEVENLABS_API_KEY`,
  `ELEVENLABS_VOICE_ID` in `services/api/.env` and **rebuild the backend image** for live voice.
  Needs Microphone + Input Monitoring (a second listen-only `CGEvent` tap). "Speak replies" (menu,
  on by default) speaks the same text the ghost bubble streams.
