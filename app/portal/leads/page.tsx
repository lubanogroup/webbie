"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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

const LEADS_STEP = 10;

export default function PortalLeadsPage() {
  const router = useRouter();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [visibleCount, setVisibleCount] = useState(LEADS_STEP);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadPage = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (!session?.user) {
        setSessionLoading(false);
        router.replace("/login");
        return;
      }

      setUserEmail(session.user.email || "");
      setSessionLoading(false);

      const { data, error } = await supabase
        .from("Leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (!mounted) return;

      if (error) {
        console.log("Supabase fout:", error);
        setLeads([]);
        setLoading(false);
        return;
      }

      setLeads(data || []);
      setLoading(false);
    };

    loadPage();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        router.replace("/login");
        router.refresh();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    setVisibleCount(LEADS_STEP);
  }, [dateFilter]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
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

    return result;
  }, [leads, dateFilter]);

  const visibleLeads = useMemo(() => {
    return filteredLeads.slice(0, visibleCount);
  }, [filteredLeads, visibleCount]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + LEADS_STEP);
  };

  const handleShowLess = () => {
    setVisibleCount(LEADS_STEP);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (sessionLoading) {
    return (
      <main className="min-h-screen bg-[#edf2f7] px-6 py-10 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-zinc-200 bg-white p-10">
          <p className="text-zinc-500">Beveiligde omgeving laden...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#edf2f7] text-black">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-8">
        <PortalHeader userEmail={userEmail} onLogout={handleLogout} />

        <div className="grid items-start gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
          <PortalSidebar active="leads" />

          <section className="space-y-6">
            <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-[0_25px_80px_rgba(15,23,42,0.05)]">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
                Leads
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-black md:text-4xl">
                Alle leads
              </h1>
              <p className="mt-4 max-w-3xl text-zinc-500 leading-8">
                Bekijk alle beschikbare leads binnen jouw portalomgeving en
                filter eenvoudig op periode.
              </p>
            </div>

            <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_25px_80px_rgba(15,23,42,0.05)]">
              <div className="grid gap-4 md:grid-cols-3">
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

                <InfoStatCard
                  title="Totaal"
                  value={String(filteredLeads.length)}
                  subtext="Leads in huidige selectie"
                />

                <InfoStatCard
                  title="Getoond"
                  value={String(visibleLeads.length)}
                  subtext={`Van totaal ${filteredLeads.length}`}
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.05)]">
              <div className="border-b border-zinc-200 px-6 py-5">
                <h2 className="text-2xl font-semibold text-black">
                  Lead overzicht
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  {visibleLeads.length} van {filteredLeads.length} lead(s)
                  zichtbaar
                </p>
              </div>

              {loading ? (
                <div className="px-6 py-10 text-zinc-500">Leads laden...</div>
              ) : filteredLeads.length === 0 ? (
                <div className="px-6 py-10 text-zinc-500">
                  Geen leads gevonden.
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="border-b border-zinc-200 bg-[#f8fafc] text-left text-sm text-zinc-500">
                          <th className="px-5 py-4 font-medium">Naam</th>
                          <th className="px-5 py-4 font-medium">E-mail</th>
                          <th className="px-5 py-4 font-medium">Telefoon</th>
                          <th className="px-5 py-4 font-medium">Dienst</th>
                          <th className="px-5 py-4 font-medium">Status</th>
                          <th className="px-5 py-4 font-medium">Datum</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visibleLeads.map((lead) => (
                          <tr
                            key={lead.id}
                            className="border-b border-zinc-200 text-sm last:border-b-0 hover:bg-zinc-50"
                          >
                            <td className="px-5 py-4 font-medium text-black">
                              <div className="max-w-[220px] truncate">
                                {lead.name}
                              </div>
                            </td>
                            <td className="px-5 py-4 text-zinc-700">
                              <div className="max-w-[240px] truncate">
                                {lead.email}
                              </div>
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap text-zinc-700">
                              {lead.phone}
                            </td>
                            <td className="px-5 py-4">
                              <span className="inline-flex max-w-[120px] truncate rounded-full border border-zinc-200 bg-[#f8fafc] px-3 py-1 text-xs font-medium text-black">
                                {capitalize(lead.service || "-")}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <span className="inline-flex max-w-[120px] truncate rounded-full bg-[#2340a8] px-3 py-1 text-xs font-medium text-white">
                                {capitalize(lead.status || "-")}
                              </span>
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap text-zinc-500">
                              {formatLeadDate(lead.created_at)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-wrap gap-3 border-t border-zinc-200 px-6 py-5">
                    {visibleCount < filteredLeads.length && (
                      <button
                        onClick={handleShowMore}
                        className="rounded-xl bg-[#2340a8] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                      >
                        Toon meer
                      </button>
                    )}

                    {visibleCount > LEADS_STEP && (
                      <button
                        onClick={handleShowLess}
                        className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-50"
                      >
                        Toon minder
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function PortalHeader({
  userEmail,
  onLogout,
}: {
  userEmail: string;
  onLogout: () => void;
}) {
  return (
    <header className="mb-6 rounded-[2rem] border border-zinc-200 bg-white px-6 py-6 shadow-[0_25px_80px_rgba(15,23,42,0.06)]">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-200 bg-[#f8fafc] shadow-sm">
            <Image
              src="/logo.png"
              alt="Lubano Group"
              width={38}
              height={38}
              className="h-auto w-auto"
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-zinc-500">
              Portal.lubano-group.com
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-black md:text-4xl">
              Klantdashboard
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 px-5 py-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 rounded-full bg-green-500" />
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-green-700">
                  Beveiligingsstatus
                </p>
                <p className="text-sm font-semibold text-green-800">
                  Versleutelde sessie actief
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-[#f8fafc] px-5 py-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
              Ingelogd account
            </p>
            <p className="mt-1 text-sm font-semibold text-black">
              {userEmail || "-"}
            </p>
          </div>

          <button
            onClick={onLogout}
            className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-50"
          >
            Uitloggen
          </button>
        </div>
      </div>
    </header>
  );
}

function PortalSidebar({
  active,
}: {
  active: "dashboard" | "leads" | "export" | "account" | "support";
}) {
  return (
    <aside className="self-start rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-[0_25px_80px_rgba(15,23,42,0.05)]">
      <div className="mb-6 overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-gradient-to-br from-[#f8fafc] to-white p-5">
        <p className="text-xs uppercase tracking-[0.26em] text-zinc-500">
          Account
        </p>
        <h2 className="mt-3 text-2xl font-semibold leading-tight text-black">
          Lubano Group Partner
        </h2>
        <p className="mt-3 text-sm leading-7 text-zinc-500">
          Afgeschermde omgeving voor leadbeheer, exports en professionele
          opvolging vanuit één beveiligde workflow.
        </p>
      </div>

      <nav className="space-y-2">
        <NavItem
          href="/portal"
          label="Dashboard"
          active={active === "dashboard"}
        />
        <NavItem
          href="/portal/leads"
          label="Leads"
          active={active === "leads"}
        />
        <NavItem
          href="/portal/export"
          label="Export"
          active={active === "export"}
        />
        <NavItem
          href="/portal/account"
          label="Account"
          active={active === "account"}
        />
        <NavItem
          href="/portal/support"
          label="Support"
          active={active === "support"}
        />
      </nav>
    </aside>
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
          ? "bg-[#2340a8] text-white shadow-sm"
          : "text-zinc-600 hover:bg-[#f8fafc] hover:text-black"
      }`}
    >
      {label}
    </Link>
  );
}

function InfoStatCard({
  title,
  value,
  subtext,
}: {
  title: string;
  value: string;
  subtext: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-[#f8fafc] p-4">
      <p className="mb-2 text-sm text-zinc-500">{title}</p>
      <p className="text-3xl font-semibold text-black">{value}</p>
      <p className="mt-2 text-sm text-zinc-500">{subtext}</p>
    </div>
  );
}

function capitalize(value: string) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function escapeCSV(value: string | null | undefined) {
  const safeValue = value ?? "";
  return `"${String(safeValue).replace(/"/g, '""')}"`;
}

function parseLeadDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const normalized = String(value).trim().replace(" ", "T");
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return null;
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
