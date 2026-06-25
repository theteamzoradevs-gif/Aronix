import Link from "next/link";
import type { Product } from "@/types";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { ProductCubeCarousel } from "@/components/home/ProductCubeCarousel";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { featuredProductImages } from "@/lib/gallery";

export function FeaturedProducts({ products }: { products: Product[] }) {
  const items = products.slice(0, 9).map((product, i) => ({
    product,
    image: featuredProductImages[i] ?? featuredProductImages[i % featuredProductImages.length],
  }));

  return (
    <section className="section-compact section-white overflow-hidden">
      <Container>
        <MotionReveal>
          <EditorialHeader
            label="Popular products"
            title="Cabins and containers ready to order"
            subtitle="Factory-built units with transparent starting prices."
            align="center"
            className="mx-auto max-w-xl"
            compact
            prominentLabel
          />
        </MotionReveal>

        <ProductCubeCarousel items={items} />

        <div className="mt-6 text-center">
          <Link href="/products" className="btn-primary text-sm">
            View all products
          </Link>
        </div>
      </Container>
    </section>
  );
}
