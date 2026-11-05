import Link from "next/link";
import { MEDICAL_DISCLAIMER, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-sage-100 bg-sage-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-500 text-base text-white">
              🌿
            </span>
            <span className="text-lg font-bold text-sage-800">{SITE_NAME}</span>
          </div>
          <p className="mt-3 text-sm text-ink-500">{SITE_TAGLINE}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-sage-800">Pautan</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-500">
            <li><Link className="hover:text-sage-700" href="/artikel">Semua Artikel</Link></li>
            <li><Link className="hover:text-sage-700" href="/soal-jawab">Soal Jawab</Link></li>
            <li><Link className="hover:text-sage-700" href="/alat">Alat Wellness</Link></li>
            <li><Link className="hover:text-sage-700" href="/tentang">Tentang Kami</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-sage-800">Kategori</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-500">
            <li><Link className="hover:text-sage-700" href="/kategori/gastrik">Gastrik</Link></li>
            <li><Link className="hover:text-sage-700" href="/kategori/gerd">GERD</Link></li>
            <li><Link className="hover:text-sage-700" href="/kategori/anxiety">Anxiety</Link></li>
            <li><Link className="hover:text-sage-700" href="/kategori/tips-kesihatan">Tips Kesihatan</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-sage-800">Undang-undang</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-500">
            <li><Link className="hover:text-sage-700" href="/privasi">Dasar Privasi</Link></li>
            <li><Link className="hover:text-sage-700" href="/terma">Terma &amp; Syarat</Link></li>
            <li><Link className="hover:text-sage-700" href="/hubungi">Hubungi Kami</Link></li>
            <li><Link className="hover:text-sage-700" href="/admin/login">Log Masuk Admin</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sage-100">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="text-xs leading-relaxed text-ink-400">{MEDICAL_DISCLAIMER}</p>
          <p className="mt-3 text-xs text-ink-400">
            © {new Date().getFullYear()} {SITE_NAME}. Hak cipta terpelihara. Dibina dengan penuh kasih sayang untuk komuniti Malaysia.
          </p>
        </div>
      </div>
    </footer>
  );
}
