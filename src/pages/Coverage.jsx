import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRef, useState } from "react";
import { useLoaderData } from "react-router";
const Coverage = () => {
  const position = [23.685, 90.3563];
  const mapRef = useRef(null);
  const [place, setPlace] = useState("");
  const data = useLoaderData();
  console.log(data);

  const searchPlace = (e) => {
    e.preventDefault();
    const place = e.target.search.value;
    const district = data.find((c) =>
      c.district.toLowerCase().includes(place.toLowerCase()),
    );
    if (district) {
      const coord = [district.latitude, district.longitude];
      mapRef.current.flyTo(coord, 14);
    }
  };
  return (
    <div className="px-16 space-y-8">
      <h1 className="text-6xl mt-8 text-[#C7E36B]">
        We are available in 64 Districts
      </h1>
      <form onSubmit={searchPlace}>
        <input
          className="py-2 border-[#C7E36B] border-2 rounded-full px-10"
          placeholder="Search Now.."
          type="text"
          name="search"
          id=""
        />
      </form>

      <div
        className="
            rounded-4xl
            overflow-hidden
            w-full
            h-137.5
            border
            border-[#C7E36B]/20
            shadow-[0_0_45px_rgba(199,227,107,0.12)]
          "
      >
        <MapContainer
          ref={mapRef}
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          className="h-137.5 w-full z-10"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {data.map((c, idx) => (
            <Marker key={idx} position={[c.latitude, c.longitude]}>
              <Popup>
                <div className="w-72 max-w-full space-y-3 wrap-break-word">
                  <h2 className="font-extrabold text-lg leading-snug">
                    Our Service Centers are at:
                  </h2>

                  <p className="text-sm leading-relaxed whitespace-normal wrap-break-word">
                    {c.covered_area.join(", ")}
                  </p>

                  <p className="text-sm font-semibold">
                    {c.district}, Bangladesh
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
