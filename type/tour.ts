
export interface TourStep {
  id: string;
  order: number;
  title: string;
  content: string;
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  user_id?: string;
  steps: TourStep[];
}


export interface SupabaseTourRow {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  user_id?: string;
  steps?: SupabaseTourStepRow[];
}

export interface SupabaseTourStepRow {
  id: string;
  order: number;
  title: string;
  content: string;
  tour_id: string;
}
