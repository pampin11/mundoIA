import { Link } from "react-router-dom";
import { Clock, ArrowUpRight } from "lucide-react";
import { CATEGORY_META, formatDate } from "@/lib/site";

export default function ArticleCard({ article, variant = "default", index = 0 }) {
    const meta = CATEGORY_META[article.category] || { name: article.category, color: "#3B82F6" };

    if (variant === "hero") {
        return (
            <Link
                to={`/articulo/${article.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-white/10 card-hover block h-full min-h-[420px]"
                data-testid={`article-card-hero-${article.slug}`}
                style={{ animationDelay: `${index * 60}ms` }}
            >
                <div className="absolute inset-0">
                    <img
                        src={article.cover}
                        alt={article.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-[#05050A]/70 to-transparent" />
                </div>
                <div className="relative h-full flex flex-col justify-end p-6 md:p-10">
                    <span
                        className="inline-flex self-start items-center gap-2 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] mb-4 border"
                        style={{ color: meta.color, borderColor: `${meta.color}60`, background: `${meta.color}15` }}
                    >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: meta.color }} /> {meta.name}
                    </span>
                    <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                        {article.title}
                    </h2>
                    <p className="mt-3 text-gray-300 max-w-2xl text-base md:text-lg line-clamp-2">
                        {article.excerpt}
                    </p>
                    <div className="mt-5 flex items-center gap-4 text-xs font-mono uppercase tracking-[0.15em] text-gray-400">
                        <span>{formatDate(article.published_at)}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.reading_time} min</span>
                        <span className="ml-auto flex items-center gap-1 text-white group-hover:text-blue-400 transition-colors">
                            Leer <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                    </div>
                </div>
            </Link>
        );
    }

    if (variant === "compact") {
        return (
            <Link
                to={`/articulo/${article.slug}`}
                className="group flex gap-3 items-start py-3"
                data-testid={`article-card-compact-${article.slug}`}
            >
                <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                    <img src={article.cover} alt={article.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                        {article.title}
                    </h4>
                    <div className="mt-1 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-gray-500">
                        <span style={{ color: meta.color }}>{meta.name}</span>
                        <span>·</span>
                        <span>{article.reading_time} min</span>
                    </div>
                </div>
            </Link>
        );
    }

    // default
    return (
        <Link
            to={`/articulo/${article.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] card-hover animate-fade-up"
            data-testid={`article-card-${article.slug}`}
            style={{ animationDelay: `${index * 80}ms` }}
        >
            <div className="aspect-[16/10] overflow-hidden relative">
                <img
                    src={article.cover}
                    alt={article.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05050A]/80 via-transparent to-transparent" />
                <span
                    className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] border backdrop-blur-sm"
                    style={{ color: meta.color, borderColor: `${meta.color}60`, background: `rgba(0,0,0,0.5)` }}
                >
                    {meta.name}
                </span>
            </div>
            <div className="flex-1 flex flex-col p-5">
                <h3 className="font-display text-xl font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                    {article.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400 line-clamp-3 flex-1">
                    {article.excerpt}
                </p>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.15em] text-gray-500">
                    <span>{formatDate(article.published_at)}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.reading_time} min</span>
                </div>
            </div>
        </Link>
    );
}
