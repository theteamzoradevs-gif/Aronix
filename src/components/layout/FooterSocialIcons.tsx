"use client";

import { site } from "@/lib/data";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { BrandSocialIconLink, brandSocialLinks } from "@/components/ui/BrandSocialIcons";
import { formatPhoneDisplay } from "./TopBar";

export function FooterSocialIcons() {
  return (
    <div className="flex flex-nowrap items-center justify-center gap-1.5 overflow-x-auto max-md:py-0.5 sm:gap-2 md:ml-auto md:justify-end">
      <a
        href={`tel:${site.phone}`}
        className="shrink-0 rounded-lg px-1.5 py-1.5 text-xs font-semibold text-accent transition-colors hover:text-accent/90 sm:px-2 sm:text-sm"
      >
        {formatPhoneDisplay(site.phone)}
      </a>
      <a
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#25D366] transition-transform hover:scale-110 sm:h-10 sm:w-10"
        aria-label="WhatsApp"
      >
        <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </a>
      <span className="mx-0.5 h-4 w-px shrink-0 bg-white/20" aria-hidden />
      {brandSocialLinks.map(({ key, label, icon }) => (
        <BrandSocialIconLink
          key={key}
          href={site.social[key]}
          label={label}
          icon={icon}
          className="h-9 w-9 sm:h-10 sm:w-10"
          iconClassName="h-5 w-5 sm:h-[22px] sm:w-[22px]"
        />
      ))}
    </div>
  );
}
