"use client";

import Link from "next/link";
import { useOrders } from "../../../../context/OrdersContext";
import StatusBadge from "../../../../components/StatusBadge";
import { formatDate } from "../../../../lib/utils";

export default function AdminOrdersPage() {
  const { orders } = useOrders();

  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">Заказы</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Все заказы</h2>
        </div>
        <Link
          href="/dashboard/admin/orders/new"
          className="inline-flex items-center justify-center rounded-3xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163926]"
        >
          Создать заказ
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="rounded-3xl border border-slate-200 bg-surface px-6 py-10 text-center text-slate-600">
          Заказов пока нет.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-[2rem] border border-slate-200">
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
                  <td className="whitespace-nowrap px-6 py-4">{order.product.name}</td>
                  <td className="whitespace-nowrap px-6 py-4"><StatusBadge status={order.status} /></td>
                  <td className="whitespace-nowrap px-6 py-4">{formatDate(order.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
