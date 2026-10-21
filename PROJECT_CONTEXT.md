# Project Context: Millan Experiences

## Descripción General
Plataforma web de lujo para **Millan Experiences**, una agencia exclusiva de viajes y concierge privado en Cartagena y el Caribe Colombiano (villas privadas, islas, yates de lujo, lanchas y aviación privada).

## Stack Tecnológico
- **Framework:** Next.js (App Router) con React 19 y TypeScript
- **Estilos:** Tailwind CSS v4 con variables CSS temáticas personalizadas (`--color-deep-sea`, `--color-sand`, `--color-warm-white`, `--color-blue-gray`, `--color-crystal-water`)
- **Tipografías:** Didot (`--font-serif`) y Jost (`--font-sans`)
- **CMS:** Sanity Studio v3 para gestión de contenidos globales, propiedades, servicios y testimonios
- **Notificaciones / Correo:** Resend
- **Integraciones:** WhatsApp oficial (+57 310 710 2651), Pasarela de pagos Wompi Bancolombia (Widget checkout, firma de integridad SHA-256, webhooks y verificación de transacciones)

## Rutas y Módulos
- `/`: Inicio con Hero, Servicios Principales, Razones para Elegir Millan, Testimonios y Contacto
- `/[slug]`: Páginas dinámicas de propiedades, servicios y categorías
- `/about`: Sobre Millan Experiences
- `/contact`: Formulario de contacto y concierge
- `/admin`: Sanity Studio Studio embebido
- `/blog` y `/blog/[slug]`: Blog bilingüe (EN/ES por cookie) administrado en Sanity (`/admin` → **Blog**): documentos `blogPost` (pestañas General / English / Español; imagen principal, imágenes dentro del texto, recuadros destacados, FAQ, puntos clave, SEO y fecha programable) y `blogCategory`. Esquemas en `sanity/schemaTypes/blog.ts`, consulta `blogPostsQuery`, normalización en `lib/blog/index.ts`. Los 5 artículos iniciales están en `lib/blog/seed/` y se suben con `pnpm blog:import --apply` (requiere `SANITY_API_WRITE_TOKEN`); mientras Sanity no tenga artículos publicados, la web muestra esos artículos semilla.
- SEO/GEO: `lib/seo.ts` (`buildMetadata`, JSON-LD Organization/WebSite/Breadcrumb/FAQ), `app/robots.ts`, `app/sitemap.ts` (incluye páginas de Sanity y propiedades), `app/llms.txt/route.ts`.
- `/tienda` (Privada, sin SEO: `noindex` por meta y cabecera `X-Robots-Tag` en `next.config.mjs`, excluida del sitemap): Cava y boutique privada con reserva previa de 8 horas. El catálogo viene de Sanity (`storeProduct` / `storeCategory`, solo productos `status == "active"`), con filtros por categoría, subcategoría y destino. Se puebla con `pnpm store:import` desde `guia.xlsx` (ver `scripts/store-import/README.md`); los datos internos de proveedor/costos NO van a Sanity (dataset público) sino a `scripts/store-import/output/` (ignorado por git).
- `/tienda/gracias` (Oculta): Confirmación de pedido con resumen, código de reserva, clearance de 128px+ contra el header fijo y contacto prioritario vía WhatsApp.
