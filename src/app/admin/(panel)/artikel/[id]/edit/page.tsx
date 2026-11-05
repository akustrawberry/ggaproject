import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ArticleForm from "../../ArticleForm";

export const metadata: Metadata = { title: "Edit Artikel" };

export default async function EditArticlePage({ params }: PageProps<"/admin/artikel/[id]/edit">) {
  const { id } = await params;
  const article = await prisma.article.findUnique({
    where: { id },
    include: { tags: true },
  });
  if (!article) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-800">Edit Artikel</h1>
      <p className="mt-1 text-sm text-ink-500">
        <a href={`/artikel/${article.slug}`} target="_blank" className="text-sage-700 hover:underline">
          Lihat artikel →
        </a>
      </p>
      <div className="mt-6 rounded-2xl border border-sage-100 bg-white p-6">
        <ArticleForm article={article} />
      </div>
    </div>
  );
}
