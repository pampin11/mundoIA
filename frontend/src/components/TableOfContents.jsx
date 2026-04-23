import { useEffect, useState } from "react";
import { List } from "lucide-react";

export default function TableOfContents({ headings }) {
    const [active, setActive] = useState(null);

    useEffect(() => {
        if (!headings || headings.length === 0) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0% -70% 0%", threshold: 0 }
        );
        headings.forEach((h) => {
            const el = document.getElementById(h.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [headings]);

    if (!headings || headings.length === 0) return null;

    return (
        <nav
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
            aria-label="Tabla de contenidos"
            data-testid="table-of-contents"
        >
            <div className="flex items-center gap-2 mb-4">
                <List className="h-4 w-4 text-purple-400" strokeWidth={1.8} />
                <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-400">En este artículo</h4>
            </div>
            <ul className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                {headings.map((h) => (
                    <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
                        <a
                            href={`#${h.id}`}
                            className={`block text-sm transition-colors border-l-2 pl-3 py-1 ${
                                active === h.id
                                    ? "text-white border-purple-500"
                                    : "text-gray-400 border-white/5 hover:text-white hover:border-white/30"
                            }`}
                            data-testid={`toc-link-${h.id}`}
                        >
                            {h.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
