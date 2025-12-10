import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

interface TourStep {
  id: string;
  order: number;
  title: string;
  content: string;
}

interface Tour {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  user_id?: string;
  steps: TourStep[];
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Tour ID is required" }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("tours")
      .select("*, steps(*)")
      .eq("id", id)
      .single();

    if (error) throw error;

    const tour: Tour = {
      id: data.id,
      title: data.title,
      description: data.description,
      created_at: data.created_at,
      updated_at: data.updated_at,
      user_id: data.user_id,
      steps: (data.steps || []).map((s: { id: string; title: string; content: string; order: number }) => ({
        id: s.id,
        title: s.title,
        content: s.content,
        order: s.order,
      })),
    };

    return NextResponse.json(tour);
  } catch (err) {
    console.error("Failed to fetch tour:", err);
    return NextResponse.json({ error: "Failed to fetch tour" }, { status: 500 });
  }
}
