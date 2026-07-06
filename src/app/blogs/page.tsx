import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { SiteImage } from "@/components/ui/SiteImage";
import { ContactCta } from "@/components/home/ContactCta";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { blogs } from "@/lib/data";

export const metadata = {
  title: "Blogs - aronixinfra.com",
};

export default function BlogsPage() {
  return (
    <>
      <PageHero>
        <MotionReveal>
          <EditorialHeader
            label="Blog"
            title="Industry tips & insights"
            subtitle="Expert guides on portable cabins, shipping containers, and prefab infrastructure."
            description="Practical advice for modern construction sites and industrial projects."
            align="center"
            className="mx-auto max-w-2xl"
            prominentLabel
          />
        </MotionReveal>
      </PageHero>

      <section className="section-editorial section-white">
        <Container>
          <StaggerChildren className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {blogs.map((blog) => (
              <StaggerItem key={blog.id}>
                <article className="group flex h-full flex-col">
                  <Link
                    href={`/${blog.slug}`}
                    className="relative mb-5 block aspect-[4/3] overflow-hidden rounded-3xl bg-surface shadow-[var(--shadow-card)]"
                  >
                    <SiteImage
                      src={blog.image}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <time className="text-body-sm text-text-muted">{blog.date}</time>
                  <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                    <Link href={`/${blog.slug}`} className="transition-colors hover:text-primary">
                      {blog.title}
                    </Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 flex-1 text-description text-text-muted">
                    {blog.excerpt}
                  </p>
                  <Link
                    href={`/${blog.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    Read more →
                  </Link>
                </article>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
