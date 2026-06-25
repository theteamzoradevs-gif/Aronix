"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CountUpProps {
  value: string;
  className?: string;
  duration?: number;
}

function parseValue(raw: string): { prefix: string; num: number; suffix: string } {
  const match = raw.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return { prefix: "", num: 0, suffix: raw };
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] };
}

export function CountUp({ value, className, duration = 1.4 }: CountUpProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { prefix, num, suffix } = parseValue(value);
  const [display, setDisplay] = useState(reduced ? value : `${prefix}0${suffix}`);

  useEffect(() => {
    if (!inView || reduced || num === 0) {
      if (inView) setDisplay(value);
      return;
    }

    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(num * eased);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, reduced, value, prefix, num, suffix, duration]);

  return (
    <motion.span ref={ref} className={className} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
      {display}
    </motion.span>
  );
}
