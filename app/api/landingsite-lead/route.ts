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
    "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

const energyTypeMap: Record<string, string> = {
  stroom_seul: "Alleen stroom",
  gas_seul: "Alleen gas",
  stroom_gas: "Stroom + gas",
  unsure: "Onzeker",
};

const propertyTypeMap: Record<string, string> = {
  appartment: "Appartement",
  house: "Woning",
  office: "Kantoor",
  other: "Anders",
};

const energyLabelMap: Record<string, string> = {
  vattenfall: "Vattenfall",
  essent: "Essent",
  eneco: "Eneco",
  nuon: "Nuon",
  ander: "Ander",
};

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
    console.log("BODY ONTVANGEN:", body);

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
      console.error("Buyers error:", buyersError);
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

    const readableEnergyType =
      energyTypeMap[energy_type as string] || energy_type || null;

    const readablePropertyType =
      propertyTypeMap[property_type as string] || property_type || null;

    const readableEnergyLabel =
      energyLabelMap[energy_label as string] || energy_label || null;

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
          energy_type: readableEnergyType,
          property_type: readablePropertyType,
          energy_label: readableEnergyLabel,
          address: address || null,
          source: "energie-kosten.nl",
          service: "energie",
          status: "new",
          user_id: selectedBuyer.user_id || null,
          buyer_id: selectedBuyer.id,
          buyer_name: selectedBuyer.name,
        },
      ])
      .select();

    if (leadError) {
      console.error("Lead insert error:", leadError);
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
      console.error("Buyer update error:", updateError);
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