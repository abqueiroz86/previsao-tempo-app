"use client";

// Importa o hook useState para gerenciar o estado do componente
import { useState } from "react";
// Importa a função para buscar a previsão do tempo
import { getWeather } from "../services/api";
// Importa o componente de histórico de buscas
import HistorySearch from "./HistorySearch";
// Importa o componente do mapa
import dynamic from "next/dynamic";
import WeatherResult from "./WeatherResult";

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
  const [city, setCity] = useState<string | null>(null);
  const [response, setResponse] = useState<Weather | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar a previsão do tempo para a cidade informada
  const handleSearch = async () => {
    if (!city || !city.trim()) {
      setError("Informe uma cidade");
      return;
    }

    try {
      setError(null);
      const data = await getWeather(city);
      setResponse(data);
      setPosition([data.coord.lat, data.coord.lon]);

    } catch {
      setResponse(undefined);
      setPosition([-23.55, -46.63]);
      setError("Cidade não encontrada. Tente novamente.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  const [position, setPosition] = useState<[number, number]>([-23.55, -46.63]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-10 text-gray-700 w-full max-w-7xl mx-auto px-4">

        {/* ── LINHA DE BUSCA: largura total ── */}
        <p className="text-gray-500 text-sm mb-2">
          🔎 Digite o nome da cidade para obter a previsão do tempo.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <input
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="Ex: São Paulo"
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Consultar
          </button>
        </div>

        {/* ── MENSAGEM DE ERRO ── */}
        {error && (
          <div className="mt-4 mb-2 flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 text-red-600 rounded-md">
            <span>⚠️</span>
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* ── GRADE 2 COLUNAS: previsão + mapa ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

          {/* ── COLUNA ESQUERDA: PREVISÃO ── */}
          <WeatherResult response={response} />

          {/* ── COLUNA DIREITA: MAPA ── */}
          <MapView center={position} />

        </div> {/* fim grid 2 colunas */}

        {/* Histórico buscas */}
        <div className="mt-4">
          <HistorySearch setPosition={setPosition} />
        </div>
      </div>
    </form>
  );
}