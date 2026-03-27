"use client";

import Link from "next/link";
import { useLanguage } from "@/app/providers";

export default function HoeWerktHetPage() {
  const { language } = useLanguage();
  const isNl = language === "nl";

  const content = {
    label: isNl ? "Hoe werkt het" : "How it works",
    title: isNl
      ? "Van accountaanvraag tot directe CSV-download in een helder proces."
      : "From account request to direct CSV download in one clear process.",
    intro: isNl
      ? "Lubano Group is gebouwd voor bedrijven die geen ingewikkeld systeem zoeken, maar een professionele en betrouwbare manier om leadleveringen te ontvangen. Ons proces is bewust eenvoudig gehouden: snel, veilig en volledig gericht op directe inzetbaarheid."
      : "Lubano Group is built for businesses that do not want a complicated system, but a professional and reliable way to receive lead deliveries. Our process is intentionally simple: fast, secure and fully focused on direct usability.",

    step1Label: isNl ? "Stap 1" : "Step 1",
    step1Title: isNl ? "Vraag een account aan" : "Request an account",
    step1Text: isNl
      ? "Bedrijven vragen een account aan via Lubano Group. Zo houden wij het platform gecontroleerd, professioneel en uitsluitend gericht op serieuze zakelijke gebruikers."
      : "Businesses request an account through Lubano Group. This allows us to keep the platform controlled, professional and exclusively focused on serious business users.",

    step2Label: isNl ? "Stap 2" : "Step 2",
    step2Title: isNl ? "Wij activeren jouw toegang" : "We activate your access",
    step2Text: isNl
      ? "Na goedkeuring koppelen wij jouw account aan de juiste leadleveringen. Hierdoor krijg je alleen toegang tot de data die voor jouw bedrijf bestemd is."
      : "After approval, we connect your account to the correct lead deliveries. This ensures that you only get access to the data intended for your business.",

    step3Label: isNl ? "Stap 3" : "Step 3",
    step3Title: isNl
      ? "Log veilig in op het portaal"
      : "Log in securely to the portal",
    step3Text: isNl
      ? "Via een beveiligde login krijg je toegang tot het klantportaal. Daar zie je uitsluitend jouw eigen leveringen, overzichtelijk en afgeschermd van andere klanten."
      : "Through a secure login, you gain access to the client portal. There, you only see your own deliveries, clearly organized and separated from other clients.",

    step4Label: isNl ? "Stap 4" : "Step 4",
    step4Title: isNl
      ? "Selecteer en download je leads"
      : "Select and download your leads",
    step4Text: isNl
      ? "In het portaal selecteer je eenvoudig de juiste periode en download je jouw leads direct als CSV-bestand. Zo kun je ze meteen verwerken in je eigen salesproces, CRM of belsoftware."
      : "Inside the portal, you can easily select the right period and download your leads directly as a CSV file. This allows you to process them immediately in your own sales process, CRM or calling software.",

    whyLabel: isNl ? "Waarom deze werkwijze" : "Why this workflow",
    whyTitle: isNl
      ? "Geen overbodige complexiteit, alleen een proces dat werkt."
      : "No unnecessary complexity, only a process that works.",
    whyText: isNl
      ? "Lubano is niet gebouwd als zware CRM-omgeving met onnodige functies. Wij richten ons op één ding: bedrijven snel en veilig toegang geven tot hun gekochte leads. Daardoor blijft het platform overzichtelijk, professioneel en direct bruikbaar."
      : "Lubano is not built as a heavy CRM environment filled with unnecessary features. We focus on one thing: giving businesses fast and secure access to their purchased leads. That keeps the platform clear, professional and immediately useful.",

    card1Title: isNl ? "Snelle levering" : "Fast delivery",
    card1Text: isNl
      ? "Leads staan direct klaar zodra ze aan jouw account gekoppeld zijn."
      : "Leads are ready immediately once they are connected to your account.",

    card2Title: isNl ? "Veilige toegang" : "Secure access",
    card2Text: isNl
      ? "Alleen de juiste klant ziet de juiste data, via afgeschermde toegang."
      : "Only the right client sees the right data, through protected access.",

    card3Title: isNl ? "Direct inzetbaar" : "Ready to use",
    card3Text: isNl
      ? "Download als CSV en gebruik je leads meteen in je eigen workflow."
      : "Download as CSV and use your leads immediately in your own workflow.",

    ctaLabel: isNl ? "Aan de slag" : "Get started",
    ctaTitle: isNl
      ? "Klaar om jouw leadleveringen professioneel te ontvangen?"
      : "Ready to receive your lead deliveries professionally?",
    ctaText: isNl
      ? "Vraag een account aan of log direct in op het klantportaal van Lubano Group."
      : "Request an account or log directly into the Lubano Group client portal.",
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

        {/* STAPPEN */}
        <section className="border-b border-zinc-200">
          <div className="mx-auto max-w-6xl px-8 py-20 md:px-14">
            <div className="grid gap-6 lg:grid-cols-2">
              <StepCard
                label={content.step1Label}
                title={content.step1Title}
                text={content.step1Text}
              />
              <StepCard
                label={content.step2Label}
                title={content.step2Title}
                text={content.step2Text}
              />
              <StepCard
                label={content.step3Label}
                title={content.step3Title}
                text={content.step3Text}
              />
              <StepCard
                label={content.step4Label}
                title={content.step4Title}
                text={content.step4Text}
              />
            </div>
          </div>
        </section>

        {/* UITLEG */}
        <section className="border-b border-zinc-200">
          <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 md:grid-cols-2 md:px-14">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
                {content.whyLabel}
              </p>
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-black md:text-4xl">
                {content.whyTitle}
              </h2>
            </div>

            <div>
              <p className="text-zinc-500 leading-8">{content.whyText}</p>
            </div>
          </div>
        </section>

        {/* 3 INFO CARDS */}
        <section className="border-b border-zinc-200">
          <div className="mx-auto max-w-6xl px-8 py-20 md:px-14">
            <div className="grid gap-6 md:grid-cols-3">
              <InfoCard title={content.card1Title} text={content.card1Text} />
              <InfoCard title={content.card2Title} text={content.card2Text} />
              <InfoCard title={content.card3Title} text={content.card3Text} />
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

function StepCard({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-[#f8fafc] p-8">
      <p className="mb-4 text-sm text-zinc-500">{label}</p>
      <h3 className="mb-3 text-2xl font-semibold text-black">{title}</h3>
      <p className="text-zinc-500 leading-8">{text}</p>
    </div>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-[#f8fafc] p-8">
      <h3 className="mb-3 text-xl font-semibold text-black">{title}</h3>
      <p className="text-zinc-500 leading-7">{text}</p>
    </div>
  );
}
