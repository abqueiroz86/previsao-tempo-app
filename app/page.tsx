import CitySearch from "./components/CitySearch";

export default function Home() {
  return (
    <div className="grid items-center justify-center h-screen bg-gray-100">
      <main className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-blue-600">
          ⛅ Previsão do Tempo ⛅
        </h2>
      
        <CitySearch />
        
      </main>
    </div>
  );
}