import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Payment = () => {
  const { parcel_id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: parcel, isLoading } = useQuery({
    queryKey: ["parcel", parcel_id],
    queryFn: async () => {
      const res = await axios.get(
        `https://we-shift-server.vercel.app/parcels/${parcel_id}`,
      );

      return res.data;
    },
  });
  console.log(parcel);
  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcel_id: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6">
        {/* Parcel Details */}
        <div className="bg-[#111111] border border-gray-800 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-[#C7E36B] mb-6">
            Parcel Details
          </h2>

          <div className="space-y-5">
            <div>
              <p className="text-gray-400 text-sm">Parcel Name</p>
              <p className="text-white text-lg font-medium">
                {parcel.senderName}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Sender</p>
              <p className="text-white">{parcel.senderName}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white">{parcel.senderEmail}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Destination</p>
              <p className="text-white">
                {parcel.recieverDistrict}, {parcel.recieverRegion}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Parcel Type</p>
              <span className="inline-block mt-1 px-3 py-1 rounded-full bg-[#C7E36B]/20 text-[#C7E36B]">
                {parcel.parcelType}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Card */}
        <div className="bg-[#111111] border border-gray-800 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Payment Summary
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between text-gray-300">
              <span>Delivery Charge</span>
              <span>৳ {parcel.cost}</span>
            </div>

            <div className="border-t border-gray-800 pt-4 flex justify-between">
              <span className="text-lg text-white font-semibold">Total</span>

              <span className="text-3xl font-bold text-[#C7E36B]">
                ৳ {parcel.cost}
              </span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="w-full mt-8 bg-[#C7E36B] text-black font-bold py-4 rounded-2xl hover:scale-[1.02] transition-all duration-200"
          >
            Pay Now
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Secure payment powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
