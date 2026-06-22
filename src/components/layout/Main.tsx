"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Main({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main className={cn(!isHome && "pt-[72px] md:pt-[80px]")}>{children}</main>
  );
}
