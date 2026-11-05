import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terma & Syarat",
  description: "Terma dan syarat penggunaan website Legakan.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-ink-800">Terma & Syarat</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-600">
        <p>Kemas kini terakhir: November 2026</p>
        <h2 className="pt-2 text-lg font-bold text-ink-800">1. Penerimaan Terma</h2>
        <p>Dengan menggunakan website Legakan, anda bersetuju dengan terma dan syarat ini.</p>
        <h2 className="pt-2 text-lg font-bold text-ink-800">2. Bukan Nasihat Perubatan</h2>
        <p>
          Semua kandungan di website ini adalah untuk <strong>tujuan pendidikan sahaja</strong>.
          Ia bukan pengganti nasihat, diagnosis atau rawatan perubatan profesional. Sentiasa rujuk
          doktor untuk keputusan kesihatan anda.
        </p>
        <h2 className="pt-2 text-lg font-bold text-ink-800">3. Ketepatan Maklumat</h2>
        <p>
          Kami berusaha memastikan maklumat adalah tepat dan terkini, namun kami tidak menjamin
          kesempurnaan kandungan. Maklumat perubatan boleh berubah — sentiasa semak dengan sumber
          rasmi.
        </p>
        <h2 className="pt-2 text-lg font-bold text-ink-800">4. Harta Intelek</h2>
        <p>
          Kandungan Legakan adalah hak milik kami. Anda boleh berkongsi pautan dan memetik dengan
          kredit, tetapi tidak boleh menyalin semula untuk tujuan komersial tanpa kebenaran.
        </p>
        <h2 className="pt-2 text-lg font-bold text-ink-800">5. Tanggungjawab</h2>
        <p>
          Legakan tidak bertanggungjawab ke atas sebarang kerugian yang berpunca daripada
          penggunaan maklumat di website ini. Keputusan kesihatan adalah tanggungjawab anda
          bersama profesional kesihatan anda.
        </p>
        <h2 className="pt-2 text-lg font-bold text-ink-800">6. Perubahan Terma</h2>
        <p>Kami berhak mengemas kini terma ini dari semasa ke semasa. Terma terkini akan sentiasa
          dipaparkan di halaman ini.</p>
      </div>
    </div>
  );
}
