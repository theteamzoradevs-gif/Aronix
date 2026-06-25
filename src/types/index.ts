export type ProductCategory = "office" | "guard" | "container" | "bunk" | "toilet" | "custom";

export type ProjectCategory = ProductCategory | "factory" | "all";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: number;
  slug: string;
  title: string;
  price: number | null;
  image: string | null;
  specs: ProductSpec[];
  description: string;
  link: string;
  category?: ProductCategory;
}

export interface Project {
  id: number;
  title: string;
  location: string;
  category: ProjectCategory;
  image: string;
  description: string;
}

export interface TrustBadge {
  label: string;
  detail?: string;
}

export interface ProductCategoryCard {
  id: ProductCategory | "custom";
  title: string;
  description: string;
  useCase: string;
  image: string;
  href: string;
  priceFrom?: number;
  specSummary?: string;
}

export interface ChatbotIntent {
  id: string;
  label: string;
  keywords: string[];
  answer: string;
}

export interface QualityAssuranceItem {
  title: string;
  desc: string;
}

export interface Blog {
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string | null;
  link: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  tag?: string;
}

export interface Client {
  id: number;
  image: string;
  alt: string;
}

export interface SiteConfig {
  phone: string;
  email: string;
  gst: string;
  whatsapp: string;
  addresses: { label: string; text: string }[];
  mapUrl: string;
  directionsUrl: string;
  logo: string;
  social: { facebook: string; linkedin: string; twitter: string };
  certification: { title: string; subtitle: string };
  indiamartUrl?: string;
  footerMeta: { employees: string; gstRegistrationDate: string };
  tagline: string;
  heroHeadline: string;
  heroSubtext: string;
  heroTrustBadges: string[];
  heroFeatureItems: { label: string; href: string }[];
  statsYears: string;
  impactStats: { value: string; label: string }[];
  howItWorks: {
    step: string;
    navLabel: string;
    title: string;
    headline: string;
    desc: string;
    image: string;
  }[];
  urgentCta: { title: string; description: string };
  contactCta: { title: string; description: string };
  faqs: { q: string; a: string }[];
  aboutText: string;
  ceo: { name: string; bio: string; image: string; role?: string };
  videoUrl: string;
  heroImages: string[];
  productVideos: string[];
  featuredProductSlugs: string[];
  homeProductSlugs: string[];
  sliderProductSlugs: string[];
  albumImages: string[];
  hsnCodes: { code: string; description: string }[];
  whyChooseUs: {
    title: string;
    intro: string;
    mobileIntro: string;
    advantages: { title: string; desc: string }[];
  };
  trustedBy: {
    title: string;
    intro: string;
    advantages: { title: string; desc: string }[];
  };
  prefabComparison: {
    title: string;
    intro: string;
    benefits: string[];
    traditional: string;
    traditionalPoints: string[];
  };
  trustBadges: TrustBadge[];
  productCategories: ProductCategoryCard[];
  qualityAssurance: {
    title: string;
    intro: string;
    items: QualityAssuranceItem[];
  };
  chatbotIntents: ChatbotIntent[];
  chatbotGreeting: string;
  chatbotFallback: string;
}
