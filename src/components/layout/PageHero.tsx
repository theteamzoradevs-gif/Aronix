import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function PageHero({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section
      className={cn(
        "section-band-light border-b border-border-light py-10 md:py-14",
        className
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
