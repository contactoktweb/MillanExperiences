import { defineType, defineField } from 'sanity'
import { Briefcase } from 'lucide-react'

// Define the fields once so we can reuse them for both English and Spanish
const servicePageContentFields = [
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

  // --- WHAT WE HANDLE SECTION ---
  defineField({
    name: 'whatWeHandle',
    title: 'Sección: Detalles / Qué Hacemos',
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({ name: 'eyebrow', title: 'Subtítulo (Eyebrow)', type: 'string' }),
      defineField({ name: 'title', title: 'Título Principal', type: 'string' }),
      defineField({ name: 'image', title: 'Imagen Representativa', type: 'image' }),
      defineField({
        name: 'contentBlocks',
        title: 'Párrafos Descriptivos',
        description: 'Agrega los párrafos introductorios antes de la lista',
        type: 'array',
        of: [{ type: 'text' }]
      }),
      defineField({ name: 'listIntro', title: 'Texto antes de la lista (ej: "Nuestros servicios incluyen:")', type: 'string' }),
      defineField({
        name: 'bulletPoints',
        title: 'Lista de Servicios / Puntos Clave',
        type: 'array',
        of: [{ type: 'string' }]
      }),
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

  // --- EXPLORE GRID (For pages like Private Tours) ---
  defineField({
    name: 'exploreGrid',
    title: 'Sección: Cuadrícula de Exploración (Tarjetas)',
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({ name: 'eyebrow', title: 'Subtítulo (Eyebrow)', type: 'string' }),
      defineField({ name: 'title', title: 'Título Principal', type: 'string' }),
      defineField({
        name: 'cards',
        title: 'Tarjetas',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              defineField({ name: 'image', title: 'Imagen de Fondo', type: 'image' }),
              defineField({ name: 'title', title: 'Título de la Tarjeta', type: 'string' }),
              defineField({ name: 'description', title: 'Descripción', type: 'text' }),
              defineField({
                name: 'cta',
                title: 'Enlace de la Tarjeta (Opcional)',
                type: 'object',
                fields: [
                  defineField({ name: 'label', type: 'string', title: 'Texto del Botón' }),
                  defineField({ name: 'href', type: 'string', title: 'Enlace' })
                ]
              })
            ]
          }
        ]
      })
    ]
  }),

  // --- FAQ SECTION ---
  defineField({
    name: 'faq',
    title: 'Sección: FAQ (Acordeón Principal)',
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({ name: 'eyebrow', title: 'Subtítulo (Eyebrow)', type: 'string' }),
      defineField({ name: 'title', title: 'Título Principal', type: 'string' }),
      defineField({
        name: 'questions',
        title: 'Preguntas y Respuestas',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              defineField({ name: 'question', title: 'Pregunta', type: 'string' }),
              defineField({
                name: 'answer',
                title: 'Respuesta',
                type: 'array',
                of: [{ type: 'text' }]
              })
            ]
          }
        ]
      })
    ]
  }),

  // --- RELATED SERVICES ---
  defineField({
    name: 'relatedServices',
    title: 'Sección: Servicios Relacionados (Tarjetas)',
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({ name: 'eyebrow', title: 'Subtítulo (Eyebrow)', type: 'string' }),
      defineField({ name: 'title', title: 'Título Principal', type: 'string' }),
      defineField({
        name: 'cards',
        title: 'Tarjetas de Servicios',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              defineField({ name: 'image', title: 'Imagen de Fondo', type: 'image' }),
              defineField({ name: 'title', title: 'Título de la Tarjeta', type: 'string' }),
              defineField({ name: 'description', title: 'Descripción', type: 'text' }),
              defineField({
                name: 'cta',
                title: 'Enlace de la Tarjeta',
                type: 'object',
                fields: [
                  defineField({ name: 'label', type: 'string', title: 'Texto del Botón' }),
                  defineField({ name: 'href', type: 'string', title: 'Enlace' })
                ]
              })
            ]
          }
        ]
      })
    ]
  }),

  // --- SEO FAQ BLOCK ---
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
        title: 'Botón CTA Final',
        type: 'object',
        fields: [
          defineField({ name: 'label', type: 'string', title: 'Texto del Botón' }),
          defineField({ name: 'href', type: 'string', title: 'Enlace' })
        ]
      })
    ]
  })
];

export const servicePage = defineType({
  name: 'servicePage',
  title: 'Páginas de Servicios',
  type: 'document',
  icon: Briefcase,
  groups: [
    { name: 'en', title: '🇺🇸 English', default: true },
    { name: 'es', title: '🇪🇸 Español' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre Interno del Servicio (solo para identificarlo)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (Slug)',
      description: 'La ruta de la página. Ej: "concierge", "private-chef". Quedará como tudominio.com/services/concierge',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contentEn',
      title: 'Contenido en Inglés',
      type: 'object',
      group: 'en',
      fields: servicePageContentFields,
    }),
    defineField({
      name: 'contentEs',
      title: 'Contenido en Español',
      type: 'object',
      group: 'es',
      fields: servicePageContentFields,
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
        subtitle: subtitle ? `/services/${subtitle}` : 'Sin URL'
      }
    }
  }
})
