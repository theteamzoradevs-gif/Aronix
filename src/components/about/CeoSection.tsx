import { site } from "@/lib/data";
import { SiteImage } from "@/components/ui/SiteImage";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";

export function CeoSection() {
  const paragraphs = site.ceo.bio.split(/(?<=\.)\s+/).filter(Boolean);

  return (
    <section className="about-cream py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative min-h-[360px] overflow-hidden rounded-[28px] shadow-lg md:min-h-[480px]">
            <SiteImage
              src={site.ceo.image}
              alt={site.ceo.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <SectionBadge>Meet Our CEO</SectionBadge>
            <h2 className="text-[28px] font-bold leading-tight tracking-tight text-text md:text-[36px] lg:text-[40px]">
              A story built on trust, quality & portable infrastructure
            </h2>
            <div className="mt-6 space-y-4">
              {paragraphs.map((para) => (
                <p key={para.slice(0, 40)} className="text-[15px] leading-relaxed text-text-muted">
                  {para}
                </p>
              ))}
            </div>
            <p className="mt-6 text-lg font-semibold text-text">— {site.ceo.name}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
