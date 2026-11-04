# Many Hands — a PM portfolio in four acts

A stop-motion-flavoured portfolio for a product manager. Paper-cut character,
a scroll-driven career reel (student → engineer → consultant → PM), a
many-armed skills section, and case-study cards with the decision trail.

Built with **Next.js 15** (App Router), **Tailwind CSS v4**, and **Motion**.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where to edit things

| What | File |
| --- | --- |
| Name, tagline, links, email | `src/data/portfolio.ts` → `profile` |
| The four career acts | `src/data/portfolio.ts` → `acts` |
| The ten arms / skills + clusters | `src/data/portfolio.ts` → `skills`, `skillClusters` |
| Projects & case studies | `src/data/portfolio.ts` → `projects` |
| Archive strip | `src/data/portfolio.ts` → `archive` |
| Colours, type, paper texture, grain | `src/app/globals.css` (`@theme`) |
| The character illustration | `src/components/Character.tsx` |
| Section order | `src/app/page.tsx` |

Everything on the page reads from the data file — you can add a fifth project
by appending one object to `projects` and nothing else needs to change.

## How the stop-motion feel works

- All motion uses `steps()` timing, not smooth easing, so things *snap* between
  held frames like a shot-on-twos animation.
- The career reel is a 380vh scroll container with a sticky stage; scroll
  progress is quantised into four acts, and the character pose swaps on the
  cut.
- The film grain is a fixed `feTurbulence` overlay that re-rolls every 140ms.
- `prefers-reduced-motion` disables all of it.

## Adding your own character art

`Character.tsx` is a single SVG with four poses (`student`, `engineer`,
`consultant`, `pm`). Each pose picks an outfit palette, an arm path pair, and
accessories. To swap in real stop-motion frames later, replace the `<svg>` with
an `<img>` that switches frames on a `steps()` keyframe animation — the rest of
the layout will not care.

## Deploy

Vercel is the path of least resistance: push the repo, import it, no env vars
needed.
