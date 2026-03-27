"use client";

import Link from "next/link";
import { useLanguage } from "@/app/providers";

export default function ContactPage() {
  const { language } = useLanguage();
  const isNl = language === "nl";

  const content = {
    label: isNl ? "Contact" : "Contact",
    title: isNl
      ? "Neem contact op met Lubano Group."
      : "Get in touch with Lubano Group.",
    intro: isNl
      ? "Heb je vragen over onze leadleveringen, het klantportaal of de mogelijkheden voor jouw bedrijf? Neem contact met ons op. Wij helpen je graag verder met een heldere en professionele aanpak."
      : "Do you have questions about our lead deliveries, the client portal or the possibilities for your business? Get in touch with us. We are happy to help with a clear and professional approach.",

    leftLabel: isNl ? "Direct contact" : "Direct contact",
    leftTitle: isNl
      ? "Een zakelijke leadpartner vraagt om duidelijke communicatie."
      : "A professional lead partner requires clear communication.",
    leftText: isNl
      ? "Bij Lubano Group geloven we dat bereikbaarheid en duidelijkheid net zo belangrijk zijn als de kwaliteit van de leads zelf. Daarom houden we onze communicatie overzichtelijk, snel en professioneel."
      : "At Lubano Group, we believe accessibility and clarity are just as important as the quality of the leads themselves. That is why we keep our communication structured, fast and professional.",

    infoTitle: isNl ? "Contactgegevens" : "Contact details",
    emailLabel: isNl ? "E-mailadres" : "Email address",
    websiteLabel: isNl ? "Website" : "Website",
    responseLabel: isNl ? "Reactietijd" : "Response time",

    responseValue: isNl
      ? "Zo snel mogelijk op werkdagen"
      : "As quickly as possible on business days",

    supportLabel: isNl ? "Ondersteuning" : "Support",
    supportTitle: isNl
      ? "Waarmee kunnen we helpen?"
      : "What can we help you with?",
    supportText: isNl
      ? "Of het nu gaat om toegang tot het portaal, leadleveringen, accountaanvragen of algemene zakelijke vragen — wij zorgen voor een professionele opvolging."
      : "Whether it concerns portal access, lead deliveries, account requests or general business questions — we provide professional follow-up.",

    item1: isNl
      ? "Vragen over leadleveringen"
      : "Questions about lead deliveries",
    item2: isNl ? "Hulp bij accounttoegang" : "Help with account access",
    item3: isNl ? "Zakelijke samenwerking" : "Business cooperation",

    ctaLabel: isNl ? "Klaar om te starten?" : "Ready to get started?",
    ctaTitle: isNl
      ? "Vraag direct een account aan voor toegang tot het Lubano-portaal."
      : "Request an account directly to access the Lubano portal.",
    ctaText: isNl
      ? "Wil je gebruikmaken van een professionele omgeving waarin jouw leadleveringen veilig en overzichtelijk beschikbaar zijn? Vraag dan een account aan."
      : "Would you like to use a professional environment where your lead deliveries are securely and clearly available? Then request an account.",
    primaryButton: isNl ? "Account aanvragen" : "Request account",
    secondaryButton: isNl ? "Klant login" : "Client login",
  };

  return (
    <main className="px-6 py-10 md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
        {/* HERO */}
        <section className="border-b border-zinc-200">
          <div className="mx-auto max-w-6xl px-8 py-16 md:px-14 md:py-20">
            <div className="max-w-4xl">
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-zinc-500">
                {content.label}
              </p>

              <h1 className="mb-6 text-5xl font-semibold leading-tight tracking-tight text-black md:text-7xl">
                {content.title}
              </h1>

              <p className="max-w-3xl text-lg leading-8 text-zinc-500">
                {content.intro}
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT + INFO */}
        <section className="border-b border-zinc-200">
          <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 md:grid-cols-2 md:px-14">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
                {content.leftLabel}
              </p>
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-black md:text-4xl">
                {content.leftTitle}
              </h2>
              <p className="text-zinc-500 leading-8">{content.leftText}</p>
            </div>

            <div className="rounded-[2rem] border border-zinc-200 bg-[#f8fafc] p-8">
              <p className="mb-6 text-sm font-semibold text-black">
                {content.infoTitle}
              </p>

              <div className="space-y-4">
                <InfoRow
                  label={content.emailLabel}
                  value="info@lubano-group.com"
                />
                <InfoRow
                  label={content.websiteLabel}
                  value="www.lubano-group.com"
                />
                <InfoRow
                  label={content.responseLabel}
                  value={content.responseValue}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUPPORT */}
        <section className="border-b border-zinc-200">
          <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 md:grid-cols-2 md:px-14">
            <div className="rounded-[2rem] border border-zinc-200 bg-[#f8fafc] p-8">
              <div className="space-y-4">
                <SupportLine text={content.item1} />
                <SupportLine text={content.item2} />
                <SupportLine text={content.item3} />
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
                {content.supportLabel}
              </p>
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-black md:text-4xl">
                {content.supportTitle}
              </h2>
              <p className="text-zinc-500 leading-8">{content.supportText}</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto max-w-6xl px-8 py-20 md:px-14">
            <div className="rounded-[2rem] border border-zinc-200 bg-[#f8fafc] p-10 md:p-14">
              <div className="max-w-3xl">
                <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
                  {content.ctaLabel}
                </p>

                <h2 className="mb-4 text-3xl font-semibold tracking-tight text-black md:text-5xl">
                  {content.ctaTitle}
                </h2>

                <p className="mb-8 text-zinc-500 leading-8">
                  {content.ctaText}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/account-aanvragen"
                    className="rounded-xl bg-[#2340a8] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    {content.primaryButton}
                  </Link>

                  <Link
                    href="/login"
                    className="rounded-xl border border-zinc-300 px-6 py-3 text-sm font-medium text-black transition hover:border-zinc-400 hover:bg-white"
                  >
                    {content.secondaryButton}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <p className="mb-1 text-sm text-zinc-500">{label}</p>
      <p className="text-base font-medium text-black">{value}</p>
    </div>
  );
}

function SupportLine({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <p className="text-sm font-medium text-black">{text}</p>
    </div>
  );
}
