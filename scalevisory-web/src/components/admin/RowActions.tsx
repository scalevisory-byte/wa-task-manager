"use client";

import { useTransition } from "react";

export function ConfirmButton({ label, onConfirm, message }: { label: string; onConfirm: () => Promise<void>; message: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      className="text-sm font-medium text-red-700 hover:underline disabled:opacity-50"
      disabled={pending}
      onClick={() => { if (confirm(message)) start(() => onConfirm()); }}
    >
      {pending ? "…" : label}
    </button>
  );
}

export function ActionButton({ label, onClick }: { label: string; onClick: () => Promise<void> }) {
  const [pending, start] = useTransition();
  return (
    <button className="text-sm font-medium text-navy hover:underline disabled:opacity-50" disabled={pending} onClick={() => start(() => onClick())}>
      {pending ? "…" : label}
    </button>
  );
}
