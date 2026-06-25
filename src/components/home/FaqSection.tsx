import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { FaqAccordion, FaqAskButton } from "@/components/ui/FaqAccordion";
import { MotionReveal } from "@/components/motion/MotionReveal";

export function FaqSection() {
  return (
    <section id="faqs" className="section-editorial section-white">
      <Container>
        <MotionReveal>
          <div className="mx-auto max-w-3xl">
            <EditorialHeader
              label="FAQs"
              title="Questions about delivery, pricing & specifications?"
              subtitle="Everything you need to know before placing an order."
              description="Common questions about our portable cabins, shipping containers, and delivery process."
              align="center"
              prominentLabel
            />
          </div>
        </MotionReveal>
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqAccordion items={site.faqs} />
          <FaqAskButton />
        </div>
      </Container>
    </section>
  );
}
