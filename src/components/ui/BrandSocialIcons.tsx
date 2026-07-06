"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const socialIconAssets = {
  facebook: "/assets/brand/social/facebook.png",
  instagram: "/assets/brand/social/instagram.png",
  linkedin: "/assets/brand/social/linkedin.png",
  twitter: "/assets/brand/social/x.png",
} as const;

/** Shared 32px circle size for every social icon across the site. */
export const SOCIAL_ICON_CLASS = "size-8 min-h-8 min-w-8 max-h-8 max-w-8 shrink-0";

export const brandSocialLinks = [
  {
    key: "facebook" as const,
    label: "Facebook",
    src: socialIconAssets.facebook,
    imageClassName: "scale-[0.88]",
  },
  { key: "instagram" as const, label: "Instagram", src: socialIconAssets.instagram },
  { key: "linkedin" as const, label: "LinkedIn", src: socialIconAssets.linkedin },
  { key: "twitter" as const, label: "X (Twitter)", src: socialIconAssets.twitter },
];

function SocialIconShell({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "inline-flex items-center justify-center overflow-hidden rounded-full transition-opacity hover:opacity-85",
        SOCIAL_ICON_CLASS,
        className
      )}
    >
      {children}
    </a>
  );
}

export function BrandSocialIconLink({
  href,
  label,
  src,
  className,
  imageClassName,
}: {
  href: string;
  label: string;
  src: string;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <SocialIconShell href={href} label={label} className={className}>
      <Image
        src={src}
        alt=""
        width={32}
        height={32}
        className={cn("block size-full object-cover object-center", imageClassName)}
        unoptimized
      />
    </SocialIconShell>
  );
}

export function WhatsAppSocialIconLink({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <SocialIconShell href={href} label="WhatsApp" className={cn("bg-[#25D366]", className)}>
      <WhatsAppIcon className="size-[18px] text-white" />
    </SocialIconShell>
  );
}
