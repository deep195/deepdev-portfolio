"use client";

import { useMemo, useState } from "react";
import {
  buildRecon,
  inr,
  inrExact,
  longDate,
  pct,
  REASONS,
  shortDate,
  type ReasonCode,
  type ReconRow,
} from "@/lib/recon";
import { SEED } from "@/lib/recon/data";

const PAGE_SIZE = 10;

const TONE: Record<string, string> = {
  teal: "#2C6A5D",
  ochre: "#C08A2E",
  flame: "#C94C24",
};

function statusLabel(row: ReconRow) {
  if (row.status === "exception") return "Needs action";
  if (row.status === "watch") return "Watch";
  return "Matched";
}

function statusTone(row: ReconRow) {
  if (row.status === "exception") return "#C94C24";
  if (row.status === "watch") return "#C08A2E";
  return "#2C6A5D";
}

function kindLabel(kind: ReconRow["kind"]) {
  if (kind === "refund") return "Refund";
  if (kind === "chargeback") return "Chargeback";
  return "Payment";
}

function Kpi({
  label,
  value,
  note,
  accent,
}: {
  label: string;
  value: string;
  note: string;
  accent?: string;
}) {
  return (
    <div className="border-b border-ink/15 px-4 py-3 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <div className="mono-label text-[8.5px] text-ink-soft">{label}</div>
      <div
        className="mt-1.5 font-display text-[clamp(1.4rem,2.4vw,1.9rem)] leading-none"
        style={accent ? { color: accent } : undefined}
      >
        {value}
      </div>
      <div className="mt-1.5 text-[10.5px] leading-snug text-ink-soft">{note}</div>
    </div>
  );
}

function Dot({ color }: { color: string }) {
  return <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />;
}

function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  const width = max > 0 ? Math.max(2, (value / max) * 100) : 0;
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
      <div className="h-full rounded-full" style={{ width: `${width}%`, background: color }} />
    </div>
  );
}

export default function ReconConsole() {
  const [seed, setSeed] = useState(SEED);
  const { rows, summary } = useMemo(() => buildRecon(seed), [seed]);

  const [view, setView] = useState<"action" | "watch" | "all">("action");
  const [reason, setReason] = useState<ReasonCode | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (view === "action" && r.status !== "exception") return false;
      if (view === "watch" && r.status !== "watch") return false;
      if (reason !== "all" && r.reason !== reason) return false;
      if (!q) return true;
      return (
        r.orderId.toLowerCase().includes(q) ||
        (r.merchant?.name.toLowerCase().includes(q) ?? false) ||
        (r.settlement?.utr.toLowerCase().includes(q) ?? false)
      );
    });
  }, [rows, view, reason, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);
  const active = filtered.find((r) => r.key === selected) ?? filtered[0];

  const maxAge = rows.reduce((m, r) => (r.status === "exception" ? Math.max(m, r.ageDays) : m), 0);
  const maxReasonValue = summary.byReason[0]?.value ?? 1;
  const maxDaily = summary.daily.reduce((m, d) => Math.max(m, d.count), 0);
  const maxAgeing = summary.ageing.reduce((m, a) => Math.max(m, a.count), 0);

  function changeView(next: typeof view) {
    setView(next);
    setPage(0);
    setSelected(null);
  }

  function changeReason(next: ReasonCode | "all") {
    setReason(next);
    setPage(0);
    setSelected(null);
  }

  function exportCsv() {
    const head = [
      "order_id",
      "merchant",
      "kind",
      "reason",
      "status",
      "ledger_net",
      "settlement_net",
      "delta",
      "age_days",
      "owner",
    ];
    const lines = filtered.map((r) =>
      [
        r.orderId,
        r.merchant?.name ?? "",
        r.kind,
        r.reason,
        r.status,
        r.ledger ? r.ledger.net / 100 : "",
        r.settlement ? r.settlement.net / 100 : "",
        r.delta / 100,
        r.ageDays,
        REASONS[r.reason].owner,
      ]
        .map((v) => `"${String(v).replaceAll('"', '""')}"`)
        .join(","),
    );
    const blob = new Blob([[head.join(","), ...lines].join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `recon-breaks-${seed}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="paper-card overflow-hidden" style={{ boxShadow: "0 5px 0 0 #2C6A5D" }}>
      {/* console bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-ink px-4 py-2.5 text-paper">
        <div className="flex items-center gap-2.5">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-teal text-[9px] font-bold">R</span>
          <span className="mono-label text-[9px] text-paper/90">Recon / settlement ops</span>
          <span className="hidden rounded-full border border-paper/25 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-paper/60 sm:inline">
            synthetic · seeded
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden font-mono text-[8px] text-paper/35 sm:inline">seed {seed}</span>
          <span className="font-mono text-[9px] text-paper/55">
            {shortDate(summary.windowStart)} – {shortDate(summary.windowEnd)}
          </span>
          <button
            onClick={() => {
              setSeed((s) => s + 1);
              setPage(0);
              setSelected(null);
            }}
            className="rounded-full border border-paper/25 px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.12em] text-paper/80 transition-colors hover:border-paper/60 hover:text-paper"
          >
            ↻ New month
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4">
        <Kpi
          label="Auto-matched"
          value={pct(summary.autoMatchRowsPct)}
          note={`${summary.exact + summary.watch} of ${summary.rows.toLocaleString("en-IN")} lines, no human touch`}
          accent="#2C6A5D"
        />
        <Kpi
          label="Open value"
          value={inr(summary.openValue)}
          note={`${((summary.openValue / summary.totalValue) * 100).toFixed(1)}% of ${inr(
            summary.totalValue,
          )} settled`}
          accent="#C94C24"
        />
        <Kpi
          label="Breaks to work"
          value={String(summary.exceptions)}
          note={`across ${summary.byReason.length} reason codes`}
        />
        <Kpi
          label="Oldest break"
          value={`${maxAge}d`}
          note="sitting across month-end close"
          accent="#C08A2E"
        />
      </div>

      {/* toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-y border-ink/15 bg-paper-2/40 px-4 py-2.5">
        <div className="flex rounded-full border border-ink/20 p-0.5">
          {(
            [
              ["action", "Needs action"],
              ["watch", "Watch"],
              ["all", "All"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => changeView(id)}
              aria-pressed={view === id}
              className={`rounded-full px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.1em] transition-colors ${
                view === id ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <select
          value={reason}
          onChange={(e) => changeReason(e.target.value as ReasonCode | "all")}
          className="rounded-full border border-ink/20 bg-transparent px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.1em] text-ink-soft outline-none"
        >
          <option value="all">All reasons</option>
          {summary.byReason.map((r) => (
            <option key={r.reason} value={r.reason}>
              {REASONS[r.reason].label} ({r.count})
            </option>
          ))}
        </select>

        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(0);
            setSelected(null);
          }}
          placeholder="Order, merchant, UTR…"
          className="min-w-0 flex-1 rounded-full border border-ink/20 bg-paper px-3 py-1 font-mono text-[10px] text-ink placeholder:text-ink-soft/60 focus:border-ink/50 focus:outline-none sm:max-w-[13rem]"
        />

        <button
          onClick={exportCsv}
          className="rounded-full border border-ink/25 px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.1em] text-ink-soft transition-colors hover:border-ink hover:text-ink"
        >
          ↓ Export {filtered.length}
        </button>
      </div>

      {/* table + detail */}
      <div className="grid lg:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0 border-b border-ink/15 lg:border-b-0 lg:border-r">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-ink/15 bg-paper-2/30">
                  {["Order / merchant", "Reason", "Ledger", "Bank", "Δ", "Age"].map((h, i) => (
                    <th
                      key={h}
                      className={`mono-label px-3 py-2 text-[8px] font-medium text-ink-soft ${
                        i >= 2 && i <= 4 ? "text-right" : ""
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map((r) => {
                  const isActive = active?.key === r.key;
                  return (
                    <tr
                      key={r.key}
                      onClick={() => setSelected(r.key)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelected(r.key);
                        }
                      }}
                      tabIndex={0}
                      className={`cursor-pointer border-b border-ink/10 transition-colors last:border-b-0 ${
                        isActive ? "bg-teal/[0.09]" : "hover:bg-ink/[0.03]"
                      }`}
                    >
                      <td className="px-3 py-2.5">
                        <div className="font-mono text-[10.5px] leading-tight text-ink">{r.orderId}</div>
                        <div className="mt-0.5 truncate text-[10px] text-ink-soft">
                          {r.merchant?.name ?? "Unknown"} · {kindLabel(r.kind)}
                        </div>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="flex items-center gap-1.5">
                          <Dot color={TONE[REASONS[r.reason].tone]} />
                          <span className="text-[10.5px] leading-tight">{REASONS[r.reason].short}</span>
                        </span>
                        {r.duplicateCount > 1 && (
                          <span className="mono-label mt-0.5 block text-[7.5px] text-ink-soft">
                            {r.duplicateCount} lines in file
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-[10.5px]">
                        {r.ledger ? inr(r.ledger.net) : <span className="text-ink-soft/50">—</span>}
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-[10.5px]">
                        {r.settlement ? inr(r.settlement.net) : <span className="text-ink-soft/50">—</span>}
                      </td>
                      <td
                        className="px-3 py-2.5 text-right font-mono text-[10.5px] font-medium"
                        style={{ color: r.status === "matched" ? "#2C6A5D" : TONE[REASONS[r.reason].tone] }}
                      >
                        {r.delta === 0 ? "0" : inr(Math.abs(r.delta))}
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-[10.5px] text-ink-soft">{r.ageDays}d</td>
                    </tr>
                  );
                })}
                {visible.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-[12px] text-ink-soft">
                      Nothing in this filter. Try “All”.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-ink/15 px-3 py-2">
            <span className="font-mono text-[9px] text-ink-soft" aria-live="polite">
              {filtered.length.toLocaleString("en-IN")} rows · page {safePage + 1}/{pageCount}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={safePage === 0}
                className="rounded-full border border-ink/20 px-2 py-0.5 font-mono text-[9px] text-ink-soft disabled:opacity-30"
              >
                ←
              </button>
              <button
                onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                disabled={safePage >= pageCount - 1}
                className="rounded-full border border-ink/20 px-2 py-0.5 font-mono text-[9px] text-ink-soft disabled:opacity-30"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* detail */}
        <div className="min-w-0 bg-paper-2/25 p-4">
          {active ? (
            <div className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="mono-label text-[8px] text-ink-soft">Break detail</div>
                  <div className="mt-1 font-mono text-[12.5px] font-medium leading-tight">{active.orderId}</div>
                  <div className="mt-1 text-[10.5px] text-ink-soft">
                    {active.merchant?.name ?? "Unknown"} · {kindLabel(active.kind)}
                  </div>
                </div>
                <span
                  className="shrink-0 rounded-full px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-paper"
                  style={{ background: statusTone(active) }}
                >
                  {statusLabel(active)}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-ink/15 bg-paper p-2.5">
                  <div className="mono-label text-[7.5px] text-ink-soft">Our ledger</div>
                  {active.ledger ? (
                    <>
                      <div className="mt-1 font-mono text-[13px] font-medium">{inr(active.ledger.net)}</div>
                      <div className="mt-1 space-y-0.5 font-mono text-[9px] text-ink-soft">
                        <div>gross {inrExact(active.ledger.gross)}</div>
                        <div>fee {inrExact(active.ledger.fee)}</div>
                        <div>{shortDate(active.ledger.at)}</div>
                      </div>
                    </>
                  ) : (
                    <div className="mt-3 font-mono text-[10px] text-ink-soft/60">no line</div>
                  )}
                </div>
                <div className="rounded-xl border border-ink/15 bg-paper p-2.5">
                  <div className="mono-label text-[7.5px] text-ink-soft">Bank file</div>
                  {active.settlement ? (
                    <>
                      <div className="mt-1 font-mono text-[13px] font-medium">{inr(active.settlement.net)}</div>
                      <div className="mt-1 space-y-0.5 font-mono text-[9px] text-ink-soft">
                        <div>gross {inrExact(active.settlement.gross)}</div>
                        <div>fee {inrExact(active.settlement.fee)}</div>
                        <div>{shortDate(active.settlement.at)}</div>
                      </div>
                    </>
                  ) : (
                    <div className="mt-3 font-mono text-[10px] text-ink-soft/60">no line</div>
                  )}
                </div>
              </div>

              <div className="mt-2 flex items-baseline justify-between rounded-xl border border-ink/15 bg-paper px-2.5 py-2">
                <span className="mono-label text-[7.5px] text-ink-soft">Δ exposure</span>
                <span
                  className="font-display text-lg leading-none"
                  style={{ color: active.status === "matched" ? "#2C6A5D" : "#C94C24" }}
                >
                  {active.delta === 0 ? "₹0" : inrExact(Math.abs(active.delta))}
                </span>
              </div>

              <div className="mt-3">
                <div className="mono-label text-[8px] text-ink-soft">Why</div>
                <p className="mt-1 text-[10.5px] leading-relaxed text-ink">{REASONS[active.reason].why}</p>
              </div>
              <div className="mt-2.5">
                <div className="mono-label text-[8px] text-ink-soft">Next</div>
                <p className="mt-1 text-[10.5px] leading-relaxed text-ink-soft">{REASONS[active.reason].action}</p>
              </div>

              <div className="mt-auto pt-3">
                <div className="dashed-ink mb-2" />
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded-full border border-ink/25 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em]">
                    owner · {REASONS[active.reason].owner}
                  </span>
                  <span className="rounded-full border border-ink/25 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-ink-soft">
                    {active.ageDays}d old
                  </span>
                </div>
                <div className="mt-2 space-y-0.5 font-mono text-[8.5px] text-ink-soft/80">
                  <div>ledger {active.ledger?.ref ?? "—"}</div>
                  <div>utr {active.settlement?.utr ?? "—"}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid h-full place-items-center py-10 text-center text-[11px] text-ink-soft">
              Pick a row to see both sides of the break.
            </div>
          )}
        </div>
      </div>

      {/* analysis footer */}
      <div className="border-t border-ink/15 bg-paper-2/20 px-4 py-4">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <div className="flex items-baseline justify-between">
              <span className="mono-label text-[8.5px] text-ink-soft">Where the money is stuck</span>
              <span className="font-mono text-[9px] text-ink-soft">{inr(summary.openValue)}</span>
            </div>
            <div className="mt-2.5 space-y-2">
              {summary.byReason.map((r) => (
                <div key={r.reason} className="grid grid-cols-[6.5rem_1fr_4.4rem] items-center gap-2">
                  <span className="truncate text-[10px]">{REASONS[r.reason].label}</span>
                  <MiniBar value={r.value} max={maxReasonValue} color={TONE[REASONS[r.reason].tone]} />
                  <span className="text-right font-mono text-[9px] text-ink-soft">
                    {r.count} · {inr(r.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <span className="mono-label text-[8.5px] text-ink-soft">Ageing (open breaks)</span>
              <span className="font-mono text-[9px] text-ink-soft">{longDate(summary.asOf)}</span>
            </div>
            <div className="mt-2.5 space-y-2">
              {summary.ageing.map((a, i) => (
                <div key={a.label} className="grid grid-cols-[4.6rem_1fr_4.4rem] items-center gap-2">
                  <span className="text-[10px] text-ink-soft">{a.label}</span>
                  <MiniBar value={a.count} max={maxAgeing} color={i > 1 ? "#C94C24" : "#C08A2E"} />
                  <span className="text-right font-mono text-[9px] text-ink-soft">
                    {a.count} · {inr(a.value)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <div className="flex items-baseline justify-between">
                <span className="mono-label text-[8.5px] text-ink-soft">Breaks raised per day</span>
                <span className="font-mono text-[9px] text-ink-soft">peak {maxDaily}</span>
              </div>
              <div className="mt-2 flex h-9 items-end gap-[3px]">
                {summary.daily.map((d) => (
                  <div
                    key={d.day}
                    title={`${shortDate(d.at)} · ${d.count} breaks · ${inr(d.value)}`}
                    className="flex-1 rounded-t-[2px]"
                    style={{
                      height: `${Math.max(6, (d.count / Math.max(1, maxDaily)) * 100)}%`,
                      background: d.count === 0 ? "rgb(23 21 15 / 0.08)" : "#C08A2E",
                    }}
                  />
                ))}
              </div>
              <div className="mt-1 flex justify-between font-mono text-[8px] text-ink-soft/70">
                <span>{shortDate(summary.windowStart)}</span>
                <span>{shortDate(summary.windowEnd - 86_400_000)}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 border-t border-ink/10 pt-2 text-[9px] leading-relaxed text-ink-soft/70">
          Synthetic data, seeded and reproducible. UPI is priced at zero MDR, card and wallet at MDR + 18% GST,
          netbanking at a flat fee. Settlement is assumed T+1 per merchant batch. No client data is used.
        </p>
      </div>
    </div>
  );
}
