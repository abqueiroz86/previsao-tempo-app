export async function getWeather(city: string) {
    try {
        const res = await fetch(
            `http://localhost:8000/weather?city=${city}`
        );

        if (!res.ok) {
            throw new Error(res.statusText || "Erro na API");
        }

        return await res.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function getHistory() {
    try {
        const res = await fetch(
            `http://localhost:8000/history`
        );

        if (!res.ok) {
            throw new Error(res.statusText || "Erro na API");
        }

        return await res.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
}