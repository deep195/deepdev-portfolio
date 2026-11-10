import { generateReconData, SEED } from "./data";
import { reconcile, summarise } from "./engine";

export * from "./data";
export * from "./engine";

export function buildRecon(seed: number = SEED) {
  const data = generateReconData(seed);
  const rows = reconcile(data.ledger, data.settlement, data.merchants, data.asOf);
  const summary = summarise(rows, {
    start: data.windowStart,
    end: data.windowEnd,
    asOf: data.asOf,
    seed,
  });
  return { ...data, rows, summary };
}

/** Compact Indian money format: ₹1.2L, ₹3.4Cr, ₹8.4k. Input is paise. */
export function inr(paise: number, opts: { signed?: boolean } = {}) {
  const rupees = paise / 100;
  const abs = Math.abs(rupees);
  const sign = rupees < 0 ? "−" : opts.signed ? "+" : "";
  if (abs >= 1e7) return `${sign}₹${(abs / 1e7).toFixed(2)}Cr`;
  if (abs >= 1e5) return `${sign}₹${(abs / 1e5).toFixed(2)}L`;
  if (abs >= 1e3) return `${sign}₹${(abs / 1e3).toFixed(1)}k`;
  return `${sign}₹${abs.toFixed(0)}`;
}

/** Exact money with Indian digit grouping. Input is paise. */
export function inrExact(paise: number) {
  const rupees = paise / 100;
  const abs = Math.abs(rupees);
  const sign = rupees < 0 ? "−" : "";
  return `${sign}₹${abs.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function pct(value: number, digits = 1) {
  return `${value.toFixed(digits)}%`;
}

const DATE_FMT = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  timeZone: "UTC",
});

const DATE_LONG_FMT = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function shortDate(at: number) {
  return DATE_FMT.format(new Date(at));
}

export function longDate(at: number) {
  return DATE_LONG_FMT.format(new Date(at));
}
