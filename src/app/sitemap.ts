import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true, publishedAt: true },
  });
  const categories = await prisma.category.findMany({ select: { slug: true } });

  const staticPages = ["", "/artikel", "/alat", "/alat/pernafasan", "/alat/diari-makanan", "/alat/checklist", "/soal-jawab", "/tentang", "/hubungi", "/privasi", "/terma"].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: new Date(),
  }));

  return [
    ...staticPages,
    ...categories.map((c) => ({ url: `${SITE_URL}/kategori/${c.slug}`, lastModified: new Date() })),
    ...articles.map((a) => ({
      url: `${SITE_URL}/artikel/${a.slug}`,
      lastModified: a.updatedAt ?? a.publishedAt ?? new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
