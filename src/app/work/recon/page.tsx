import type { Metadata } from "next";
import Link from "next/link";
import ReconConsole from "@/components/recon/ReconConsole";
import { buildRecon, inr, longDate, pct } from "@/lib/recon";

const { summary } = buildRecon();
const openPct = ((summary.openValue / summary.totalValue) * 100).toFixed(1);

export const metadata: Metadata = {
  title: "The 0.4% That Never Reconciles — Deepdev Vyas",
  description:
    "A working settlement reconciliation console: 12,600 orders, eight break types, 95 decisions. Product, design and build by Deepdev Vyas.",
  openGraph: {
    title: "The 0.4% That Never Reconciles",
    description:
      "A settlement reconciliation console built from scratch — matching engine, break taxonomy, owner routing.",
    type: "article",
  },
};

const META = [
  ["Role", "Product, design, build"],
  ["Scope", "9 days, solo"],
  ["Window", `${longDate(summary.windowStart)} → ${longDate(summary.windowEnd)}`],
  ["Data", "Synthetic, seeded"],
];

const STEPS = [
  {
    kicker: "Problem",
    title: "The spreadsheet was the product.",
    body: `A payment aggregator settles T+1. Before a merchant gets paid, someone has to prove the bank’s file equals our ledger. At ${summary.orders.toLocaleString(
      "en-IN",
    )} orders a month, that proof is a spreadsheet and one very tired analyst — and month-end close waits for it.`,
  },
  {
    kicker: "Discovery",
    title: "Build the dataset before the UI.",
    body: `I modelled ${summary.orders.toLocaleString(
      "en-IN",
    )} captures across eight merchants and four channels, using the fee treatment India actually runs: zero MDR on UPI, 1.95% + 18% GST on cards, a flat ₹12 on netbanking, T+1 batching per merchant. Then I injected the eight ways a settlement file actually breaks.`,
  },
  {
    kicker: "Insight",
    title: "Noise is loud. Money is quiet.",
    body: `Timing and rounding are two-thirds of the break rows and almost none of the value. Two codes — never presented, and landed without a ledger — hold the majority of the exposure. That inversion is the whole product decision: triage by rupees, not by row count.`,
  },
  {
    kicker: "Define",
    title: "A queue with owners, not a dashboard.",
    body: `North star: value reconciled without a human touch. Three rules. A closed vocabulary of reason codes, because routing and trend analysis both need one. Every break gets an owner and a next action. And tolerance is a written policy — ₹1 write-off, T+2 timing window — not a silent bug.`,
  },
  {
    kicker: "Deliver",
    title: "Three passes and a policy.",
    body: `Pass one matches exact. Pass two absorbs tolerance and fee differences. Pass three catches orphans, duplicates, unadjusted refunds and chargebacks. Everything is classified deterministically, so any row can be explained to a finance auditor without a model.`,
  },
  {
    kicker: "Measure",
    title: `${summary.exceptions} decisions, not ${summary.rows.toLocaleString("en-IN")} rows.`,
    body: `The console takes ${summary.rows.toLocaleString(
      "en-IN",
    )} lines down to ${summary.exceptions} decisions, with ${inr(
      summary.openValue,
    )} of exposure (${openPct}% of value) sitting behind them. ${pct(
      summary.autoMatchRowsPct,
    )} of lines never need a human. The number that matters is not the ${inr(
      summary.openValue,
    )} — it’s that most of the queue is over a week old.`,
  },
];

const TRADEOFFS = [
  {
    decision: "Rules, not a model",
    alternative: "Anomaly detection",
    why: "95 breaks a month does not train a model. Rules are explainable to a finance auditor, and the auditor is the real customer.",
  },
  {
    decision: "₹1 tolerance",
    alternative: "Zero tolerance",
    why: "Chasing paise costs more than the paise. The tolerance is a signed-off write-off policy, not a silent rounding bug.",
  },
  {
    decision: "T+2 timing window",
    alternative: "Flag every late batch",
    why: "Banks genuinely slip a batch. A T+0 queue is 90% noise, and a queue that is 90% noise teaches ops to ignore it.",
  },
  {
    decision: "No auto-journaling",
    alternative: "Auto-correct the ledger",
    why: "Finance needs a human signature on a journal. The console recommends; it does not post.",
  },
  {
    decision: "Closed reason codes",
    alternative: "Free-text notes",
    why: "Routing, SLA and trend analysis all need a vocabulary. Free text gives you none of the three.",
  },
];

const PASSES = [
  {
    n: "01",
    title: "Exact",
    body: `Same order, same type, same net to the paise. ${summary.exact.toLocaleString(
      "en-IN",
    )} of ${summary.rows.toLocaleString("en-IN")} lines close here.`,
  },
  {
    n: "02",
    title: "Tolerance",
    body: "Same order, difference ≤ ₹1 → rounding. Gross equal but fee differs → MDR mismatch. Both are policy decisions, not guesses.",
  },
  {
    n: "03",
    title: "Orphan",
    body: "One side only. Never presented, landed without a ledger, duplicated in the file, refund not netted, or a chargeback debit.",
  },
];

export default function ReconCasePage() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-ink/12 bg-paper/90 backdrop-blur-md">
        <div className="wrap flex h-16 items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-3">
            <span className="relative grid h-9 w-9 place-items-center rounded-xl border-[1.5px] border-ink bg-ink font-mono text-[11px] font-bold tracking-widest text-paper">
              DV
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-flame" />
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-[15px] font-semibold tracking-tight">Deepdev Vyas</span>
              <span className="mono-label block text-[9px] text-ink-soft">Product Manager · Fintech</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="mono-label hidden text-[9px] text-ink-soft sm:inline">Case 01 / 05</span>
            <Link href="/#work" className="btn-ghost">
              ← All work
            </Link>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="wrap pt-10 pb-8 lg:pt-14">
          <div className="mono-label text-flame">Payments infrastructure · Settlement ops</div>
          <h1 className="mt-3 max-w-5xl font-display text-[clamp(2.6rem,7vw,5.4rem)] leading-[0.9]">
            The 0.4% That
            <br />
            <span className="accent text-ink-soft">Never Reconciles.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            Every payments company has a number it cannot explain. Here it is a working console: matching
            engine, break taxonomy, owner routing, and a queue that sorts by rupees instead of rows.
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ink/15 pt-5 sm:grid-cols-4">
            {META.map(([k, v]) => (
              <div key={k}>
                <dt className="mono-label text-[8.5px] text-ink-soft">{k}</dt>
                <dd className="mt-1 text-[12.5px] leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="wrap pb-6">
          <ReconConsole />
          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft">
            <span>↑ Live, not a screenshot</span>
            <span className="text-ink/25">/</span>
            <span>Filter, open a break, export the queue</span>
            <span className="text-ink/25">/</span>
            <span>“New month” reseeds the engine</span>
          </p>
        </section>

        <section className="border-t border-ink/15 py-14 lg:py-20">
          <div className="wrap grid gap-10 lg:grid-cols-[0.85fr_1.6fr]">
            <div className="self-start lg:sticky lg:top-24">
              <span className="mono-label text-flame">The case study</span>
              <h2 className="mt-3 max-w-sm font-display text-[clamp(2rem,4vw,3.2rem)] leading-[0.94]">
                What I learned
                <br />
                <span className="accent text-ink-soft">before I built the dashboard.</span>
              </h2>
              <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-ink-soft">
                Fintech PM work is mostly deciding what not to automate. This one is about which ₹1.4L deserves a
                human — and which ₹40 does not.
              </p>
            </div>

            <div className="space-y-8">
              {STEPS.map((s, i) => (
                <article key={s.kicker} className="grid grid-cols-[2.2rem_1fr] gap-4">
                  <div className="pt-0.5">
                    <span className="grid h-7 w-7 place-items-center rounded-full border border-ink/25 font-mono text-[10px] text-ink-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <div className="mono-label text-[8.5px] text-flame">{s.kicker}</div>
                    <h3 className="mt-1.5 font-display text-[clamp(1.25rem,2vw,1.6rem)] leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-ink-soft">{s.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-ink/15 py-14">
          <div className="wrap">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="mono-label text-flame">Trade-offs</span>
                <h2 className="mt-2 max-w-2xl font-display text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[0.95]">
                  Five decisions I would defend in an interview.
                </h2>
              </div>
              <p className="max-w-xs text-[12.5px] leading-relaxed text-ink-soft">
                Each one has a cheaper alternative that fails for a reason worth saying out loud.
              </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-ink/20">
              <div className="hidden grid-cols-[1.1fr_1fr_2fr] gap-4 border-b border-ink/15 bg-paper-2/50 px-4 py-2 sm:grid">
                {["Decision", "The alternative", "Why not"].map((h) => (
                  <span key={h} className="mono-label text-[8px] text-ink-soft">
                    {h}
                  </span>
                ))}
              </div>
              {TRADEOFFS.map((t) => (
                <div
                  key={t.decision}
                  className="grid gap-1.5 border-b border-ink/10 px-4 py-3.5 last:border-b-0 sm:grid-cols-[1.1fr_1fr_2fr] sm:gap-4"
                >
                  <span className="font-display text-[15px] leading-tight">{t.decision}</span>
                  <span className="font-mono text-[10px] text-ink-soft">{t.alternative}</span>
                  <span className="text-[12.5px] leading-relaxed text-ink-soft">{t.why}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-ink/15 py-14">
          <div className="wrap grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <span className="mono-label text-flame">Mechanics</span>
              <h2 className="mt-2 font-display text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[0.95]">
                How the engine decides.
              </h2>
              <p className="mt-3 max-w-md text-[13px] leading-relaxed text-ink-soft">
                Three passes, then a policy layer. No model, no threshold tuning, no unexplainable row. The
                classification is the product.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {PASSES.map((p) => (
                <div key={p.n} className="paper-card p-4" style={{ boxShadow: "0 4px 0 0 #C08A2E" }}>
                  <div className="flex items-baseline justify-between">
                    <span className="mono-label text-[8.5px] text-ink-soft">Pass {p.n}</span>
                    <span className="font-display text-2xl leading-none text-ink/15">{p.n}</span>
                  </div>
                  <h3 className="mt-2 font-display text-lg leading-tight">{p.title}</h3>
                  <p className="mt-2 text-[11.5px] leading-relaxed text-ink-soft">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-ink/15 py-14">
          <div className="wrap">
            <span className="mono-label text-flame">Honesty box</span>
            <h2 className="mt-2 font-display text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[0.95]">
              What is real, what is modelled, what is missing.
            </h2>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {[
                {
                  tone: "#2C6A5D",
                  title: "Real",
                  items: [
                    "The matching logic and tolerance rules",
                    "Fee treatment: UPI zero MDR, 18% GST on MDR",
                    "T+1 merchant batch timing and UTR-level files",
                    "The reason taxonomy and owner routing",
                  ],
                },
                {
                  tone: "#C08A2E",
                  title: "Modelled",
                  items: [
                    "Merchants, volumes and rupee values",
                    "The month itself — seeded and reproducible",
                    "Break frequency, tuned to a plausible mid-market book",
                  ],
                },
                {
                  tone: "#C94C24",
                  title: "Not built",
                  items: [
                    "Auth, roles and persistence",
                    "Bank SFTP / API ingestion and schema handling",
                    "Journal posting into a general ledger",
                    "Split settlements across multiple UTRs",
                  ],
                },
              ].map((box) => (
                <div
                  key={box.title}
                  className="paper-card p-4"
                  style={{ boxShadow: `0 4px 0 0 ${box.tone}` }}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: box.tone }} />
                    <h3 className="font-display text-lg leading-none">{box.title}</h3>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {box.items.map((item) => (
                      <li key={item} className="flex gap-2 text-[11.5px] leading-relaxed text-ink-soft">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink/30" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-ink/15 py-14">
          <div className="wrap grid gap-8 lg:grid-cols-2">
            <div>
              <span className="mono-label text-flame">What I’d do differently</span>
              <p className="accent mt-3 max-w-lg text-[clamp(1.3rem,2.4vw,1.9rem)] leading-tight">
                My first queue sorted by row count, which made 130 harmless timing breaks the headline and buried
                the ₹56,000 that never arrived. Sort by rupees on day one.
              </p>
              <p className="mt-4 max-w-lg text-[13px] leading-relaxed text-ink-soft">
                I would also add bank-file schema drift detection before anything else. In production the first
                failure is never a bad match — it is a new column, a renamed header, or a file that arrives
                gzipped when it used to be CSV. The matcher will happily reconcile garbage if you let it.
              </p>
            </div>

            <div>
              <span className="mono-label text-flame">What I’d validate next</span>
              <ul className="mt-3 space-y-3">
                {[
                  "Five ops interviews: does the reason vocabulary match how they actually talk about breaks?",
                  "Tolerance policy signed off by finance — ₹1 is a guess until someone owns the write-off.",
                  "UTR-level matching for split settlements, which is where this model would first bend.",
                  "A 30-day shadow run against a real file before anyone trusts the auto-close.",
                ].map((item, i) => (
                  <li key={item} className="flex gap-3 border-b border-ink/10 pb-3 last:border-b-0">
                    <span className="mono-label pt-0.5 text-[9px] text-ink-soft">0{i + 1}</span>
                    <span className="text-[12.5px] leading-relaxed text-ink-soft">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t border-ink/15 py-12">
          <div className="wrap flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="mono-label text-ink-soft">Next in the set</div>
              <p className="mt-1 font-display text-[clamp(1.4rem,3vw,2rem)] leading-tight">
                Cash to Close — lending, in progress.
              </p>
            </div>
            <Link href="/#work" className="btn-hard">
              Back to all work
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink/15 py-6">
        <div className="wrap flex flex-wrap items-center justify-between gap-3">
          <span className="mono-label text-[8.5px] text-ink-soft">
            Deepdev Vyas · Product Manager, fintech &amp; AI
          </span>
          <span className="mono-label text-[8.5px] text-ink-soft">
            As of {longDate(summary.asOf)}
          </span>
        </div>
      </footer>
    </>
  );
}
