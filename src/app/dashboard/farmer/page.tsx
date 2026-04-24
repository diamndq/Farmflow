"use client";

import { useRouter } from "next/navigation";
import OrderCard from "../../../components/OrderCard";
import { useAuth } from "../../../context/AuthContext";
import { useOrders } from "../../../context/OrdersContext";

export default function FarmerDashboardPage() {
  const { user } = useAuth();
  const { orders } = useOrders();
  const router = useRouter();

  const pendingOrders = orders.filter(
    (order) => order.farmer.iin === user?.iin && ["pending", "in_transit"].includes(order.status)
  );

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">Фермер</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Мои текущие заказы</h1>
          </div>
          <button onClick={() => router.push("/dashboard/farmer/receive")} className="inline-flex items-center rounded-3xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163926]">
            Приёмка заказов
          </button>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {pendingOrders.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-slate-200 bg-[var(--bg)] p-8 text-center text-slate-600">
              Нет назначенных заказов.
            </div>
          ) : (
            pendingOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                actionLabel="Принять"
                onAction={() => router.push("/dashboard/farmer/receive")}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
