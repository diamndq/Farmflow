"use client";

import Link from "next/link";
import { Package, Truck, CheckCircle2, Layers } from "lucide-react";
import { useOrders } from "../../../context/OrdersContext";
import StatCard from "../../../components/StatCard";
import StatusBadge from "../../../components/StatusBadge";
import { formatDate } from "../../../lib/utils";

export default function AdminDashboardPage() {
  const { orders } = useOrders();
  const totalOrders = orders.length;
  const inTransitCount = orders.filter((order) => order.status === "in_transit").length;
  const deliveredCount = orders.filter((order) => order.status === "delivered").length;
  const completedCount = orders.filter((order) => order.status === "completed").length;

  return (
    <div className="space-y-8">
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Всего заказов" value={totalOrders} icon={Package} accent="bg-[var(--primary)]" />
        <StatCard label="В пути" value={inTransitCount} icon={Truck} accent="bg-blue-600" />
        <StatCard label="Доставлено" value={deliveredCount} icon={CheckCircle2} accent="bg-emerald-600" />
        <StatCard label="Завершено" value={completedCount} icon={Layers} accent="bg-[var(--accent)]" />
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">Заказы</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Состояние текущих партий</h2>
          </div>
          <Link href="/dashboard/admin/orders/new" className="inline-flex items-center rounded-3xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163926]">
            Создать заказ
          </Link>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-slate-200">
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
                  <td className="px-6 py-4 font-semibold text-slate-900">{order.orderNumber}</td>
                  <td className="px-6 py-4">{order.farmer.name}</td>
                  <td className="px-6 py-4">{order.driver.name}</td>
                  <td className="px-6 py-4">{order.product.name}</td>
                  <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                  <td className="px-6 py-4">{formatDate(order.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
