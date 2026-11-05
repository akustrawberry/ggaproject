import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ArticleCard from "@/components/ArticleCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Semua Artikel",
  description: "Semua artikel pendidikan kesihatan tentang Gastrik, GERD, Anxiety dan gaya hidup sihat dalam Bahasa Melayu.",
};

const PAGE_SIZE = 9;

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; kategori?: string; q?: string }>;
}) {
  const { page: pageParam, kategori, q } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const where = {
    status: "PUBLISHED",
    ...(kategori ? { category: { slug: kategori } } : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q } },
            { excerpt: { contains: q } },
            { content: { contains: q } },
          ],
        }
      : {}),
  };

  const [articles, total, categories] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { category: true },
    }),
    prisma.article.count({ where }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  function pageHref(p: number) {
    const params = new URLSearchParams();
    if (kategori) params.set("kategori", kategori);
    if (q) params.set("q", q);
    if (p > 1) params.set("page", String(p));
    const s = params.toString();
    return `/artikel${s ? `?${s}` : ""}`;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <nav className="text-sm text-ink-400" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-sage-700">Utama</Link>
        <span className="mx-2">/</span>
        <span className="text-ink-600">Artikel</span>
      </nav>

      <h1 className="mt-4 text-3xl font-bold text-ink-800 sm:text-4xl">Semua Artikel</h1>
      <p className="mt-2 text-ink-500">{total} artikel diterbitkan</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/artikel"
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${!kategori ? "bg-sage-600 text-white" : "bg-sage-50 text-sage-700 hover:bg-sage-100"}`}
        >
          Semua
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/artikel?kategori=${c.slug}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${kategori === c.slug ? "bg-sage-600 text-white" : "bg-sage-50 text-sage-700 hover:bg-sage-100"}`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {articles.length === 0 ? (
        <p className="mt-12 text-center text-ink-500">Tiada artikel dijumpai.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.id} {...a} category={a.category} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {page > 1 && (
            <Link href={pageHref(page - 1)} className="rounded-lg border border-sage-200 px-4 py-2 text-sm text-sage-700 hover:bg-sage-50">
              ← Sebelum
            </Link>
          )}
          <span className="text-sm text-ink-500">Halaman {page} / {totalPages}</span>
          {page < totalPages && (
            <Link href={pageHref(page + 1)} className="rounded-lg border border-sage-200 px-4 py-2 text-sm text-sage-700 hover:bg-sage-50">
              Seterusnya →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
