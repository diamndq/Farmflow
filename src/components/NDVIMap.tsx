"use client";

import { MapContainer, TileLayer, WMSTileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function NDVIMap() {
  // Слой Sentinel-2 NDVI (стандартный WMS сервис)
  const sentinelHubUrl = "https://services.sentinel-hub.com/ogc/wms/ae19543e-727c-4734-927a-cc372ca6201b";

  return (
    <div className="h-[65dvh] min-h-96 w-full overflow-hidden rounded-2xl border-2 border-slate-200 shadow-inner sm:h-[600px]">
      <MapContainer 
        center={[54.8667, 69.15]} // Координаты полей (можно поменять)
        zoom={11} 
        style={{ height: "100%", width: "100%" }}
      >
        <LayersControl position="topright">
          {/* Базовая карта */}
          <LayersControl.BaseLayer checked name="Карта улиц">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Спутник (Raw)">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          </LayersControl.BaseLayer>

          {/* NDVI Слой - включен по умолчанию (checked) */}
          <LayersControl.Overlay checked name="Индекс NDVI">
            <WMSTileLayer
              url={sentinelHubUrl}
              layers="NDVI"
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution='&copy; Sentinel Hub'
            />
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
}