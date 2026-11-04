"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { nav, profile } from "@/data/portfolio";

export default function TopBar() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.4 });
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
          solid ? "border-b border-ink/12 bg-paper/88 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between gap-6">
          <a href="#top" className="group flex items-center gap-3">
            <span className="relative grid h-9 w-9 place-items-center rounded-xl border-[1.5px] border-ink bg-ink font-mono text-[11px] font-bold tracking-widest text-paper">
              DV
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-flame" />
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-[15px] font-semibold tracking-tight">{profile.name}</span>
              <span className="mono-label block text-[9px] text-ink-soft">{profile.role}</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Sections">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-ink"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 rounded-full bg-flame transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft lg:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-teal opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-teal" />
              </span>
              Open to work
            </span>
            <a href="#contact" className="btn-hard hidden sm:inline-flex">
              Get in touch
            </a>
            <button
              onClick={() => setOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-xl border-[1.5px] border-ink md:hidden"
              aria-label="Open menu"
            >
              <span className="flex flex-col gap-[3px]">
                <span className="block h-[1.5px] w-4 bg-ink" />
                <span className="block h-[1.5px] w-4 bg-ink" />
                <span className="block h-[1.5px] w-3 bg-ink" />
              </span>
            </button>
          </div>
        </div>
        <motion.div className="h-[2px] origin-left rounded-full bg-flame" style={{ scaleX: bar }} />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-paper md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div className="wrap flex h-16 items-center justify-between border-b border-ink/15">
              <span className="mono-label text-ink-soft">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-xl border-[1.5px] border-ink text-lg leading-none"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>
            <nav className="wrap flex flex-1 flex-col justify-center gap-2">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.2 }}
                  className="flex items-baseline justify-between border-b border-ink/12 py-4"
                >
                  <span className="font-display text-4xl font-semibold">{item.label}</span>
                  <span className="mono-label text-ink-soft">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>
            <div className="wrap pb-10">
              <a href={`mailto:${profile.email}`} className="mono-label text-flame">
                {profile.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
