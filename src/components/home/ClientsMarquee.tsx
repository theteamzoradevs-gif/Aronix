"use client";

import { clients } from "@/lib/data";
import { SiteImage } from "@/components/ui/SiteImage";
import { Container } from "@/components/ui/Container";

export function ClientsMarquee() {
  const doubled = [...clients, ...clients];

  return (
    <section className="border-y border-border-light bg-surface/50 py-6 md:py-8">
      <Container>
        <div className="flex flex-col items-stretch gap-5 md:flex-row md:items-center md:gap-12">
          <p className="shrink-0 text-center text-xs font-semibold uppercase tracking-[0.2em] text-text-muted md:w-36 md:text-left">
            Our clients
          </p>

          <div className="relative min-w-0 flex-1 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#f4f5f7] to-transparent md:w-16" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#f4f5f7] to-transparent md:w-16" />
            <div className="flex animate-marquee items-center gap-12 whitespace-nowrap md:gap-16">
              {doubled.map((client, i) => (
                <SiteImage
                  key={`${client.id}-${i}`}
                  src={client.image}
                  alt={client.alt}
                  width={240}
                  height={96}
                  className="inline-block h-14 w-auto max-w-[180px] shrink-0 object-contain md:h-[72px] md:max-w-[220px] lg:h-20 lg:max-w-[260px]"
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
