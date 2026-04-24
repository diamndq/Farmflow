"use client";

import Link from "next/link";
import { Home, Package, Scan, Truck } from "lucide-react";
import { usePathname } from "next/navigation";
import { AppRole } from "../lib/mockData";

const navMap: Record<"farmer" | "driver", Array<{ href: string; label: string; icon: React.ComponentType<any> }>> = {
  farmer: [
    { href: "/dashboard/farmer", label: "Панель", icon: Home },
    { href: "/dashboard/farmer/receive", label: "Приёмка", icon: Scan },
    { href: "/dashboard/farmer/usage", label: "Использование", icon: Package },
    { href: "/dashboard/farmer/history", label: "История", icon: Truck },
  ],
  driver: [
    { href: "/dashboard/driver", label: "Панель", icon: Home },
    { href: "/dashboard/driver/delivery/order-001", label: "Доставка", icon: Truck },
    { href: "/dashboard/driver", label: "Заказы", icon: Package },
    { href: "/dashboard/driver", label: "QR", icon: Scan },
  ],
};

type BottomNavProps = {
  role: AppRole | "driver" | "farmer" | null;
};

export default function BottomNav({ role }: BottomNavProps) {
  const pathname = usePathname();
  if (role !== "farmer" && role !== "driver") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white px-4 py-3 shadow-[0_-6px_20px_rgba(15,23,42,0.08)] lg:hidden">
      <div className="grid grid-cols-4 gap-2">
        {navMap[role].map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={`flex flex-col items-center justify-center rounded-3xl px-2 py-2 text-center text-[10px] font-medium transition ${active ? "bg-[var(--accent)]/15 text-[var(--primary)]" : "text-slate-500 hover:bg-slate-100"}`}>
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
