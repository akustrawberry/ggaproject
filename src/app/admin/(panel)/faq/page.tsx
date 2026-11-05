import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { saveFaq, deleteFaq } from "../../actions";
import ConfirmSubmit from "@/components/ConfirmSubmit";

export const metadata: Metadata = { title: "Urus Soal Jawab" };

const TOPICS = [
  ["gastrik", "Gastrik"],
  ["gerd", "GERD"],
  ["anxiety", "Anxiety"],
  ["pemakanan", "Pemakanan"],
  ["tidur", "Tidur & Gaya Hidup"],
  ["umum", "Umum"],
] as const;

export default async function AdminFaqPage() {
  const faqs = await prisma.faq.findMany({ orderBy: [{ topic: "asc" }, { order: "asc" }] });
  const input = "mt-1 w-full rounded-lg border border-sage-200 px-3 py-2 text-sm focus:border-sage-400 focus:outline-none";
  const label = "text-sm font-medium text-ink-600";

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-800">Soal Jawab</h1>
      <p className="mt-1 text-sm text-ink-500">{faqs.length} soalan — dipaparkan di halaman /soal-jawab</p>

      <div className="mt-6 space-y-4">
        {faqs.map((f) => (
          <details key={f.id} className="rounded-2xl border border-sage-100 bg-white p-5">
            <summary className="cursor-pointer font-medium text-ink-800">
              {f.question}
              <span className="ml-2 rounded-full bg-sage-50 px-2 py-0.5 text-xs text-sage-700">{TOPICS.find(([k]) => k === f.topic)?.[1] ?? f.topic}</span>
              {!f.published && <span className="ml-2 rounded-full bg-ink-100 px-2 py-0.5 text-xs text-ink-500">Tersembunyi</span>}
            </summary>
            <form action={saveFaq} className="mt-4 space-y-3 border-t border-sage-50 pt-4">
              <input type="hidden" name="id" value={f.id} />
              <div>
                <label className={label}>Soalan</label>
                <input name="question" required defaultValue={f.question} className={input} />
              </div>
              <div>
                <label className={label}>Jawapan</label>
                <textarea name="answer" required rows={3} defaultValue={f.answer} className={input} />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div>
                  <label className={label}>Topik</label>
                  <select name="topic" defaultValue={f.topic} className={input}>
                    {TOPICS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className={label}>Susunan</label>
                  <input name="order" type="number" defaultValue={f.order} className={input} />
                </div>
                <label className="mt-6 flex items-center gap-2 text-sm text-ink-600">
                  <input type="checkbox" name="published" defaultChecked={f.published} className="accent-sage-600" />
                  Terbit
                </label>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-lg bg-sage-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sage-700">Simpan</button>
                <ConfirmSubmit
                  action={deleteFaq.bind(null, f.id)}
                  message={`Padam soalan ini?`}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Padam
                </ConfirmSubmit>
              </div>
            </form>
          </details>
        ))}
      </div>

      <form action={saveFaq} className="mt-8 rounded-2xl border border-sage-100 bg-white p-5">
        <h2 className="font-bold text-ink-800">Tambah Soalan Baharu</h2>
        <div className="mt-4 space-y-3">
          <div>
            <label className={label}>Soalan</label>
            <input name="question" required className={input} />
          </div>
          <div>
            <label className={label}>Jawapan</label>
            <textarea name="answer" required rows={3} className={input} />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div>
              <label className={label}>Topik</label>
              <select name="topic" className={input}>
                {TOPICS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>Susunan</label>
              <input name="order" type="number" defaultValue={0} className={input} />
            </div>
            <label className="mt-6 flex items-center gap-2 text-sm text-ink-600">
              <input type="checkbox" name="published" defaultChecked className="accent-sage-600" />
              Terbit
            </label>
          </div>
        </div>
        <button className="mt-4 rounded-xl bg-sage-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-700">
          Tambah Soalan
        </button>
      </form>
    </div>
  );
}
