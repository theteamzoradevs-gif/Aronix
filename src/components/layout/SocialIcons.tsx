import { site } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  BrandSocialIconLink,
  FacebookSocialIconLink,
  brandSocialLinks,
  isImageSocialLink,
} from "@/components/ui/BrandSocialIcons";

export function SocialIcons({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {brandSocialLinks.map((item) =>
        isImageSocialLink(item) ? (
          <BrandSocialIconLink
            key={item.key}
            href={site.social[item.key]}
            label={item.label}
            src={item.src}
            imageClassName={item.key === "instagram" ? "scale-110" : undefined}
          />
        ) : (
          <FacebookSocialIconLink key={item.key} href={site.social.facebook} />
        )
      )}
    </div>
  );
}
