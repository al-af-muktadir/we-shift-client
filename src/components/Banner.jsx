import AwesomeSlider from "@rcaferati/react-awesome-slider";
import "@rcaferati/react-awesome-slider/styles.css";

import banner1 from "../../../../Zap-shift-Resources/assets/banner/banner1.png";
import banner2 from "../../../../Zap-shift-Resources/assets/banner/banner2.png";
import banner3 from "../../../../Zap-shift-Resources/assets/banner/banner3.png";

const Banner = () => {
  return (
    <section className="w-full px-4 py-8 overflow-hidden ">
      <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden  shadow-2xl border border-[#C7E36B]/20">
        <AwesomeSlider className="custom-slider">
          <div data-src={banner1} />
          <div data-src={banner2} />
          <div data-src={banner3} />
        </AwesomeSlider>
      </div>
    </section>
  );
};

export default Banner;
