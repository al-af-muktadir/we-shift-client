import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useRole from "../hooks/useRole";

const DashboardHome = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { role, isLoading: roleLoading } = useRole();

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile?email=${user.email}`);
      return res.data;
    },
  });

  if (loading || isLoading || roleLoading) {
    return <div className="text-[#C7E36B]">Loading profile...</div>;
  }

  return (
    <div className="max-w-4xl">
      <div className="bg-[#111111] border border-gray-800 rounded-3xl p-8">
        <div className="flex items-center gap-6">
          <img
            src={user?.photoURL || "https://i.ibb.co.com/4pDNDk1/avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-[#C7E36B]"
          />

          <div>
            <h2 className="text-3xl font-bold text-[#C7E36B]">
              {profile?.displayName || user?.displayName || "User"}
            </h2>

            <p className="text-gray-400 mt-1">
              {profile?.email || user?.email}
            </p>

            <span className="inline-block mt-3 px-4 py-1 rounded-full bg-[#C7E36B]/20 text-[#C7E36B] capitalize">
              {role}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-8">
          <div className="bg-black/40 rounded-2xl p-5 border border-gray-800">
            <p className="text-gray-400 text-sm">Name</p>
            <p className="text-white font-semibold mt-1">
              {profile?.displayName || user?.displayName || "Not available"}
            </p>
          </div>

          <div className="bg-black/40 rounded-2xl p-5 border border-gray-800">
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-white font-semibold mt-1">
              {profile?.email || user?.email}
            </p>
          </div>

          <div className="bg-black/40 rounded-2xl p-5 border border-gray-800">
            <p className="text-gray-400 text-sm">Role</p>
            <p className="text-white font-semibold mt-1 capitalize">{role}</p>
          </div>

          <div className="bg-black/40 rounded-2xl p-5 border border-gray-800">
            <p className="text-gray-400 text-sm">Account Created</p>
            <p className="text-white font-semibold mt-1">
              {profile?.createdAt
                ? new Date(profile.createdAt).toLocaleDateString()
                : "Not available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
