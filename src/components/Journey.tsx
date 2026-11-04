"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Character from "./Character";
import { acts } from "@/data/portfolio";

/* ── set dressing, one arrangement per act ────────────────────── */

function SetDressing({ act }: { act: number }) {
  if (act === 0) {
    return (
      <>
        <div className="absolute left-4 top-10 h-40 w-28 -rotate-2 rounded-xl border border-ink/15 bg-paper/70 p-2 sm:left-8">
          <p className="font-display text-[11px] leading-relaxed text-ink/45">
            V = IR
            <br />∫ f(x) dx
            <br />H(s) = L{"{"}h{"}"}
          </p>
          <div className="mt-2 space-y-1">
            <div className="h-px w-full bg-ink/15" />
            <div className="h-px w-4/5 bg-ink/15" />
            <div className="h-px w-3/5 bg-ink/15" />
          </div>
        </div>
        <div className="absolute bottom-28 right-4 flex flex-col items-end gap-1 sm:right-10">
          {["#2C6A5D", "#C08A2E", "#C94C24"].map((c, i) => (
            <span
              key={c}
              className="block h-2.5 border border-ink/40"
              style={{ background: c, width: 64 - i * 10, opacity: 0.45 }}
            />
          ))}
        </div>
        <svg className="absolute right-6 top-16 h-16 w-24 opacity-30" viewBox="0 0 100 60" fill="none">
          <path d="M4 40 H26 V16 H54 V46 H76 V24 H96" stroke="#17150F" strokeWidth="1.4" />
          <circle cx="26" cy="16" r="2.5" fill="#17150F" />
          <circle cx="54" cy="46" r="2.5" fill="#17150F" />
          <circle cx="76" cy="24" r="2.5" fill="#17150F" />
        </svg>
      </>
    );
  }

  if (act === 1) {
    return (
      <>
        <div className="absolute left-4 top-8 w-[190px] -rotate-1 rounded-xl border border-ink/25 bg-ink p-2.5 shadow-hard-sm sm:left-8">
          <div className="mb-1.5 flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-paper/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-paper/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-ochre" />
          </div>
          <pre className="font-mono text-[8.5px] leading-[1.7] text-paper/60">{`> npm run ship
  ✓ build
  ✓ a11y
  ✓ deploy 7 products`}</pre>
        </div>
        <svg className="absolute bottom-24 right-4 h-24 w-24 opacity-35 sm:right-10" viewBox="0 0 100 100" fill="none">
          <path d="M14 74 V30 M14 52 H44 M44 52 V22 M44 62 H74" stroke="#17150F" strokeWidth="1.5" />
          <circle cx="14" cy="30" r="4" fill="#2C6A5D" stroke="#17150F" strokeWidth="1.2" />
          <circle cx="44" cy="22" r="4" fill="#C08A2E" stroke="#17150F" strokeWidth="1.2" />
          <circle cx="44" cy="62" r="4" fill="#C94C24" stroke="#17150F" strokeWidth="1.2" />
          <circle cx="74" cy="62" r="4" fill="#17150F" />
        </svg>
      </>
    );
  }

  if (act === 2) {
    return (
      <>
        <div className="absolute left-4 top-10 flex w-[170px] -rotate-2 flex-col gap-2 sm:left-8">
          <span className="w-fit rounded-lg border border-ink/30 bg-ochre/25 px-2 py-1 font-mono text-[8.5px] uppercase tracking-wider">
            &ldquo;I gave up at step 7&rdquo;
          </span>
          <span className="ml-4 w-fit rotate-1 rounded-lg border border-ink/30 bg-paper px-2 py-1 font-mono text-[8.5px] uppercase tracking-wider">
            no save. no back.
          </span>
        </div>
        <div className="absolute bottom-24 right-5 flex items-end gap-1.5 sm:right-10">
          {[22, 34, 46, 58, 74].map((h, i) => (
            <span
              key={i}
              className="w-3 border border-ink/35 bg-teal/35"
              style={{ height: h }}
            />
          ))}
        </div>
        <span className="absolute bottom-[86px] right-4 rotate-[-4deg] rounded-lg border border-ink bg-paper px-2 py-1 font-mono text-[9px] tracking-wider sm:right-10">
          40% → 78%
        </span>
      </>
    );
  }

  return (
    <>
      <div className="absolute left-4 top-10 flex w-[150px] flex-col gap-1.5 sm:left-8">
        {[
          { t: "PRD", c: "border-ink bg-paper" },
          { t: "RICE", c: "border-ink/40 bg-ochre/25" },
          { t: "EVAL", c: "border-ink/40 bg-teal/20" },
        ].map((n, i) => (
          <span
            key={n.t}
            className={`w-fit rounded-md border px-2 py-1 font-mono text-[9px] tracking-[0.14em] anim-bob ${n.c}`}
            style={{ marginLeft: i * 12, animationDelay: `${i * 0.35}s` }}
          >
            {n.t}
          </span>
        ))}
      </div>
      <div className="absolute bottom-24 right-4 flex items-end gap-2 sm:right-10">
        <span className="h-16 w-1 bg-ink/25" />
        <span className="h-24 w-1 bg-ink/25" />
        <span className="h-32 w-1 bg-flame/50" />
      </div>
      <div className="absolute right-5 top-12 h-16 w-16 sm:right-10">
        <span className="absolute inset-0 rotate-45 rounded-2xl border border-ink/20" />
        <span className="absolute inset-2 rotate-12 rounded-2xl border border-ink/15" />
      </div>
    </>
  );
}

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [act, setAct] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.max(0, Math.min(acts.length - 1, Math.floor(v * acts.length)));
    setAct((prev) => (prev === next ? prev : next));
  });

  const go = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + (travel * (i + 0.15)) / acts.length, behavior: "smooth" });
  };

  const current = acts[act];

  return (
    <section id="reel" className="relative border-t border-ink/15">
      {/* intro */}
      <div className="wrap flex flex-col gap-6 py-16 sm:flex-row sm:items-end sm:justify-between lg:py-24">
        <div>
          <span className="mono-label text-flame">Act structure</span>
          <h2 className="mt-3 max-w-xl font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[0.95]">
            Four acts.
            <span className="accent text-ink-soft"> One through-line.</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
          Every stage taught the same lesson from a different angle: how a thing is made, what people
          actually need, and which of those two wins.
        </p>
      </div>

      <div ref={ref} className="relative h-[380vh]">
        <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden">
          <div className="wrap grid h-full content-center grid-rows-[auto_auto] gap-4 pb-4 pt-2 lg:grid-cols-[1.15fr_0.85fr] lg:grid-rows-1 lg:content-normal lg:gap-10 lg:py-8">
            {/* ── stage ───────────────────────────── */}
            <div className="relative h-[40svh] min-h-[180px] lg:h-full">
              <div className="relative h-full min-h-[210px] overflow-hidden rounded-2xl border border-ink/25 bg-paper-2/70">
                {/* tint wash */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ backgroundColor: current.tint }}
                  transition={{ duration: 0.3 }}
                  style={{ opacity: 0.09 }}
                />

                {/* room lines */}
                <div
                  className="absolute inset-0 opacity-[0.5]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(23,21,15,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(23,21,15,0.07) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                  }}
                />

                {/* giant numeral */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current.numeral}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[38vw] leading-none tracking-tighter text-ink/[0.075] sm:text-[26vw] lg:text-[19vw]"
                  >
                    {current.numeral}
                  </motion.span>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={act}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    <SetDressing act={act} />
                  </motion.div>
                </AnimatePresence>

                {/* floor */}
                <div className="absolute inset-x-0 bottom-0 h-[22%] bg-ink/[0.05]" />
                <div className="absolute inset-x-0 bottom-[22%] h-px bg-ink/20" />

                {/* spotlight */}
                <div
                  className="absolute inset-x-0 bottom-[10%] top-0"
                  style={{
                    background:
                      "radial-gradient(50% 60% at 50% 55%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 72%)",
                  }}
                />

                <Character
                  pose={current.pose}
                  className="absolute bottom-[17%] left-1/2 h-[62%] -translate-x-1/2 paper-edge lg:h-[64%]"
                />

                {/* caption strip */}
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-ink/25 bg-paper/80 px-3 py-1.5 backdrop-blur-[2px]">
                  <span className="mono-label text-[9px] text-ink-soft">
                    {current.kicker} — {current.org}
                  </span>
                  <span className="mono-label text-[9px] text-ink-soft">{current.years}</span>
                </div>
              </div>
            </div>

            {/* ── caption card ────────────────────── */}
            <div className="relative flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, times: [0, 0.5, 1] }}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="accent text-2xl text-flame">{current.numeral}</span>
                    <span className="mono-label text-ink-soft">{current.kicker}</span>
                    <span className="h-px flex-1 bg-ink/20" />
                  </div>

                  <h3 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.9rem)] leading-[0.95]">
                    {current.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="rounded-full border border-ink bg-ink px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-paper">
                      {current.org}
                    </span>
                    <span className="mono-label text-[10px] text-ink-soft">{current.role}</span>
                  </div>

                  <p className="accent mt-4 text-[clamp(1.15rem,2vw,1.4rem)] leading-snug text-ink">{current.line}</p>

                  <ul className="mt-3.5 space-y-1.5">
                    {current.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-[12.5px] leading-snug text-ink-soft lg:text-[13.5px]">
                        <span
                          className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full"
                          style={{ background: current.tint }}
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="sr-only">{current.body}</p>

                  <div className="mt-5 flex items-center gap-4 border-t border-ink/15 pt-4">
                    <span className="font-display text-3xl leading-none text-flame">{current.stat.value}</span>
                    <span className="mono-label max-w-[8rem] text-[9px] leading-relaxed text-ink-soft">
                      {current.stat.label}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* act rail */}
              <div className="mt-8 hidden items-center gap-1.5 lg:flex">
                {acts.map((a, i) => (
                  <button
                    key={a.id}
                    onClick={() => go(i)}
                    aria-label={`Go to ${a.title}`}
                    aria-current={i === act}
                    className="group flex-1 rounded-lg text-left"
                  >
                    <span
                      className={`block h-[4px] rounded-full transition-colors duration-200 ${
                        i === act ? "bg-flame" : "bg-ink/20 group-hover:bg-ink/40"
                      }`}
                    />
                    <span
                      className={`mt-2 block font-mono text-[9px] uppercase tracking-[0.12em] transition-colors ${
                        i === act ? "text-ink" : "text-ink-soft"
                      }`}
                    >
                      {a.title.replace("The ", "")}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
