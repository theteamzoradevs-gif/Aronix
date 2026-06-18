import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "primary" | "ghost";
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
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium transition-all",
    variant === "outline" && "quote-btn",
    variant === "primary" && "bg-primary text-white hover:bg-[#0201cc]",
    variant === "ghost" && "bg-transparent text-text-muted hover:text-primary",
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
