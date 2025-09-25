import React from "react";
import jetskiImg from "../assets/aa.png";

const LatestAccidentCard = ({ accident }) => {
  // Logika mendeteksi kecelakaan berdasarkan status "jetski nabrak bosque"
  const isCrashed = accident.status === "ACCIDENT DETECTED!"; 

  return (
    <div className={`flex flex-col bg-white shadow-lg rounded-2xl w-[600px] hover:shadow-2xl duration-300 ${isCrashed ? 'border-4 border-red-500' : 'border-4 border-green-500'}`}>
      {/* Gambar */}
      <div className="bg-gray-100 rounded-t-2xl flex items-center justify-center p-6">
        <img
          src={jetskiImg}
          alt="Jetski"
          className="w-full max-h-56 object-contain"
        />
      </div>

      {/* Isi Card */}
      <div className="flex flex-col flex-1 p-8">
        <h2 className={`text-4xl font-extrabold mb-4 tracking-wide ${isCrashed ? 'text-red-600' : 'text-green-600'}`}>
          Status Terbaru: {isCrashed ? '❗ KECELAKAAN' : '✅ Aman'}
        </h2>
        <p className="text-xl text-gray-700 mb-4">
          <span className="font-semibold">Pesan:</span> {accident.status}
        </p>
        
        <div className="space-y-4 text-gray-700 text-lg flex-1">
          <div>
            <h3 className="font-bold text-gray-800 text-2xl mb-2">Kemiringan Jetski</h3>
            <p>
              <span className="font-semibold">Pitch:</span> {accident.kemiringan.pitch}°
            </p>
            <p>
              <span className="font-semibold">Roll:</span> {accident.kemiringan.roll}°
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-800 text-2xl mb-2">Akselerasi (G-Force)</h3>
            <p>
              <span className="font-semibold">Akselerasi X:</span> {accident.akselerasi.x} G
            </p>
            <p>
              <span className="font-semibold">Akselerasi Y:</span> {accident.akselerasi.y} G
            </p>
            <p>
              <span className="font-semibold">Akselerasi Z:</span> {accident.akselerasi.z} G
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestAccidentCard;