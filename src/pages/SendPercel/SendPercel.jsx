import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sendparcel = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, control } = useForm();
  const axiosSecure = useAxiosSecure();

  //   const senderRegions = watch("senderRegion");
  const senderRegions = useWatch({ name: "senderRegion", control });
  const recieverRegions = useWatch({ name: "recieverRegion", control });
  const serviceCenter = useLoaderData();
  console.log(serviceCenter);
  const region = serviceCenter.map((c) => c.region);
  const regions = [...new Set(region)];

  const districtbyRegion = (region) => {
    const regionDistrict = serviceCenter.filter((c) => c.region === region);
    const districts = regionDistrict.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    console.log(data, "injs");

    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.recieverDistrict;
    // eslint-disable-next-line no-useless-assignment
    let cost = 0;
    const parcelWeight = parseFloat(data.parcelWeight);
    console.log(parcelWeight);
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        // eslint-disable-next-line no-unused-vars
        cost = minCharge + extraCharge;
      }
    }
    console.log(cost);
    data = { ...data, cost };
    Swal.fire({
      title: "Agree with the Cost?",
      text: `You Will be charged with ${cost}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((res) => {
          console.log(res.data);

          if (res.data.result.insertedId) {
            Swal.fire({
              title: "Parcel Request has been sent",
              text: ".",
              icon: "success",
            });
            navigate("/dashboard/my-parcel");
          }
        });
      }
    });
  };

  return (
    <div className=" min-h-screen py-16 px-5">
      <div
        className="
      max-w-7xl
      mx-auto
      rounded-[40px]
      border
      border-[#C7E36B]/20
      
      shadow-[0_0_50px_rgba(199,227,107,0.08)]
      p-8
      md:p-14
    "
      >
        {/* TITLE */}
        <form onSubmit={handleSubmit(handleSendParcel)}>
          <div className="mb-14">
            <h1
              className="
          text-5xl
          font-bold
          text-[#C7E36B]
        "
            >
              Send A Parcel
            </h1>

            <p
              className="
          text-[#8A9A5B]
          mt-4
          text-lg
        "
            >
              Enter your parcel details
            </p>
          </div>

          {/* PARCEL TYPE */}
          <div className="flex items-center gap-10 mb-10">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="parcelType"
                value="document"
                {...register("parcelType")}
                className="
            radio
            radio-success
          "
              />

              <span className="text-[#C7E36B] font-semibold">Document</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="parcelType"
                value="non-document"
                {...register("parcelType")}
                className="
            radio
            radio-success
          "
              />

              <span className="text-[#C7E36B] font-semibold">Non-Document</span>
            </label>
          </div>

          {/* PARCEL INFO */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <label className="text-[#C7E36B] font-semibold">
                Parcel Name
              </label>

              <input
                type="text"
                {...register("parcelName")}
                placeholder="Parcel Name"
                className="
            mt-3
            w-full
            px-5
            py-4
            rounded-2xl
            bg-[#1E1E1E]
            border
            border-[#C7E36B]/20
            outline-none
            text-[#C7E36B]
            placeholder-[#8A9A5B]
            focus:border-[#C7E36B]
          "
              />
            </div>

            <div>
              <label className="text-[#C7E36B] font-semibold">
                Parcel Weight (KG)
              </label>

              <input
                type="text"
                placeholder="Parcel Weight"
                {...register("parcelWeight")}
                className="
            mt-3
            w-full
            px-5
            py-4
            rounded-2xl
            bg-[#1E1E1E]
            border
            border-[#C7E36B]/20
            outline-none
            text-[#C7E36B]
            placeholder-[#8A9A5B]
            focus:border-[#C7E36B]
          "
              />
            </div>
          </div>

          {/* SENDER + RECEIVER */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* SENDER */}
            <div>
              <h2
                className="
            text-2xl
            font-bold
            text-[#C7E36B]
            mb-8
          "
              >
                Sender Details
              </h2>

              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="Sender Name"
                  {...register("senderName")}
                  className="
              w-full
              px-5
              py-4
              rounded-2xl
              bg-[#1E1E1E]
              border
              border-[#C7E36B]/20
              outline-none
              text-[#C7E36B]
              placeholder-[#8A9A5B]
            "
                />
                <input
                  type="text"
                  placeholder="Sender Email"
                  defaultValue={user.email}
                  {...register("senderEmail")}
                  className="
              w-full
              px-5
              py-4
              rounded-2xl
              bg-[#1E1E1E]
              border
              border-[#C7E36B]/20
              outline-none
              text-[#C7E36B]
              placeholder-[#8A9A5B]
            "
                />

                <input
                  type="text"
                  placeholder="Address"
                  {...register("senderAddress")}
                  className="
              w-full
              px-5
              py-4
              rounded-2xl
              bg-[#1E1E1E]
              border
              border-[#C7E36B]/20
              outline-none
              text-[#C7E36B]
              placeholder-[#8A9A5B]
            "
                />

                <input
                  type="text"
                  placeholder="Sender Phone No"
                  {...register("senderPhone")}
                  className="
              w-full
              px-5
              py-4
              rounded-2xl
              bg-[#1E1E1E]
              border
              border-[#C7E36B]/20
              outline-none
              text-[#C7E36B]
              placeholder-[#8A9A5B]
            "
                />

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
                  {...register("senderRegion")}
                >
                  <option>Select your Region</option>
                  {regions.map((r, idx) => (
                    <option key={idx} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
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
                  {...register("senderDistrict")}
                >
                  <option>Select your District</option>
                  {districtbyRegion(senderRegions).map((r, idx) => (
                    <option key={idx} value={r}>
                      {r}
                    </option>
                  ))}
                </select>

                <textarea
                  rows="5"
                  {...register("pickupInfo")}
                  placeholder="Pickup Instruction"
                  className="
              w-full
              px-5
              py-4
              rounded-2xl
              bg-[#1E1E1E]
              border
              border-[#C7E36B]/20
              outline-none
              resize-none
              text-[#C7E36B]
              placeholder-[#8A9A5B]
            "
                />
              </div>
            </div>

            {/* RECEIVER */}
            <div>
              <h2
                className="
            text-2xl
            font-bold
            text-[#C7E36B]
            mb-8
          "
              >
                Receiver Details
              </h2>

              <div className="space-y-6">
                <input
                  {...register("recieverName")}
                  type="text"
                  placeholder="Receiver Name"
                  className="
              w-full
              px-5
              py-4
              rounded-2xl
              bg-[#1E1E1E]
              border
              border-[#C7E36B]/20
              outline-none
              text-[#C7E36B]
              placeholder-[#8A9A5B]
            "
                />

                <input
                  type="text"
                  placeholder="Reciever Email"
                  {...register("recieverEmail")}
                  className="
              w-full
              px-5
              py-4
              rounded-2xl
              bg-[#1E1E1E]
              border
              border-[#C7E36B]/20
              outline-none
              text-[#C7E36B]
              placeholder-[#8A9A5B]
            "
                />

                <input
                  type="text"
                  placeholder="Receiver Address"
                  {...register("recieverAddress")}
                  className="
              w-full
              px-5
              py-4
              rounded-2xl
              bg-[#1E1E1E]
              border
              border-[#C7E36B]/20
              outline-none
              text-[#C7E36B]
              placeholder-[#8A9A5B]
            "
                />

                <input
                  type="text"
                  placeholder="Receiver Contact No"
                  {...register("recieverPhone")}
                  className="
              w-full
              px-5
              py-4
              rounded-2xl
              bg-[#1E1E1E]
              border
              border-[#C7E36B]/20
              outline-none
              text-[#C7E36B]
              placeholder-[#8A9A5B]
            "
                />

                <select
                  {...register("recieverRegion")}
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
                >
                  <option>Select your Region</option>
                  {regions.map((r, idx) => (
                    <option key={idx} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <select
                  {...register("recieverDistrict")}
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
                >
                  <option>Select your District</option>
                  {districtbyRegion(recieverRegions).map((r, idx) => (
                    <option key={idx} value={r}>
                      {r}
                    </option>
                  ))}
                </select>

                <textarea
                  rows="5"
                  {...register("deliveryInfo")}
                  placeholder="Delivery Instruction"
                  className="
              w-full
              px-5
              py-4
              rounded-2xl
              bg-[#1E1E1E]
              border
              border-[#C7E36B]/20
              outline-none
              resize-none
              text-[#C7E36B]
              placeholder-[#8A9A5B]
            "
                />
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <p className="text-[#8A9A5B]">* Pickup Time 4pm-7pm Approx.</p>

            <button
              type="submit"
              className="
          px-10
          py-4
          rounded-2xl
          bg-[#C7E36B]
          text-[#1E1E1E]
          font-bold
          hover:scale-[1.03]
          transition-all
          duration-300
        "
            >
              Proceed To Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sendparcel;
