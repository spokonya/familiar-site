# MACOS9_REFERENCE.md

> **STATUS: STUB** — This file is written in detail during Session 2 (brand foundation session).
> Until then, do not implement any Mac OS 9 window chrome. Hallucinated Platinum UI is an easy tell.

---

## Why this file exists

Mac OS 9 has a specific visual language with precise details. Getting them wrong — even subtly — breaks the illusion. The scrollbar arrow positions, the title bar height, the exact window control button shapes, the pinstripe frequency — these are the "easy tells" that reveal whether someone actually looked at reference screenshots or guessed.

This file is written in the brand session by actually studying Mac OS 9 reference screenshots and documenting the specifics. Do not skip it.

---

## Structure (to be written in Session 2)

### §title-bar
- Height (exact pixels at 1x)
- Pinstripe colors and frequency (light stripe / dark stripe / pattern)
- Font: Charcoal, size, weight, alignment
- Drag target area

### §window-controls
- Position (left side, specific offsets from title bar edges)
- Button shape (square, NOT circles — this is the key OS 9 vs OS X tell)
- Close button: appearance, active state
- Zoom button: appearance, active state
- Collapse button: appearance, active state
- Spacing between buttons

### §scrollbar
**Critical detail:** Mac OS 9 scrollbars have arrows at BOTH ENDS of the track (top AND bottom for vertical; left AND right for horizontal). This is the opposite of OS X which moved both arrows to one end. Getting this wrong is an instant tell.
- Track color
- Thumb color
- Arrow button design
- Arrow position: top+bottom (vertical), left+right (horizontal)

### §window-body
- Border treatment (inset/outset, color)
- Content area background
- Inner shadow

### §resize-handle
- Position (bottom-right corner)
- Appearance (ridged texture in Platinum)

### §menu-bar
- Height
- Background (Platinum texture vs flat)
- Font: Charcoal, size
- Apple menu (the old rainbow apple logo or solid apple)
- Application menu positioning

### §desktop
- Background color/texture (the default Mac OS 9 teal/dark desktop)
- Icon grid (if icons appear)

### §trash
- Position convention (bottom-right of screen)
- Empty vs full appearance

### §dialog-boxes
- Modal dialog chrome
- Alert dialog appearance
- Button arrangement (OK on right, or other convention)

### §easy-tells — the checklist
List of details that immediately reveal whether Mac OS 9 was done right or faked:
1. Scrollbar arrow positions (BOTH ENDS — most commonly botched)
2. Window control button shape (square, not round)
3. [Additional tells added in Session 2]

### §web-adaptation-notes
How to adapt Mac OS 9 chrome for web:
- Retina: how to handle the low-res aesthetic at 2x displays
- Fonts: Charcoal is not available on the web — what's the substitute?
- Animation: what motion is appropriate vs what breaks the illusion?
- Color: Platinum is a specific gray — the hex(es) to use
