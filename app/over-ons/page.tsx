"use client";

import Link from "next/link";
import { useLanguage } from "@/app/providers";

export default function OverOnsPage() {
  const { language } = useLanguage();
  const isNl = language === "nl";

  const content = {
    label: isNl ? "Over ons" : "About us",
    title: isNl
      ? "Lubano Group is gebouwd voor bedrijven die waarde hechten aan kwaliteit, duidelijkheid en controle."
      : "Lubano Group is built for businesses that value quality, clarity and control.",
    intro: isNl
      ? "Wij richten ons volledig op één kernactiviteit: het professioneel leveren van leads aan bedrijven. Geen marktplaats, geen overbodige tussenlagen en geen onduidelijk systeem — alleen een strakke omgeving waarin zakelijke klanten hun leadleveringen veilig kunnen ontvangen en direct kunnen inzetten."
      : "We focus entirely on one core activity: professionally delivering leads to businesses. No marketplace, no unnecessary layers and no vague system — just a structured environment where business clients can securely receive their lead deliveries and use them immediately.",

    storyLabel: isNl ? "Onze visie" : "Our vision",
    storyTitle: isNl
      ? "Leadlevering moet professioneel aanvoelen."
      : "Lead delivery should feel professional.",
    storyText: isNl
      ? "Veel bedrijven willen leads inkopen, maar lopen aan tegen ruis, onduidelijke kwaliteit of rommelige systemen. Lubano Group is opgezet om dat anders te doen. Wij geloven dat leadlevering net zo professioneel moet zijn als ieder ander zakelijk proces: helder, veilig en direct bruikbaar."
      : "Many businesses want to buy leads, but run into noise, unclear quality or messy systems. Lubano Group was created to do this differently. We believe lead delivery should be just as professional as any other business process: clear, secure and immediately usable.",

    missionLabel: isNl ? "Onze missie" : "Our mission",
    missionTitle: isNl
      ? "Bedrijven sneller laten schakelen met bruikbare leaddata."
      : "Helping businesses move faster with usable lead data.",
    missionText: isNl
      ? "Ons doel is simpel: bedrijven voorzien van hoogwaardige leads in een omgeving die vertrouwen uitstraalt. Daarom combineren we een premium klantportaal met een duidelijke leveringsstructuur, zodat klanten direct kunnen downloaden, verwerken en opvolgen."
      : "Our goal is simple: provide businesses with high-quality leads inside an environment that inspires trust. That is why we combine a premium client portal with a clear delivery structure, so clients can immediately download, process and follow up on their leads.",

    value1Title: isNl ? "Kwaliteit boven volume" : "Quality over volume",
    value1Text: isNl
      ? "Wij geloven dat de waarde van leadlevering niet zit in zoveel mogelijk data, maar in bruikbare commerciële kansen."
      : "We believe the value of lead delivery is not in delivering as much data as possible, but in delivering usable commercial opportunities.",

    value2Title: isNl ? "Duidelijkheid in levering" : "Clarity in delivery",
    value2Text: isNl
      ? "Klanten moeten exact weten wat ze ontvangen, wanneer het klaarstaat en hoe ze het kunnen inzetten."
      : "Clients should know exactly what they receive, when it is available and how they can use it.",

    value3Title: isNl ? "Zakelijke betrouwbaarheid" : "Business reliability",
    value3Text: isNl
      ? "Een professioneel platform hoort veilig, overzichtelijk en betrouwbaar te zijn. Dat is de standaard waarop Lubano gebouwd is."
      : "A professional platform should be secure, clear and reliable. That is the standard Lubano is built on.",

    platformLabel: isNl ? "Het platform" : "The platform",
    platformTitle: isNl
      ? "Een klantportaal dat doet wat nodig is."
      : "A client portal that does what is needed.",
    platformText: isNl
      ? "Het Lubano-portaal is bewust overzichtelijk gehouden. Klanten loggen in, zien uitsluitend hun eigen leadleveringen en downloaden die direct als CSV-bestand. Daarmee blijft de omgeving snel, professioneel en direct inzetbaar in bestaande salesprocessen."
      : "The Lubano portal is intentionally kept clear and focused. Clients log in, only see their own lead deliveries and download them directly as CSV files. This keeps the environment fast, professional and immediately usable in existing sales processes.",

    securityLabel: isNl ? "Vertrouwen & beveiliging" : "Trust & security",
    securityTitle: isNl
      ? "Data hoort beschermd te zijn."
      : "Data should be protected.",
    securityText: isNl
      ? "Leaddata is waardevol. Daarom werkt Lubano met beveiligde authenticatie, afgeschermde toegang en gescheiden data per klant. Iedere gebruiker ziet alleen de informatie die voor zijn account bedoeld is. Dat geeft vertrouwen, rust en professionele zekerheid."
      : "Lead data is valuable. That is why Lubano works with secure authentication, protected access and separated data per client. Every user only sees the information intended for their account. That creates trust, peace of mind and professional certainty.",

    stat1Label: isNl ? "Leadlevering" : "Lead delivery",
    stat1Value: isNl ? "Direct" : "Direct",
    stat2Label: isNl ? "Export" : "Export",
    stat2Value: "CSV",
    stat3Label: isNl ? "Toegang" : "Access",
    stat3Value: "24/7",
    stat4Label: isNl ? "Focus" : "Focus",
    stat4Value: "B2B",

    ctaLabel: isNl ? "Samenwerken" : "Work with us",
    ctaTitle: isNl
      ? "Zoek je een leadpartner met een professionele uitstraling?"
      : "Looking for a lead partner with a professional approach?",
    ctaText: isNl
      ? "Vraag een account aan of neem contact op met Lubano Group om de mogelijkheden te bespreken."
      : "Request an account or contact Lubano Group to discuss the possibilities.",
    primaryButton: isNl ? "Account aanvragen" : "Request account",
    secondaryButton: isNl ? "Contact opnemen" : "Contact us",
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

        {/* STORY + MISSION */}
        <section className="border-b border-zinc-200">
          <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 md:grid-cols-2 md:px-14">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
                {content.storyLabel}
              </p>
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-black md:text-4xl">
                {content.storyTitle}
              </h2>
              <p className="text-zinc-500 leading-8">{content.storyText}</p>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
                {content.missionLabel}
              </p>
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-black md:text-4xl">
                {content.missionTitle}
              </h2>
              <p className="text-zinc-500 leading-8">{content.missionText}</p>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="border-b border-zinc-200">
          <div className="mx-auto max-w-6xl px-8 py-20 md:px-14">
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
                {isNl ? "Waar wij voor staan" : "What we stand for"}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <ValueCard
                title={content.value1Title}
                text={content.value1Text}
              />
              <ValueCard
                title={content.value2Title}
                text={content.value2Text}
              />
              <ValueCard
                title={content.value3Title}
                text={content.value3Text}
              />
            </div>
          </div>
        </section>

        {/* PLATFORM */}
        <section className="border-b border-zinc-200">
          <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 md:grid-cols-2 md:px-14">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
                {content.platformLabel}
              </p>
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-black md:text-4xl">
                {content.platformTitle}
              </h2>
              <p className="text-zinc-500 leading-8">{content.platformText}</p>
            </div>

            <div className="rounded-[2rem] border border-zinc-200 bg-[#f8fafc] p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <StatCard
                  label={content.stat1Label}
                  value={content.stat1Value}
                />
                <StatCard
                  label={content.stat2Label}
                  value={content.stat2Value}
                />
                <StatCard
                  label={content.stat3Label}
                  value={content.stat3Value}
                />
                <StatCard
                  label={content.stat4Label}
                  value={content.stat4Value}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECURITY */}
        <section className="border-b border-zinc-200">
          <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 md:grid-cols-2 md:px-14">
            <div className="rounded-[2rem] border border-zinc-200 bg-[#f8fafc] p-8">
              <div className="space-y-4">
                <SecurityLine
                  text={isNl ? "Beveiligde login" : "Secure login"}
                />
                <SecurityLine
                  text={
                    isNl
                      ? "Afscherming per klantaccount"
                      : "Client-level access control"
                  }
                />
                <SecurityLine
                  text={
                    isNl
                      ? "Alleen eigen data zichtbaar"
                      : "Only own data visible"
                  }
                />
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
                    href="/contact"
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

function ValueCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-[#f8fafc] p-8">
      <h3 className="mb-3 text-xl font-semibold text-black">{title}</h3>
      <p className="text-zinc-500 leading-7">{text}</p>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <p className="mb-2 text-sm text-zinc-500">{label}</p>
      <p className="text-3xl font-semibold text-black">{value}</p>
    </div>
  );
}

function SecurityLine({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <p className="text-sm font-medium text-black">{text}</p>
    </div>
  );
}
