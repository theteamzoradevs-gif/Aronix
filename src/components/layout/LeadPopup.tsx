"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const productTypes = [
  "Portable office cabin",
  "Guard cabin",
  "Shipping container",
  "Bunk house / labour camp",
  "Toilet / sanitation unit",
  "Custom prefab structure",
];

const STORAGE_KEY = "aronix-lead-popup-dismissed";

export function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [product, setProduct] = useState(productTypes[0]);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
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
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white shadow-[var(--shadow-elevated)]">
              <div className="relative bg-primary px-6 py-5 text-white">
                <button
                  type="button"
                  onClick={dismiss}
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg leading-none hover:bg-white/20"
                  aria-label="Close"
                >
                  ×
                </button>
                <p className="text-label text-accent">Free quote in 24 hours</p>
                <h2 id="lead-popup-title" className="mt-2 font-display text-xl font-bold md:text-2xl">
                  What do you need for your site?
                </h2>
                <p className="mt-1 text-body-sm text-white/70">
                  Tell us briefly — our team will call you back.
                </p>
              </div>

              <div className="p-6">
                {sent ? (
                  <div className="space-y-4 py-2 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-2xl text-primary">
                      ✓
                    </div>
                    <p className="font-display text-lg font-bold text-ink">Request received!</p>
                    <p className="text-body-sm text-text-muted">
                      We&apos;ll call within 24 hours. For urgent enquiries:
                    </p>
                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
                      <a href={`tel:${site.phone}`} className="btn-accent text-sm">
                        Call {site.phone}
                      </a>
                      <button type="button" onClick={dismiss} className="btn-primary text-sm">
                        Continue browsing
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your name"
                      className="popup-form-input"
                    />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Phone number"
                      className="popup-form-input"
                    />
                    <select
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                      className="popup-form-input"
                      aria-label="What do you need?"
                    >
                      {productTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="btn-accent w-full py-3.5 text-sm font-bold">
                      Get free quote →
                    </button>
                    <button
                      type="button"
                      onClick={dismiss}
                      className="w-full py-2 text-body-sm text-text-muted hover:text-text"
                    >
                      Maybe later
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
