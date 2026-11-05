"use client";

import { useTransition } from "react";

export default function ConfirmSubmit({
  action,
  message = "Adakah anda pasti?",
  className = "",
  children,
}: {
  action: () => void | Promise<void>;
  message?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      className={`${className} disabled:opacity-50`}
      onClick={() => {
        if (!confirm(message)) return;
        startTransition(() => action());
      }}
    >
      {children}
    </button>
  );
}
