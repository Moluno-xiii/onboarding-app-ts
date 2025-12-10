"use client";
import Button from "@/app/_components/ui/Button";
import { useAuth } from "@/contexts/Authcontext";

const DashboardCTA: React.FC = () => {
  const { isLoading, logout } = useAuth();
  return (
    <div className="flex flex-col gap-y-6">
      <Button
        type="button"
        variant="error"
        text={!isLoading ? "Logout" : "Logging out..."}
        onClick={logout}
      />
    </div>
  );
};

export default DashboardCTA;
