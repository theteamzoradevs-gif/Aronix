import { site } from "@/lib/data";
import { cn } from "@/lib/utils";
import { BrandSocialIconLink, brandSocialLinks } from "@/components/ui/BrandSocialIcons";

export function SocialIcons({
  className,
  iconClassName = "h-5 w-5",
  linkClassName,
}: {
  className?: string;
  iconClassName?: string;
  linkClassName?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {brandSocialLinks.map(({ key, label, icon }) => (
        <BrandSocialIconLink
          key={key}
          href={site.social[key]}
          label={label}
          icon={icon}
          iconClassName={iconClassName}
          className={cn("h-9 w-9", linkClassName)}
        />
      ))}
    </div>
  );
}
