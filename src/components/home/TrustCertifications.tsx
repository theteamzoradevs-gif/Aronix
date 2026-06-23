"use client";

import { site, clients } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const badgeIcons = [
  <svg key="gst" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>,
  <svg key="msme" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>,
  <svg key="trust" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  <svg key="pan" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="time" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="clients" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>,
];

const staggerClasses = ["stagger-1", "stagger-2", "stagger-3", "stagger-4", "stagger-5", "stagger-6"];

export function TrustCertifications() {
  const doubled = [...clients, ...clients];
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="section-dark">
      <div ref={ref}>
      <Container className="py-8 md:py-10">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-white/60">
          Certified manufacturer you can trust
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {site.trustBadges.map((badge, i) => (
            <div
              key={badge.label}
              className={cn(
                "animate-fade-in-up flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-4 text-center backdrop-blur-sm",
                isVisible && "is-visible",
                staggerClasses[i]
              )}
            >
              <span className="text-accent">{badgeIcons[i % badgeIcons.length]}</span>
              <div>
                <p className="text-xs font-semibold leading-snug text-white sm:text-sm">{badge.label}</p>
                {badge.detail && (
                  <p className="mt-1 text-[10px] text-white/55 sm:text-xs">{badge.detail}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
      </div>

      <div className="border-t border-white/10 bg-white py-5 md:py-6">
        <Container>
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-text-muted">
            Trusted by businesses across India
          </p>
        </Container>
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee items-center gap-8 whitespace-nowrap md:gap-12">
            {doubled.map((client, i) => (
              <div
                key={`${client.id}-${i}`}
                className="inline-flex h-14 w-28 shrink-0 items-center justify-center rounded-lg border border-border bg-[#faf8f5] px-3 md:h-16 md:w-36"
              >
                <SiteImage
                  src={client.image}
                  alt={client.alt}
                  width={120}
                  height={48}
                  className="max-h-10 w-auto object-contain md:max-h-12"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
