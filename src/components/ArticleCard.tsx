import Link from "next/link";
import { formatDate } from "@/lib/utils";

type Props = {
  title: string;
  slug: string;
  excerpt?: string | null;
  category?: { name: string; slug: string } | null;
  imageUrl?: string | null;
  publishedAt?: Date | string | null;
  readTime?: number;
  views?: number;
};

const GRADIENTS = [
  "from-sage-200 to-sage-100",
  "from-sky-200 to-sky-100",
  "from-cream-200 to-cream-100",
  "from-sage-100 to-sky-100",
];

export default function ArticleCard({ title, slug, excerpt, category, imageUrl, publishedAt, readTime, views }: Props) {
  const grad = GRADIENTS[slug.length % GRADIENTS.length];
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-sage-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/artikel/${slug}`} className="block">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={title} loading="lazy" className="h-44 w-full object-cover" />
        ) : (
          <div className={`flex h-44 w-full items-center justify-center bg-gradient-to-br ${grad}`}>
            <span className="text-5xl opacity-60" aria-hidden>🌿</span>
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        {category && (
          <Link
            href={`/kategori/${category.slug}`}
            className="mb-2 inline-block w-fit rounded-full bg-sage-50 px-3 py-0.5 text-xs font-semibold text-sage-700"
          >
            {category.name}
          </Link>
        )}
        <Link href={`/artikel/${slug}`}>
          <h3 className="text-lg font-bold leading-snug text-ink-800 group-hover:text-sage-700">
            {title}
          </h3>
        </Link>
        {excerpt && <p className="mt-2 line-clamp-3 text-sm text-ink-500">{excerpt}</p>}
        <div className="mt-4 flex items-center justify-between text-xs text-ink-400">
          <span>{formatDate(publishedAt)}</span>
          <span>{readTime ?? 5} minit bacaan{typeof views === "number" ? ` · ${views} tontonan` : ""}</span>
        </div>
        <Link
          href={`/artikel/${slug}`}
          className="mt-3 text-sm font-semibold text-sky-600 hover:text-sky-700"
        >
          Baca Lagi →
        </Link>
      </div>
    </article>
  );
}
