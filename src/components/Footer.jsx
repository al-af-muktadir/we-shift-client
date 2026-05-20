import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

import logo from "../../public/image.png"; // your logo imag
export default function Footer() {
  return (
    <footer className="text-white border-[#8A9A5B] border-t">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          {/* LEFT */}
          <div>
            <img
              src={logo}
              alt="We Shift Logo"
              className="w-44 object-contain"
            />

            <p className="mt-5 text-[#8A9A5B] leading-relaxed">
              Modern moving and shifting solution with trusted, fast and premium
              service experience.
            </p>
          </div>

          {/* CENTER */}
          <div>
            <h2 className="text-[#C7E36B] font-extrabold text-xl underline decoration-[#C7E36B] underline-offset-8 decoration-2">
              Quick Links
            </h2>

            <div className="flex flex-col gap-4 mt-6">
              <a
                href="/"
                className="text-[#8A9A5B] hover:text-[#C7E36B] transition-colors duration-300"
              >
                Home
              </a>

              <a
                href="/about"
                className="text-[#8A9A5B] hover:text-[#C7E36B] transition-colors duration-300"
              >
                About
              </a>

              <a
                href="/services"
                className="text-[#8A9A5B] hover:text-[#C7E36B] transition-colors duration-300"
              >
                Services
              </a>

              <a
                href="/contact"
                className="text-[#8A9A5B] hover:text-[#C7E36B] transition-colors duration-300"
              >
                Contact
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h2 className="text-[#C7E36B] font-extrabold text-xl underline decoration-[#C7E36B] underline-offset-8 decoration-2">
              Follow Us
            </h2>

            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="
                  w-11 h-11
                  rounded-full
                  border border-[#C7E36B]
                  flex items-center justify-center
                  text-[#C7E36B]
                  hover:bg-[#C7E36B]
                  hover:text-[#1E1E1E]
                  transition-all duration-300
                "
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="
                  w-11 h-11
                  rounded-full
                  border border-[#C7E36B]
                  flex items-center justify-center
                  text-[#C7E36B]
                  hover:bg-[#C7E36B]
                  hover:text-[#1E1E1E]
                  transition-all duration-300
                "
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="
                  w-11 h-11
                  rounded-full
                  border border-[#C7E36B]
                  flex items-center justify-center
                  text-[#C7E36B]
                  hover:bg-[#C7E36B]
                  hover:text-[#1E1E1E]
                  transition-all duration-300
                "
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="
                  w-11 h-11
                  rounded-full
                  border border-[#C7E36B]
                  flex items-center justify-center
                  text-[#C7E36B]
                  hover:bg-[#C7E36B]
                  hover:text-[#1E1E1E]
                  transition-all duration-300
                "
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-[#C7E36B]/20 mt-12 pt-6 text-center">
          <p className="text-[#8A9A5B] text-sm">
            © 2026 We Shift. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
