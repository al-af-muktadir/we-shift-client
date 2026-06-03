import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [] } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  console.log(parcels, "parcels");
  return (
    <div className="bg-[#111111] rounded-2xl border border-gray-800 overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#181818]">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
              Parcel Info
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
              Recipient Info
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
              Tracking Number
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
              Payment Info
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {parcels.data?.map((parcel) => (
            <tr
              key={parcel._id}
              className="border-t border-gray-800 hover:bg-[#181818] transition"
            >
              {/* Parcel Info */}
              <td className="px-6 py-5">
                <div>
                  <h3 className="font-medium text-white">
                    {parcel.parcelName}
                  </h3>

                  <p className="text-sm text-gray-400 capitalize mt-1">
                    {parcel.parcelType}
                  </p>
                </div>
              </td>

              {/* Recipient Info */}
              <td className="px-6 py-5">
                <div className="space-y-1">
                  <h3 className="font-medium text-white">
                    {parcel.recieverName}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {parcel.recieverAddress}
                  </p>

                  <p className="text-sm text-gray-400">
                    {parcel.recieverDistrict}, {parcel.recieverRegion}
                  </p>

                  <p className="text-sm text-gray-400">
                    {parcel.recieverPhone}
                  </p>
                </div>
              </td>

              {/* Tracking */}
              <td className="px-6 py-5 text-gray-300">
                {parcel.trackingId ? (
                  <Link to={`/track-parcel/${parcel.trackingId}`}>
                    {" "}
                    {parcel.trackingId}
                  </Link>
                ) : (
                  <span>-</span>
                )}
              </td>

              {/* Payment */}
              <td className="px-6 py-5">
                {parcel.paymentStatus === "paid" ? (
                  <span className="text-[#C7E36B] text-sm">Paid</span>
                ) : (
                  <div>
                    <p className="text-white font-medium">৳ {parcel.cost}</p>

                    <Link to={`/dashboard/payment/${parcel._id}`}>
                      <button className="text-[#C7E36B] btn text-sm">
                        Please Pay
                      </button>
                    </Link>
                  </div>
                )}
              </td>

              {/* Action */}
              <td className="px-6 py-5">
                <button className="px-5 py-2 rounded-lg bg-[#C7E36B] text-black font-medium hover:opacity-90">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
