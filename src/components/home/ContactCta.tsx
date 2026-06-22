import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";
import { QuoteButton } from "@/components/products/QuoteButton";

export function ContactCta() {
  const { contactCta } = site;

  return (
    <section className="relative min-h-[520px] overflow-hidden md:min-h-[580px] lg:min-h-[620px]">
      <div className="absolute inset-0">
        <SiteImage
          src={site.heroImages[1]}
          alt="Aronix Infra team at work"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <Container className="relative z-10 flex min-h-[520px] flex-col items-center justify-center px-4 py-20 text-center md:min-h-[580px] md:py-24 lg:min-h-[620px]">
        <h2 className="max-w-2xl text-[28px] font-bold leading-tight text-white md:text-4xl lg:text-[42px]">
          {contactCta.title}
        </h2>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/80 md:text-base">
          {contactCta.description}
        </p>
        <div className="mt-10">
          <QuoteButton variant="hero">Request quote</QuoteButton>
        </div>
      </Container>
    </section>
  );
}
