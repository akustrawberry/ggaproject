import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description: "Hubungi pasukan Legakan untuk pertanyaan, kerjasama atau maklum balas.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-ink-800">Hubungi Kami</h1>
      <p className="mt-3 text-ink-500">
        Kami ingin mendengar daripada anda — cadangan artikel, soalan umum, atau kerjasama.
      </p>
      <div className="mt-8 rounded-2xl border border-sage-100 bg-white p-6">
        <h2 className="font-semibold text-ink-800">E-mel</h2>
        <a href="mailto:hello@legakan.my" className="mt-1 block text-sage-700 hover:underline">
          hello@legakan.my
        </a>
        <h2 className="mt-6 font-semibold text-ink-800">Perkhidmatan Sosial</h2>
        <div className="mt-2 flex gap-3">
          <a href="#" className="rounded-full bg-sage-100 px-4 py-1.5 text-sm text-sage-700 hover:bg-sage-200">Facebook</a>
          <a href="#" className="rounded-full bg-sky-100 px-4 py-1.5 text-sm text-sky-700 hover:bg-sky-200">Instagram</a>
          <a href="#" className="rounded-full bg-ink-100 px-4 py-1.5 text-sm text-ink-700 hover:bg-ink-200">TikTok</a>
        </div>
      </div>
      <div className="mt-6 rounded-xl border border-cream-200 bg-cream-50 p-4 text-sm text-ink-600">
        <strong>Nota penting:</strong> Kami tidak dapat memberikan nasihat perubatan peribadi melalui
        e-mel atau media sosial. Untuk kebimbangan kesihatan, sila berjumpa doktor atau hubungi
        Talian Kasih 15999.
      </div>
    </div>
  );
}
