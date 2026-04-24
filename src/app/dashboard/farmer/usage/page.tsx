"use client";

import { useMemo, useState } from "react";
import QRScannerModal from "../../../../components/QRScannerModal";
import { useAuth } from "../../../../context/AuthContext";
import { useOrders } from "../../../../context/OrdersContext";

type BoxItem = {
  id: string;
  name: string;
  used: boolean;
  usedAt: string;
};

export default function FarmerUsagePage() {
  const { user } = useAuth();
  const { orders } = useOrders();
  const order = useMemo(
    () => orders.find((item) => item.farmer.iin === user?.iin && ["in_use", "delivered", "receiving"].includes(item.status)),
    [orders, user?.iin]
  );

  const initialBoxes = useMemo<BoxItem[]>(() => {
    const count = order?.product.totalBoxes ?? 3;
    return Array.from({ length: count }, (_, index) => ({
      id: `box-${index + 1}`,
      name: `Коробка ${index + 1}`,
      used: false,
      usedAt: "",
    }));
  }, [order?.product.totalBoxes]);

  const [boxes, setBoxes] = useState<BoxItem[]>(initialBoxes);
  const [activeBox, setActiveBox] = useState<BoxItem | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleConfirm = (value: string) => {
    if (!activeBox) {
      setOpenModal(false);
      return;
    }

    setBoxes((prev) =>
      prev.map((box) =>
        box.id === activeBox.id
          ? { ...box, used: true, usedAt: new Date().toLocaleString("ru-RU") }
          : box
      )
    );
    setActiveBox(null);
    setOpenModal(false);
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">Использование</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Список принятых коробок</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {boxes.map((box) => (
            <div key={box.id} className="rounded-3xl border border-slate-200 bg-[var(--bg)] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-900">{box.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{box.used ? "Использована" : "Ожидает сканирования"}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveBox(box);
                    setOpenModal(true);
                  }}
                  className="rounded-3xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3c8f67]"
                >
                  Сканировать
                </button>
              </div>
              {box.used && <p className="mt-4 text-sm text-emerald-700">Использовано: {box.usedAt}</p>}
            </div>
          ))}
        </div>
      </section>
      <QRScannerModal open={openModal} onClose={() => setOpenModal(false)} onConfirm={handleConfirm} title="Поверните камеру на QR коробки" />
    </div>
  );
}
