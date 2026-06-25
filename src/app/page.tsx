import { HeroSection } from "@/components/home/HeroSection";
import { TrustStats } from "@/components/home/TrustStats";
import { SolutionShowcase } from "@/components/home/SolutionShowcase";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ProjectGallery } from "@/components/home/ProjectGallery";
import { ProcessJourney } from "@/components/home/ProcessJourney";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { FaqSection } from "@/components/home/FaqSection";
import { ContactCta } from "@/components/home/ContactCta";
import { site, getProductsBySlugs } from "@/lib/data";

export default function HomePage() {
  const featuredProducts = getProductsBySlugs(site.featuredProductSlugs).slice(0, 6);

  return (
    <>
      <HeroSection />
      <TrustStats />
      <SolutionShowcase />
      <WhyChooseUs />
      <FeaturedProducts products={featuredProducts} />
      <ProjectGallery limit={6} showFilters={false} />
      <ProcessJourney />
      <TestimonialsCarousel />
      <FaqSection />
      <ContactCta />
    </>
  );
}
