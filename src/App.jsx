// App.jsx
import React, { useState, useEffect } from "react";
import { database, ref, onValue } from "./firebase";
import LatestAccidentCard from "./components/LatestAccidentCard";
function App() {
  const [jetskis, setJetskis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔍 useEffect dijalankan");

    const jetskiRef = ref(database, "jetski_data");
    console.log("📡 jetskiRef dibuat:", jetskiRef);

    onValue(jetskiRef, (snapshot) => {
      console.log("📥 onValue terpanggil, snapshot:", snapshot);

      const data = snapshot.val();
      console.log("📊 Data dari Firebase:", data);

      if (data) {
        // convert object → array with id
        const jetskiList = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setJetskis(jetskiList);
      } else {
        setJetskis([]);
      }

      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
      {/* Header */}
      <header className="w-full py-6 bg-white/80 backdrop-blur-md shadow-md">
        <h1 className="text-4xl font-extrabold text-blue-800 text-center tracking-wide">
          🚤 Sistem Deteksi Kecelakaan Jetski
        </h1>
        <p className="text-center text-gray-600 mt-2 text-lg">
          Monitoring real-time menggunakan Firebase Realtime Database
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center w-full px-6 py-10">
        {loading ? (
          <div className="text-2xl text-gray-700 animate-pulse">
            ⏳ Sedang memuat data...
          </div>
        ) : jetskis.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jetskis.map((jetski) => (
              <LatestAccidentCard key={jetski.id} accident={jetski} />
            ))}
          </div>
        ) : (
          <div className="text-2xl text-red-600 font-semibold">
            ⚠️ Tidak ada data jetski yang ditemukan
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
