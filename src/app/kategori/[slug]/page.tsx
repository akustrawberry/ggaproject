import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ArticleCard from "@/components/ArticleCard";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/kategori/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const cat = await prisma.category.findUnique({ where: { slug } });
  if (!cat) return { title: "Kategori Tidak Dijumpai" };
  return {
    title: cat.name,
    description: cat.description ?? `Artikel dan panduan tentang ${cat.name} dalam Bahasa Melayu.`,
  };
}

export default async function CategoryPage({ params }: PageProps<"/kategori/[slug]">) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      articles: {
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        include: { category: true },
      },
    },
  });
  if (!category) notFound();

  const others = await prisma.category.findMany({
    where: { slug: { not: slug } },
    select: { name: true, slug: true, description: true },
    take: 3,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <nav className="text-sm text-ink-400" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-sage-700">Utama</Link>
        <span className="mx-2">/</span>
        <span className="text-ink-600">{category.name}</span>
      </nav>

      <div className="mt-6 rounded-2xl bg-gradient-to-br from-sage-50 to-sky-50 p-8">
        <h1 className="text-3xl font-bold text-ink-800 sm:text-4xl">{category.name}</h1>
        {category.description && <p className="mt-3 max-w-2xl text-ink-500">{category.description}</p>}
        <p className="mt-2 text-sm text-ink-400">{category.articles.length} artikel</p>
      </div>

      {category.articles.length === 0 ? (
        <p className="mt-10 text-center text-ink-500">Artikel untuk kategori ini akan datang tidak lama lagi.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {category.articles.map((a) => (
            <ArticleCard key={a.id} {...a} category={a.category} />
          ))}
        </div>
      )}

      <div className="mt-14">
        <h2 className="text-xl font-bold text-ink-800">Kategori Lain</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {others.map((c) => (
            <Link
              key={c.slug}
              href={`/kategori/${c.slug}`}
              className="rounded-full border border-sage-200 bg-white px-5 py-2 text-sm font-medium text-sage-700 hover:bg-sage-50"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
