import { HeroSection } from "@/components/home/HeroSection";
import { PrefabComparison } from "@/components/home/PrefabComparison";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ClientsSection } from "@/components/home/ClientsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { QuoteCtaBand } from "@/components/home/QuoteCtaBand";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { AboutSection } from "@/components/home/AboutSection";
import { BlogSection } from "@/components/home/BlogSection";
import { FaqSection } from "@/components/home/FaqSection";
import { ContactCta } from "@/components/home/ContactCta";
import { site, getProductsBySlugs } from "@/lib/data";

export default function HomePage() {
  const showcaseProducts = getProductsBySlugs(site.featuredProductSlugs).slice(0, 5);
  const extra = site.homeProductSlugs.find((slug) => !site.featuredProductSlugs.includes(slug));
  const serviceSlugs = (extra
    ? [...site.featuredProductSlugs, extra]
    : site.featuredProductSlugs
  ).slice(0, 6);

  const serviceProducts = getProductsBySlugs(serviceSlugs);

  return (
    <>
      <HeroSection />
      <PrefabComparison />
      <ServicesSection products={showcaseProducts.length >= 5 ? showcaseProducts : serviceProducts} />
      <ClientsSection />
      <WhyChooseUs />
      <QuoteCtaBand />
      <HowItWorks />
      <TestimonialsCarousel />
      <AboutSection />
      <BlogSection />
      <FaqSection />
      <ContactCta />
    </>
  );
}
