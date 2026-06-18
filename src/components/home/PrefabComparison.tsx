import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function PrefabComparison() {
  const { prefabComparison } = site;

  return (
    <section className="bg-[#f8f9ff] py-12 md:py-16">
      <Container>
        <SectionHeading>{prefabComparison.title}</SectionHeading>
        <p className="mx-auto mb-8 max-w-3xl text-center text-[15px] text-text-light">
          {prefabComparison.intro}
        </p>
        <div className="mx-auto max-w-2xl">
          <ul className="space-y-3">
            {prefabComparison.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-[15px] text-text-light">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                {benefit}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] text-text-muted">{prefabComparison.traditional}</p>
        </div>
      </Container>
    </section>
  );
}
