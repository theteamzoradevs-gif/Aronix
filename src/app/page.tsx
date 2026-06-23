import { HeroSection } from "@/components/home/HeroSection";
import { TrustCertifications } from "@/components/home/TrustCertifications";
import { ProductCategories } from "@/components/home/ProductCategories";
import { PrefabComparison } from "@/components/home/PrefabComparison";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ProjectGallery } from "@/components/home/ProjectGallery";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { FaqSection } from "@/components/home/FaqSection";
import { ContactCta } from "@/components/home/ContactCta";
import { site, getProductsBySlugs } from "@/lib/data";

export default function HomePage() {
  const featuredProducts = getProductsBySlugs(site.featuredProductSlugs).slice(0, 6);

  return (
    <>
      <HeroSection />
      <TrustCertifications />
      <ProductCategories />
      <ScrollReveal>
        <PrefabComparison />
      </ScrollReveal>
      <WhyChooseUs />
      <FeaturedProducts products={featuredProducts} />
      <ProjectGallery limit={6} />
      <HowItWorks />
      <TestimonialsCarousel />
      <FaqSection />
      <ContactCta />
    </>
  );
}
