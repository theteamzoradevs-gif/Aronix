import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/HeroSection";
import { ClientsMarquee } from "@/components/home/ClientsMarquee";
import { HomeProjectsGrid } from "@/components/home/HomeProjectsGrid";
import { site, getProductsBySlugs } from "@/lib/data";

const FeaturedProducts = dynamic(() =>
  import("@/components/home/FeaturedProducts").then((mod) => mod.FeaturedProducts)
);
const HomeAboutSection = dynamic(() =>
  import("@/components/home/HomeAboutSection").then((mod) => mod.HomeAboutSection)
);
const AllProductsSection = dynamic(() =>
  import("@/components/home/AllProductsSection").then((mod) => mod.AllProductsSection)
);
const WhyChooseUs = dynamic(() =>
  import("@/components/home/WhyChooseUs").then((mod) => mod.WhyChooseUs)
);
const TestimonialsCarousel = dynamic(() =>
  import("@/components/home/TestimonialsCarousel").then((mod) => mod.TestimonialsCarousel)
);
const PrefabComparison = dynamic(() =>
  import("@/components/home/PrefabComparison").then((mod) => mod.PrefabComparison)
);
const BlogSection = dynamic(() =>
  import("@/components/home/BlogSection").then((mod) => mod.BlogSection)
);

export default function HomePage() {
  const homeProducts = getProductsBySlugs(site.homeProductSlugs);
  const featuredProducts = homeProducts.slice(0, 9);
  const allProductsPreview = homeProducts.slice(0, 6);

  return (
    <>
      <HeroSection />
      <ClientsMarquee />
      <div className="cv-auto">
        <HomeProjectsGrid />
        <FeaturedProducts products={featuredProducts} />
        <HomeAboutSection />
        <AllProductsSection products={allProductsPreview} />
        <WhyChooseUs />
        <TestimonialsCarousel />
        <PrefabComparison />
        <BlogSection />
      </div>
    </>
  );
}
