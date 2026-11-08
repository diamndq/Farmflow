"use client";

import { useMemo, useState } from "react";
import StatusBadge from "../../../components/StatusBadge";
import { useOrders } from "../../../context/OrdersContext";

const filterOptions = [
  { key: "all", label: "Все" },
  { key: "in_transit", label: "В пути" },
  { key: "delivered", label: "Доставлено" },
  { key: "completed", label: "Завершено" },
];

type FilterKey = "all" | "in_transit" | "delivered" | "completed";

export default function UserPage() {
  const { orders } = useOrders();
  const [filter, setFilter] = useState<FilterKey>("all");

  const filteredOrders = useMemo(
    () => orders.filter((order) => filter === "all" || order.status === filter),
    [filter, orders]
  );

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-6">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">Мониторинг</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">Мониторинг аграрных партий — Северный Казахстан</h1>
        </div>
        <div className="mb-6 flex flex-wrap gap-3">
          {filterOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => setFilter(option.key as FilterKey)}
              className={`rounded-3xl px-4 py-2 text-sm font-semibold transition ${filter === option.key ? "bg-[var(--primary)] text-white" : "bg-surface text-slate-700 hover:bg-slate-200"}`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredOrders.map((order) => (
            <div key={order.id} className="min-w-0 rounded-3xl border border-slate-200 bg-surface p-4 shadow-sm sm:rounded-[2rem] sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{order.orderNumber}</p>
                  <p className="mt-2 text-sm text-slate-600">{order.product.name}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>
              <p className="mt-4 text-sm text-slate-600">{order.organization}</p>
              <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
                <span>{order.product.totalBoxes} коробок</span>
                <span>{order.createdAt}</span>
              </div>
            </div>
          ))}
          {filteredOrders.length === 0 && (
            <div className="col-span-full rounded-[2rem] border border-dashed border-slate-200 bg-white p-10 text-center text-slate-600">
              Нет партий для выбранного фильтра.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
