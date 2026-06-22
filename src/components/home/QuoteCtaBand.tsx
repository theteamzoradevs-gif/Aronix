"use client";

import { site } from "@/lib/data";
import { QuoteButton } from "@/components/products/QuoteButton";
import { Container } from "@/components/ui/Container";

export function QuoteCtaBand() {
  const { urgentCta } = site;

  return (
    <section className="bg-dark py-10 md:py-12">
      <Container className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold text-white md:text-3xl">{urgentCta.title}</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-white/70">{urgentCta.description}</p>
        </div>
        <QuoteButton variant="white" href="/contact-us" className="shrink-0">
          Contact our experts
        </QuoteButton>
      </Container>
    </section>
  );
}
