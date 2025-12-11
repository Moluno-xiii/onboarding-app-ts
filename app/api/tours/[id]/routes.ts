
import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const tourId = params.id;

    const { data, error } = await supabase
      .from("tours")
      .select("*, steps(*)")
      .eq("id", tourId)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
