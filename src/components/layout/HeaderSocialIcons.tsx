import { site } from "@/lib/data";
import {
  BrandSocialIconLink,
  InstagramBrandIcon,
  LinkedInBrandIcon,
} from "@/components/ui/BrandSocialIcons";

export function HeaderSocialIcons() {
  return (
    <div className="flex items-center gap-2.5 border-l border-white/15 pl-4">
      <BrandSocialIconLink
        href={site.social.linkedin}
        label="LinkedIn"
        icon={LinkedInBrandIcon}
        className="h-8 w-8"
      />
      <BrandSocialIconLink
        href={site.social.instagram}
        label="Instagram"
        icon={InstagramBrandIcon}
        className="h-8 w-8"
      />
    </div>
  );
}
