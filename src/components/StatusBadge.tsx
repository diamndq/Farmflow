"use client";

import { useLang } from "../context/LangContext";
import { classNames, getStatusColor } from "../lib/utils";

type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useLang();
  const label = (t.status as Record<string, string>)[status] ?? status;

  return (
    <span className={classNames("inline-flex rounded-full px-3 py-1 text-xs font-semibold", getStatusColor(status))}>
      {label}
    </span>
  );
}
