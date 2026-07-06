"use client";

import { site } from "@/lib/data";
import { WhatsAppSocialIconLink, BrandSocialIconLink, brandSocialLinks } from "@/components/ui/BrandSocialIcons";
import { formatPhoneDisplay } from "./TopBar";

export function FooterSocialIcons() {
  return (
    <div className="flex flex-nowrap items-center justify-center gap-2.5 overflow-x-auto max-md:py-0.5 md:ml-auto md:justify-end">
      <a
        href={`tel:${site.phone}`}
        className="shrink-0 rounded-lg px-1.5 py-1.5 text-xs font-semibold text-accent transition-colors hover:text-accent/90 sm:px-2 sm:text-sm"
      >
        {formatPhoneDisplay(site.phone)}
      </a>
      <WhatsAppSocialIconLink href={`https://wa.me/${site.whatsapp}`} />
      <span className="mx-0.5 h-4 w-px shrink-0 bg-white/20" aria-hidden />
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
