"use client";

import { ArrowRight, Package, Truck, User } from "lucide-react";
import { Order } from "../lib/mockData";
import StatusBadge from "./StatusBadge";

type OrderCardProps = {
  order: Order;
  actionLabel?: string;
  onAction?: () => void;
};

export default function OrderCard({ order, actionLabel, onAction }: OrderCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Package className="h-4 w-4" />
            <span>{order.orderNumber}</span>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-slate-900">{order.product.name}</h3>
          <p className="mt-2 text-sm text-slate-600">{order.organization}</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} />
          <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-slate-600">{order.product.totalBoxes} коробок</span>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl bg-surface p-4 text-sm text-slate-700">
          <div className="mb-2 flex items-center gap-2 text-slate-500">
            <User className="h-4 w-4" /> Фермер:
          </div>
          <div className="font-medium">{order.farmer.name}</div>
        </div>
        <div className="rounded-3xl bg-surface p-4 text-sm text-slate-700">
          <div className="mb-2 flex items-center gap-2 text-slate-500">
            <Truck className="h-4 w-4" /> Водитель:
          </div>
          <div className="font-medium">{order.driver.name}</div>
        </div>
      </div>
      {onAction && actionLabel && (
        <button
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-2 rounded-3xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163926]"
        >
          {actionLabel} <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
