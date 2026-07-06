import { site } from "@/lib/data";
import { BrandSocialIconLink, brandSocialLinks, isImageSocialLink } from "@/components/ui/BrandSocialIcons";

export function HeaderSocialIcons() {
  return (
    <div className="flex items-center gap-2.5 border-l border-white/15 pl-4">
      {brandSocialLinks
        .filter(isImageSocialLink)
        .filter((item) => item.key === "linkedin" || item.key === "instagram")
        .map(({ key, label, src }) => (
          <BrandSocialIconLink key={key} href={site.social[key]} label={label} src={src} />
        ))}
    </div>
  );
}
