# Upstream

Reef is a blog theme by Aloha Pixel, MIT (see licenses/MIT-reef.txt):
https://github.com/alohapixelcom-hash/reef, onboarded from commit
`a92d845` (Reef 3.9.0, "socle 2.0.0", 12 October 2026) as thin,
prop-driven sections on Reef's own styles.

## Taken from upstream, unchanged unless noted

- `src/styles/tokens.css`, `src/styles/prose.css`, `src/styles/motion/*.css`
- `src/styles/global.css`: Tailwind now scans only this package's templates
  and `src/data.ts` (`source(none)` and explicit `@source`), and the back
  office's sources are gone.
- `licenses/MIT-reef.txt`

The section, card, layout and page templates are written for this package
from Reef's markup and classes. Upstream's topic tones (`topicTone.ts`)
predate its swap of primary and accent; `src/data.ts` maps each tone to its
own colour again. Nothing else is taken: not the back office
(`src/moteur/`), EmDash, Cloudflare, React, MDX, Capacitor, French or the
i18n dictionary, search, view transitions, the video, the demo notice, the
Pexels photographs, or the theme's agent instruction files (`AGENTS.md`,
`CLAUDE.md`, `.claude/`).

## Third parties

- Fonts: Space Grotesk and Instrument Sans, from `@fontsource-variable`
  (root dependencies), SIL Open Font License 1.1; texts in `licenses/`.
- Images: the placeholders in `public/` are drawn for this package.
- Every built site carries `licenses.txt` (the MIT notice and both OFL
  texts).
