import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categories = [
  { name: "Gastrik", slug: "gastrik", description: "Tips penjagaan perut, pemakanan yang sesuai, punca dan simptom gastrik.", icon: "🫃" },
  { name: "GERD", slug: "gerd", description: "Panduan mengurangkan refluks asid, makanan pencetus dan posisi tidur.", icon: "🌙" },
  { name: "Anxiety", slug: "anxiety", description: "Teknik pernafasan, pengurusan stres dan teknik grounding.", icon: "🧘" },
  { name: "Pemakanan Sihat", slug: "pemakanan-sihat", description: "Panduan pemakanan untuk sistem penghadaman yang sihat.", icon: "🥗" },
  { name: "Gaya Hidup", slug: "gaya-hidup", description: "Tabiat harian yang menyokong kesihatan perut dan minda.", icon: "🚶" },
  { name: "Tips Kesihatan", slug: "tips-kesihatan", description: "Petua kesihatan am yang mudah diamalkan dalam kehidupan harian.", icon: "💡" },
];

const tags = [
  { name: "Gastrik", slug: "gastrik" },
  { name: "GERD", slug: "gerd" },
  { name: "Anxiety", slug: "anxiety" },
  { name: "Pemakanan", slug: "pemakanan" },
  { name: "Tidur", slug: "tidur" },
  { name: "Stres", slug: "stres" },
  { name: "Pernafasan", slug: "pernafasan" },
  { name: "Gaya Hidup", slug: "gaya-hidup" },
  { name: "Tips Kesihatan", slug: "tips-kesihatan" },
];

const articles = [
  {
    title: "Gastrik: Punca, Simptom dan Cara Menguruskannya",
    slug: "gastrik-punca-simptom-cara-mengurus",
    category: "gastrik",
    tags: ["Gastrik", "Pemakanan"],
    excerpt: "Gastrik (gastritis) ialah keradangan pada lapisan perut. Ketahui punca, simptom dan cara menguruskannya secara sihat.",
    readTime: 6,
    publishedAt: new Date("2026-10-28"),
    content: `Gastrik, atau dalam istilah perubatan *gastritis*, merujuk kepada keradangan pada lapisan mukosa perut. Keadaan ini boleh berlaku secara tiba-tiba (akut) atau berlarutan (kronik), dan selalunya menyebabkan rasa pedih, pedih ulu hati, atau ketidakselesaan di bahagian atas perut.

## Apakah Punca Gastrik?

Antara punca gastrik yang biasa termasuk:

- **Jangkitan Helicobacter pylori (H. pylori)** — bacteria yang boleh menjangkiti lapisan perut.
- **Penggunaan ubat NSAID** — seperti ibuprofen atau aspirin yang diambil kerap atau dalam dos tinggi.
- **Tekanan emosi dan stres** — boleh meningkatkan asid perut.
- **Alkohol, rokok dan kafein berlebihan.**
- **Makanan pedas, berlemak atau masam** yang mengiritasi perut.

## Simptom Lazim

- Pedih ulu hati atau rasa tidak selesa di perut
- Kembung dan rasa penuh
- Mual atau muntah
- Hilang selera makan
- Dalam kes teruk: muntah darah atau najis hitam

## Cara Menguruskannya

1. **Makan secara teratur** — jangan biarkan perut kosong terlalu lama.
2. **Elakkan pencetus** — catat makanan yang mencetuskan simptom.
3. **Kurangkan kafein, alkohol dan rokok.**
4. **Pengurusan stres** — teknik pernafasan dan relaksasi boleh membantu.
5. **Rujuk doktor** — terutamanya jika simptom berterusan lebih 2 minggu atau teruk.

> **Penting:** Jangan hentikan ubat yang telah ditetapkan doktor tanpa nasihat. Sesetengah ubat gastrik memerlukan masa untuk berkesan.

## Bila Perlu Berjumpa Doktor?

Sila dapatkan penilaian perubatan segera jika anda mengalami muntah darah, najis hitam dan melekit, sakit perut teruk yang berterusan, atau penurunan berat badan yang tidak dapat dijelaskan.

*Artikel ini adalah untuk pendidikan sahaja. Rujuk [NHS](https://www.nhs.uk/conditions/gastritis/) atau [Mayo Clinic](https://www.mayoclinic.org/diseases-conditions/gastritis/symptoms-causes/syc-20354909) untuk maklumat lanjut.*`,
  },
  {
    title: "GERD: Fahami Refluks Asid dan Cara Mengurangkannya",
    slug: "gerd-fahami-refluks-asid-cara-mengurangkan",
    category: "gerd",
    tags: ["GERD", "Pemakanan", "Tidur"],
    excerpt: "GERD berlaku apabila asid perut naik ke esofagus. Ketahui cara mengenali simptom dan mengurangkan episod refluks.",
    readTime: 7,
    publishedAt: new Date("2026-10-30"),
    content: `GERD (Gastroesophageal Reflux Disease) ialah keadaan di mana asid perut mengalir balik ke esofagus — tiub yang menghubungkan mulut ke perut. Apabila ini berlaku kerap, ia boleh menyebabkan kerengsaan dan kerosakan pada esofagus.

## Simptom GERD

- Pedih hati (heartburn) — rasa panas di dada
- Rasa masam atau pahit di mulaf
- Sukar menelan
- Batuk kronik atau serak
- Sakit tekak yang berulang

## Makanan Pencetus Biasa

Setiap individu berbeza, tetapi makanan berikut sering dikaitkan dengan refluks:

- Makanan berlemak dan digoreng
- Pedas dan berempah
- Coklat, pudina, kafein
- Alkohol dan minuman bergas
- Tomato dan produk berasaskan tomato
- Makanan masam (cuka, jeruk)

## Tips Mengurangkan Refluks

### Semasa Makan
- Makan dalam saiz hidangan kecil dan kerap.
- Makan perlahan-lahan dan kunyah dengan baik.
- Elakkan berbaring sejurus selepas makan — tunggu sekur least 2–3 jam.

### Posisi Tidur
- Tidur dengan bahagian atas badan sedikit terangkat (guna kusyen atau ganjal).
- Tidur mengiring ke kiri — ini membantu esofagus berada di atas paras asid perut.

### Gaya Hidup
- Berhenti merokok.
- Kurangkan berat badan jika berlebihan.
- Pakai pakaian yang longgar di sekitar perut.
- Uruskan stres — anxiety boleh memburukkan refluks.

## Bila Perlu Berjumpa Doktor?

Jika pedih hati berlaku kerap (lebih 2 kali seminggu), sukar menelan, atau anda mengalami muntah darah — jangan berlengah. Sakit dada yang teruk tidak semestinya GERD; ia juga boleh menjadi tanda masalah jantung.

*Rujuk [Mayo Clinic](https://www.mayoclinic.org/diseases-conditions/gerd/symptoms-causes/syc-20361940) atau [NHS](https://www.nhs.uk/conditions/heartburn-and-acid-reflux/) untuk maklumat lanjut.*`,
  },
  {
    title: "Anxiety: Punca, Simptom dan Teknik Menenangkan Diri",
    slug: "anxiety-punca-simptom-teknik-menenangkan",
    category: "anxiety",
    tags: ["Anxiety", "Stres", "Pernafasan"],
    excerpt: "Anxiety atau kebimbangan berlebihan boleh menjejaskan kesihatan fizikal. Ketahui teknik mudah untuk menenangkan diri.",
    readTime: 6,
    publishedAt: new Date("2026-11-01"),
    content: `Anxiety (kebimbangan) ialah respons semula jadi badan terhadap tekanan. Namun apabila ia menjadi melampau, berterusan atau mengganggu kehidupan harian, ia mungkin menunjukkan gangguan kebimbangan yang memerlukan perhatian.

## Simptom Anxiety

**Fizikal:**
- Jantung berdegup laju
- Peluhat berlebihan
- Sesak nafas atau rasa tercekik
- Sakit perut, mual atau cirit-birit
- Insomnia atau sukar tidur
- Ketegangan otot

**Mental:**
- Fikiran yang tidak dapat dihentikan
- Rasa takut atau panik tanpa sebab jelas
- Sukar menumpukan perhatian
- Rasa tidak tenang atau "on edge"

## Teknik Menenangkan Diri yang Berkesan

### 1. Pernafasan Perut (Diaphragmatic Breathing)
Tarik nafas perlahan melalui hidung selama 4 saat, tahan 2 saat, hembus melalui mulut selama 6 saat. Ulangi 5–10 kali.

### 2. Teknik 5-4-3-2-1 (Grounding)
Namakan:
- **5** benda yang anda nampak
- **4** benda yang boleh anda sentuh
- **3** bunyi yang anda dengar
- **2** bau yang anda hidu
- **1** rasa yang anda rasa

### 3. Senaman Ringan
Berjalan 20–30 minit boleh mengurangkan hormon stres dan meningkatkan endorfin.

### 4. Hadkan Kafein & Alkohol
Kedua-duanya boleh memburukkan gejala anxiety.

## Hubungan Anxiety dan Gastrik/GERD

Anxiety dan masalah penghadaman sering berlaku bersama — dipanggil "gut-brain axis". Stres boleh meningkatkan asid perut dan memperlahankan penghadaman. Mengurus anxiety boleh membantu gejala gastrik.

## Bila Perlu Mendapat Bantuan?

Jika anxiety mengganggu kerja, perhubungan atau tidur anda selama berminggu-minggu, atau anda mempunyai fikiran untuk mencederakan diri — **sila berjumpa profesional kesihatan mental dengan segera**. Di Malaysia, anda boleh menghubungi Talian Kasih 15999 atau mana-mana hospital kerajaan.

*Rujuk [WHO](https://www.who.int/news-room/fact-sheets/detail/mental-disorders) atau [NHS](https://www.nhs.uk/mental-health/conditions/generalised-anxiety-disorder/) untuk maklumat lanjut.*`,
  },
  {
    title: "Makanan untuk Gastrik dan GERD: Panduan Pemakanan Sihat",
    slug: "makanan-untuk-gastrik-dan-gerd-panduan",
    category: "pemakanan-sihat",
    tags: ["Pemakanan", "Gastrik", "GERD"],
    excerpt: "Panduan makanan yang biasanya sesuai untuk gastrik dan GERD — serta yang perlu dihadkan.",
    readTime: 6,
    publishedAt: new Date("2026-11-02"),
    content: `Tiada satu diet universal untuk gastrik dan GERD — setiap individu bertindak balas berbeza terhadap makanan. Namun prinsip umum berikut boleh membantu kebanyakan orang.

## Makanan yang Biasanya Sesuai

- **Bijirin penuh** — oat, nasi merah, roti gandum (perlahan-lahan perkenalkan).
- **Sayur-sayuran** — yang dimasak lembut (jangan terlalu pedas atau masam).
- **Protein tanpa lemak** — ayam tanpa kulit, ikan, telur.
- **Pisang masak** — lembut dan mudah dihadam.
- **Yogurt tanpa gula** — mengandungi probiotik.

## Makanan yang Perlu Dihadkan

- **Pedas dan berempah** — cili, lada, kari pekat.
- **Berminyak dan digoreng** — kentang goreng, ayam goreng.
- **Bermasam** — tomato, limau nipis berlebihan, cuka.
- **Berkafein** — kopi, teh pekat, minuman tenaga.
- **Beralkohol** — wain, bir, spirits.
- **Coklat dan pudina** — diketahui mencetuskan refluks.

## Corak Makan yang Disyorkan

1. **Makan kecil dan kerap** — 5–6 hidangan kecil sehari.
2. **Makan perlahan** — kunyah 20–30 kali setiap suapan.
3. **Jangan makan sebelum tidur** — beri jarak sekur least 2–3 jam.
4. **Minum air secukupnya** — tetapi tidak berlebihan semasa makan.
5. **Catat makanan** — gunakan diari untuk kenal pasti pencetus peribadi anda.

## Contoh Hidangan Harian

| Waktu | Contoh |
|-------|--------|
| Sarapan | Oat dengan susu, pisang |
| Snek pagi | Yogurt tanpa gula |
| Makan tengah hari | Nasi + ikan kukus + sayur lembut |
| Snek petang | Roti gandum + telur rebus |
| Makan malam | Sup ayam atau ikan, sayur, sedikit nasi |

> **Penting:** Ini adalah panduan umum, bukan preskripsi perubatan. Jika anda mempunyai keadaan kesihatan lain (kencing manis, penyakit buah pinggang), rujuk doktor atau dietitian bertauliah untuk pelan pemakanan peribadi.

*Sumber: [NHS](https://www.nhs.uk/conditions/heartburn-and-acid-reflux/), [Mayo Clinic](https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/dietary-fiber/art-20045643).*`,
  },
  {
    title: "Gaya Hidup Sihat untuk Pesakit Gastrik dan GERD",
    slug: "gaya-hidup-sihat-untuk-gastrik-dan-gerd",
    category: "gaya-hidup",
    tags: ["Gaya Hidup", "Tidur", "Stres"],
    excerpt: "Perubahan gaya hidup kecil boleh memberi kesan besar kepada kesihatan perut dan kualiti hidup.",
    readTime: 6,
    publishedAt: new Date("2026-11-03"),
    content: `Selain pemakanan, gaya hidup harian anda memainkan peranan besar dalam mengurus gastrik dan GERD. Berikut adalah perubahan yang boleh anda cuba.

## Tidur yang Betul

- **Tidur 7–9 jam** setiap malam.
- **Tidur mengiring ke kiri** — membantu mengurangkan refluks.
- **Angkat bahagian atas katil** — letakkan kusyen atau ganjal di bawah tilam bahagian kepala.
- **Elakkan makan 2–3 jam sebelum tidur.**

## Pengurusan Berat Badan

Berat badan berlebihan meningkatkan tekanan pada perut, memaksa asid naik ke esofagus. Walaupun penurunan berat badan yang sederhana pun boleh membantu mengurangkan simptom GERD.

## Berhenti Merokok

Merokok melemahkan otot sfinkter esofagus dan meningkatkan pengeluaran asid. Ini adalah salah satu perubahan paling berkesan untuk GERD.

## Pengurusan Stres

Stres kronik boleh:
- Meningkatkan pengeluaran asid perut
- Memperlahankan penghadaman
- Memburukkan anxiety

**Cuba:**
- Meditasi atau zikir 10 minit sehari
- Yoga ringan
- Teknik pernafasan dalam
- Aktiviti yang anda nikmati (berkebun, melukis, mendengar muzik)

## Aktiviti Fizikal

Senaman sederhana seperti berjalan pantas 30 minit sehari boleh:
- Mengurangkan stres
- Membantu penghadaman
- Mengawal berat badan

**Elakkan** senaman berat sejurus selepas makan — beri masa 1–2 jam.

## Pakaian

Pakai pakaian yang longgar di sekitar perut — seluar atau skirt yang ketat boleh menekan perut dan memaksa asid naik.

## Kesimpulan

Perubahan kecil yang konsisten lebih berkesan daripada perubahan besar yang tidak dapat dikekalkan. Mula dengan satu atau dua perkara — contohnya tidur lebih awal atau berjalan 15 minit sehari — dan tambah secara beransur-ansur.

*Rujuk [NHS](https://www.nhs.uk/live-well/eat-well/) atau [WHO](https://www.who.int/news-room/fact-sheets/detail/physical-activity) untuk maklumat lanjut.*`,
  },
  {
    title: "10 Tips Kesihatan Perut yang Mudah Diamalkan",
    slug: "10-tips-kesihatan-perut-mudah-diamalkan",
    category: "tips-kesihatan",
    tags: ["Tips Kesihatan", "Pemakanan", "Gaya Hidup"],
    excerpt: "Petua mudah untuk menjaga kesihatan perut — sesuai untuk gastrik, GERD dan kesihatan penghadaman am.",
    readTime: 5,
    publishedAt: new Date("2026-11-04"),
    content: `Kesihatan perut yang baik adalah asas kepada kesihatan keseluruhan. Berikut adalah 10 tips mudah yang boleh anda amalkan setiap hari.

## 1. Minum Air yang Mencukupi
Minum sekur least 8 gelas air sehari. Air membantu penghadaman dan mengurangkan sembelit. Elakkan minum terlalu banyak semasa makan.

## 2. Makan Serat
Serat membantu pergerakan usus dan menyuburkan bakteria baik. Sumber: sayur-sayuran, buah-buahan, oat, kekacang.

## 3. Probiotik
Makanan seperti yogurt, tempeh dan kimchi mengandungi bakteria baik yang menyokong kesihatan usus.

## 4. Kurangkan Makanan Diproses
Makanan segera, makanan ringan dan makanan diproses mengandungi bahan tambahan yang boleh mengganggu kesihatan usus.

## 5. Makan Secara Perlahan
Kunyah makanan dengan baik — ini membantu penghadaman dan mengurangkan kembung.

## 6. Elakkan Makan Berlebihan
Perut yang terlalu penuh meningkatkan tekanan dan refluks. Hentikan makan sebelum rasa kenyang sepenuhnya.

## 7. Amalkan Posisi Makan yang Betul
Duduk tegak semasa makan — ini membantu penghadaman dan mengurangkan reflux.

## 8. Uruskan Stres
Stres boleh menyebabkan "butterflies in stomach" dan memburukkan simptom gastrik. Cuba teknik relaksasi 10 minit sehari.

## 9. Senaman Ringan Selepas Makan
Berjalan 10–15 minit selepas makan membantu penghadaman. Elakkan senaman berat sejurus selepas makan.

## 10. Tidur yang Cukup
Tidur yang tidak mencukupi boleh mengganggu hormon penghadaman dan meningkatkan keradangan.

> **Ingat:** Setiap badan berbeza. Perhatikan bagaimana makanan dan tabiat mempengaruhi anda, dan sesuaikan dengan keperluan peribadi. Jika ragu-ragu, rujuk doktor atau dietitian.

*Kandungan ini adalah untuk pendidikan sahaja.*`,
  },
];

const faqs = [
  // Gastrik
  { question: "Apakah gastrik dan adakah ia berbahaya?", answer: "Gastrik (gastritis) ialah keradangan lapisan perut. Kebanyakan kes adalah ringan dan boleh diuruskan, tetapi jika tidak dirawat boleh menyebabkan ulser. Rujuk doktor jika simptom berterusan.", topic: "gastrik", order: 1 },
  { question: "Bolehkah gastrik sembuh sepenuhnya?", answer: "Ya, gastrik boleh sembuh — terutamanya jika punca seperti H. pylori dirawat dengan antibiotik oleh doktor. Perubahan gaya hidup juga penting untuk mencegah berulang.", topic: "gastrik", order: 2 },
  { question: "Adakah gastrik disebabkan oleh tekanan?", answer: "Tekanan emosi boleh memburukkan gastrik dan meningkatkan asid perut, tetapi biasanya bukan punca utama. Punca lazim termasuk jangkitan H. pylori dan penggunaan NSAID.", topic: "gastrik", order: 3 },
  // GERD
  { question: "Apakah perbezaan antara heartburn dan GERD?", answer: "Heartburn ialah gejala pedih hati yang biasa. GERD ialah keadaan apabila refluks asid berlaku kerap dan kronik, menyebabkan kerengsaan esofagus. Heartburn sekali-sekala biasanya bukan GERD.", topic: "gerd", order: 1 },
  { question: "Adakah GERD boleh disembuhkan?", answer: "GERD boleh diuruskan dengan perubahan gaya hidup, pemakanan dan ubat. Sesetengah orang memerlukan ubat jangka panjang. Rujuk doktor untuk rawatan yang sesuai.", topic: "gerd", order: 2 },
  { question: "Tidur mengiring ke kiri benar-benar membantu GERD?", answer: "Ya — kajian menunjukkan tidur mengiring ke kiri membantu esofagus berada di atas paras asid perut, mengurangkan refluks semasa tidur.", topic: "gerd", order: 3 },
  // Anxiety
  { question: "Apakah anxiety dan bagaimana ia berbeza daripada stres biasa?", answer: "Anxiety ialah kebimbangan atau ketakutan berlebihan. Stres adalah respons normal terhadap tekanan; anxiety menjadi masalah apabila ia melampau, berterusan dan mengganggu kehidupan harian.", topic: "anxiety", order: 1 },
  { question: "Bolehkah anxiety disembuhkan tanpa ubat?", answer: "Ya — banyak orang mengurus anxiety dengan terapi, teknik relaksasi, senaman dan perubahan gaya hidup. Namun sesetengah kes memerlukan ubat yang ditetapkan doktor. Jangan berhenti ubat tanpa nasihat.", topic: "anxiety", order: 2 },
  { question: "Adakah anxiety boleh menyebabkan sakit perut?", answer: "Ya — anxiety boleh menyebabkan atau memburukkan simptom gastrik melalui 'gut-brain axis'. Sakit perut, kembung dan cirit-birit adalah simptom anxiety yang biasa.", topic: "anxiety", order: 3 },
  // Pemakanan
  { question: "Makanan apa yang patut dielakkan untuk gastrik?", answer: "Secara umum, elakkan makanan pedas, berminyak, masam, berkafein dan beralkohol. Walau bagaimanapun, pencetus berbeza antara individu — catat makanan anda untuk kenal pasti.", topic: "pemakanan", order: 1 },
  { question: "Adakah susu baik untuk gastrik?", answer: "Susu mungkin memberikan kelegaan sementara, tetapi sesetengah orang mendapati ia meningkatkan pengeluaran asid kemudian. Perhatikan tindak balas badan anda.", topic: "pemakanan", order: 2 },
  { question: "Perlukah saya mengelak semua makanan masam?", answer: "Tidak semestinya — sesetengah makanan masam seperti yogurt dan probiotik sebenarnya baik untuk usus. Yang penting ialah memerhati tindak balas peribadi anda.", topic: "pemakanan", order: 3 },
  // Tidur
  { question: "Adakah tidur tidak cukup boleh memburukkan gastrik?", answer: "Ya — tidur tidak mencukupi boleh meningkatkan keradangan, mengganggu hormon penghadaman dan meningkatkan stres, yang kesemuanya boleh memburukkan simptom gastrik.", topic: "tidur", order: 1 },
  { question: "Bila masa yang sesuai untuk makan malam?", answer: "Cuba selesai makan sekur least 2–3 jam sebelum tidur untuk mengurangkan refluks semasa tidur.", topic: "tidur", order: 2 },
];

async function main() {
  console.log("Seeding database…");

  // Admin user
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD ?? "legakan123", 10);
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL ?? "admin@legakan.my" },
    update: {},
    create: {
      name: "Admin Legakan",
      email: process.env.ADMIN_EMAIL ?? "admin@legakan.my",
      passwordHash,
      role: "ADMIN",
    },
  });

  // Categories
  const catMap = {};
  for (const c of categories) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
    catMap[c.slug] = cat;
  }

  // Tags
  const tagMap = {};
  for (const t of tags) {
    const tag = await prisma.tag.upsert({ where: { slug: t.slug }, update: t, create: t });
    tagMap[t.slug] = tag;
  }

  // Articles
  for (const a of articles) {
    const { category, tags: tagSlugs, ...data } = a;
    const article = await prisma.article.upsert({
      where: { slug: a.slug },
      update: { ...data, categoryId: catMap[category].id },
      create: {
        ...data,
        status: "PUBLISHED",
        categoryId: catMap[category].id,
        authorName: "Pasukan Legakan",
      },
    });
    for (const ts of tagSlugs) {
      await prisma.articleTag.upsert({
        where: { articleId_tagId: { articleId: article.id, tagId: tagMap[ts.toLowerCase().replace(/\s+/g, "-")].id } },
        update: {},
        create: { articleId: article.id, tagId: tagMap[ts.toLowerCase().replace(/\s+/g, "-")].id },
      });
    }
  }

  // FAQs
  for (const f of faqs) {
    await prisma.faq.upsert({
      where: { id: `faq-${f.topic}-${f.order}` },
      update: f,
      create: { id: `faq-${f.topic}-${f.order}`, ...f },
    });
  }

  console.log("Seed complete!");
  console.log(`Admin login: ${process.env.ADMIN_EMAIL ?? "admin@legakan.my"} / ${process.env.ADMIN_PASSWORD ?? "legakan123"}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
