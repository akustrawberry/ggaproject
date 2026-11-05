import type { Metadata } from "next";
import BreathingExercise from "@/components/BreathingExercise";

export const metadata: Metadata = {
  title: "Latihan Pernafasan",
  description: "Latihan pernafasan 4-7-8 untuk membantu menenangkan anxiety dan mengurus stres.",
};

export default function BreathingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-ink-800">Latihan Pernafasan</h1>
      <p className="mt-3 text-ink-500">
        Pernafasan perlahan dan mendalam boleh membantu menenangkan sistem saraf. Cuba teknik
        4-7-8: <strong>tarik nafas 4 saat → tahan 7 saat → hembus 8 saat</strong>.
      </p>
      <div className="mt-10 rounded-2xl border border-sage-100 bg-white p-8">
        <BreathingExercise />
      </div>
      <div className="mt-8 rounded-xl border border-cream-200 bg-cream-50 p-4 text-sm text-ink-600">
        <p className="font-semibold text-ink-700">Petua:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Bernafas melalui hidung semasa menarik nafas.</li>
          <li>Hembus perlahan melalui mulut seperti meniup lilin.</li>
          <li>Bersabar — pernafasan yang perlahan lebih berkesan daripada yang tergesa-gesa.</li>
          <li>Jika berasa pening atau tidak selesa, berhenti dan bernafas normal.</li>
        </ul>
      </div>
    </div>
  );
}
