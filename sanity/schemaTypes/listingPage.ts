import { defineType, defineField } from 'sanity'
import { LayoutGrid } from 'lucide-react'

const listingPageContentFields = [
  // --- SEO METADATA ---
  defineField({
    name: 'seo',
    title: 'Configuración SEO (Meta Tags)',
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({ name: 'title', title: 'Título SEO (Meta Title)', type: 'string' }),
      defineField({ name: 'description', title: 'Descripción SEO (Meta Description)', type: 'text' }),
    ]
  }),
  
  // --- HUB SPLIT SCREEN OPTIONS ---
  defineField({
    name: 'hubLeft',
    title: 'Opción Izquierda (Split Hub)',
    type: 'object',
    hidden: ({ document }) => !document?.isHub,
    fields: [
      defineField({ name: 'title', title: 'Título', type: 'string' }),
      defineField({ name: 'description', title: 'Descripción Corta', type: 'text', rows: 2 }),
      defineField({ name: 'image', title: 'Imagen de Fondo', type: 'image' }),
      defineField({ name: 'href', title: 'URL Destino', type: 'string', description: 'Ej: /luxury-villas' })
    ]
  }),
  defineField({
    name: 'hubRight',
    title: 'Opción Derecha (Split Hub)',
    type: 'object',
    hidden: ({ document }) => !document?.isHub,
    fields: [
      defineField({ name: 'title', title: 'Título', type: 'string' }),
      defineField({ name: 'description', title: 'Descripción Corta', type: 'text', rows: 2 }),
      defineField({ name: 'image', title: 'Imagen de Fondo', type: 'image' }),
      defineField({ name: 'href', title: 'URL Destino', type: 'string', description: 'Ej: /private-islands' })
    ]
  }),

  // --- HERO SECTION ---
  defineField({
    name: 'hero',
    title: 'Sección: Hero',
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({ name: 'backgroundImage', title: 'Imagen de Fondo', type: 'image' }),
      defineField({ name: 'eyebrow', title: 'Subtítulo (Eyebrow)', type: 'string' }),
      defineField({ name: 'title', title: 'Título Principal', type: 'string' }),
      defineField({ name: 'description', title: 'Descripción Corta', type: 'text' }),
      defineField({
        name: 'cta',
        title: 'Botón CTA',
        type: 'object',
        fields: [
          defineField({ name: 'label', type: 'string', title: 'Texto del Botón' }),
          defineField({ name: 'href', type: 'string', title: 'Enlace' })
        ]
      })
    ]
  }),


  // --- BENTO BANNER ---
  defineField({
    name: 'bentoBanner',
    title: 'Banner Promocional (Bento Banner)',
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({ name: 'backgroundImage', title: 'Imagen de Fondo', type: 'image' }),
      defineField({ name: 'title', title: 'Título Principal', type: 'string' }),
      defineField({ name: 'description', title: 'Descripción', type: 'text' }),
      defineField({
        name: 'cta',
        title: 'Botón CTA',
        type: 'object',
        fields: [
          defineField({ name: 'label', type: 'string', title: 'Texto del Botón' }),
          defineField({ name: 'href', type: 'string', title: 'Enlace' })
        ]
      })
    ]
  }),

  // --- PROCESS STEPS (For Boats) ---
  defineField({
    name: 'processSteps',
    title: 'Pasos del Proceso (Opcional, ej: Yates)',
    type: 'array',
    options: { layout: 'grid' },
    of: [
      {
        type: 'object',
        fields: [
          defineField({ name: 'number', title: 'Número (ej: 01)', type: 'string' }),
          defineField({ name: 'title', title: 'Título del Paso', type: 'string' }),
          defineField({ name: 'description', title: 'Descripción', type: 'text' }),
          defineField({ name: 'image', title: 'Icono / Imagen', type: 'image' })
        ]
      }
    ]
  }),

  // --- SEO FAQ BLOCK (Optional) ---
  defineField({
    name: 'seoFaq',
    title: 'Sección: FAQ SEO (Inferior)',
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({ name: 'title', title: 'Título Principal', type: 'string' }),
      defineField({ name: 'description', title: 'Descripción', type: 'text' }),
      defineField({
        name: 'questions',
        title: 'Preguntas Rápidas SEO',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              defineField({ name: 'question', title: 'Pregunta', type: 'string' }),
              defineField({ name: 'answer', title: 'Respuesta', type: 'text' })
            ]
          }
        ]
      }),
      defineField({
        name: 'cta',
        title: 'Botón CTA Final (Opcional)',
        type: 'object',
        fields: [
          defineField({ name: 'label', type: 'string', title: 'Texto del Botón' }),
          defineField({ name: 'href', type: 'string', title: 'Enlace' })
        ]
      })
    ]
  })
];

export const listingPage = defineType({
  name: 'listingPage',
  title: 'Diseño: Catálogos (Hero/SEO)',
  type: 'document',
  icon: LayoutGrid,
  groups: [
    { name: 'en', title: '🇺🇸 English', default: true },
    { name: 'es', title: '🇪🇸 Español' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre Interno del Catálogo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (Slug)',
      description: 'La ruta de la página. Ej: "luxury-villas", "private-islands". Quedará como tudominio.com/[slug]',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isHub',
      title: 'Modo Distribuidor (Pantalla Dividida)',
      description: 'Si se activa, la página no mostrará un catálogo normal, sino una pantalla dividida con 2 botones gigantes a otras colecciones (ej. mitad Villas, mitad Islas).',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'contentEn',
      title: 'Contenido en Inglés',
      type: 'object',
      group: 'en',
      fields: listingPageContentFields,
    }),
    defineField({
      name: 'contentEs',
      title: 'Contenido en Español',
      type: 'object',
      group: 'es',
      fields: listingPageContentFields,
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current'
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `/${subtitle}` : 'Sin URL'
      }
    }
  }
})
