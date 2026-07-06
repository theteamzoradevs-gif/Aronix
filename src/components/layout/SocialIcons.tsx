import { site } from "@/lib/data";
import { cn } from "@/lib/utils";
import { BrandSocialIconLink, brandSocialLinks } from "@/components/ui/BrandSocialIcons";

export function SocialIcons({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {brandSocialLinks.map(({ key, label, src, imageClassName }) => (
        <BrandSocialIconLink
          key={key}
          href={site.social[key]}
          label={label}
          src={src}
          imageClassName={imageClassName}
        />
      ))}
    </div>
  );
}
