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
      <h2>Histórico de Buscas:</h2>

    { uniqueCities &&
        <ul>
            {uniqueCities.map((item) => (
                <li
                key={item.city}
                onClick={() => setPosition([item.coord.lat, item.coord.lon])}
                style={{ cursor: "pointer" }}
                >
                {item.city} - {item.temp}°C
                </li>
            ))}
        </ul>
    }
    </div>
  );
}