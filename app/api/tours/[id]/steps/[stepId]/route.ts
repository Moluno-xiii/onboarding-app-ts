import { NextResponse } from "next/server";
import { tours } from "@/data/mockTours"; 


export async function PUT(
  req: Request,
  { params }: { params: { id: string; stepId: string } }
) {
  const { id, stepId } = params;
  const body = await req.json();
  const tour = tours.find((t) => t.id === id);

  if (!tour) {
    return NextResponse.json({ error: "Tour not found" }, { status: 404 });
  }

  const stepIndex = tour.steps.findIndex((s) => s.id === stepId);
  if (stepIndex === -1) {
    return NextResponse.json({ error: "Step not found" }, { status: 404 });
  }

  const updatedStep = {
    ...tour.steps[stepIndex],
    ...body,
  };

  tour.steps[stepIndex] = updatedStep;
  tour.updatedAt = new Date().toISOString();

  return NextResponse.json(updatedStep);
}

// DELETE /api/tours/:id/steps/:stepId
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string; stepId: string } }
) {
  const { id, stepId } = params;
  const tour = tours.find((t) => t.id === id);

  if (!tour) {
    return NextResponse.json({ error: "Tour not found" }, { status: 404 });
  }

  const stepIndex = tour.steps.findIndex((s) => s.id === stepId);
  if (stepIndex === -1) {
    return NextResponse.json({ error: "Step not found" }, { status: 404 });
  }

  const deletedStep = tour.steps.splice(stepIndex, 1)[0];
  tour.updatedAt = new Date().toISOString();

  return NextResponse.json(deletedStep);
}
