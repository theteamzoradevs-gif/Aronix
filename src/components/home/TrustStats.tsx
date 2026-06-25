"use client";

import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/motion/CountUp";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { EditorialHeader } from "@/components/ui/EditorialHeader";

const statIcons = [
  <svg key="0" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="1" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>,
  <svg key="2" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  <svg key="3" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
];

export function TrustStats() {
  return (
    <section className="section-band-light border-y border-border-light">
      <Container className="py-14 md:py-20">
        <MotionReveal>
          <EditorialHeader
            label="Why businesses choose Aronix"
            title="Built for speed, built to last"
            subtitle="Factory-direct manufacturing with committed delivery timelines."
            align="center"
            className="mx-auto max-w-2xl"
            prominentLabel
          />
        </MotionReveal>

        <StaggerChildren className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {site.impactStats.map((stat, i) => (
            <StaggerItem key={stat.label}>
              <div className="card-premium flex h-full flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/8 text-primary">
                  {statIcons[i]}
                </div>
                <CountUp
                  value={stat.value}
                  className="font-display text-4xl font-bold text-ink md:text-5xl"
                />
                <p className="mt-2 text-description text-text-muted">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {site.trustBadges.slice(0, 6).map((badge) => (
            <span
              key={badge.label}
              className="rounded-full border border-border bg-white px-4 py-2 text-description font-medium text-text-muted"
            >
              {badge.label}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
