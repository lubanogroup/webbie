"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function LayoutChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isPortalRoute =
    pathname === "/portal" || pathname.startsWith("/portal/");

  return (
    <>
      {!isPortalRoute && <Navbar />}
      {!isPortalRoute && <LanguageSwitcher />}
      <main>{children}</main>
    </>
  );
}
