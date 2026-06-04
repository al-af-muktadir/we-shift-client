import { Link, useSearchParams } from "react-router";
import { FaCircleCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .post(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res);
          setInfo(res.data);
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <section className="min-h-screen flex items-center justify-center px-5">
      <div className="max-w-lg w-full text-center rounded-[36px] border border-[#C7E36B]/30 bg-[#232323] p-10 shadow-[0_0_45px_rgba(199,227,107,0.15)]">
        <FaCircleCheck className="text-[#C7E36B] text-7xl mx-auto mb-6" />

        <h1 className="text-4xl font-bold text-[#C7E36B]">
          Payment Successful
        </h1>
        <h1 className="mt-4">
          Your Tracking Id : {paymentInfo?.trackingId} <br />
          Your Tracking Id : {paymentInfo?.transactionId}
        </h1>
        <p className="text-[#8A9A5B] mt-4">
          Your parcel payment has been completed successfully.
        </p>

        <Link
          to="/dashboard/my-parcel"
          className="inline-block mt-8 px-8 py-3 rounded-xl bg-[#C7E36B] text-[#1E1E1E] font-bold hover:scale-105 transition"
        >
          View My Parcels
        </Link>
      </div>
    </section>
  );
};

export default PaymentSuccess;
