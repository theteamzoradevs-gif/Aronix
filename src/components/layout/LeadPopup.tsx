"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LeadForm } from "@/components/forms/LeadForm";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const STORAGE_KEY = "aronix-lead-popup-dismissed";

export function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => setOpen(true), 7000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  const handleSuccess = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
          <motion.div
            className="absolute inset-0 cursor-pointer bg-ink/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
          />
          <motion.div
            className="relative z-10 w-full max-w-md"
            initial={reduced ? {} : { opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? {} : { opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-popup-title"
          >
            <div className="flex max-h-[min(90dvh,640px)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[var(--shadow-elevated)] sm:rounded-3xl">
              <div className="relative shrink-0 bg-primary px-5 py-3.5 text-white">
                <button
                  type="button"
                  onClick={dismiss}
                  className="absolute right-3 top-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/10 text-base leading-none hover:bg-white/20"
                  aria-label="Close"
                >
                  ×
                </button>
                {!submitted && (
                  <>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                      Free quote in 24 hours
                    </p>
                    <h2 id="lead-popup-title" className="mt-1.5 pr-8 font-display text-lg font-bold leading-snug md:text-xl">
                      What do you need for your site?
                    </h2>
                    <p className="mt-0.5 text-xs text-white/70">
                      Tell us briefly — our team will call you back.
                    </p>
                  </>
                )}
              </div>

              <div className="overflow-y-auto px-5 py-4">
                <LeadForm
                  variant="popup"
                  source="lead-popup"
                  showProductSelect
                  onSuccess={handleSuccess}
                />
                {!submitted && (
                  <button
                    type="button"
                    onClick={dismiss}
                    className="mt-2 w-full cursor-pointer py-1 text-xs text-text-muted hover:text-text"
                  >
                    Maybe later
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
