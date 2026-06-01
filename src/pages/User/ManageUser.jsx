import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaSearch, FaUserMinus, FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";

const ManageUser = () => {
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["user", search],
    queryFn: async () => {
      const result = await axiosSecure.get(`/users?searchText=${search}`);

      return result.data;
    },
  });
  console.log(users);

  const handlemakeUser = async (user) => {
    const roleInfo = { role: "admin" };
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Make ${user.name} an Admin?`,
      icon: "warning",
      background: "#232323",
      color: "#C7E36B",

      showCancelButton: true,

      confirmButtonText: "Yes, Make Admin",
      cancelButtonText: "Cancel",

      confirmButtonColor: "#C7E36B",
      cancelButtonColor: "#ef4444",
    });
    if (result.isConfirmed) {
      axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${user.displayName} turned into Admin`,
            timer: 2300,
          });
        }
      });
    }
  };

  const handleremoveUser = async (user) => {
    const roleInfo = { role: "user" };
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Make ${user.name} an User?`,
      icon: "warning",
      background: "#232323",
      color: "#C7E36B",

      showCancelButton: true,

      confirmButtonText: "Yes, Make User",
      cancelButtonText: "Cancel",

      confirmButtonColor: "#C7E36B",
      cancelButtonColor: "#ef4444",
    });
    if (result.isConfirmed) {
      axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${user.displayName} Demoted into User`,
            timer: 2300,
          });
        }
      });
    }
  };
  return (
    <div className="rounded-4xl border border-[#C7E36B]/20 bg-[#1E1E1E] p-5 shadow-[0_0_45px_rgba(199,227,107,0.08)]">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-[#C7E36B]">User Management</h2>

        <p className="text-[#8A9A5B] mt-2">
          Manage users, riders, admins, and account roles.
        </p>
      </div>
      <div className="relative w-full max-w-md">
        <FaSearch
          className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-[#8A9A5B]
        text-xl
      "
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="
        w-full
        pl-12
        pr-4
        py-3
        rounded-2xl
        bg-[#232323]
        border
        border-[#C7E36B]/20
        text-white
        placeholder:text-[#8A9A5B]
        outline-none
        focus:border-[#C7E36B]
        transition-all
      "
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#C7E36B]/10">
        <table className="w-full min-w-225">
          <thead className="bg-[#232323]">
            <tr className="text-left text-[#C7E36B] border-b border-[#C7E36B]/20">
              <th className="px-5 py-4">#</th>
              <th className="px-5 py-4">User</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Role</th>
              <th className="px-5 py-4">Created At</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-b border-[#C7E36B]/10 text-[#D6E6B4] hover:bg-[#C7E36B]/5 transition-all duration-300"
              >
                <td className="px-5 py-5 text-[#8A9A5B]">{index + 1}</td>

                <td className="px-5 py-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#C7E36B]/30"
                    />

                    <div>
                      <p className="font-bold text-white">
                        {user.name || user.displayName || "Unknown User"}
                      </p>
                      <p className="text-sm text-[#8A9A5B]">ID: {user._id}</p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-5">{user.email}</td>

                <td className="px-5 py-5">
                  <span
                    className={`
                      px-4 py-2 rounded-full text-xs font-bold uppercase
                      ${
                        user.role === "admin"
                          ? "bg-purple-500/15 text-purple-400"
                          : user.role === "rider"
                            ? "bg-[#C7E36B]/15 text-[#C7E36B]"
                            : "bg-blue-500/15 text-blue-400"
                      }
                    `}
                  >
                    {user.role || "user"}
                  </span>
                </td>

                <td className="px-5 py-5 text-[#8A9A5B]">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="px-5 py-5">
                  <div className="flex items-center justify-center gap-3">
                    <button className="px-4 py-2 rounded-xl bg-[#C7E36B] text-[#1E1E1E] font-bold hover:scale-105 transition">
                      {user.role === "admin" ? (
                        <FaUserMinus
                          onClick={() => handleremoveUser(user)}
                          className="text-red-600"
                        ></FaUserMinus>
                      ) : (
                        <FaUserPlus
                          className="text-green-400"
                          onClick={() => handlemakeUser(user)}
                        ></FaUserPlus>
                      )}
                    </button>

                    <button className="px-4 py-2 rounded-xl border border-red-400/40 text-red-400 hover:bg-red-400/10 transition">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-12 text-[#8A9A5B]">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
