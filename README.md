# Flowvia Growth Website

Astro marketing site for Australian solar and battery installers. The current page ports the supplied `flowvia-growth-studio` Lovable design: its rooftop photograph, Instrument Serif and Geist typography, floating navigation, animated conversation, service cards, response-time comparison, FAQ and closing call to action. Accents follow Flowvia's blue logo, and the requested headline is retained.

The product is a done-for-you service combining targeted advertising, AI qualification and follow-up, and calendar booking. Conversations, chart graphics and response-time comparisons are illustrative. The $96,000 calculation represents one hypothetical missed $8,000 job per month; it is not a customer result or revenue guarantee.

## Development

Use Node.js matching `package.json`'s engine requirement and npm. From this folder:

```sh
npm install
npm start
```

Open the URL printed by Astro, normally http://localhost:4321. Changes update automatically.

| Command | Purpose |
| --- | --- |
| `npm start` | Start development |
| `npm run dev` | Alternative development command |
| `npm run build` | Create the static production site in `dist/` |
| `npm run preview` | Preview the production build |

For agent-managed background development, use `npm exec astro dev --background`; inspect it with `npm exec astro dev status` and stop it with `npm exec astro dev stop`.

PowerShell on the initial machine uses `RemoteSigned` for the current user, allowing `npm start` without an alias. After installing Node, restart your terminal app or editor to refresh PATH. On another machine, `npm.cmd start` also works if PowerShell blocks `npm.ps1`.

## Implementation

- `src/pages/index.astro`: Page composition, content and metadata.
- `src/components/landing/`: Booking button, conversation and service-card components.
- `src/components/Brand.astro`: Original Flowvia logo.
- `src/scripts/landing.ts`: Native TypeScript controllers for chat playback, scroll reveals, parallax, count-up, pointer spotlights, comparison bars and FAQ state.
- `src/styles/global.css`: Tailwind 4 theme, responsive styles and animation keyframes adapted from the supplied design.
- `src/data/site.ts`: Booking URL and FAQs, plus retained content from earlier iterations.
- `src/data/schema.json`: Organization and service structured data.
- `src/assets/reference-hero.jpg`: Hero photograph supplied in the reference project; Astro emits responsive WebP images.
- `public/fonts/`: Self-hosted Geist and Instrument Serif, with their SIL Open Font Licenses. Earlier fonts are retained but not loaded.

React, a client router and an animation library are not required. Astro outputs static HTML; Tailwind is integrated through its Vite plugin. Only the small interaction script runs in the browser. Earlier unused components and imagery are retained in the repository and are not imported by this page.

Chat playback supports pause/resume and pauses outside the viewport or when the tab is hidden. It reserves enough height for the entire conversation without an internal scrollbar. Reduced-motion preferences show the completed conversation, static figures and visible sections. Without JavaScript, the full conversation and all FAQ answers remain readable. The `#compare` link still reaches the compact response-time comparison.

## Verification

The port was checked with a production build and headless Edge at 320px, 390px, 768px, 1024px and 1440px widths. Browser checks covered conversation timing and pause/resume, offscreen suspension, count-up, comparison bars, pointer spotlights, FAQ controls, reduced motion, booking destinations and the JavaScript-disabled fallback. No browser runtime exceptions or horizontal overflow were observed.

The original React reference at `C:\Users\Admin\Code\flowvia-growth-studio` is not modified. This is a local project; no deployment is performed.
