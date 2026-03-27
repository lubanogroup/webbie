"use client";

import { useState } from "react";

export default function AccountAanvragenPage() {
  const [form, setForm] = useState({
    company: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    services: "",
    region: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Aanvraag verzonden:", form);
  };

  return (
    <main className="px-6 py-10 md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
        <section className="border-b border-zinc-200">
          <div className="mx-auto max-w-6xl px-8 py-16 md:px-14 md:py-20">
            <div className="mb-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.28em] text-zinc-500">
                  Lubano Group
                </p>

                <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-black md:text-7xl">
                  Account aanvragen voor het Lubano klantportaal
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-500">
                  Werk je als installateur, leadkoper of dienstverlener en wil
                  je toegang tot ons portaal? Vraag hieronder eenvoudig een
                  account aan. Na goedkeuring krijg je toegang tot jouw eigen
                  dashboard met leads, exports en overzicht van aanvragen.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full border border-zinc-200 bg-[#f8fafc] px-4 py-2 text-sm text-zinc-600">
                    Leads in één dashboard
                  </span>
                  <span className="rounded-full border border-zinc-200 bg-[#f8fafc] px-4 py-2 text-sm text-zinc-600">
                    CSV export mogelijk
                  </span>
                  <span className="rounded-full border border-zinc-200 bg-[#f8fafc] px-4 py-2 text-sm text-zinc-600">
                    Alleen voor zakelijke accounts
                  </span>
                </div>
              </div>

              <div className="rounded-[2rem] border border-zinc-200 bg-[#f8fafc] p-8">
                <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                  Waarom aanvragen?
                </p>

                <div className="mt-5 space-y-4">
                  <InfoItem
                    title="Eigen bedrijfsomgeving"
                    text="Je krijgt toegang tot een eigen overzicht waarin jouw leads en gegevens centraal staan."
                  />
                  <InfoItem
                    title="Snel en overzichtelijk"
                    text="Bekijk nieuwe aanvragen, filter direct en exporteer eenvoudig wanneer nodig."
                  />
                  <InfoItem
                    title="Handmatige controle"
                    text="Wij beoordelen iedere aanvraag zodat alleen serieuze bedrijven toegang krijgen."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-zinc-200">
          <div className="mx-auto grid max-w-6xl gap-8 px-8 py-20 lg:grid-cols-[1fr_420px] md:px-14">
            <div className="space-y-8">
              <div className="rounded-[2rem] border border-zinc-200 bg-[#f8fafc] p-8">
                <h2 className="text-3xl font-semibold tracking-tight text-black md:text-4xl">
                  Voor wie is dit portaal bedoeld?
                </h2>
                <p className="mt-4 max-w-3xl leading-8 text-zinc-500">
                  Het Lubano portaal is bedoeld voor bedrijven die op zoek zijn
                  naar een centraal systeem om aanvragen en leads te bekijken.
                  Denk aan installateurs, monteurs, verkooporganisaties en
                  andere zakelijke partijen die snel overzicht willen houden
                  zonder losse Excel-bestanden of handmatige mailwisselingen.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <FeatureCard
                    title="Zakelijk gebruik"
                    text="Alleen bedoeld voor bedrijven en professionals."
                  />
                  <FeatureCard
                    title="Snel inzicht"
                    text="Direct overzicht van beschikbare en toegewezen leads."
                  />
                  <FeatureCard
                    title="Efficiënt werken"
                    text="Minder losse administratie, meer structuur."
                  />
                </div>
              </div>

              <div className="rounded-[2rem] border border-zinc-200 bg-[#f8fafc] p-8">
                <h2 className="text-3xl font-semibold tracking-tight text-black md:text-4xl">
                  Hoe werkt de aanvraag?
                </h2>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <StepCard
                    number="01"
                    title="Aanvraag invullen"
                    text="Vul jouw bedrijfsgegevens en contactinformatie in via het formulier."
                  />
                  <StepCard
                    number="02"
                    title="Controle door ons"
                    text="Wij bekijken de aanvraag en controleren of jouw bedrijf past binnen het portaal."
                  />
                  <StepCard
                    number="03"
                    title="Toegang ontvangen"
                    text="Na goedkeuring nemen wij contact op over activatie en verdere toegang."
                  />
                </div>
              </div>

              <div className="rounded-[2rem] border border-zinc-200 bg-[#f8fafc] p-8">
                <h2 className="text-3xl font-semibold tracking-tight text-black md:text-4xl">
                  Wat kun je verwachten na goedkeuring?
                </h2>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <ChecklistItem text="Toegang tot jouw persoonlijke dashboard" />
                  <ChecklistItem text="Inzicht in toegewezen leads" />
                  <ChecklistItem text="Filteren op periode" />
                  <ChecklistItem text="CSV export voor eigen opvolging" />
                  <ChecklistItem text="Zakelijke ondersteuning bij onboarding" />
                  <ChecklistItem text="Overzichtelijke en professionele werkomgeving" />
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-zinc-200 bg-[#f8fafc] p-8 lg:sticky lg:top-8">
              <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                  Aanvraagformulier
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-black">
                  Vraag jouw account aan
                </h2>
                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  Vul hieronder je gegevens in. We gebruiken deze informatie om
                  je aanvraag te beoordelen en contact met je op te nemen.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <Field label="Bedrijfsnaam" required>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    type="text"
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-black outline-none transition focus:border-zinc-400"
                    placeholder="Bijvoorbeeld: Jansen Installatietechniek"
                  />
                </Field>

                <Field label="Naam contactpersoon" required>
                  <input
                    name="contactName"
                    value={form.contactName}
                    onChange={handleChange}
                    type="text"
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-black outline-none transition focus:border-zinc-400"
                    placeholder="Voor- en achternaam"
                  />
                </Field>

                <Field label="E-mailadres" required>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-black outline-none transition focus:border-zinc-400"
                    placeholder="naam@bedrijf.nl"
                  />
                </Field>

                <Field label="Telefoonnummer">
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    type="text"
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-black outline-none transition focus:border-zinc-400"
                    placeholder="06..."
                  />
                </Field>

                <Field label="Website">
                  <input
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    type="text"
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-black outline-none transition focus:border-zinc-400"
                    placeholder="www.jouwbedrijf.nl"
                  />
                </Field>

                <Field label="Werkgebied / regio">
                  <input
                    name="region"
                    value={form.region}
                    onChange={handleChange}
                    type="text"
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-black outline-none transition focus:border-zinc-400"
                    placeholder="Bijvoorbeeld: Noord-Holland / landelijk"
                  />
                </Field>

                <Field label="Extra toelichting">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-black outline-none transition focus:border-zinc-400"
                    placeholder="Vertel kort iets over jullie bedrijf, diensten of wensen."
                  />
                </Field>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#2340a8] px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Account aanvragen
                </button>

                <p className="text-xs leading-6 text-zinc-500">
                  Door een aanvraag in te dienen, geef je aan dat wij contact
                  met je mogen opnemen over toegang tot het Lubano portaal.
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  children,
  required = false,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-zinc-500">
        {label} {required && <span className="text-zinc-400">*</span>}
      </label>
      {children}
    </div>
  );
}

function InfoItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <h3 className="text-sm font-semibold text-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p>
    </div>
  );
}

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <h3 className="text-base font-semibold text-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
        {number}
      </p>
      <h3 className="mt-3 text-lg font-semibold text-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p>
    </div>
  );
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-black">
      {text}
    </div>
  );
}
