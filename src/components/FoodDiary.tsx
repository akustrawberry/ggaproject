"use client";

import { useEffect, useState } from "react";

type Entry = {
  id: string;
  food: string;
  mealTime: string;
  symptoms: string;
  severity: number;
  notes: string;
  createdAt: string;
};

const SYMPTOMS = ["Pedih ulu hati", "Peningkatan asid", "Kembung", "Mual", "Sakit perut", "Sakit dada", "Tiada simptom"];
const MEAL_TIMES = ["Sarapan", "Makanan ringan (pagi)", "Makan tengah hari", "Makanan ringan (petang)", "Makan malam", "Snek malam"];

export default function FoodDiary() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState({ food: "", mealTime: MEAL_TIMES[0], symptoms: "", severity: 3, notes: "" });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("legakan_diary");
      if (raw) setEntries(JSON.parse(raw));
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  function save(list: Entry[]) {
    setEntries(list);
    localStorage.setItem("legakan_diary", JSON.stringify(list));
  }

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!form.food.trim()) return;
    const entry: Entry = { ...form, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    save([entry, ...entries].slice(0, 200));
    setForm({ food: "", mealTime: MEAL_TIMES[0], symptoms: "", severity: 3, notes: "" });
  }

  function remove(id: string) {
    save(entries.filter((x) => x.id !== id));
  }

  function clearAll() {
    if (confirm("Padam semua rekod diari? Tindakan ini tidak boleh dibatalkan.")) {
      save([]);
    }
  }

  if (!loaded) return <p className="text-sm text-ink-400">Memuatkan…</p>;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={add} className="space-y-4 rounded-2xl border border-sage-100 bg-white p-6">
        <h2 className="text-lg font-bold text-ink-800">Rekod Baharu</h2>
        <div>
          <label className="text-sm font-medium text-ink-600">Makanan / Minuman</label>
          <input
            required
            value={form.food}
            onChange={(e) => setForm({ ...form, food: e.target.value })}
            placeholder="Contoh: Nasi lemak, kopi, pedas…"
            className="mt-1 w-full rounded-lg border border-sage-200 px-3 py-2 text-sm focus:border-sage-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink-600">Waktu Makan</label>
          <select
            value={form.mealTime}
            onChange={(e) => setForm({ ...form, mealTime: e.target.value })}
            className="mt-1 w-full rounded-lg border border-sage-200 bg-white px-3 py-2 text-sm"
          >
            {MEAL_TIMES.map((m) => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-ink-600">Simptom (jika ada)</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {SYMPTOMS.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setForm({ ...form, symptoms: form.symptoms === s ? "" : s })}
                className={`rounded-full px-3 py-1 text-xs font-medium ${form.symptoms === s ? "bg-sage-600 text-white" : "bg-sage-50 text-sage-700 hover:bg-sage-100"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-ink-600">
            Keterukan simptom: <strong>{form.severity}/10</strong>
          </label>
          <input
            type="range" min={0} max={10} value={form.severity}
            onChange={(e) => setForm({ ...form, severity: parseInt(e.target.value, 10) })}
            className="mt-2 w-full accent-sage-600"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink-600">Catatan</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={2}
            placeholder="Perkara lain yang mungkin relevan…"
            className="mt-1 w-full rounded-lg border border-sage-200 px-3 py-2 text-sm focus:border-sage-400 focus:outline-none"
          />
        </div>
        <button className="w-full rounded-xl bg-sage-600 py-2.5 font-semibold text-white hover:bg-sage-700">
          Simpan Rekod
        </button>
      </form>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink-800">Rekod Anda ({entries.length})</h2>
          {entries.length > 0 && (
            <button onClick={clearAll} className="text-xs text-red-500 hover:underline">Padam semua</button>
          )}
        </div>
        <div className="mt-4 max-h-[32rem] space-y-3 overflow-y-auto pr-1">
          {entries.length === 0 && (
            <p className="rounded-xl border border-dashed border-sage-200 p-6 text-center text-sm text-ink-400">
              Belum ada rekod. Mula catat makanan pertama anda!
            </p>
          )}
          {entries.map((en) => (
            <div key={en.id} className="rounded-xl border border-sage-100 bg-white p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-ink-800">{en.food}</p>
                  <p className="text-xs text-ink-400">
                    {en.mealTime} • {new Date(en.createdAt).toLocaleString("ms-MY", { dateStyle: "medium", timeStyle: "short" })}
                  </p>
                </div>
                <button onClick={() => remove(en.id)} className="text-xs text-red-400 hover:text-red-600" aria-label="Padam">✕</button>
              </div>
              {en.symptoms && (
                <p className="mt-2 text-sm text-ink-600">
                  Simptom: {en.symptoms} <span className="text-ink-400">(keterukan {en.severity}/10)</span>
                </p>
              )}
              {en.notes && <p className="mt-1 text-sm text-ink-500">{en.notes}</p>}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-400">
          Data diari ini disimpan secara peribadi dalam pelayar anda sahaja — tidak dihantar ke mana-mana pelayan.
        </p>
      </div>
    </div>
  );
}
