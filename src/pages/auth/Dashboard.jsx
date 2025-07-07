import { Outlet } from "react-router-dom";
import MainDashboard from "../../components/dashboard/MainDashboard";

const DashboardLayout = () => {
  return (
    <div className="flex w-full">
      <main className="flex-1 w-full">
        <MainDashboard />

        {/* Nested routes render here */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
