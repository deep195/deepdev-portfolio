import { mulberry32 } from "./prng";

export const SEED = 20261031;
export const DAY_MS = 86_400_000;
export const HOUR_MS = 3_600_000;
export const MIN_MS = 60_000;

export const DAYS = 30;
export const ORDERS_PER_DAY = 420;

/** 1 Oct 2026 → 31 Oct 2026, reconciled as of 3 Nov 2026. */
export const WINDOW_START = Date.UTC(2026, 9, 1);
export const WINDOW_END = WINDOW_START + DAYS * DAY_MS;
export const AS_OF = Date.UTC(2026, 10, 1, 8);

export type Channel = "UPI" | "Card" | "Netbanking" | "Wallet";
export type Kind = "capture" | "refund" | "chargeback";

export type Merchant = {
  id: string;
  name: string;
  category: string;
  share: number;
  ticket: number;
};

/** Shares sum to 1. Ticket is the median order value in rupees. */
export const MERCHANTS: Merchant[] = [
  { id: "nimbus", name: "Nimbus Athletics", category: "Sportswear", share: 0.22, ticket: 2400 },
  { id: "kettle", name: "Kettle & Co.", category: "Home & kitchen", share: 0.18, ticket: 1800 },
  { id: "filter", name: "Filter Coffee Co.", category: "Food & beverage", share: 0.16, ticket: 650 },
  { id: "aster", name: "Aster Home", category: "Home decor", share: 0.14, ticket: 3200 },
  { id: "mango", name: "Mango Tree Organics", category: "Grocery", share: 0.12, ticket: 900 },
  { id: "paper", name: "Paper Boat Books", category: "Books", share: 0.08, ticket: 450 },
  { id: "lumen", name: "Lumen Electronics", category: "Electronics", share: 0.07, ticket: 14500 },
  { id: "nine", name: "Nine Yards Studio", category: "Design services", share: 0.03, ticket: 6500 },
];

type ChannelSpec = { id: Channel; weight: number; pct: number; flat: number };

/**
 * UPI carries zero MDR on P2M by regulation, so the fee is genuinely zero.
 * Card / wallet take a percentage; netbanking is a flat fee. GST at 18% sits on the fee.
 */
const CHANNELS: ChannelSpec[] = [
  { id: "UPI", weight: 0.64, pct: 0, flat: 0 },
  { id: "Card", weight: 0.23, pct: 0.0195, flat: 0 },
  { id: "Netbanking", weight: 0.08, pct: 0, flat: 1200 },
  { id: "Wallet", weight: 0.05, pct: 0.024, flat: 0 },
];

export type LedgerLine = {
  ref: string;
  orderId: string;
  merchantId: string;
  channel: Channel;
  kind: Kind;
  at: number;
  /** All amounts in paise, signed: refunds and chargebacks are negative. */
  gross: number;
  fee: number;
  net: number;
  dayIndex: number;
};

export type SettlementLine = LedgerLine & {
  id: string;
  utr: string;
};

export type ReconData = {
  ledger: LedgerLine[];
  settlement: SettlementLine[];
  merchants: Merchant[];
  windowStart: number;
  windowEnd: number;
  asOf: number;
  seed: number;
};

const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function token(rng: () => number, len: number) {
  let out = "";
  for (let i = 0; i < len; i++) out += ALPHABET[Math.floor(rng() * ALPHABET.length)];
  return out;
}

function pickMerchant(rng: () => number): Merchant {
  let r = rng();
  for (const m of MERCHANTS) {
    if (r <= m.share) return m;
    r -= m.share;
  }
  return MERCHANTS[MERCHANTS.length - 1];
}

function pickChannel(rng: () => number): ChannelSpec {
  let r = rng();
  for (const c of CHANNELS) {
    if (r <= c.weight) return c;
    r -= c.weight;
  }
  return CHANNELS[0];
}

function amountFor(m: Merchant, r: number) {
  const spread = Math.exp((r - 0.5) * 0.95);
  const rupees = Math.round((m.ticket * spread) / 10) * 10;
  return Math.min(120_000, Math.max(99, rupees)) * 100;
}

function feeFor(c: ChannelSpec, gross: number) {
  if (!c.pct && !c.flat) return 0;
  return Math.round((gross * c.pct + c.flat) * 1.18);
}

function dayCode(at: number) {
  const d = new Date(at);
  return `${String(d.getUTCDate()).padStart(2, "0")}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(
    d.getUTCFullYear(),
  ).slice(2)}`;
}

function nextBatch(at: number) {
  return Math.floor(at / DAY_MS) * DAY_MS + DAY_MS + 6.5 * HOUR_MS;
}

/** Pick `count` distinct indices in [0, max), skipping anything already used. */
function take(rng: () => number, max: number, count: number, used: Set<number>) {
  const out: number[] = [];
  let guard = 0;
  while (out.length < count && guard < count * 60) {
    guard++;
    const i = Math.floor(rng() * max);
    if (used.has(i)) continue;
    used.add(i);
    out.push(i);
  }
  return out;
}

export function generateReconData(seed: number = SEED): ReconData {
  const rng = mulberry32(seed);
  const ledger: LedgerLine[] = [];
  let settlement: SettlementLine[] = [];

  for (let d = 0; d < DAYS; d++) {
    for (let i = 0; i < ORDERS_PER_DAY; i++) {
      const merchant = pickMerchant(rng);
      const channel = pickChannel(rng);
      const gross = amountFor(merchant, rng());
      const fee = feeFor(channel, gross);
      const at =
        WINDOW_START +
        d * DAY_MS +
        (9 + Math.floor(Math.pow(rng(), 0.85) * 13)) * HOUR_MS +
        Math.floor(rng() * 60) * MIN_MS;

      const orderId = `ORD-${dayCode(at)}-${String(i + 1).padStart(4, "0")}`;
      const ref = `pay_${token(rng, 6)}${token(rng, 4)}`;

      const line: LedgerLine = {
        ref,
        orderId,
        merchantId: merchant.id,
        channel: channel.id,
        kind: "capture",
        at,
        gross,
        fee,
        net: gross - fee,
        dayIndex: d,
      };

      ledger.push(line);
      settlement.push({
        ...line,
        id: `stl_${String(settlement.length + 1).padStart(6, "0")}`,
        utr: `UTR${dayCode(at)}${String(Math.floor(rng() * 900) + 100)}${String(
          Math.floor(rng() * 900) + 100,
        )}`,
        at: nextBatch(at),
      });
    }
  }

  const used = new Set<number>();
  const base = ledger.length;

  /* ── 1. Late presentment: settled in a later batch than T+2 ───────── */
  for (const i of take(rng, base, 130, used)) {
    settlement[i].at += (2 + Math.floor(rng() * 3)) * DAY_MS;
  }

  /* ── 2. Paise rounding on split fees ──────────────────────────────── */
  for (const i of take(rng, base, 55, used)) {
    const adj = 1 + Math.floor(rng() * 99);
    settlement[i].net += adj;
    settlement[i].fee -= adj;
  }

  /* ── 3. MDR mismatch: GST dropped, or a rate slip on one channel ──── */
  for (const i of take(rng, base, 34, used)) {
    let delta = Math.round(settlement[i].gross * 0.0018);
    if (Math.abs(delta) <= 100) delta = 140 + Math.floor(rng() * 900);
    settlement[i].fee += delta;
    settlement[i].net -= delta;
  }

  /* ── 4. Captured here, never presented by the bank ────────────────── */
  const skipped = new Set(take(rng, base, 22, used));
  settlement = settlement.filter((_, i) => !skipped.has(i));

  /* ── 5. Duplicate presentment ─────────────────────────────────────── */
  const dupes = take(rng, settlement.length, 11, new Set());
  for (const i of dupes) {
    settlement.push({
      ...settlement[i],
      id: `stl_dup_${String(i).padStart(6, "0")}`,
    });
  }

  /* ── 6. Refunds that settled normally (the quiet majority) ───────── */
  const quietRefunds = take(rng, base, 40, used);
  for (const i of quietRefunds) {
    const cap = ledger[i];
    const share = 0.4 + rng() * 0.6;
    const gross = -Math.round(cap.gross * share);
    const fee = -Math.round(cap.fee * share);
    const at = cap.at + (1 + Math.floor(rng() * 6)) * DAY_MS;
    const line: LedgerLine = {
      ref: `pay_${token(rng, 6)}${token(rng, 4)}`,
      orderId: cap.orderId,
      merchantId: cap.merchantId,
      channel: cap.channel,
      kind: "refund",
      at,
      gross,
      fee,
      net: gross - fee,
      dayIndex: cap.dayIndex,
    };
    ledger.push(line);
    settlement.push({
      ...line,
      id: `stl_${String(settlement.length + 1).padStart(6, "0")}`,
      utr: `UTR${dayCode(at)}${String(Math.floor(rng() * 900) + 100)}${String(
        Math.floor(rng() * 900) + 100,
      )}`,
      at: nextBatch(at),
    });
  }

  /* ── 7. Refund posted in the ledger, never debited in the file ───── */
  for (const i of take(rng, base, 8, used)) {
    const cap = ledger[i];
    const share = 0.5 + rng() * 0.5;
    const gross = -Math.round(cap.gross * share);
    const fee = -Math.round(cap.fee * share);
    ledger.push({
      ref: `pay_${token(rng, 6)}${token(rng, 4)}`,
      orderId: cap.orderId,
      merchantId: cap.merchantId,
      channel: cap.channel,
      kind: "refund",
      at: cap.at + (2 + Math.floor(rng() * 5)) * DAY_MS,
      gross,
      fee,
      net: gross - fee,
      dayIndex: cap.dayIndex,
    });
  }

  /* ── 8. Chargebacks: bank debit with and without a ledger dispute ── */
  for (const i of take(rng, base, 5, used)) {
    const cap = ledger[i];
    const at = cap.at + (5 + Math.floor(rng() * 10)) * DAY_MS;
    settlement.push({
      ...cap,
      id: `stl_cb_${i}`,
      utr: `UTR${dayCode(at)}${String(Math.floor(rng() * 900) + 100)}${String(
        Math.floor(rng() * 900) + 100,
      )}`,
      kind: "chargeback",
      at,
      gross: -cap.gross,
      fee: 0,
      net: -cap.gross,
      dayIndex: cap.dayIndex,
    });
  }

  for (const i of take(rng, base, 2, used)) {
    const cap = ledger[i];
    const at = cap.at + (6 + Math.floor(rng() * 8)) * DAY_MS;
    const line: LedgerLine = {
      ...cap,
      ref: `pay_${token(rng, 6)}${token(rng, 4)}`,
      kind: "chargeback",
      at,
      gross: -cap.gross,
      fee: 0,
      net: -cap.gross,
    };
    ledger.push(line);
    settlement.push({
      ...line,
      id: `stl_cb_ok_${i}`,
      utr: `UTR${dayCode(at)}${String(Math.floor(rng() * 900) + 100)}${String(
        Math.floor(rng() * 900) + 100,
      )}`,
      at: nextBatch(at),
    });
  }

  /* ── 9. Orphans: money landed for an order we have no record of ──── */
  for (let i = 0; i < 15; i++) {
    const merchant = pickMerchant(rng);
    const gross = amountFor(merchant, rng());
    const at = WINDOW_START + Math.floor(rng() * DAYS) * DAY_MS + (10 + Math.floor(rng() * 10)) * HOUR_MS;
    const fee = 0;
    const base_: LedgerLine = {
      ref: `pay_${token(rng, 6)}${token(rng, 4)}`,
      orderId: `ORD-EXT-${7000 + i}`,
      merchantId: merchant.id,
      channel: "UPI",
      kind: "capture",
      at,
      gross,
      fee,
      net: gross - fee,
      dayIndex: Math.floor((at - WINDOW_START) / DAY_MS),
    };
    settlement.push({
      ...base_,
      id: `stl_ext_${i}`,
      utr: `UTR${dayCode(at)}${String(Math.floor(rng() * 900) + 100)}${String(
        Math.floor(rng() * 900) + 100,
      )}`,
      at: nextBatch(at),
    });
  }

  return {
    ledger,
    settlement,
    merchants: MERCHANTS,
    windowStart: WINDOW_START,
    windowEnd: WINDOW_END,
    asOf: AS_OF,
    seed,
  };
}
