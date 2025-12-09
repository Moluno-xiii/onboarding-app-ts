import { NextResponse } from "next/server";
import { tours } from "../../../../../data/mockTours";
import { v4 as uuidv4 } from "uuid";

// GET /api/tours/[id]/steps
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const tour = tours.find((t) => t.id === params.id);

  if (!tour) {
    return NextResponse.json({ error: "Tour not found" }, { status: 404 });
  }

  return NextResponse.json(tour.steps);
}

// POST /api/tours/[id]/steps
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { title, description } = body;

  const tour = tours.find((t) => t.id === params.id);

  if (!tour) {
    return NextResponse.json({ error: "Tour not found" }, { status: 404 });
  }

  const newStep = {
    id: uuidv4(),
    tourId: params.id,
    title,
    description,
    order: tour.steps.length + 1,
  };

  tour.steps.push(newStep);
  tour.updatedAt = new Date().toISOString();

  return NextResponse.json(newStep, { status: 201 });
}
