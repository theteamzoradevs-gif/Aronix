import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionBadge";

export function ImpactStats() {
  return (
    <section className="about-cream pb-16 md:pb-24">
      <Container>
        <SectionHeader
          badge="Experience"
          title="Our impact in numbers"
          subtitle="Every number reflects the trust businesses place in Aronix Infra and the quality portable infrastructure we deliver every day."
          align="center"
        />

        <div className="mt-10 overflow-hidden rounded-[24px] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] md:mt-12">
          <div className="grid grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0">
            {site.impactStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center px-4 py-8 text-center md:px-6 md:py-10"
              >
                <span className="text-3xl font-bold text-text md:text-4xl lg:text-[42px]">
                  {stat.value}
                </span>
                <span className="mt-2 text-sm text-text-muted md:text-[15px]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
