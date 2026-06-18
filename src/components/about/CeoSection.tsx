import { site } from "@/lib/data";
import { SiteImage } from "@/components/ui/SiteImage";
import { Container } from "@/components/ui/Container";

export function CeoSection() {
  return (
    <section className="bg-[#f8f9ff] py-12 md:py-16">
      <Container>
        <h2 className="section-heading mb-8 text-center">Meet Our CEO</h2>
        <span className="section-heading-underline mx-auto mb-10 block" />
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded border border-border">
            <SiteImage
              src={site.ceo.image}
              alt={site.ceo.name}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-text">{site.ceo.name}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-text-light">{site.ceo.bio}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
