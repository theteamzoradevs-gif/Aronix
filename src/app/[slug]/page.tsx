import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";
import { ContactCta } from "@/components/home/ContactCta";
import { MotionReveal } from "@/components/motion/MotionReveal";
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
      <PageHero>
        <MotionReveal>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-primary"
          >
            ← Back to all posts
          </Link>
        </MotionReveal>
      </PageHero>

      <section className="section-white section-editorial pt-6 md:pt-8">
        <Container>
          <article className="mx-auto max-w-3xl">
            <MotionReveal>
              <div className="mt-2 overflow-hidden rounded-3xl shadow-[var(--shadow-card)] md:mt-4">
                <SiteImage
                  src={blog.image}
                  alt={blog.title}
                  className="aspect-video w-full object-cover"
                />
              </div>
              <time className="mt-8 block text-body-sm text-text-muted">{blog.date}</time>
              <h1 className="mt-3 font-display text-section-title text-ink">
                {blog.title}
              </h1>
            </MotionReveal>
            <div
              className="blog-content mt-8"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            <div className="mt-10 flex flex-wrap gap-4 border-t border-border-light pt-8">
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

      <ContactCta />
    </>
  );
}
