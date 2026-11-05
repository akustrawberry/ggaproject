"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSessionUser, hashPassword, verifyPassword, destroySession } from "@/lib/auth";
import { slugify, readingTime } from "@/lib/utils";

async function requireAdmin() {
  const user = await getSessionUser();
  if (!user || user.role !== "ADMIN") redirect("/admin/login");
  return user;
}

// ---------- Auth ----------

export async function adminLogin(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    redirect("/admin/login?error=1");
  }
  const { createSession } = await import("@/lib/auth");
  await createSession(user.id);
  redirect("/admin");
}

export async function adminLogout() {
  await destroySession();
  redirect("/admin/login");
}

export async function changePassword(formData: FormData) {
  const user = await requireAdmin();
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  if (next.length < 8) redirect("/admin?error=password");
  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser || !(await verifyPassword(current, dbUser.passwordHash))) {
    redirect("/admin?error=password");
  }
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await hashPassword(next) },
  });
  revalidatePath("/admin");
}

// ---------- Articles ----------

function articleDataFromForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const content = String(formData.get("content") ?? "");
  if (!title || !content.trim()) return null;
  return {
    title,
    slug: slugInput || slugify(title),
    excerpt: String(formData.get("excerpt") ?? "").trim() || null,
    content,
    imageUrl: String(formData.get("imageUrl") ?? "").trim() || null,
    categoryId: String(formData.get("categoryId") ?? "") || null,
    status: String(formData.get("status") ?? "DRAFT"),
    seoTitle: String(formData.get("seoTitle") ?? "").trim() || null,
    seoDescription: String(formData.get("seoDescription") ?? "").trim() || null,
    authorName: String(formData.get("authorName") ?? "").trim() || "Pasukan Legakan",
    readTime: readingTime(content),
  };
}

export async function createArticle(formData: FormData) {
  await requireAdmin();
  const data = articleDataFromForm(formData);
  if (!data) redirect("/admin/artikel/baru?error=1");
  const tagIds = formData.getAll("tagIds").map(String).filter(Boolean);

  const article = await prisma.article.create({
    data: {
      ...data,
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
      tags: { create: tagIds.map((tagId) => ({ tagId })) },
    },
  });
  revalidatePath("/artikel");
  revalidatePath("/");
  redirect(`/admin/artikel/${article.id}/edit?created=1`);
}

export async function updateArticle(id: string, formData: FormData) {
  await requireAdmin();
  const data = articleDataFromForm(formData);
  if (!data) redirect(`/admin/artikel/${id}/edit?error=1`);
  const tagIds = formData.getAll("tagIds").map(String).filter(Boolean);

  const existing = await prisma.article.findUnique({ where: { id } });
  const publishedAt =
    data.status === "PUBLISHED"
      ? existing?.publishedAt ?? new Date()
      : existing?.publishedAt ?? null;

  await prisma.article.update({
    where: { id },
    data: {
      ...data,
      publishedAt,
      tags: { deleteMany: {}, create: tagIds.map((tagId) => ({ tagId })) },
    },
  });
  revalidatePath("/artikel");
  revalidatePath(`/artikel/${data.slug}`);
  revalidatePath("/");
  redirect(`/admin/artikel/${id}/edit?saved=1`);
}

export async function deleteArticle(id: string) {
  await requireAdmin();
  await prisma.article.delete({ where: { id } });
  revalidatePath("/artikel");
  revalidatePath("/");
  redirect("/admin/artikel");
}

export async function toggleArticleStatus(id: string) {
  await requireAdmin();
  const a = await prisma.article.findUnique({ where: { id } });
  if (!a) return;
  const publishing = a.status !== "PUBLISHED";
  await prisma.article.update({
    where: { id },
    data: {
      status: publishing ? "PUBLISHED" : "DRAFT",
      publishedAt: publishing ? new Date() : a.publishedAt,
    },
  });
  revalidatePath("/admin/artikel");
  revalidatePath("/artikel");
}

// ---------- Categories & Tags ----------

export async function saveCategory(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim() || slugify(name);
  const description = String(formData.get("description") ?? "").trim() || null;
  if (!name || !slug) return;
  if (id) {
    await prisma.category.update({ where: { id }, data: { name, slug, description } });
  } else {
    await prisma.category.create({ data: { name, slug, description } });
  }
  revalidatePath("/admin/kategori");
  revalidatePath("/");
}

export async function deleteCategory(id: string) {
  await requireAdmin();
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/kategori");
}

export async function saveTag(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim() || slugify(name);
  if (!name || !slug) return;
  if (id) {
    await prisma.tag.update({ where: { id }, data: { name, slug } });
  } else {
    await prisma.tag.create({ data: { name, slug } });
  }
  revalidatePath("/admin/kategori");
}

export async function deleteTag(id: string) {
  await requireAdmin();
  await prisma.tag.delete({ where: { id } });
  revalidatePath("/admin/kategori");
}

// ---------- FAQs ----------

export async function saveFaq(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();
  const topic = String(formData.get("topic") ?? "umum");
  const order = parseInt(String(formData.get("order") ?? "0"), 10) || 0;
  const published = formData.get("published") === "on";
  if (!question || !answer) return;
  const data = { question, answer, topic, order, published };
  if (id) {
    await prisma.faq.update({ where: { id }, data });
  } else {
    await prisma.faq.create({ data });
  }
  revalidatePath("/admin/faq");
  revalidatePath("/soal-jawab");
}

export async function deleteFaq(id: string) {
  await requireAdmin();
  await prisma.faq.delete({ where: { id } });
  revalidatePath("/admin/faq");
  revalidatePath("/soal-jawab");
}

// ---------- Subscribers ----------

export async function deleteSubscriber(id: string) {
  await requireAdmin();
  await prisma.subscriber.delete({ where: { id } });
  revalidatePath("/admin/pelanggan");
}
