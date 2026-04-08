import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "landingsite-lead",
    message: "API route werkt live",
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { full_name, email, phone } = body;

    if (!full_name || !phone) {
      return NextResponse.json(
        { error: "Naam en telefoon verplicht" },
        { status: 400 }
      );
    }

    const { error, data } = await supabase
      .from("Leads")
      .insert([
        {
          created_at: new Date().toISOString(),
          name: full_name,
          email: email || null,
          phone,
          service: "energie",
          status: "new",
          user_id: null,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Server fout" }, { status: 500 });
  }
}