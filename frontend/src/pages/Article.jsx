import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Clock, Calendar, Share2, Twitter, Facebook, Link as LinkIcon, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { api, CATEGORY_META, SITE, formatDate, renderMarkdown, extractHeadings } from "@/lib/site";
import AdSlot from "@/components/AdSlot";
import Sidebar from "@/components/Sidebar";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import ArticleCard from "@/components/ArticleCard";

export default function Article() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [related, setRelated] = useState([]);
    const [popular, setPopular] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const [a, r, p] = await Promise.all([
                    api.get(`/articles/${slug}`),
                    api.get(`/articles/${slug}/related`, { params: { limit: 3 } }),
                    api.get("/articles/popular", { params: { limit: 5 } }),
                ]);
                setArticle(a.data);
                setRelated(r.data);
                setPopular(p.data);
                document.title = `${a.data.title} | ${SITE.name}`;
            } catch (e) {
                if (e.response?.status === 404) {
                    navigate("/", { replace: true });
                } else {
                    console.error(e);
                }
            } finally {
                setLoading(false);
            }
        };
        if (slug) load();
    }, [slug, navigate]);

    const { contentWithAds, headings } = useMemo(() => {
        if (!article) return { contentWithAds: "", headings: [] };
        const h = extractHeadings(article.content);
        // Insert a mid-content ad marker after 3rd H2
        const lines = article.content.split("\n");
        let h2Count = 0;
        const result = [];
        for (const line of lines) {
            result.push(line);
            if (line.startsWith("## ")) {
                h2Count++;
                if (h2Count === 3) {
                    result.push("<!--AD-INLINE-->");
                }
            }
        }
        return { contentWithAds: result.join("\n"), headings: h };
    }, [article]);

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            toast.success("Enlace copiado");
        } catch {
            toast.error("No se pudo copiar");
        }
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-24">
                <div className="h-8 w-40 bg-white/5 rounded animate-pulse mb-6" />
                <div className="h-14 bg-white/5 rounded animate-pulse mb-4" />
                <div className="h-14 w-2/3 bg-white/5 rounded animate-pulse mb-10" />
                <div className="aspect-[16/9] bg-white/5 rounded-2xl animate-pulse" />
            </div>
        );
    }

    if (!article) return null;

    const meta = CATEGORY_META[article.category] || { name: article.category, color: "#3B82F6" };

    // Split prerendered HTML by marker to inject AdSlot component
    const html = renderMarkdown(contentWithAds);
    const [before, after] = html.split("<!--AD-INLINE-->");

    return (
        <div data-testid="page-article">
            <ReadingProgressBar />

            {/* Header */}
            <section className="relative pt-10 pb-8 overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <img src={article.cover} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#05050A]/60 via-[#05050A]/90 to-[#05050A]" />
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6"
                        data-testid="article-back-btn"
                    >
                        <ArrowLeft className="h-4 w-4" /> Volver
                    </button>
                    <Link
                        to={`/categoria/${article.category}`}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] border"
                        style={{ color: meta.color, borderColor: `${meta.color}60`, background: `${meta.color}15` }}
                        data-testid="article-category-badge"
                    >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: meta.color }} /> {meta.name}
                    </Link>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mt-5" data-testid="article-title">
                        {article.title}
                    </h1>
                    <p className="mt-5 text-lg text-gray-300 max-w-3xl">{article.excerpt}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-5 text-xs font-mono uppercase tracking-[0.15em] text-gray-400">
                        <span className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" /> {formatDate(article.published_at)}</span>
                        <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {article.reading_time} min de lectura</span>
                        <span className="flex items-center gap-2">
                            <Share2 className="h-3.5 w-3.5" />
                            Compartir
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Compartir en Twitter"
                                className="ml-1 hover:text-white"
                                data-testid="share-twitter"
                            >
                                <Twitter className="h-3.5 w-3.5" />
                            </a>
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Compartir en Facebook"
                                className="hover:text-white"
                                data-testid="share-facebook"
                            >
                                <Facebook className="h-3.5 w-3.5" />
                            </a>
                            <button onClick={copyLink} aria-label="Copiar enlace" className="hover:text-white" data-testid="share-copy">
                                <LinkIcon className="h-3.5 w-3.5" />
                            </button>
                        </span>
                    </div>
                </div>
            </section>

            {/* Top AD */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <AdSlot testId="article-top-ad" layout="horizontal" className="min-h-[120px]" />
            </section>

            {/* Layout: article + sidebar */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid lg:grid-cols-12 gap-10">
                    {/* Article */}
                    <article className="lg:col-span-8" data-article-content data-testid="article-content">
                        <div className="prose-ia max-w-none" dangerouslySetInnerHTML={{ __html: before }} />
                        {after && (
                            <>
                                <AdSlot testId="article-mid-ad" layout="horizontal" className="min-h-[200px] my-8" />
                                <div className="prose-ia max-w-none" dangerouslySetInnerHTML={{ __html: after }} />
                            </>
                        )}

                        {/* Bottom AD */}
                        <AdSlot testId="article-bottom-ad" layout="horizontal" className="min-h-[180px] my-10" />

                        {/* Tags */}
                        {article.tags?.length > 0 && (
                            <div className="mt-8 flex flex-wrap gap-2" data-testid="article-tags">
                                {article.tags.map((t) => (
                                    <span key={t} className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-[0.15em] border border-white/10 text-gray-400">
                                        #{t}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Related */}
                        {related.length > 0 && (
                            <div className="mt-14">
                                <h3 className="font-display text-2xl font-semibold mb-6">Podría interesarte</h3>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {related.map((a, i) => (
                                        <ArticleCard key={a.slug} article={a} index={i} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </article>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-6">
                            <TableOfContents headings={headings} />
                            <Sidebar popular={popular} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
