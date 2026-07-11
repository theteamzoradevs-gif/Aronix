import type { Product } from "@/types";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { ProductCubeCarousel } from "@/components/home/ProductCubeCarousel";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { resolveDisplayImage } from "@/lib/gallery";

export function FeaturedProducts({ products }: { products: Product[] }) {
  const items = products.slice(0, 9).map((product) => ({
    product,
    image: resolveDisplayImage(product.image, product.slug),
  }));

  return (
    <section className="section-compact section-white overflow-hidden">
      <Container>
        <MotionReveal>
          <EditorialHeader
            label="Popular products"
            title="Cabins and containers ready to order"
            subtitle="Factory-built units ready for your site."
            align="center"
            className="mx-auto max-w-xl"
            compact
            prominentLabel
          />
        </MotionReveal>

        <ProductCubeCarousel items={items} />
      </Container>
    </section>
  );
}
