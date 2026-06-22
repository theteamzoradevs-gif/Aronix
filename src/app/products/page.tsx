import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionBadge";
import { VideoSection } from "@/components/home/VideoSection";
import { ProductGrid } from "@/components/products/ProductGrid";
import { products } from "@/lib/data";

export const metadata = {
  title: "Products - aronixinfra.com",
};

export default function ProductsPage() {
  return (
    <>
      <section className="about-cream py-12 md:py-16">
        <Container>
          <SectionHeader
            badge="Products"
            title="Our Products"
            subtitle="Portable cabins, shipping containers, guard sheds, and prefabricated structures — manufactured for industrial and commercial sites across India."
            align="center"
          />
        </Container>
      </section>

      <VideoSection />

      <section className="section-padding bg-white">
        <Container>
          <ProductGrid products={products} showPrice />
        </Container>
      </section>
    </>
  );
}
