"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/** Stop-motion reveal: 3 held frames instead of a smooth glide. */
export default function Rise({
  children,
  delay = 0,
  y = 22,
  className,
  once = true,
  inView = true,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  inView?: boolean;
  as?: "div" | "li";
}) {
  const target = {
    opacity: [0, 0.35, 0.72, 1],
    y: [y, y * 0.6, y * 0.22, 0],
  };

  const transition = {
    duration: 0.52,
    delay,
    times: [0, 0.34, 0.68, 1],
    ease: "linear" as const,
  };

  const Comp = (as === "li" ? motion.li : motion.div) as typeof motion.div;

  if (!inView) {
    return (
      <Comp className={className} initial={{ opacity: 0, y }} animate={target} transition={transition}>
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={target}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={transition}
    >
      {children}
    </Comp>
  );
}
