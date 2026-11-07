"use client";

import dynamic from "next/dynamic";

const NDVIMap = dynamic(() => import("../../../components/NDVIMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[600px] w-full animate-pulse items-center justify-center rounded-2xl bg-slate-50">
      Загрузка спутниковых данных...
    </div>
  ),
});

export default function MapPage() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Мониторинг NDVI</h1>
      <NDVIMap />
    </main>
  );
}