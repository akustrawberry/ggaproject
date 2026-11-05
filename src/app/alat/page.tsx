import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Alat Wellness",
  description: "Alat interaktif untuk penjagaan diri: latihan pernafasan, diari makanan dan senarai semak harian.",
};

const TOOLS = [
  {
    href: "/alat/pernafasan",
    emoji: "🌬️",
    title: "Latihan Pernafasan",
    desc: "Teknik pernafasan 4-7-8 yang tenang untuk membantu mengurus anxiety dan tekanan.",
  },
  {
    href: "/alat/diari-makanan",
    emoji: "📔",
    title: "Diari Makanan & Simptom",
    desc: "Rekod makanan dan simptom harian untuk mengenal pasti pencetus gastrik/GERD anda.",
  },
  {
    href: "/alat/checklist",
    emoji: "✅",
    title: "Senarai Semak Harian",
    desc: "Jejak tabiat penjagaan diri asas seperti air, tidur, relaksasi dan aktiviti fizikal.",
  },
];

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-ink-800 sm:text-4xl">Alat Wellness Interaktif</h1>
      <p className="mt-3 max-w-2xl text-ink-500">
        Alat mudah untuk membantu anda memahami badan dan emosi sendiri. Semua data peribadi
        disimpan dalam pelayar anda sahaja.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {TOOLS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="rounded-2xl border border-sage-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <span className="text-4xl">{t.emoji}</span>
            <h2 className="mt-4 text-xl font-bold text-ink-800">{t.title}</h2>
            <p className="mt-2 text-sm text-ink-500">{t.desc}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-sage-600">Gunakan alat →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
