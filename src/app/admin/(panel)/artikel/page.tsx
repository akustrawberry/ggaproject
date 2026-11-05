import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { toggleArticleStatus, deleteArticle } from "../../actions";
import ConfirmButton from "@/components/ConfirmButton";

export const metadata: Metadata = { title: "Urus Artikel" };

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { updatedAt: "desc" },
    include: { category: true, _count: { select: { tags: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink-800">Artikel</h1>
          <p className="text-sm text-ink-500">{articles.length} artikel keseluruhan</p>
        </div>
        <Link href="/admin/artikel/baru" className="rounded-xl bg-sage-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-700">
          + Artikel Baharu
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-sage-100 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sage-100 text-left text-xs uppercase tracking-wide text-ink-400">
              <th className="px-4 py-3">Tajuk</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Kemas Kini</th>
              <th className="px-4 py-3 text-right">Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-50">
            {articles.map((a) => (
              <tr key={a.id} className="hover:bg-sage-50/50">
                <td className="max-w-[280px] px-4 py-3">
                  <Link href={`/artikel/${a.slug}`} target="_blank" className="font-medium text-ink-700 hover:text-sage-700">
                    {a.title}
                  </Link>
                  <p className="text-xs text-ink-400">/{a.slug}</p>
                </td>
                <td className="px-4 py-3 text-ink-600">{a.category?.name ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${a.status === "PUBLISHED" ? "bg-sage-100 text-sage-700" : "bg-ink-100 text-ink-500"}`}>
                    {a.status === "PUBLISHED" ? "Terbit" : "Draf"}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-500">{formatDate(a.updatedAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/artikel/${a.id}/edit`} className="rounded-lg border border-sage-200 px-3 py-1 text-xs font-medium text-sage-700 hover:bg-sage-50">
                      Edit
                    </Link>
                    <form action={toggleArticleStatus.bind(null, a.id)}>
                      <button className="rounded-lg border border-sky-200 px-3 py-1 text-xs font-medium text-sky-700 hover:bg-sky-50">
                        {a.status === "PUBLISHED" ? "Nyahterbit" : "Terbitkan"}
                      </button>
                    </form>
                    <form action={deleteArticle.bind(null, a.id)}>
                      <ConfirmButton message={`Padam artikel "${a.title}"? Tindakan ini tidak boleh dibatalkan.`} className="rounded-lg border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50">
                        Padam
                      </ConfirmButton>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-ink-400">Tiada artikel lagi.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
