import { NavLink } from "react-router";
import logo from "../../public/image.png";

const Navbar = () => {
  const navClass = ({ isActive }) =>
    isActive
      ? `text-[#C7E36B] underline decoration-[#C7E36B] underline-offset-8 decoration-4 font-bold `
      : "text-[#8A9A5B] hover:text-[#C7E36B] transition-colors duration-300 ";
  const links = (
    <>
      <NavLink to="/services" className={navClass}>
        <li>Services</li>
      </NavLink>
      <NavLink to="/coverage" className={navClass}>
        <li>Coverage</li>
      </NavLink>
      <NavLink to="/about-us" className={navClass}>
        <li>About Us</li>
      </NavLink>
      <NavLink to="/pricing" className={navClass}>
        <li>Pricing</li>
      </NavLink>
      <NavLink to="/blog" className={navClass}>
        <li>Blog</li>
      </NavLink>
      <NavLink to="/contact" className={navClass}>
        <li>Contact</li>
      </NavLink>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content  bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          ></ul>
        </div>
        <img className="w-36" src={logo}></img>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {" "}
          <div className="flex gap-6">{links}</div>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex gap-4">
          {/* SIGN IN */}
          <button
            className="
      px-6 py-2
      rounded-full
      bg-[#C7E36B]
      text-[#1E1E1E]
      font-bold
      border-2 border-[#C7E36B]
      hover:bg-transparent
      hover:text-[#C7E36B]
      transition-all
      duration-300
    "
          >
            Sign In
          </button>

          {/* SIGN UP */}
          <button
            className="
      px-6 py-2
      rounded-full
      bg-[#1E1E1E]
      text-[#C7E36B]
      font-bold
      border-2 border-[#C7E36B]
      hover:bg-[#C7E36B]
      hover:text-[#1E1E1E]
      transition-all
      duration-300
    "
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
