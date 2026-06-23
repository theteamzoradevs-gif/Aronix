import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SiteImage } from "@/components/ui/SiteImage";
import { QuoteButton } from "@/components/products/QuoteButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const advantageIcons = [
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

const qualityIcons = [
  <svg key="q0" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
  </svg>,
  <svg key="q1" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>,
  <svg key="q2" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>,
  <svg key="q3" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
];

export function WhyChooseUs() {
  const { whyChooseUs, qualityAssurance, trustedBy } = site;
  const factoryImage = site.albumImages[1] || site.heroImages[0];

  return (
    <section className="section-padding section-white">
      <Container>
        <ScrollReveal>
          <SectionLabel>Why choose us</SectionLabel>
          <h2 className="section-heading-left">{whyChooseUs.title}</h2>
          <span className="section-heading-underline-left" />
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-text-muted md:text-base">
            {whyChooseUs.intro}
          </p>
        </ScrollReveal>

        {/* Mobile image banner */}
        <div className="relative mt-8 h-56 overflow-hidden rounded-xl border border-border shadow-md lg:hidden">
          <SiteImage
            src={factoryImage}
            alt="Aronix Infra manufacturing facility"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-8 grid items-stretch gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col">
            <div className="grid gap-3 sm:grid-cols-2">
              {whyChooseUs.advantages.map((item, i) => (
                <div key={item.title} className="card-surface card-hover-lift p-4">
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {advantageIcons[i]}
                  </div>
                  <h3 className="text-sm font-semibold text-text">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop sticky image */}
          <div className="relative hidden min-h-[480px] overflow-hidden rounded-xl border border-border shadow-md lg:block lg:min-h-full lg:sticky lg:top-28 lg:self-start">
            <SiteImage
              src={factoryImage}
              alt="Aronix Infra manufacturing facility"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
        </div>

        <ScrollReveal className="mt-12">
          <div className="rounded-xl border border-border bg-surface p-6 md:p-8">
            <h3 className="text-xl font-bold text-text md:text-2xl">{qualityAssurance.title}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
              {qualityAssurance.intro}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {qualityAssurance.items.map((item, i) => (
                <div key={item.title} className="card-hover-lift rounded-lg bg-white p-4 shadow-sm">
                  <div className="mb-2 text-primary">{qualityIcons[i]}</div>
                  <h4 className="text-sm font-semibold text-text">{item.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-text-muted">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-border pt-8">
              <p className="text-center text-sm font-medium text-text-muted">{trustedBy.title}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {trustedBy.advantages.map((item) => (
                  <div
                    key={item.title}
                    className="card-hover-lift rounded-lg border border-border bg-white p-4 text-left"
                  >
                    <h4 className="text-sm font-semibold text-text">{item.title}</h4>
                    <p className="mt-1 text-xs text-text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <QuoteButton variant="primary" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
