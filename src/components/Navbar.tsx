"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sage-100 bg-cream-50/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-500 text-lg text-white">
            🌿
          </span>
          <span className="text-xl font-bold text-sage-800">{SITE_NAME}</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                pathname === l.href || pathname.startsWith(l.href + "/")
                  ? "bg-sage-100 text-sage-800"
                  : "text-ink-600 hover:bg-sage-50 hover:text-sage-700"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/cari"
            className="ml-2 rounded-full bg-sky-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-sky-600"
          >
            Cari
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-ink-700 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-sage-100 bg-cream-50 px-4 pb-4 lg:hidden">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                pathname === l.href || pathname.startsWith(l.href + "/")
                  ? "bg-sage-100 text-sage-800"
                  : "text-ink-600 hover:bg-sage-50"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/cari"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-sky-500 px-3 py-2 text-center text-sm font-semibold text-white"
          >
            Cari Artikel
          </Link>
        </div>
      )}
    </header>
  );
}
