import PhaserGame from "./components/PhaserGame";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900 gap-12 p-8">

      {/* LEFT SIDEBAR */}
      <div className="hidden xl:flex flex-col items-center gap-4">
        <img
          src="/images/gold.png" 
          alt="Collect"
          className="w-48 h-auto rounded-lg shadow-lg border-2 border-yellow-500"
        />
        <p className="text-yellow-500 font-bold text-xl text-center">
          Epstein rape niggers
        </p>
      </div>

      {/* MIDDLE SECTION (COLUMN) */}
      <div className="flex flex-col items-center gap-6">
        
        {/* GAME BOX */}
        <div className="relative border-8 border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <PhaserGame />
        </div>

        {/* SPONSOR (NOW BELOW GAME) */}
        <div className="flex flex-col items-center gap-2 p-4 bg-gray-800/50 rounded-xl border border-red-500">
          <p className="text-white font-semibold">Sponsored by:</p>
          <img
            src="/images/vmi.png"
            alt="Duhu kontora"
            className="w-64 h-auto rounded-md shadow-md"
          />
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="hidden xl:flex flex-col items-center gap-4">
        <img
          src="/images/bomb.png"
          alt="Avoid"
          className="w-48 h-auto rounded-lg shadow-lg border-2 border-red-500"
        />
        <p className="text-red-500 font-bold text-xl text-center">
          We are charlie kirk
        </p>
      </div>

    </main>
  );
}