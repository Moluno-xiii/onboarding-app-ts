"use client";

import React from "react";
import DashboardCTA from "@/app/dashboard/_components/DashboardCTA";
import { Layers, Globe, BarChart2 } from "lucide-react";
import Link from "next/link";
import { MdOutlineHub } from "react-icons/md";
import { SidebarButton } from "@/app/dashboard/_components/SidebarButton";

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
    <div className="bg-light-brown flex h-full min-h-screen flex-col p-5">
      <nav className="flex w-full flex-col space-y-4">
        <Link href="/" className="flex items-center gap-2 mb-12">
          <MdOutlineHub className="text-yellow text-3xl" />
          <span className="font-macondo-swash text-xl font-bold tracking-[-0.015em] text-white">
            Onboardify
          </span>
        </Link>

        <SidebarButton
          onClick={() => setActiveView("tours")}
          label="Tours"
          icon={<Layers className="h-5 w-5" />}
          active={activeView === "tours"}
        />
        <SidebarButton
          onClick={() => setActiveView("analytics")}
          label="Analytics"
          icon={<BarChart2 className="h-5 w-5" />}
          active={activeView === "analytics"}
        />
      </nav>

      <div className="mt-auto mb-4">
        <DashboardCTA />
      </div>
    </div>
  );
};

export default DashboardSidebar;
