import { NextResponse } from "next/server";
import supabase from "@/app/utils/supabase/supabase";

export async function GET(req: Request, context: { params: { id: string } }) {
  const { id } = await context.params;
  console.log("id,", id);
  const { data: tour, error: tourError } = await supabase
    .from("tours")
    .select("*")
    .eq("id", id)
    .single();

  console.log("tour data", tour);
  const { data: steps, error: stepsError } = await supabase
    .from("steps")
    .select("*")
    .eq("tour_id", tour.id);
  console.log("step data", steps);
  const data = { ...tour, steps };

  if (tourError) {
    return NextResponse.json(
      { error: tourError.message, success: false },
      { status: 400 },
    );
  }

  if (stepsError) {
    return NextResponse.json(
      { error: stepsError.message, success: false },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { success: true, param: id, data },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
    },
  );
}

export function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    },
  );
}
