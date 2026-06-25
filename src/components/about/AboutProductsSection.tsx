import Link from "next/link";
import type { Product } from "@/types";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionBadge";
import { ProductCard } from "@/components/products/ProductCard";
import { MotionReveal } from "@/components/motion/MotionReveal";

export function AboutProductsSection({ products }: { products: Product[] }) {
  const featured = products.slice(0, 6);

  return (
    <section className="section-white section-editorial border-t border-border-light">
      <Container>
        <MotionReveal>
          <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-2 lg:items-end lg:gap-12">
            <SectionHeader
              badge="Our products"
              title="Portable solutions we manufacture"
              subtitle="From portable cabins and guard sheds to shipping containers and prefabricated structures."
              description="Explore our full range built for industrial and commercial sites."
              align="left"
            />
          </div>
        </MotionReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} showPrice />
          ))}
        </div>

        <div className="mt-10 text-center md:mt-12">
          <Link href="/products" className="btn-accent">
            View all products
          </Link>
        </div>
      </Container>
    </section>
  );
}
