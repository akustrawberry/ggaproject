import type { Metadata } from "next";
import FoodDiary from "@/components/FoodDiary";

export const metadata: Metadata = {
  title: "Diari Makanan & Simptom",
  description: "Rekod makanan dan simptom untuk mengenal pasti pencetus gastrik dan GERD.",
};

export default function FoodDiaryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-ink-800">Diari Makanan & Simptom</h1>
      <p className="mt-3 max-w-2xl text-ink-500">
        Pencetus gastrik dan GERD berbeza antara individu. Dengan merekod makanan dan simptom,
        anda boleh mengenal pasti corak — tetapi ingat, ini bukan alat diagnosis.
      </p>
      <div className="mt-8">
        <FoodDiary />
      </div>
    </div>
  );
}
