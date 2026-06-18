import type { Product, Blog, Testimonial, Client, SiteConfig } from "@/types";
import productsData from "@/data/products.json";
import blogsData from "@/data/blogs.json";
import testimonialsData from "@/data/testimonials.json";
import clientsData from "@/data/clients.json";
import siteData from "@/data/site.json";

export const products = productsData as Product[];
export const blogs = blogsData as Blog[];
export const testimonials = testimonialsData as Testimonial[];
export const clients = clientsData as Client[];
export const site = siteData as SiteConfig;

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
