import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

const KEY = "mundo-ia-cookie-consent";

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(KEY);
        if (!stored) {
            const t = setTimeout(() => setVisible(true), 1200);
            return () => clearTimeout(t);
        }
    }, []);

    const set = (value) => {
        localStorage.setItem(KEY, value);
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div
            className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 animate-fade-up"
            role="dialog"
            aria-labelledby="cookie-title"
            data-testid="cookie-banner"
        >
            <div className="relative rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-5 shadow-2xl shadow-purple-500/10">
                <button
                    onClick={() => set("dismissed")}
                    className="absolute top-3 right-3 h-8 w-8 grid place-items-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
                    aria-label="Cerrar"
                    data-testid="cookie-close-btn"
                >
                    <X className="h-4 w-4" />
                </button>
                <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 grid place-items-center flex-shrink-0">
                        <Cookie className="h-5 w-5 text-purple-400" strokeWidth={1.8} />
                    </div>
                    <div className="flex-1">
                        <h4 id="cookie-title" className="font-display text-lg font-semibold text-white">
                            Usamos cookies
                        </h4>
                        <p className="text-sm text-gray-400 mt-1">
                            Utilizamos cookies propias y de terceros (Google AdSense) para mejorar tu experiencia y mostrar anuncios relevantes.
                        </p>
                    </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                    <button
                        onClick={() => set("accepted")}
                        className="flex-1 min-w-[120px] h-10 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-shadow"
                        data-testid="cookie-accept-btn"
                    >
                        Aceptar
                    </button>
                    <button
                        onClick={() => set("rejected")}
                        className="h-10 px-4 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 text-sm"
                        data-testid="cookie-reject-btn"
                    >
                        Rechazar
                    </button>
                    <a
                        href="/cookies"
                        className="h-10 px-4 rounded-lg text-sm text-gray-400 hover:text-white grid place-items-center"
                        data-testid="cookie-info-link"
                    >
                        Más info
                    </a>
                </div>
            </div>
        </div>
    );
}
