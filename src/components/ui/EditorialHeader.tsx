import { cn } from "@/lib/utils";

const prominentLabelTypography = {
  label: "!normal-case !tracking-tight !text-[22px] !font-bold md:!text-[28px] lg:!text-[32px]",
  title: "!mt-3 !text-[15px] !font-medium !leading-snug md:!text-[17px] lg:!text-[18px]",
  subtitle: "!mt-2 !text-[13px] !font-normal !leading-relaxed md:!mt-2.5 md:!text-[14px]",
} as const;

interface EditorialHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  labelClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
  dark?: boolean;
  compact?: boolean;
  prominentLabel?: boolean;
}
export function EditorialHeader({
  label,
  title,
  subtitle,
  description,
  align = "left",
  className,
  labelClassName,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
  dark = false,
  compact = false,
  prominentLabel = false,
}: EditorialHeaderProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {label && (
        <p
          className={cn(
            "text-label",
            dark ? "text-accent/90" : "text-primary",
            prominentLabel && prominentLabelTypography.label,
            prominentLabel && (dark ? "text-white" : "text-ink"),
            labelClassName
          )}
        >
          {label}
        </p>
      )}
      <h2
        className={cn(
          compact ? "mt-2" : "mt-3",
          "font-display text-section-title tracking-tight",
          dark ? "text-white" : "text-ink",
          prominentLabel && prominentLabelTypography.title,
          prominentLabel && (dark ? "text-white/75" : "text-text-muted"),
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            compact ? "mt-2" : "mt-4",
            "text-subheading",
            align === "center" && "mx-auto",
            dark ? "text-white/75" : "text-text-muted",
            "max-w-2xl",
            prominentLabel && prominentLabelTypography.subtitle,
            prominentLabel && (dark ? "text-white/60" : "text-text-muted/85"),
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
      {description && (
        <p
          className={cn(
            "mt-1.5 text-body-sm leading-relaxed",
            align === "center" && "mx-auto",
            dark ? "text-white/45" : "text-text-muted/80",
            "max-w-2xl",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
