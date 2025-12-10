"use client";

import React from "react";
import DashboardCTA from "@/app/dashboard/_components/DashboardCTA";
import { Layers, Globe, BarChart2 } from "lucide-react";

interface DashboardSidebarProps {
  activeView: "tours" | "analytics";
  setActiveView: (view: "tours" | "analytics") => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeView,
  setActiveView,
}) => {
  const buttonBaseClasses =
    "flex items-center space-x-2 p-3 rounded-xl border border-white/10 transition-all hover:bg-gradient-to-l";

  return (
    <div className="bg-light-brown flex flex-col rounded-xl p-5 h-full min-h-screen">
      
      <div className="flex items-center space-x-3 mb-12">
        <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl">
          <Globe className="w-6 h-6" />
        </div>
        <h1 className="hidden lg:block bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-2xl font-bold text-transparent">
          TourFlow
        </h1>
      </div>

      
      <nav className="flex flex-col space-y-4 w-full">
        <button
          onClick={() => setActiveView("tours")}
          className={`${buttonBaseClasses} ${
            activeView === "tours"
              ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/40"
              : "bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
          }`}
        >
          <Layers className="w-5 h-5" />
          <span className="hidden lg:block font-medium">Tours</span>
        </button>

        <button
          onClick={() => setActiveView("analytics")}
          className={`${buttonBaseClasses} ${
            activeView === "analytics"
              ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-400/40"
              : "bg-gradient-to-r from-purple-500/10 to-cyan-500/10"
          }`}
        >
          <BarChart2 className="w-5 h-5" />
          <span className="hidden lg:block font-medium">Analytics</span>
        </button>
      </nav>

      
      <div className="mt-auto mb-6">
        <DashboardCTA />
      </div>
    </div>
  );
};

export default DashboardSidebar;
