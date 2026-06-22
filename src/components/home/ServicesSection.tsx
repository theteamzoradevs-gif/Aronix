import Link from "next/link";
import type { Product } from "@/types";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { ProductsShowcase } from "@/components/home/ProductsShowcase";

export function ServicesSection({ products }: { products: Product[] }) {
  return (
    <section className="section-padding overflow-hidden">
      <Container>
        <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div>
            <SectionBadge>Our Products</SectionBadge>
            <h2 className="text-[28px] font-bold leading-tight tracking-tight text-text md:text-[36px] lg:text-[40px]">
              Expert solutions for every site requirement
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-text-muted md:text-base lg:pb-1">
            Aronix Infra provides professional portable cabins, shipping containers, and
            prefabricated structures designed for industrial, construction, and commercial
            projects across India.
          </p>
        </div>

        <ProductsShowcase products={products} />

        <div className="mt-10 text-center md:mt-12">
          <Link href="/products" className="btn-accent">
            View all products
          </Link>
        </div>
      </Container>
    </section>
  );
}
