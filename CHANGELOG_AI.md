# Changelog AI

## [2026-10-26] - Enlaces internos sin redirecciones

### Modificado
- `lib/redirects.mjs`: lista única de URLs antiguas → nuevas, usada por `next.config.mjs`, el sitemap y `resolveHref()`. Los enlaces que vienen de Sanity (menú, home, CTAs) que apuntaban a `/villas-and-islands`, `/boats-and-yachts`, `/groups-and-events` o `/services` ahora enlazan directo al destino final.

## [2026-10-25] - Auditoría SEO/GEO EN/ES de todo el sitio

### Corregido
- `/yachts-catamarans/cuña` respondía 404: los slugs con caracteres no ASCII se decodifican (y se codifican en sitemap, breadcrumbs y llms.txt).
- `/privacy-policy` y `/terms-and-conditions` (enlazadas en el footer) respondían 404: nuevas páginas bilingües (`components/legal-page.tsx`). Política alineada a la Ley 1581 de 2012; pendiente revisión legal.
- `/villas-and-islands` (redirige a `/luxury-villas`) salía en el sitemap como duplicado: `REDIRECTED_SLUGS` lo excluye.
- H1 faltante en `/contact` y en las páginas hub (`/yachts-and-boats`).
- Meta descriptions: `fitDescription` completa las de menos de 110 caracteres (en el idioma de la página) y recorta las de más de 160 sin cortar palabras.
- Menú principal: los enlaces ya no se parten en dos líneas en español (1024–1440 px); el botón "Comenzar a planear" se muestra desde 1280 px.

### Agregado (GEO)
- JSON-LD `VacationRental` en villas e islas (capacidad, habitaciones, baños, amenidades) y `Service` en yates y lanchas; `ItemList` en los catálogos; breadcrumbs con nombre de categoría legible; `knowsAbout` en la organización.
- `llms.txt`: inventario real de Sanity (villas, islas, yates y lanchas con capacidad) y lista de guías en español.

## [2026-10-25] - 5 artículos nuevos: villas, barrios, restaurantes y vida nocturna

### Agregado
- Artículos semilla EN/ES en `lib/blog/seed/`: preguntas frecuentes al alquilar villa (visitas, staff/chef, fiestas, wifi, cercanía a discotecas, seguridad, persona adicional, anticipación), hotel vs. villa, dónde alojarse (barrios), los 22 restaurantes y los 14 rooftops/bares/discotecas de la guía de Millan (`venues.ts` genera una ficha por lugar con código de vestimenta e Instagram).
- Categorías nuevas: "Villas y estadías" y "Gastronomía y vida nocturna". Se suben con `pnpm blog:import --apply` (omite los 5 artículos que ya existen en Sanity).

## [2026-10-21] - Imagen para compartir editable en Sanity

### Agregado
- Campo **Imagen para compartir (WhatsApp, redes)** en Configuración Global (`shareImage`, con punto de enfoque y texto alternativo). Es la imagen al compartir la home y la de respaldo de cualquier página sin imagen propia; se recorta a JPG 1200×630 respetando el punto de enfoque (`getSiteShareImage` en `lib/seo.ts`). Sin imagen cargada se usa `public/og/private-islands-hero.jpg`.

## [2026-10-21] - Vistas previas al compartir (WhatsApp/redes) y URLs en español

### Corregido
- WhatsApp mostraba el logo en lugar de la foto: las imágenes OG eran WebP/PNG pesadas (hasta 2,5 MB). Ahora todas las páginas entregan un JPG 1200×630 ligero (~70–140 KB) con ancho, alto y tipo declarados: las de Sanity se transforman en el CDN (`ogImageUrl` en `lib/seo.ts`) y las locales están pregeneradas en `public/og/`.

### Agregado
- `?lang=es` (`proxy.ts`): cada página tiene su versión en español en una URL propia, para compartir enlaces en español y para que Google indexe el español. Canonical por idioma + `hreflang` (en, es, x-default) en las páginas y en el sitemap.
- Botones para compartir (WhatsApp, Facebook, LinkedIn, X) al final de cada artículo, con la URL en el idioma que se está leyendo.

## [2026-10-21] - Blog administrable desde Sanity

### Agregado
- Esquemas `blogPost`, `blogCategory`, `blogPostContent`, `blogBody` (Portable Text con H2/H3, listas, citas, enlaces, imágenes con alt/pie y recuadros destacados) y `blogCallout`.
- Sección **Blog** en el Studio: todos los artículos, por categoría, destacados, programados y categorías.
- `pnpm blog:import` (`scripts/blog-import.ts`): sube categorías, imágenes y los 5 artículos EN/ES. Dry-run por defecto, `--apply` para escribir, `--overwrite` para reemplazar artículos existentes.

### Modificado
- La web lee el blog desde Sanity (`blogPostsQuery`); si no hay artículos publicados usa los artículos semilla de `lib/blog/seed/`. Si falta el español, se muestra el inglés.

## [2026-10-21] - Blog y mejoras SEO/GEO

### Agregado
- **Blog (`/blog`, `/blog/[slug]`)** con el diseño editorial del sitio: hero, artículo destacado, grilla, índice lateral, bloque "En resumen", FAQ, CTA y artículos relacionados. 5 guías bilingües: Islas del Rosario, mejor época para visitar Cartagena, alquiler de yates, despedidas de soltero(a) y bodas de destino.
- Sección "The Journal" en la home y enlace "Blog" en header (añadido a la navegación de Sanity) y footer.
- `robots.txt`, `sitemap.xml` (estático + Sanity + blog), `llms.txt` para motores de IA.
- JSON-LD: TravelAgency + WebSite global; BlogPosting, Blog, BreadcrumbList, FAQPage, Service y ContactPage por página.

### Modificado
- `buildMetadata` en todas las páginas públicas: canonical, Open Graph/Twitter con imagen, títulos sin marca duplicada, `lang` del `<html>` según idioma.
- `/concierge` canonicaliza a `/services/concierge` (contenido duplicado).
- `FaqAccordion`: las respuestas permanecen en el HTML aunque estén cerradas (indexables).
- `/tienda`: `X-Robots-Tag: noindex` además del meta, fuera del sitemap.

## [2026-10-14] - Integración Completa de Pasarela de Pagos Wompi Colombia (Bancolombia)

### Agregado
- **Cálculo Seguro de Firma de Integridad (`lib/wompi.ts` y `/api/wompi/checkout-signature`)**:
  - Implementación oficial de la fórmula criptográfica SHA-256 (`reference + amountInCents + currency + integritySecret`) requerida por Wompi para evitar manipulaciones de montos.
  - Endpoint `/api/wompi/checkout-signature` que recibe la referencia y el valor en centavos, valida las claves y devuelve la firma sin exponer el secreto de integridad al cliente.
  - Manejo adaptativo en caso de que las credenciales no se hayan configurado aún en `.env.local` (retorna advertencia y modo simulación sin romper la app).
- **Consulta y Verificación de Transacciones en Tiempo Real (`/api/wompi/transaction`)**:
  - Endpoint seguro del servidor que consulta `https://sandbox.wompi.co/v1/transactions/:id` o `https://production.wompi.co/v1/transactions/:id` usando la llave privada de Wompi.
- **Webhook Oficial de Wompi (`/api/wompi/webhook`)**:
  - Manejador de eventos `transaction.updated` con verificación de checksum mediante concatenación dinámica de `signature.properties`, timestamp y `WOMPI_EVENTS_SECRET`.
  - Disparo de notificación automática por correo vía Resend (`sendStoreOrderPaidEmail` en `lib/email.ts`) ante pagos aprobados con desglose de ítems, código de orden y enlace de contacto.
- **Cliente Frontend de Wompi (`lib/wompi-client.ts`)**:
  - Carga dinámica del script oficial `https://checkout.wompi.co/widget.js`.
  - Apertura del modal interactivo `new window.WidgetCheckout` con datos prellenados del cliente, monto en centavos, moneda COP y URL de redirección a `/tienda/gracias`.
- **Integración en Carrito (`components/store/cart-drawer.tsx`)**:
  - Banner explicativo de Wompi Bancolombia con insignias de métodos aceptados (Tarjetas Débito/Crédito, PSE, Nequi y Botón Bancolombia) y sello de cifrado 256-bit SSL.
  - Botón de acción directo "Pagar con Wompi · {total}".
  - Manejo visual de alertas cuando las claves de Wompi están pendientes en `.env.local` con opción de probar en modo demostración.
- **Página de Confirmación Enriquecida (`components/store/thank-you-client.tsx`)**:
  - Detección de parámetro de transacción `?id=...` retornado por Wompi.
  - Tarjetas de estado dinámicas: **Aprobado** (verde esmeralda con ID de transacción Wompi y método utilizado), **Pendiente** (ámbar explicando verificación bancaria), **Declinado** (rosa con opción de reintentar) o **Demo**.
  - Actualización automática del botón de WhatsApp con el código de orden, ID de transacción Wompi y estado de pago para el concierge náutico.
- **Variables de Entorno (`.env.local` y `.env.example`)**:
  - Estructuración documentada para `NEXT_PUBLIC_WOMPI_PUBLIC_KEY`, `WOMPI_INTEGRITY_SECRET`, `WOMPI_PRIVATE_KEY`, `WOMPI_EVENTS_SECRET` y `NEXT_PUBLIC_WOMPI_ENV`.

## [2026-09-18] - Implementación de Tienda Oculta (/tienda) y Confirmación (/tienda/gracias)

### Agregado
- **Catálogo de Cava y Boutique (`lib/store-data.ts`)**:
  - Productos divididos en 5 categorías obligatorias: Cervezas, Vinos & Champagnes, Licores, Comida y Snacks.
  - Precios en pesos colombianos (COP), notas de maridaje, porciones/volumen, imágenes en alta resolución e indicadores de exclusividad.
- **Manejador de Estado del Carrito (`lib/store-context.tsx`)**:
  - Contexto global para añadir productos, modificar cantidades, eliminar ítems, abrir/cerrar drawer, persistir en `localStorage` y registrar órdenes de reserva.
- **Componentes de Interfaz de la Tienda**:
  - `components/store/product-card.tsx`: Card de producto con diseño editorial, badges, hover suave y botón de selección rápida.
  - `components/store/product-modal.tsx`: Modal emergente al pulsar cualquier producto mostrando imagen amplia, nombre, notas de cata, precio unitario, selector dinámico de cantidad `+` / `-` y subtotal calculado.
  - `components/store/cart-drawer.tsx`: Drawer lateral deslizable con desglose de ítems, recordatorio de **8 horas de anticipación**, formulario de checkout (nombre completo, teléfono, correo, destino en muelle/yate/villa, **número opcional de reserva previa**, notas especiales) y botón de simulación/preparación Wompi.
  - `components/store/store-page-client.tsx`: Vista principal de `/tienda` con cabecera editorial, banner de 8 horas mínimas de reserva, pestañas horizontales swipeables para móvil y buscador en tiempo real.
  - `components/store/thank-you-client.tsx`: Vista de `/tienda/gracias` con código de reserva, resumen de ítems y botón directo al **WhatsApp oficial de Millan Experiences** (`https://wa.me/573107102651`) con mensaje prellenado.
- **Rutas Next.js**:
  - `app/tienda/page.tsx`: Ruta oculta con `robots: { index: false, follow: false }`, `SiteHeader` y `SiteFooter`.
  - `app/tienda/gracias/page.tsx`: Ruta de agradecimiento con límites de indexación y `Suspense`.

### Modificado
- **Optimización de Texto y Mobile Responsive en `/tienda`**:
  - Se eliminaron las descripciones de los productos en las tarjetas (`ProductCard`) y en el modal (`ProductModal`), dejando un diseño más limpio y directo enfocado en imagen, nombre, presentación/volumen y precio.
  - Se corrigió el espaciado del filtro de categorías y la barra de búsqueda: se eliminaron márgenes excesivos y bloques repetitivos de texto de categorías, convirtiendo los filtros en elegantes píldoras `rounded-full` con scroll horizontal fluido.
  - Se redujeron los espaciados verticales (`pt-4 sm:pt-6`) para que la cuadrícula de productos comience inmediatamente debajo de los filtros.
  - Se añadieron opciones rápidas de selección de cantidad en el modal de producto: para cervezas opciones de 6 cervezas (1 six-pack), 12 cervezas (2 six-packs) y 24 cervezas (4 six-packs / caja), así como opciones equivalentes para vinos, licores y alimentos.
  - Se implementaron animaciones de transición fluidas para el carrito (`CartDrawer`): deslizamiento lateral con curva editorial `cubic-bezier(0.22, 1, 0.36, 1)` tanto al abrir como al cerrar, desvanecimiento del fondo con desenfoque (`backdrop-blur`) y animación de rotación en el botón de cerrar.
  - Se corrigió la sobreposición del header fijo en `/tienda/gracias` y `/tienda`: se ajustó el espaciado superior (`pt-32 pb-12 sm:pt-36 md:pt-40` en `/tienda/gracias` y `pt-28 sm:pt-32 md:pt-36` en `/tienda`), garantizando que la tarjeta de confirmación, el ícono verde de check y el contenido del hero nunca queden tapados por el `SiteHeader` fijo en dispositivos móviles ni de escritorio.
  - Se elevó el `z-index` de `ProductModal` a `z-[110]` para evitar cualquier conflicto de apilamiento con el header de navegación.
  - Se modificó la acción de "Agregar a mi Reserva" en `ProductModal` para que **no abra automáticamente el carrito**: ahora muestra confirmación visual inmediata ("¡Agregado a tu Reserva!"), cierra el modal suavemente y permite al usuario seguir navegando y explorando productos sin interrupción; el carrito puede abrirse en cualquier momento desde el botón flotante o la barra superior.
  - Se añadió feedback visual instantáneo (ícono de check y cambio de color a esmeralda) en el botón de adición rápida `+` de cada tarjeta de producto (`ProductCard`).
