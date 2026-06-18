import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  showPrice = false,
}: {
  products: Product[];
  showPrice?: boolean;
}) {
  return (
    <div className="-ml-2.5 grid grid-cols-2 gap-y-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => (
        <div key={product.id} className="pl-2.5">
          <ProductCard product={product} showPrice={showPrice} />
        </div>
      ))}
    </div>
  );
}
