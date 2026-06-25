import { HeroSection } from "@/components/home/HeroSection";
import { HomeProjectsGrid } from "@/components/home/HomeProjectsGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ClientsMarquee } from "@/components/home/ClientsMarquee";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { PrefabComparison } from "@/components/home/PrefabComparison";
import { site, getProductsBySlugs } from "@/lib/data";

export default function HomePage() {
  const featuredProducts = getProductsBySlugs(site.homeProductSlugs).slice(0, 9);

  return (
    <>
      <HeroSection />
      <HomeProjectsGrid />
      <FeaturedProducts products={featuredProducts} />
      <ClientsMarquee />
      <WhyChooseUs />
      <TestimonialsCarousel />
      <PrefabComparison />
    </>
  );
}
