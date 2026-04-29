"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useOrders } from "../../../../../context/OrdersContext";

export default function DriverDeliveryPage() {
  const { id } = useParams();
  const { orders, updateOrder } = useOrders();
  const order = useMemo(() => orders.find((item) => item.id === id), [orders, id]);
  const [photoSelected, setPhotoSelected] = useState(false);
  const [arrived, setArrived] = useState(false);

  if (!order) {
    return (
      <div className="rounded-[2rem] bg-white p-8 shadow-sm">
        <p className="text-slate-700">Заказ не найден.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">Доставка</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Заказ {order.orderNumber}</h1>
          <p className="mt-2 text-sm text-slate-600">{order.organization} — {order.product.name}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-[var(--bg)] p-6">
            <h2 className="text-lg font-semibold text-slate-900">Шаг 1: Загрузите фото</h2>
            <p className="mt-2 text-sm text-slate-600">Сфотографируйте состояние груза в пути.</p>
            <label className="mt-6 inline-flex w-full cursor-pointer items-center justify-center rounded-3xl border border-slate-300 bg-white px-5 py-4 text-sm font-semibold text-slate-900 transition hover:border-slate-400">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(event) => {
                  if (event.target.files?.length) {
                    setPhotoSelected(true);
                    updateOrder(order.id, { status: "in_transit" });
                  }
                }}
              />
              Выбрать фото
            </label>
            {photoSelected && <p className="mt-4 text-sm text-emerald-700">Фото принято, заказ находится в пути.</p>}
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-[var(--bg)] p-6">
            <h2 className="text-lg font-semibold text-slate-900">Шаг 2: Прибытие</h2>
            <p className="mt-2 text-sm text-slate-600">Показать QR-код фермеру, когда вы прибудете.</p>
            <button
              type="button"
              disabled={!photoSelected}
              onClick={() => {
                setArrived(true);
                updateOrder(order.id, { status: "delivered" });
              }}
              className="mt-6 inline-flex w-full items-center justify-center rounded-3xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163926] disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Я прибыл
            </button>
            {arrived && (
            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 text-center">
              <img
              src={order.deliveryQR.imageUrl}
              alt="QR код доставки"
              className="mx-auto mb-4 h-48 w-48 rounded-3xl border-4 border-[var(--primary)] object-contain p-2"
              />
              <p className="text-sm font-medium text-slate-700">
               Покажите этот QR-код фермеру
               </p>
              <p className="mt-1 text-xs text-slate-400">
                {order.deliveryQR.value}
              </p>
              </div>
              )}
          </div>
        </div>
      </section>
    </div>
  );
}
