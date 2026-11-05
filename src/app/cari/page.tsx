import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ArticleCard from "@/components/ArticleCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cari Artikel",
  description: "Cari artikel pendidikan kesihatan tentang Gastrik, GERD, Anxiety dan gaya hidup.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  const articles = query
    ? await prisma.article.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            { title: { contains: query } },
            { excerpt: { contains: query } },
            { content: { contains: query } },
          ],
        },
        orderBy: { publishedAt: "desc" },
        take: 24,
        include: { category: true },
      })
    : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-ink-800">Cari Artikel</h1>
      <form action="/cari" method="get" className="mt-6 flex max-w-xl gap-2">
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Contoh: petua gastrik, makanan GERD…"
          className="flex-1 rounded-xl border border-sage-200 bg-white px-4 py-2.5 text-sm focus:border-sage-400 focus:outline-none"
        />
        <button className="rounded-xl bg-sage-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-sage-700">
          Cari
        </button>
      </form>

      {query && (
        <p className="mt-6 text-sm text-ink-500">
          {articles.length} hasil untuk <strong>“{query}”</strong>
        </p>
      )}

      {query && articles.length === 0 && (
        <p className="mt-8 text-ink-500">
          Tiada artikel dijumpai. Cuba kata kunci lain seperti “gastrik”, “GERD”, atau “anxiety”.
        </p>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard key={a.id} {...a} category={a.category} />
        ))}
      </div>
    </div>
  );
}
