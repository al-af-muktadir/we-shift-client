import { Link } from "react-router";
import { FaCircleXmark } from "react-icons/fa6";

const PaymentCancelled = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-5">
      <div className="max-w-lg w-full text-center rounded-[36px] border border-red-500/30 bg-[#232323] p-10 shadow-[0_0_45px_rgba(248,113,113,0.12)]">
        <FaCircleXmark className="text-red-400 text-7xl mx-auto mb-6" />

        <h1 className="text-4xl font-bold text-red-400">Payment Cancelled</h1>

        <p className="text-[#8A9A5B] mt-4">
          Your payment was cancelled. You can try again anytime.
        </p>

        <Link
          to="/dashboard/my-parcels"
          className="inline-block mt-8 px-8 py-3 rounded-xl border border-[#C7E36B] text-[#C7E36B] font-bold hover:bg-[#C7E36B] hover:text-[#1E1E1E] transition"
        >
          Back To Parcels
        </Link>
      </div>
    </section>
  );
};

export default PaymentCancelled;
