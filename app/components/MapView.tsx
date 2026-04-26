"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

type City = {
  name: string;
  lat: number;
  lon: number;
};

type Props = {
  city: City;
};

const customIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png',
  iconSize: [32, 32],
});

function ChangeView({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lon], 13);
  }, [lat, lon]);

  return null;
}

export default function MapView({ city }: any) {
  return (
    <MapContainer
      center={[city.lat, city.lon]}
      zoom={13}
      className="h-[400px]"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={[city.lat, city.lon]} icon={customIcon} />

      <ChangeView lat={city.lat} lon={city.lon} />
    </MapContainer>
  );
}