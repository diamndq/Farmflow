"use client";

import { useEffect, useState } from "react";
import { Camera, X } from "lucide-react";
import { useLang } from "../context/LangContext";

type QRScannerModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (value: string) => void;
  title?: string;
};

export default function QRScannerModal({ open, onClose, onConfirm, title }: QRScannerModalProps) {
  const { lang, t } = useLang();
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!open) {
      setInput("");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
        <button type="button" onClick={onClose} className="absolute right-4 top-4 rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100">
          <X className="h-4 w-4" />
        </button>
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[var(--accent)]/15 text-[var(--primary)]">
            <Camera className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{title ?? t.scanQR}</h2>
            <p className="text-sm text-slate-500">{t.manualInput}</p>
          </div>
        </div>
        <div className="relative mx-auto mb-6 flex h-64 w-full items-center justify-center rounded-[2rem] border border-dashed border-[var(--accent)] bg-surface">
          <div className="scan-frame absolute inset-4 rounded-[1.75rem]" />
          <div className="absolute inset-0 grid place-items-center text-center text-sm text-slate-500">
            <p>{t.scanQR}</p>
          </div>
        </div>
        <div className="space-y-4">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-surface px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[var(--accent)]"
            placeholder={t.manualInput}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                setInput("QR-001");
                onConfirm("QR-001");
              }}
              className="inline-flex items-center justify-center rounded-3xl bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#163926]"
            >
              {t.simulateScan}
            </button>
            <button
              type="button"
              onClick={() => onConfirm(input || "QR-001")}
              className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              {t.manualInput}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
