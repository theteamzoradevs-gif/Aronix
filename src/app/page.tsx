import { HeroSection } from "@/components/home/HeroSection";
import { ClientsMarquee } from "@/components/home/ClientsMarquee";
import { HomeProjectsGrid } from "@/components/home/HomeProjectsGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HomeAboutSection } from "@/components/home/HomeAboutSection";
import { AllProductsSection } from "@/components/home/AllProductsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { PrefabComparison } from "@/components/home/PrefabComparison";
import { BlogSection } from "@/components/home/BlogSection";
import { site, getProductsBySlugs } from "@/lib/data";

export default function HomePage() {
  const homeProducts = getProductsBySlugs(site.homeProductSlugs);
  const featuredProducts = homeProducts.slice(0, 9);
  const allProductsPreview = homeProducts.slice(0, 6);

  return (
    <>
      <HeroSection />
      <ClientsMarquee />
      <HomeProjectsGrid />
      <FeaturedProducts products={featuredProducts} />
      <HomeAboutSection />
      <AllProductsSection products={allProductsPreview} />
      <WhyChooseUs />
      <TestimonialsCarousel />
      <PrefabComparison />
      <BlogSection />
    </>
  );
}
