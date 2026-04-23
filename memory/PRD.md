# Mundo IA — Product Requirements Document

## Problema original
Blog moderno tipo artículo, muy interactivo, optimizado para monetizar con Google AdSense (ads.txt: `google.com, pub-4065544185286337, DIRECT, f08c47fec0942fa0`), enfocado en inteligencia artificial aplicada al día a día.

- Nicho: IA, herramientas IA, prompts, automatización, ganar dinero con IA, IA para estudiantes
- Público: 16–40 años, interesados en tecnología, productividad y dinero online
- Colores: negro, azul, morado (estilo futurista)
- Mobile-first, SEO optimizado
- 10 artículos preescritos (600–1000 palabras) en español

## User personas
- **Estudiante curioso (16-25)**: busca cómo usar IA para estudiar y empezar a ganar dinero.
- **Freelancer/emprendedor (25-40)**: busca herramientas, prompts y automatizaciones para multiplicar productividad.
- **Profesional curioso**: quiere entender qué es la IA y cómo aplicarla a su trabajo.

## Arquitectura
- **Backend**: FastAPI + MongoDB (motor), Pydantic v2, seed automático en startup.
- **Frontend**: React 19 + Tailwind + Shadcn/UI, React Router 7, Sonner toasts.
- **Tipografía**: Clash Display (display), Satoshi (body), JetBrains Mono (accents).
- **Tema**: dark-first (#05050A), orbes blue/purple con animación, glassmorphism, grid texture, noise overlay.

## Core requirements (static)
- Home con hero SEO, destacados (bento grid 8/4/4), últimos artículos, 5 categorías.
- Sistema de blog con página individual de artículo, TOC sticky con active highlight, reading progress bar, share buttons, related articles.
- Sidebar con búsqueda, artículos populares, categorías, newsletter, slot AdSense.
- 5 categorías: Herramientas IA, Prompts, Ganar dinero con IA, Automatización, IA para estudiantes.
- Search page con filtro por query.
- Formulario de contacto (guarda en MongoDB).
- Newsletter (idempotente por email).
- Páginas legales: Privacidad, Cookies, Sobre nosotros.
- Cookie banner (consentimiento AdSense).
- Back-to-top, 404.
- AdSense script en index.html, ads.txt en /public/ads.txt, 4 slots estratégicos por página (top banner, inline mid-content, bottom, sidebar) con label "PUBLICIDAD".

## Qué está implementado (2026-02-15)
- ✅ Backend FastAPI con endpoints: `/api/`, `/api/categories`, `/api/articles` (filtros: category, featured, q), `/api/articles/popular`, `/api/articles/{slug}`, `/api/articles/{slug}/related`, `/api/contact`, `/api/newsletter`, `/api/stats`
- ✅ Seed automático de 5 categorías y 10 artículos en español (600–1000 palabras cada uno)
- ✅ Frontend: Home, Article, Category, Search, Contact, About, Privacy, Cookies, NotFound
- ✅ Componentes: Header (glass sticky + mobile menu + search), Footer (newsletter + redes), AdSlot (ca-pub-4065544185286337), ArticleCard (3 variantes), ReadingProgressBar, TableOfContents (sticky + IntersectionObserver), Sidebar, CookieBanner, BackToTop
- ✅ Ads.txt servido en `/ads.txt`
- ✅ AdSense script integrado en `index.html` con `data-ad-client=ca-pub-4065544185286337`
- ✅ Meta tags SEO (Open Graph, Twitter, description, keywords)
- ✅ 10 artículos:
    1. Las mejores herramientas de IA en 2026
    2. Cómo ganar dinero con IA paso a paso
    3. Los mejores prompts para IA que funcionan
    4. Cómo automatizar tareas con IA sin programar
    5. Cómo usar la IA para estudiar mejor
    6. Aplicaciones de IA que debes tener en tu móvil
    7. Ideas de negocio con IA en 2026
    8. Qué es la IA y cómo funciona
    9. Ventajas y desventajas de la IA
    10. El futuro de la IA

## Tests (2026-02-15)
- Backend: 15/15 pytest pasados (100%)
- Frontend: todos los flujos verificados manualmente (100%)
- Sin issues críticas o menores

## Backlog (P1/P2)
- **P1**: Panel de admin para crear/editar artículos en caliente (actualmente estáticos)
- **P1**: Envío real de emails (Resend/SendGrid) en contacto y newsletter
- **P1**: Sitemap.xml dinámico generado desde DB
- **P2**: Data-testid en category cards del Home (mejora automation)
- **P2**: Páginas de autor y perfil
- **P2**: Sistema de comentarios (Disqus o propio)
- **P2**: Traducción automática (inglés) para ampliar audiencia
- **P2**: Modo lectura (tipografía más grande, ocultar sidebar)
- **P2**: Related articles por tags además de categoría

## Deployment
- AdSense: para monetizar, el dueño debe aprobar el sitio en Google AdSense y reemplazar `data-ad-slot="auto"` en `AdSlot.jsx` con los slot IDs reales que genere desde el panel.
- Env vars usadas: `MONGO_URL`, `DB_NAME`, `CORS_ORIGINS`, `REACT_APP_BACKEND_URL`
