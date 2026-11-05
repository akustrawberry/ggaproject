import type { Metadata } from "next";
import { MEDICAL_DISCLAIMER, EMERGENCY_NOTICE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Legakan — platform pendidikan kesihatan Bahasa Melayu untuk Gastrik, GERD dan Anxiety.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-ink-800 sm:text-4xl">Tentang Legakan</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-ink-600">
        <p>
          <strong>Legakan</strong> ialah platform pendidikan kesihatan dalam Bahasa Melayu yang
          dibangunkan untuk membantu masyarakat Malaysia memahami dan mengurus Gastrik, GERD
          (Gastroesophageal Reflux Disease) dan Anxiety dengan lebih baik.
        </p>
        <p>
          Nama “Legakan” membawa maksud kelegaan — harapan kami bahawa setiap artikel, tips dan
          alat di sini dapat memberi sedikit kelegaan kepada anda yang sedang menghadapi
          cabaran kesihatan ini.
        </p>
        <h2 className="pt-4 text-xl font-bold text-ink-800">Apa Yang Kami Tawarkan</h2>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>Artikel pendidikan berasaskan sumber perubatan yang bereputasi (WHO, NHS, Mayo Clinic).</li>
          <li>Tips pemakanan dan gaya hidup yang praktikal.</li>
          <li>Alat wellness interaktif: latihan pernafasan, diari makanan dan senarai semak harian.</li>
          <li>Soal jawab lazim tentang Gastrik, GERD dan Anxiety.</li>
        </ul>
        <h2 className="pt-4 text-xl font-bold text-ink-800">Falsafah Kami</h2>
        <ul className="list-disc space-y-1.5 pl-6">
          <li><strong>Bukan diagnosis.</strong> Kami tidak mendiagnosis atau merawat penyakit.</li>
          <li><strong>Bukan pengganti doktor.</strong> Sentiasa rujuk profesional kesihatan untuk keputusan perubatan.</li>
          <li><strong>Telus.</strong> Kami bezakan bukti perubatan dengan pengalaman peribadi dan ubat tradisional.</li>
          <li><strong>Mesra anxiety.</strong> Reka bentuk dan nada kami mesra untuk mereka yang mudah tertekan.</li>
        </ul>
        <div className="mt-6 rounded-xl border border-sage-200 bg-sage-50 p-4">
          <p className="text-sm font-semibold text-sage-800">Penafian Perubatan</p>
          <p className="mt-1 text-sm text-ink-600">{MEDICAL_DISCLAIMER}</p>
        </div>
        <div className="rounded-xl border border-red-100 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-800">Situasi Kecemasan</p>
          <p className="mt-1 text-sm text-ink-600">{EMERGENCY_NOTICE}</p>
        </div>
      </div>
    </div>
  );
}
