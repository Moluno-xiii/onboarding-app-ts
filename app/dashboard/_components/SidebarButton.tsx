import { ChevronRight } from "lucide-react";

interface SidebarButtonProps {
  onClick?: () => void;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

export const SidebarButton: React.FC<SidebarButtonProps> = ({
  onClick,
  label,
  icon,
  active = false,
}) => {
  const base =
    "group flex w-full items-center space-x-3 rounded-xl p-3 transition-all text-white cursor-pointer";
  const activeClasses = "bg-bg-color/20 border border-white/30";
  const inactiveClasses =
    "border border-transparent hover:border-white/5 hover:bg-white/5";

  return (
    <button
      onClick={onClick}
      className={`${base} ${active ? activeClasses : inactiveClasses}`}
    >
      {icon}

      <span className="hidden font-medium lg:block">{label}</span>

      <ChevronRight
        className={`ml-auto hidden h-4 w-4 transition ${
          active ? "opacity-100 lg:block" : "opacity-0"
        }`}
      />
    </button>
  );
};
