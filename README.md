# Legakan — Panduan Gastrik, GERD & Anxiety

Platform pendidikan kesihatan dalam Bahasa Melayu untuk membantu masyarakat Malaysia memahami dan mengurus **Gastrik**, **GERD** dan **Anxiety**.

> ⚠️ **Penafian Perubatan:** Kandungan di website ini adalah untuk tujuan pendidikan sahaja. Ia **bukan** pengganti nasihat, diagnosis atau rawatan daripada doktor atau profesional kesihatan.

## Tech Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4**
- **Prisma 6** + PostgreSQL
- **bcryptjs** + **jose** untuk pengesahan admin
- **react-markdown** untuk kandungan artikel

## Pemasangan

### Keperluan

- Node.js 20+ dan npm

### Langkah-langkah

```bash
# 1. Clone repository
git clone https://github.com/akustrawberry/ggaproject.git
cd ggaproject

# 2. Install dependencies
npm install

# 3. Sediakan fail .env
cp .env.example .env
# Edit .env — tetapkan SESSION_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD

# 4. Jana Prisma Client dan database
db push      # atau: npx prisma generate && npx prisma db push

# 5. Seed data (kategori, artikel, FAQ, admin user)
node prisma/seed.mjs

# 6. Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

> **Nota:** Jika `npm install` memaparkan amaran `install-scripts ... allowScripts`,
> jalankan `npx prisma generate` secara manual selepas install — postinstall Prisma telah disekat.

## Akaun Admin

Selepas seed, log masuk di `/admin/login` menggunakan `ADMIN_EMAIL` dan `ADMIN_PASSWORD` daripada `.env`
(lalai: `admin@legakan.my` / `legakan123` — **tukar dalam production!**).

## Struktur Projek

```
src/
  app/
    page.tsx                  # Laman utama
    artikel/                  # Senarai & butiran artikel
    kategori/[slug]/          # Halaman kategori
    alat/                     # Alat wellness (pernafasan, diari, checklist)
    soal-jawab/               # FAQ
    admin/                    # Dashboard admin (login + panel)
    api/                      # API routes (newsletter, auth)
    sitemap.ts, robots.ts     # SEO
  components/                 # Komponen UI & interaktif
  lib/                        # Prisma client, auth, utiliti, pemalar
prisma/
  schema.prisma               # Skema database
  seed.mjs                    # Data benih
```

## Ciri-ciri

- Artikel dengan Markdown, kategori, tag, SEO fields, related articles
- Carian artikel, breadcrumb, anggaran masa bacaan, schema.org JSON-LD
- Alat wellness: latihan pernafasan 4-7-8, diari makanan (localStorage), senarai semak harian
- Buletin e-mel dengan rate limiting
- Admin dashboard: CRUD artikel/kategori/tag/FAQ, pengurusan pelanggan, statistik tontonan
- Responsive, mobile-first, Bahasa Melayu

## Deployment (Vercel + PostgreSQL)

1. **Sediakan PostgreSQL** — cara paling mudah: cipta akaun percuma di [Neon](https://neon.tech) atau [Supabase](https://supabase.com), cipta database, dan dapatkan connection string (`postgresql://...`).

2. **Kemas kini `.env` tempatan** dengan `DATABASE_URL` PostgreSQL tersebut, kemudian:
   ```bash
   npx prisma generate
   npx prisma db push
   node prisma/seed.mjs
   ```

3. **Push ke GitHub** dan import projek ke [Vercel](https://vercel.com).

4. **Tetapkan Environment Variables** dalam Vercel → Project → Settings → Environment Variables:
   - `DATABASE_URL` — connection string PostgreSQL (untuk migrasi, gunakan endpoint *direct/non-pooling* jika Neon)
   - `SESSION_SECRET` — string rawak yang panjang
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_SITE_URL` — `https://your-app.vercel.app`

5. **Redeploy.** Prisma Client dijana automatik semasa `npm install` di Vercel.

## Keselamatan

- Kata laluan di-hash dengan bcrypt
- Session JWT httpOnly + sameSite
- Rate limiting pada API newsletter & login
- Admin routes dilindungi server-side
- Data diari wellness kekal di pelayar pengguna (localStorage) — tidak dihantar ke pelayan
