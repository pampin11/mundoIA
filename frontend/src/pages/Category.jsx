import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import Sidebar from "@/components/Sidebar";
import { api, CATEGORY_META, SITE } from "@/lib/site";

export default function Category() {
    const { slug } = useParams();
    const [articles, setArticles] = useState([]);
    const [popular, setPopular] = useState([]);
    const [loading, setLoading] = useState(true);
    const meta = CATEGORY_META[slug] || { name: "Categoría", color: "#3B82F6" };

    useEffect(() => {
        document.title = `${meta.name} | ${SITE.name}`;
        const load = async () => {
            setLoading(true);
            try {
                const [a, p] = await Promise.all([
                    api.get("/articles", { params: { category: slug, limit: 50 } }),
                    api.get("/articles/popular", { params: { limit: 5 } }),
                ]);
                setArticles(a.data);
                setPopular(p.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [slug, meta.name]);

    return (
        <div data-testid="page-category">
            <section className="relative pt-16 pb-8 overflow-hidden">
                <div
                    className="absolute -top-40 -right-40 h-[400px] w-[400px] opacity-40 rounded-full"
                    style={{ background: meta.color, filter: "blur(140px)" }}
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: meta.color }}>
                        Categoría
                    </p>
                    <h1 className="mt-2 font-display text-4xl md:text-6xl font-bold tracking-tight" data-testid="category-title">
                        {meta.name}
                    </h1>
                    <p className="mt-4 text-gray-400 max-w-2xl">
                        Artículos seleccionados sobre <strong className="text-white">{meta.name.toLowerCase()}</strong> para que saques el máximo partido a la IA.
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8">
                        <AdSlot testId="category-top-ad" layout="horizontal" className="min-h-[120px] mb-8" />
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="h-72 rounded-2xl bg-white/5 animate-pulse" />
                                ))}
                            </div>
                        ) : articles.length === 0 ? (
                            <div className="rounded-2xl border border-white/10 p-10 text-center">
                                <h3 className="font-display text-xl">Aún no hay artículos en esta categoría.</h3>
                                <p className="text-gray-400 mt-2">Vuelve pronto. Publicamos contenido nuevo cada semana.</p>
                                <Link to="/" className="inline-block mt-6 px-5 py-2.5 rounded-lg bg-white text-black text-sm">Volver a inicio</Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {articles.map((a, i) => (
                                    <ArticleCard key={a.slug} article={a} index={i} />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="lg:col-span-4">
                        <div className="sticky top-24">
                            <Sidebar popular={popular} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
