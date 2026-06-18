import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ClientsMarquee } from "@/components/home/ClientsMarquee";
import { VideoSection } from "@/components/home/VideoSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { TrustedBy } from "@/components/home/TrustedBy";
import { PrefabComparison } from "@/components/home/PrefabComparison";
import { BlogCarousel } from "@/components/home/BlogCarousel";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { ProductSlider } from "@/components/products/ProductSlider";
import { site, getProductsBySlugs } from "@/lib/data";

export default function HomePage() {
  const featuredProducts = getProductsBySlugs(site.featuredProductSlugs);
  const homeProducts = getProductsBySlugs(site.homeProductSlugs);

  return (
    <>
      <HeroSection />
      <ProductSlider products={featuredProducts} title="Explore Our Demanding Product" />
      <AboutSection />
      <ProductSlider products={homeProducts} title="Our Products" showViewAll />
      <ClientsMarquee />
      <VideoSection />
      <WhyChooseUs />
      <TrustedBy />
      <PrefabComparison />
      <BlogCarousel />
      <TestimonialsCarousel />
    </>
  );
}
