import type {
  Product,
  Blog,
  Testimonial,
  Client,
  SiteConfig,
  Project,
  ProductCategory,
} from "@/types";
import productsData from "@/data/products.json";
import blogsData from "@/data/blogs.json";
import testimonialsData from "@/data/testimonials.json";
import clientsData from "@/data/clients.json";
import siteData from "@/data/site.json";
import projectsData from "@/data/projects.json";

export const products = productsData as Product[];
export const blogs = blogsData as Blog[];
export const testimonials = testimonialsData as Testimonial[];
export const clients = clientsData as Client[];
export const site = siteData as SiteConfig;
export const projects = projectsData as Project[];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getBlogBySlug(slug: string): Blog | undefined {
  return blogs.find((b) => b.slug === slug);
}

export function getProductsBySlugs(slugs: string[]): Product[] {
  return slugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "all") return projects;
  return projects.filter((p) => p.category === category);
}

export const projectCategoryLabels: Record<string, string> = {
  all: "All Projects",
  office: "Office",
  guard: "Guard Cabin",
  container: "Container",
  bunk: "Bunk House",
  toilet: "Sanitation",
  factory: "Factory",
};

export const productCategoryLabels: Record<ProductCategory, string> = {
  office: "Office Cabins",
  guard: "Guard Cabins",
  container: "Containers",
  bunk: "Bunk Houses",
  toilet: "Sanitation",
  custom: "Custom Prefab",
};
