import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";
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
    <section className="py-12 md:py-16">
      <Container>
        <article className="mx-auto max-w-3xl">
          <SiteImage
            src={blog.image}
            alt={blog.title}
            className="mb-8 aspect-video w-full rounded border border-border object-cover"
          />
          <time className="text-sm text-text-muted">{blog.date}</time>
          <h1 className="mt-2 text-3xl font-bold text-text md:text-4xl">{blog.title}</h1>
          <div
            className="blog-content mt-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          <div className="mt-10 border-t border-border pt-8">
            <Link
              href="/contact-us"
              className="inline-block rounded bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-[#0201cc]"
            >
              Contact us
            </Link>
          </div>
        </article>
      </Container>
    </section>
  );
}
