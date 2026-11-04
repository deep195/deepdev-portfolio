import Rise from "./Rise";
import { profile } from "@/data/portfolio";

const links = profile.links;

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-ink/20 bg-ink text-paper">
      <div className="film-strip h-4 opacity-25" aria-hidden />

      <div className="wrap relative py-16 lg:py-24">
        {/* big ghost type */}
        <span
          className="pointer-events-none absolute -right-10 top-24 select-none font-display text-[26vw] leading-none text-paper/[0.028]"
          aria-hidden
        >
          Fin
        </span>

        <div className="relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Rise>
              <span className="mono-label text-ochre">Contact — end of reel</span>
              <h2 className="mt-4 font-display text-[clamp(2.6rem,6.6vw,4.8rem)] leading-[0.9]">
                Let&apos;s write the
                <span className="accent block text-[#F0A07A]">next act.</span>
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-paper/60">
                I&apos;m looking for a product team that ships AI to real users — and wants someone
                who has sat on all three sides of the table. Send me the messy version of the
                problem.
              </p>
            </Rise>

            <Rise delay={0.1}>
              <a
                href={`mailto:${profile.email}`}
                className="group mt-8 inline-flex items-end gap-3 border-b-2 border-paper/25 pb-2 transition-colors hover:border-[#F0A07A]"
              >
                <span className="font-display text-[clamp(1.3rem,3.4vw,2.1rem)] leading-none">
                  {profile.email}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="mb-0.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden
                >
                  <path d="M3 17L17 3M17 3H7M17 3v10" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </a>
            </Rise>

            <Rise delay={0.18}>
              <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-paper/15 sm:grid-cols-3">
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="group flex flex-col justify-between gap-6 bg-ink p-4 transition-colors hover:bg-paper hover:text-ink"
                  >
                    <span className="mono-label text-[9px] opacity-60">{l.label}</span>
                    <span>
                      <span className="block font-display text-base leading-tight">{l.value}</span>
                      <span className="mono-label mt-1 block text-[8px] opacity-50">{l.note}</span>
                    </span>
                  </a>
                ))}
              </div>
            </Rise>
          </div>

          {/* end slate */}
          <Rise delay={0.12} className="hidden lg:block">
            <div className="relative mx-auto max-w-[300px] rotate-[-2deg] rounded-2xl border border-paper/25 p-4">
              <div className="flex items-center justify-between border-b border-paper/20 pb-2">
                <span className="mono-label text-[9px] text-paper/50">End slate</span>
                <span className="mono-label text-[9px] text-[#F0A07A]">Cut 04 / 04</span>
              </div>

              <div className="my-5 space-y-3">
                {[
                  ["Role", "Product Manager"],
                  ["Focus", "AI & LLM products"],
                  ["Based", profile.location],
                  ["Status", profile.availability],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 border-b border-paper/10 pb-2">
                    <span className="mono-label text-[8.5px] text-paper/40">{k}</span>
                    <span className="text-right text-[12.5px] text-paper/85">{v}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="mono-label text-[9px] text-paper/40">Director</span>
                <span className="accent text-xl text-paper">Deepdev</span>
              </div>

              <div className="mt-4 flex gap-1" aria-hidden>
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 flex-1 rounded-full"
                    style={{ background: i < 3 ? "#F0A07A" : "rgba(244,238,226,0.2)" }}
                  />
                ))}
              </div>
            </div>
          </Rise>
        </div>

        {/* footer */}
        <div className="mt-16 flex flex-col gap-4 border-t border-paper/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="mono-label text-[9px] text-paper/60">
              © {new Date().getFullYear()} {profile.name}
            </span>
            <span className="mono-label text-[9px] text-paper/55">Stop-motion by CSS steps()</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="mono-label text-[9px] text-paper/55">Set in Nunito, Fraunces & DM Mono</span>
            <a href="#top" className="mono-label flex items-center gap-2 text-[9px] text-paper/60 hover:text-paper">
              Back to top
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                <path d="M5 9V1M1 5l4-4 4 4" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
