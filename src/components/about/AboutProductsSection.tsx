import Link from "next/link";
import type { Product } from "@/types";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionBadge";
import { ServiceCard } from "@/components/ui/ServiceCard";

export function AboutProductsSection({ products }: { products: Product[] }) {
  const featured = products.slice(0, 6);

  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-2 lg:items-end lg:gap-12">
          <SectionHeader
            badge="Our Products"
            title="Portable solutions we manufacture"
            align="left"
          />
          <p className="text-[15px] leading-relaxed text-text-muted md:text-base lg:pb-1">
            From portable cabins and guard sheds to shipping containers and prefabricated
            structures — explore our full range built for industrial and commercial sites.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ServiceCard key={product.slug} product={product} />
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
