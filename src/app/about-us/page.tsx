import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { CompanyAlbum } from "@/components/about/CompanyAlbum";
import { CeoSection } from "@/components/about/CeoSection";
import { ImpactStats } from "@/components/about/ImpactStats";
import { AboutProductsSection } from "@/components/about/AboutProductsSection";
import { HsnTable } from "@/components/about/HsnTable";
import { site, getProductsBySlugs } from "@/lib/data";

export const metadata = {
  title: "About Us - aronixinfra.com",
};

export default function AboutPage() {
  const sliderProducts = getProductsBySlugs(site.sliderProductSlugs);

  return (
    <>
      <section className="about-cream py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <SectionBadge className="mx-auto">About us</SectionBadge>
              <h1 className="text-[32px] font-bold tracking-tight text-text md:text-[40px]">
                About Aronix Infra
              </h1>
            </div>
            <p className="mt-5 text-justify text-[15px] leading-relaxed text-text-muted">
              {site.aboutText}
            </p>
          </div>
        </Container>
      </section>
      <CompanyAlbum />
      <CeoSection />
      <ImpactStats />
      <AboutProductsSection products={sliderProducts} />
      <HsnTable />
    </>
  );
}
