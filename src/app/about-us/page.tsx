import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CompanyAlbum } from "@/components/about/CompanyAlbum";
import { CeoSection } from "@/components/about/CeoSection";
import { QuickActions } from "@/components/about/QuickActions";
import { HsnTable } from "@/components/about/HsnTable";
import { ProductSlider } from "@/components/products/ProductSlider";
import { site, getProductsBySlugs } from "@/lib/data";

export const metadata = {
  title: "About Us - aronixinfra.com",
};

export default function AboutPage() {
  const sliderProducts = getProductsBySlugs(site.sliderProductSlugs);

  return (
    <>
      <section className="py-12 md:py-16">
        <Container>
          <SectionHeading>About Us</SectionHeading>
          <h3 className="mb-6 text-center text-xl font-bold text-text">About Aronix Infra</h3>
          <p className="mx-auto max-w-4xl text-[15px] leading-relaxed text-text-light">
            {site.aboutText}
          </p>
        </Container>
      </section>
      <CompanyAlbum />
      <CeoSection />
      <QuickActions />
      <ProductSlider products={sliderProducts} title="Our Products" />
      <HsnTable />
    </>
  );
}
