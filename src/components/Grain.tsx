"use client";

import { useEffect, useState } from "react";

/**
 * Film grain that re-rolls in stepped frames — the single cheapest
 * trick for making a clean site feel shot on a tabletop.
 */
export default function Grain() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setFrame((f) => (f + 1) % 6), 140);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="grain-layer anim-flicker"
      aria-hidden
      style={{ transform: `translate(${(frame % 3) * -7}px, ${Math.floor(frame / 3) * -9}px)` }}
    />
  );
}
