import { useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Send, Mail, Search } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import { CATEGORY_META, api } from "@/lib/site";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ popular = [], showAd = true }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        if (!email.includes("@")) return toast.error("Correo no válido");
        setLoading(true);
        try {
            await api.post("/newsletter", { email });
            toast.success("¡Estás dentro! Novedades directo a tu correo.");
            setEmail("");
        } catch {
            toast.error("Error al suscribir. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const doSearch = (e) => {
        e.preventDefault();
        if (query.trim().length === 0) return;
        navigate(`/buscar?q=${encodeURIComponent(query.trim())}`);
    };

    return (
        <aside className="space-y-6" data-testid="sidebar">
            {/* Search */}
            <form onSubmit={doSearch} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5" data-testid="sidebar-search">
                <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-3">Buscar</h4>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="¿Qué quieres aprender?"
                        className="w-full h-10 pl-9 pr-3 rounded-lg bg-black/40 border border-white/10 focus:border-purple-500/40 focus:outline-none text-sm"
                        data-testid="sidebar-search-input"
                    />
                </div>
            </form>

            {/* Popular */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-4 w-4 text-pink-400" strokeWidth={1.8} />
                    <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-400">Artículos populares</h4>
                </div>
                <div className="divide-y divide-white/5">
                    {popular.slice(0, 5).map((a) => (
                        <ArticleCard key={a.slug} article={a} variant="compact" />
                    ))}
                </div>
            </div>

            {/* AdSense sidebar slot */}
            {showAd && <AdSlot testId="sidebar-ad-slot" layout="square" className="min-h-[280px]" />}

            {/* Categories */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-3">Categorías</h4>
                <div className="flex flex-wrap gap-2">
                    {Object.entries(CATEGORY_META).map(([slug, m]) => (
                        <Link
                            key={slug}
                            to={`/categoria/${slug}`}
                            className="px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.1em] border transition-all hover:bg-white/5"
                            style={{ color: m.color, borderColor: `${m.color}50` }}
                            data-testid={`sidebar-cat-${slug}`}
                        >
                            {m.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Newsletter */}
            <form onSubmit={submit} className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent p-5" data-testid="sidebar-newsletter">
                <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4 text-blue-400" strokeWidth={1.8} />
                    <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-300">Recibe lo mejor</h4>
                </div>
                <p className="text-sm text-gray-400 mb-3">1 correo a la semana con guías, prompts y herramientas.</p>
                <div className="relative">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@correo.com"
                        className="w-full h-10 pl-3 pr-10 rounded-lg bg-black/50 border border-white/10 focus:border-purple-500/50 focus:outline-none text-sm"
                        data-testid="sidebar-newsletter-email"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        aria-label="Suscribirme"
                        className="absolute right-1 top-1 h-8 w-8 grid place-items-center rounded-md bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 disabled:opacity-50"
                        data-testid="sidebar-newsletter-submit"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                </div>
            </form>
        </aside>
    );
}
