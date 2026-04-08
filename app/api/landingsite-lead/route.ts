import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const allowedOrigins = [
  "https://www.energie-kosten.nl",
  "https://energie-kosten.nl",
];

function getCorsHeaders(origin: string | null) {
  const allowedOrigin =
    origin && allowedOrigins.includes(origin)
      ? origin
      : "https://www.energie-kosten.nl";

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 200,
    headers: getCorsHeaders(origin),
  });
}

export async function GET(req: Request) {
  const origin = req.headers.get("origin");

  return NextResponse.json(
    {
      ok: true,
      route: "landingsite-lead",
      message: "API route werkt live",
    },
    {
      headers: getCorsHeaders(origin),
    }
  );
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  try {
    const body = await req.json();

    const {
      name,
      full_name,
      email,
      phone,
      postal_code,
      postal_suffix,
      house_number,
      house_suffix,
      energy_type,
      property_type,
      energy_label,
      address,
    } = body;

    const finalName = name || full_name;

    if (!finalName || !phone) {
      return NextResponse.json(
        { error: "Naam en telefoon verplicht" },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    const extraData = {
      postal_code: postal_code || null,
      postal_suffix: postal_suffix || null,
      house_number: house_number || null,
      house_suffix: house_suffix || null,
      energy_type: energy_type || null,
      property_type: property_type || null,
      energy_label: energy_label || null,
      address: address || null,
      source: "energie-kosten.nl",
    };

    const { error, data } = await supabase
      .from("Leads")
      .insert([
        {
          created_at: new Date().toISOString(),
          name: finalName,
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
      return NextResponse.json(
        { error: error.message },
        {
          status: 500,
          headers: corsHeaders,
        }
      );
    }

    console.log("Extra lead data van Landingsite:", extraData);

    return NextResponse.json(
      { success: true, data },
      {
        headers: corsHeaders,
      }
    );
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Server fout" },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}