import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TrackParcel = () => {
  const { trackingId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: trackings = [], isLoading } = useQuery({
    queryKey: ["track", trackingId],
    enabled: !!trackingId,
    queryFn: async () => {
      const result = await axiosSecure.get(`/track/${trackingId}`);
      return result.data;
    },
  });

  const steps = [
    {
      key: "pennding_pickup",
      label: "Pending Pickup",
    },
    {
      key: "driver_assigned",
      label: "Rider Assigned",
    },
    {
      key: "assign_accepted",
      label: "Accepted",
    },
    {
      key: "picked_up",
      label: "Picked Up",
    },
    {
      key: "delivered",
      label: "Delivered",
    },
  ];

  const latestStatus = trackings?.[trackings.length - 1]?.status;
  const currentIndex = steps.findIndex((step) => step.key === latestStatus);

  if (isLoading) {
    return <span className="text-[#C7E36B]">Loading...</span>;
  }

  return (
    <div className="w-full max-w-full overflow-hidden rounded-3xl border border-[#C7E36B]/20 p-6">
      <h2 className="text-2xl font-bold text-[#C7E36B] mb-8">
        Parcel Tracking Progress
      </h2>

      <div className="w-full overflow-x-auto">
        <ul className="steps w-full min-w-225">
          {steps.map((step, index) => (
            <li
              key={step.key}
              className={`step ${index <= currentIndex ? "step-success" : ""}`}
            >
              <span className="text-[#C7E36B] font-semibold text-sm whitespace-nowrap">
                {step.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 space-y-3">
        {trackings.map((log) => (
          <div
            key={log._id}
            className="rounded-2xl border border-[#C7E36B]/10  p-4"
          >
            <p className="font-bold text-[#C7E36B]">{log.details}</p>

            <p className="text-sm text-[#8A9A5B] mt-1">Status: {log.status}</p>

            <p className="text-xs text-gray-500 mt-1">
              {new Date(log.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackParcel;
