"use client";

import { clients } from "@/lib/data";
import { SiteImage } from "@/components/ui/SiteImage";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ClientsMarquee() {
  const doubled = [...clients, ...clients];

  return (
    <section className="overflow-hidden bg-[#f8f9ff] py-12 md:py-16">
      <Container>
        <SectionHeading>Our Clients</SectionHeading>
      </Container>
      <div className="relative mt-8">
        <div className="flex animate-marquee items-center gap-12 whitespace-nowrap md:gap-16">
          {doubled.map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              className="inline-flex h-24 w-48 shrink-0 items-center justify-center md:h-28 md:w-56"
            >
              <SiteImage
                src={client.image}
                alt={client.alt}
                className="max-h-20 w-auto object-contain md:max-h-24"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
