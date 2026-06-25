"use client";

import { useState } from "react";
import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { SiteImage } from "@/components/ui/SiteImage";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export function ProcessJourney() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const steps = site.howItWorks;

  return (
    <section className="section-editorial section-band-light">
      <Container>
        <MotionReveal>
          <EditorialHeader
            label="How it works"
            title="From quote to site-ready in four steps"
            subtitle="No running around — we handle everything from our Greater Noida facility."
            description="Manufacturing, logistics, and on-site readiness — all under one roof."
            align="center"
            className="mx-auto max-w-2xl"
            prominentLabel
          />
        </MotionReveal>

        <div className="mt-12 hidden lg:grid lg:grid-cols-4 lg:gap-0">
          {steps.map((step, i) => (
            <button
              key={step.step}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative border-t-2 px-4 py-6 text-left transition-colors",
                active === i ? "border-accent" : "border-border hover:border-primary/40"
              )}
            >
              <span className="font-display text-3xl font-bold text-primary/20">{step.step}</span>
              <p className="mt-2 font-semibold text-ink">{step.navLabel}</p>
              <p className="mt-1 text-sm text-text-muted">{step.title}</p>
            </button>
          ))}
        </div>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-4 lg:hidden">
            {steps.map((step, i) => (
              <button
                key={step.step}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "card-premium w-full p-4 text-left transition-all",
                  active === i && "ring-2 ring-accent"
                )}
              >
                <span className="text-xs font-semibold text-primary">Step {step.step}</span>
                <p className="mt-1 font-semibold text-ink">{step.navLabel}</p>
              </button>
            ))}
          </div>

          <MotionReveal>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduced ? {} : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? {} : { opacity: 0, x: 16 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Step {steps[active].step}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold text-ink md:text-3xl">
                  {steps[active].headline}
                </h3>
                <p className="mt-4 text-lead text-text-muted">{steps[active].desc}</p>
              </motion.div>
            </AnimatePresence>
          </MotionReveal>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={reduced ? {} : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? {} : { opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <SiteImage
                  src={steps[active].image}
                  alt={steps[active].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
