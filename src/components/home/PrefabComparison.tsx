import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionBadge";
import { SiteImage } from "@/components/ui/SiteImage";

function parseBenefit(text: string) {
  const colon = text.indexOf(":");
  if (colon === -1) return { title: text, desc: "" };
  return {
    title: text.slice(0, colon).trim(),
    desc: text.slice(colon + 1).trim(),
  };
}

function XIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function PrefabComparison() {
  const { prefabComparison } = site;
  const heroImage = site.heroImages[1] || site.heroImages[0];

  return (
    <section className="section-padding section-surface">
      <Container>
        <SectionHeader
          badge="Comparison"
          title={prefabComparison.title}
          subtitle={`${prefabComparison.intro} Aronix Infra manufactures every unit at our Greater Noida facility with committed 7–15 day delivery.`}
          align="center"
        />

        <div className="mt-10 grid items-stretch gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
          <div className="rounded-[24px] border border-border bg-[#faf8f5] p-6 shadow-sm md:p-8">
            <h3 className="text-lg font-bold text-text md:text-xl">Traditional Construction</h3>
            <ul className="mt-6 space-y-4">
              {prefabComparison.traditionalPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[14px] leading-relaxed text-text-muted md:text-[15px]">
                  <XIcon />
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-border pt-5 text-[13px] leading-relaxed text-text-muted md:text-sm">
              {prefabComparison.traditional}
            </p>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-[24px] border border-border p-6 shadow-md md:min-h-[480px] md:p-8">
            <SiteImage
              src={heroImage}
              alt="Prefab construction by Aronix Infra"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-dark/90 via-dark/75 to-primary/25" />

            <div className="relative">
              <div className="mb-1 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-xs font-bold text-text">
                  A
                </span>
                <h3 className="text-lg font-bold text-white md:text-xl">Prefab Construction</h3>
              </div>
              <ul className="mt-6 space-y-4">
                {prefabComparison.benefits.map((benefit) => {
                  const { title, desc } = parseBenefit(benefit);
                  return (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="text-[14px] leading-relaxed text-white/90 md:text-[15px]">
                        <strong className="font-semibold text-white">{title}</strong>
                        {desc && <span className="text-white/75"> — {desc}</span>}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
