"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Rise from "./Rise";
import {
  archive,
  projects,
  sideProjects,
  teardowns,
  type Project,
  type SideProject,
} from "@/data/portfolio";

const accents = ["#C94C24", "#2C6A5D", "#63456E", "#C08A2E"];

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M3 9L9 3M9 3H4.5M9 3V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProjectCard({ project, i }: { project: Project; i: number }) {
  const [open, setOpen] = useState(false);
  const accent = accents[i % accents.length];

  return (
    <Rise delay={(i % 2) * 0.08} y={26} className={project.featured ? "md:col-span-2" : ""}>
      <article
        className={`paper-card group flex h-full flex-col overflow-hidden transition-transform duration-150 hover:-translate-y-[2px] ${
          project.featured ? "" : ""
        }`}
        style={{ boxShadow: `0 5px 0 0 ${accent}` }}
      >
        {/* slate */}
        <div className="flex items-center justify-between gap-3 border-b border-ink/20 px-4 py-2">
          <div className="flex items-center gap-2.5">
            <span
              className="grid h-6 w-8 place-items-center rounded-lg font-mono text-[9px] font-bold text-paper"
              style={{ background: accent }}
            >
              {project.index}
            </span>
            <span className="mono-label text-[9px] text-ink-soft">{project.org}</span>
          </div>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="View code on GitHub"
                className="text-ink-soft transition-colors hover:text-ink"
              >
                <GithubIcon />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="View live site"
                className="text-ink-soft transition-colors hover:text-ink"
              >
                <ExternalIcon />
              </a>
            )}
            <span className="mono-label text-[9px] text-ink-soft">{project.year}</span>
          </div>
        </div>

        {project.thumbnail && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.title}`}
            className="group/thumb relative block aspect-[21/9] w-full overflow-hidden border-b border-ink/20 bg-ink"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.thumbnail}
              alt={`${project.title}, live screenshot`}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover/thumb:scale-[1.04]"
            />
            <div className="absolute inset-0 flex items-end justify-end bg-ink/0 p-3 opacity-0 transition-all duration-200 group-hover/thumb:bg-ink/15 group-hover/thumb:opacity-100">
              <span className="flex items-center gap-1.5 rounded-full border border-ink bg-paper px-2.5 py-1 font-mono text-[9px] uppercase tracking-wide text-ink shadow-hard-sm">
                Visit <ExternalIcon />
              </span>
            </div>
          </a>
        )}

        <div className={`flex flex-1 flex-col gap-5 p-5 sm:p-6 ${project.featured ? "lg:flex-row lg:gap-10" : ""}`}>
          <div className="flex-1">
            <p className="mono-label text-[9px]" style={{ color: accent }}>
              {project.subtitle}
            </p>
            <h3
              className={`mt-2 font-display leading-[0.98] ${
                project.featured ? "text-[clamp(1.7rem,3.4vw,2.6rem)]" : "text-[clamp(1.4rem,2.4vw,1.8rem)]"
              }`}
            >
              {project.title}
            </h3>
            <p className={`mt-3 leading-relaxed text-ink-soft ${project.featured ? "max-w-xl text-[14.5px]" : "text-[13px]"}`}>
              {project.headline}
            </p>

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-ink/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-ink-soft"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* metrics */}
          <div
            className={`flex shrink-0 gap-4 ${
              project.featured
                ? "flex-row border-t border-ink/15 pt-4 lg:w-[15rem] lg:flex-col lg:justify-center lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
                : "border-t border-ink/15 pt-4"
            }`}
          >
            {project.metrics.map((m, k) => (
              <div key={m.label} className={project.featured ? "flex-1" : "flex-1"}>
                <div
                  className={`font-display leading-none ${project.featured ? "text-3xl lg:text-4xl" : "text-2xl"}`}
                  style={{ color: k === 0 ? accent : undefined }}
                >
                  {m.value}
                </div>
                <div className="mono-label mt-1.5 text-[8.5px] leading-relaxed text-ink-soft">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex flex-col items-start gap-1.5 border-t border-ink/20 px-4 py-3 text-left transition-colors hover:bg-ink/[0.04] sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <span className="mono-label flex items-center gap-2 text-[9.5px]">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              className={`transition-transform duration-200 ${open ? "rotate-45" : ""}`}
              aria-hidden
            >
              <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            {open ? "Close the case study" : "Read the case study"}
          </span>
          <span className="mono-label text-[9px] text-ink-soft">Role: {project.role}</span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
              className="overflow-hidden border-t border-ink/15 bg-paper-2/50"
            >
              <div className="grid gap-x-8 gap-y-5 p-5 sm:grid-cols-2 sm:p-6">
                {project.caseStudy.map((step, idx) => (
                  <div key={step.step} className="relative pl-7">
                    <span
                      className="absolute left-0 top-0 grid h-5 w-5 place-items-center rounded-full font-mono text-[9px] font-bold text-paper"
                      style={{ background: accent }}
                    >
                      {idx + 1}
                    </span>
                    <h4 className="mono-label text-[9.5px] text-ink">{step.step}</h4>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">{step.text}</p>
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <div className="dashed-ink mb-3" />
                  <h4 className="mono-label flex items-center gap-2 text-[9.5px] text-ink">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                    What I&apos;d do differently
                  </h4>
                  <p className="accent mt-1.5 text-base leading-relaxed text-ink">
                    {project.differently}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </Rise>
  );
}

const sideAccents = ["#2C6A5D", "#C94C24", "#63456E", "#C08A2E", "#2C6A5D", "#C94C24"];

/** No live site to screenshot (a local-only tool): a waveform stands in for it. */
function AudioFallback({ accent }: { accent: string }) {
  const bars = [0.3, 0.6, 0.9, 0.5, 1, 0.4, 0.7, 0.95, 0.35, 0.65, 0.5, 0.8, 0.3, 0.6, 0.45];
  return (
    <div
      className="flex h-full w-full items-center justify-center gap-[3px] px-6"
      style={{ background: "linear-gradient(135deg, #17150F, #2a2620)" }}
    >
      {bars.map((h, idx) => (
        <span
          key={idx}
          className="w-[5px] rounded-full opacity-80 transition-all duration-300 group-hover:opacity-100"
          style={{ height: `${h * 60}%`, background: idx % 3 === 0 ? accent : "#F4EEE2" }}
        />
      ))}
    </div>
  );
}

function SideProjectCard({ project, i }: { project: SideProject; i: number }) {
  const accent = sideAccents[i % sideAccents.length];
  const visitUrl = project.liveUrl ?? project.githubUrl;

  return (
    <Rise delay={(i % 3) * 0.06} y={20}>
      <article
        className="paper-card group flex h-full flex-col overflow-hidden transition-transform duration-150 hover:-translate-y-[2px]"
        style={{ boxShadow: `0 4px 0 0 ${accent}` }}
      >
        {/* thumbnail: a real screenshot of the live site, or a waveform for the offline tool */}
        <a
          href={visitUrl}
          target={visitUrl ? "_blank" : undefined}
          rel="noreferrer"
          aria-label={visitUrl ? `Open ${project.title}` : project.title}
          className={`relative block aspect-[16/10] w-full overflow-hidden border-b border-ink/20 bg-ink ${
            visitUrl ? "cursor-pointer" : "cursor-default"
          }`}
        >
          {project.thumbnail ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={project.thumbnail}
              alt={`${project.title}, live screenshot`}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.06]"
            />
          ) : (
            <AudioFallback accent={accent} />
          )}

          {visitUrl && (
            <div className="absolute inset-0 flex items-end justify-end bg-ink/0 p-3 opacity-0 transition-all duration-200 group-hover:bg-ink/15 group-hover:opacity-100">
              <span className="flex items-center gap-1.5 rounded-full border border-ink bg-paper px-2.5 py-1 font-mono text-[9px] uppercase tracking-wide text-ink shadow-hard-sm">
                {project.liveUrl ? "Visit" : "Code"} <ExternalIcon />
              </span>
            </div>
          )}
        </a>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl leading-tight">{project.title}</h3>
            <div className="flex shrink-0 items-center gap-2.5 pt-1">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} on GitHub`}
                  className="text-ink-soft transition-colors hover:text-ink"
                >
                  <GithubIcon />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} live`}
                  className="text-ink-soft transition-colors hover:text-ink"
                >
                  <ExternalIcon />
                </a>
              )}
            </div>
          </div>

          <p className="mono-label text-[9px]" style={{ color: accent }}>
            {project.tagline}
          </p>

          <p className="text-[12.5px] leading-relaxed text-ink-soft">{project.problem}</p>

          <div className="mt-auto flex gap-4 border-t border-ink/15 pt-3">
            {project.numbers.map((n) => (
              <div key={n.label}>
                <div className="font-display text-xl leading-none">{n.value}</div>
                <div className="mono-label mt-1 text-[8px] leading-relaxed text-ink-soft">{n.label}</div>
              </div>
            ))}
          </div>

          <ul className="flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <li
                key={t}
                className="rounded-full border border-ink/15 bg-paper-2/60 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-wide text-ink-soft"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Rise>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative border-t border-ink/15 py-16 lg:py-24">
      <div className="wrap">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mono-label text-flame">Selected work</span>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(2.2rem,5.4vw,4rem)] leading-[0.92]">
              Five things I made,
              <br />
              <span className="accent text-ink-soft">and what they cost.</span>
            </h2>
          </div>
          <div className="flex items-end gap-4">
            <p className="max-w-[15rem] text-sm leading-relaxed text-ink-soft">
              Open any card for the decision trail: the problem, the discovery, the trade-off, the
              number.
            </p>
            <span className="font-display text-4xl leading-none text-ink/15">05</span>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} i={i} />
          ))}
        </div>

        {/* side projects: things built and shipped on my own, code and demo public */}
        <div className="mt-16 border-t border-ink/20 pt-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mono-label text-flame">Also shipped, solo</span>
              <h3 className="mt-2 max-w-xl font-display text-[clamp(1.6rem,3.2vw,2.2rem)] leading-[0.95]">
                Side builds, code public.
              </h3>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
              No client brief, no deadline but my own. Repo and live demo linked on every card.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sideProjects.map((p, i) => (
              <SideProjectCard key={p.id} project={p} i={i} />
            ))}
          </div>
        </div>

        {/* teardowns & practice: scoped exercises, not shipped software */}
        <div className="mt-16 border-t border-ink/20 pt-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mono-label text-flame">Reps, not résumé padding</span>
              <h3 className="mt-2 max-w-xl font-display text-[clamp(1.6rem,3.2vw,2.2rem)] leading-[0.95]">
                Teardowns & practice.
              </h3>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
              Scoped 1–2 week exercises: a deck or doc, not shipped code, so no GitHub link, but a
              real problem each time.
            </p>
          </div>

          <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-ink/20 bg-ink/20 sm:grid-cols-2">
            {teardowns.map((t) => (
              <li key={t.name} className="flex flex-col gap-2 bg-paper p-4">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-display text-base leading-tight">{t.name}</h4>
                  <span className="mono-label shrink-0 text-[8px] text-flame">{t.category}</span>
                </div>
                <p className="text-[12px] leading-relaxed text-ink-soft">{t.problem}</p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-1">
                  <span className="mono-label text-[8.5px] text-ink-soft">{t.timeToComplete}</span>
                  {t.link && (
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mono-label flex items-center gap-1 text-[8.5px] text-ink underline decoration-ink/30 underline-offset-2 transition-colors hover:decoration-ink"
                    >
                      View <ExternalIcon />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* archive */}
        <div className="mt-12 border-t border-ink/20 pt-6">
          <div className="flex items-center gap-3">
            <span className="mono-label text-[9px] text-ink-soft">Also in the archive</span>
            <span className="h-px flex-1 bg-ink/10" />
          </div>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {archive.map((a) => (
              <li key={a.title} className="group flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40 transition-colors group-hover:bg-flame" />
                <div>
                  <p className="font-display text-[15px] leading-tight">{a.title}</p>
                  <p className="mono-label mt-1 text-[8.5px] text-ink-soft">
                    {a.detail} · {a.org}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
