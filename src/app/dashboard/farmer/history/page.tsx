"use client";

import { useState, Fragment } from "react";
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
      <section className="rounded-3xl bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-6">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">История</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">Архив партий</h1>
        </div>

        <div className="space-y-4 md:hidden">
          {historyOrders.map((order) => (
            <div key={order.id} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-3xl sm:p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="break-all text-sm font-semibold text-slate-900">{order.orderNumber}</p>
                  <p className="break-words text-sm text-slate-500">{order.product.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">{formatDate(order.createdAt)}</span>
                  <StatusBadge status={order.status} />
                </div>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-slate-600">
                <div className="flex items-center justify-between rounded-3xl bg-surface px-3 py-3">
                  <span>Коробок</span>
                  <span>{order.product.totalBoxes}</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-surface px-3 py-3">
                  <span>Описание</span>
                  <span className="max-w-[60%] truncate text-right">{order.product.description}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                {expandedId === order.id ? "Скрыть" : "Показать"}
                {expandedId === order.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {expandedId === order.id && (
                <div className="mt-4 rounded-3xl border border-slate-200 bg-surface p-4">
                  <p className="text-sm text-slate-700">Описание: {order.product.description}</p>
                  <div className="mt-4 grid gap-3">
                    {Array.from({ length: order.product.totalBoxes }, (_, index) => (
                      <div key={index} className="rounded-3xl border border-slate-200 bg-white p-4 text-sm">
                        <p className="font-semibold text-slate-900">Коробка {index + 1}</p>
                        <p className="mt-2 text-slate-600">Статус: {order.status}</p>
                        <p className="mt-1 text-slate-500">Отсканирована: {formatDate(order.createdAt)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 md:block hidden">
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
                <Fragment key={order.id}>
                  <tr className="hover:bg-slate-50">
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
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
