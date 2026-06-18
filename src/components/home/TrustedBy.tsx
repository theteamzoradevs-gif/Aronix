import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";

const icons = ["🔒", "📈", "⭐", "⏱️"];

export function TrustedBy() {
  const { trustedBy } = site;

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-text md:text-3xl">{trustedBy.title}</h2>
          <span className="section-heading-underline" />
          <p className="mt-6 text-[15px] leading-relaxed text-text-light">{trustedBy.intro}</p>
        </div>
        <h4 className="mt-10 mb-6 text-center text-lg font-semibold text-text">
          Why Businesses Choose Us:
        </h4>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustedBy.advantages.map((item, i) => (
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
