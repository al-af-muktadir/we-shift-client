import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  const { data: riders = [], refetch } = useQuery({
    queryKey: ["iders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const UpdateRider = (rider, status) => {
    const updateInfo = { status, rider };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      console.log(res.data);
      refetch();
    });
  };
  const handleApproval = (rider, status) => {
    UpdateRider(rider, status);
  };
  const handleRejection = (rider, status) => {
    UpdateRider(rider, status);
  };

  return (
    <div className="rounded-4xl border border-[#C7E36B]/20 bg-[#1E1E1E] p-5 shadow-[0_0_45px_rgba(199,227,107,0.08)]">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-[#C7E36B]">
          Rider Applications
        </h2>
        <p className="text-[#8A9A5B] mt-2">
          Manage and review all rider registration requests.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#C7E36B]/10">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-[#232323]">
            <tr className="text-left text-[#C7E36B] border-b border-[#C7E36B]/20">
              <th className="px-5 py-4">#</th>
              <th className="px-5 py-4">Rider</th>
              <th className="px-5 py-4">Location</th>
              <th className="px-5 py-4">Phone</th>
              <th className="px-5 py-4">License</th>
              <th className="px-5 py-4">Bike</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {riders.map((rider, index) => (
              <tr
                key={rider._id}
                className="
                  border-b
                  border-[#C7E36B]/10
                  text-[#D6E6B4]
                  hover:bg-[#C7E36B]/5
                  transition-all
                  duration-300
                "
              >
                <td className="px-5 py-5 text-[#8A9A5B]">{index + 1}</td>

                <td className="px-5 py-5">
                  <div>
                    <p className="font-bold text-white">{rider.name}</p>
                    <p className="text-sm text-[#8A9A5B]">{rider.email}</p>
                  </div>
                </td>

                <td className="px-5 py-5">
                  <p className="font-semibold text-[#C7E36B]">
                    {rider.district}
                  </p>
                  <p className="text-sm text-[#8A9A5B]">{rider.region}</p>
                </td>

                <td className="px-5 py-5">{rider.phone}</td>

                <td className="px-5 py-5">
                  <span className="rounded-full bg-[#232323] border border-[#C7E36B]/20 px-4 py-2 text-sm">
                    {rider.license}
                  </span>
                </td>

                <td className="px-5 py-5">
                  <p>{rider.bike}</p>
                  <p className="text-sm text-[#8A9A5B]">
                    {rider.bikeRegistration}
                  </p>
                </td>

                <td className="px-5 py-5">
                  <span
                    className={`
                      px-4 py-2 rounded-full text-xs font-bold
                      ${
                        rider.status === "approved"
                          ? "bg-green-500/15 text-green-400"
                          : rider.status === "rejected"
                            ? "bg-red-500/15 text-red-400"
                            : "bg-yellow-500/15 text-yellow-400"
                      }
                    `}
                  >
                    {rider.status || "pending"}
                  </span>
                </td>

                <td className="px-5 py-5">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleApproval(rider, "approved")}
                      className="px-4 py-2 rounded-xl bg-[#C7E36B] text-[#1E1E1E] font-bold hover:scale-105 transition"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleRejection(rider, "rejected")}
                      className="px-4 py-2 rounded-xl border border-red-400/40 text-red-400 hover:bg-red-400/10 transition"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {riders.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-12 text-[#8A9A5B]">
                  No rider applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRider;
