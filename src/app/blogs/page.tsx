import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionBadge";
import { SiteImage } from "@/components/ui/SiteImage";
import { blogs } from "@/lib/data";

export const metadata = {
  title: "Blogs - aronixinfra.com",
};

const categories = ["Prefab", "Containers", "Site Solutions"];

export default function BlogsPage() {
  return (
    <>
      <section className="about-cream py-16 md:py-20">
        <Container>
          <SectionHeader
            badge="Blog"
            title="Industry tips & insights"
            subtitle="Expert guides on portable cabins, shipping containers, and prefab infrastructure for modern construction sites."
            align="center"
          />
        </Container>
      </section>

      <section className="section-padding bg-white pt-0">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {blogs.map((blog, i) => (
              <article key={blog.id} className="group">
                <Link
                  href={`/${blog.slug}`}
                  className="relative mb-5 block aspect-[4/3] overflow-hidden rounded-[24px] shadow-md"
                >
                  <SiteImage
                    src={blog.image}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1 text-[11px] font-semibold text-text">
                    {categories[i % categories.length]}
                  </span>
                </Link>
                <time className="text-xs text-text-muted">{blog.date}</time>
                <h3 className="mt-2 text-lg font-bold text-text">
                  <Link href={`/${blog.slug}`} className="transition-colors hover:text-primary">
                    {blog.title}
                  </Link>
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-muted">
                  {blog.excerpt}
                </p>
                <Link
                  href={`/${blog.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
