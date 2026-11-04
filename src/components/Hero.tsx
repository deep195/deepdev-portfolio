"use client";

import Rise from "./Rise";
import { profile } from "@/data/portfolio";

const ticker = ["Student", "Engineer", "Consultant", "Product Manager"];

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-16">
      {/* stage markings */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-0 hidden h-full w-px bg-ink/6 lg:block" />
        <div className="absolute left-0 top-[68%] h-px w-full bg-ink/6" />
        <div className="absolute right-6 top-24 hidden h-4 w-4 rounded-tr-lg border-r border-t border-ink/30 lg:block" />
        <div className="absolute left-6 top-24 hidden h-4 w-4 rounded-tl-lg border-l border-t border-ink/30 lg:block" />
      </div>

      <div className="wrap relative grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.06fr_0.94fr] lg:gap-8 lg:py-16">
        {/* ── copy ─────────────────────────────────── */}
        <div className="max-w-2xl">
          <Rise inView={false} delay={0.1}>
            <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-paper px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]">
                <span className="h-1.5 w-1.5 rounded-full bg-flame" />
                A portfolio in four acts
              </span>
              <span className="mono-label text-ink-soft">Reel 01 · {profile.location}</span>
            </div>
          </Rise>

          <Rise inView={false} delay={0.18}>
            <h1 className="font-display text-[clamp(3.4rem,9vw,6.6rem)] font-extrabold leading-[0.86] tracking-[-0.045em]">
              Deepdev
              <span className="accent block font-medium text-flame">Vyas</span>
            </h1>
          </Rise>

          <Rise inView={false} delay={0.26}>
            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-10 bg-ink" />
              <p className="mono-label text-ink-soft">
                Product Manager · <span className="text-ink">{profile.discipline}</span>
              </p>
            </div>
          </Rise>

          <Rise inView={false} delay={0.34}>
            <p className="mt-6 max-w-lg font-display text-[clamp(1.35rem,2.4vw,1.75rem)] leading-snug">
              Former engineer, former consultant —
              <span className="accent"> still a student.</span> {profile.tagline}
            </p>
          </Rise>

          <Rise inView={false} delay={0.42}>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">{profile.subline}</p>
          </Rise>

          <Rise inView={false} delay={0.5}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("play-reel"))}
                className="btn-hard"
              >
                Play the reel
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M6 1v10M2 7l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
              <a href="#work" className="btn-ghost">
                See the work
              </a>
            </div>
          </Rise>

          <Rise inView={false} delay={0.58}>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-px border-t border-ink/15 pt-5">
              {[
                { k: "Years", v: "3+" },
                { k: "Features shipped", v: "15" },
                { k: "AI products", v: "6" },
              ].map((s) => (
                <div key={s.k} className="pr-3">
                  <dt className="mono-label min-h-[2.4em] text-[9px] leading-tight text-ink-soft">{s.k}</dt>
                  <dd className="mt-1 font-display text-2xl leading-none">{s.v}</dd>
                </div>
              ))}
            </dl>
          </Rise>
        </div>

        {/* ── the stage ────────────────────────────── */}
        <Rise inView={false} delay={0.3} y={30} className="relative">
          <div className="relative mx-auto w-full max-w-[460px] rotate-[1deg]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/deepdev-hero-stage.webp"
              alt="Deepdev Vyas, illustrated, speaking into a microphone, surrounded by labels for the tools he works with — RAG, LLMs, Voice Agents, n8n, Automation, Integrations, Stakeholders, MVPs, Delivery, Discovery, Strategy, and PRD. Captioned Fig. 01, The PM, mid-sentence, with a 'Now — Begig' tag."
              className="h-auto w-full drop-shadow-[0_18px_40px_-16px_rgba(23,21,15,0.35)]"
            />
          </div>
        </Rise>
      </div>

      {/* ── ticker ─────────────────────────────────── */}
      <div className="relative mt-4 border-y border-ink/20 bg-paper-2/60 py-2.5">
        <div className="flex w-max animate-[marquee_38s_linear_infinite] items-center gap-6 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex items-center gap-6" aria-hidden={dup === 1}>
              {Array.from({ length: 3 }).flatMap((__, k) =>
                ticker.map((t, i) => (
                  <span key={`${k}-${i}`} className="flex items-center gap-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-soft">{t}</span>
                    <span className="font-display text-sm text-flame">✳</span>
                  </span>
                )),
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
