import { defineType, defineField } from 'sanity'
import { PartyPopper } from 'lucide-react'

const eventPageContentFields = [
  // --- SEO METADATA ---
  defineField({
    name: 'seo',
    title: 'Configuración SEO (Meta Tags)',
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({ name: 'title', type: 'string', title: 'Título SEO', validation: rule => rule.required() }),
      defineField({ name: 'description', type: 'text', title: 'Descripción SEO' }),
    ]
  }),

  // --- HERO SECTION ---
  defineField({
    name: 'hero',
    title: 'Sección: Hero',
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({ name: 'backgroundImage', type: 'image', title: 'Imagen de Fondo' }),
      defineField({ name: 'eyebrow', type: 'string', title: 'Subtítulo (Eyebrow)' }),
      defineField({ name: 'headline', type: 'string', title: 'Título Principal' }),
      defineField({ name: 'subHeadline', type: 'string', title: 'Título Secundario (Opcional)' }),
      defineField({ name: 'description', type: 'text', title: 'Descripción' }),
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

  // --- QUOTE SECTION ---
  defineField({
    name: 'quoteSection',
    title: 'Sección: Quote',
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({ name: 'quote', type: 'text', title: 'Frase Destacada' }),
    ]
  }),

  // --- THE EXPERIENCE ---
  defineField({
    name: 'experienceSteps',
    title: 'Sección: The Experience (Pasos)',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          defineField({ name: 'title', type: 'string', title: 'Título Corto (Eyebrow)' }),
          defineField({ name: 'subtitle', type: 'string', title: 'Subtítulo' }),
          defineField({ name: 'description', type: 'text', title: 'Descripción' }),
          defineField({ name: 'image', type: 'image', title: 'Imagen' }),
        ]
      }
    ]
  }),

  // --- WHY MILLAN FOR GROUPS (Opcional) ---
  defineField({
    name: 'whyMillan',
    title: 'Sección: Why Millan (Acordeón)',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          defineField({ name: 'title', type: 'string', title: 'Título' }),
          defineField({ name: 'content', type: 'text', title: 'Contenido' }),
        ]
      }
    ]
  }),

  // --- MAKE IT YOURS (ADD-ONS) ---
  defineField({
    name: 'addons',
    title: 'Sección: Add-ons',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          defineField({ name: 'title', type: 'string', title: 'Título' }),
          defineField({ name: 'image', type: 'image', title: 'Imagen' }),
        ]
      }
    ]
  }),

  // --- LIMITLESS POSSIBILITIES ---
  defineField({
    name: 'possibilities',
    title: 'Sección: Limitless Possibilities',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          defineField({ name: 'title', type: 'string', title: 'Título' }),
          defineField({ name: 'description', type: 'text', title: 'Descripción' }),
          defineField({ name: 'href', type: 'string', title: 'Enlace' }),
          defineField({ name: 'linkText', type: 'string', title: 'Texto del Enlace' }),
          defineField({ name: 'image', type: 'image', title: 'Imagen de Fondo' }),
        ]
      }
    ]
  }),
];

export const eventPage = defineType({
  name: 'eventPage',
  title: 'Diseño: Páginas de Eventos',
  type: 'document',
  icon: PartyPopper,
  groups: [
    { name: 'en', title: '🇺🇸 English' },
    { name: 'es', title: '🇪🇸 Español' },
  ],
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      validation: rule => rule.required(),
      options: {
        source: 'contentEn.hero.headline',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'contentEn',
      title: 'Contenido en Inglés',
      type: 'object',
      group: 'en',
      fields: eventPageContentFields,
    }),
    defineField({
      name: 'contentEs',
      title: 'Contenido en Español',
      type: 'object',
      group: 'es',
      fields: eventPageContentFields,
    })
  ],
  preview: {
    select: {
      title: 'contentEn.hero.headline',
      slug: 'slug.current',
      media: 'contentEn.hero.backgroundImage'
    },
    prepare({ title, slug, media }) {
      return {
        title: title || 'Página sin título',
        subtitle: slug ? `/${slug}` : 'Sin URL',
        media
      }
    }
  }
})
