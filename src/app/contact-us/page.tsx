import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { ContactCards } from "@/components/contact/ContactCards";
import { ContactForm } from "@/components/contact/ContactForm";
import { QuickActions } from "@/components/about/QuickActions";
import { AboutProductsSection } from "@/components/about/AboutProductsSection";
import { ContactCta } from "@/components/home/ContactCta";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { site, getProductsBySlugs } from "@/lib/data";

export const metadata = {
  title: "Contact Us - aronixinfra.com",
};

export default function ContactPage() {
  const sliderProducts = getProductsBySlugs(site.sliderProductSlugs);

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

      <section className="section-white section-editorial">
        <ContactCards />
        <ContactForm />
      </section>

      <section className="section-band-light section-editorial border-t border-border-light">
        <Container>
          <MotionReveal>
            <div className="overflow-hidden rounded-3xl border border-border-light bg-white shadow-[var(--shadow-card)]">
              <iframe
                src={site.mapUrl}
                title="Location Map"
                className="aspect-video w-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </MotionReveal>
        </Container>
      </section>

      <QuickActions />
      <AboutProductsSection products={sliderProducts} />
      <ContactCta />
    </>
  );
}
