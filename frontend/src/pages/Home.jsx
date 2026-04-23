import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, TrendingUp, Zap, BookOpen, Cpu } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import { api, CATEGORY_META, SITE } from "@/lib/site";

const CAT_ICONS = {
    "herramientas-ia": Cpu,
    "prompts": Sparkles,
    "ganar-dinero": TrendingUp,
    "automatizacion": Zap,
    "ia-estudiantes": BookOpen,
};

export default function Home() {
    const [featured, setFeatured] = useState([]);
    const [latest, setLatest] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = `${SITE.name} | Herramientas de inteligencia artificial y cómo usarlas en 2026`;
        const load = async () => {
            try {
                const [f, l, c] = await Promise.all([
                    api.get("/articles", { params: { featured: true, limit: 3 } }),
                    api.get("/articles", { params: { limit: 10 } }),
                    api.get("/categories"),
                ]);
                setFeatured(f.data);
                setLatest(l.data);
                setCategories(c.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <div data-testid="page-home">
            {/* HERO */}
            <section className="relative pt-12 md:pt-24 pb-16 md:pb-20 overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid lg:grid-cols-12 gap-10 items-end">
                        <div className="lg:col-span-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 mb-6">
                                <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-purple-300">Blog IA · edición 2026</span>
                            </div>
                            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02]">
                                Herramientas de <span className="text-gradient">inteligencia artificial</span> y cómo usarlas en 2026
                            </h1>
                            <p className="mt-6 max-w-2xl text-lg text-gray-400 leading-relaxed">
                                {SITE.subtitle}. Guías prácticas, prompts listos para copiar y trucos reales, sin humo.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    to="/categoria/herramientas-ia"
                                    className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-[0_0_28px_rgba(59,130,246,0.35)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-shadow"
                                    data-testid="hero-cta-explore"
                                >
                                    Explorar herramientas <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    to="/categoria/ganar-dinero"
                                    className="inline-flex items-center gap-2 h-12 px-6 rounded-xl border border-white/15 hover:border-white/30 text-white hover:bg-white/5 transition-all"
                                    data-testid="hero-cta-money"
                                >
                                    Ganar dinero con IA
                                </Link>
                            </div>
                        </div>
                        <div className="lg:col-span-4 hidden lg:flex flex-col gap-3 font-mono text-xs uppercase tracking-[0.2em] text-gray-500">
                            <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                <span>Artículos publicados</span><span className="text-white text-base font-display">{latest.length || 10}</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                <span>Categorías</span><span className="text-white text-base font-display">{categories.length || 5}</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                <span>Actualizado</span><span className="text-white text-base font-display">Feb 2026</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Público objetivo</span><span className="text-white text-base font-display">16 – 40</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CATEGORIES */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-end justify-between mb-6">
                        <h2 className="font-display text-2xl md:text-3xl font-semibold">Explora por categoría</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
                        {Object.entries(CATEGORY_META).map(([slug, m]) => {
                            const Icon = CAT_ICONS[slug] || Sparkles;
                            const cat = categories.find((c) => c.slug === slug);
                            return (
                                <Link
                                    key={slug}
                                    to={`/categoria/${slug}`}
                                    className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:p-5 card-hover overflow-hidden"
                                    data-testid={`home-category-${slug}`}
                                >
                                    <div
                                        className="absolute -top-10 -right-10 h-24 w-24 rounded-full opacity-30 group-hover:opacity-60 transition-opacity"
                                        style={{ background: m.color, filter: "blur(40px)" }}
                                    />
                                    <Icon className="h-6 w-6 relative" strokeWidth={1.6} style={{ color: m.color }} />
                                    <h3 className="mt-3 font-display font-semibold text-sm md:text-base relative">{m.name}</h3>
                                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500 relative">
                                        {cat ? `${cat.count} artículos` : "Ver más"}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* AD Top banner */}
            <section className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AdSlot testId="home-top-ad" layout="horizontal" className="min-h-[120px]" />
                </div>
            </section>

            {/* FEATURED */}
            {featured.length > 0 && (
                <section className="py-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-end justify-between mb-6">
                            <h2 className="font-display text-2xl md:text-3xl font-semibold">Destacados</h2>
                            <Link to="/buscar" className="text-sm text-gray-400 hover:text-white font-mono uppercase tracking-[0.15em]">Ver todos →</Link>
                        </div>
                        <div className="grid md:grid-cols-12 gap-6">
                            <div className="md:col-span-8">
                                {featured[0] && <ArticleCard article={featured[0]} variant="hero" />}
                            </div>
                            <div className="md:col-span-4 grid grid-cols-1 gap-6">
                                {featured.slice(1, 3).map((a, i) => (
                                    <ArticleCard key={a.slug} article={a} index={i} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* LATEST */}
            <section className="py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-1">Últimos artículos</div>
                            <h2 className="font-display text-2xl md:text-3xl font-semibold">Novedades de la semana</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latest.slice(0, 6).map((a, i) => (
                            <ArticleCard key={a.slug} article={a} index={i} />
                        ))}
                    </div>

                    {/* AD mid */}
                    <div className="my-10">
                        <AdSlot testId="home-mid-ad" layout="horizontal" className="min-h-[120px]" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latest.slice(6, 10).map((a, i) => (
                            <ArticleCard key={a.slug} article={a} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 relative">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent p-8 md:p-12">
                        <div className="absolute -top-20 -right-20 h-60 w-60 bg-orb-purple opacity-40" />
                        <div className="absolute -bottom-20 -left-20 h-60 w-60 bg-orb-blue opacity-40" />
                        <div className="relative max-w-2xl">
                            <h3 className="font-display text-3xl md:text-4xl font-semibold">¿Quieres dominar la IA antes que el 99 %?</h3>
                            <p className="mt-4 text-gray-300 text-lg">
                                Suscríbete y recibe cada semana una guía práctica, un prompt probado y una herramienta nueva.
                            </p>
                            <Link
                                to="/sobre-nosotros"
                                className="mt-6 inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-white text-black font-medium hover:bg-blue-100 transition-colors"
                                data-testid="home-cta-about"
                            >
                                Conoce Mundo IA <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
