import { useEffect } from "react";
import { SITE } from "@/lib/site";

export default function Privacy() {
    useEffect(() => {
        document.title = `Política de privacidad | ${SITE.name}`;
    }, []);

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16" data-testid="page-privacy">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-purple-300">Legal</p>
            <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold tracking-tight">Política de privacidad</h1>
            <p className="mt-3 text-gray-500 text-sm">Última actualización: febrero 2026</p>

            <div className="mt-10 prose-ia">
                <h2 id="introduccion">1. Introducción</h2>
                <p>
                    En {SITE.name} respetamos tu privacidad. Esta política explica qué datos recogemos, por qué, cómo los usamos
                    y qué derechos tienes sobre ellos.
                </p>
                <h2 id="datos">2. Datos que recogemos</h2>
                <ul>
                    <li><strong>Datos que nos facilitas:</strong> correo electrónico al suscribirte, nombre y mensaje al usar el formulario de contacto.</li>
                    <li><strong>Datos técnicos:</strong> dirección IP, tipo de dispositivo, navegador, país y páginas visitadas, mediante cookies.</li>
                </ul>
                <h2 id="uso">3. Cómo usamos los datos</h2>
                <ul>
                    <li>Para responderte cuando nos escribes.</li>
                    <li>Para enviarte nuestra newsletter si te has suscrito.</li>
                    <li>Para medir tráfico del sitio y mejorar contenidos.</li>
                    <li>Para mostrar publicidad relevante mediante Google AdSense.</li>
                </ul>
                <h2 id="terceros">4. Terceros con los que compartimos datos</h2>
                <p>
                    Trabajamos con los siguientes proveedores: Google Analytics y Google AdSense para estadísticas y
                    publicidad; MongoDB y servicios en la nube para alojamiento; servicios de envío de correo para la newsletter.
                    Todos cumplen con el RGPD.
                </p>
                <h2 id="cookies">5. Cookies</h2>
                <p>
                    Utilizamos cookies propias y de terceros. Puedes leer más en nuestro <a href="/cookies">aviso de cookies</a> o
                    ajustar tus preferencias desde el banner que aparece al entrar por primera vez.
                </p>
                <h2 id="derechos">6. Tus derechos</h2>
                <p>
                    Tienes derecho a acceder, rectificar, suprimir, limitar o portar tus datos personales, así como a oponerte a
                    su tratamiento. Para ejercerlos escríbenos a <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
                </p>
                <h2 id="seguridad">7. Seguridad</h2>
                <p>
                    Empleamos medidas técnicas y organizativas para proteger tus datos, aunque ningún sistema es 100 % infalible.
                </p>
                <h2 id="cambios">8. Cambios</h2>
                <p>
                    Podemos actualizar esta política. Si hacemos cambios relevantes lo indicaremos en la web y, si procede, por correo.
                </p>
                <h2 id="contacto">9. Contacto</h2>
                <p>
                    Si tienes cualquier duda sobre privacidad, escríbenos a <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
                </p>
            </div>
        </div>
    );
}
