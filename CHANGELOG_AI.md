# Changelog AI

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
