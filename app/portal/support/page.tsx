"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function PortalSupportPage() {
  const router = useRouter();

  const [sessionLoading, setSessionLoading] = useState(true);
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
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
          <PortalSidebar active="support" />

          <section className="space-y-6">
            <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-[0_25px_80px_rgba(15,23,42,0.05)]">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
                Support
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-black md:text-4xl">
                Ondersteuning
              </h1>
              <p className="mt-4 max-w-3xl text-zinc-500 leading-8">
                Hulp nodig bij het portaal, exports of leadweergave? Gebruik
                onderstaande gegevens voor contact.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_25px_80px_rgba(15,23,42,0.05)]">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                  E-mail
                </p>
                <p className="mt-3 text-xl font-semibold text-black">
                  info@lubano-group.com
                </p>
                <p className="mt-2 text-sm text-zinc-500">
                  Voor vragen over toegang, leads en technische ondersteuning.
                </p>
              </div>

              <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_25px_80px_rgba(15,23,42,0.05)]">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                  Reactietijd
                </p>
                <p className="mt-3 text-xl font-semibold text-black">
                  Zo snel mogelijk op werkdagen
                </p>
                <p className="mt-2 text-sm text-zinc-500">
                  Wij behandelen supportverzoeken zo snel mogelijk.
                </p>
              </div>
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
            <Image src="/logo.png" alt="Lubano Group" width={38} height={38} />
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
          <div className="rounded-2xl border border-zinc-200 bg-[#f8fafc] px-5 py-4">
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
