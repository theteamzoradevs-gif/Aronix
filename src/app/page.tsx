import { HeroSection } from "@/components/home/HeroSection";
import { ClientsMarquee } from "@/components/home/ClientsMarquee";
import { HomeProjectsGrid } from "@/components/home/HomeProjectsGrid";
import { HomeAboutSection } from "@/components/home/HomeAboutSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { PrefabComparison } from "@/components/home/PrefabComparison";
import { BlogSection } from "@/components/home/BlogSection";
import { site, getProductsBySlugs } from "@/lib/data";

export default function HomePage() {
  const featuredProducts = getProductsBySlugs(site.homeProductSlugs).slice(0, 9);

  return (
    <>
      <HeroSection />
      <ClientsMarquee />
      <HomeProjectsGrid />
      <HomeAboutSection />
      <FeaturedProducts products={featuredProducts} />
      <WhyChooseUs />
      <TestimonialsCarousel />
      <PrefabComparison />
      <BlogSection />
    </>
  );
}
