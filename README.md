# Deepdev Vyas — a PM portfolio in four acts

A stop-motion-flavoured portfolio for a fintech & AI product manager. Paper-cut
character, a scroll-driven career reel (student → engineer → consultant → PM),
a many-armed skills section, six case studies, side builds with public code,
and one case study that runs as a live console instead of a mockup:
settlement reconciliation at `/work/recon`.

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
| Side builds, teardowns, certifications | `src/data/portfolio.ts` → `sideProjects`, `teardowns`, `certifications` |
| Archive strip | `src/data/portfolio.ts` → `archive` |
| Recon data & matching engine | `src/lib/recon/` (`data.ts`, `engine.ts`) |
| Recon console UI | `src/components/recon/ReconConsole.tsx` |
| Recon case-study page | `src/app/work/recon/page.tsx` |
| Colours, type, paper texture, grain | `src/app/globals.css` (`@theme`) |
| Character frames & hero stage | `public/deepdev-*.svg`, `public/deepdev-hero-stage.webp` |
| Section order | `src/app/page.tsx` |

Everything on the page reads from the data file — add a project by appending one
object to `projects`. Set `href` to an internal route when the project has a
live page on this site (the reconciliation console does); use `liveUrl` and
`githubUrl` for everything else.

## The reconciliation console

`/work/recon` is a working settlement-reconciliation console, not a screenshot.
It ingests a synthetic month of payment captures, runs a three-pass matcher, and
surfaces every break with a reason code, an owner, and an age.

- **Seeded, not random.** `SEED = 20261031` in `src/lib/recon/data.ts` means every
  visitor sees the same month, same breaks, same rupees. The "New month" button
  reseeds for demos, which changes the numbers.
- **Deterministic on both sides.** `buildRecon(seed)` is pure. The server page and
  the client console call it independently and get identical figures, so no data
  is passed through props.
- **Rules over ML.** Exact pass → ₹1 tolerance pass → orphan pass. Five documented
  trade-offs live on the case-study page: rules before models, a ₹1 tolerance, a
  T+2 timing window, no auto-journaling, and a closed reason-code vocabulary.
- **Fictional by design.** Merchants, volumes, and fee rates are modelled, not
  client data. The case-study page separates what is real (matching logic, fee
  treatment, break taxonomy) from what is modelled and what is not built.

To regenerate the dataset, edit the seeded generator in `src/lib/recon/data.ts`
and the matching passes in `src/lib/recon/engine.ts`. Figures in the case-study
prose are computed from the same `buildRecon()` call, so they stay true when the
data changes.

## The character

The paper-cut character is now exported as illustration frames rather than drawn
in code: `public/deepdev-student.svg`, `-engineer`, `-consultant`, `-pm` and
`-speaker` for the four acts, plus `deepdev-hero-stage.webp` for the hero and
`deepdev-many-hands.webp` for the skills section. `Journey.tsx` swaps the frame
on each act cut; because the files share the same palette and proportions, the
acts read as one person.

To swap in real stop-motion frames later, replace those files with the same
names and aspect ratios. The layout will not care.

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

- Company dates for the Adobe → Begig stretch are placeholders.
- The recon console is a self-initiated case with synthetic data; the case-study
  page says so, and should keep saying so.
