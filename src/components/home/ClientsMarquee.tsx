"use client";

import { clients } from "@/lib/data";
import { SiteImage } from "@/components/ui/SiteImage";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { MotionReveal } from "@/components/motion/MotionReveal";

export function ClientsMarquee() {
  const doubled = [...clients, ...clients];

  return (
    <section className="section-white section-compact overflow-hidden border-t border-border-light">
      <Container>
        <MotionReveal>
          <EditorialHeader
            label="Our clients"
            title="Trusted by businesses across India"
            subtitle="Construction, industrial, and commercial partners nationwide."
            align="center"
            className="mx-auto max-w-xl"
            prominentLabel
          />
        </MotionReveal>
      </Container>
      <div className="relative mt-6">
        <div className="flex animate-marquee items-center gap-10 whitespace-nowrap md:gap-14">
          {doubled.map((client, i) => (
            <SiteImage
              key={`${client.id}-${i}`}
              src={client.image}
              alt={client.alt}
              width={260}
              height={96}
              className="inline-block h-16 w-auto max-w-[180px] shrink-0 object-contain opacity-90 transition-opacity hover:opacity-100 md:h-20 md:max-w-[220px] lg:h-24 lg:max-w-[260px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
