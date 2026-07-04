import Link from "next/link";
import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { SiteImage } from "@/components/ui/SiteImage";
import { MotionReveal } from "@/components/motion/MotionReveal";

export function HomeAboutSection() {
  const paragraphs = site.aboutText.split(/(?<=\.)\s+/).filter(Boolean);
  const preview = paragraphs.slice(0, 2).join(" ");

  return (
    <section className="section-editorial section-white border-t border-border-light">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <MotionReveal>
            <div>
              <EditorialHeader
                label="About us"
                title="About Aronix Infra"
                align="left"
                compact
                prominentLabel
              />

              <p className="mt-5 text-body leading-relaxed text-text-muted">
                {preview}
              </p>

              <Link href="/about-us" className="btn-primary mt-8 hidden text-sm lg:inline-flex">
                Read more
              </Link>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[var(--shadow-elevated)] md:aspect-[5/6]">
                <SiteImage
                  src={site.aboutImage}
                  alt="Premium portable office cabin interior by Aronix Infra"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-border-light bg-white p-4 shadow-[var(--shadow-card)] md:block">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">GST Registered</p>
                <p className="mt-1 font-mono text-sm font-medium text-ink">{site.gst}</p>
              </div>
              <Link href="/about-us" className="btn-primary mt-6 inline-flex w-full justify-center text-sm lg:hidden">
                Read more
              </Link>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
