"use client";

import type { Product } from "@/types";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { ProductCubeCarousel } from "@/components/home/ProductCubeCarousel";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { featuredProductImages } from "@/lib/gallery";

export function AboutProductsSection({ products }: { products: Product[] }) {
  const items = products.slice(0, 9).map((product, i) => ({
    product,
    image: featuredProductImages[i] ?? featuredProductImages[i % featuredProductImages.length],
  }));

  if (!items.length) return null;

  return (
    <section className="section-band-light section-editorial overflow-hidden border-t border-border-light">
      <Container>
        <MotionReveal>
          <EditorialHeader
            label="Our products"
            title="Portable solutions we manufacture"
            subtitle="From portable cabins and guard sheds to shipping containers and prefabricated structures."
            align="center"
            className="mx-auto max-w-2xl"
            prominentLabel
          />
        </MotionReveal>

        <ProductCubeCarousel items={items} />
      </Container>
    </section>
  );
}
