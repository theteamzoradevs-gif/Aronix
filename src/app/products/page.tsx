import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/products/ProductGrid";
import { products } from "@/lib/data";

export const metadata = {
  title: "Products - aronixinfra.com",
};

export default function ProductsPage() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeading>Our Products</SectionHeading>
        <ProductGrid products={products} showPrice />
      </Container>
    </section>
  );
}
