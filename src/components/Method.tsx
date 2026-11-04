import Rise from "./Rise";

const steps = [
  {
    n: "01",
    name: "Discover",
    text: "Sit with the people doing the work. Read the tickets. Count the minutes lost.",
  },
  {
    n: "02",
    name: "Define",
    text: "Write the smallest honest version. Name the metric and the threshold before anyone builds.",
  },
  {
    n: "03",
    name: "Deliver",
    text: "Scope it, staff it, unblock it. Ship something a stranger can use on a Tuesday.",
  },
  {
    n: "04",
    name: "Measure",
    text: "Compare against the number you promised. Keep the receipts either way.",
  },
];

export default function Method() {
  return (
    <section className="relative border-t border-ink/15 bg-paper-3/40 py-14 lg:py-20">
      <div className="wrap">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mono-label text-flame">The method</span>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.8rem)] leading-[0.95]">
              Discover → Define → Deliver → Measure
            </h2>
          </div>
          <p className="max-w-[19rem] text-[13px] leading-relaxed text-ink-soft">
            Not a personality trait. A loop I&apos;ve run on chatbots, voice agents, onboarding flows
            and one concept that never shipped.
          </p>
        </div>

        <ol className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Rise key={s.n} as="li" delay={i * 0.06} y={14} className="group relative h-full px-1 py-5 sm:px-5">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] tracking-[0.2em] text-ink-soft">{s.n}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-ink/15 transition-colors group-hover:bg-flame" />
              </div>
              <h3 className="mt-2 font-display text-xl">{s.name}</h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">{s.text}</p>
            </Rise>
          ))}
        </ol>
      </div>
    </section>
  );
}
