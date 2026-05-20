import { FaLocationDot, FaShieldHalved, FaHeadset } from "react-icons/fa6";

const serviceInfo = [
  {
    id: 1,
    icon: <FaLocationDot />,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment journey easily.",
  },
  {
    id: 2,
    icon: <FaShieldHalved />,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with care and delivered securely to their destination with a safe and reliable process.",
  },
  {
    id: 3,
    icon: <FaHeadset />,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with questions, updates, or delivery concerns.",
  },
];

const ServiceFeatures = () => {
  return (
    <section className="w-full py-20 px-5">
      <div className=" mx-auto space-y-6">
        {serviceInfo.map((item) => (
          <div
            key={item.id}
            className="
              bg-gradient-to-br from-[#263226] to-[#151515]
              border border-[#C7E36B]/20
              rounded-3xl
              p-8
              flex flex-col md:flex-row
              items-center md:items-center
              gap-8
              shadow-[0_0_30px_rgba(199,227,107,0.08)]
              hover:shadow-[0_0_45px_rgba(199,227,107,0.18)]
              hover:border-[#C7E36B]/50
              transition-all duration-300
            "
          >
            <div className="w-32 h-32 rounded-3xl bg-[#C7E36B]/10 border border-[#C7E36B]/20 flex items-center justify-center text-[#C7E36B] text-6xl shrink-0">
              {item.icon}
            </div>

            <div className="hidden md:block h-24 border-l-2 border-dashed border-[#C7E36B]/40" />

            <div className="text-center md:text-left">
              <h3 className="text-2xl font-extrabold text-[#C7E36B] mb-4">
                {item.title}
              </h3>

              <p className="text-[#8A9A5B] leading-relaxed max-w-3xl">
                {item.description}
              </p>
            </div>
          </div>
        ))}

        <div className="border-b-2 border-dashed border-[#C7E36B]/40 pt-8" />
      </div>
    </section>
  );
};

export default ServiceFeatures;
