export const SITE_NAME = "Legakan";
export const SITE_TAGLINE = "Panduan Gastrik, GERD & Anxiety";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const SITE_DESCRIPTION =
  "Panduan, tips dan perkongsian untuk membantu anda memahami Gastrik, GERD dan Anxiety serta menjaga kesejahteraan diri.";

export const MEDICAL_DISCLAIMER =
  "Maklumat di website ini disediakan untuk tujuan pendidikan dan perkongsian kesihatan sahaja. Ia bukan pengganti nasihat, diagnosis atau rawatan daripada doktor atau profesional kesihatan.";

export const EMERGENCY_NOTICE =
  "Jika anda mengalami sakit dada yang teruk, muntah darah, najis hitam, sukar menelan, sakit perut yang teruk dan berterusan, atau perasaan cemas yang melampau — sila dapatkan penilaian perubatan dengan segera. Hubungi Talian Kasih 15999 atau orang yang anda percayai jika anda mempunyai fikiran untuk mencederakan diri sendiri.";

export const NAV_LINKS = [
  { href: "/", label: "Utama" },
  { href: "/kategori/gastrik", label: "Gastrik" },
  { href: "/kategori/gerd", label: "GERD" },
  { href: "/kategori/anxiety", label: "Anxiety" },
  { href: "/kategori/tips-kesihatan", label: "Tips Kesihatan" },
  { href: "/artikel", label: "Artikel" },
  { href: "/alat", label: "Alat Wellness" },
  { href: "/soal-jawab", label: "Soal Jawab" },
  { href: "/tentang", label: "Tentang Kami" },
];

export const WELLNESS_CHECKLIST_ITEMS = [
  { key: "water", label: "Minum air yang mencukupi hari ini" },
  { key: "meals", label: "Makan secara teratur (tidak melebihi 3 jam tanpa makan)" },
  { key: "triggers", label: "Elakkan makanan pencetus yang telah dikenal pasti" },
  { key: "sleep", label: "Tidur yang mencukupi (7–9 jam)" },
  { key: "relax", label: "Amalkan teknik relaksasi (pernafasan, meditasi, atau zikir)" },
  { key: "activity", label: "Bersenam atau bergerak aktif secukupnya" },
] as const;
