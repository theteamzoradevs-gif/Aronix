import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "primary" | "ghost" | "white";
  href?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "outline",
  className,
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 text-sm font-semibold transition-all",
    variant === "outline" && "quote-btn",
    variant === "primary" && "btn-primary",
    variant === "ghost" && "rounded-full bg-transparent px-5 py-2.5 text-text-muted hover:text-primary",
    variant === "white" &&
      "rounded-full border border-white/30 bg-white/10 px-6 py-3 text-white backdrop-blur-sm hover:bg-white hover:text-text",
    className
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
