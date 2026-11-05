import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dasar Privasi",
  description: "Dasar privasi Legakan — bagaimana kami mengendalikan data anda.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-ink-800">Dasar Privasi</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-600">
        <p>Kemas kini terakhir: November 2026</p>
        <h2 className="pt-2 text-lg font-bold text-ink-800">1. Data yang Kami Kumpulkan</h2>
        <ul className="list-disc space-y-1 pl-6">
          <li><strong>Alamat e-mel</strong> — hanya jika anda melanggan buletin.</li>
          <li><strong>Data alatan wellness</strong> (diari makanan, senarai semak) — disimpan secara setempat dalam pelayar anda dan <em>tidak</em> dihantar ke pelayan kami.</li>
          <li><strong>Data teknikal asas</strong> — log pelayan standard (alamat IP, pelayar) untuk keselamatan dan analitik.</li>
        </ul>
        <h2 className="pt-2 text-lg font-bold text-ink-800">2. Cara Kami Menggunakan Data</h2>
        <ul className="list-disc space-y-1 pl-6">
          <li>Menghantar buletin kesihatan yang anda langgan.</li>
          <li>Memperbaiki dan melindungi website.</li>
        </ul>
        <h2 className="pt-2 text-lg font-bold text-ink-800">3. Perkongsian Data</h2>
        <p>Kami tidak menjual atau berkongsi data peribadi anda dengan pihak ketiga untuk tujuan pemasaran.</p>
        <h2 className="pt-2 text-lg font-bold text-ink-800">4. Hak Anda</h2>
        <p>
          Anda boleh menarik diri daripada buletin pada bila-bila masa melalui pautan nyahlanggan
          dalam setiap e-mel, atau dengan menghubungi kami.
        </p>
        <h2 className="pt-2 text-lg font-bold text-ink-800">5. Keselamatan</h2>
        <p>
          Kami melaksanakan langkah keselamatan standard untuk melindungi data. Walau bagaimanapun,
          tiada sistem yang 100% selamat — sila ambil langkah sendiri untuk melindungi kata laluan anda.
        </p>
      </div>
    </div>
  );
}
