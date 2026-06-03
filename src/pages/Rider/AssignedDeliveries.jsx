import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
// import { FcRight } from "react-icons/fc";
import { FaCross } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

const AssignedDeliveries = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}`,
      );
      return res.data;
    },
  });
  console.log(parcels);

  const handleAccept = (parcel) => {
    console.log(parcel);
    const statusInfo = {
      deliveryStatus: "assign_accepted",
      trackingId: parcel.trackingId,
    };
    axiosSecure
      .patch(`/parcels/${parcel._id}/reviewassign`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Thank you for Accepting the Request",
            timer: 3000,
          });
        }
      });
  };
  const handleDecline = (parcel) => {
    const statusInfo = {
      deliveryStatus: "assign_declined",
    };
    axiosSecure
      .patch(`/parcels/${parcel._id}/reviewassign`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "You have declined the Request",
            timer: 3000,
          });
        }
      });
  };

  const handlePickup = (parcel) => {
    axiosSecure
      .patch(`/parcels/${parcel._id}/reviewassign`, {
        deliveryStatus: "picked_up",
      })
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();

          Swal.fire({
            icon: "success",
            title: "Parcel Picked Up",
            timer: 2000,
          });
        }
      });
  };

  const handleDelivered = (parcel) => {
    axiosSecure
      .patch(`/parcels/${parcel._id}/reviewassign`, {
        deliveryStatus: "delivered",
      })
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();

          Swal.fire({
            icon: "success",
            title: "Parcel Delivered Successfully",
            timer: 2000,
          });
        }
      });
  };

  const handleCashout = () => {};

  return (
    <div className="w-full max-w-full overflow-hidden rounded-4xl border border-[#C7E36B]/20 bg-[#1E1E1E] p-4 md:p-5">
      <h2 className="text-2xl md:text-3xl font-bold text-[#C7E36B] mb-6">
        My Assigned Deliveries
      </h2>

      <div className="w-full overflow-x-auto rounded-2xl border border-[#C7E36B]/10">
        <table className="w-full min-w-275 table-auto">
          <thead className="bg-[#232323]">
            <tr className="text-left border-b border-[#C7E36B]/20">
              {[
                "Tracking",
                "Parcel",
                "Pickup",
                "Delivery",
                "Receiver",
                "Cost",
                "Payout",
                "Status",
                "Actions",
                "Delivery Progress",
              ].map((head) => (
                <th
                  key={head}
                  className="px-4 py-4 text-[#C7E36B] whitespace-nowrap text-sm"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel) => (
              <tr
                key={parcel._id}
                className="border-b border-[#C7E36B]/10 hover:bg-[#C7E36B]/5 transition"
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <p className="font-bold text-[#C7E36B]">
                    {parcel.trackingId}
                  </p>
                  <p className="text-xs text-[#8A9A5B]">
                    #{parcel._id?.slice(-8)}
                  </p>
                </td>

                <td className="px-4 py-4 max-w-42.5">
                  <p className="font-semibold text-white truncate">
                    {parcel.parcelName}
                  </p>
                  <p className="text-sm text-[#8A9A5B] truncate">
                    {parcel.parcelType} • {parcel.parcelWeight}kg
                  </p>
                </td>

                <td className="px-4 py-4 max-w-35">
                  <p className="text-white truncate">{parcel.senderDistrict}</p>
                  <p className="text-xs text-[#8A9A5B] truncate">
                    {parcel.senderRegion}
                  </p>
                </td>

                <td className="px-4 py-4 max-w-35">
                  <p className="text-white truncate">
                    {parcel.recieverDistrict}
                  </p>
                  <p className="text-xs text-[#8A9A5B] truncate">
                    {parcel.recieverRegion}
                  </p>
                </td>

                <td className="px-4 py-4 max-w-40">
                  <p className="text-white font-medium truncate">
                    {parcel.recieverName}
                  </p>
                  <p className="text-xs text-[#8A9A5B] truncate">
                    {parcel.recieverPhone}
                  </p>
                </td>

                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="font-bold text-[#C7E36B]">
                    ৳ {parcel.cost}
                  </span>
                </td>

                <td className="px-4 py-4 whitespace-nowrap">
                  {parcel.deliveryStatus === "delivered" ? (
                    <button
                      onClick={() => handleCashout(parcel)}
                      className="px-3 py-2 rounded-xl bg-[#C7E36B] text-[#1E1E1E] text-sm font-bold hover:scale-105 transition"
                    >
                      💰 Cash Out
                    </button>
                  ) : (
                    <span className="text-[#8A9A5B] text-sm">Pending</span>
                  )}
                </td>

                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="px-3 py-2 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-bold">
                    {parcel.deliveryStatus}
                  </span>
                </td>

                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {parcel.deliveryStatus === "driver_assigned" && (
                      <>
                        <button
                          onClick={() => handleAccept(parcel)}
                          className="px-3 py-2 rounded-xl bg-[#C7E36B] text-[#1E1E1E] text-sm font-bold hover:scale-105 transition"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() => handleDecline(parcel)}
                          className="px-3 py-2 rounded-xl border border-red-500/40 text-red-400 text-sm hover:bg-red-500/10 transition"
                        >
                          Decline
                        </button>
                      </>
                    )}

                    {["assign_accepted", "picked_up", "delivered"].includes(
                      parcel.deliveryStatus,
                    ) && <FaCircleCheck className="text-green-500 text-2xl" />}

                    {parcel.deliveryStatus === "assign_declined" && (
                      <FaCross className="text-red-500 text-2xl" />
                    )}
                  </div>
                </td>

                <td className="px-4 py-4 whitespace-nowrap">
                  {parcel.deliveryStatus === "assign_accepted" && (
                    <button
                      onClick={() => handlePickup(parcel)}
                      className="px-3 py-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 text-sm font-semibold hover:scale-105 transition"
                    >
                      Mark Pickup
                    </button>
                  )}

                  {parcel.deliveryStatus === "picked_up" && (
                    <button
                      onClick={() => handleDelivered(parcel)}
                      className="px-3 py-2 rounded-xl bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-sm font-semibold hover:scale-105 transition"
                    >
                      Mark Delivered
                    </button>
                  )}

                  {parcel.deliveryStatus === "delivered" && (
                    <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-green-500/10 text-green-400 text-xs font-bold">
                      Delivered <FaCircleCheck />
                    </span>
                  )}

                  {["driver_assigned", "assign_declined"].includes(
                    parcel.deliveryStatus,
                  ) && <span className="text-[#8A9A5B] text-sm">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
