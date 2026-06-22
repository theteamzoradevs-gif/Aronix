import { cn } from "@/lib/utils";

function FlameIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("h-3.5 w-3.5 text-accent", className)} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 23c-3.9 0-7-3.1-7-7 0-2.5 1.4-4.7 3.5-5.9C7.5 8.5 8.5 6 10 4c.5 2 2 3.5 4 4-1-2.5-.5-5 1.5-7 3.5 2.5 5.5 6.5 5.5 11 0 3.9-3.1 7-7 7z" />
    </svg>
  );
}

export function SectionBadge({
  children,
  variant = "light",
  className,
}: {
  children: React.ReactNode;
  variant?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest",
        variant === "light"
          ? "border-border bg-white text-text-muted"
          : "border-white/20 bg-white/10 text-white",
        className
      )}
    >
      <FlameIcon />
      {children}
    </div>
  );
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "left",
  badgeVariant = "light",
}: {
  badge: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  badgeVariant?: "light" | "dark";
}) {
  const centered = align === "center";

  return (
    <div className={cn(centered && "text-center")}>
      <SectionBadge variant={badgeVariant} className={cn(centered && "mx-auto")}>
        {badge}
      </SectionBadge>
      <h2
        className={cn(
          "text-[28px] font-bold leading-tight tracking-tight md:text-[36px] lg:text-[40px]",
          badgeVariant === "dark" ? "text-white" : "text-text"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-[15px] leading-relaxed md:text-base",
            centered && "mx-auto",
            badgeVariant === "dark" ? "text-white/70" : "text-text-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
