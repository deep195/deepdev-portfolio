"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import Character from "./Character";
import Rise from "./Rise";
import { skillClusters, skills } from "@/data/portfolio";

const CX = 280;
const CY = 320;
const VB = 560;

const clusterColor: Record<string, string> = {
  Product: "#C94C24",
  "AI & Systems": "#2C6A5D",
  Data: "#63456E",
  Delivery: "#C08A2E",
};

const rad = (deg: number) => (deg * Math.PI) / 180;

/**
 * A paper-cut arm: a tapered closed shape along a gently bent quadratic
 * spine, so ten of them read as limbs instead of a sunburst.
 */
function buildArm(length: number, bend: number) {
  const P0 = { x: 0, y: 0 };
  const P1 = { x: bend, y: -length * 0.52 };
  const P2 = { x: bend * 0.35, y: -length };

  const N = 16;
  const left: [number, number][] = [];
  const right: [number, number][] = [];

  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const mt = 1 - t;
    const x = mt * mt * P0.x + 2 * mt * t * P1.x + t * t * P2.x;
    const y = mt * mt * P0.y + 2 * mt * t * P1.y + t * t * P2.y;
    const dx = 2 * mt * (P1.x - P0.x) + 2 * t * (P2.x - P1.x);
    const dy = 2 * mt * (P1.y - P0.y) + 2 * t * (P2.y - P1.y);
    const m = Math.hypot(dx, dy) || 1;
    const nx = -dy / m;
    const ny = dx / m;
    const w = 8.2 - 3.1 * Math.pow(t, 0.8);
    left.push([x + nx * w, y + ny * w]);
    right.push([x - nx * w, y - ny * w]);
  }

  const pts = [...left, ...right.reverse()];
  const d = `M${pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ")} Z`;
  return { d, tip: P2 };
}

function HeldObject({ cluster, color }: { cluster: string; color: string }) {  if (cluster === "Product") {
    return (
      <g>
        <rect x="-8.5" y="-7" width="17" height="13" rx="3" fill="#F4EEE2" stroke="#17150F" strokeWidth="1.7" />
        <path d="M-5 -2.5 h10 M-5 1 h6" stroke="#17150F" strokeWidth="1.1" opacity="0.5" />
        <path d="M-8.5 -7 v13" stroke={color} strokeWidth="1.7" />
      </g>
    );
  }
  if (cluster === "AI & Systems") {
    return (
      <g>
        <rect x="-7" y="-7" width="14" height="14" rx="3.5" fill="#F4EEE2" stroke="#17150F" strokeWidth="1.7" />
        <rect x="-3" y="-3" width="6" height="6" rx="1.6" fill={color} />
        <path
          d="M-9.5 -1.5 v3 M-7 -2.5 v5 M7 -2.5 v5 M9.5 -1.5 v3 M-1.5 -9.5 h3 M-1.5 9.5 h3"
          stroke="#17150F"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>
    );
  }
  if (cluster === "Data") {
    return (
      <g>
        <rect x="-8" y="-4" width="4.5" height="10" rx="2" fill="#F4EEE2" stroke="#17150F" strokeWidth="1.4" />
        <rect x="-2" y="-8" width="4.5" height="14" rx="2" fill={color} stroke="#17150F" strokeWidth="1.4" />
        <rect x="4" y="-1" width="4.5" height="7" rx="2" fill="#F4EEE2" stroke="#17150F" strokeWidth="1.4" />
      </g>
    );
  }
  return (
    <g>
      <rect x="-7.5" y="-9" width="15" height="17" rx="3.5" fill="#F4EEE2" stroke="#17150F" strokeWidth="1.7" />
      <path d="M-4.5 -3.5 l1.7 1.8 l3.3 -3.4" stroke={color} strokeWidth="1.7" fill="none" strokeLinecap="round" />
      <path d="M-4.5 3 h8" stroke="#17150F" strokeWidth="1.1" opacity="0.45" />
    </g>
  );
}

const ARMS = skills.map((s) => {
  const bend = s.angle * 0.52;
  const len = s.length * 0.86;
  const { d, tip } = buildArm(len, bend);
  const th = rad(s.angle);
  const tx = tip.x * Math.cos(th) - tip.y * Math.sin(th);
  const ty = tip.x * Math.sin(th) + tip.y * Math.cos(th);
  const dist = Math.hypot(tx, ty) || 1;
  const lr = dist + 38;
  return {
    ...s,
    d,
    len,
    tip,
    labelX: (CX + (tx / dist) * lr) / VB,
    labelY: (CY + (ty / dist) * lr) / VB,
  };
});

export default function ManyHands() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section id="hands" className="relative overflow-hidden border-t border-ink/15 bg-paper-2/40 py-16 lg:py-24">
      {/* faint rays */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        aria-hidden
        style={{
          background:
            "repeating-conic-gradient(from 200deg at 50% 55%, rgba(23,21,15,0.05) 0deg 1deg, transparent 1deg 9deg)",
          maskImage: "radial-gradient(60% 60% at 50% 55%, black 10%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(60% 60% at 50% 55%, black 10%, transparent 72%)",
        }}
      />

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
          <div ref={ref} className="relative mx-auto w-full max-w-[740px]">
            <div className="relative aspect-square">
              <svg viewBox={`0 0 ${VB} ${VB}`} className="absolute inset-0 h-full w-full" aria-hidden fill="none">
                {/* halo rings */}
                <circle cx={CX} cy={CY} r="212" stroke="#17150F" strokeWidth="1" strokeDasharray="1 9" opacity="0.22" />
                <circle
                  cx={CX}
                  cy={CY}
                  r="236"
                  stroke="#C94C24"
                  strokeWidth="1.2"
                  strokeDasharray="16 22"
                  opacity={inView ? 0.32 : 0}
                  style={{ transition: "opacity 600ms steps(4)" }}
                />

                {/* arms */}
                <g transform={`translate(${CX} ${CY})`}>
                  {ARMS.map((s, i) => {
                    const color = clusterColor[s.cluster];
                    const active = hover === s.label;
                    const dim = hover !== null && !active;
                    const openScale = inView ? 1 : 0.12;
                    const hx = s.tip.x;
                    const hy = s.tip.y;
                    return (
                      <g
                        key={s.label}
                        style={{
                          transform: `rotate(${s.angle}deg) scale(1, ${openScale}) scale(${active ? 1.04 : 1}, 1)`,
                          transformOrigin: "0 0",
                          transition: `transform ${580 + i * 26}ms steps(8), opacity 220ms linear`,
                          opacity: dim ? 0.4 : 1,
                          cursor: "pointer",
                        }}
                        onMouseEnter={() => setHover(s.label)}
                        onMouseLeave={() => setHover(null)}
                      >
                        <path
                          d={s.d}
                          fill={color}
                          stroke="#17150F"
                          strokeWidth="1.9"
                          strokeLinejoin="round"
                        />
                        {/* cuff */}
                        <path
                          d={`M${hx - 7} ${hy + 11} L${hx + 7} ${hy + 9}`}
                          stroke="#17150F"
                          strokeWidth="5"
                          strokeLinecap="butt"
                          opacity="0.85"
                        />
                        {/* object then hand, so the hand grips it */}
                        <g transform={`translate(${hx} ${hy - 13})`}>
                          <HeldObject cluster={s.cluster} color={color} />
                        </g>
                        <circle cx={hx} cy={hy} r="8.2" fill="#C98D68" stroke="#17150F" strokeWidth="2" />
                        <path
                          d={`M${hx - 3} ${hy - 2.5} q3.2 -1.8 5.4 1`}
                          stroke="#C08A2E"
                          strokeWidth="1.1"
                          strokeLinecap="round"
                          fill="none"
                          opacity="0.7"
                        />
                      </g>
                    );
                  })}
                </g>

                {/* pedestal */}
                <ellipse cx={CX} cy="532" rx="86" ry="10" fill="#17150F" opacity="0.09" />
              </svg>

              {/* labels (desktop) */}
              <div className="pointer-events-none absolute inset-0 hidden lg:block">
                {ARMS.map((s) => {
                  const x = s.labelX * 100;
                  const y = s.labelY * 100;
                  const dx = s.labelX * VB - CX;
                  const shift = dx < -14 ? "translate(-100%, -50%)" : dx > 14 ? "translate(0, -50%)" : "translate(-50%, -50%)";
                  const active = hover === s.label;
                  return (
                    <button
                      key={s.label}
                      onMouseEnter={() => setHover(s.label)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(s.label)}
                      onBlur={() => setHover(null)}
                      className={`pointer-events-auto absolute whitespace-nowrap rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] transition-colors duration-150 ${
                        active ? "border-ink bg-ink text-paper" : "bg-paper/85 text-ink-soft hover:text-ink"
                      }`}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: shift,
                        borderColor: active ? undefined : `${clusterColor[s.cluster]}88`,
                      }}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>

              {/* the figure */}
              <Character
                pose="pm"
                showGlasses
                className="absolute bottom-[2%] left-1/2 h-[66%] -translate-x-1/2 paper-edge"
              />

              {/* floating sparks */}
              <span className="absolute left-[9%] top-[14%] h-1.5 w-1.5 rounded-full bg-flame anim-bob" />
              <span
                className="absolute right-[7%] top-[24%] h-1 w-1 rounded-full bg-teal anim-bob"
                style={{ animationDelay: "0.5s" }}
              />
              <span
                className="absolute bottom-[20%] left-[13%] h-1 w-1 rounded-full bg-ochre anim-bob"
                style={{ animationDelay: "1s" }}
              />
            </div>

            <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">
              Fig. 02 — ten hands, one product brain
            </p>
          </div>

          {/* ── clusters ─────────────────────────── */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {skillClusters.map((cluster, i) => {
              const color = clusterColor[cluster.name];
              return (
                <Rise key={cluster.name} delay={i * 0.06} y={16}>
                  <div className="group relative rounded-2xl border border-ink/20 bg-paper/70 p-3.5 transition-colors hover:border-ink/50 hover:bg-paper">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
                        <h3 className="font-display text-base leading-none">{cluster.name}</h3>
                      </div>
                      <span className="mono-label text-[8px] text-ink-soft">0{i + 1}</span>
                    </div>
                    <p className="mt-1.5 text-[11px] italic text-ink-soft">{cluster.blurb}</p>
                    <ul className="mt-2.5 flex flex-wrap gap-1">
                      {cluster.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-ink/15 bg-paper-2/60 px-2 py-0.5 font-mono text-[9px] tracking-wide text-ink-soft"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Rise>
              );
            })}
          </div>
        </div>

        {/* screen-reader list */}
        <ul className="sr-only">
          {skills.map((s) => (
            <li key={s.label}>
              {s.label} — {s.cluster}
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
