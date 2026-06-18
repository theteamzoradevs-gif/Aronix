import { site } from "@/lib/data";
import { SiteImage } from "@/components/ui/SiteImage";
import { Container } from "@/components/ui/Container";

export function CompanyAlbum() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <h2 className="section-heading mb-8 text-center">Company Album</h2>
        <span className="section-heading-underline mx-auto mb-10 block" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {site.albumImages.map((img, i) => (
            <div key={i} className="overflow-hidden rounded border border-border">
              <SiteImage src={img} alt={`Company album ${i + 1}`} className="aspect-square w-full object-cover" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
