"use client";

import Link from "next/link";
import { Package, Truck, CheckCircle2, Layers } from "lucide-react";
import { useOrders } from "../../../context/OrdersContext";
import AdminOrdersList from "../../../components/AdminOrdersList";
import StatCard from "../../../components/StatCard";

export default function AdminDashboardPage() {
  const { orders } = useOrders();
  const totalOrders = orders.length;
  const inTransitCount = orders.filter((order) => order.status === "in_transit").length;
  const deliveredCount = orders.filter((order) => order.status === "delivered").length;
  const completedCount = orders.filter((order) => order.status === "completed").length;

  return (
    <div className="space-y-8">
      <section className="grid grid-cols-2 gap-3 sm:gap-6 xl:grid-cols-4">
        <StatCard label="Всего заказов" value={totalOrders} icon={Package} accent="bg-[var(--primary)]" />
        <StatCard label="В пути" value={inTransitCount} icon={Truck} accent="bg-blue-600" />
        <StatCard label="Доставлено" value={deliveredCount} icon={CheckCircle2} accent="bg-emerald-600" />
        <StatCard label="Завершено" value={completedCount} icon={Layers} accent="bg-[var(--accent)]" />
      </section>

      <section className="rounded-3xl bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">Заказы</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Состояние текущих партий</h2>
          </div>
          <Link href="/dashboard/admin/orders/new" className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163926] sm:w-auto">
            Создать заказ
          </Link>
        </div>
        <AdminOrdersList orders={orders} />
      </section>
    </div>
  );
}
