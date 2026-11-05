"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "inhale" | "hold" | "exhale" | "holdOut" | "done";

const PHASES: { key: Phase; label: string; ms: number }[] = [
  { key: "inhale", label: "Tarik nafas…", ms: 4000 },
  { key: "hold", label: "Tahan nafas…", ms: 7000 },
  { key: "exhale", label: "Hembus nafas…", ms: 8000 },
  { key: "holdOut", label: "Tahan nafas…", ms: 0 }, // optional pause
];

export default function BreathingExercise() {
  const [cycles, setCycles] = useState(4);
  const [phase, setPhase] = useState<Phase>("idle");
  const [cycle, setCycle] = useState(0);
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clear() {
    if (timer.current) clearTimeout(timer.current);
  }

  function stop() {
    clear();
    setRunning(false);
    setPhase("idle");
  }

  function step(idx: number, cyc: number) {
    if (cyc >= cycles) {
      setPhase("done");
      setRunning(false);
      return;
    }
    const p = PHASES[idx];
    setPhase(p.key);
    timer.current = setTimeout(() => {
      const nextIdx = idx + 1;
      if (nextIdx >= PHASES.length || p.key === "exhale") {
        step(0, cyc + 1);
      } else {
        step(nextIdx, cyc);
      }
    }, p.ms);
  }

  function start() {
    clear();
    setCycle(0);
    setRunning(true);
    setPhase("inhale");
    timer.current = setTimeout(() => step(1, 0), PHASES[0].ms);
  }

  useEffect(() => () => clear(), []);

  const scale = phase === "inhale" || phase === "hold" ? "scale-100" : phase === "exhale" || phase === "holdOut" ? "scale-[0.6]" : "scale-[0.75]";
  const anim = phase === "inhale" || phase === "hold" ? "animate-breathe-in" : phase === "exhale" || phase === "holdOut" ? "animate-breathe-out" : "";
  const label =
    phase === "idle" ? "Bersedia? Tekan Mula untuk bermula." :
    phase === "done" ? "Selesai. Ambil masa seketika sebelum kembali ke aktiviti anda." :
    PHASES.find((p) => p.key === phase)?.label ?? "";

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-64 w-64 items-center justify-center">
        <div className={`absolute inset-0 rounded-full bg-sage-200 transition-transform duration-1000 ease-in-out ${scale}`} />
        <div className={`absolute inset-6 rounded-full bg-sage-300 transition-transform duration-1000 ease-in-out ${scale}`} />
        <div className={`absolute inset-12 flex items-center justify-center rounded-full bg-sage-400 text-white shadow-lg transition-transform duration-1000 ease-in-out ${scale} ${anim}`}>
          <span className="px-6 text-center text-sm font-semibold">
            {phase === "idle" ? "🌬️" : label}
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm text-ink-500" aria-live="polite">
        {running ? `Kitaran ${Math.min(cycle + 1, cycles)} / ${cycles}` : label}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {!running && phase !== "done" && (
          <button onClick={start} className="rounded-full bg-sage-600 px-6 py-2.5 font-semibold text-white hover:bg-sage-700">
            Mula
          </button>
        )}
        {running && (
          <button onClick={stop} className="rounded-full bg-ink-200 px-6 py-2.5 font-semibold text-ink-700 hover:bg-ink-300">
            Jeda / Berhenti
          </button>
        )}
        {(running || phase === "done") && (
          <button onClick={start} className="rounded-full border border-sage-300 px-6 py-2.5 font-semibold text-sage-700 hover:bg-sage-50">
            {phase === "done" ? "Ulang" : "Mula Semula"}
          </button>
        )}
      </div>

      <div className="mt-6 flex items-center gap-3 text-sm text-ink-500">
        <label htmlFor="cycles">Bilangan kitaran:</label>
        <select
          id="cycles"
          value={cycles}
          onChange={(e) => setCycles(parseInt(e.target.value, 10))}
          className="rounded-lg border border-sage-200 bg-white px-3 py-1.5"
        >
          {[2, 4, 6, 8].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <p className="mt-6 max-w-md text-center text-xs text-ink-400">
        Teknik 4-7-8: tarik nafas 4 saat, tahan 7 saat, hembus perlahan 8 saat.
        Jika berasa pening, berhenti dan bernafas secara normal.
      </p>
    </div>
  );
}
