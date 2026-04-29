import type { Metadata } from "next";
import { AuthProvider } from "../context/AuthContext";
import { LangProvider } from "../context/LangContext";
import { OrdersProvider } from "../context/OrdersContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "FarmFlow",
  description: "FarmFlow — аграрная логистика Северного Казахстана",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full bg-[var(--bg)] text-[var(--text)] font-sans">
        <LangProvider>
          <AuthProvider>
            <OrdersProvider>{children}</OrdersProvider>
          </AuthProvider>
        </LangProvider>
      </body>
    </html>
  );
}
