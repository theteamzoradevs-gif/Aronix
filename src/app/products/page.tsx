import { Suspense } from "react";
import { ProductsPageClient } from "@/components/products/ProductsPageClient";

export const metadata = {
  title: "Products - aronixinfra.com",
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center text-text-muted">
          Loading products...
        </div>
      }
    >
      <ProductsPageClient />
    </Suspense>
  );
}
