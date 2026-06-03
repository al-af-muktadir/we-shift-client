import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
// import { FaBoxOpen, FaTruckPickup } from "react-icons/fa";
// import { FaArrowTurnDown, FaCircleCheck } from "react-icons/fa6";

const DelivaryStats = () => {
  const axiosSecure = useAxiosSecure();
  const { data: stats = [] } = useQuery({
    queryKey: ["parcel-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/deliveryStatus/admin");
      return res.data;
    },
  });

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {stats.map((item) => (
          <div
            key={item._id}
            className="
            bg-[#1E1E1E]
            border border-[#C7E36B]/20
            rounded-3xl
            p-5
            shadow-lg
            hover:border-[#C7E36B]
            hover:-translate-y-1
            transition-all
          "
          >
            <p className="text-[#8A9A5B] text-sm font-semibold capitalize">
              {item._id}
            </p>

            <h2 className="text-4xl font-extrabold text-[#C7E36B] mt-4">
              {item.count}
            </h2>

            <div className="mt-4 h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C7E36B]"
                style={{
                  width: `${Math.min(item.count * 10, 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pie Chart Section */}
      <div className="bg-[#1E1E1E] border border-[#C7E36B]/20 rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-[#C7E36B] mb-2">
          Delivery Status Distribution
        </h2>

        <p className="text-[#8A9A5B] mb-6">
          Parcel distribution across all delivery stages
        </p>

        <div className="h-100 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stats}
                dataKey="count"
                nameKey="_id"
                outerRadius={140}
                innerRadius={70}
                paddingAngle={5}
                label
              >
                {stats.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      ["#C7E36B", "#60A5FA", "#FACC15", "#FB923C", "#4ADE80"][
                        index % 5
                      ]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DelivaryStats;
