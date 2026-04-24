"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { MOCK_NOTIFICATIONS, MOCK_ORDERS, type NotificationItem, type Order } from "../lib/mockData";

type OrdersContextType = {
  orders: Order[];
  notifications: NotificationItem[];
  addOrder: (order: Order) => void;
  updateOrder: (id: string, partial: Partial<Order>) => void;
  markAllNotificationsRead: () => void;
  markNotificationRead: (id: string) => void;
};

const OrdersContext = createContext<OrdersContextType | null>(null);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        type: "order_created",
        message: {
          ru: `Новый заказ ${order.orderNumber} создан`,
          kz: `${order.orderNumber} жаңа тапсырыс жасалды`,
        },
        isRead: false,
        createdAt: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
  };

  const updateOrder = (id: string, partial: Partial<Order>) => {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, ...partial } : order)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, isRead: true } : item)));
  };

  const value = useMemo(
    () => ({ orders, notifications, addOrder, updateOrder, markAllNotificationsRead, markNotificationRead }),
    [orders, notifications]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within OrdersProvider");
  }
  return context;
}
