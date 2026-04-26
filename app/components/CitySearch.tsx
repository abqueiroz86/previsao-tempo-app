"use client";

// Importa o hook useState para gerenciar o estado do componente
import { useState } from "react";
// Importa a função para buscar a previsão do tempo
import { getWeather } from "../services/api";
// Importa o componente do mapa
import MapView from "./MapView";

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
  const [city, setCity] = useState("");
  const [response, setResponse] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar a previsão do tempo para a cidade informada
  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Informe uma cidade");
      return;
    }

    try {
      setError(null); // limpa erro anterior

      const data = await getWeather(city);

      setResponse(data);
    } catch (err: any) {
      setResponse(null);
      setError("Cidade não encontrada. Tente novamente.");
    }
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <form onSubmit={handleSubmit}>  
    <div className="mt-10 text-gray-700 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
            <p className="text-lg">Digite o nome da cidade para obter a previsão do tempo.</p>
            
            <input
                onChange={(e) => setCity(e.target.value)}
                type="text"
                placeholder="Ex: São Paulo"
                className="mt-2 mr-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button 
                type="submit"
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Consultar Previsão
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
                <div className="mt-4">
                  <p className="mt-4 text-lg font-semibold">Previsão do Tempo para {response.city}:</p>
                  <p className="text-gray-600">🌡️ Temperatura: {response.temp}°C</p>
                  <p className="text-gray-600">🤒 Sensação Térmica: {response.feels_like}°C</p>
                  <p className="text-gray-600">💧 Umidade do ar: {response.humidity}%</p>
                  <p className="text-gray-600">💨 Velocidade do vento: {response.wind_speed} m/s</p>
                  <p className="text-gray-600">🌤️ Descrição: {response.description}</p>
                  
                  {/* Resposta completa da API */}
                  {/* <pre>{JSON.stringify(response, null, 2)}</pre> */}
                </div>
            }
        </div>

        <div className="h-[300px] lg:h-full rounded-lg overflow-hidden">
          <MapView city={{ name: response?.city || "Ribeirão Preto", lat: response?.coord?.lat || -21.1775, lon: response?.coord?.lon || -47.8103 }} />
        </div>
    </div>
    </form>
  );
}