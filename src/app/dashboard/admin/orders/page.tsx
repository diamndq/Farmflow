"use client";

import Link from "next/link";
import { useOrders } from "../../../../context/OrdersContext";
import AdminOrdersList from "../../../../components/AdminOrdersList";

export default function AdminOrdersPage() {
  const { orders } = useOrders();

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">Заказы</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Все заказы</h2>
        </div>
        <Link
          href="/dashboard/admin/orders/new"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163926] sm:w-auto"
        >
          Создать заказ
        </Link>
      </div>

      <AdminOrdersList orders={orders} />
    </section>
  );
}
