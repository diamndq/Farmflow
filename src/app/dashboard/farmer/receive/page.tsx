"use client";

import { useMemo, useState } from "react";
import { useOrders } from "../../../../context/OrdersContext";
import { useAuth } from "../../../../context/AuthContext";
import QRScannerModal from "../../../../components/QRScannerModal";
import StatusBadge from "../../../../components/StatusBadge";

export default function FarmerReceivePage() {
  const { user } = useAuth();
  const { orders, updateOrder } = useOrders();
const order = useMemo(
  () => orders.find((item) => item.farmer.iin === user?.iin && ["pending", "in_transit", "receiving"].includes(item.status)),
  [orders, user?.iin]
);

  const [deliveryConfirmed, setDeliveryConfirmed] = useState(false);
  const [scannedBoxes, setScannedBoxes] = useState<number[]>([]);
  const [activeBox, setActiveBox] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!order) {
    return (
      <div className="rounded-[2rem] bg-white p-8 shadow-sm">
        <p className="text-slate-700">Нет активных заказов для приёмки.</p>
      </div>
    );
  }

  const total = order.product.totalBoxes;
  const scannedCount = scannedBoxes.length;
  const canComplete = deliveryConfirmed && scannedCount === total;

  const handleConfirm = (value: string) => {
    if (activeBox === null) {
      // ШАГ 1: отсканировали QR доставки → статус "receiving"
      // доступ к коробкам открывается, но к упаковкам ещё НЕТ
      setDeliveryConfirmed(true);
      updateOrder(order.id, { status: "receiving" });
    } else {
      // ШАГ 2: отсканировали штрихкод коробки → просто считаем
      // статус НЕ меняем здесь, только обновляем счётчик
      const nextScans = Array.from(new Set([...scannedBoxes, activeBox]));
      setScannedBoxes(nextScans);
    }
    setActiveBox(null);
    setOpenModal(false);
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              {order.orderNumber}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Приёмка доставки</h2>
            <p className="mt-2 text-sm text-slate-600">
              {order.organization} — {order.product.description}
            </p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">

          {/* ШАГ 1 — QR доставки */}
          <div className="rounded-3xl border border-slate-200 bg-[var(--bg)] p-4 sm:rounded-[2rem] sm:p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Шаг 1: Сканируйте QR доставки
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Попросите водителя показать QR-код на экране телефона и наведите камеру.
              </p>
            </div>

            {!deliveryConfirmed ? (
              <button
                type="button"
                onClick={() => {
                  setActiveBox(null);
                  setOpenModal(true);
                }}
                className="inline-flex items-center rounded-3xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163926]"
              >
                Сканировать QR доставки
              </button>
            ) : (
              <p className="inline-flex items-center gap-2 rounded-3xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                ✅ QR подтверждён — переходите к коробкам
              </p>
            )}
          </div>

          {/* ШАГ 2 — Штрихкоды коробок */}
          <div className="rounded-3xl border border-slate-200 bg-[var(--bg)] p-4 sm:rounded-[2rem] sm:p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Шаг 2: Сканирование коробок
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Отсканировано {scannedCount} из {total}.
            </p>

            {/* Прогресс бар */}
            <div className="mt-4 rounded-3xl bg-slate-200 p-1">
              <div
                className="h-2 rounded-full bg-[var(--accent)] transition-all duration-500"
                style={{ width: `${total > 0 ? (scannedCount / total) * 100 : 0}%` }}
              />
            </div>

            {/* Список коробок */}
            <div className="mt-6 space-y-3">
              {order.boxes.map((box, index) => {
                const isScanned = scannedBoxes.includes(index);
                return (
                  <div
                    key={box.id}
                    className="flex min-w-0 items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 sm:rounded-3xl sm:px-4"
                  >
                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                      <img
                        src={box.imageUrl}
                        alt={box.label}
                        className="h-8 w-16 object-contain"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900">{box.label}</p>
                        <p className="text-xs text-slate-400">{box.barcode}</p>
                      </div>
                    </div>

                    {isScanned ? (
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                        ✅ Принято
                      </span>
                    ) : (
                      <button
                        type="button"
                        disabled={!deliveryConfirmed}
                        onClick={() => {
                          setActiveBox(index);
                          setOpenModal(true);
                        }}
                        className="min-h-10 shrink-0 rounded-2xl bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#3c8f67] disabled:cursor-not-allowed disabled:bg-slate-300 sm:px-4"
                      >
                        Скан
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Кнопка завершения — меняет статус на in_use ТОЛЬКО здесь */}
            <button
              type="button"
              disabled={!canComplete}
              onClick={() => {
                setCompleted(true);
                updateOrder(order.id, { status: "in_use" }); // ← только здесь открывается Usage
              }}
              className="mt-6 inline-flex w-full items-center justify-center rounded-3xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163926] disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Завершить приёмку
            </button>

            {completed && (
              <p className="mt-4 text-sm text-emerald-700">
                ✅ Приёмка завершена — теперь доступна вкладка Использование
              </p>
            )}
          </div>
        </div>
      </section>

      <QRScannerModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setActiveBox(null);
        }}
        onConfirm={handleConfirm}
        title={
          activeBox === null
            ? "QR доставки"
            : `Штрихкод — ${order.boxes[activeBox]?.label}`
        }
        expectedValue={
          activeBox === null
            ? order.deliveryQR.value
            : order.boxes[activeBox]?.barcode
        }
        simulateValue={
          activeBox === null
            ? order.deliveryQR.value
            : order.boxes[activeBox]?.barcode
        }
      />
    </div>
  );
}