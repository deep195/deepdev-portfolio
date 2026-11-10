import {
  DAY_MS,
  type Kind,
  type LedgerLine,
  type Merchant,
  type SettlementLine,
} from "./data";

export type Status = "matched" | "watch" | "exception";

export type ReasonCode =
  | "matched"
  | "timing"
  | "rounding"
  | "fee_mismatch"
  | "amount_mismatch"
  | "missing_in_settlement"
  | "missing_in_ledger"
  | "duplicate"
  | "refund_unadjusted"
  | "chargeback";

export type Owner = "Ops" | "Bank" | "Finance" | "Risk" | "Product";

export type ReasonMeta = {
  code: ReasonCode;
  label: string;
  short: string;
  owner: Owner;
  why: string;
  action: string;
  tone: "teal" | "ochre" | "flame";
};

export const REASONS: Record<ReasonCode, ReasonMeta> = {
  matched: {
    code: "matched",
    label: "Matched",
    short: "Clean",
    owner: "Ops",
    why: "Ledger and bank file agree to the paise.",
    action: "Nothing. This is the bar the rest of the queue is measured against.",
    tone: "teal",
  },
  timing: {
    code: "timing",
    label: "Settled late",
    short: "Timing",
    owner: "Bank",
    why: "Presented in a later batch than the T+2 window. The value is right, the date is not.",
    action: "No action. Auto-close after T+4 unless the same merchant slips three batches running.",
    tone: "ochre",
  },
  rounding: {
    code: "rounding",
    label: "Paise rounding",
    short: "Rounding",
    owner: "Ops",
    why: "Difference is ₹1 or less, from paise rounding on split fees and offer adjustments.",
    action: "Auto-adjust and write off below the ₹1 tolerance. Chasing paise costs more than the paise.",
    tone: "ochre",
  },
  fee_mismatch: {
    code: "fee_mismatch",
    label: "MDR mismatch",
    short: "Fees",
    owner: "Finance",
    why: "Gross matches, fee does not. Usually 18% GST dropped from the MDR, or a rate that slipped on one channel.",
    action: "Check the contracted rate card and GST treatment for this channel, then re-price the batch.",
    tone: "flame",
  },
  amount_mismatch: {
    code: "amount_mismatch",
    label: "Amount mismatch",
    short: "Amount",
    owner: "Ops",
    why: "Gross differs on both sides. Partial capture, or an offer applied at the wrong layer.",
    action: "Pull the payment and the offer ledger, then correct the side that is wrong.",
    tone: "flame",
  },
  missing_in_settlement: {
    code: "missing_in_settlement",
    label: "Not in bank file",
    short: "Missing",
    owner: "Bank",
    why: "Captured in our ledger, absent from the settlement file. This is real money the merchant has not been paid.",
    action: "Raise with the bank or PA. Check whether it is held for risk, or lost between capture and presentment.",
    tone: "flame",
  },
  missing_in_ledger: {
    code: "missing_in_ledger",
    label: "Not in our ledger",
    short: "Orphan",
    owner: "Product",
    why: "Money landed for an order we have no record of. Usually a late capture, or an orphan from a failed webhook.",
    action: "Trace by UTR, find the original capture, then decide whether to backfill or return the funds.",
    tone: "flame",
  },
  duplicate: {
    code: "duplicate",
    label: "Duplicate presentment",
    short: "Duplicate",
    owner: "Bank",
    why: "Same order presented twice in the bank file. If it settles, the merchant is paid twice.",
    action: "Reverse the duplicate with the bank before the next merchant payout run.",
    tone: "flame",
  },
  refund_unadjusted: {
    code: "refund_unadjusted",
    label: "Refund not netted",
    short: "Refund",
    owner: "Ops",
    why: "Refund posted in our ledger with no corresponding debit in the settlement file.",
    action: "Confirm the refund reached the customer, then recover it from the next settlement batch.",
    tone: "flame",
  },
  chargeback: {
    code: "chargeback",
    label: "Chargeback debit",
    short: "Chargeback",
    owner: "Risk",
    why: "Dispute debit in the bank file with no matching ledger entry. The money has already left.",
    action: "Open a dispute case, map it to the original capture, and check whether the evidence pack was filed in time.",
    tone: "flame",
  },
};

export type ReconRow = {
  key: string;
  orderId: string;
  merchantId: string;
  merchant: Merchant | undefined;
  kind: Kind;
  ledger?: LedgerLine;
  settlement?: SettlementLine;
  /** ledger net − settlement net, in paise. */
  delta: number;
  /** Rupee exposure of this row. For clean rows, the value that reconciled. */
  value: number;
  status: Status;
  reason: ReasonCode;
  ageDays: number;
  dayIndex: number;
  duplicateCount: number;
};

export type AgeingBucket = { label: string; count: number; value: number };

export type ReasonSlice = { reason: ReasonCode; count: number; value: number };

export type DailyPoint = { day: number; at: number; count: number; value: number };

export type MerchantSlice = { id: string; name: string; count: number; value: number };

export type Summary = {
  orders: number;
  gmv: number;
  rows: number;
  exact: number;
  watch: number;
  exceptions: number;
  openValue: number;
  autoMatchRowsPct: number;
  autoMatchValuePct: number;
  matchedValue: number;
  totalValue: number;
  ageing: AgeingBucket[];
  byReason: ReasonSlice[];
  daily: DailyPoint[];
  topMerchants: MerchantSlice[];
  asOf: number;
  windowStart: number;
  windowEnd: number;
  seed: number;
};

const TIMING_WINDOW = 2 * DAY_MS;
const ROUNDING_TOLERANCE = 100; // ₹1 in paise

function ageOf(at: number, asOf: number) {
  return Math.max(0, Math.floor((asOf - at) / DAY_MS));
}

export function reconcile(
  ledger: LedgerLine[],
  settlement: SettlementLine[],
  merchants: Merchant[],
  asOf: number,
): ReconRow[] {
  const byId = new Map(merchants.map((m) => [m.id, m]));

  type Group = { ledger: LedgerLine[]; settlement: SettlementLine[] };
  const groups = new Map<string, Group>();

  const keyOf = (l: LedgerLine) => `${l.orderId}|${l.kind}`;

  for (const l of ledger) {
    const k = keyOf(l);
    const g = groups.get(k);
    if (g) g.ledger.push(l);
    else groups.set(k, { ledger: [l], settlement: [] });
  }

  for (const s of settlement) {
    const k = keyOf(s);
    const g = groups.get(k);
    if (g) g.settlement.push(s);
    else groups.set(k, { ledger: [], settlement: [s] });
  }

  const rows: ReconRow[] = [];

  for (const [key, g] of groups) {
    const l = g.ledger[0];
    const s = g.settlement[0];
    const source = l ?? s;
    if (!source) continue;

    const base = {
      key,
      orderId: source.orderId,
      merchantId: source.merchantId,
      merchant: byId.get(source.merchantId),
      kind: source.kind,
      ledger: l,
      settlement: s,
      ageDays: ageOf(l?.at ?? s!.at, asOf),
      dayIndex: source.dayIndex,
      duplicateCount: Math.max(1, g.settlement.length),
    };

    // Duplicate presentment: same order twice in the bank file.
    if (g.settlement.length > 1 && g.ledger.length >= 1) {
      const extra = g.settlement
        .slice(1)
        .reduce((acc, line) => acc + Math.abs(line.net), 0);
      rows.push({
        ...base,
        delta: -extra,
        value: extra,
        status: "exception",
        reason: "duplicate",
      });
      continue;
    }

    if (l && s) {
      const delta = l.net - s.net;
      const abs = Math.abs(delta);

      if (abs === 0) {
        const late = s.at - l.at > TIMING_WINDOW;
        rows.push({
          ...base,
          delta,
          value: Math.abs(l.net),
          status: late ? "watch" : "matched",
          reason: late ? "timing" : "matched",
        });
        continue;
      }

      if (abs <= ROUNDING_TOLERANCE) {
        rows.push({
          ...base,
          delta,
          value: abs,
          status: "watch",
          reason: "rounding",
        });
        continue;
      }

      rows.push({
        ...base,
        delta,
        value: abs,
        status: "exception",
        reason: l.gross === s.gross ? "fee_mismatch" : "amount_mismatch",
      });
      continue;
    }

    // Ledger only.
    if (l && !s) {
      if (l.kind === "refund") {
        rows.push({
          ...base,
          delta: l.net,
          value: Math.abs(l.net),
          status: "exception",
          reason: "refund_unadjusted",
        });
      } else if (l.kind === "chargeback") {
        rows.push({
          ...base,
          delta: l.net,
          value: Math.abs(l.net),
          status: "exception",
          reason: "chargeback",
        });
      } else {
        rows.push({
          ...base,
          delta: l.net,
          value: Math.abs(l.net),
          status: "exception",
          reason: "missing_in_settlement",
        });
      }
      continue;
    }

    // Bank file only.
    if (s && !l) {
      if (s.kind === "chargeback") {
        rows.push({
          ...base,
          delta: -s.net,
          value: Math.abs(s.net),
          status: "exception",
          reason: "chargeback",
        });
      } else {
        rows.push({
          ...base,
          delta: -s.net,
          value: Math.abs(s.net),
          status: "exception",
          reason: "missing_in_ledger",
        });
      }
    }
  }

  return rows.sort((a, b) => b.value - a.value || b.ageDays - a.ageDays);
}

function bucketAge(age: number) {
  if (age <= 1) return 0;
  if (age <= 3) return 1;
  if (age <= 7) return 2;
  return 3;
}

const AGE_LABELS = ["0–1 day", "2–3 days", "4–7 days", "8+ days"];

export function summarise(
  rows: ReconRow[],
  window: { start: number; end: number; asOf: number; seed: number },
): Summary {
  const exceptions = rows.filter((r) => r.status === "exception");
  const watch = rows.filter((r) => r.status === "watch");
  const exact = rows.filter((r) => r.reason === "matched");

  const totalValue = rows.reduce(
    (acc, r) => acc + Math.abs(r.ledger?.net ?? r.settlement?.net ?? 0),
    0,
  );
  const matchedValue = [...exact, ...watch].reduce(
    (acc, r) => acc + Math.abs(r.ledger?.net ?? r.settlement?.net ?? 0),
    0,
  );
  const openValue = exceptions.reduce((acc, r) => acc + r.value, 0);

  const ageing: AgeingBucket[] = AGE_LABELS.map((label) => ({ label, count: 0, value: 0 }));
  for (const r of exceptions) {
    const b = bucketAge(r.ageDays);
    ageing[b].count += 1;
    ageing[b].value += r.value;
  }

  const reasonMap = new Map<ReasonCode, ReasonSlice>();
  for (const r of exceptions) {
    const cur = reasonMap.get(r.reason) ?? { reason: r.reason, count: 0, value: 0 };
    cur.count += 1;
    cur.value += r.value;
    reasonMap.set(r.reason, cur);
  }

  const days = 30;
  const daily: DailyPoint[] = Array.from({ length: days }, (_, day) => ({
    day,
    at: window.start + day * DAY_MS,
    count: 0,
    value: 0,
  }));
  for (const r of exceptions) {
    const d = daily[r.dayIndex];
    if (!d) continue;
    d.count += 1;
    d.value += r.value;
  }

  const merchantMap = new Map<string, MerchantSlice>();
  for (const r of exceptions) {
    const m = r.merchant;
    if (!m) continue;
    const cur = merchantMap.get(m.id) ?? { id: m.id, name: m.name, count: 0, value: 0 };
    cur.count += 1;
    cur.value += r.value;
    merchantMap.set(m.id, cur);
  }

  const orders = rows.filter((r) => r.kind === "capture" && r.ledger).length;
  const gmv = rows.reduce(
    (acc, r) => (r.kind === "capture" && r.ledger && r.ledger.gross > 0 ? acc + r.ledger.gross : acc),
    0,
  );

  return {
    orders,
    gmv,
    rows: rows.length,
    exact: exact.length,
    watch: watch.length,
    exceptions: exceptions.length,
    openValue,
    autoMatchRowsPct: Number((((exact.length + watch.length) / rows.length) * 100).toFixed(1)),
    autoMatchValuePct: Number(((matchedValue / totalValue) * 100).toFixed(1)),
    matchedValue,
    totalValue,
    ageing,
    byReason: [...reasonMap.values()].sort((a, b) => b.value - a.value),
    daily,
    topMerchants: [...merchantMap.values()].sort((a, b) => b.value - a.value).slice(0, 5),
    asOf: window.asOf,
    windowStart: window.start,
    windowEnd: window.end,
    seed: window.seed,
  };
}
