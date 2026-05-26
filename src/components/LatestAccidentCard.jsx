// LatestAccidentCard.jsx
import React from "react";
import jetskiImg from "../assets/aa.png";

// Fungsi utilitas untuk mengonversi epoch ms ke format waktu lokal (UTC)
const formatTimestamp = (epochMs) => {
  if (!epochMs) return "N/A";

  // Pastikan nilai epochMs adalah string atau number, dan dikonversi ke Number
  const timeMs = Number(epochMs);

  // Jika nilai epoch time tidak valid (misalnya, angka 32-bit yang kecil), tampilkan apa adanya.
  if (timeMs < 1000000000000) {
    return `${epochMs} ms (Invalid Epoch)`;
  }
  
  // Menggunakan toUTCString() untuk menampilkan waktu dalam format UTC yang jelas
  return new Date(timeMs).toUTCString();
};

const LatestAccidentCard = ({ accident }) => {
  // Cek status berdasarkan string dari Firebase
  const isCrashed = accident.status_jetski === "KECELAKAAN_TERKONFIRMASI";

  // Akses data kemiringan dan akselerasi langsung dari objek accident
  // Catatan: Jika struktur Firebase Anda datar (roll dan pitch langsung di root), 
  // Anda harus mengganti 'accident.kemiringan?.roll' menjadi 'accident.roll'.
  // Saya berasumsi struktur flat berdasarkan kode ESP (Roll, Pitch di root, Akselerasi nesting).
  const roll = accident.roll ?? "-";
  const pitch = accident.pitch ?? "-";

  // Akses data akselerasi yang nesting
  const akselerasi = accident.akselerasi || {};
  const waktu = accident.waktu || {};

  return (
    <div
      className={`flex flex-col bg-white shadow-xl rounded-2xl w-[600px] transform hover:scale-[1.02] hover:shadow-2xl transition duration-300 ${
        isCrashed ? "border-4 border-red-500" : "border-4 border-green-500"
      }`}
    >
      {/* Gambar */}
      <div className="bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 rounded-t-2xl flex items-center justify-center p-6">
        <img
          src={jetskiImg}
          alt="Jetski"
          className="w-full max-h-56 object-contain drop-shadow-lg"
        />
      </div>

      {/* Isi Card */}
      <div className="flex flex-col flex-1 p-8 space-y-6">
        {/* Status */}
        <h2
          className={`text-2xl font-extrabold tracking-wide ${
            isCrashed ? "text-red-600" : "text-green-600"
          }`}
        >
          {accident.id} –{" "}
          {isCrashed ? "❗ KECELAKAAN TERDETEKSI" : "✅ Jetski Aman"}
        </h2>

        {/* Data Jetski */}
        <div className="grid grid-cols-2 gap-6 text-lg text-gray-700">
          {/* Kemiringan */}
          <div>
            <h3 className="font-bold text-gray-800 text-xl mb-2">
              Kemiringan & Status
            </h3>
            <p className="mb-2">
              <span className="font-semibold">Status:</span>{" "}
              <span className="font-bold">{accident.status_jetski}</span>
            </p>
            <p>
              <span className="font-semibold">Pitch:</span> {pitch}°
            </p>
            <p>
              <span className="font-semibold">Roll:</span> {roll}°
            </p>
          </div>

          {/* Akselerasi */}
          <div>
            <h3 className="font-bold text-gray-800 text-xl mb-2">
              Akselerasi (G-Force)
            </h3>
            <p>
              <span className="font-semibold">X:</span> {akselerasi.x ?? "-"} G
            </p>
            <p>
              <span className="font-semibold">Y:</span> {akselerasi.y ?? "-"} G
            </p>
            <p>
              <span className="font-semibold">Z:</span> {akselerasi.z ?? "-"} G
            </p>
          </div>
        </div>
        
        {/* Detail Waktu (Timestamp) */}
        <div className="pt-4 border-t border-gray-200 text-sm text-gray-500 space-y-2">
            <h3 className="font-bold text-gray-800 text-xl mb-2">
              Detail Waktu (UTC)
            </h3>
            <p>
              <span className="font-semibold text-gray-900">Server Time:</span> {formatTimestamp(waktu.firebase_server_ms)}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Receiver RX:</span> {formatTimestamp(waktu.rx_ms)}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Transmitter TX:</span> {formatTimestamp(waktu.tx_ms)}
            </p>
            
            {/* Opsi Debug (Opsional, hapus jika tidak diperlukan) */}
            <p className="text-xs mt-2 text-gray-400">
                Latensi (RX - TX): 
                {(Number(waktu.rx_ms) - Number(waktu.tx_ms)) / 1000} detik
            </p>
        </div>

      </div>
    </div>
  );
};

export default LatestAccidentCard;