import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SiteImage } from "@/components/ui/SiteImage";

const featureIcons = [
  <svg key="0" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="1" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  <svg key="2" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>,
  <svg key="3" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
];

function AdvantageCards({ compact = false }: { compact?: boolean }) {
  const { whyChooseUs } = site;

  return (
    <div className={`grid gap-3 ${compact ? "grid-cols-2" : "gap-4 sm:grid-cols-2"}`}>
      {whyChooseUs.advantages.map((item, i) => (
        <div key={item.title} className={`card-surface ${compact ? "p-4" : "p-5"}`}>
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary md:mb-3 md:h-10 md:w-10">
            {featureIcons[i]}
          </div>
          <h3 className={`font-semibold text-text ${compact ? "text-sm" : "text-base"}`}>
            {item.title}
          </h3>
          <p className={`mt-1.5 leading-relaxed text-text-muted ${compact ? "text-xs" : "text-sm"}`}>
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

function StatsBlock({ onImage = false }: { onImage?: boolean }) {
  return (
    <div
      className={
        onImage
          ? "absolute bottom-0 left-0 right-0 flex items-baseline gap-2 bg-white/75 px-4 py-3 backdrop-blur-md"
          : "mb-8 flex items-baseline gap-2"
      }
    >
      <span className="text-4xl font-bold text-primary md:text-6xl">{site.statsYears}</span>
      <span
        className={`font-medium ${onImage ? "text-sm text-text-muted" : "text-lg text-text-muted"}`}
      >
        Years of industry experience
      </span>
    </div>
  );
}

export function WhyChooseUs() {
  const { whyChooseUs } = site;

  return (
    <section className="section-padding bg-surface">
      <Container>
        {/* Mobile layout */}
        <div className="lg:hidden">
          <div className="mb-8 text-center">
            <SectionLabel className="mx-auto">Why choose us</SectionLabel>
            <h2 className="section-heading">{whyChooseUs.title}</h2>
            <span className="section-heading-underline" />
            <p className="section-subheading mx-auto mt-4 max-w-sm text-[14px] leading-relaxed">
              {whyChooseUs.mobileIntro}
            </p>
          </div>

          <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-md">
            <SiteImage
              src={site.ceo.image}
              alt="Aronix Infra team"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <StatsBlock onImage />
          </div>

          <AdvantageCards compact />
        </div>

        {/* Desktop layout */}
        <div className="hidden items-center gap-12 lg:grid lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-8 text-left">
              <SectionLabel className="text-left">Why choose us</SectionLabel>
              <h2 className="section-heading text-left">{whyChooseUs.title}</h2>
              <span className="section-heading-underline mx-0" />
              <p className="section-subheading mx-0 mt-4 max-w-none text-left">
                {whyChooseUs.intro}
              </p>
            </div>
            <StatsBlock />
            <AdvantageCards />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-md">
            <SiteImage
              src={site.ceo.image}
              alt="Aronix Infra team"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
