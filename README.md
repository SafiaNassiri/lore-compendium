# Verglas: Divine Dissident — Lore Compendium

> *"A god said no. Everything broke. This is what remains."*

An interactive wiki and lore compendium for the fantasy universe **Verglas: Divine Dissident** — built with React, Vite, and D3.js, deployed to GitHub Pages.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Roadmap & Git Milestones](#roadmap--git-milestones)
- [Content System](#content-system)
- [Design System](#design-system)

---

## Overview

The Verglas Compendium is a self-hosted, statically-deployed lore wiki covering:

- **Lore Articles** — history, myths, doctrines, and prophecies
- **Characters** — gods, mortals, and those in between
- **Locations** — regions, cities, ruins, and divine sites
- **Factions** — divine orders, mortal coalitions, and dissenter groups
- **Living Gods Family Tree** — interactive D3.js lineage visualization
- **World Map** — clickable SVG map with region-to-lore links

---

## Tech Stack

| Layer        | Tool                          | Notes                                    |
|--------------|-------------------------------|------------------------------------------|
| Framework    | React 18 + Vite               | Fast dev, optimized static build         |
| Routing      | React Router v6               | Client-side SPA routing                  |
| Data         | JSON flat files (seed.js)     | Swappable with Contentlayer or Sanity    |
| Visualization| D3.js                         | Family tree + world map                  |
| Hosting      | GitHub Pages via `gh-pages`   | Free static hosting                      |
| Fonts        | Google Fonts (Cinzel, Crimson)| Loaded in index.html                     |

---

## Project Structure

```
verglas-compendium/
├── public/                    # Static assets (favicon, map SVG, images)
├── src/
│   ├── components/            # Shared UI components (nav, cards, tags)
│   ├── pages/                 # Route-level page components
│   │   ├── Home.jsx
│   │   ├── Articles.jsx       # feat: cms
│   │   ├── ArticlePage.jsx    # feat: articles
│   │   ├── Characters.jsx
│   │   ├── CharacterPage.jsx
│   │   ├── Locations.jsx
│   │   ├── Factions.jsx
│   │   ├── FamilyTree.jsx     # feat: family-tree (D3)
│   │   └── WorldMap.jsx       # feat: world-map (SVG)
│   ├── data/
│   │   ├── schema.js          # JSDoc type definitions
│   │   ├── seed.js            # Placeholder lore content
│   │   ├── articles/          # Per-article JSON (feat: cms)
│   │   ├── characters/        # Per-character JSON
│   │   ├── locations/         # Per-location JSON
│   │   └── factions/          # Per-faction JSON
│   ├── hooks/                 # Custom React hooks
│   ├── utils/                 # Helpers (slugify, search, sort)
│   ├── styles/
│   │   └── global.css         # Design system, CSS variables
│   ├── App.jsx                # Router shell
│   └── main.jsx               # Entry point
├── index.html                 # HTML shell + Google Fonts
├── vite.config.js             # Vite config with gh-pages base
├── package.json
└── .gitignore
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
# Clone the repo
git clone https://github.com/SafiaNassiri/verglas-compendium.git
cd verglas-compendium

# Install dependencies
npm install

# Start dev server
npm run dev
```

Dev server runs at `http://localhost:5173/verglas-compendium/`

### Build

```bash
npm run build
# Output in /dist
```

---

## Deployment

This project deploys to **GitHub Pages** via the `gh-pages` package.

```bash
npm run deploy
```

This runs `vite build` then pushes `/dist` to the `gh-pages` branch.  
The live site will be at: `https://SafiaNassiri.github.io/verglas-compendium/`

### First-time setup

1. Push the repo to GitHub
2. Run `npm run deploy`
3. In repo Settings → Pages → set source branch to `gh-pages`

---

## Roadmap & Git Milestones

Each feature phase ships as a focused commit (or branch + PR if preferred).

| Commit Tag           | Feature                                | Status        |
|----------------------|----------------------------------------|---------------|
| `feat: init`         | Scaffold, routing, design system       | ✅ Complete   |
| `feat: layout`       | Sidebar nav, header, wiki shell        | ✅ Next       |
| `feat: cms`          | JSON data layer, lore entry schema     | ✅ Planned    |
| `feat: articles`     | Article pages, search, tag filtering   | ✅ Planned    |
| `feat: family-tree`  | D3.js Living Gods lineage tree         | ✅ Planned    |
| `feat: world-map`    | SVG world map with lore hotspots       | ✅ Planned    |
| `feat: polish`       | Transitions, mobile, 404, final deploy | ⬜ Planned    |

---

## Content System

Lore entries live in `src/data/seed.js` as structured JS objects (see `schema.js` for types).  
Each entry type follows a consistent shape:

```js
// Example character entry
{
  slug: 'verglas-the-dissident',
  name: 'Verglas the Dissident',
  type: 'god',              // 'god' | 'mortal' | 'divine-touched' | 'corrupted'
  faction: 'Living Gods',
  aliases: ['The Broken Crown'],
  summary: 'Short blurb for cards.',
  body: 'Full lore text here.',
  tree: {
    parentIds: ['the-first-god'],
    childIds: [],
    spouseIds: ['eira-of-frost'],
  },
  updatedAt: '2025-01-01',
}
```

To add content: edit `seed.js` or drop individual JSON files into `src/data/characters/`, etc.  
The data layer is designed to be swappable with a headless CMS (Contentlayer, Sanity, or similar) in the future without touching page components.

---

## Design System

The visual identity is defined in `src/styles/global.css` via CSS custom properties.

### Color Palette

| Variable           | Value       | Usage                        |
|--------------------|-------------|------------------------------|
| `--clr-divine`     | `#c8a96e`   | Gold — Living Gods, accents  |
| `--clr-frost`      | `#6eb5c8`   | Ice blue — Verglas magic     |
| `--clr-dissent`    | `#c86e6e`   | Red — conflict, corruption   |
| `--clr-verdant`    | `#7ec87e`   | Green — mortal, nature       |
| `--clr-abyss`      | `#0f0e18`   | Main background              |
| `--clr-depths`     | `#161427`   | Cards, panels                |

### Typography

| Variable          | Font                  | Usage              |
|-------------------|-----------------------|--------------------|
| `--font-display`  | Cinzel Decorative     | Logo, hero titles  |
| `--font-heading`  | Cinzel                | Section headers    |
| `--font-body`     | Crimson Pro           | Body copy, lore    |

---

*Built by [Safia Nassiri](https://safianassiri.github.io) — [GitHub](https://github.com/SafiaNassiri) · [itch.io](https://bluekillspop.itch.io)*
