import { defineType, defineField } from 'sanity'
import { Home } from 'lucide-react'

// Define the fields once so we can reuse them for both English and Spanish
const homePageContentFields = [
  // --- HERO SECTION ---
  defineField({
    name: 'hero',
    title: 'Sección: Hero',
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({
        name: 'slides',
        title: 'Slides (Imágenes de fondo)',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              defineField({ name: 'image', type: 'image', title: 'Imagen' }),
              defineField({ name: 'alt', type: 'string', title: 'Texto Alternativo' })
            ]
          }
        ]
      }),
      defineField({
        name: 'headlinePart1',
        title: 'Título (Parte 1 - Normal)',
        type: 'string',
      }),
      defineField({
        name: 'headlinePart2',
        title: 'Título (Parte 2 - Cursiva)',
        type: 'string',
      }),
      defineField({
        name: 'description',
        title: 'Descripción',
        type: 'text',
      }),
      defineField({
        name: 'primaryCta',
        title: 'Botón Principal',
        type: 'object',
        fields: [
          defineField({ name: 'label', type: 'string', title: 'Texto del Botón' }),
          defineField({ name: 'href', type: 'string', title: 'Enlace' })
        ]
      }),
      defineField({
        name: 'secondaryCta',
        title: 'Botón Secundario',
        type: 'object',
        fields: [
          defineField({ name: 'label', type: 'string', title: 'Texto del Botón' }),
          defineField({ name: 'href', type: 'string', title: 'Enlace' })
        ]
      })
    ]
  }),

  // --- CORE SERVICES SECTION ---
  defineField({
    name: 'coreServices',
    title: 'Sección: Core Services',
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({ name: 'eyebrow', title: 'Subtítulo (Eyebrow)', type: 'string' }),
      defineField({ name: 'headline', title: 'Título Principal', type: 'string' }),
      defineField({ name: 'description', title: 'Descripción', type: 'text' }),
      defineField({
        name: 'services',
        title: 'Servicios',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              defineField({ name: 'number', type: 'string', title: 'Número (ej. 01)' }),
              defineField({ name: 'title', type: 'string', title: 'Título' }),
              defineField({ name: 'description', type: 'text', title: 'Descripción' }),
              defineField({ name: 'href', type: 'string', title: 'Enlace' }),
              defineField({ name: 'cta', type: 'string', title: 'Texto del Enlace' }),
              defineField({ name: 'image', type: 'image', title: 'Imagen de Fondo' }),
            ]
          }
        ]
      })
    ]
  }),

  // --- WHY MILLAN SECTION ---
  defineField({
    name: 'whyMillan',
    title: 'Sección: Why Millan',
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({ name: 'mainImage', title: 'Imagen Principal', type: 'image' }),
      defineField({ name: 'secondaryImage', title: 'Imagen Secundaria', type: 'image' }),
      defineField({ name: 'eyebrow', title: 'Subtítulo (Eyebrow)', type: 'string' }),
      defineField({ name: 'headline', title: 'Título Principal', type: 'string' }),
      defineField({ name: 'description', title: 'Descripción', type: 'text' }),
      defineField({ name: 'quote', title: 'Frase Destacada (Quote)', type: 'string' }),
      defineField({
        name: 'attributes',
        title: 'Atributos de Marca',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              defineField({ name: 'title', type: 'string', title: 'Título' }),
              defineField({ name: 'body', type: 'text', title: 'Descripción' }),
            ]
          }
        ]
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

  // --- TESTIMONIALS SECTION ---
  defineField({
    name: 'testimonialsSection',
    title: 'Sección: Testimonios',
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({ name: 'eyebrow', title: 'Subtítulo (Eyebrow)', type: 'string' }),
      defineField({ name: 'headline', title: 'Título Principal', type: 'string' }),
      defineField({ name: 'sideImage', title: 'Imagen Lateral', type: 'image' }),
      defineField({
        name: 'list',
        title: 'Lista de Testimonios',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              defineField({ name: 'quote', type: 'text', title: 'Testimonio (Cita)' }),
              defineField({ name: 'name', type: 'string', title: 'Nombre del Cliente' }),
              defineField({ name: 'context', type: 'string', title: 'Contexto / Nacionalidad / Opcional' }),
              defineField({ name: 'rating', type: 'number', title: 'Calificación (1-5)', initialValue: 5, validation: Rule => Rule.min(1).max(5) }),
              defineField({ name: 'date', type: 'string', title: 'Fecha (ej. "Hace 5 meses")' }),
              defineField({ name: 'isGoogleReview', type: 'boolean', title: '¿Es un Google Review?', initialValue: true }),
            ]
          }
        ]
      })
    ]
  }),
];

export const homePage = defineType({
  name: 'homePage',
  title: 'Inicio (Home Page)',
  type: 'document',
  icon: Home,
  groups: [
    { name: 'en', title: '🇺🇸 English' },
    { name: 'es', title: '🇪🇸 Español' },
  ],
  fields: [
    defineField({
      name: 'contentEn',
      title: 'Contenido en Inglés',
      type: 'object',
      group: 'en',
      fields: homePageContentFields,
    }),
    defineField({
      name: 'contentEs',
      title: 'Contenido en Español',
      type: 'object',
      group: 'es',
      fields: homePageContentFields,
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Inicio (Home Page)'
      }
    }
  }
})
