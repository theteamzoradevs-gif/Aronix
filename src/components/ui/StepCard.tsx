import { cn } from "@/lib/utils";

export function StepCard({
  step,
  title,
  desc,
  className,
}: {
  step: string;
  title: string;
  desc: string;
  className?: string;
}) {
  return (
    <div className={cn("card-surface p-6 md:p-8", className)}>
      <span className="text-3xl font-bold text-primary/20">{step}</span>
      <h3 className="mt-3 text-lg font-bold text-text">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-[15px]">{desc}</p>
    </div>
  );
}
