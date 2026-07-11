import Link from "next/link";
import type { Product } from "@/types";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { ProductCard } from "@/components/products/ProductCard";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { resolveDisplayImage } from "@/lib/gallery";
import { cn } from "@/lib/utils";

const MOBILE_VISIBLE_COUNT = 1;

export function AllProductsSection({ products }: { products: Product[] }) {
  const items = products.slice(0, 6);
  if (!items.length) return null;

  return (
    <section className="section-compact section-white border-t border-border-light">
      <Container>
        <MotionReveal>
          <EditorialHeader
            label="All products"
            title="Cabins, containers & site solutions"
            subtitle="Browse our complete range of portable infrastructure products."
            align="center"
            className="mx-auto max-w-xl"
            compact
            prominentLabel
          />
        </MotionReveal>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((product, index) => (
            <div
              key={product.slug}
              className={cn(index >= MOBILE_VISIBLE_COUNT && "hidden sm:block")}
            >
              <ProductCard
                product={product}
                imageOverride={resolveDisplayImage(product.image, product.slug)}
                compact
              />
            </div>
          ))}
        </div>

        <div className="mt-6 text-center sm:mt-10">
          <Link href="/products" className="btn-primary text-sm">
            View all products
          </Link>
        </div>
      </Container>
    </section>
  );
}
