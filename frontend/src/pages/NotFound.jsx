import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] grid place-items-center px-4" data-testid="page-not-found">
            <div className="text-center max-w-md">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-purple-300">Error 404</p>
                <h1 className="mt-2 font-display text-6xl md:text-7xl font-bold text-gradient">Perdidos</h1>
                <p className="mt-4 text-gray-400">
                    La página que buscas no existe o ha sido movida. Vuelve al inicio y descubre lo último en IA.
                </p>
                <Link
                    to="/"
                    className="mt-8 inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-[0_0_24px_rgba(168,85,247,0.4)] hover:shadow-[0_0_36px_rgba(59,130,246,0.5)] transition-shadow"
                    data-testid="notfound-home-link"
                >
                    <Home className="h-4 w-4" /> Volver al inicio
                </Link>
            </div>
        </div>
    );
}
