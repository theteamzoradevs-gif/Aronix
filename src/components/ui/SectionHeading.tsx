import { cn } from "@/lib/utils";

export function SectionHeading({
  children,
  className,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={cn("mb-8 text-center md:mb-10", className)}>
      <Tag className="section-heading">{children}</Tag>
      <span className="section-heading-underline" />
    </div>
  );
}
