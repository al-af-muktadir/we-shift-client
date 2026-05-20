import Banner from "../components/Banner";
import BrandMarquee from "../components/BrandMarquee";
import CustomerReviews from "../components/Feedback";
import HowItWorks from "../components/HowitWorks";
import ServiceFeatures from "../components/Info";

const Home = () => {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <BrandMarquee />
      <ServiceFeatures />
      <CustomerReviews />
    </div>
  );
};

export default Home;
