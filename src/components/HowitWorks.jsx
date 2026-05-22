import {
  FaTruck,
  FaMoneyBillWave,
  FaWarehouse,
  FaBuilding,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaTruck />,
  },

  {
    id: 2,
    title: "Cash On Delivery",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaMoneyBillWave />,
  },

  {
    id: 3,
    title: "Delivery Hub",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaWarehouse />,
  },

  {
    id: 4,
    title: "Booking SME & Corporate",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaBuilding />,
  },
];

const HowItWorks = () => {
  return (
    <section className=" py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* HEADING */}
        <div className="mb-14">
          <h2
            className="
              text-4xl
              md:text-5xl
              font-bold
              text-[#C7E36B]
              
            "
          >
            How it Works
          </h2>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item) => (
            <div
              key={item.id}
              className="
                relative
                bg-linear-to-br
                from-[#263226]
                to-[#1B1B1B]
                rounded-3xl
                p-8
                border
                border-[#C7E36B]/10
                hover:border-[#C7E36B]/40
                shadow-lg
                hover:shadow-[0_0_30px_rgba(199,227,107,0.15)]
                transition-all
                duration-300
                group
                overflow-hidden
              "
            >
              {/* GLOW EFFECT */}
              <div
                className="
                  absolute
                  top-0
                  right-0
                  w-32
                  h-32
                  bg-[#C7E36B]/10
                  blur-3xl
                  rounded-full
                "
              />

              {/* ICON */}
              <div
                className="
                  relative
                  w-16
                  h-16
                  rounded-2xl
                  bg-[#C7E36B]/10
                  border
                  border-[#C7E36B]/20
                  flex
                  items-center
                  justify-center
                  text-3xl
                  text-[#C7E36B]
                  mb-7
                  group-hover:scale-110
                  transition-transform
                  duration-300
                "
              >
                {item.icon}
              </div>

              {/* TITLE */}
              <h3
                className="
                  relative
                  text-2xl
                  font-extrabold
                  text-white
                  mb-4
                "
              >
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p
                className="
                  relative
                  text-[#8A9A5B]
                  leading-relaxed
                  text-lg
                "
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
