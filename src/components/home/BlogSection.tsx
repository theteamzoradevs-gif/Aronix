import Link from "next/link";
import { blogs } from "@/lib/data";
import { SiteImage } from "@/components/ui/SiteImage";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { cn } from "@/lib/utils";

export function BlogSection() {
  const featured = blogs.slice(0, 3);

  return (
    <section className="section-editorial border-t border-border-light bg-cream">
      <Container>
        <MotionReveal>
          <EditorialHeader
            label="Blog"
            title="Industry tips & site insights"
            subtitle="Practical guides on portable cabins, containers, and prefab solutions."
            align="center"
            className="mx-auto max-w-2xl"
            compact
            prominentLabel
          />
        </MotionReveal>

        <div className="mt-8 grid gap-5 md:grid-cols-3 md:gap-6">
          {featured.map((blog, index) => (
            <Link
              key={blog.id}
              href={`/${blog.slug}`}
              className={cn("group card-premium overflow-hidden", index > 0 && "hidden md:block")}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                <SiteImage
                  src={blog.image}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <time className="text-xs font-medium text-text-muted">{blog.date}</time>
                <h3 className="mt-2 font-display text-base font-semibold leading-snug text-ink transition-colors group-hover:text-primary md:text-lg">
                  {blog.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-muted">{blog.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Read more
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link href="/blogs" className="btn-primary inline-flex text-sm">
            View all blogs
          </Link>
        </div>
      </Container>
    </section>
  );
}
