"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setState("done");
        setMessage(data.message ?? "Terima kasih! Anda telah melanggan.");
        setEmail("");
      } else {
        setState("error");
        setMessage(data.error ?? "Ada masalah. Sila cuba lagi.");
      }
    } catch {
      setState("error");
      setMessage("Rangkaian bermasalah. Sila cuba lagi.");
    }
  }

  if (state === "done") {
    return <p className="rounded-xl bg-sage-100 px-4 py-3 text-sm font-medium text-sage-800">{message}</p>;
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Alamat emel anda"
        className="flex-1 rounded-xl border border-sage-200 bg-white px-4 py-2.5 text-sm text-ink-800 placeholder:text-ink-400 focus:border-sage-400 focus:outline-none"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="rounded-xl bg-sage-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-700 disabled:opacity-60"
      >
        {state === "loading" ? "Menghantar…" : "Langgan"}
      </button>
      {state === "error" && <p className="text-sm text-red-600 sm:col-span-2">{message}</p>}
    </form>
  );
}
