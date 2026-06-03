import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BsEye } from "react-icons/bs";
import { FaCross, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";

const Login = () => {
  const [see, setSee] = useState(false);
  const { loading } = useContext(AuthContext);
  const { role, isLoading, refetch } = useRole();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { signInUser, signInwithGoogle } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((data) => {
        console.log(data);
        navigate(location.state || "/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleGoogle = () => {
    signInwithGoogle()
      .then((result) => {
        refetch();

        console.log(result);

        const userInfo = {
          email: result.user?.email,
          displayName: result.user?.displayName,
          photoURL: result.user?.photoURL,
        };
        console.log("sociallogi", userInfo);
        axiosSecure.post("/users", userInfo).then((res) => {
          console.log(res.data, "in login soical  page");

          if (loading || isLoading) {
            <span>Loading</span>;
          }
          axiosSecure.get(`/users/${result.user.email}/role`).then((res) => {
            console.log(res.data);
            if (res.data.role !== "admin") {
              console.log(role, location.state);
              navigate(location.state || "/");
            } else {
              navigate("/");
            }
          });
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-full max-w-md mx-auto px-6 py-10">
      <h1 className="text-5xl font-extrabold text-[#C7E36B]">Log in Account</h1>
      <p className="text-[#6B7280] mt-3 mb-8">Login with We Shift</p>
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
        <div>
          <label className="text-sm font-semibold text-[#C7E36B]">Name</label>
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

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-[#C7E36B] text-[#627621] font-extrabold hover:scale-[1.02] transition-all duration-300"
        >
          Log in
        </button>
      </form>

      <button
        onClick={handleGoogle}
        type="button"
        className="
    w-full
    py-3.5
    rounded-xl
    border
    border-[#C7E36B]/30
    bg-[#4c5825]
    flex
    items-center
    justify-center
    gap-4
    font-bold
    text-[#1E1E1E]
    hover:bg-[#F7FEE7]
    transition-all mt-4
    duration-300
  "
      >
        <FcGoogle className="text-2xl" />
        Continue with Google
      </button>
      <p className="text-gray-500 mt-6 text-center">
        New to We shift?
        <Link
          state={location.state}
          to="/Register"
          className="text-[#8A9A5B] font-bold ml-2 hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
