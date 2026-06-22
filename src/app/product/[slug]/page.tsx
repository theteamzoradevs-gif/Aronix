import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { products, getProductBySlug } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { QuoteButton } from "@/components/products/QuoteButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.title} - aronixinfra.com` : "Product" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <section className="about-cream py-12 md:py-16">
        <Container>
          <SectionBadge className="mb-3">Product</SectionBadge>
          <nav className="mb-2 text-sm text-text-muted">
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">{product.title}</span>
          </nav>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="overflow-hidden rounded-[24px] border border-border bg-white shadow-sm">
              <SiteImage
                src={product.image}
                alt={product.title}
                className="aspect-square w-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-[28px] font-bold leading-tight tracking-tight text-text md:text-[36px]">
                {product.title}
              </h1>
              {product.price && (
                <p className="mt-4 text-2xl font-semibold text-text">{formatPrice(product.price)}</p>
              )}
              <p className="mt-6 text-[15px] leading-relaxed text-text-muted">{product.description}</p>

              {product.specs.length > 0 && (
                <div className="mt-8 overflow-hidden rounded-[20px] border border-border bg-white">
                  <table className="w-full border-collapse text-sm">
                    <tbody>
                      {product.specs.map((spec, i) => (
                        <tr
                          key={spec.label}
                          className={i % 2 === 0 ? "bg-white" : "bg-[#faf8f5]"}
                        >
                          <td className="border-t border-border px-5 py-3.5 font-medium text-text-muted">
                            {spec.label}
                          </td>
                          <td className="border-t border-border px-5 py-3.5 text-text">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-4">
                <QuoteButton variant="primary" />
                <Link href="/contact-us" className="btn-accent">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
