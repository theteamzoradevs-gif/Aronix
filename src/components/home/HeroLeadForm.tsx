"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const productTypes = [
  "Portable office cabin",
  "Guard cabin",
  "Shipping container",
  "Bunk house",
  "Custom prefab",
];

export function HeroLeadForm() {
  const [sent, setSent] = useState(false);
  const [product, setProduct] = useState(productTypes[0]);
  const reduced = useReducedMotion();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <motion.div
      className="relative w-full max-w-md lg:max-w-none"
      initial={reduced ? {} : { opacity: 0, y: 32, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-accent/40 via-white/20 to-primary/30 blur-sm" />
      <div className="relative rounded-3xl border border-white/20 bg-white/10 p-6 shadow-[var(--shadow-elevated)] backdrop-blur-xl md:p-7">
        {sent ? (
          <div className="space-y-4 py-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-2xl">
              ✓
            </div>
            <h3 className="font-display text-xl font-bold text-white">Request received</h3>
            <p className="text-description text-white/70">
              Our team will call you within 24 hours. For urgent sites:
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <a href={`tel:${site.phone}`} className="btn-accent text-sm">
                Call now
              </a>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/25 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
              >
                WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <>
            <p className="text-label text-accent">Free quote in 24 hours</p>
            <h3 className="mt-2 font-display text-subheading font-bold text-white">
              Get your site quote
            </h3>
            <p className="mt-1 text-description text-white/65">
              Share your requirement — we&apos;ll respond with specs & pricing.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                className="hero-form-input"
              />
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone number"
                className="hero-form-input"
              />
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="hero-form-input appearance-none"
                aria-label="Product type"
              >
                {productTypes.map((type) => (
                  <option key={type} value={type} className="text-ink">
                    {type}
                  </option>
                ))}
              </select>
              <textarea
                name="message"
                rows={2}
                placeholder="Size, quantity, delivery location (optional)"
                className="hero-form-input resize-none"
              />
              <button type="submit" className="btn-accent w-full py-3.5 text-sm font-bold">
                Get free quote →
              </button>
            </form>

            <p className="mt-3 text-center text-[11px] text-white/45">
              GST registered · Factory direct · No spam calls
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
}
