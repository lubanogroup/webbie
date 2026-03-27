"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/providers";
import translations from "@/lib/translations";

export default function Navbar() {
  const { language } = useLanguage();
  const t = translations[language as "nl" | "en"];
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/over-ons", label: t.nav.about },
    { href: "/hoe-werkt-het", label: t.nav.howItWorks },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 bg-transparent">
      {/* CONTAINER */}
      <div className="w-full px-6 pt-6 flex items-center justify-between">
        {/* 🔹 LOGO LINKS */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Lubano Group"
            width={300}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        {/* 🔹 NAVBAR RECHTS */}
        <div className="flex justify-end w-full">
          <div className="w-fit rounded-full border border-zinc-200/60 bg-white/95 p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur">
            <div className="flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-6 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#2340a8] text-white"
                        : "text-[#2340a8] hover:bg-[#eef2ff]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <Link
                href="/account-aanvragen"
                className="ml-2 rounded-full border border-[#2340a8]/30 px-5 py-3 text-sm font-semibold text-[#2340a8] transition hover:bg-[#eef2ff]"
              >
                {t.nav.accountRequest}
              </Link>

              <Link
                href="/login"
                className="rounded-full bg-[#2340a8] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                {t.nav.login}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
