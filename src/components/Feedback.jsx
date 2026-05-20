import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaQuoteRight } from "react-icons/fa6";

// const reviews = [
//   {
//     name: "Awlad Hossin",
//     role: "Senior Product Designer",
//     text: "We Shift made my parcel delivery smooth and stress-free. The tracking was accurate, support was quick, and the package arrived safely on time.",
//   },
//   {
//     name: "Rasel Ahamed",
//     role: "CTO",
//     text: "Their service feels professional and reliable. I could easily book, track, and receive delivery updates without any confusion.",
//   },
//   {
//     name: "Nasir Uddin",
//     role: "CEO",
//     text: "Fast delivery, safe handling, and excellent customer support. We Shift is a great choice for both personal and business shipments.",
//   },
// ];

const CustomerReviews = () => {
  const [active, setActive] = useState(0);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("../../public/reviews.json")
      .then((data) => data.json())
      .then((x) => {
        console.log(x);
        setReviews(x);
      });
  }, []);

  const prevSlide = () => {
    setActive((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActive((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className=" py-24 px-5 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#C7E36B]">
          What our customers are saying
        </h2>

        <p className="mt-5 text-[#8A9A5B] max-w-3xl mx-auto leading-relaxed">
          Trusted by customers for safe delivery, live tracking, and reliable
          shifting service.
        </p>

        <div className="relative mt-16 flex items-center justify-center">
          {reviews.map((review, index) => {
            const isActive = index === active;
            const isLeft =
              index === (active - 1 + reviews.length) % reviews.length;
            const isRight = index === (active + 1) % reviews.length;

            return (
              <div
                key={index}
                className={`
                  absolute md:w-87.5 w-75
                  rounded-3xl p-8 text-left
                  border border-[#C7E36B]/20
                  bg-linear-to-br from-[#263226] to-[#151515]
                  shadow-[0_0_35px_rgba(199,227,107,0.12)]
                  transition-all duration-500
                  ${
                    isActive
                      ? "scale-100 opacity-100 z-20 translate-x-0"
                      : isLeft
                        ? "scale-90 opacity-30 z-10 -translate-x-90"
                        : isRight
                          ? "scale-90 opacity-30 z-10 translate-x-90"
                          : "scale-75 opacity-0 z-0"
                  }
                `}
              >
                <FaQuoteRight className="text-[#C7E36B]/50 text-4xl mb-5" />

                <p className="text-[#D6E6B4] leading-relaxed">
                  {review.review}
                </p>

                <div className="border-t border-dashed border-[#C7E36B]/40 my-6" />

                <div className="flex items-center gap-4">
                  <div>
                    <img
                      className="w-12 h-12 rounded-full "
                      src={review.user_photoURL}
                    ></img>
                  </div>

                  <div>
                    <h4 className="text-[#C7E36B] font-extrabold text-lg">
                      {review.userName}
                    </h4>
                    <p className="text-[#8A9A5B] text-sm">{review.role}</p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="h-90" />
        </div>

        <div className="flex items-center justify-center gap-5 mt-3">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-[#263226] text-[#C7E36B] border border-[#C7E36B]/30 flex items-center justify-center hover:bg-[#C7E36B] hover:text-[#1E1E1E] transition-all duration-300"
          >
            <FaArrowLeft />
          </button>

          <div className="flex gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  active === index ? "bg-[#C7E36B] w-6" : "bg-[#8A9A5B]"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-[#C7E36B] text-[#1E1E1E] flex items-center justify-center hover:scale-110 transition-all duration-300"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
