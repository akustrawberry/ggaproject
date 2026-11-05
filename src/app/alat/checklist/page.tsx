import type { Metadata } from "next";
import WellnessChecklist from "@/components/WellnessChecklist";

export const metadata: Metadata = {
  title: "Senarai Semak Harian",
  description: "Jejak tabiat penjagaan diri harian: air, makanan, tidur, relaksasi dan aktiviti.",
};

export default function ChecklistPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-ink-800">Senarai Semak Harian</h1>
      <p className="mt-3 text-ink-500">
        Penjagaan diri yang konsisten lebih berkesan daripada perubahan besar sekali gus.
        Tandakan perkara yang telah anda lakukan hari ini.
      </p>
      <div className="mt-8">
        <WellnessChecklist />
      </div>
    </div>
  );
}
