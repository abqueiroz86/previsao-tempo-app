"use client";

// Importa o hook useState para gerenciar o estado do componente
import { useEffect, useState } from "react";
// Importa a função para buscar a previsão do tempo
import { getWeather } from "../services/api";
// Importa o componente de histórico de buscas
import HistorySearch from "./HistorySearch";
// Importa o componente do mapa
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
});

export default function CitySearch() {

  // Tipo para a resposta da API
  type Weather = {
    city: string;
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    description: string;
    coord: {
      lat: number;
      lon: number;
    }
  };

  // Estado para armazenar a cidade digitada e a resposta da API
  const [city, setCity] = useState<any | null>(null);
  const [response, setResponse] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar a previsão do tempo para a cidade informada
  const handleSearch = async () => {
    if (!city || !city.trim()) {
      setError("Informe uma cidade");
      return;
    }

    try {
      setError(null); // limpa erro anterior

      const data = await getWeather(city);

      setResponse(data);
      setPosition([data.coord.lat, data.coord.lon]);
    } catch (err: unknown) {
      setResponse(null);
      setPosition([-23.55, -46.63]); // posição padrão (São Paulo)

      setError("Cidade não encontrada. Tente novamente.");
    }
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };
    
  const [position, setPosition] = useState<[number, number]>([-23.55, -46.63]);
  
  return (
    <form onSubmit={handleSubmit}>  
    <div className="mt-10 text-gray-700 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
            <p className="text-gray-500 text-sm mt-2">
              🔎 Digite o nome da cidade para obter a previsão do tempo.
            </p>
            
            <input
                onChange={(e) => setCity(e.target.value)}
                type="text"
                placeholder="Ex: São Paulo"
                className="mt-2 mr-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button 
                type="submit"
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Consultar
            </button>

            {/* ❌ ERRO */}
            {error && (
              <div className="mt-4 mb-2 flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 text-red-600 rounded-md">
                <span>⚠️</span>
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Exibe a resposta da API se estiver disponível */}
            { response &&
                <div
                  className="mt-4 p-4 rounded-xl bg-gray-50 shadow-sm"
                >
                  <p className="text-lg font-semibold mb-3">
                    📍 {response.city}
                  </p>

                  <div className="space-y-1 text-sm text-gray-600">
                    <p>🌡️ Temperatura: <b>{response.temp}°C</b></p>
                    <p>🤒 Sensação: <b>{response.feels_like}°C</b></p>
                    <p>💧 Umidade: <b>{response.humidity}%</b></p>
                    <p>💨 Vento: <b>{response.wind_speed} m/s</b></p>
                    <p>🌤️ {response.description}</p>
                  </div>
                </div>
            }
            <div className="mt-4">
              <HistorySearch history={history} setPosition={setPosition} />
            </div>
        </div>

        <div className="h-[300px] lg:h-full rounded-lg overflow-hidden">
          <MapView center={position} />
        </div>
    </div>
    </form>
  );
}