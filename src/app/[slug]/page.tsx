import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { blogs, getBlogBySlug } from "@/lib/data";

const BLOG_SLUGS = blogs.map((b) => b.slug);

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  return { title: blog ? `${blog.title} - aronixinfra.com` : "Blog" };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!BLOG_SLUGS.includes(slug)) notFound();

  const blog = getBlogBySlug(slug);
  if (!blog) notFound();

  return (
    <>
      <section className="about-cream py-12 md:py-16">
        <Container>
          <SectionBadge className="mb-3">Blog</SectionBadge>
          <Link href="/blogs" className="text-sm text-text-muted hover:text-primary">
            ← Back to all posts
          </Link>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container>
          <article className="mx-auto max-w-3xl">
            <div className="overflow-hidden rounded-[24px] shadow-md">
              <SiteImage
                src={blog.image}
                alt={blog.title}
                className="aspect-video w-full object-cover"
              />
            </div>
            <time className="mt-8 block text-sm text-text-muted">{blog.date}</time>
            <h1 className="mt-2 text-[28px] font-bold leading-tight text-text md:text-[36px]">
              {blog.title}
            </h1>
            <div
              className="blog-content mt-8"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            <div className="mt-10 flex flex-wrap gap-4 border-t border-border pt-8">
              <Link href="/contact-us" className="btn-accent">
                Contact us
              </Link>
              <Link href="/blogs" className="btn-primary">
                More articles
              </Link>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
