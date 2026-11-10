"use client";

import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import { CircleMarker, LayersControl, MapContainer, Marker, Polyline, TileLayer, Tooltip, WMSTileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const route: [number, number][] = [
  [54.914, 69.075],
  [54.901, 69.098],
  [54.887, 69.116],
  [54.874, 69.139],
  [54.859, 69.158],
  [54.843, 69.181],
  [54.826, 69.205],
];

function RouteViewport() {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(route, { padding: [36, 36] });
  }, [map]);

  return null;
}

function RouteSimulation() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const durationMs = 24000;
    const startedAt = performance.now();
    const timerId = window.setInterval(() => {
      const elapsed = Math.max(0, performance.now() - startedAt);
      setProgress(Number.isFinite(elapsed) ? (elapsed % durationMs) / durationMs : 0);
    }, 50);

    return () => window.clearInterval(timerId);
  }, []);

  const safeProgress = Number.isFinite(progress) ? Math.max(0, Math.min(progress, 1 - Number.EPSILON)) : 0;
  const segmentProgress = safeProgress * (route.length - 1);
  const segmentIndex = Math.max(0, Math.min(Math.floor(segmentProgress), route.length - 2));
  const segmentOffset = Math.max(0, Math.min(segmentProgress - segmentIndex, 1));
  const current = route[segmentIndex] ?? route[0];
  const next = route[segmentIndex + 1] ?? route[route.length - 1] ?? current;
  const position: [number, number] = [
    current[0] + (next[0] - current[0]) * segmentOffset,
    current[1] + (next[1] - current[1]) * segmentOffset,
  ];
  const angle = Math.atan2(-(next[0] - current[0]), next[1] - current[1]) * (180 / Math.PI);
  const truckIcon = useMemo(
    () =>
      L.divIcon({
        className: "",
        html: `<div style="width:44px;height:44px;display:grid;place-items:center;border:3px solid #fff;border-radius:50%;background:#1b553e;box-shadow:0 3px 12px #0005;transform:rotate(${angle}deg);color:white"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 17h4V5H2v12h3"/><path d="M14 9h4l4 4v4h-3"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/></svg></div>`,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
      }),
    [angle],
  );

  return (
    <>
      <Polyline positions={route} pathOptions={{ color: "#123e2d", opacity: 0.3, weight: 10 }} />
      <Polyline positions={route} pathOptions={{ color: "#52b788", opacity: 0.95, weight: 6 }} />
      <CircleMarker center={route[0]} radius={8} pathOptions={{ color: "#fff", weight: 3, fillColor: "#1b553e", fillOpacity: 1 }}>
        <Tooltip permanent direction="top" offset={[0, -8]}>Старт</Tooltip>
      </CircleMarker>
      <CircleMarker center={route[route.length - 1]} radius={8} pathOptions={{ color: "#fff", weight: 3, fillColor: "#e76f51", fillOpacity: 1 }}>
        <Tooltip permanent direction="top" offset={[0, -8]}>Ферма</Tooltip>
      </CircleMarker>
      <Marker position={position} icon={truckIcon}>
        <Tooltip permanent direction="top" offset={[0, -22]}>Грузовик · демо-маршрут</Tooltip>
      </Marker>
    </>
  );
}

export default function NDVIMap() {
  // Слой Sentinel-2 NDVI (стандартный WMS сервис)
  const sentinelHubUrl = "https://services.sentinel-hub.com/ogc/wms/ae19543e-727c-4734-927a-cc372ca6201b";

  return (
    <div className="h-[65dvh] min-h-96 w-full overflow-hidden rounded-2xl border-2 border-slate-200 shadow-inner sm:h-[600px]">
      <div className="relative h-full w-full">
        <div className="pointer-events-none absolute left-3 top-3 z-[1000] rounded-xl border border-slate-200 bg-white/95 px-3 py-2 text-xs font-semibold text-slate-700 shadow sm:left-4 sm:top-4 sm:text-sm">
          <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[#52b788] align-middle" />
          Симуляция маршрута
        </div>
        <MapContainer
          center={[54.8667, 69.15]}
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

            {/* NDVI слой включён по умолчанию */}
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
          <RouteViewport />
          <RouteSimulation />
        </MapContainer>
      </div>
    </div>
  );
}
