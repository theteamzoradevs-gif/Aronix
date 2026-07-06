import { site } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  BrandSocialIconLink,
  FacebookSocialIconLink,
  brandSocialLinks,
} from "@/components/ui/BrandSocialIcons";

export function SocialIcons({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {brandSocialLinks.map((item) =>
        item.key === "facebook" ? (
          <FacebookSocialIconLink key={item.key} href={site.social.facebook} />
        ) : (
          <BrandSocialIconLink
            key={item.key}
            href={site.social[item.key]}
            label={item.label}
            src={item.src}
          />
        )
      )}
    </div>
  );
}
