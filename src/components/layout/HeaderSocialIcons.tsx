import { site } from "@/lib/data";
import { BrandSocialIconLink, LinkedInBrandIcon, InstagramBrandIcon } from "@/components/ui/BrandSocialIcons";

export function HeaderSocialIcons() {
  return (
    <div className="flex items-center gap-3 border-l border-white/15 pl-4">
      <BrandSocialIconLink
        href={site.social.linkedin}
        label="LinkedIn"
        icon={LinkedInBrandIcon}
        className="h-8 w-8"
        iconClassName="h-[22px] w-[22px]"
      />
      <BrandSocialIconLink
        href={site.social.instagram}
        label="Instagram"
        icon={InstagramBrandIcon}
        className="h-8 w-8"
        iconClassName="h-[22px] w-[22px]"
      />
    </div>
  );
}
