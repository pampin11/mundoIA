import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, Sparkles } from "lucide-react";
import { CATEGORY_META, SITE } from "@/lib/site";

const NAV = [
    { label: "Inicio", to: "/" },
    { label: "Herramientas IA", to: "/categoria/herramientas-ia" },
    { label: "Prompts", to: "/categoria/prompts" },
    { label: "Ganar dinero", to: "/categoria/ganar-dinero" },
    { label: "Automatización", to: "/categoria/automatizacion" },
    { label: "Contacto", to: "/contacto" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [q, setQ] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const submitSearch = (e) => {
        e.preventDefault();
        if (q.trim().length === 0) return;
        navigate(`/buscar?q=${encodeURIComponent(q.trim())}`);
        setSearchOpen(false);
        setMobileOpen(false);
        setQ("");
    };

    return (
        <header
            data-testid="site-header"
            className={`sticky top-0 z-50 w-full transition-all ${
                scrolled ? "bg-[#05050A]/85 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 md:h-20 items-center justify-between gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group" data-testid="nav-logo">
                        <div className="relative h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 grid place-items-center shadow-[0_0_24px_rgba(168,85,247,0.45)] group-hover:shadow-[0_0_36px_rgba(59,130,246,0.6)] transition-shadow">
                            <Sparkles className="h-5 w-5 text-white" strokeWidth={1.8} />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="font-display text-xl font-bold tracking-tight">{SITE.name}</span>
                            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-[0.25em]">2026</span>
                        </div>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex items-center gap-1" aria-label="Principal">
                        {NAV.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className="px-3 py-2 rounded-md text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSearchOpen((s) => !s)}
                            className="h-10 w-10 grid place-items-center rounded-lg border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all"
                            aria-label="Buscar"
                            data-testid="open-search-btn"
                        >
                            <Search className="h-4 w-4" strokeWidth={1.8} />
                        </button>
                        <button
                            onClick={() => setMobileOpen((m) => !m)}
                            className="lg:hidden h-10 w-10 grid place-items-center rounded-lg border border-white/10 hover:border-white/25 hover:bg-white/5"
                            aria-label="Menú"
                            data-testid="mobile-menu-btn"
                        >
                            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Search panel */}
                {searchOpen && (
                    <form onSubmit={submitSearch} className="pb-4 animate-fade-in" data-testid="search-form">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                autoFocus
                                type="text"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Busca: prompts, ganar dinero, automatizar…"
                                className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/30 text-white placeholder:text-gray-500"
                                data-testid="search-input-header"
                            />
                        </div>
                    </form>
                )}

                {/* Mobile nav */}
                {mobileOpen && (
                    <div className="lg:hidden pb-6 animate-fade-in" data-testid="mobile-menu">
                        <nav className="flex flex-col gap-1">
                            {NAV.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => setMobileOpen(false)}
                                    className="px-3 py-3 rounded-md text-sm text-gray-200 hover:text-white hover:bg-white/5"
                                    data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                            <Link
                                to="/sobre-nosotros"
                                onClick={() => setMobileOpen(false)}
                                className="px-3 py-2 text-xs text-gray-400 hover:text-white rounded-md border border-white/10"
                            >
                                Sobre nosotros
                            </Link>
                            <Link
                                to="/privacidad"
                                onClick={() => setMobileOpen(false)}
                                className="px-3 py-2 text-xs text-gray-400 hover:text-white rounded-md border border-white/10"
                            >
                                Privacidad
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
