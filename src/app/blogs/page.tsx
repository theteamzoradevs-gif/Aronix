import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { blogs } from "@/lib/data";

export const metadata = {
  title: "Blogs - aronixinfra.com",
};

export default function BlogsPage() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeading>Blogs</SectionHeading>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="overflow-hidden rounded border border-border bg-white shadow-[0_4px_14px_rgba(46,43,146,0.06)]"
            >
              <Link href={`/${blog.slug}`}>
                <SiteImage
                  src={blog.image}
                  alt={blog.title}
                  className="aspect-[4/3] w-full object-cover"
                />
              </Link>
              <div className="p-5">
                <h3 className="mb-2 text-lg font-semibold text-text">
                  <Link href={`/${blog.slug}`} className="hover:text-primary">
                    {blog.title}
                  </Link>
                </h3>
                <time className="text-xs text-text-muted">{blog.date}</time>
                <p className="mt-3 line-clamp-4 text-sm text-text-light">{blog.excerpt}</p>
                <Link
                  href={`/${blog.slug}`}
                  className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                >
                  Read More »
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
