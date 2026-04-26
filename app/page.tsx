import CitySearch from "./components/CitySearch";

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-screen bg-gray-100 px-4">
      <main className="w-full max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-2">
          ⛅ Previsão do Tempo
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Consulte o clima de qualquer cidade
        </p>
      
        <CitySearch />
        
      </main>
    </div>
  );
}