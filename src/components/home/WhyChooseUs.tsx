import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = ["🚚", "✓", "🔧", "🗺️"];

export function WhyChooseUs() {
  const { whyChooseUs } = site;

  return (
    <section className="bg-[#f8f9ff] py-12 md:py-16">
      <Container>
        <SectionHeading>Why Choose Us</SectionHeading>
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-xl font-bold text-text md:text-2xl">{whyChooseUs.title}</h3>
          <p className="mt-4 text-[15px] leading-relaxed text-text-light">{whyChooseUs.intro}</p>
        </div>
        <h4 className="mt-10 mb-6 text-center text-lg font-semibold text-text">
          Our Key Advantages:
        </h4>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.advantages.map((item, i) => (
            <div
              key={item.title}
              className="rounded border border-border bg-white p-6 text-center shadow-[0_4px_14px_rgba(46,43,146,0.06)]"
            >
              <div className="mb-4 text-3xl">{icons[i]}</div>
              <h5 className="text-base font-bold text-text">{item.title}</h5>
              <p className="mt-2 text-sm text-text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
