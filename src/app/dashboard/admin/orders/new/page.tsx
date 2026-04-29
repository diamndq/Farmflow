"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { MOCK_USERS, type Order } from "../../../../../lib/mockData";
import { useOrders } from "../../../../../context/OrdersContext";

export default function NewOrderPage() {
  const [farmerIin, setFarmerIin] = useState("");
  const [driverIin, setDriverIin] = useState("");
  const [organization, setOrganization] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [boxes, setBoxes] = useState(1);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { addOrder } = useOrders();

  const farmers = useMemo(() => MOCK_USERS.filter((item) => item.role === "farmer"), []);
  const drivers = useMemo(() => MOCK_USERS.filter((item) => item.role === "driver"), []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!farmerIin || !driverIin || !organization || !productName) {
      return;
    }

    const farmer = farmers.find((item) => item.iin === farmerIin);
    const driver = drivers.find((item) => item.iin === driverIin);
    if (!farmer || !driver) {
      return;
    }

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber: `SKO-2024-${Math.floor(1000 + Math.random() * 9000)}`,
      farmer: { iin: farmer.iin, name: farmer.name },
      driver: { iin: driver.iin, name: driver.name },
      organization,
      product: { name: productName, description, totalBoxes: boxes },
      status: "pending",
      createdAt: new Date().toISOString().slice(0, 10),
      deliveryQR: {
        value: `farmflow-qr-delivery-${Date.now()}`,
        imageUrl: "/codes/qr-delivery-default.png",
      },
      packages: Array.from({ length: boxes }, (_, i) => ({
        id: `pkg-${Date.now()}-${i + 1}`,
        label: `Упаковка ${i + 1}`,
        qrValue: `farmflow-qr-package-${Date.now()}-${i + 1}`,
        imageUrl: "/codes/qr-package-default.png",
        isUsed: false,
        usedAt: null,
      })),
      boxes: Array.from({ length: boxes }, (_, i) => ({
        id: `box-${Date.now()}-${i + 1}`,
        label: `Коробка ${i + 1}`,
        barcode: `FF-BOX-${String(i + 1).padStart(3, "0")}`,
        imageUrl: "/codes/barcode-box-default.png",
        isScanned: false,
      })),
    };

    addOrder(newOrder);
    setSuccess(true);
    setTimeout(() => {
      router.push("/dashboard/admin");
    }, 800);
  };

  return (
    <div className="space-y-8">
      <section className="mx-4 rounded-4xl bg-white p-6 shadow-sm md:mx-0">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-(--accent)">Создать заказ</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900 md:text-2xl">Новый маршрут для логистики</h2>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Фермер</span>
            <select value={farmerIin} onChange={(event) => setFarmerIin(event.target.value)} className="mt-2 w-full min-h-11 rounded-3xl border border-slate-200 bg-surface px-4 py-3 text-slate-900 outline-none transition focus:border-(--accent)">
              <option value="">Выберите фермера</option>
              {farmers.map((farmer) => (
                <option key={farmer.iin} value={farmer.iin}>{farmer.name}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Водитель</span>
            <select value={driverIin} onChange={(event) => setDriverIin(event.target.value)} className="mt-2 w-full min-h-11 rounded-3xl border border-slate-200 bg-surface px-4 py-3 text-slate-900 outline-none transition focus:border-(--accent)">
              <option value="">Выберите водителя</option>
              {drivers.map((driver) => (
                <option key={driver.iin} value={driver.iin}>{driver.name}</option>
              ))}
            </select>
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Организация</span>
            <input value={organization} onChange={(event) => setOrganization(event.target.value)} className="mt-2 w-full min-h-11 rounded-3xl border border-slate-200 bg-surface px-4 py-3 text-slate-900 outline-none transition focus:border-(--accent)" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Продукт</span>
            <input value={productName} onChange={(event) => setProductName(event.target.value)} className="mt-2 w-full min-h-11 rounded-3xl border border-slate-200 bg-surface px-4 py-3 text-slate-900 outline-none transition focus:border-(--accent)" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Описание</span>
            <input value={description} onChange={(event) => setDescription(event.target.value)} className="mt-2 w-full min-h-11 rounded-3xl border border-slate-200 bg-surface px-4 py-3 text-slate-900 outline-none transition focus:border-(--accent)" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Количество коробок</span>
            <input type="number" min={1} value={boxes} onChange={(event) => setBoxes(Number(event.target.value))} className="mt-2 w-full min-h-11 rounded-3xl border border-slate-200 bg-surface px-4 py-3 text-slate-900 outline-none transition focus:border-(--accent)" />
          </label>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:col-span-2">
            <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-3xl bg-(--primary) px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#163926]">
              Создать заказ
            </button>
            {success && <span className="text-sm text-emerald-700">Заказ создан, перенаправление...</span>}
          </div>
        </form>
      </section>
    </div>
  );
}
