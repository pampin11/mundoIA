import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Mail, Twitter, Github, Instagram } from "lucide-react";
import { api, SITE, CATEGORY_META } from "@/lib/site";
import { toast } from "sonner";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const subscribe = async (e) => {
        e.preventDefault();
        if (!email.includes("@")) {
            toast.error("Introduce un correo válido");
            return;
        }
        setLoading(true);
        try {
            await api.post("/newsletter", { email });
            toast.success("¡Suscrito! Te esperan las mejores guías de IA.");
            setEmail("");
        } catch (err) {
            toast.error("No se pudo suscribir. Inténtalo más tarde.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="mt-24 border-t border-white/10 bg-gradient-to-b from-transparent to-black/40" data-testid="site-footer">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand + newsletter */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 grid place-items-center shadow-[0_0_24px_rgba(168,85,247,0.45)]">
                                <Sparkles className="h-5 w-5 text-white" strokeWidth={1.8} />
                            </div>
                            <span className="font-display text-2xl font-bold tracking-tight">{SITE.name}</span>
                        </div>
                        <p className="text-gray-400 max-w-md leading-relaxed">
                            {SITE.subtitle}. Guías prácticas, prompts probados y herramientas para convertir la IA en tu mejor aliado.
                        </p>

                        <form onSubmit={subscribe} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md" data-testid="footer-newsletter-form">
                            <div className="relative flex-1">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Tu correo"
                                    className="w-full h-11 pl-10 pr-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500/50 focus:outline-none text-white placeholder:text-gray-500"
                                    data-testid="footer-newsletter-email"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="h-11 px-5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-[0_0_24px_rgba(59,130,246,0.35)] hover:shadow-[0_0_32px_rgba(168,85,247,0.5)] transition-shadow disabled:opacity-60"
                                data-testid="footer-newsletter-submit"
                            >
                                {loading ? "Enviando…" : "Suscribirme"}
                            </button>
                        </form>
                        <p className="mt-2 text-xs text-gray-500 font-mono uppercase tracking-[0.15em]">
                            Sin spam · Cancela cuando quieras
                        </p>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="font-mono text-xs text-gray-400 uppercase tracking-[0.2em] mb-4">Categorías</h4>
                        <ul className="space-y-2">
                            {Object.entries(CATEGORY_META).map(([slug, meta]) => (
                                <li key={slug}>
                                    <Link
                                        to={`/categoria/${slug}`}
                                        className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: meta.color }} />
                                        {meta.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-mono text-xs text-gray-400 uppercase tracking-[0.2em] mb-4">Información</h4>
                        <ul className="space-y-2">
                            <li><Link to="/sobre-nosotros" className="text-sm text-gray-300 hover:text-white">Sobre nosotros</Link></li>
                            <li><Link to="/contacto" className="text-sm text-gray-300 hover:text-white">Contacto</Link></li>
                            <li><Link to="/privacidad" className="text-sm text-gray-300 hover:text-white">Política de privacidad</Link></li>
                            <li><Link to="/cookies" className="text-sm text-gray-300 hover:text-white">Aviso de cookies</Link></li>
                        </ul>
                        <div className="mt-5 flex items-center gap-3">
                            <a href="#" aria-label="Twitter" className="h-9 w-9 grid place-items-center rounded-lg border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all"><Twitter className="h-4 w-4" strokeWidth={1.6} /></a>
                            <a href="#" aria-label="Instagram" className="h-9 w-9 grid place-items-center rounded-lg border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all"><Instagram className="h-4 w-4" strokeWidth={1.6} /></a>
                            <a href="#" aria-label="Github" className="h-9 w-9 grid place-items-center rounded-lg border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all"><Github className="h-4 w-4" strokeWidth={1.6} /></a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.</p>
                    <p className="font-mono uppercase tracking-[0.2em]">Hecho con IA y café · Publicidad: Google AdSense</p>
                </div>
            </div>
        </footer>
    );
}
