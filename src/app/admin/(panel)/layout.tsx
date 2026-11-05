import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { adminLogout } from "../actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user || user.role !== "ADMIN") redirect("/admin/login");

  const links = [
    { href: "/admin", label: "Papan Pemuka" },
    { href: "/admin/artikel", label: "Artikel" },
    { href: "/admin/kategori", label: "Kategori & Tag" },
    { href: "/admin/faq", label: "Soal Jawab" },
    { href: "/admin/pelanggan", label: "Pelanggan" },
  ];

  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8">
      <aside className="w-52 shrink-0">
        <div className="rounded-2xl border border-sage-100 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Admin</p>
          <p className="mt-1 truncate text-sm font-semibold text-ink-800">{user.name}</p>
          <nav className="mt-4 space-y-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="block rounded-lg px-3 py-2 text-sm text-ink-600 hover:bg-sage-50 hover:text-sage-800">
                {l.label}
              </Link>
            ))}
          </nav>
          <form action={adminLogout} className="mt-4 border-t border-sage-100 pt-3">
            <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
              Log Keluar
            </button>
          </form>
        </div>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
