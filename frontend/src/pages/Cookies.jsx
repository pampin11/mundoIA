import { useEffect } from "react";
import { SITE } from "@/lib/site";

export default function Cookies() {
    useEffect(() => {
        document.title = `Aviso de cookies | ${SITE.name}`;
    }, []);

    const reset = () => {
        localStorage.removeItem("mundo-ia-cookie-consent");
        window.location.reload();
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16" data-testid="page-cookies">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-purple-300">Legal</p>
            <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold tracking-tight">Aviso de cookies</h1>
            <p className="mt-3 text-gray-500 text-sm">Última actualización: febrero 2026</p>

            <div className="mt-10 prose-ia">
                <h2 id="que-son">¿Qué son las cookies?</h2>
                <p>
                    Las cookies son pequeños ficheros que los sitios web colocan en tu dispositivo para recordar información,
                    mejorar tu experiencia o mostrar publicidad relevante.
                </p>
                <h2 id="tipos">Tipos de cookies que usamos</h2>
                <ul>
                    <li><strong>Técnicas:</strong> necesarias para que la web funcione (navegación, preferencias de idioma).</li>
                    <li><strong>Analíticas:</strong> Google Analytics, nos permite medir uso y mejorar.</li>
                    <li><strong>Publicitarias:</strong> Google AdSense, para mostrar anuncios relevantes que financian el proyecto.</li>
                </ul>
                <h2 id="gestion">Cómo gestionar cookies</h2>
                <p>
                    Puedes aceptarlas, rechazarlas o configurarlas desde el banner que aparece al entrar en la web. También
                    puedes borrarlas desde tu navegador en cualquier momento.
                </p>
                <p>
                    <button onClick={reset} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-500/40 text-purple-300 hover:bg-purple-500/10" data-testid="cookies-reset-btn">
                        Reabrir banner de cookies
                    </button>
                </p>
                <h2 id="terceros">Cookies de terceros</h2>
                <p>
                    Los siguientes terceros pueden instalar cookies cuando visitas {SITE.name}:
                </p>
                <ul>
                    <li>Google AdSense (publicidad)</li>
                    <li>Google Analytics (analítica)</li>
                    <li>Redes sociales integradas en botones de compartir</li>
                </ul>
                <h2 id="mas-info">Más información</h2>
                <p>
                    Para más detalles consulta nuestra <a href="/privacidad">política de privacidad</a> o escríbenos a{" "}
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
                </p>
            </div>
        </div>
    );
}
