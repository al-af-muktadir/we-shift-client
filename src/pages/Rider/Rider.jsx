import { useForm, useWatch } from "react-hook-form";
import logo from "../../../../../Zap-shift-Resources/assets/agent-pending.png";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const serviceCenter = useLoaderData();
  const region = serviceCenter.map((c) => c.region);
  const regions = [...new Set(region)];
  const Regions = useWatch({ name: "region", control });

  const districtbyRegion = (region) => {
    const regionDistrict = serviceCenter.filter((c) => c.region === region);
    const districts = regionDistrict.map((d) => d.district);
    return districts;
  };

  const handleFrom = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title:
            "Your application has been submitted, We will reach to you in 15 days",
          showConfirmButton: "flase",
          timer: 2500,
        });
      }
    });
  };
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-[#C7E36B]">Be A Rider</h1>

        <p className="text-[#8A9A5B] mt-4 max-w-3xl">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-[#232323] border border-[#C7E36B]/20 rounded-[32px] p-8 lg:p-10">
        <h2 className="text-3xl font-bold text-[#C7E36B] mb-8">
          Tell us about yourself
        </h2>

        <form
          onSubmit={handleSubmit(handleFrom)}
          className="grid lg:grid-cols-2 gap-10"
        >
          {/* Left Side Form */}
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-[#C7E36B] font-medium">Your Name</label>

              <input
                {...register("name", {
                  required: "Name is required",
                })}
                type="text"
                placeholder="Your Name"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-[#1E1E1E] border border-gray-700 focus:border-[#C7E36B] outline-none text-white"
              />

              {errors.name && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* License */}
            <div>
              <label className="text-[#C7E36B] font-medium">
                Driving License Number
              </label>

              <input
                {...register("license", {
                  required: "License number is required",
                })}
                type="text"
                placeholder="Driving License Number"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-[#1E1E1E] border border-gray-700 focus:border-[#C7E36B] outline-none text-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-[#C7E36B] font-medium">Your Email</label>

              <input
                {...register("email")}
                type="email"
                placeholder="Your Email"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-[#1E1E1E] border border-gray-700 focus:border-[#C7E36B] outline-none text-white"
              />
            </div>

            {/* Region */}
            <div>
              <label className="text-[#C7E36B] font-medium">Your Region</label>

              <select
                className="
              w-full
              px-5
              py-4
              rounded-2xl
              bg-[#1E1E1E]
              border
              border-[#C7E36B]/20
              outline-none
              text-[#8A9A5B]
            "
                {...register("region")}
              >
                <option>Select your Region</option>
                {regions.map((r, idx) => (
                  <option key={idx} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="text-[#C7E36B] font-medium">
                Your District
              </label>

              <select
                className="
              w-full
              px-5
              py-4
              rounded-2xl
              bg-[#1E1E1E]
              border
              border-[#C7E36B]/20
              outline-none
              text-[#8A9A5B]
            "
                {...register("district")}
              >
                <option>Select your District</option>
                {districtbyRegion(Regions).map((r, idx) => (
                  <option key={idx} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* NID */}
            <div>
              <label className="text-[#C7E36B] font-medium">NID No</label>

              <input
                {...register("nid")}
                type="text"
                placeholder="NID Number"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-[#1E1E1E] border border-gray-700 focus:border-[#C7E36B] outline-none text-white"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-[#C7E36B] font-medium">Phone Number</label>

              <input
                {...register("phone")}
                type="text"
                placeholder="Phone Number"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-[#1E1E1E] border border-gray-700 focus:border-[#C7E36B] outline-none text-white"
              />
            </div>

            {/* Bike */}
            <div>
              <label className="text-[#C7E36B] font-medium">
                Bike Brand Model & Year
              </label>

              <input
                {...register("bike")}
                type="text"
                placeholder="Bike Brand Model and Year"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-[#1E1E1E] border border-gray-700 focus:border-[#C7E36B] outline-none text-white"
              />
            </div>

            {/* Registration */}
            <div>
              <label className="text-[#C7E36B] font-medium">
                Bike Registration Number
              </label>

              <input
                {...register("bikeRegistration")}
                type="text"
                placeholder="Bike Registration Number"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-[#1E1E1E] border border-gray-700 focus:border-[#C7E36B] outline-none text-white"
              />
            </div>

            {/* About */}
            <div>
              <label className="text-[#C7E36B] font-medium">
                Tell Us About Yourself
              </label>

              <textarea
                rows="4"
                {...register("about")}
                placeholder="Tell Us About Yourself"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-[#1E1E1E] border border-gray-700 focus:border-[#C7E36B] outline-none text-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#C7E36B] text-[#1E1E1E] font-bold hover:scale-[1.02] transition"
            >
              Submit Application
            </button>
          </div>

          {/* Right Side Image Placeholder */}
          <div className="hidden lg:flex items-start justify-center">
            <div
              className="
      w-full
      h-full
      min-h-175
      rounded-3xl
      border-2
      border-dashed
      border-[#C7E36B]/30
      bg-[#1E1E1E]
      flex
      items-start
      justify-center
      pt-12
    "
            >
              <img
                src={logo}
                alt="Rider"
                className="w-full max-w-md object-contain"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Rider;
