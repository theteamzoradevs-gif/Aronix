import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionBadge";
import { ContactCards } from "@/components/contact/ContactCards";
import { ContactForm } from "@/components/contact/ContactForm";
import { QuickActions } from "@/components/about/QuickActions";
import { AboutProductsSection } from "@/components/about/AboutProductsSection";
import { site, getProductsBySlugs } from "@/lib/data";

export const metadata = {
  title: "Contact Us - aronixinfra.com",
};

export default function ContactPage() {
  const sliderProducts = getProductsBySlugs(site.sliderProductSlugs);

  return (
    <>
      <section className="about-cream py-16 md:py-20">
        <Container>
          <SectionHeader
            badge="Contact"
            title="Let's get in touch"
            subtitle="Reach out for quotes, product enquiries, or site visits. Our team responds quickly across phone, email, and WhatsApp."
            align="center"
          />
        </Container>
      </section>

      <section className="bg-white pb-12 md:pb-16">
        <ContactCards />
        <ContactForm />
      </section>

      <section className="about-cream pb-16 md:pb-20">
        <Container>
          <div className="overflow-hidden rounded-[24px] border border-border bg-white shadow-sm">
            <iframe
              src={site.mapUrl}
              title="Location Map"
              className="aspect-video w-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>

      <QuickActions />
      <AboutProductsSection products={sliderProducts} />
    </>
  );
}
