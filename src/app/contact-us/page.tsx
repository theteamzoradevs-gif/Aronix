import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactSidebar, ContactMapPanel } from "@/components/contact/ContactSidebar";
import { MotionReveal } from "@/components/motion/MotionReveal";

export const metadata = {
  title: "Contact Us - aronixinfra.com",
};

export default function ContactPage() {
  return (
    <>
      <PageHero>
        <MotionReveal>
          <EditorialHeader
            label="Contact"
            title="Let's get in touch"
            subtitle="Reach out for quotes, product enquiries, or site visits."
            description="Our team responds quickly across phone, email, and WhatsApp."
            align="center"
            className="mx-auto max-w-2xl"
            prominentLabel
          />
        </MotionReveal>
      </PageHero>

      <section className="section-white section-compact border-b border-border-light">
        <Container>
          <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
            <MotionReveal>
              <ContactSidebar />
            </MotionReveal>

            <MotionReveal delay={0.06}>
              <ContactForm />
            </MotionReveal>

            <MotionReveal delay={0.1} className="lg:col-span-2">
              <ContactMapPanel className="min-h-[320px] lg:min-h-[420px]" />
            </MotionReveal>
          </div>
        </Container>
      </section>
    </>
  );
}
