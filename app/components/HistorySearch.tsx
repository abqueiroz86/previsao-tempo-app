"use client";

import { useEffect, useState } from "react";
import { getHistory } from "../services/api";

type Props = {
  historyProp   : any[] | null;
  setPosition: (pos: [number, number]) => void;
};

export default function HistorySearch({ historyProp, setPosition }: Props) {
  const [history, setHistory] = useState<any[]>([]);

    async function handleSearch() {
        try {
            const history = await getHistory();
            console.log("history:", history);
            setHistory(history);

        } catch (err: unknown) {
            setHistory(null);
        }
    };

    const uniqueCities = Object.values(
        history.reduce((acc, item) => {
            acc[item.city] = item;
            return acc;
        }, {} as Record<string, typeof history[0]>)
    );

    useEffect(() => {
        handleSearch();
    }, []);


  return (
    <div>
        <p className="mt-4 text-lg font-semibold">Histórico de Buscas:</p>

        { uniqueCities &&
            <ul className="mt-3 space-y-2">
                {uniqueCities.map((item, index) => (
                    <li
                    key={`${item.city}-${index}`}
                    onClick={() => setPosition([item.coord.lat, item.coord.lon])}
                    className="cursor-pointer p-3 rounded-xl bg-gray-50 shadow-sm hover:bg-blue-50 hover:scale-[1.02] transition"
                    >
                    <div className="font-semibold text-base">{item.city}</div>
                    <div className="text-sm text-gray-600">
                        🌡 {item.temp}°C • {item.description}
                    </div>
                    </li>
                ))}
            </ul>
        }
    </div>
  );
}