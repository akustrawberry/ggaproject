import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Markdown({ content }: { content: string }) {
  return (
    <div className="prose-legakan">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: (p) => <h2 className="mt-10 mb-4 text-2xl font-bold text-ink-800" {...p} />,
          h3: (p) => <h3 className="mt-8 mb-3 text-xl font-semibold text-ink-800" {...p} />,
          p: (p) => <p className="mt-4 leading-relaxed text-ink-600" {...p} />,
          ul: (p) => <ul className="mt-4 list-disc space-y-1.5 pl-6 text-ink-600" {...p} />,
          ol: (p) => <ol className="mt-4 list-decimal space-y-1.5 pl-6 text-ink-600" {...p} />,
          li: (p) => <li className="leading-relaxed" {...p} />,
          a: (p) => <a className="text-sky-600 underline hover:text-sky-700" target="_blank" rel="noreferrer" {...p} />,
          blockquote: (p) => (
            <blockquote className="my-6 rounded-r-xl border-l-4 border-sage-400 bg-sage-50 px-5 py-3 text-ink-600" {...p} />
          ),
          strong: (p) => <strong className="font-semibold text-ink-800" {...p} />,
          img: (p) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="my-6 rounded-xl" loading="lazy" {...p} />
          ),
          hr: () => <hr className="my-8 border-sage-100" />,
          table: (p) => (
            <div className="my-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm" {...p} />
            </div>
          ),
          th: (p) => <th className="border border-sage-100 bg-sage-50 px-3 py-2 text-left font-semibold text-ink-700" {...p} />,
          td: (p) => <td className="border border-sage-100 px-3 py-2 text-ink-600" {...p} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
