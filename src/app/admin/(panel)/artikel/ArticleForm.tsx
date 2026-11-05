import { prisma } from "@/lib/prisma";
import { createArticle, updateArticle } from "../../actions";

type Article = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  imageUrl: string | null;
  categoryId: string | null;
  status: string;
  seoTitle: string | null;
  seoDescription: string | null;
  authorName: string;
  tags: { tagId: string }[];
};

export default async function ArticleForm({ article }: { article?: Article }) {
  const [categories, tags] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
  ]);
  const action = article?.id
    ? updateArticle.bind(null, article.id)
    : createArticle;
  const selectedTags = new Set(article?.tags.map((t) => t.tagId) ?? []);

  const input = "mt-1 w-full rounded-lg border border-sage-200 px-3 py-2 text-sm focus:border-sage-400 focus:outline-none";
  const label = "text-sm font-medium text-ink-600";

  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div>
            <label className={label}>Tajuk Artikel *</label>
            <input name="title" required defaultValue={article?.title} className={input} />
          </div>
          <div>
            <label className={label}>Slug (URL) — kosongkan untuk jana automatik</label>
            <input name="slug" defaultValue={article?.slug} placeholder="contoh: tips-gastrik" className={input} />
          </div>
          <div>
            <label className={label}>Ringkasan (excerpt)</label>
            <textarea name="excerpt" rows={2} defaultValue={article?.excerpt ?? ""} className={input} />
          </div>
          <div>
            <label className={label}>Kandungan (Markdown) *</label>
            <textarea
              name="content" required rows={18} defaultValue={article?.content}
              placeholder={"## Tajuk bahagian\n\nTulis kandungan di sini…\n\n- Senarai\n- Perkara"}
              className={`${input} font-mono text-xs`}
            />
            <p className="mt-1 text-xs text-ink-400">Sokong Markdown: ## heading, **bold**, - senarai, &gt; petikan, [pautan](url)</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className={label}>Kategori</label>
            <select name="categoryId" defaultValue={article?.categoryId ?? ""} className={input}>
              <option value="">— Tiada —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Status</label>
            <select name="status" defaultValue={article?.status ?? "DRAFT"} className={input}>
              <option value="DRAFT">Draf</option>
              <option value="PUBLISHED">Terbit</option>
            </select>
          </div>
          <div>
            <label className={label}>URL Gambar Ciri (pilihan)</label>
            <input name="imageUrl" type="url" defaultValue={article?.imageUrl ?? ""} placeholder="https://…" className={input} />
          </div>
          <div>
            <label className={label}>Nama Penulis</label>
            <input name="authorName" defaultValue={article?.authorName ?? "Pasukan Legakan"} className={input} />
          </div>
          <div>
            <label className={label}>SEO Tajuk</label>
            <input name="seoTitle" defaultValue={article?.seoTitle ?? ""} className={input} />
          </div>
          <div>
            <label className={label}>SEO Penerangan</label>
            <textarea name="seoDescription" rows={2} defaultValue={article?.seoDescription ?? ""} className={input} />
          </div>
          <div>
            <label className={label}>Tag</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((t) => (
                <label key={t.id} className="flex items-center gap-1.5 rounded-full bg-sage-50 px-3 py-1 text-xs text-sage-700">
                  <input
                    type="checkbox" name="tagIds" value={t.id}
                    defaultChecked={selectedTags.has(t.id)}
                    className="accent-sage-600"
                  />
                  {t.name}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-sage-100 pt-5">
        <button className="rounded-xl bg-sage-600 px-6 py-2.5 font-semibold text-white hover:bg-sage-700">
          {article?.id ? "Simpan Perubahan" : "Cipta Artikel"}
        </button>
        <a href="/admin/artikel" className="text-sm text-ink-500 hover:text-ink-700">Batal</a>
      </div>
    </form>
  );
}
