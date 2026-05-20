import brand1 from "../../../../Zap-shift-Resources/assets/brands/amazon.png";
import brand2 from "../../../../Zap-shift-Resources/assets/brands/casio.png";
import brand3 from "../../../../Zap-shift-Resources/assets/brands/moonstar.png";
import brand4 from "../../../../Zap-shift-Resources/assets/brands/randstad.png";
import brand5 from "../../../../Zap-shift-Resources/assets/brands/randstad.png";
import brand6 from "../../../../Zap-shift-Resources/assets/brands/start_people.png";

const brands = [brand1, brand2, brand3, brand4, brand5, brand6];

const BrandMarquee = () => {
  return (
    <section className=" py-20 overflow-hidden">
      {/* TITLE */}
      <div className="text-center mb-14 px-4">
        <h2
          className="
            text-4xl
            md:text-5xl
            font-bold
            text-[#C7E36B]
            
          "
        >
          Trusted By Brands
        </h2>

        <p
          className="
            mt-5
            text-[#8A9A5B]
            text-lg
            max-w-2xl
            mx-auto
          "
        >
          Companies and partners who trust our premium shifting and logistics
          services.
        </p>
      </div>

      {/* MARQUEE */}
      <div
        className="
          flex
          w-max
          animate-marquee
          gap-8
          hover:[animation-play-state:paused]
        "
      >
        {[...brands, ...brands].map((brand, index) => (
          <div
            key={index}
            className="
              min-w-[220px]
              h-[120px]
              rounded-3xl
              border-2
              border-[#C7E36B]/40
              bg-gradient-to-br
              from-[#2A3322]
              via-[#232323]
              to-[#1A1A1A]
              shadow-[0_0_30px_rgba(199,227,107,0.15)]
              flex
              items-center
              justify-center
              px-8
              transition-all
              duration-300
              hover:scale-105
              hover:border-[#C7E36B]
              hover:shadow-[0_0_45px_rgba(199,227,107,0.35)]
            "
          >
            <img
              src={brand}
              alt="brand"
              className="
                w-36
                h-20
                object-contain
                brightness-125
                contrast-125
                opacity-100
                transition-all
                duration-300
              "
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandMarquee;
