import { NavLink } from "react-router";
// import logo from "../../public/image.png";
// import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-72 bg-[#111111] border-r border-gray-800 min-h-screen">
      <div className="p-6">
        <h2 className="text-3xl font-bold text-[#C7E36B]">WeShift</h2>

        <p className="text-gray-400 text-sm mt-1">Dashboard</p>
      </div>

      <nav className="px-4 space-y-2">
        <NavLink
          to="/dashboard/my-parcel"
          className={({ isActive }) =>
            `block rounded-xl px-4 py-3 transition ${
              isActive
                ? "bg-[#C7E36B] text-black font-semibold"
                : "text-gray-300 hover:bg-gray-900"
            }`
          }
        >
          My Parcels
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `block rounded-xl px-4 py-3 transition ${
              isActive
                ? "bg-[#C7E36B] text-black font-semibold"
                : "text-gray-300 hover:bg-gray-900"
            }`
          }
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
