# Rehear Design System

A lightweight, repo-ready visual system for Rehear — a playful, cheeky, aspirational speaking-practice brand.

## Brand direction

- **Core idea:** Your voice. But better.
- **Belief:** Show me, don’t correct me.
- **Role:** A playful practice companion.
- **Personality:** Playful, cheeky, aspirational, encouraging, human.
- **Visual principle:** Practice traces, not cute decoration.

## Files

- `index.html` — visual style guide and component demo
- `tokens.css` — colours, type, spacing, radii, shadows and motion tokens
- `styles.css` — reusable components and brand elements
- `script.js` — tiny demo behaviour for waveform rendering and active action chips

## Fonts

Loaded from Google Fonts:

- Bricolage Grotesque — display
- Instrument Sans — body / UI
- Kalam — annotations only

If you want no external font dependency, self-host equivalents and update the CSS variables in `tokens.css`.

## Colour system

- Paper `#F7F2E8`
- Ink `#1F1F1B`
- Butter Yellow `#FFD43B` — primary brand memory colour
- Voice Blue `#4A8DFF`
- Progress Green `#39C978`
- Coral `#FF675A`
- Playful Pink `#F48FB1`

Use yellow most often. Blue/green/coral/pink should behave like marker pens — purposeful accents, not equal-weight decoration.

## Core CSS classes

### Layout
- `.ds-shell`
- `.ds-section`
- `.ds-grid`, `.ds-grid-2`, `.ds-grid-3`, `.ds-grid-4`
- `.stack`, `.cluster`

### Typography
- `.display-hero`
- `.note`
- `.marker`
- `.rough-underline`

### Brand elements
- `.dash-frame`
- `.tape`
- `.sticky-note`
- `.paper-card`
- `.chip`
- `.burst`

### Product UI
- `.browser`
- `.action-strip`
- `.voice-compare`
- `.wave`

### Buttons
- `.btn`
- `.btn-primary`
- `.btn-secondary`
- `.btn-ghost`

## Usage principles

1. **Yellow leads.** Use it for CTAs, rehearse actions, hero highlights and key moments.
2. **Colour has a job.** Blue = voice/playback, green = progress, coral = emphasis, pink = occasional playful note.
3. **Break the box.** Use dashed boundaries, overlaps, notes and off-axis marks instead of wrapping every idea in a card.
4. **Practice leaves traces.** Underlines, arrows, highlights, repeat marks and notes should look like evidence of use.
5. **Keep handwriting rare.** It is seasoning, not the main typography system.
6. **AI stays backstage.** The learner is the hero.

## GitHub Pages

You can publish this folder directly as a static site.

If it lives at the repository root, enable **Settings → Pages → Deploy from branch** and select your branch/root folder.
