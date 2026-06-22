import { cn } from "@/lib/utils";

export function CtaBand({
  title,
  description,
  children,
  variant = "dark",
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  variant?: "dark" | "light";
  className?: string;
}) {
  return (
    <section
      className={cn(
        variant === "dark" ? "bg-dark text-white" : "bg-surface text-text",
        className
      )}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 px-4 py-12 text-center md:flex-row md:px-6 md:py-16 md:text-left">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
          {description && (
            <p
              className={cn(
                "mt-3 text-[15px] leading-relaxed",
                variant === "dark" ? "text-gray-300" : "text-text-muted"
              )}
            >
              {description}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
          {children}
        </div>
      </div>
    </section>
  );
}
