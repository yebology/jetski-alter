// App.jsx
import { jetSkis } from "./utils";
import JetskiCard from "./components/JetskiCard";

function App() {
  return (
    <div className="min-h-screen flex flex-col mx-10">
      {/* Judul */}
      <h1 className="text-5xl font-bold text-gray-800 text-center py-8">
        🚤 Jetski Collection
      </h1>

      {/* 2 Card memenuhi layar */}
      <div className="flex flex-1 space-x-10">
        {jetSkis.map((jetski, index) => (
          <div key={index} className="w-1/2 h-full">
            <JetskiCard jetski={jetski} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
