"use client";

import { useState } from "react";

export default function FaqAccordion({ items }: { items: { id: string; question: string; answer: string }[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id} className="rounded-2xl border border-sage-100 bg-white">
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-ink-800"
              onClick={() => setOpen(isOpen ? null : item.id)}
              aria-expanded={isOpen}
            >
              {item.question}
              <span className={`text-sage-600 transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
            </button>
            {isOpen && (
              <div className="border-t border-sage-50 px-5 py-4 text-sm leading-relaxed text-ink-600">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
