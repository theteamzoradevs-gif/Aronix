import Link from "next/link";
import type { Product } from "@/types";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { ProductCubeCarousel } from "@/components/home/ProductCubeCarousel";
import { MotionReveal } from "@/components/motion/MotionReveal";

export function FeaturedProducts({ products }: { products: Product[] }) {
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

        <ProductCubeCarousel products={products} />

        <div className="mt-6 text-center">
          <Link href="/products" className="btn-primary text-sm">
            View all products
          </Link>
        </div>
      </Container>
    </section>
  );
}
