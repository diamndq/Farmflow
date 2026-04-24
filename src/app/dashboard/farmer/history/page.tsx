"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import { useOrders } from "../../../../context/OrdersContext";
import StatusBadge from "../../../../components/StatusBadge";
import { formatDate } from "../../../../lib/utils";

export default function FarmerHistoryPage() {
  const { user } = useAuth();
  const { orders } = useOrders();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const historyOrders = orders.filter((order) => order.farmer.iin === user?.iin && order.status !== "pending");

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">История</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Архив партий</h1>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-surface text-slate-600">
              <tr>
                <th className="px-6 py-4">Партия</th>
                <th className="px-6 py-4">Продукт</th>
                <th className="px-6 py-4">Дата</th>
                <th className="px-6 py-4">Коробок</th>
                <th className="px-6 py-4">Статус</th>
                <th className="px-6 py-4">Детали</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {historyOrders.map((order) => (
                <>
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-900">{order.orderNumber}</td>
                    <td className="px-6 py-4">{order.product.name}</td>
                    <td className="px-6 py-4">{formatDate(order.createdAt)}</td>
                    <td className="px-6 py-4">{order.product.totalBoxes}</td>
                    <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                        className="inline-flex items-center gap-2 text-slate-600 transition hover:text-[var(--primary)]"
                      >
                        {expandedId === order.id ? "Скрыть" : "Показать"}
                        {expandedId === order.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </td>
                  </tr>
                  {expandedId === order.id && (
                    <tr className="bg-[var(--bg)]">
                      <td colSpan={6} className="px-6 py-4">
                        <div className="rounded-3xl border border-slate-200 bg-white p-5">
                          <p className="text-sm text-slate-700">Описание: {order.product.description}</p>
                          <div className="mt-4 grid gap-3 md:grid-cols-3">
                            {Array.from({ length: order.product.totalBoxes }, (_, index) => (
                              <div key={index} className="rounded-3xl border border-slate-200 bg-surface p-4 text-sm">
                                <p className="font-semibold text-slate-900">Коробка {index + 1}</p>
                                <p className="mt-2 text-slate-600">Статус: {order.status}</p>
                                <p className="mt-1 text-slate-500">Отсканирована: {formatDate(order.createdAt)}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
