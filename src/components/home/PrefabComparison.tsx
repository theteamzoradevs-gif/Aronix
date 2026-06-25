import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";

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
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function PrefabComparison() {
  const { prefabComparison } = site;

  return (
    <section className="section-padding section-band-light border-t border-border-light">
      <Container>
        <EditorialHeader
          label="Comparison"
          title={prefabComparison.title}
          subtitle={`${prefabComparison.intro} Aronix Infra manufactures every unit at our Greater Noida facility with committed 7–15 day delivery.`}
          align="center"
          className="mx-auto max-w-2xl"
          prominentLabel
        />

        <div className="mt-10 grid items-stretch gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
          <div className="rounded-[24px] border border-border-light bg-white p-6 shadow-[var(--shadow-soft)] md:p-8">
            <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-red-600">
              Traditional
            </span>
            <h3 className="mt-3 text-lg font-bold text-text md:text-xl">Brick & Mortar Construction</h3>
            <ul className="mt-6 space-y-4">
              {prefabComparison.traditionalPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[14px] leading-relaxed text-text-muted md:text-[15px]">
                  <XIcon />
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-border-light pt-5 text-[13px] leading-relaxed text-text-muted md:text-sm">
              {prefabComparison.traditional}
            </p>
          </div>

          <div className="rounded-[24px] border border-primary/20 bg-ink p-6 shadow-[var(--shadow-soft)] md:p-8">
            <span className="inline-block rounded-full bg-accent/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
              Aronix Prefab
            </span>
            <h3 className="mt-3 text-lg font-bold text-white md:text-xl">Factory-Built Portable Units</h3>
            <p className="mt-1 text-sm text-white/60">Site-ready in 7–15 days · Pan-India delivery</p>
            <ul className="mt-6 space-y-3.5">
              {prefabComparison.benefits.map((benefit) => {
                const { title, desc } = parseBenefit(benefit);
                return (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-[14px] leading-relaxed text-white/85 md:text-[15px]">
                      <strong className="font-semibold text-white">{title}</strong>
                      {desc && <span className="text-white/65"> — {desc}</span>}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
