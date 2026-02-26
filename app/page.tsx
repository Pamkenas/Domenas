import PhaserGame from "./components/PhaserGame";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900 gap-12 p-8">
      
      {/* LEFT SIDEBAR IMAGE */}
      <div className="hidden xl:flex flex-col items-center gap-4">
        <img 
          src="/images/gold.png" 
          alt="Collect these" 
          className="w-48 h-auto rounded-lg shadow-lg border-2 border-yellow-500"
        />
        <p className="text-yellow-500 font-bold text-xl">Epstein rape niggers</p>
      </div>

      {/* THE GAME CONTAINER */}
      <div className="relative border-8 border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <PhaserGame />
      </div>

      {/* RIGHT SIDEBAR IMAGE */}
      <div className="hidden xl:flex flex-col items-center gap-4">
        <img 
          src="/images/bomb.png" 
          alt="Avoid these" 
          className="w-48 h-auto rounded-lg shadow-lg border-2 border-red-500"
        />
        <p className="text-red-500 font-bold text-xl">We are charlie kirk</p>
      </div>

    </main>
  );
}