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
        { status: 400, headers: corsHeaders }
      );
    }

    const { data: buyers, error: buyersError } = await supabase
      .from("buyers")
      .select("*")
      .eq("active", true);

    if (buyersError) {
      return NextResponse.json(
        { error: buyersError.message },
        { status: 500, headers: corsHeaders }
      );
    }

    if (!buyers || buyers.length === 0) {
      return NextResponse.json(
        { error: "Geen actieve afnemers gevonden" },
        { status: 500, headers: corsHeaders }
      );
    }

    const selectedBuyer = buyers.reduce((best, current) => {
      const bestRatio =
        best.weekly_capacity > 0
          ? best.current_count / best.weekly_capacity
          : Number.MAX_SAFE_INTEGER;

      const currentRatio =
        current.weekly_capacity > 0
          ? current.current_count / current.weekly_capacity
          : Number.MAX_SAFE_INTEGER;

      return currentRatio < bestRatio ? current : best;
    });

    const { error: leadError, data: leadData } = await supabase
      .from("Leads")
      .insert([
        {
          created_at: new Date().toISOString(),
          name: finalName,
          email: email || null,
          phone,
          postal_code: postal_code || null,
          postal_suffix: postal_suffix || null,
          house_number: house_number || null,
          house_suffix: house_suffix || null,
          energy_type: energy_type || null,
          property_type: property_type || null,
          energy_label: energy_label || null,
          address: address || null,
          source: "energie-kosten.nl",
          service: "energie",
          status: "new",
          user_id: null,
          buyer_id: selectedBuyer.id,
          buyer_name: selectedBuyer.name,
        },
      ])
      .select();

    if (leadError) {
      return NextResponse.json(
        { error: leadError.message },
        { status: 500, headers: corsHeaders }
      );
    }

    const { error: updateError } = await supabase
      .from("buyers")
      .update({
        current_count: selectedBuyer.current_count + 1,
      })
      .eq("id", selectedBuyer.id);

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        success: true,
        assigned_to: selectedBuyer.name,
        data: leadData,
      },
      { headers: corsHeaders }
    );
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Server fout" },
      { status: 500, headers: corsHeaders }
    );
  }
}