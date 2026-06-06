# BRAND.md

> **STATUS: STUB** — This file is populated in Session 2 (brand foundation session).
> Do not reference this file for color or type decisions until Session 2 is complete.

**One anchor color is known:** `#378ADD` — the ghost cursor's blue. This is Familiar's accent.
Everything else (palette, type, window chrome) is determined in Session 2.

---

## Structure (to be filled in Session 2)

### §palette
All color tokens, mapped to their Mac OS 9 role.
Format: `--color-[name]: [hex]` — CSS variable names for Tailwind v4.

Expected tokens:
- Platinum chrome (window background, title bar)
- Pinstripe colors (title bar stripes — light and dark)
- Window border color
- Text: Charcoal + fallback stack
- Accent: `#378ADD` (confirmed)
- Desktop background
- Scrollbar track and thumb
- Menu bar
- Shadow
- Alert/dialog background

### §typography
Web font choices, size scale, weight usage.
- Charcoal substitute strategy (Charcoal was Mac OS 9's system font — what web font approximates it?)
- Size scale (heading levels, body, UI labels, caption)
- Weight rules

### §window-chrome
Specific rules derived from MACOS9_REFERENCE.md:
- When to use pinstripes (always in title bars; rules for other chrome?)
- Title bar height (exact px value)
- Window control button spec (size, position, colors for close/zoom/collapse)
- Resize handle treatment

### §icon-style
Style guidance for any icons used (folder icons, Trash, application icons in the demo).

### §do-not
Visual anti-patterns. Things that would break the Mac OS 9 illusion or make the site look generic.
