# Deepdev Vyas — a PM portfolio in four acts

A stop-motion-flavoured portfolio for a product manager. Paper-cut character,
a scroll-driven career reel (student → engineer → consultant → PM), a
many-armed skills section, and case-study cards with the decision trail.

Built with **Next.js 15** (App Router), **Tailwind CSS v4**, and **Motion**.

**Repo:** https://github.com/deep195/deepdev-portfolio

## Run it

Needs **Node 20 or newer** (built and tested on Node 24).

```bash
git clone https://github.com/deep195/deepdev-portfolio.git
cd deepdev-portfolio
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the build
```

On Windows PowerShell, if `npm` is blocked by the execution policy, use
`npm.cmd install`, `npm.cmd run dev`, etc.

No environment variables, no API keys, no database — everything is static.

## Where to edit things

| What | File |
| --- | --- |
| Name, tagline, links, email | `src/data/portfolio.ts` → `profile` |
| The four career acts (title, org, points, stat) | `src/data/portfolio.ts` → `acts` |
| The ten arms / skills + clusters | `src/data/portfolio.ts` → `skills`, `skillClusters` |
| Projects & case studies | `src/data/portfolio.ts` → `projects` |
| Archive strip | `src/data/portfolio.ts` → `archive` |
| Colours, type, paper texture, grain | `src/app/globals.css` (`@theme`) |
| The character illustration | `src/components/Character.tsx` |
| Section order | `src/app/page.tsx` |

Everything on the page reads from the data file — you can add a fifth project
by appending one object to `projects` and nothing else needs to change.

## The character

One person, drawn once, in four poses. `Character.tsx` holds a fixed palette
(skin, hair, beard, royal-blue shirt, trousers, red kalava) and four arm paths;
only the props change per act — mortarboard and notebook, badge and laptop,
folder and briefcase, microphone. The head, face, glasses, beard and outfit are
identical in every frame, so the four acts read as the same person rather than
four illustrations.

Draw order inside the SVG matters: sleeves → held prop → hand → kalava. That is
why the mic, laptop and briefcase sit *in* the hands instead of floating over
them.

To swap in real stop-motion frames later, replace the `<svg>` with an `<img>`
that switches frames on a `steps()` keyframe animation — the rest of the layout
will not care.

## How the stop-motion feel works

- All motion uses `steps()` timing, not smooth easing, so things *snap* between
  held frames like a shot-on-twos animation.
- The career reel is a 380vh scroll container with a sticky stage; scroll
  progress is quantised into four acts, and the character pose swaps on the
  cut.
- The film grain is a fixed `feTurbulence` overlay that re-rolls every 140ms.
- `prefers-reduced-motion` disables all of it.

## Deploy

Vercel is the path of least resistance: import the repo, no env vars needed.

## Still to fill in

- Résumé link is `#` — point it at a real PDF.
- Project cards use generated covers, not real screenshots.
- Company dates for the Adobe → Begig stretch are placeholders.
