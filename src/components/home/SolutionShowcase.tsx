import Link from "next/link";
import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { SiteImage } from "@/components/ui/SiteImage";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { cn } from "@/lib/utils";

const showcaseCategories = site.productCategories.slice(0, 4);

export function SolutionShowcase() {
  return (
    <section className="section-editorial section-white">
      <Container>
        <MotionReveal>
          <EditorialHeader
            label="End-to-end solutions"
            title="Portable infrastructure for every site need"
            subtitle="From site offices to guard cabins and shipping containers."
            description="Manufactured at our Greater Noida facility and delivered ready to deploy across India."
            align="center"
            className="mx-auto max-w-3xl"
            prominentLabel
          />
        </MotionReveal>
      </Container>

      <div className="mt-16 space-y-20 md:space-y-28">
        {showcaseCategories.map((cat, index) => {
          const imageRight = index % 2 === 1;
          return (
            <Container key={cat.id}>
              <div
                className={cn(
                  "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
                  imageRight && "lg:[&>*:first-child]:order-2"
                )}
              >
                <MotionReveal direction={imageRight ? "right" : "left"}>
                  <div className="relative overflow-hidden rounded-3xl bg-surface shadow-[var(--shadow-card)]">
                    <div className="relative aspect-[5/4] w-full">
                      <SiteImage
                        src={cat.image}
                        alt={cat.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 560px"
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                </MotionReveal>

                <MotionReveal direction={imageRight ? "left" : "right"}>
                  <div className={cn("flex flex-col", imageRight ? "lg:pr-4" : "lg:pl-4")}>
                    <p className="text-label text-primary">{cat.useCase}</p>
                    <h3 className="mt-3 font-display text-section-title text-ink">{cat.title}</h3>
                    <p className="mt-4 text-subheading font-medium text-ink/85">{cat.description}</p>

                    <ul className="mt-6 space-y-3">
                      {cat.specSummary && (
                        <li className="flex items-start gap-3 text-description text-text">
                          <CheckIcon />
                          {cat.specSummary}
                        </li>
                      )}
                      <li className="flex items-start gap-3 text-description text-text">
                        <CheckIcon />
                        7–15 day manufacturing & delivery
                      </li>
                    </ul>

                    <Link
                      href={cat.href}
                      className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink"
                    >
                      Explore solutions
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </MotionReveal>
              </div>
            </Container>
          );
        })}
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}
