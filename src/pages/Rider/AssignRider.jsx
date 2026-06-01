import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { HiUserAdd } from "react-icons/hi";
import { useRef, useState } from "react";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);
  const [selectedParcel, setSelectedParcel] = useState(null);

  const { isLoading, data: parcels = [] } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const result = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup",
      );
      return result.data.data;
    },
  });
  const { data: riders = [], isLoading: ridersLoading } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],

    enabled: !!selectedParcel,

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel?.senderDistrict}&workingStatus=available`,
      );

      return res.data;
    },
  });

  console.log(selectedParcel?.senderDistrict, riders);

  const openModal = (parcel) => {
    setSelectedParcel(parcel);
    modalRef.current?.showModal();
  };

  if (isLoading) {
    return <span className="text-[#C7E36B]">Loading...</span>;
  }

  const handleAssignRider = (rider) => {
    console.log("Selected Parcel:", selectedParcel);
    console.log("Selected Rider:", rider);

    // later you will PATCH backend here
  };

  return (
    <>
      <div className="overflow-x-auto rounded-4xl border border-[#C7E36B]/10 bg-[#1E1E1E] shadow-[0_0_40px_rgba(199,227,107,0.05)]">
        <table className="w-full min-w-275">
          <thead>
            <tr className="bg-[#232323] border-b border-[#C7E36B]/10">
              <th className="px-6 py-5 text-left text-[#C7E36B]">
                Tracking ID
              </th>
              <th className="px-6 py-5 text-left text-[#C7E36B]">Parcel</th>
              <th className="px-6 py-5 text-left text-[#C7E36B]">Route</th>
              <th className="px-6 py-5 text-left text-[#C7E36B]">Amount</th>
              <th className="px-6 py-5 text-left text-[#C7E36B]">Payment</th>
              <th className="px-6 py-5 text-left text-[#C7E36B]">Delivery</th>
              <th className="px-6 py-5 text-left text-[#C7E36B]">Rider</th>
              <th className="px-6 py-5 text-center text-[#C7E36B]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel) => (
              <tr
                key={parcel._id}
                className="border-b border-[#C7E36B]/5 hover:bg-[#C7E36B]/5 transition-all duration-300"
              >
                <td className="px-6 py-5">
                  <p className="font-bold text-[#C7E36B]">
                    {parcel.trackingId}
                  </p>
                  <p className="text-xs text-[#8A9A5B]">
                    {parcel._id?.slice(-8)}
                  </p>
                </td>

                <td className="px-6 py-5">
                  <p className="font-semibold text-white">
                    {parcel.parcelName}
                  </p>
                  <p className="text-sm text-[#8A9A5B]">{parcel.parcelType}</p>
                </td>

                <td className="px-6 py-5">
                  <p className="text-white">{parcel.senderDistrict}</p>
                  <p className="text-[#C7E36B] text-xs">↓</p>
                  <p className="text-white">{parcel.recieverDistrict}</p>
                </td>

                <td className="px-6 py-5">
                  <span className="font-bold text-[#C7E36B] text-lg">
                    ৳ {parcel.cost}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span className="px-3 py-2 rounded-full bg-green-500/10 text-green-400 text-xs font-bold">
                    Paid
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span className="whitespace-nowrap px-3 py-2 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-bold">
                    {parcel.deliveryStatus}
                  </span>
                </td>

                <td className="px-6 py-5">
                  {parcel.riderName ? (
                    <div>
                      <p className="text-white">{parcel.riderName}</p>
                      <p className="text-xs text-[#8A9A5B]">Assigned</p>
                    </div>
                  ) : (
                    <span className="text-red-400 font-semibold">
                      Unassigned
                    </span>
                  )}
                </td>

                <td className="px-6 py-5 text-center">
                  <button
                    title="Assign Rider"
                    onClick={() => openModal(parcel)}
                    className="w-11 h-11 rounded-xl bg-[#C7E36B] text-[#1E1E1E] flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-300"
                  >
                    <HiUserAdd className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-3xl bg-[#1E1E1E] border border-[#C7E36B]/20 rounded-4xl">
          <h2 className="text-3xl font-bold text-[#C7E36B]">Assign Rider</h2>

          {/* PARCEL INFO */}
          <div className="mt-6 rounded-3xl border border-[#C7E36B]/10 bg-[#232323] p-5">
            <p className="text-white font-bold">
              Parcel: {selectedParcel?.parcelName}
            </p>

            <p className="text-[#8A9A5B] mt-1">
              Tracking ID: {selectedParcel?.trackingId}
            </p>

            <p className="text-[#8A9A5B] mt-1">
              Route: {selectedParcel?.senderDistrict} →{" "}
              {selectedParcel?.recieverDistrict}
            </p>
          </div>

          {/* RIDERS */}
          <div className="mt-6">
            <h3 className="text-xl font-bold text-[#C7E36B] mb-4">
              Available Riders
            </h3>

            {ridersLoading && (
              <p className="text-[#8A9A5B]">Loading riders...</p>
            )}

            {!ridersLoading && riders.length === 0 && (
              <p className="text-red-400">
                No available rider found for this district.
              </p>
            )}

            <div className="space-y-4 max-h-90 overflow-y-auto pr-2">
              {riders.map((rider) => (
                <div
                  key={rider._id}
                  className="
              rounded-3xl
              border
              border-[#C7E36B]/10
              bg-[#232323]
              p-5
              flex
              items-center
              justify-between
              gap-5
              hover:border-[#C7E36B]/40
              hover:bg-[#2A3322]
              transition-all
            "
                >
                  <div>
                    <h4 className="text-white font-bold text-lg">
                      {rider.name}
                    </h4>

                    <p className="text-[#8A9A5B] text-sm">{rider.email}</p>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <span className="px-3 py-1 rounded-full bg-[#C7E36B]/10 text-[#C7E36B]">
                        {rider.district}
                      </span>

                      <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400">
                        {rider.workingStatus}
                      </span>

                      <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">
                        {rider.bike}
                      </span>
                    </div>

                    <p className="text-[#8A9A5B] text-sm mt-3">
                      Phone: {rider.phone}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAssignRider(rider)}
                    className="
                px-5
                py-3
                rounded-2xl
                bg-[#C7E36B]
                text-[#1E1E1E]
                font-bold
                hover:scale-105
                transition-all
                whitespace-nowrap
              "
                  >
                    Assign
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="px-5 py-2 rounded-xl border border-[#C7E36B]/30 text-[#C7E36B]">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AssignRider;
