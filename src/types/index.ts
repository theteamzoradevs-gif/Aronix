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
  footerMeta: { employees: string; gstRegistrationDate: string };
  tagline: string;
  aboutText: string;
  ceo: { name: string; bio: string; image: string };
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
  };
}
