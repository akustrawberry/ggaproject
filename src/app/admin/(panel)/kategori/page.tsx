import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { saveCategory, deleteCategory, saveTag, deleteTag } from "../../actions";
import ConfirmSubmit from "@/components/ConfirmSubmit";

export const metadata: Metadata = { title: "Kategori & Tag" };

export default async function AdminTaxonomyPage() {
  const [categories, tags] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { articles: true } } },
    }),
    prisma.tag.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { articles: true } } },
    }),
  ]);

  const input = "mt-1 w-full rounded-lg border border-sage-200 px-3 py-2 text-sm focus:border-sage-400 focus:outline-none";
  const inputFlat = "w-full rounded-lg border border-sage-200 px-3 py-2 text-sm focus:border-sage-400 focus:outline-none";
  const label = "text-sm font-medium text-ink-600";

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-800">Kategori & Tag</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Categories */}
        <div className="rounded-2xl border border-sage-100 bg-white p-5">
          <h2 className="font-bold text-ink-800">Kategori</h2>
          <ul className="mt-4 divide-y divide-sage-50">
            {categories.map((c) => (
              <li key={c.id} className="py-3">
                <form action={saveCategory} className="grid grid-cols-[1fr_auto] items-end gap-2">
                  <input type="hidden" name="id" value={c.id} />
                  <div>
                    <label className={label}>Nama</label>
                    <input name="name" defaultValue={c.name} required className={input} />
                  </div>
                  <div className="w-24">
                    <label className={label}>Slug</label>
                    <input name="slug" defaultValue={c.slug} className={input} />
                  </div>
                  <div className="col-span-2">
                    <label className={label}>Penerangan</label>
                    <input name="description" defaultValue={c.description ?? ""} className={input} />
                  </div>
                  <div className="col-span-2 flex items-center justify-between">
                    <span className="text-xs text-ink-400">{c._count.articles} artikel</span>
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg bg-sage-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-sage-700">Simpan</button>
                      <ConfirmSubmit
                        action={deleteCategory.bind(null, c.id)}
                        message={`Padam kategori "${c.name}"? Artikel dalamnya tidak akan dipadam.`}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        Padam
                      </ConfirmSubmit>
                    </div>
                  </div>
                </form>
              </li>
            ))}
          </ul>

          <form action={saveCategory} className="mt-4 border-t border-sage-100 pt-4">
            <h3 className="text-sm font-semibold text-ink-700">Tambah Kategori Baharu</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <input name="name" required placeholder="Nama kategori" className={inputFlat} />
              <input name="slug" placeholder="slug (auto)" className={inputFlat} />
            </div>
            <button className="mt-3 rounded-xl bg-sage-600 px-5 py-2 text-sm font-semibold text-white hover:bg-sage-700">
              Tambah Kategori
            </button>
          </form>
        </div>

        {/* Tags */}
        <div className="rounded-2xl border border-sage-100 bg-white p-5">
          <h2 className="font-bold text-ink-800">Tag</h2>
          <ul className="mt-4 divide-y divide-sage-50">
            {tags.map((t) => (
              <li key={t.id} className="flex items-center justify-between py-2.5">
                <span className="text-sm text-ink-700">
                  #{t.name} <span className="text-xs text-ink-400">({t._count.articles})</span>
                </span>
                <ConfirmSubmit
                  action={deleteTag.bind(null, t.id)}
                  message={`Padam tag "${t.name}"?`}
                  className="rounded-lg border border-red-200 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                >
                  Padam
                </ConfirmSubmit>
              </li>
            ))}
          </ul>

          <form action={saveTag} className="mt-4 border-t border-sage-100 pt-4">
            <h3 className="text-sm font-semibold text-ink-700">Tambah Tag Baharu</h3>
            <div className="mt-3 flex gap-2">
              <input name="name" required placeholder="Nama tag" className={inputFlat} />
              <button className="rounded-xl bg-sage-600 px-5 py-2 text-sm font-semibold text-white hover:bg-sage-700">Tambah</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
