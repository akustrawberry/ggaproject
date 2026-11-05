import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Markdown from "@/components/Markdown";
import ArticleCard from "@/components/ArticleCard";
import { formatDate } from "@/lib/utils";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/artikel/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article) return { title: "Artikel Tidak Dijumpai" };
  return {
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt ?? undefined,
    openGraph: {
      title: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.excerpt ?? undefined,
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      authors: [article.authorName],
    },
  };
}

function extractHeadings(content: string) {
  return content
    .split("\n")
    .filter((l) => /^##\s+/.test(l))
    .map((l) => ({ text: l.replace(/^##\s+/, "").trim(), id: l.replace(/^##\s+/, "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") }));
}

export default async function ArticlePage({ params }: PageProps<"/artikel/[slug]">) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
    include: { category: true, tags: { include: { tag: true } } },
  });
  if (!article || article.status !== "PUBLISHED") notFound();

  // increment view count (fire and forget)
  prisma.article.update({ where: { id: article.id }, data: { views: { increment: 1 } } }).catch(() => {});

  const related = await prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      id: { not: article.id },
      OR: [
        { categoryId: article.categoryId ?? undefined },
        { tags: { some: { tagId: { in: article.tags.map((t) => t.tagId) } } } },
      ],
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: { category: true },
  });

  const headings = extractHeadings(article.content);
  const shareUrl = `${SITE_URL}/artikel/${article.slug}`;
  const shareText = encodeURIComponent(article.title);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seoDescription ?? article.excerpt,
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: { "@type": "Organization", name: article.authorName },
    publisher: { "@type": "Organization", name: "Legakan" },
    mainEntityOfPage: shareUrl,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="text-sm text-ink-400" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-sage-700">Utama</Link>
        <span className="mx-2">/</span>
        <Link href="/artikel" className="hover:text-sage-700">Artikel</Link>
        {article.category && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/kategori/${article.category.slug}`} className="hover:text-sage-700">
              {article.category.name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-ink-600">{article.title}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_260px]">
        <article>
          {article.category && (
            <Link
              href={`/kategori/${article.category.slug}`}
              className="inline-block rounded-full bg-sage-100 px-4 py-1 text-sm font-semibold text-sage-700"
            >
              {article.category.name}
            </Link>
          )}
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl">
            {article.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-400">
            <span>Oleh {article.authorName}</span>
            <span>Diterbitkan: {formatDate(article.publishedAt)}</span>
            {article.updatedAt > (article.publishedAt ?? article.updatedAt) && (
              <span>Kemas kini: {formatDate(article.updatedAt)}</span>
            )}
            <span>{article.readTime} minit bacaan</span>
            <span>{article.views} tontonan</span>
          </div>

          {article.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((t) => (
                <Link key={t.tagId} href={`/artikel?q=${encodeURIComponent(t.tag.name)}`} className="rounded-full bg-ink-50 px-3 py-1 text-xs text-ink-500 hover:bg-sage-50 hover:text-sage-700">
                  #{t.tag.name}
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8">
            <Markdown content={article.content} />
          </div>

          <div className="mt-10 rounded-2xl border border-sky-100 bg-sky-50 p-5 text-sm text-ink-600">
            <p className="font-semibold text-sky-800">Penafian Perubatan</p>
            <p className="mt-1">
              Artikel ini adalah untuk tujuan pendidikan sahaja dan bukan pengganti nasihat
              perubatan profesional. Sila rujuk doktor untuk diagnosis dan rawatan.
            </p>
          </div>

          {/* Share */}
          <div className="mt-8 flex items-center gap-3">
            <span className="text-sm font-medium text-ink-500">Kongsi:</span>
            <a
              href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
              target="_blank" rel="noreferrer"
              className="rounded-full bg-sage-100 px-4 py-1.5 text-sm font-medium text-sage-700 hover:bg-sage-200"
            >
              WhatsApp
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank" rel="noreferrer"
              className="rounded-full bg-sky-100 px-4 py-1.5 text-sm font-medium text-sky-700 hover:bg-sky-200"
            >
              Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank" rel="noreferrer"
              className="rounded-full bg-ink-100 px-4 py-1.5 text-sm font-medium text-ink-700 hover:bg-ink-200"
            >
              X / Twitter
            </a>
          </div>
        </article>

        {/* Sidebar: TOC + related */}
        <aside className="space-y-8">
          {headings.length > 0 && (
            <div className="rounded-2xl border border-sage-100 bg-white p-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-sage-700">Kandungan</h2>
              <ul className="mt-3 space-y-2">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-sm text-ink-500 hover:text-sage-700">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {related.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-ink-800">Artikel Berkaitan</h2>
              <div className="mt-4 space-y-4">
                {related.map((r) => (
                  <ArticleCard key={r.id} {...r} category={r.category} />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
