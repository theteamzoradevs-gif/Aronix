import { site } from "@/lib/data";
import { SiteImage } from "@/components/ui/SiteImage";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { MotionReveal } from "@/components/motion/MotionReveal";

export function CeoSection() {
  const paragraphs = site.ceo.bio.split(/(?<=\.)\s+/).filter(Boolean);

  return (
    <section className="section-white section-editorial">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
          <MotionReveal direction="left">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-3xl bg-surface shadow-[var(--shadow-card)]">
              <SiteImage
                src={site.ceo.image}
                alt={site.ceo.name}
                fill
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover object-top"
              />
            </div>
          </MotionReveal>

          <MotionReveal direction="right">
            <div className="lg:pl-2">
              <EditorialHeader
                label="Meet our founder"
                title={site.ceo.name}
                subtitle={site.ceo.role ?? "Founder & Director, Aronix Infra"}
              />
              <div className="mt-6 space-y-4">
                {paragraphs.map((para) => (
                  <p key={para.slice(0, 40)} className="text-subheading text-text-muted">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
