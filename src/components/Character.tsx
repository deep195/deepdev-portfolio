"use client";

import type { Pose } from "@/data/portfolio";

/* ── one person, four acts ──────────────────────────────────────
   Royal-blue shirt, charcoal trousers, wavy black hair, beard,
   rectangular glasses, red kalava. Only the props change.       */

const INK = "#17150F";
const SKIN = "#C98D68";
const SKIN_D = "#B37853";
const HAIR = "#211A18";
const HAIR_L = "#43322B";
const BEARD = "#29201D";
const SHIRT = "#1765C5";
const SHIRT_L = "#2F7BD8";
const SHIRT_D = "#0F4E9E";
const PANTS = "#292522";
const PAPER = "#F4EEE2";
const GOLD = "#E9A928";
const BRACELET = "#BD4545";

type Pt = [number, number];
type Arms = { l: [Pt, Pt, Pt]; r: [Pt, Pt, Pt] };

/* shoulder → elbow → wrist */
const arms: Record<Pose, Arms> = {
  student: { l: [[64, 120], [58, 156], [78, 170]], r: [[136, 120], [146, 160], [140, 184]] },
  engineer: { l: [[64, 120], [54, 164], [80, 176]], r: [[136, 120], [146, 164], [120, 176]] },
  consultant: { l: [[64, 120], [54, 168], [66, 184]], r: [[136, 120], [150, 166], [152, 198]] },
  pm: { l: [[64, 120], [54, 160], [58, 184]], r: [[136, 120], [150, 158], [128, 146]] },
};

const toPath = ([a, b, c]: [Pt, Pt, Pt]) => `M${a[0]} ${a[1]} L${b[0]} ${b[1]} L${c[0]} ${c[1]}`;

const lerp = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/** short line across the arm, used for cuffs and the bracelet */
function across(a: Pt, b: Pt, half: number): [Pt, Pt] {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const m = Math.hypot(dx, dy) || 1;
  const nx = (-dy / m) * half;
  const ny = (dx / m) * half;
  return [
    [a[0] - nx, a[1] - ny],
    [a[0] + nx, a[1] + ny],
  ];
}

const line = (p: [Pt, Pt]) => `M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)} L${p[1][0].toFixed(1)} ${p[1][1].toFixed(1)}`;

/** sleeve (shirt colour) down to the elbow, then bare forearm */
function Arm({ pts }: { pts: [Pt, Pt, Pt] }) {
  const [s, e, h] = pts;
  const cuff = across(e, h, 6.6);

  return (
    <>
      <path d={toPath(pts)} fill="none" stroke={INK} strokeWidth={14.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d={toPath(pts)} fill="none" stroke={SKIN} strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" />
      <path
        d={`M${s[0]} ${s[1]} L${e[0]} ${e[1]}`}
        fill="none"
        stroke={SHIRT}
        strokeWidth={13.6}
        strokeLinecap="round"
      />
      {/* rolled cuff */}
      <path d={line(cuff)} stroke={SHIRT_D} strokeWidth={5.4} strokeLinecap="round" />
      <path d={line(across(lerp(e, h, 0.06), h, 6))} stroke={SHIRT_L} strokeWidth={2} strokeLinecap="round" opacity="0.7" />
    </>
  );
}

/** the red kalava, drawn on top so it never hides behind a prop */
function Kalava({ pts }: { pts: [Pt, Pt, Pt] }) {
  const [, e, h] = pts;
  const a = across(lerp(e, h, 0.62), h, 5.4);
  const b = across(lerp(e, h, 0.76), h, 5.2);
  return (
    <>
      <path d={line(a)} stroke={INK} strokeWidth={4.4} strokeLinecap="round" opacity="0.28" />
      <path d={line(a)} stroke={BRACELET} strokeWidth={2.6} strokeLinecap="round" />
      <path d={line(b)} stroke={BRACELET} strokeWidth={1.5} strokeLinecap="round" opacity="0.85" />
    </>
  );
}

/** stylised hand, elongated along the forearm, with landing creases */
function Hand({ at, dir, grip = false }: { at: Pt; dir: Pt; grip?: boolean }) {
  const ang = (Math.atan2(dir[1], dir[0]) * 180) / Math.PI;
  return (
    <g transform={`translate(${at[0]} ${at[1]}) rotate(${ang})`}>
      <ellipse cx="1.4" cy="0" rx="7.7" ry="6" fill={SKIN} stroke={INK} strokeWidth={1.9} />
      <path d="M1.2 -4.6 Q3.8 0 1.2 4.6" fill="none" stroke={SKIN_D} strokeWidth={1.1} strokeLinecap="round" opacity="0.6" />
      <path
        d={grip ? "M4.8 -4 Q6.8 0 4.8 4" : "M5 -3.2 Q6.6 0 5 3.2"}
        fill="none"
        stroke={SKIN_D}
        strokeWidth={1.1}
        strokeLinecap="round"
        opacity="0.45"
      />
    </g>
  );
}

export default function Character({
  pose = "pm",
  className = "",
  idle = true,
  showGlasses,
}: {
  pose?: Pose;
  className?: string;
  idle?: boolean;
  showGlasses?: boolean;
}) {
  const a = arms[pose];
  const glasses = showGlasses ?? true;

  return (
    <svg
      viewBox="0 0 200 320"
      className={className}
      role="img"
      aria-label={`Character illustration: ${pose}`}
      fill="none"
    >
      <title>{`Character — ${pose}`}</title>

      <defs>
        <linearGradient id="shirtG" x1="0.12" y1="0" x2="0.92" y2="1">
          <stop offset="0" stopColor={SHIRT_L} />
          <stop offset="0.45" stopColor={SHIRT} />
          <stop offset="1" stopColor={SHIRT_D} />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="100" cy="302" rx="52" ry="8" fill={INK} opacity="0.14" />

      {/* ── halo: rings, dots, small diamonds ─────────── */}
      <g opacity="0.9">
        <circle cx="100" cy="58" r="46" stroke={GOLD} strokeWidth="2.2" strokeDasharray="2 8" />
        <circle cx="100" cy="58" r="55" stroke={GOLD} strokeWidth="1.2" strokeDasharray="1 14" opacity="0.55" />
        {pose === "pm" && <path d="M100 2 L104 10 L100 18 L96 10 Z" fill={GOLD} stroke={INK} strokeWidth="1.3" />}
        <path d="M39 72 L44 75.5 L39 79 L34 75.5 Z" fill={GOLD} opacity="0.75" />
        <path d="M161 72 L166 75.5 L161 79 L156 75.5 Z" fill={GOLD} opacity="0.75" />
      </g>

      {/* ── trousers + sneakers ───────────────────────── */}
      <g className={idle ? "anim-sway" : ""} style={{ transformOrigin: "100px 188px" }}>
        <rect x="78" y="181" width="20" height="105" rx="6" fill={PANTS} stroke={INK} strokeWidth="2" />
        <rect x="102" y="181" width="20" height="105" rx="6" fill={PANTS} stroke={INK} strokeWidth="2" />
        <path d="M88 200 L87 270" stroke={INK} strokeWidth="1.4" opacity="0.22" />
        <path d="M112 200 L113 270" stroke={INK} strokeWidth="1.4" opacity="0.22" />

        <rect x="72" y="278" width="31" height="18" rx="8" fill="#1B1916" stroke={INK} strokeWidth="2" />
        <rect x="99" y="278" width="31" height="18" rx="8" fill="#1B1916" stroke={INK} strokeWidth="2" />
        <rect x="73" y="289" width="29" height="6" rx="3" fill="#45403A" />
        <rect x="100" y="289" width="29" height="6" rx="3" fill="#45403A" />
        <path d="M80 284 h9 M103 284 h9" stroke={PAPER} strokeWidth="1.3" opacity="0.4" strokeLinecap="round" />
      </g>

      {/* ── shirt ─────────────────────────────────────── */}
      <path
        d="M62 114 C62 104 70 98 82 98 L118 98 C130 98 138 104 138 114 L139 176 C139 184 140 188 139 192 C120 197 80 197 61 192 C60 188 61 184 61 176 Z"
        fill="url(#shirtG)"
        stroke={INK}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* hem shadow */}
      <path d="M61 190 C80 195 120 195 139 190 L139 185 C120 191 80 191 61 185 Z" fill={SHIRT_D} opacity="0.5" />
      {/* soft side folds */}
      <path d="M70 132 C72 152 72 172 70 186" stroke={SHIRT_D} strokeWidth="5" opacity="0.26" strokeLinecap="round" />
      <path d="M131 132 C129 152 129 172 131 186" stroke={SHIRT_D} strokeWidth="5" opacity="0.26" strokeLinecap="round" />

      {/* open collar */}
      <path d="M94 97 L100 108 L106 97 Z" fill={SKIN} stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M92 96 L100 109 L96 98 Z" fill={SHIRT_L} stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M108 96 L100 109 L104 98 Z" fill={SHIRT_L} stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />

      {/* placket + buttons */}
      <path d="M97 110 L97 191 M103 110 L103 191" stroke={INK} strokeWidth="1.2" opacity="0.22" />
      {[122, 144, 166, 187].map((y) => (
        <circle key={y} cx="100" cy={y} r="2" fill={PAPER} stroke={INK} strokeWidth="1" />
      ))}

      {/* chest pocket */}
      <rect x="108" y="120" width="14" height="14" rx="2.5" fill={SHIRT_D} opacity="0.45" />
      <rect x="108" y="120" width="14" height="14" rx="2.5" stroke={INK} strokeWidth="1.3" />
      <path d="M108 125 H122" stroke={INK} strokeWidth="1.3" opacity="0.65" />

      {/* lanyard + badge sit under anything held in front of the chest */}
      {pose === "engineer" && (
        <g>
          <path d="M94 104 L90 131 M106 104 L110 131" stroke={INK} strokeWidth="1.8" opacity="0.55" />
          <rect x="86" y="130" width="22" height="28" rx="5" fill={PAPER} stroke={INK} strokeWidth="1.8" />
          <rect x="86" y="130" width="22" height="7" rx="3.5" fill={GOLD} stroke={INK} strokeWidth="1.3" />
          <circle cx="97" cy="146" r="4.6" fill={SKIN} stroke={INK} strokeWidth="1.2" />
          <path d="M90 153 h14" stroke={INK} strokeWidth="1.2" opacity="0.4" />
        </g>
      )}

      {/* ── neck + head ──────────────────────────────── */}
      <rect x="93" y="78" width="14" height="24" rx="5" fill={SKIN_D} stroke={INK} strokeWidth="1.8" />
      <circle cx="100" cy="58" r="27.5" fill={SKIN} stroke={INK} strokeWidth="2.2" />
      <circle cx="72.5" cy="59" r="5.2" fill={SKIN} stroke={INK} strokeWidth="1.8" />
      <circle cx="127.5" cy="59" r="5.2" fill={SKIN} stroke={INK} strokeWidth="1.8" />

      {/* eyes + brows */}
      <g className={idle ? "anim-blink" : ""} style={{ transformOrigin: "100px 57px" }}>
        <ellipse cx="91" cy="57" rx="2.5" ry="3.2" fill="#2B1D16" />
        <ellipse cx="109" cy="57" rx="2.5" ry="3.2" fill="#2B1D16" />
      </g>
      <path d="M85 47.5 C88 45.5 92 45.5 95 47" stroke={INK} strokeWidth="2.3" strokeLinecap="round" />
      <path d="M105 47 C108 45.5 112 45.5 115 47.5" stroke={INK} strokeWidth="2.3" strokeLinecap="round" />
      <path d="M99 61 L97 67 L101 68" stroke={SKIN_D} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

      {/* beard + moustache */}
      <path
        d="M77 52 C77 64 82 76 89 81 C92 83.5 96 85 100 85 C104 85 108 83.5 111 81 C118 76 123 64 123 52 C123 58 120 63 116 65 C113 69 109 72 106 74 C104 76.5 102 78 100 78 C98 78 96 76.5 94 74 C91 72 87 69 84 65 C80 63 77 58 77 52 Z"
        fill={BEARD}
        stroke={INK}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M92 67.5 C95 65.5 98 66 100 67.5 C102 66 105 65.5 108 67.5 C105 69.5 103 70.5 100 70 C97 70.5 95 69.5 92 67.5 Z"
        fill={BEARD}
        stroke={INK}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M95 73.5 Q100 77.5 105 73.5" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />

      {glasses && (
        <g stroke={INK} strokeWidth="2.1" fill="none">
          <rect x="82" y="50.5" width="16" height="13" rx="3" />
          <rect x="102" y="50.5" width="16" height="13" rx="3" />
          <path d="M98 56.5 h4" />
          <path d="M82 56 L75.5 58" />
          <path d="M118 56 L124.5 58" />
        </g>
      )}

      {/* wavy hair, short at the sides */}
      <path
        d="M74 56 C72 47 74 38 80 32 C84 27 89 24 94 24 C97 22 101 22 105 23 C109 21 114 23 117 27 C122 31 126 38 127 45 C127 51 126 58 125 63 C123 57 120 51 116 47 C111 42 106 40 100 41 C94 42 89 46 86 50 C83 54 80 59 79 63 C77 59 75 58 74 56 Z"
        fill={HAIR}
        stroke={INK}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M84 33 C88 38 90 45 88 51" stroke={INK} strokeWidth="1.4" strokeLinecap="round" opacity="0.35" />
      <path d="M112 24 C116 30 118 38 119 45" stroke={INK} strokeWidth="1.4" strokeLinecap="round" opacity="0.35" />
      <path d="M86 29 C94 23 104 22 110 25" stroke={HAIR_L} strokeWidth="3" strokeLinecap="round" opacity="0.55" />

      {/* ── sleeves + forearms (hands come after the props) ── */}
      <Arm pts={a.r} />
      <Arm pts={a.l} />

      {/* ── held props, tucked behind the hand ────────── */}
      {pose === "student" && (
        <g transform="rotate(-10 84 155)">
          <rect x="70" y="143" width="28" height="22" rx="4" fill={PAPER} stroke={INK} strokeWidth="1.9" />
          <rect x="70" y="143" width="7" height="22" rx="3.4" fill={SHIRT_D} opacity="0.22" stroke="none" />
          <path d="M81 150 h13 M81 156 h9" stroke={INK} strokeWidth="1.3" opacity="0.45" strokeLinecap="round" />
        </g>
      )}

      {pose === "engineer" && (
        <g transform="rotate(-4 100 176)">
          <rect x="80" y="150" width="40" height="24" rx="4" fill="#3A4744" stroke={INK} strokeWidth="2" />
          <rect x="84" y="154" width="32" height="16" rx="2" fill="#16211F" />
          <path d="M87 159 h16 M87 163 h22" stroke={PAPER} strokeWidth="1.8" opacity="0.85" strokeLinecap="round" />
          <path d="M107 163 l5 -4" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
          <rect x="74" y="174" width="52" height="7" rx="3.5" fill="#9AA3A0" stroke={INK} strokeWidth="2" />
        </g>
      )}

      {pose === "consultant" && (
        <>
          <g transform="rotate(-7 58 180)">
            <rect x="36" y="167" width="30" height="21" rx="4" fill={PAPER} stroke={INK} strokeWidth="2" />
            <rect x="36" y="167" width="30" height="6" rx="3" fill={GOLD} stroke={INK} strokeWidth="1.5" />
          </g>
          <g>
            <path d="M144 198 v-5 a6 6 0 0 1 12 0 v5" stroke={INK} strokeWidth="2.4" fill="none" />
            <rect x="134" y="198" width="36" height="26" rx="7" fill="#8A6A3C" stroke={INK} strokeWidth="2.2" />
            <rect x="148" y="208" width="8" height="6" rx="2.5" fill={GOLD} stroke={INK} strokeWidth="1.4" />
            <path d="M134 207 h36" stroke={INK} strokeWidth="1.2" opacity="0.3" />
          </g>
        </>
      )}

      {pose === "pm" && (
        <g transform="rotate(-18 128 146)">
          <rect x="123.2" y="134" width="9.6" height="26" rx="4.8" fill="#25221F" stroke={INK} strokeWidth="2" />
          <circle cx="128" cy="130" r="8.4" fill="#3A3631" stroke={INK} strokeWidth="2" />
          <path d="M123.2 126 h9.6 M122.2 130.5 h11.6 M123.8 135 h8.4" stroke={INK} strokeWidth="0.9" opacity="0.45" />
          <path d="M123.2 139 h9.6" stroke={GOLD} strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}

      {/* ── hands, kalava, then whatever they wear ────── */}
      <Hand
        at={a.r[2]}
        dir={[a.r[2][0] - a.r[1][0], a.r[2][1] - a.r[1][1]]}
        grip={pose === "pm" || pose === "engineer"}
      />
      <Kalava pts={a.l} />
      <Hand
        at={a.l[2]}
        dir={[a.l[2][0] - a.l[1][0], a.l[2][1] - a.l[1][1]]}
        grip={pose === "consultant" || pose === "student"}
      />

      {/* ── worn + floating props ─────────────────────── */}
      {pose === "student" && (
        <g>
          <path d="M100 12 L138 25 L100 38 L62 25 Z" fill={INK} />
          <path d="M86 31 h28 v8 h-28 z" fill={INK} />
          <path d="M136 25 L140 39" stroke={GOLD} strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="140" cy="40" r="2.6" fill={GOLD} />
        </g>
      )}

      {pose === "pm" && (
        <g>
          <path d="M168 148 l7 7" stroke={GOLD} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <circle cx="168" cy="148" r="2.4" fill={GOLD} />
        </g>
      )}
    </svg>
  );
}
