"use client";

import Link from "next/link";
import { useLanguage } from "@/app/providers";

export default function HomePage() {
  const { language } = useLanguage();

  const isNl = language === "nl";

  const content = {
    brand: "LUBANO GROUP",
    heroTitle: isNl
      ? "Premium lead delivery for businesses that want certainty."
      : "Premium lead delivery for businesses that want certainty.",
    heroDescription: isNl
      ? "Lubano Group helpt bedrijven groeien met hoogwaardige leads die direct inzetbaar zijn. Via ons klantportaal krijg je veilig toegang tot jouw gekochte leads en download je ze direct als CSV-bestand."
      : "Lubano Group helps businesses grow with high-quality leads that are ready to use. Through our client portal, you get secure access to your purchased leads and download them instantly as CSV files.",
    primaryButton: isNl ? "Account aanvragen" : "Request account",
    secondaryButton: isNl ? "Klant login" : "Client login",

    proofTitle: isNl
      ? "Gebouwd voor snelheid, duidelijkheid en vertrouwen."
      : "Built for speed, clarity and trust.",
    proofDescription: isNl
      ? "Geen onnodige ruis, geen ingewikkelde software en geen onduidelijke levering. Lubano is volledig ingericht voor bedrijven die leads willen inkopen, direct willen gebruiken en volledige controle willen houden over hun data."
      : "No unnecessary noise, no complex software and no vague delivery. Lubano is fully designed for businesses that want to buy leads, use them instantly and maintain full control over their data.",

    uspTitle: isNl
      ? "Waarom bedrijven voor Lubano kiezen"
      : "Why businesses choose Lubano",

    usp1Title: isNl ? "Alleen gekwalificeerde leads" : "Qualified leads only",
    usp1Text: isNl
      ? "Geen random of onbruikbare aanvragen, maar leads met echte commerciële intentie."
      : "No random or unusable requests, only leads with real commercial intent.",

    usp2Title: isNl ? "Direct als CSV beschikbaar" : "Instant CSV delivery",
    usp2Text: isNl
      ? "Leads staan direct voor je klaar in het portaal en zijn meteen te downloaden."
      : "Leads are immediately available in the portal and ready for download.",

    usp3Title: isNl ? "Veilig klantportaal" : "Secure client portal",
    usp3Text: isNl
      ? "Toegang via beveiligde login, afgeschermde data en duidelijke rechten per klant."
      : "Access through secure login, protected data and clear permissions per client.",

    usp4Title: isNl
      ? "Exclusieve en heldere levering"
      : "Exclusive and transparent delivery",
    usp4Text: isNl
      ? "Je weet wat je ontvangt, wanneer je het ontvangt en voor welk doel de leads geleverd zijn."
      : "You know what you receive, when you receive it and for what purpose the leads are delivered.",

    usp5Title: isNl ? "Gebouwd voor bedrijven" : "Built for businesses",
    usp5Text: isNl
      ? "Geen consumentensite of marktplaatsgevoel, maar een professioneel systeem voor B2B leadafname."
      : "Not a consumer marketplace feel, but a professional system for B2B lead purchasing.",

    portalLabel: isNl ? "Klantportaal" : "Client portal",
    portalTitle: isNl
      ? "Jouw leads, direct beschikbaar in één veilig portaal."
      : "Your leads, instantly available in one secure portal.",
    portalText: isNl
      ? "In het Lubano-portaal zie je uitsluitend de leads die aan jouw account gekoppeld zijn. Je selecteert eenvoudig de juiste periode en downloadt jouw levering direct als CSV-bestand. Geen overbodige CRM-functies, maar een snelle en duidelijke omgeving die doet wat nodig is."
      : "Inside the Lubano portal, you only see the leads connected to your account. Easily select the right period and download your delivery directly as a CSV file. No unnecessary CRM features, just a fast and clear environment that does exactly what is needed.",

    securityLabel: isNl ? "Beveiliging" : "Security",
    securityTitle: isNl
      ? "Leaddata vraagt om een professionele standaard."
      : "Lead data requires a professional standard.",
    securityText: isNl
      ? "Daarom is Lubano ingericht met veilige authenticatie, afgeschermde klanttoegang en gescheiden data per gebruiker. Klanten zien alleen hun eigen leveringen. Dat geeft rust, duidelijkheid en vertrouwen — precies wat je verwacht van een high-end leadplatform."
      : "That is why Lubano is built with secure authentication, protected client access and separated data per user. Clients only see their own deliveries. That creates peace of mind, clarity and trust — exactly what you expect from a high-end lead platform.",

    processTitle: isNl ? "Zo werkt het" : "How it works",
    process1: isNl ? "Je vraagt een account aan." : "You request an account.",
    process2: isNl
      ? "Wij koppelen je aan jouw leadleveringen."
      : "We connect your account to your lead deliveries.",
    process3: isNl
      ? "Je logt veilig in op het portaal."
      : "You securely log in to the portal.",
    process4: isNl
      ? "Je downloadt je leads direct als CSV."
      : "You download your leads directly as CSV.",

    ctaLabel: isNl ? "Start vandaag" : "Get started",
    ctaTitle: isNl
      ? "Een professioneel leadplatform voor bedrijven die direct willen schakelen."
      : "A professional lead platform for businesses that want to move fast.",
    ctaText: isNl
      ? "Vraag een account aan en ontvang toegang tot een veilige omgeving waarin jouw leadleveringen overzichtelijk klaarstaan."
      : "Request an account and get access to a secure environment where your lead deliveries are clearly prepared for you.",
  };

  const usps = [
    { title: content.usp1Title, text: content.usp1Text },
    { title: content.usp2Title, text: content.usp2Text },
    { title: content.usp3Title, text: content.usp3Text },
    { title: content.usp4Title, text: content.usp4Text },
    { title: content.usp5Title, text: content.usp5Text },
  ];

  return (
    <main className="px-6 py-10 md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
        {/* HERO */}
        <section className="border-b border-zinc-200">
          <div className="mx-auto max-w-6xl px-8 py-16 md:px-14 md:py-20">
            <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="max-w-3xl">
                <p className="mb-4 text-xs uppercase tracking-[0.3em] text-zinc-500">
                  {content.brand}
                </p>

                <h1 className="mb-6 text-5xl font-semibold leading-tight tracking-tight text-black md:text-7xl">
                  {content.heroTitle}
                </h1>

                <p className="mb-10 max-w-2xl text-lg leading-8 text-zinc-500">
                  {content.heroDescription}
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
                    className="rounded-xl border border-zinc-300 px-6 py-3 text-sm font-medium text-black transition hover:border-zinc-400 hover:bg-zinc-50"
                  >
                    {content.secondaryButton}
                  </Link>
                </div>
              </div>

              <div className="lg:pl-4">
                <div className="rounded-[2rem] border border-zinc-200 bg-[#f8fafc] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-black">
                        {content.portalLabel}
                      </p>
                      <p className="text-sm text-zinc-500">
                        {isNl ? "CSV levering" : "CSV delivery"}
                      </p>
                    </div>
                    <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      {isNl ? "Beveiligd" : "Secured"}
                    </div>
                  </div>

                  <div className="mb-5 rounded-2xl border border-zinc-200 bg-white p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-medium text-black">
                        {isNl ? "Levering overzicht" : "Delivery overview"}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {isNl ? "Laatste 30 dagen" : "Last 30 days"}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="rounded-xl border border-zinc-200 bg-[#f8fafc] px-4 py-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-black">
                            Jan Jansen
                          </span>
                          <span className="text-xs text-zinc-500">Airco</span>
                        </div>
                        <p className="mt-1 text-sm text-zinc-500">
                          jan@gmail.com
                        </p>
                      </div>

                      <div className="rounded-xl border border-zinc-200 bg-[#f8fafc] px-4 py-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-black">
                            Piet de Vries
                          </span>
                          <span className="text-xs text-zinc-500">
                            Laadpaal
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-zinc-500">
                          piet@gmail.com
                        </p>
                      </div>

                      <div className="rounded-xl border border-zinc-200 bg-[#f8fafc] px-4 py-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-black">
                            Lisa Bakker
                          </span>
                          <span className="text-xs text-zinc-500">Airco</span>
                        </div>
                        <p className="mt-1 text-sm text-zinc-500">
                          lisa@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4">
                    <div>
                      <p className="text-sm font-medium text-black">
                        {isNl ? "Export" : "Export"}
                      </p>
                      <p className="text-sm text-zinc-500">
                        {isNl
                          ? "Direct beschikbaar als CSV"
                          : "Instantly available as CSV"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#2340a8] px-4 py-2 text-sm font-semibold text-white">
                      CSV
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="border-b border-zinc-200">
          <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 md:grid-cols-2 md:px-14">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
                {isNl ? "Waarom Lubano" : "Why Lubano"}
              </p>
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-black md:text-4xl">
                {content.proofTitle}
              </h2>
            </div>

            <div>
              <p className="text-zinc-500 leading-8">
                {content.proofDescription}
              </p>
            </div>
          </div>
        </section>

        {/* 5 USP CARDS */}
        <section className="border-b border-zinc-200">
          <div className="mx-auto max-w-6xl px-8 py-20 md:px-14">
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
                {content.uspTitle}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {usps.map((usp, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-zinc-200 bg-[#f8fafc] p-8"
                >
                  <h3 className="mb-3 text-xl font-semibold text-black">
                    {usp.title}
                  </h3>
                  <p className="text-zinc-500 leading-7">{usp.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PORTAL STORY */}
        <section className="border-b border-zinc-200">
          <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 md:grid-cols-2 md:px-14">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
                {content.portalLabel}
              </p>
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-black md:text-4xl">
                {content.portalTitle}
              </h2>
              <p className="text-zinc-500 leading-8">{content.portalText}</p>
            </div>

            <div className="rounded-[2rem] border border-zinc-200 bg-[#f8fafc] p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                  <p className="mb-2 text-sm text-zinc-500">
                    {isNl ? "Formaat" : "Format"}
                  </p>
                  <p className="text-3xl font-semibold text-black">CSV</p>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                  <p className="mb-2 text-sm text-zinc-500">
                    {isNl ? "Toegang" : "Access"}
                  </p>
                  <p className="text-3xl font-semibold text-black">24/7</p>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                  <p className="mb-2 text-sm text-zinc-500">
                    {isNl ? "Selectie" : "Selection"}
                  </p>
                  <p className="text-lg font-semibold text-black">
                    {isNl ? "Per periode" : "By period"}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                  <p className="mb-2 text-sm text-zinc-500">
                    {isNl ? "Gebruik" : "Usage"}
                  </p>
                  <p className="text-lg font-semibold text-black">
                    {isNl ? "Direct inzetbaar" : "Ready to use"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECURITY */}
        <section className="border-b border-zinc-200">
          <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 md:grid-cols-2 md:px-14">
            <div className="rounded-[2rem] border border-zinc-200 bg-[#f8fafc] p-8">
              <div className="space-y-4">
                <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                  <p className="text-sm font-medium text-black">
                    {isNl ? "Veilige login" : "Secure login"}
                  </p>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                  <p className="text-sm font-medium text-black">
                    {isNl ? "Afscherming per klant" : "Client-level isolation"}
                  </p>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                  <p className="text-sm font-medium text-black">
                    {isNl
                      ? "Alleen eigen data zichtbaar"
                      : "Only own data visible"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
                {content.securityLabel}
              </p>
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-black md:text-4xl">
                {content.securityTitle}
              </h2>
              <p className="text-zinc-500 leading-8">{content.securityText}</p>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="border-b border-zinc-200">
          <div className="mx-auto max-w-6xl px-8 py-20 md:px-14">
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
                {content.processTitle}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              <ProcessCard number="01" text={content.process1} />
              <ProcessCard number="02" text={content.process2} />
              <ProcessCard number="03" text={content.process3} />
              <ProcessCard number="04" text={content.process4} />
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

function ProcessCard({ number, text }: { number: string; text: string }) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-[#f8fafc] p-8">
      <p className="mb-4 text-sm text-zinc-500">{number}</p>
      <p className="text-lg font-semibold leading-7 text-black">{text}</p>
    </div>
  );
}
