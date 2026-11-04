"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Rise from "./Rise";
import { archive, projects, type Project } from "@/data/portfolio";

const accents = ["#C94C24", "#2C6A5D", "#63456E", "#C08A2E"];

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
          <span className="mono-label text-[9px] text-ink-soft">{project.year}</span>
        </div>

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
          <span className="mono-label text-[9px] text-ink-soft">Role — {project.role}</span>
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

export default function Work() {
  return (
    <section id="work" className="relative border-t border-ink/15 py-16 lg:py-24">
      <div className="wrap">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mono-label text-flame">Selected work</span>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(2.2rem,5.4vw,4rem)] leading-[0.92]">
              Four things I made,
              <br />
              <span className="accent text-ink-soft">and what they cost.</span>
            </h2>
          </div>
          <div className="flex items-end gap-4">
            <p className="max-w-[15rem] text-sm leading-relaxed text-ink-soft">
              Open any card for the decision trail: the problem, the discovery, the trade-off, the
              number.
            </p>
            <span className="font-display text-4xl leading-none text-ink/15">04</span>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} i={i} />
          ))}
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
