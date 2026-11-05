import type { Metadata } from "next";
import ArticleForm from "../ArticleForm";

export const metadata: Metadata = { title: "Artikel Baharu" };

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-800">Artikel Baharu</h1>
      <div className="mt-6 rounded-2xl border border-sage-100 bg-white p-6">
        <ArticleForm />
      </div>
    </div>
  );
}
