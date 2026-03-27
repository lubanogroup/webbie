"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  status: string;
  user_id: string;
};

type DateFilter = "today" | "7days" | "30days" | "all";

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [serviceFilter, setServiceFilter] = useState("all");

  const username = "Gebruiker";
  const companyName = "Lubano Group Partner";

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("Leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Supabase fout:", error);
      setLoading(false);
      return;
    }

    setLeads(data || []);
    setLoading(false);
  };

  const filteredLeads = useMemo(() => {
    let result = [...leads];
    const now = new Date();

    if (dateFilter !== "all") {
      result = result.filter((lead) => {
        const leadDate = parseLeadDate(lead.created_at);
        if (!leadDate) return false;

        if (dateFilter === "today") {
          return isSameDay(leadDate, now);
        }

        if (dateFilter === "7days") {
          const sevenDaysAgo = new Date(now);
          sevenDaysAgo.setDate(now.getDate() - 7);
          sevenDaysAgo.setHours(0, 0, 0, 0);
          return leadDate >= sevenDaysAgo;
        }

        if (dateFilter === "30days") {
          const thirtyDaysAgo = new Date(now);
          thirtyDaysAgo.setDate(now.getDate() - 30);
          thirtyDaysAgo.setHours(0, 0, 0, 0);
          return leadDate >= thirtyDaysAgo;
        }

        return true;
      });
    }

    if (serviceFilter !== "all") {
      result = result.filter(
        (lead) =>
          (lead.service || "").toLowerCase() === serviceFilter.toLowerCase(),
      );
    }

    return result;
  }, [leads, dateFilter, serviceFilter]);

  const stats = useMemo(() => {
    return {
      total: filteredLeads.length,
      airco: filteredLeads.filter(
        (lead) => (lead.service || "").toLowerCase() === "airco",
      ).length,
      laadpaal: filteredLeads.filter(
        (lead) => (lead.service || "").toLowerCase() === "laadpaal",
      ).length,
      zonnepanelen: filteredLeads.filter(
        (lead) => (lead.service || "").toLowerCase() === "zonnepanelen",
      ).length,
    };
  }, [filteredLeads]);

  const downloadCSV = () => {
    if (filteredLeads.length === 0) {
      alert("Er zijn geen leads om te downloaden.");
      return;
    }

    const headers = [
      "name",
      "email",
      "phone",
      "service",
      "status",
      "created_at",
    ];

    const rows = filteredLeads.map((lead) => [
      escapeCSV(lead.name),
      escapeCSV(lead.email),
      escapeCSV(lead.phone),
      escapeCSV(lead.service),
      escapeCSV(lead.status),
      escapeCSV(lead.created_at),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `lubano-leads-${dateFilter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-[#f3f6fb] text-black">
      <div className="mx-auto max-w-7xl px-6 py-6 md:px-8">
        <header className="mb-6 rounded-[2rem] border border-zinc-200 bg-white px-6 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-200 bg-[#f8fafc]">
                <Image
                  src="/logo.png"
                  alt="Lubano Group"
                  width={36}
                  height={36}
                  className="h-auto w-auto"
                />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
                  Lubano Group Portal
                </p>
                <h1 className="text-2xl font-semibold tracking-tight text-black md:text-3xl">
                  Klantdashboard
                </h1>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                Beveiligd
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-[#f8fafc] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Ingelogd als
                </p>
                <p className="text-sm font-semibold text-black">{username}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
            <div className="mb-6 rounded-2xl border border-zinc-200 bg-[#f8fafc] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                Account
              </p>
              <h2 className="mt-2 text-lg font-semibold text-black">
                {companyName}
              </h2>
              <p className="mt-1 text-sm leading-6 text-zinc-500">
                Professionele omgeving voor leads, exports en accountbeheer.
              </p>
            </div>

            <nav className="space-y-2">
              <NavItem href="/portal" label="Dashboard" active />
              <NavItem href="/portal/leads" label="Leads" />
              <NavItem href="/portal/export" label="Export" />
              <NavItem href="/portal/account" label="Account" />
              <NavItem href="/portal/support" label="Support" />
            </nav>
          </aside>

          <section className="space-y-6">
            <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
                Overzicht
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-black md:text-4xl">
                Mijn leads
              </h2>
              <p className="mt-4 max-w-3xl text-zinc-500 leading-8">
                Bekijk en download jouw gekochte leads vanuit één overzichtelijk
                en beveiligd portaal. Filter op periode of dienst en exporteer
                direct als CSV-bestand.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={fetchLeads}
                  className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-50"
                >
                  Vernieuwen
                </button>

                <button
                  onClick={downloadCSV}
                  className="rounded-xl bg-[#2340a8] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Download CSV
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div>
                  <label className="mb-2 block text-sm text-zinc-500">
                    Periode
                  </label>
                  <select
                    value={dateFilter}
                    onChange={(e) =>
                      setDateFilter(e.target.value as DateFilter)
                    }
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-black outline-none transition focus:border-zinc-400"
                  >
                    <option value="today">Vandaag</option>
                    <option value="7days">Laatste 7 dagen</option>
                    <option value="30days">Laatste 30 dagen</option>
                    <option value="all">Alles</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-500">
                    Dienst
                  </label>
                  <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-black outline-none transition focus:border-zinc-400"
                  >
                    <option value="all">Alle diensten</option>
                    <option value="airco">Airco</option>
                    <option value="laadpaal">Laadpaal</option>
                    <option value="zonnepanelen">Zonnepanelen</option>
                  </select>
                </div>

                <InfoStatCard
                  title="Geselecteerde leads"
                  value={String(stats.total)}
                />

                <div className="rounded-2xl border border-zinc-200 bg-[#f8fafc] p-4">
                  <p className="mb-2 text-sm text-zinc-500">Download klaar</p>
                  <p className="text-sm text-zinc-700">
                    CSV export van huidige selectie
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <InfoStatCard title="Airco" value={String(stats.airco)} />
              <InfoStatCard title="Laadpalen" value={String(stats.laadpaal)} />
              <InfoStatCard
                title="Zonnepanelen"
                value={String(stats.zonnepanelen)}
              />
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
              <div className="flex flex-col gap-3 border-b border-zinc-200 px-6 py-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-black">
                    Lead overzicht
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    {filteredLeads.length} lead(s) in huidige selectie
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="px-6 py-10 text-zinc-500">Leads laden...</div>
              ) : filteredLeads.length === 0 ? (
                <div className="px-6 py-10 text-zinc-500">
                  Geen leads gevonden voor deze selectie.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[950px]">
                    <thead>
                      <tr className="border-b border-zinc-200 bg-[#f8fafc] text-left text-sm text-zinc-500">
                        <th className="px-6 py-4 font-medium">Naam</th>
                        <th className="px-6 py-4 font-medium">E-mail</th>
                        <th className="px-6 py-4 font-medium">Telefoon</th>
                        <th className="px-6 py-4 font-medium">Dienst</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Datum</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="border-b border-zinc-200 text-sm last:border-b-0 hover:bg-zinc-50"
                        >
                          <td className="px-6 py-4 font-medium text-black">
                            {lead.name}
                          </td>
                          <td className="px-6 py-4 text-zinc-700">
                            {lead.email}
                          </td>
                          <td className="px-6 py-4 text-zinc-700">
                            {lead.phone}
                          </td>
                          <td className="px-6 py-4">
                            <span className="rounded-full border border-zinc-200 bg-[#f8fafc] px-3 py-1 text-xs font-medium text-black">
                              {capitalize(lead.service)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="rounded-full bg-[#2340a8] px-3 py-1 text-xs font-medium text-white">
                              {capitalize(lead.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-zinc-500">
                            {formatLeadDate(lead.created_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function NavItem({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center rounded-xl px-4 py-3 text-sm font-medium transition ${
        active
          ? "bg-[#2340a8] text-white"
          : "text-zinc-600 hover:bg-[#f8fafc] hover:text-black"
      }`}
    >
      {label}
    </Link>
  );
}

function InfoStatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-[#f8fafc] p-4">
      <p className="mb-2 text-sm text-zinc-500">{title}</p>
      <p className="text-3xl font-semibold text-black">{value}</p>
    </div>
  );
}

function escapeCSV(value: string | null | undefined) {
  const safeValue = value ?? "";
  return `"${String(safeValue).replace(/"/g, '""')}"`;
}

function capitalize(value: string) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function parseLeadDate(value: string | null | undefined): Date | null {
  if (!value) return null;

  const normalized = String(value).trim().replace(" ", "T");
  const date = new Date(normalized);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatLeadDate(value: string | null | undefined) {
  const date = parseLeadDate(value);
  if (!date) return "-";
  return date.toLocaleDateString("nl-NL");
}
