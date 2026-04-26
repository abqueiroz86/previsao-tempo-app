export async function getWeather(city: string) {
  const res = await fetch(
    `http://localhost:8000/weather?city=${city}`
  );

  return res.json();
}