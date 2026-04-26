export default function WeatherResult({ response }: { response: any }) {
    return (
        <div>
            {/* Card de resultado da previsão */}
            <div className="p-4 rounded-xl bg-gray-50 shadow-sm">

                <p className="text-lg font-semibold mb-0">
                    📍 {response?.city || "Informe a cidade"}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                    🌤️ {response?.description}
                </p>

                <p className="text-5xl font-semibold text-gray-800 mb-4 leading-none">
                    {response?.temp}
                    <span className="text-2xl text-gray-400">°C</span>
                </p>

                {/* Grade 2x2 de métricas */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                        <p className="text-xs text-gray-400 mb-1">Sensação</p>
                        <p className="text-sm font-semibold text-gray-700">{response?.feels_like}°C</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                        <p className="text-xs text-gray-400 mb-1">Umidade</p>
                        <p className="text-sm font-semibold text-gray-700">{response?.humidity}%</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                        <p className="text-xs text-gray-400 mb-1">Vento</p>
                        <p className="text-sm font-semibold text-gray-700">{response?.wind_speed} m/s</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                        <p className="text-xs text-gray-400 mb-1">Condição</p>
                        <p className="text-sm font-semibold text-gray-700 capitalize">{response?.description}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}