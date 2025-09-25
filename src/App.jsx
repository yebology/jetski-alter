// App.jsx
import { useState, useEffect } from "react";
import LatestAccidentCard from "./components/LatestAccidentCard"; // Nama komponen baru
import { database, ref, onValue } from "./firebase";

function App() {
  const [latestAccident, setLatestAccident] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔍 useEffect dijalankan");

    const accidentRef = ref(database, "kecelakaan_terbaru");
    console.log("📡 accidentRef dibuat:", accidentRef);

    onValue(accidentRef, (snapshot) => {
      console.log("📥 onValue terpanggil, snapshot:", snapshot);

      const data = snapshot.val();
      console.log("📊 Data dari Firebase:", data);

      setLatestAccident(data);
      setLoading(false);
    });
  }, [loading, latestAccident]);


  return (
    <div className="min-h-screen flex flex-col mx-10 items-center justify-center">
      <h1 className="text-5xl font-bold text-gray-800 text-center py-8">
        Sistem Deteksi Kecelakaan Jetski
      </h1>

      {loading ? (
        <div className="text-2xl text-gray-600">
          Sedang memuat data...
        </div>
      ) : latestAccident ? (
        <LatestAccidentCard accident={latestAccident} />
      ) : (
        <div className="text-2xl text-red-500">
          Tidak ada data kecelakaan terbaru yang ditemukan.
        </div>
      )}
    </div>
  );
}

export default App;