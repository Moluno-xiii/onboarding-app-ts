"use client";

import React from "react";
import DashboardCTA from "@/app/dashboard/_components/DashboardCTA";
import { Layers, BarChart2, LogOut, HomeIcon } from "lucide-react";
import Link from "next/link";
import { MdOutlineHub } from "react-icons/md";
import { SidebarButton } from "@/app/dashboard/_components/SidebarButton";
import { useAuth } from "@/contexts/Authcontext";

interface DashboardSidebarProps {
  activeView: "tours" | "analytics";
  setActiveView: (view: "tours" | "analytics") => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeView,
  setActiveView,
}) => {
  const { logout } = useAuth();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="bg-light-brown hidden h-full min-h-screen flex-col p-6 md:flex">
        <nav className="flex w-full flex-col space-y-4">
          <Link href="/" className="mb-12 flex items-center gap-2">
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

      {/* Mobile Navbar */}
      <div className="bg-light-brown/95 fixed right-0 bottom-0 left-0 z-50 flex items-center justify-between gap-2 border-t border-white/10 p-2 backdrop-blur-md md:hidden">
        <Link href="/" className="flex-1">
          <button className="flex w-full flex-col items-center text-xs text-white/80 transition hover:text-white">
            <HomeIcon className="mb-1 h-6 w-6" />
            <span>Home</span>
          </button>
        </Link>

        <button
          onClick={() => setActiveView("tours")}
          className={`flex flex-1 flex-col items-center text-xs transition ${
            activeView === "tours" ? "text-yellow" : "text-white/70"
          }`}
        >
          <Layers className="mb-1 h-6 w-6" />
          <span>Tours</span>
        </button>

        <button
          onClick={() => setActiveView("analytics")}
          className={`flex flex-1 flex-col items-center text-xs transition ${
            activeView === "analytics" ? "text-yellow" : "text-white/70"
          }`}
        >
          <BarChart2 className="mb-1 h-6 w-6" />
          <span>Analytics</span>
        </button>

        <button
          onClick={logout}
          className="flex flex-1 flex-col items-center text-xs text-white/80 transition hover:text-white"
        >
          <LogOut className="mb-1 h-6 w-6" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
};

export default DashboardSidebar;
