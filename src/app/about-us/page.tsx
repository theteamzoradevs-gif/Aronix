import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { CompanyAlbum } from "@/components/about/CompanyAlbum";
import { CeoSection } from "@/components/about/CeoSection";
import { ImpactStats } from "@/components/about/ImpactStats";
import { AboutProductsSection } from "@/components/about/AboutProductsSection";
import { HsnTable } from "@/components/about/HsnTable";
import { ContactCta } from "@/components/home/ContactCta";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { site, getProductsBySlugs } from "@/lib/data";

export const metadata = {
  title: "About Us - aronixinfra.com",
};

export default function AboutPage() {
  const sliderProducts = getProductsBySlugs(site.sliderProductSlugs);

  return (
    <>
      <PageHero>
        <MotionReveal>
          <EditorialHeader
            label="About us"
            title="Manufacturer of portable cabins & shipping containers"
            subtitle="Factory-direct from Greater Noida with pan-India delivery."
            align="center"
            className="mx-auto max-w-3xl px-2 md:max-w-5xl"
            titleClassName="mx-auto max-w-[26ch] text-balance md:max-w-none md:whitespace-nowrap"
            subtitleClassName="mx-auto max-w-[30ch] text-balance text-center md:max-w-none md:whitespace-nowrap"
            prominentLabel
          />
        </MotionReveal>
      </PageHero>

      <section className="section-white border-b border-border-light py-10 md:py-14">
        <Container>
          <MotionReveal>
            <p className="mx-auto max-w-3xl text-justify text-subheading leading-relaxed text-text-muted">
              {site.aboutText}
            </p>
          </MotionReveal>
        </Container>
      </section>

      <CompanyAlbum />
      <CeoSection />
      <ImpactStats />
      <AboutProductsSection products={sliderProducts} />
      <HsnTable />
      <ContactCta />
    </>
  );
}
