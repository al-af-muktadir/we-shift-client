import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BsEye } from "react-icons/bs";
import { FaCross, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Register = () => {
  const { registerUser, updateUser } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const [see, setSee] = useState(false);
  const hanleRegister = (data) => {
    console.log(data.photo);

    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        console.log(import.meta.env.VITE_IMAGE);

        const image = data.photo[0];

        const formData = new FormData();

        formData.append("image", image);

        axios
          .post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE}`,
            formData,
          )
          .then((res) => {
            console.log(res.data);

            const userProfile = {
              displayName: data.name,
              photoURL: res.data.data.url,
            };

            updateUser(userProfile)
              .then((res) => {
                console.log("profile updated", res);
                navigate(location.state || "/");
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-full max-w-md mx-auto px-6 py-10">
      <h1 className="text-5xl font-extrabold text-[#C7E36B]">Create Account</h1>

      <p className="text-[#6B7280] mt-3 mb-8">Register with We Shift</p>

      <form onSubmit={handleSubmit(hanleRegister)} className="space-y-5">
        <div>
          <label className="text-sm font-semibold text-[#C7E36B]">Name</label>

          <div className="mt-2 flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 focus-within:border-[#C7E36B]">
            <FaUser className="text-[#8A9A5B]" />

            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              className="w-full bg-transparent outline-none text-[#C7E36B]"
              {...register("name")}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-[#C7E36B]">Email</label>

          <div className="mt-2 flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 focus-within:border-[#C7E36B]">
            <FaEnvelope className="text-[#8A9A5B]" />

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="w-full bg-transparent outline-none text-[#C7E36B]"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-[#C7E36B]">
            Password
          </label>

          <div className="mt-2 flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 focus-within:border-[#C7E36B]">
            <FaLock className="text-[#8A9A5B]" />

            <input
              type={see === false ? "password" : "text"}
              placeholder="Enter your password"
              {...register("password", {
                minLength: 6,
                pattern: /^(?=.*[A-Z]).+$/,
              })}
              className="w-full bg-transparent outline-none text-[#C7E36B]"
            />
            <span onClick={() => setSee(!see)}>
              {" "}
              {see === false ? <BsEye></BsEye> : <FaCross></FaCross>}
            </span>
            {errors.password?.type === "pattern" && (
              <span>Password should atleast have one upper case letter</span>
            )}
            {errors.password?.type === "minLength" && (
              <span>Password should atleast have 6 Charecter</span>
            )}
          </div>
        </div>

        <div
          className="
    relative
    w-full
    rounded-2xl
    border-2
    border-dashed
    border-[#C7E36B]/40
    bg-[#232323]
    hover:border-[#C7E36B]
    hover:bg-[#2A3322]
    transition-all
    duration-300
    overflow-hidden
  "
        >
          <input
            type="file"
            accept="image/*"
            {...register("photo")}
            onChange={(e) => setImage(e.target.files[0])}
            className="
      w-full
      h-40
      opacity-0
      cursor-pointer
      z-20
      relative
    "
          />

          <div
            className="
      absolute
      inset-0
      flex
      flex-col
      items-center
      justify-center
      pointer-events-none
    "
          >
            {/* ICON */}
            {!image && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-[#C7E36B]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            )}

            {/* TEXT */}
            {!image ? (
              <>
                <p className="mt-4 text-[#C7E36B] font-bold text-lg">
                  Upload Image
                </p>

                <span className="text-[#8A9A5B] text-sm mt-1">
                  PNG, JPG, JPEG
                </span>
              </>
            ) : (
              <>
                <p className="text-[#C7E36B] font-extrabold text-lg">
                  Image Selected ✓
                </p>

                <span className="text-[#8A9A5B] mt-2 text-sm px-4 text-center">
                  {image.name}
                </span>
              </>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-[#C7E36B] text-[#627621] font-extrabold hover:scale-[1.02] transition-all duration-300"
        >
          Register
        </button>
      </form>

      <p className="text-gray-500 mt-6 text-center">
        Already have an account?
        <Link
          state={location.state}
          to="/login"
          className="text-[#8A9A5B] font-bold ml-2 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
