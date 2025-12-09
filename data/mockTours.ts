// data/mockTours.ts
export type Step = {
  id: string;
  tourId: string;
  title: string;
  description: string;
  order: number;
};

export type Tour = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  steps: Step[];
};

// Initial mock data
export const tours: Tour[] = [
  {
    id: "tour-1",
    name: "Sample Tour 1",
    description: "A demo tour for testing",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    steps: [
      { id: "step-1", tourId: "tour-1", title: "Step 1", description: "Do this first", order: 1 },
      { id: "step-2", tourId: "tour-1", title: "Step 2", description: "Then do this", order: 2 },
      { id: "step-3", tourId: "tour-1", title: "Step 3", description: "Next step", order: 3 },
      { id: "step-4", tourId: "tour-1", title: "Step 4", description: "Almost done", order: 4 },
      { id: "step-5", tourId: "tour-1", title: "Step 5", description: "Finish here", order: 5 },
    ],
  },
];
