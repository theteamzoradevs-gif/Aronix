"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/data";
import { IndiaMARTBadge } from "@/components/ui/IndiaMARTBadge";
import { useReducedMotion } from "@/hooks/useReducedMotion";
const SHOW_DELAY_MS = 3000;
const VISIBLE_DURATION_MS = 7000;

export function IndiaMARTTrustFloat() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) return;

    const showTimer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    const hideTimer = setTimeout(
      () => setVisible(false),
      SHOW_DELAY_MS + VISIBLE_DURATION_MS
    );

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="complementary"
          aria-label="IndiaMART Trust Seal"
          initial={reduced ? {} : { opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduced ? {} : { opacity: 0, x: 32 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-4 top-1/2 z-[55] -translate-y-1/2 md:right-6"
        >
          <IndiaMARTBadge
            size="2xl"
            className="drop-shadow-[0_10px_32px_rgba(0,0,0,0.4)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
