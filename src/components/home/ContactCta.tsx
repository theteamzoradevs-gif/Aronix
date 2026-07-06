import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";
import { QuoteButton } from "@/components/products/QuoteButton";
import { CallNowButton } from "@/components/ui/CallNowButton";
import { MotionReveal } from "@/components/motion/MotionReveal";

export function ContactCta() {
  const { contactCta } = site;

  return (
    <section className="relative min-h-[360px] overflow-hidden md:min-h-[400px]">
      <div className="absolute inset-0">
        <SiteImage
          src={site.heroImages[3]}
          alt="Aronix Infra team at work"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/70" />
      </div>

      <Container className="relative z-10 flex min-h-[360px] flex-col items-center justify-center px-4 py-12 text-center md:min-h-[400px] md:py-14">
        <MotionReveal>
          <p className="text-label text-accent">Free site consultation</p>
          <h2 className="mt-4 max-w-2xl font-display text-section-title text-white">
            {contactCta.title}
          </h2>
          <p className="mt-5 max-w-xl text-subheading font-medium text-white/80">
            Talk to our team — no obligation.
          </p>
          <p className="mt-2 max-w-xl text-description text-white/60">
            {contactCta.description}
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <QuoteButton variant="hero" paired>
              Get a Quote
            </QuoteButton>
            <CallNowButton paired />
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
