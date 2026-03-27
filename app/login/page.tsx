"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Vul je e-mailadres en wachtwoord in.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message || "Inloggen mislukt.");
      return;
    }

    router.push("/portal");
    router.refresh();
  };

  return (
    <main className="px-6 py-10 md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
        <section className="border-b border-zinc-200">
          <div className="mx-auto max-w-6xl px-8 py-16 md:px-14 md:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.28em] text-zinc-500">
                  Lubano Group
                </p>

                <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-black md:text-7xl">
                  Login voor het Lubano klantportaal
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-500">
                  Log in op jouw klantomgeving om leads te bekijken, filters toe
                  te passen en exports te downloaden vanuit één overzichtelijk
                  portaal.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full border border-zinc-200 bg-[#f8fafc] px-4 py-2 text-sm text-zinc-600">
                    Veilig klantportaal
                  </span>
                  <span className="rounded-full border border-zinc-200 bg-[#f8fafc] px-4 py-2 text-sm text-zinc-600">
                    Direct inzicht in leads
                  </span>
                  <span className="rounded-full border border-zinc-200 bg-[#f8fafc] px-4 py-2 text-sm text-zinc-600">
                    CSV export mogelijk
                  </span>
                </div>
              </div>

              <div className="rounded-[2rem] border border-zinc-200 bg-[#f8fafc] p-8">
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                    Inloggen
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight text-black">
                    Toegang tot jouw account
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage ? (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {errorMessage}
                    </div>
                  ) : null}

                  <div>
                    <label className="mb-2 block text-sm text-zinc-500">
                      E-mailadres <span className="text-zinc-400">*</span>
                    </label>
                    <input
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-black outline-none transition focus:border-zinc-400"
                      placeholder="naam@bedrijf.nl"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-zinc-500">
                      Wachtwoord <span className="text-zinc-400">*</span>
                    </label>
                    <input
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-black outline-none transition focus:border-zinc-400"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <label className="flex items-center gap-2 text-sm text-zinc-500">
                      <input
                        type="checkbox"
                        className="h-4 w-4 border-zinc-300"
                        disabled
                      />
                      Ingelogd blijven
                    </label>

                    <Link
                      href="/wachtwoord-vergeten"
                      className="text-sm text-[#2340a8] hover:opacity-80"
                    >
                      Wachtwoord vergeten?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-[#2340a8] px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Bezig met inloggen..." : "Inloggen"}
                  </button>

                  <p className="text-xs text-zinc-500">
                    Nog geen account?{" "}
                    <Link
                      href="/account-aanvragen"
                      className="font-medium text-[#2340a8]"
                    >
                      Vraag er één aan
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
