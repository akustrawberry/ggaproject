import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import FaqAccordion from "@/components/FaqAccordion";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Soal Jawab",
  description: "Soalan lazim tentang Gastrik, GERD, Anxiety, pemakanan dan gaya hidup sihat.",
};

const TOPICS = [
  { key: "semua", label: "Semua" },
  { key: "gastrik", label: "Gastrik" },
  { key: "gerd", label: "GERD" },
  { key: "anxiety", label: "Anxiety" },
  { key: "pemakanan", label: "Pemakanan" },
  { key: "tidur", label: "Tidur & Gaya Hidup" },
];

export default async function FaqPage({
  searchParams,
}: {
  searchParams: Promise<{ topik?: string }>;
}) {
  const { topik } = await searchParams;
  const topic = topik && TOPICS.some((t) => t.key === topik) ? topik : "semua";

  const faqs = await prisma.faq.findMany({
    where: {
      published: true,
      ...(topic !== "semua" ? { topic } : {}),
    },
    orderBy: [{ topic: "asc" }, { order: "asc" }],
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-ink-800 sm:text-4xl">Soal Jawab</h1>
      <p className="mt-3 text-ink-500">
        Jawapan ringkas untuk soalan lazim. Untuk maklumat terperinci, lihat artikel berkaitan.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {TOPICS.map((t) => (
          <a
            key={t.key}
            href={t.key === "semua" ? "/soal-jawab" : `/soal-jawab?topik=${t.key}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${topic === t.key ? "bg-sage-600 text-white" : "bg-sage-50 text-sage-700 hover:bg-sage-100"}`}
          >
            {t.label}
          </a>
        ))}
      </div>

      <div className="mt-8">
        {faqs.length === 0 ? (
          <p className="text-ink-500">Tiada soalan untuk topik ini lagi.</p>
        ) : (
          <FaqAccordion items={faqs} />
        )}
      </div>

      <p className="mt-10 rounded-xl border border-cream-200 bg-cream-50 p-4 text-sm text-ink-500">
        <strong>Ingat:</strong> Jawapan di sini adalah umum. Setiap individu berbeza — jika
        simptom berterusan atau membimbangkan, sila berjumpa doktor.
      </p>
    </div>
  );
}
