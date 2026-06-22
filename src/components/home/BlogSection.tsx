import Link from "next/link";
import { blogs } from "@/lib/data";
import { SiteImage } from "@/components/ui/SiteImage";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";

const categories = ["Prefab", "Containers", "Site Solutions"];

export function BlogSection() {
  const featured = blogs.slice(0, 3);

  return (
    <section className="about-cream section-padding">
      <Container>
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionBadge>Blog</SectionBadge>
            <h2 className="text-[28px] font-bold leading-tight tracking-tight text-text md:text-[36px] lg:text-[40px]">
              Industry tips & insights
            </h2>
          </div>
          <Link href="/blogs" className="btn-accent shrink-0 self-start md:self-auto">
            View all posts
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {featured.map((blog, i) => (
            <Link
              key={blog.id}
              href={`/${blog.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-[24px] shadow-md"
            >
              <SiteImage
                src={blog.image}
                alt={blog.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

              <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1 text-[11px] font-semibold text-text">
                {categories[i] ?? "Insights"}
              </span>

              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-black/30 p-4 backdrop-blur-xl">
                <time className="text-[12px] text-white/75">{blog.date}</time>
                <h3 className="mt-1.5 text-[15px] font-bold leading-snug text-white md:text-base">
                  {blog.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
