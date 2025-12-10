import DashboardCTA from "@/app/dashboard/_components/DashboardCTA";
import { 
   ChevronRight, Layers, Globe
} from "lucide-react";

const DashboardSidebar: React.FC = () => {
  return (
    <div className="bg-light-brown flex flex-col rounded-xl p-5 h-full min-h-screen">
      <div className="flex items-center space-x-3 mb-12">
        <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl">
          <Globe className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold hidden lg:block bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
          TourFlow
        </h1>
      </div>

      <nav className="flex flex-col space-y-4 w-full">
        <a
          href="#"
          className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/10 hover:border-cyan-400/30 transition-all group"
        >
          <Layers className="w-5 h-5" />
          <span className="hidden lg:block font-medium">Tours</span>
          <ChevronRight className="w-4 h-4 ml-auto hidden lg:block opacity-0 group-hover:opacity-100 transition" />
        </a>
      </nav>

      {/* Push Logout to bottom */}
      <div className="mt-auto mb-6">
        <DashboardCTA />
      </div>
    </div>
  );
};

export default DashboardSidebar;
