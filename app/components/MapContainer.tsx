"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  return (
    <MapContainer
      center={[-21.467, -47.004]}
      zoom={13}
      className="h-[400px] w-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[-21.467, -47.004]}>
        <Popup>Mococa</Popup>
      </Marker>
    </MapContainer>
  );
}