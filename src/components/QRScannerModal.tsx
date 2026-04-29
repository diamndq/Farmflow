"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, X } from "lucide-react";
import { useLang } from "../context/LangContext";

type QRScannerModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (value: string) => void;
  title?: string;
  
  expectedValue?: string;

  simulateValue?: string;
};

export default function QRScannerModal({
  open,
  onClose,
  onConfirm,
  title,
  expectedValue,
  simulateValue = "farmflow-qr-delivery-001",
}: QRScannerModalProps) {
  const { t } = useLang();
  const [tab, setTab] = useState<"cam" | "manual">("cam");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [scannerStarted, setScannerStarted] = useState(false);
  const scannerRef = useRef<any>(null);

 
  useEffect(() => {
    if (!open || tab !== "cam") return;


    const timer = setTimeout(() => startScanner(), 400);
    return () => {
      clearTimeout(timer);
      stopScanner();
    };
  }, [open, tab]);


  useEffect(() => {
    if (!open) {
      stopScanner();
      setInput("");
      setError("");
      setTab("cam");
    }
  }, [open]);

  const startScanner = async () => {
    try {

      const { Html5Qrcode } = await import("html5-qrcode");

      const scanner = new Html5Qrcode("farmflow-qr-reader");
      scannerRef.current = scanner;

await scanner.start(
  { facingMode: "environment" },
  {
    fps: 15,
    qrbox: { width: 280, height: 180 },
  },
  (decodedText: string) => {
    handleSuccess(decodedText);
  },
  () => {}
);
      setScannerStarted(true);
    } catch {
      setError("Нет доступа к камере. Используйте ручной ввод.");
    }
  };

const stopScanner = async () => {
  try {
    if (scannerRef.current?.isScanning) {
      await scannerRef.current.stop();
    }
  } catch {

  } finally {
    scannerRef.current = null;
    setScannerStarted(false);
  }
};

const handleSimulate = async () => {
  await stopScanner(); 
  handleSuccess(simulateValue ?? "farmflow-qr-delivery-001");
};

  const handleSuccess = (value: string) => {
    stopScanner();
    setError("");

   
    if (expectedValue && value !== expectedValue) {
      setError("Неверный QR-код. Попробуйте ещё раз.");

      setTimeout(() => startScanner(), 1000);
      return;
    }

    onConfirm(value);
    onClose();
  };

  const handleManualConfirm = () => {
    const val = input.trim();
    if (!val) return;
    handleSuccess(val);
  };

  const handleTabSwitch = (newTab: "cam" | "manual") => {
    if (newTab === "manual") stopScanner();
    if (newTab === "cam") startScanner();
    setTab(newTab);
    setError("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop md:p-4">
      <div className="relative h-full w-full rounded-none bg-white md:relative md:h-auto md:max-w-md md:rounded-3xl md:border md:border-slate-200 md:shadow-xl">

        {/* Закрыть */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-100"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Заголовок */}
        <div className="p-6 pb-5 md:pb-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-(--accent)/15 text-(--primary)">
              <Camera className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {title ?? t.scanQR}
              </h2>
              <p className="text-sm text-slate-500">
                {tab === "cam" ? "Наведите камеру на код" : t.manualInput}
              </p>
            </div>
          </div>

          {/* Табы */}
          <div className="mb-5 flex rounded-2xl border border-slate-200 p-1">
            <button
              type="button"
              onClick={() => handleTabSwitch("cam")}
              className={`flex-1 rounded-xl py-3 text-sm font-medium transition md:py-2 ${
                tab === "cam"
                  ? "bg-(--primary) text-white"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Камера
            </button>
            <button
              type="button"
              onClick={() => handleTabSwitch("manual")}
              className={`flex-1 rounded-xl py-3 text-sm font-medium transition md:py-2 ${
                tab === "manual"
                  ? "bg-(--primary) text-white"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Вручную
            </button>
          </div>
        </div>

        {/* Вкладка камеры */}
        {tab === "cam" && (
          <div className="flex flex-1 flex-col items-center gap-4 px-6 pb-6 md:flex-none">
            {/* Контейнер для видео — html5-qrcode*/}
            <div className="relative flex-1 w-full overflow-hidden rounded-4xl md:h-52">
              <div id="farmflow-qr-reader" className="h-full w-full md:h-auto" />
              {/* Зелёные уголки поверх видео */}
              {scannerStarted && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="relative h-full w-full md:h-52 md:w-52">
                    <span className="absolute left-0 top-0 h-8 w-8 rounded-tl-xl border-l-4 border-t-4 border-(--accent)" />
                    <span className="absolute right-0 top-0 h-8 w-8 rounded-tr-xl border-r-4 border-t-4 border-(--accent)" />
                    <span className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-xl border-b-4 border-l-4 border-(--accent)" />
                    <span className="absolute bottom-0 right-0 h-8 w-8 rounded-br-xl border-b-4 border-r-4 border-(--accent)" />
                  </div>
                </div>
              )}
            </div>

            {/* Ошибка */}
            {error && (
              <p className="rounded-2xl bg-red-50 px-4 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            {!scannerStarted && !error && (
              <p className="text-sm text-slate-400">Запуск камеры...</p>
            )}

            {/* Демо кнопка */}
            <button
              type="button"
              onClick={handleSimulate}
              className="w-full rounded-3xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              ⚡ {t.simulateScan}
            </button>
          </div>
        )}

        {/* Вкладка ручного ввода */}
        {tab === "manual" && (
          <div className="flex flex-col gap-3 px-6 pb-6">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleManualConfirm()}
              autoFocus
              className="w-full rounded-3xl border border-slate-200 bg-background px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-(--accent)"
              placeholder="Введите код..."
            />
            {error && (
              <p className="rounded-2xl bg-red-50 px-4 py-2 text-sm text-red-600">
                {error}
              </p>
            )}
            <button
              type="button"
              onClick={handleManualConfirm}
              disabled={!input.trim()}
              className="w-full rounded-3xl bg-(--primary) py-3 text-sm font-semibold text-white transition hover:bg-[#163926] disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Подтвердить
            </button>
          </div>
        )}
      </div>
    </div>
  );
}