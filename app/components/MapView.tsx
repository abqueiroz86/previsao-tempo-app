"use client";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

const customIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png',
  iconSize: [32, 32],
});


function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.whenReady(() => {
      map.flyTo(center, 13);
    });
  }, [center]);

  return null;
}

export default function MapView({ center }: { center: [number, number] }) {
  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={center} icon={customIcon} />

      <ChangeView center={center} />
    </MapContainer>
  );
}