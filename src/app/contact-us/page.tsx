import { Container } from "@/components/ui/Container";
import { ContactCards } from "@/components/contact/ContactCards";
import { ContactForm } from "@/components/contact/ContactForm";
import { QuickActions } from "@/components/about/QuickActions";
import { ProductSlider } from "@/components/products/ProductSlider";
import { site, getProductsBySlugs } from "@/lib/data";

export const metadata = {
  title: "Contact Us - aronixinfra.com",
};

export default function ContactPage() {
  const sliderProducts = getProductsBySlugs(site.sliderProductSlugs);

  return (
    <>
      <section className="py-12 md:py-16">
        <ContactCards />
        <ContactForm />
      </section>
      <section className="pb-12">
        <Container>
          <div className="aspect-video w-full overflow-hidden rounded border border-border">
            <iframe
              src={site.mapUrl}
              title="Location Map"
              className="h-full w-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>
      <QuickActions />
      <ProductSlider products={sliderProducts} title="Our Products" />
    </>
  );
}
