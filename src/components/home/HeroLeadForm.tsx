"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LeadForm } from "@/components/forms/LeadForm";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroLeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="relative w-full max-w-md lg:max-w-none"
      initial={reduced ? {} : { opacity: 0, y: 32, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-accent/40 via-white/20 to-primary/30 blur-sm" />
      <div className="relative rounded-3xl border border-white/20 bg-white/10 p-6 shadow-[var(--shadow-elevated)] backdrop-blur-xl md:p-7">
        {!submitted && (
          <>
            <p className="text-label text-accent">Free quote in 24 hours</p>
            <h3 className="mt-2 font-display text-subheading font-bold text-white">
              Get your site quote
            </h3>
            <p className="mt-1 text-description text-white/65">
              Share your requirement — we&apos;ll respond with specs & pricing.
            </p>
          </>
        )}

        <LeadForm
          variant="hero"
          source="hero"
          showProductSelect
          className={submitted ? "" : "mt-5"}
          onSuccess={() => setSubmitted(true)}
        />

        {!submitted && (
          <p className="mt-3 text-center text-[11px] text-white/45">
            GST registered · Factory direct · No spam calls
          </p>
        )}
      </div>
    </motion.div>
  );
}
