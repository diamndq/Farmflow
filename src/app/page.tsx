import type { Metadata } from "next";
import LandingPage from "../components/LandingPage";

export const metadata: Metadata = {
  title: "FarmFlow — от назначения товара до его применения",
  description:
    "Пилотный проект цифрового контроля агрологистики в Северо-Казахстанской области: заказ, доставка, приёмка и использование субсидируемых товаров.",
};

export default function HomePage() {
  return <LandingPage />;
}
