"use client";

import { site } from "@/lib/data";
import {
  BrandSocialIconLink,
  FacebookSocialIconLink,
  WhatsAppSocialIconLink,
  brandSocialLinks,
  isImageSocialLink,
} from "@/components/ui/BrandSocialIcons";
import { formatPhoneDisplay } from "./TopBar";

export function FooterSocialIcons() {
  return (
    <div className="flex flex-nowrap items-center justify-center gap-1.5 max-md:py-0.5 sm:gap-2.5 md:ml-auto md:justify-end">
      <a
        href={`tel:${site.phone}`}
        className="shrink-0 rounded-lg px-1 py-1.5 text-xs font-semibold text-accent transition-colors hover:text-accent/90 sm:px-2 sm:text-sm"
      >
        {formatPhoneDisplay(site.phone)}
      </a>
      <WhatsAppSocialIconLink href={`https://wa.me/${site.whatsapp}`} />
      <span className="h-4 w-px shrink-0 bg-white/20 sm:mx-0.5" aria-hidden />
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
