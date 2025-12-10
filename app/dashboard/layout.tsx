"use client";

import React, { useState, useEffect } from "react";
import DashboardSidebar from "../_components/ui/DashboardSidebar";
import AnalyticsChart from "./_components/AnalyticsChart";
import { supabase } from "@/utils/supabaseClient";

interface AnalyticsItem {
  name: string;
  steps: number;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [activeView, setActiveView] = useState<"tours" | "analytics">("tours");

  const [analyticsData, setAnalyticsData] = useState<AnalyticsItem[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await supabase
        .from("tours")
        .select("id, title, steps(*)");

      if (data) {
        const formatted: AnalyticsItem[] = data.map((t) => ({
          name: t.title as string,
          steps: Array.isArray(t.steps) ? t.steps.length : 0,
        }));

        setAnalyticsData(formatted);
      }
    };

    loadData();
  }, []);

  return (
    <div
      lang="en"
      className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 p-5 md:grid-cols-[200px_1fr]"
    >
      <DashboardSidebar activeView={activeView} setActiveView={setActiveView} />

      <main className="bg-light-brown-gray w-full">
        {activeView === "tours" && children}
        {activeView === "analytics" && <AnalyticsChart data={analyticsData} />}
      </main>
    </div>
  );
}
