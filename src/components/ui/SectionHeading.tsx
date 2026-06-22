import { cn } from "@/lib/utils";
import { SectionLabel } from "./SectionLabel";

export function SectionHeading({
  children,
  label,
  subtitle,
  className,
  align = "center",
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  label?: string;
  subtitle?: string;
  className?: string;
  align?: "center" | "left";
  as?: "h1" | "h2" | "h3";
}) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "mb-10 md:mb-12",
        isCenter ? "text-center" : "text-left",
        className
      )}
    >
      {label && (
        <SectionLabel className={cn(!isCenter && "text-left")}>{label}</SectionLabel>
      )}
      <Tag className={cn("section-heading", !isCenter && "text-left")}>{children}</Tag>
      <span className={cn("section-heading-underline", !isCenter && "mx-0")} />
      {subtitle && (
        <p className={cn("section-subheading", !isCenter && "mx-0 text-left")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
