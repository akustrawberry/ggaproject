import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { deleteSubscriber } from "../../actions";
import ConfirmSubmit from "@/components/ConfirmSubmit";

export const metadata: Metadata = { title: "Pelanggan Buletin" };

export default async function AdminSubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
    take: 500,
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink-800">Pelanggan Buletin</h1>
          <p className="text-sm text-ink-500">{subscribers.length} pelanggan</p>
        </div>
        <a
          href="/api/admin/subscribers.csv"
          className="rounded-xl border border-sage-200 px-4 py-2 text-sm font-semibold text-sage-700 hover:bg-sage-50"
        >
          Eksport CSV
        </a>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-sage-100 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sage-100 text-left text-xs uppercase tracking-wide text-ink-400">
              <th className="px-4 py-3">E-mel</th>
              <th className="px-4 py-3">Tarikh Langgan</th>
              <th className="px-4 py-3 text-right">Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-50">
            {subscribers.map((s) => (
              <tr key={s.id} className="hover:bg-sage-50/50">
                <td className="px-4 py-3 font-medium text-ink-700">{s.email}</td>
                <td className="px-4 py-3 text-ink-500">{formatDate(s.createdAt)}</td>
                <td className="px-4 py-3 text-right">
                  <ConfirmSubmit
                    action={deleteSubscriber.bind(null, s.id)}
                    message={`Nyahlanggan ${s.email}?`}
                    className="rounded-lg border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    Nyahlanggan
                  </ConfirmSubmit>
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr><td colSpan={3} className="px-4 py-8 text-center text-ink-400">Belum ada pelanggan.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
