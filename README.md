# Flowvia Growth Website

The Flowvia Growth website, rebuilt in Astro with responsive layouts and strict TypeScript configuration. The original page copy, five FAQs, chat transcripts, booking destination, and contact details are retained.

## Requirements

Use Node.js LTS (Node 26 was used for the initial setup) and npm, which comes with Node.js.
After installing Node.js, restart your terminal app or editor so it picks up the updated PATH.
An integrated terminal can inherit an old PATH even when you open a new terminal tab.
If PowerShell cannot find `npm.cmd`, refresh the current session before running the commands below:

```powershell
$env:Path = 'C:\Program Files\nodejs;' + $env:Path
```

## Getting started

Run these commands from this folder:

```sh
npm install
npm start
```

Open the local URL printed in the terminal, normally http://localhost:4321.
Edit `src/pages/index.astro` to change the home page. Changes appear automatically while the dev server runs.
PowerShell on the initial development machine is configured with `RemoteSigned` for the current Windows user, so `npm start` works without an alias.
On another Windows machine, if PowerShell blocks `npm.ps1`, you can enable local scripts persistently with `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`.
This applies to that user's PowerShell sessions, across projects. Scripts marked as downloaded from the internet still require a signature or explicit unblocking.

## Commands

| Command | Purpose |
| --- | --- |
| `npm start` | Start the development server |
| `npm run dev` | Alternative command for the development server |
| `npm run build` | Create the production site in `dist/` |
| `npm run preview` | Preview a production build locally |

## Project structure

- `src/pages/`: Pages and routes; `index.astro` is the home page.
- `public/`: Static files such as images and favicons.
- `astro.config.mjs`: Astro configuration.
- `tsconfig.json`: TypeScript configuration.

- `src/components/`: Shared brand and icon components.
- `src/data/site.ts`: Benefits, lead process, FAQs, and booking URL.
- `src/data/conversation.json`: The original AI conversation example.
- `src/data/schema.json`: Structured data retained from the original site.
- `src/styles/global.css`: Responsive design and typography.
- `src/assets/flowvia-logo.png`: Original logo, optimized by Astro during builds.

The FAQ accordion uses native HTML details elements. The mobile navigation is the only custom client script. React is not required.

## Assets

The original logo was supplied with the old site's HTML.
The solar rooftop photograph is by [Watt A Lot on Unsplash](https://unsplash.com/photos/a-house-with-solar-panels-gqpuuF3a2tY), used under the Unsplash License.
Manrope is self-hosted in `public/fonts/`; its SIL Open Font License is included there.

## Do I need React?

No. Astro pages can use HTML, CSS, and JavaScript directly. React is optional for components that benefit from it, such as a stateful calculator or a React component library.

To add it later, run:

```sh
npx astro add react
```

This installs and configures React within this project. You do not need a separate React app.
Interactive React components need a client directive, for example `<Counter client:load />`.

See the [Astro documentation](https://docs.astro.build/) and [React integration guide](https://docs.astro.build/en/guides/integrations-guide/react/).
