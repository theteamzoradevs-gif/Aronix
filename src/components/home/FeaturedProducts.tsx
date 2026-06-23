import Link from "next/link";
import type { Product } from "@/types";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionBadge";
import { ProductCard } from "@/components/products/ProductCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="section-padding section-dark">
      <Container>
        <ScrollReveal>
          <SectionHeader
            badge="Featured Products"
            title="Popular cabins and containers"
            subtitle="Starting prices shown — request a quote for custom specifications and bulk orders."
            align="center"
            badgeVariant="dark"
          />
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-3 md:gap-6">
          {products.map((product) => (
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
