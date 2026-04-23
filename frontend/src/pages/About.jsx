import { useEffect } from "react";
import { Sparkles, Target, Users, BookOpen } from "lucide-react";
import { SITE } from "@/lib/site";
import AdSlot from "@/components/AdSlot";

export default function About() {
    useEffect(() => {
        document.title = `Sobre nosotros | ${SITE.name}`;
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16" data-testid="page-about">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-purple-300">Sobre nosotros</p>
            <h1 className="mt-2 font-display text-4xl md:text-6xl font-bold tracking-tight">
                Hacemos la IA <span className="text-gradient">fácil</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-3xl">
                {SITE.name} nació para quitarte el ruido y darte lo que de verdad funciona con inteligencia artificial en 2026.
                Ni humo, ni tutoriales de 40 minutos para explicar lo que cabe en tres párrafos.
            </p>

            <div className="mt-12 grid md:grid-cols-3 gap-5">
                {[
                    { icon: Sparkles, title: "Claridad brutal", text: "Guías prácticas que puedes aplicar en 10 minutos." },
                    { icon: Target, title: "Sin atajos falsos", text: "Recomendamos lo que hemos probado, no lo que está de moda." },
                    { icon: Users, title: "Comunidad 16–40", text: "Escribimos para gente curiosa que quiere usar la IA para algo útil." },
                ].map((b) => (
                    <div key={b.title} className="rounded-2xl border border-white/10 p-6 bg-white/[0.02] card-hover">
                        <b.icon className="h-6 w-6 text-purple-400" strokeWidth={1.6} />
                        <h3 className="mt-3 font-display text-lg font-semibold">{b.title}</h3>
                        <p className="mt-2 text-sm text-gray-400">{b.text}</p>
                    </div>
                ))}
            </div>

            <div className="mt-14 prose-ia">
                <h2 id="mision">Nuestra misión</h2>
                <p>
                    Democratizar el uso inteligente de la IA. Creemos que cualquiera debería poder aprovechar herramientas
                    como ChatGPT, Claude, Gemini, Midjourney o Sora sin necesidad de saber programar ni pagar cursos carísimos.
                </p>
                <h2 id="equipo">Quién está detrás</h2>
                <p>
                    {SITE.name} está formado por un equipo de creadores, redactores y desarrolladores apasionados por la tecnología
                    aplicada. Probamos las herramientas antes de recomendarlas y revisamos los artículos cada trimestre para
                    mantenerlos al día.
                </p>
                <h2 id="transparencia">Transparencia y publicidad</h2>
                <p>
                    Este sitio se financia con publicidad contextual (Google AdSense) y enlaces de afiliación en artículos
                    seleccionados. Nunca recomendamos herramientas que no usaríamos nosotros. Si un artículo contiene
                    colaboración patrocinada, lo indicamos explícitamente.
                </p>
                <h2 id="contacto">¿Quieres escribirnos?</h2>
                <p>
                    Visita la <a href="/contacto">página de contacto</a>. Leemos todos los mensajes y respondemos en menos de 48 horas laborables.
                </p>
            </div>

            <AdSlot testId="about-bottom-ad" layout="horizontal" className="min-h-[160px] mt-12" />
        </div>
    );
}
