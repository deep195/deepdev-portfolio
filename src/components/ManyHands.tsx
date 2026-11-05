"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Rise from "./Rise";
import { skillClusters, skills, type Skill } from "@/data/portfolio";

const clusterColor: Record<string, string> = {
  Product: "#C94C24",
  "AI & Systems": "#2C6A5D",
  Data: "#63456E",
  Delivery: "#C08A2E",
};

/**
 * Hover hit-zones positioned over each held object / label in the
 * static illustration, as a % box of the image (left, top, width, height).
 * Keeps the hover-to-highlight interaction the old hand-drawn arms had,
 * without redrawing ten limbs by hand.
 */
const HOTSPOTS: { label: Skill["label"]; box: [number, number, number, number] }[] = [
  { label: "RAG", box: [24, 6, 9, 20] },
  { label: "LLM Eval", box: [36, 1, 12, 21] },
  { label: "Prompt Eng", box: [53, 1, 12, 24] },
  { label: "SQL", box: [65, 10, 14, 20] },
  { label: "A/B Testing", box: [72, 26, 23, 16] },
  { label: "PRDs", box: [72, 42, 23, 14] },
  { label: "Stakeholders", box: [72, 64, 23, 13] },
  { label: "Strategy", box: [6, 64, 21, 15] },
  { label: "Discovery", box: [5, 42, 22, 14] },
  { label: "RICE", box: [12, 24, 15, 16] },
];

export default function ManyHands() {
  const [hover, setHover] = useState<string | null>(null);
  const hoverCluster = skills.find((s) => s.label === hover)?.cluster ?? null;

  return (
    <section id="hands" className="relative overflow-hidden border-t border-ink/15 bg-paper-2/40 py-16 lg:py-24">
      <div className="wrap relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mono-label text-flame">The repertoire</span>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(2.2rem,5.4vw,4rem)] leading-[0.92]">
              Everything I can put my
              <span className="accent text-flame"> hands</span> on.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
            Ten disciplines, one head. The arms are a metaphor.
            <span className="text-ink"> The list underneath is not.</span>
          </p>
        </div>

        {/* ── the many hands ───────────────────────── */}
        <div className="mt-10 grid items-center gap-8 lg:mt-6 lg:grid-cols-[1fr_minmax(280px,340px)] lg:gap-10">
          <Rise y={24}>
            <div className="relative mx-auto w-full max-w-[740px]">
              <div className="relative aspect-[1573/1000] overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/deepdev-many-hands.webp"
                  alt="Deepdev Vyas illustrated with ten arms, each holding a tool for a different product discipline: strategy, discovery, RICE, RAG, LLM eval, prompt engineering, SQL, A/B testing, PRDs, and stakeholders."
                  className="absolute inset-0 h-full w-full object-contain"
                />

                {/* invisible hover zones, tied to the cluster highlight on the right */}
                {HOTSPOTS.map(({ label, box: [left, top, width, height] }) => {
                  const skill = skills.find((s) => s.label === label);
                  const color = skill ? clusterColor[skill.cluster] : "#17150F";
                  const active = hover === label;
                  return (
                    <button
                      key={label}
                      onMouseEnter={() => setHover(label)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(label)}
                      onBlur={() => setHover(null)}
                      aria-label={label}
                      className="group absolute cursor-pointer"
                      style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }}
                    >
                      <span
                        className="absolute inset-0 rounded-2xl border-2 transition-opacity duration-150"
                        style={{
                          borderColor: color,
                          borderStyle: "dashed",
                          opacity: active ? 0.85 : 0,
                        }}
                      />
                    </button>
                  );
                })}
              </div>

              <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">
                Fig. 02 · ten hands, one product brain
              </p>
            </div>
          </Rise>

          {/* ── clusters ─────────────────────────── */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {skillClusters.map((cluster, i) => {
              const color = clusterColor[cluster.name];
              const active = hoverCluster === cluster.name;
              return (
                <Rise key={cluster.name} delay={i * 0.06} y={16}>
                  <motion.div
                    animate={{ scale: active ? 1.015 : 1 }}
                    transition={{ duration: 0.15 }}
                    className="group relative rounded-2xl border p-3.5 transition-colors"
                    style={{
                      borderColor: active ? color : undefined,
                      background: active ? `${color}14` : undefined,
                    }}
                  >
                    <div
                      className={`absolute inset-0 rounded-2xl border transition-colors ${
                        active ? "" : "border-ink/20 group-hover:border-ink/50"
                      }`}
                      aria-hidden
                    />
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
                        <h3 className="font-display text-base leading-none">{cluster.name}</h3>
                      </div>
                      <span className="mono-label text-[8px] text-ink-soft">0{i + 1}</span>
                    </div>
                    <p className="relative mt-1.5 text-[11px] italic text-ink-soft">{cluster.blurb}</p>
                    <ul className="relative mt-2.5 flex flex-wrap gap-1">
                      {cluster.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-ink/15 bg-paper-2/60 px-2 py-0.5 font-mono text-[9px] tracking-wide text-ink-soft"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </Rise>
              );
            })}
          </div>
        </div>

        {/* screen-reader list */}
        <ul className="sr-only">
          {skills.map((s) => (
            <li key={s.label}>
              {s.label}: {s.cluster}
            </li>
          ))}
        </ul>

        <motion.div
          className="mt-10 flex items-center gap-3 border-t border-ink/15 pt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="mono-label text-[9px] text-ink-soft">And the soft ones</span>
          <span className="h-px flex-1 bg-ink/10" />
          <span className="accent max-w-lg text-right text-base text-ink-soft">
            writing the doc nobody asked for, saying no early, and reading the room before the room
            reads the roadmap.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
