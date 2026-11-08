"use client";

import type { Order } from "../lib/mockData";
import { formatDate } from "../lib/utils";
import StatusBadge from "./StatusBadge";

export default function AdminOrdersList({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <p className="rounded-3xl border border-slate-200 bg-surface px-6 py-10 text-center text-slate-600">
        Заказов пока нет.
      </p>
    );
  }

  return (
    <>
      <div className="space-y-3 md:hidden">
        {orders.map((order) => (
          <article key={order.id} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex min-w-0 items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="break-words font-semibold text-slate-900">{order.orderNumber}</h3>
                <p className="mt-1 break-words text-sm text-slate-600">{order.product.name}</p>
              </div>
              <StatusBadge status={order.status} />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 text-sm">
              <div className="min-w-0">
                <dt className="text-xs text-slate-500">Фермер</dt>
                <dd className="mt-1 break-words font-medium text-slate-800">{order.farmer.name}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-xs text-slate-500">Водитель</dt>
                <dd className="mt-1 break-words font-medium text-slate-800">{order.driver.name}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-xs text-slate-500">Дата</dt>
                <dd className="mt-1 text-slate-700">{formatDate(order.createdAt)}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-xs text-slate-500">Организация</dt>
                <dd className="mt-1 break-words text-slate-700">{order.organization}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-[2rem] border border-slate-200 md:block">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-surface text-slate-600">
            <tr>
              <th className="px-6 py-4">Заказ</th>
              <th className="px-6 py-4">Фермер</th>
              <th className="px-6 py-4">Водитель</th>
              <th className="px-6 py-4">Продукт</th>
              <th className="px-6 py-4">Статус</th>
              <th className="px-6 py-4">Дата</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-900">{order.orderNumber}</td>
                <td className="whitespace-nowrap px-6 py-4">{order.farmer.name}</td>
                <td className="whitespace-nowrap px-6 py-4">{order.driver.name}</td>
                <td className="px-6 py-4">{order.product.name}</td>
                <td className="whitespace-nowrap px-6 py-4"><StatusBadge status={order.status} /></td>
                <td className="whitespace-nowrap px-6 py-4">{formatDate(order.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
