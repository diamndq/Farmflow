"use client";

import { useSyncExternalStore } from "react";
import { MapContainer, TileLayer, WMSTileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function SentinelMap() {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!isClient) return <div className="h-[600px] bg-slate-100 animate-pulse rounded-2xl" />;

  // 1. ВСТАВЬТЕ ВАШ INSTANCE ID СЮДА
  const INSTANCE_ID = "ae19543e-727c-4734-927a-cc372ca6201b";
  const baseUrl = new URL(`https://services.sentinel-hub.com/ogc/wms/${INSTANCE_ID}`);
  baseUrl.searchParams.set("maxcc", "20");
  baseUrl.searchParams.set("time", "2023-06-01/2023-08-31");

  return (
    <div className="h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
      <MapContainer 
        center={[54.8753, 69.1629]} // Петропавловск
        zoom={11} 
        style={{ height: "100%", width: "100%" }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Satellite Raw">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          </LayersControl.BaseLayer>

          {/* Слой NDVI от Sentinel */}
          <LayersControl.Overlay checked name="Sentinel-2 NDVI">
            <WMSTileLayer
              url={baseUrl.toString()}
              layers="NDVI" // Это имя слоя в вашей панели управления Sentinel
              format="image/png"
              transparent={true}
              version="1.3.0"
              attribution="&copy; Copernicus Sentinel"
            />
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
}