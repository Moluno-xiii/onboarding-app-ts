import DashboardCTA from "../dashboard/_components/DashboardCTA";

const DashboardSidebar: React.FC = () => {
  return (
    <div className="bg-light-brown flex flex-col rounded-xl p-5">
      <p className="flex-1">Dashboard sidebar</p>
      <DashboardCTA />
    </div>
  );
};

export default DashboardSidebar;
