"use client";

import { updateInvoiceStatus } from "@/app/lib/actions";

export function SubmitButton({
  id,
  status,
  children,
  className,
}: {
  id: string;
  status: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={className}
      onClick={() => updateInvoiceStatus(id, status)}
    >
      {children}
    </button>
  );
}
