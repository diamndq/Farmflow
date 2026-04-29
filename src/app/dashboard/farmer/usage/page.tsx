"use client";

import { useMemo, useState } from "react";
import { Camera, CheckCircle, Package } from "lucide-react";
import QRScannerModal from "../../../../components/QRScannerModal";
import { useAuth } from "../../../../context/AuthContext";
import { useOrders } from "../../../../context/OrdersContext";

export default function FarmerUsagePage() {
  const { user } = useAuth();
  const { orders } = useOrders();

const order = useMemo(
  () =>
    orders.find(
      (item) =>
        item.farmer.iin === user?.iin &&
        item.status === "in_use"
    ),
  [orders, user?.iin]
);

if (!order) {
  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-sm">
      <p className="text-slate-700">
        Упаковки недоступны. Сначала завершите приёмку всех коробок.
      </p>
    </div>
  );
}

  // Состояние использования каждой упаковки
  // ...existing code...
  const [usedPackages, setUsedPackages] = useState<Record<string, { usedAt: string }>>({});
  // ...existing code...

  // Какую упаковку сейчас сканируем
  const [activePkgId, setActivePkgId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  if (!order) {
    return (
      <div className="rounded-[2rem] bg-white p-8 shadow-sm">
        <p className="text-slate-700">Нет активных заказов.</p>
      </div>
    );
  }

  const packages = order.packages; // 4 упаковки с QR внутри
  const totalPackages = packages.length;
  const usedCount = Object.keys(usedPackages).length;
  const percent = totalPackages > 0 ? Math.round((usedCount / totalPackages) * 100) : 0;
  const allDone = usedCount === totalPackages;

  const activePackage = packages.find((p) => p.id === activePkgId);

  const handleConfirm = (value: string) => {
    if (!activePkgId) return;
    // Записываем дату и время использования
    setUsedPackages((prev) => ({
      ...prev,
      [activePkgId]: { usedAt: new Date().toLocaleString("ru-RU") },
    }));
    setActivePkgId(null);
    setOpenModal(false);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm">

        {/* Заголовок + счётчик */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              {order.orderNumber}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Использование упаковок
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {order.product.name} — {order.organization}
            </p>
          </div>

          {/* Большой счётчик сверху */}
          <div className={`flex flex-col items-center justify-center rounded-[2rem] px-8 py-4 ${allDone ? "bg-emerald-50" : "bg-[var(--bg)]"}`}>
            <span className={`text-4xl font-bold ${allDone ? "text-emerald-600" : "text-[var(--primary)]"}`}>
              {usedCount}/{totalPackages}
            </span>
            <span className="mt-1 text-sm text-slate-500">упаковок использовано</span>
            {allDone && (
              <span className="mt-2 flex items-center gap-1 text-sm font-semibold text-emerald-600">
                <CheckCircle className="h-4 w-4" /> 100% завершено
              </span>
            )}
          </div>
        </div>

        {/* Прогресс бар */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-slate-500">Прогресс использования</span>
            <span className={`font-semibold ${allDone ? "text-emerald-600" : "text-[var(--primary)]"}`}>
              {percent}%
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-3 rounded-full transition-all duration-700 ${allDone ? "bg-emerald-500" : "bg-[var(--accent)]"}`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Список упаковок */}
        <div className="space-y-3">
          {packages.map((pkg, index) => {
            const isUsed = !!usedPackages[pkg.id];
            const usageRecord = usedPackages[pkg.id];

            return (
              <div
                key={pkg.id}
                className={`flex flex-col gap-4 rounded-[2rem] border p-5 transition-all sm:flex-row sm:items-center sm:justify-between ${
                  isUsed
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-slate-200 bg-[var(--bg)]"
                }`}
              >
                <div className="flex items-center gap-4">

                  {/* Иконка статуса */}
                  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${
                    isUsed ? "bg-emerald-100" : "bg-white border border-slate-200"
                  }`}>
                    {isUsed ? (
                      <CheckCircle className="h-6 w-6 text-emerald-500" />
                    ) : (
                      <Package className="h-6 w-6 text-slate-400" />
                    )}
                  </div>

                  {/* Инфо об упаковке */}
                  <div>
                    <p className="font-semibold text-slate-900">{pkg.label}</p>
                    <p className="text-xs text-slate-400">
                      QR: {pkg.qrValue}
                    </p>
                    {isUsed ? (
                      <p className="mt-1 text-sm font-medium text-emerald-600">
                        ✅ Использована: {usageRecord.usedAt}
                      </p>
                    ) : (
                      <p className="mt-1 text-sm text-slate-500">
                        Откройте упаковку и отсканируйте QR внутри
                      </p>
                    )}
                  </div>
                </div>

                {/* Кнопка сканирования */}
                {isUsed ? (
                  <span className="inline-flex items-center gap-2 rounded-3xl bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                    <CheckCircle className="h-4 w-4" /> Готово
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setActivePkgId(pkg.id);
                      setOpenModal(true);
                    }}
                    className="inline-flex items-center gap-2 rounded-3xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163926]"
                  >
                    <Camera className="h-4 w-4" />
                    Сканировать QR
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Финальное сообщение */}
        {allDone && (
          <div className="mt-8 rounded-[2rem] bg-emerald-50 p-6 text-center">
            <CheckCircle className="mx-auto mb-3 h-12 w-12 text-emerald-500" />
            <p className="text-lg font-semibold text-emerald-700">
              Все упаковки использованы!
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Партия {order.orderNumber} полностью отмечена как использованная
            </p>
          </div>
        )}
      </section>

      {/* Модалка сканирования */}
      <QRScannerModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setActivePkgId(null);
        }}
        onConfirm={handleConfirm}
        title={activePackage ? `Сканируйте QR — ${activePackage.label}` : "Сканировать QR"}
        expectedValue={activePackage?.qrValue}
        simulateValue={activePackage?.qrValue}
      />
    </div>
  );
}
