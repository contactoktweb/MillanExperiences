# Project Context: Millan Experiences

## Descripción General
Plataforma web de lujo para **Millan Experiences**, una agencia exclusiva de viajes y concierge privado en Cartagena y el Caribe Colombiano (villas privadas, islas, yates de lujo, lanchas y aviación privada).

## Stack Tecnológico
- **Framework:** Next.js (App Router) con React 19 y TypeScript
- **Estilos:** Tailwind CSS v4 con variables CSS temáticas personalizadas (`--color-deep-sea`, `--color-sand`, `--color-warm-white`, `--color-blue-gray`, `--color-crystal-water`)
- **Tipografías:** Didot (`--font-serif`) y Jost (`--font-sans`)
- **CMS:** Sanity Studio v3 para gestión de contenidos globales, propiedades, servicios y testimonios
- **Notificaciones / Correo:** Resend
- **Integraciones:** WhatsApp oficial (+57 310 710 2651), Wompi (preparación pasarela)

## Rutas y Módulos
- `/`: Inicio con Hero, Servicios Principales, Razones para Elegir Millan, Testimonios y Contacto
- `/[slug]`: Páginas dinámicas de propiedades, servicios y categorías
- `/about`: Sobre Millan Experiences
- `/contact`: Formulario de contacto y concierge
- `/admin`: Sanity Studio Studio embebido
- `/tienda` (Oculta): Cava y boutique privada de licores, vinos, cervezas, comida y snacks con reserva previa de 8 horas, filtros horizontales optimizados y header clearance de 112px+.
- `/tienda/gracias` (Oculta): Confirmación de pedido con resumen, código de reserva, clearance de 128px+ contra el header fijo y contacto prioritario vía WhatsApp.
