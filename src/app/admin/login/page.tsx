import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { adminLogin } from "../actions";

export const metadata: Metadata = { title: "Log Masuk Admin" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const user = await getSessionUser();
  if (user) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-sage-100 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-sage-800">Admin Legakan</h1>
        <p className="mt-1 text-sm text-ink-500">Log masuk untuk mengurus kandungan website.</p>
        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            E-mel atau kata laluan tidak betul.
          </p>
        )}
        <form action={adminLogin} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-ink-600">E-mel</label>
            <input
              type="email" name="email" required autoComplete="email"
              className="mt-1 w-full rounded-lg border border-sage-200 px-3 py-2 text-sm focus:border-sage-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink-600">Kata Laluan</label>
            <input
              type="password" name="password" required autoComplete="current-password"
              className="mt-1 w-full rounded-lg border border-sage-200 px-3 py-2 text-sm focus:border-sage-400 focus:outline-none"
            />
          </div>
          <button className="w-full rounded-xl bg-sage-600 py-2.5 font-semibold text-white hover:bg-sage-700">
            Log Masuk
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-ink-400">
          <a href="/" className="hover:text-sage-700">← Kembali ke laman utama</a>
        </p>
      </div>
    </div>
  );
}
