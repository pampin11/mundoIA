import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import Sidebar from "@/components/Sidebar";
import { api, SITE } from "@/lib/site";

export default function Search() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const initialQ = params.get("q") || "";
    const [q, setQ] = useState(initialQ);
    const [results, setResults] = useState([]);
    const [popular, setPopular] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = `Buscar${initialQ ? `: ${initialQ}` : ""} | ${SITE.name}`;
        const load = async () => {
            setLoading(true);
            try {
                const [r, p] = await Promise.all([
                    api.get("/articles", { params: initialQ ? { q: initialQ, limit: 50 } : { limit: 50 } }),
                    api.get("/articles/popular", { params: { limit: 5 } }),
                ]);
                setResults(r.data);
                setPopular(p.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [initialQ]);

    const submit = (e) => {
        e.preventDefault();
        navigate(`/buscar?q=${encodeURIComponent(q.trim())}`);
    };

    return (
        <div data-testid="page-search">
            <section className="pt-16 pb-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-purple-300">Buscador</p>
                    <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold tracking-tight">
                        {initialQ ? <>Resultados para <span className="text-gradient">"{initialQ}"</span></> : "Buscar artículos"}
                    </h1>
                    <form onSubmit={submit} className="mt-6 max-w-2xl" data-testid="search-page-form">
                        <div className="relative">
                            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Busca prompts, herramientas, automatizar…"
                                className="w-full h-14 pl-12 pr-4 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:outline-none text-white placeholder:text-gray-500 text-base"
                                data-testid="search-page-input"
                                autoFocus={!initialQ}
                            />
                        </div>
                    </form>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8">
                        <AdSlot testId="search-top-ad" layout="horizontal" className="min-h-[120px] mb-8" />
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="h-72 rounded-2xl bg-white/5 animate-pulse" />
                                ))}
                            </div>
                        ) : results.length === 0 ? (
                            <div className="rounded-2xl border border-white/10 p-10 text-center" data-testid="search-no-results">
                                <h3 className="font-display text-xl">Sin resultados</h3>
                                <p className="text-gray-400 mt-2">Prueba con otras palabras clave.</p>
                            </div>
                        ) : (
                            <>
                                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-4">
                                    {results.length} {results.length === 1 ? "artículo" : "artículos"}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {results.map((a, i) => (
                                        <ArticleCard key={a.slug} article={a} index={i} />
                                    ))}
                                </div>
                            </>
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
