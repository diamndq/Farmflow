"use client";

import { useRouter } from "next/navigation";
import OrderCard from "../../../components/OrderCard";
import { useAuth } from "../../../context/AuthContext";
import { useOrders } from "../../../context/OrdersContext";

export default function DriverDashboardPage() {
  const { user } = useAuth();
  const { orders, updateOrder } = useOrders();
  const router = useRouter();

  const assignedOrders = orders.filter((order) => order.driver.iin === user?.iin);

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">Водитель</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Назначенные маршруты</h1>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {assignedOrders.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-slate-200 bg-[var(--bg)] p-8 text-center text-slate-600">
              Нет назначенных заказов.
            </div>
          ) : (
            assignedOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                actionLabel={order.status === "pending" ? "Принять" : "Перейти"}
                onAction={() => {
                  if (order.status === "pending") {
                    updateOrder(order.id, { status: "in_transit" });
                  }
                  router.push(`/dashboard/driver/delivery/${order.id}`);
                }}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
