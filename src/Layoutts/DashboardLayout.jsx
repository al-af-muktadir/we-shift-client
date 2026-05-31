import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import logo from "../../public/image.png";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 bg-[#0f0f0f]">
        <div className="mb-6 border-b border-gray-800 pb-4">
          <h1 className="text-2xl font-bold text-[#C7E36B]">
            <img className="w-20" src={logo}></img>
          </h1>
          <p className="text-gray-400 text-sm">
            Manage your parcels and account settings
          </p>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
