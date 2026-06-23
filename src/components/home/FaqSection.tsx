import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionBadge";
import { FaqAccordion, FaqAskButton } from "@/components/ui/FaqAccordion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FaqSection() {
  return (
    <section id="faqs" className="section-padding section-white">
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              badge="FAQs"
              title="Frequently asked questions"
              subtitle="Common questions about our portable cabins, shipping containers, and delivery process."
              align="center"
            />
          </div>
        </ScrollReveal>
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqAccordion items={site.faqs} />
          <FaqAskButton />
        </div>
      </Container>
    </section>
  );
}
