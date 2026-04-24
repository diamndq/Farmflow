"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import BottomNav from "../../components/BottomNav";
import { useAuth } from "../../context/AuthContext";

const pageTitles: Record<string, string> = {
  "/dashboard/admin": "Админская панель",
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
      <div className="mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Sidebar role={user.role} />
        <main className="flex-1 pb-28 lg:pb-0">
          {children}
        </main>
      </div>
      <BottomNav role={user.role} />
    </div>
  );
}
