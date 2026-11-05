"use client";

import { useEffect, useState } from "react";
import { WELLNESS_CHECKLIST_ITEMS } from "@/lib/constants";

const STORAGE_KEY = "legakan_checklist";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export default function WellnessChecklist() {
  const [date, setDate] = useState(todayKey());
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const all: Record<string, string[]> = JSON.parse(raw);
        const today = all[date] ?? [];
        setDone(Object.fromEntries(today.map((k) => [k, true])));
      }
    } catch { /* ignore */ }
    setLoaded(true);
  }, [date]);

  function toggle(key: string) {
    const next = { ...done, [key]: !done[key] };
    setDone(next);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const all: Record<string, string[]> = raw ? JSON.parse(raw) : {};
      all[date] = WELLNESS_CHECKLIST_ITEMS.filter((i) => next[i.key]).map((i) => i.key);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch { /* ignore */ }
  }

  const completed = WELLNESS_CHECKLIST_ITEMS.filter((i) => done[i.key]).length;
  const pct = Math.round((completed / WELLNESS_CHECKLIST_ITEMS.length) * 100);

  return (
    <div className="rounded-2xl border border-sage-100 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink-800">Senarai Semak Harian</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-lg border border-sage-200 px-3 py-1.5 text-sm"
        />
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-ink-500">
          <span>{completed} / {WELLNESS_CHECKLIST_ITEMS.length} selesai</span>
          <span>{pct}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-sage-100">
          <div className="h-full rounded-full bg-sage-500 transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <ul className="mt-5 space-y-2">
        {WELLNESS_CHECKLIST_ITEMS.map((item) => (
          <li key={item.key}>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-sage-50">
              <input
                type="checkbox"
                checked={!!done[item.key]}
                onChange={() => toggle(item.key)}
                disabled={!loaded}
                className="h-5 w-5 accent-sage-600"
              />
              <span className={`text-sm ${done[item.key] ? "text-ink-400 line-through" : "text-ink-700"}`}>
                {item.label}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <p className="mt-6 rounded-xl bg-cream-50 p-3 text-xs leading-relaxed text-ink-500">
        Ini ialah penjejak gaya hidup untuk kesedaran diri — <strong>bukan</strong> pelan rawatan
        perubatan. Ia tidak menggantikan nasihat doktor atau ubat-ubatan yang telah ditetapkan.
      </p>
    </div>
  );
}
