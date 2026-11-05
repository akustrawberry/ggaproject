import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Papan Pemuka Admin" };

export default async function AdminDashboard() {
  const [articles, published, drafts, subscribers, faqs, categories, tags, recent, topViewed] =
    await Promise.all([
      prisma.article.count(),
      prisma.article.count({ where: { status: "PUBLISHED" } }),
      prisma.article.count({ where: { status: "DRAFT" } }),
      prisma.subscriber.count(),
      prisma.faq.count({ where: { published: true } }),
      prisma.category.count(),
      prisma.tag.count(),
      prisma.article.findMany({
        orderBy: { updatedAt: "desc" },
        take: 5,
        include: { category: true },
      }),
      prisma.article.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { views: "desc" },
        take: 5,
        select: { id: true, title: true, slug: true, views: true },
      }),
    ]);

  const stats = [
    { label: "Jumlah Artikel", value: articles },
    { label: "Diterbitkan", value: published },
    { label: "Draf", value: drafts },
    { label: "Pelanggan", value: subscribers },
    { label: "Soal Jawab", value: faqs },
    { label: "Kategori", value: categories },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-800">Papan Pemuka</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-sage-100 bg-white p-5">
            <p className="text-3xl font-bold text-sage-700">{s.value}</p>
            <p className="mt-1 text-sm text-ink-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-sage-100 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-ink-800">Artikel Terkini Dikemas Kini</h2>
            <Link href="/admin/artikel" className="text-sm text-sage-700 hover:underline">Semua →</Link>
          </div>
          <ul className="mt-4 divide-y divide-sage-50">
            {recent.map((a) => (
              <li key={a.id} className="flex items-center justify-between py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink-700">{a.title}</p>
                  <p className="text-xs text-ink-400">{a.category?.name ?? "—"} • {formatDate(a.updatedAt)}</p>
                </div>
                <span className={`ml-3 shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${a.status === "PUBLISHED" ? "bg-sage-100 text-sage-700" : "bg-ink-100 text-ink-500"}`}>
                  {a.status === "PUBLISHED" ? "Terbit" : "Draf"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-sage-100 bg-white p-5">
          <h2 className="font-bold text-ink-800">Artikel Paling Banyak Dilihat</h2>
          <ul className="mt-4 space-y-2">
            {topViewed.map((a) => (
              <li key={a.id} className="flex items-center justify-between rounded-lg bg-sage-50 px-3 py-2">
                <Link href={`/artikel/${a.slug}`} className="truncate text-sm text-ink-700 hover:text-sage-700">
                  {a.title}
                </Link>
                <span className="ml-3 shrink-0 text-xs font-semibold text-sage-700">{a.views} tontonan</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-sage-100 bg-white p-5">
        <h2 className="font-bold text-ink-800">Tindakan Pantas</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/admin/artikel/baru" className="rounded-xl bg-sage-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-700">
            + Artikel Baharu
          </Link>
          <Link href="/admin/faq" className="rounded-xl border border-sage-200 px-5 py-2.5 text-sm font-semibold text-sage-700 hover:bg-sage-50">
            Urus Soal Jawab
          </Link>
          <Link href="/admin/pelanggan" className="rounded-xl border border-sage-200 px-5 py-2.5 text-sm font-semibold text-sage-700 hover:bg-sage-50">
            Lihat Pelanggan
          </Link>
          <Link href="/" className="rounded-xl border border-ink-200 px-5 py-2.5 text-sm font-semibold text-ink-600 hover:bg-ink-50">
            Lihat Website ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
