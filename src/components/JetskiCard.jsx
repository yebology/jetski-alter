import React, { useState } from "react";
import jetskiImg from "../assets/aa.png";

const JetskiCard = ({ jetski }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex flex-col bg-gradient-to-b from-white to-gray-50 shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] duration-300 cursor-pointer w-full h-full">
      {/* Gambar */}
      <div className="bg-gray-100 rounded-t-2xl flex items-center justify-center p-6">
        <img
          src={jetskiImg}
          alt={jetski.model}
          className="w-full max-h-56 object-contain"
        />
      </div>

      {/* Isi Card */}
      <div className="flex flex-col flex-1 p-8">
        <h2 className="text-2xl font-extrabold text-blue-600 mb-4 tracking-wide">
          {jetski.model}
        </h2>
        <div className="space-y-2 text-gray-700 text-lg flex-1">
          <p>
            <span className="font-semibold">⚡ Acceleration:</span>{" "}
            {jetski.acceleration} km/h
          </p>
          <p>
            <span className="font-semibold">↔ Tilt:</span> {jetski.tilt}°
          </p>
        </div>

        {/* Tombol */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="hover:cursor-pointer mt-8 py-3 px-6 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200"
        >
          {showDetails ? "Hide Details" : "View Details"}
        </button>

        {/* Detail Perubahan */}
        {showDetails && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg text-sm text-gray-800">
            <h3 className="font-semibold mb-2">⏱ Last 1 Minute Changes</h3>
            <ul className="space-y-1 max-h-32 overflow-y-auto">
              {jetski.history.map((h, i) => (
                <li key={i} className="flex justify-between">
                  <span>{h.time}</span>
                  <span>
                    ⚡ {h.acceleration} km/h | ↔ {h.tilt}°
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default JetskiCard;
