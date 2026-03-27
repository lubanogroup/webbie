"use client";

import { useLanguage } from "@/app/providers";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed right-6 top-1/2 z-50 -translate-y-1/2">
      <div className="rounded-2xl border border-zinc-800 bg-black/90 p-2 shadow-2xl backdrop-blur">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setLanguage("nl")}
            className={`min-w-[64px] rounded-xl px-4 py-3 text-sm font-medium transition ${
              language === "nl"
                ? "bg-white text-black"
                : "text-white hover:bg-zinc-900"
            }`}
          >
            NL
          </button>

          <button
            onClick={() => setLanguage("en")}
            className={`min-w-[64px] rounded-xl px-4 py-3 text-sm font-medium transition ${
              language === "en"
                ? "bg-white text-black"
                : "text-white hover:bg-zinc-900"
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
}
