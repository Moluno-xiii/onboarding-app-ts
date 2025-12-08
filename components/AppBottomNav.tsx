import Link from "next/link";
import {
  MdDashboard,
  MdTravelExplore,
  MdAnalytics,
  MdLogout,
} from "react-icons/md";

export const AppBottomNav: React.FC = () => {
  const isActive = (path: string) => typeof window !== "undefined" && window.location.pathname === path;

  return (
    <div className="bg-background-light/90 dark:bg-card-dark/90 fixed right-0 bottom-0 left-0 z-50 h-20 border-t border-gray-200 backdrop-blur-lg dark:border-gray-700">
      <div className="flex h-full items-center justify-around px-2 pb-2">
        
        {/* Dashboard */}
        <Link
          href="/app"
          className={`flex w-1/4 flex-col items-center justify-center gap-1 ${
            isActive("/app")
              ? "text-primary"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <MdDashboard className="text-2xl" />
          <span className="text-xs font-medium">Dashboard</span>
        </Link>

        {/* Tours */}
        <Link
          href="/app/tours"
          className={`flex w-1/4 flex-col items-center justify-center gap-1 ${
            isActive("/app/tours")
              ? "text-primary"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <MdTravelExplore className="text-2xl" />
          <span className="text-xs font-medium">Tours</span>
        </Link>

        {/* Analytics */}
        <Link
          href="/app/analytics"
          className={`flex w-1/4 flex-col items-center justify-center gap-1 ${
            isActive("/app/analytics")
              ? "text-primary"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <MdAnalytics className="text-2xl" />
          <span className="text-xs font-medium">Analytics</span>
        </Link>

        {/* Logout */}
        <Link
          href="/"
          className="flex w-1/4 flex-col items-center justify-center gap-1 text-gray-500 dark:text-gray-400"
        >
          <MdLogout className="text-2xl" />
          <span className="text-xs font-medium">Exit</span>
        </Link>

      </div>
    </div>
  );
};
