"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import BottomNav from "../../components/BottomNav";
import { useAuth } from "../../context/AuthContext";

const pageTitles: Record<string, string> = {
  "/dashboard/admin": "Админская панель",
  "/dashboard/admin/orders": "Заказы",
  "/dashboard/admin/orders/new": "Создать заказ",
  "/dashboard/farmer": "Фермерская панель",
  "/dashboard/farmer/receive": "Приёмка заказа",
  "/dashboard/farmer/usage": "Использование",
  "/dashboard/farmer/history": "История",
  "/dashboard/driver": "Заказы водителя",
  "/dashboard/driver/delivery/order-001": "Доставка",
  "/dashboard/user": "Мониторинг",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [router, user]);

  const title =
    pageTitles[pathname] ??
    (pathname.startsWith("/dashboard/driver/delivery") ? "Доставка" : pageTitles["/dashboard/admin"]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header title={title} />
      <div className="flex">
        <Sidebar role={user.role} user={user} />
        <main className="flex-1 pb-28 lg:pb-0">
          <div className="mx-auto max-w-5xl px-4 py-6 md:px-6">
            {children}
          </div>
        </main>
      </div>
      <BottomNav role={user.role} />
    </div>
  );
}
