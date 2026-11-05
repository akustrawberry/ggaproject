import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";

export const dynamic = "force-dynamic";

const CATEGORIES = [
  {
    slug: "gastrik",
    name: "Gastrik",
    desc: "Tips penjagaan perut, pemakanan yang sesuai, punca dan simptom, serta panduan gaya hidup.",
    emoji: "🫃",
    color: "bg-sage-100 text-sage-800 hover:bg-sage-200",
  },
  {
    slug: "gerd",
    name: "GERD",
    desc: "Tips mengurangkan refluks asid, makanan pencetus, posisi tidur dan panduan pemakanan.",
    emoji: "🌙",
    color: "bg-sky-100 text-sky-800 hover:bg-sky-200",
  },
  {
    slug: "anxiety",
    name: "Anxiety",
    desc: "Teknik pernafasan, pengurusan stres, teknik grounding dan panduan mengurus keresahan.",
    emoji: "🧘",
    color: "bg-cream-100 text-ink-800 hover:bg-cream-200",
  },
];

const TOOLS = [
  { href: "/alat/pernafasan", title: "Latihan Pernafasan", desc: "Teknik pernafasan 4-7-8 untuk menenangkan anxiety", emoji: "🌬️" },
  { href: "/alat/diari-makanan", title: "Diari Makanan", desc: "Rekod makanan dan simptom untuk kenal pasti pencetus", emoji: "📔" },
  { href: "/alat/checklist", title: "Senarai Semak Harian", desc: "Jejak tabiat penjagaan diri setiap hari", emoji: "✅" },
];

export default async function HomePage() {
  const [articles, categories] = await Promise.all([
    prisma.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 6,
      include: { category: true },
    }),
    prisma.category.findMany({ include: { _count: { select: { articles: true } } } }),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sage-50 via-cream-50 to-sky-50">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
          <p className="animate-fade-up text-sm font-semibold uppercase tracking-widest text-sage-600">
            Pendidikan Kesihatan • Bahasa Melayu
          </p>
          <h1 className="animate-fade-up mx-auto mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-sage-900 sm:text-5xl">
            Mulakan Langkah Kecil Ke Arah Kesihatan Yang Lebih Baik.
          </h1>
          <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg text-ink-500">
            Panduan, tips dan perkongsian untuk membantu anda memahami Gastrik, GERD dan
            Anxiety serta menjaga kesejahteraan diri.
          </p>
          <div className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/kategori/tips-kesihatan"
              className="rounded-full bg-sage-600 px-7 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-sage-700"
            >
              Terokai Tips Kesihatan
            </Link>
            <Link
              href="/artikel"
              className="rounded-full border border-sky-300 bg-white px-7 py-3 font-semibold text-sky-700 transition-colors hover:bg-sky-50"
            >
              Baca Artikel Terkini
            </Link>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sage-100 opacity-60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-sky-100 opacity-60 blur-3xl" />
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold text-ink-800">Terokai Mengikut Topik</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-ink-500">
          Setiap kategori mempunyai panduan praktikal yang mudah diikuti.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CATEGORIES.map((c) => {
            const count = categories.find((x) => x.slug === c.slug)?._count.articles ?? 0;
            return (
              <Link
                key={c.slug}
                href={`/kategori/${c.slug}`}
                className={`rounded-2xl p-6 transition-all hover:-translate-y-1 ${c.color}`}
              >
                <span className="text-4xl">{c.emoji}</span>
                <h3 className="mt-3 text-xl font-bold">{c.name}</h3>
                <p className="mt-2 text-sm opacity-80">{c.desc}</p>
                <p className="mt-4 text-sm font-semibold">{count} artikel →</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Latest articles */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-ink-800">Artikel Terkini</h2>
              <p className="mt-2 text-ink-500">Kandungan baharu untuk membantu perjalanan anda.</p>
            </div>
            <Link href="/artikel" className="hidden text-sm font-semibold text-sky-600 hover:text-sky-700 sm:block">
              Lihat semua →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a.id} {...a} category={a.category} />
            ))}
          </div>
          <Link href="/artikel" className="mt-8 block text-center text-sm font-semibold text-sky-600 hover:text-sky-700 sm:hidden">
            Lihat semua artikel →
          </Link>
        </div>
      </section>

      {/* Interactive tools */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold text-ink-800">Alat Wellness Interaktif</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-ink-500">
          Alat mudah yang boleh anda gunakan setiap hari — semua data kekal peribadi dalam pelayar anda.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="rounded-2xl border border-sage-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-3xl">{t.emoji}</span>
              <h3 className="mt-3 text-lg font-bold text-ink-800">{t.title}</h3>
              <p className="mt-1 text-sm text-ink-500">{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-sage-800 py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Dapatkan Tips Kesihatan Setiap Minggu</h2>
          <p className="mt-3 text-sage-100">
            Langgan buletin kami untuk menerima artikel dan tips kesihatan baharu terus ke e-mel anda.
          </p>
          <div className="mt-8 text-left">
            <NewsletterForm />
          </div>
          <p className="mt-4 text-xs text-sage-200">
            Kami menghormati privasi anda. Tiada spam — hanya kandungan yang bermanfaat.
          </p>
        </div>
      </section>
    </div>
  );
}
