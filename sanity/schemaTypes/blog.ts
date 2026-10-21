import { defineArrayMember, defineField, defineType } from 'sanity'
import { BookOpen, Tag, Lightbulb } from 'lucide-react'

/**
 * Blog bilingüe (EN/ES). Cada artículo tiene datos generales (URL, imagen,
 * categoría, fecha) y un bloque de contenido por idioma con el mismo formato.
 * Si el contenido en español está vacío, la web muestra el inglés.
 */

// --- Recuadro destacado ("Consejo de experto") dentro del cuerpo ---
export const blogCallout = defineType({
  name: 'blogCallout',
  title: 'Recuadro destacado',
  type: 'object',
  icon: Lightbulb,
  fields: [
    defineField({ name: 'title', title: 'Título corto', type: 'string', description: 'Ej: "Consejo de experto" / "Insider tip"' }),
    defineField({ name: 'text', title: 'Texto', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'text' },
    prepare: ({ title, subtitle }) => ({ title: `💡 ${title || 'Recuadro'}`, subtitle }),
  },
})

// --- Cuerpo del artículo (editor de texto enriquecido) ---
export const blogBody = defineType({
  name: 'blogBody',
  title: 'Cuerpo del artículo',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Párrafo', value: 'normal' },
        { title: 'Título de sección (H2)', value: 'h2' },
        { title: 'Subtítulo (H3)', value: 'h3' },
        { title: 'Cita', value: 'blockquote' },
      ],
      lists: [
        { title: 'Viñetas', value: 'bullet' },
        { title: 'Numerada', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Negrita', value: 'strong' },
          { title: 'Cursiva', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            title: 'Enlace',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                title: 'URL',
                type: 'string',
                description: 'Enlace interno (ej: /private-islands, /blog/mi-articulo) o externo (https://...)',
                validation: (Rule) =>
                  Rule.required().custom((v) =>
                    !v || v.startsWith('/') || /^https?:\/\//.test(v) || v.startsWith('mailto:')
                      ? true
                      : 'Debe empezar por "/", "https://" o "mailto:"',
                  ),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      title: 'Imagen',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texto alternativo (SEO)', type: 'string', description: 'Describe la imagen para Google y accesibilidad.', validation: (Rule) => Rule.required() }),
        defineField({ name: 'caption', title: 'Pie de foto (opcional)', type: 'string' }),
      ],
    }),
    defineArrayMember({ type: 'blogCallout' }),
  ],
})

// --- Contenido por idioma ---
export const blogPostContent = defineType({
  name: 'blogPostContent',
  title: 'Contenido',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Título (H1)', type: 'string', validation: (Rule) => Rule.max(120) }),
    defineField({
      name: 'description',
      title: 'Introducción / Extracto',
      type: 'text',
      rows: 3,
      description: 'Se muestra bajo el título y en las tarjetas del blog.',
    }),
    defineField({
      name: 'takeaways',
      title: 'En resumen (puntos clave)',
      description: 'De 3 a 6 frases cortas con la respuesta directa. Es lo que citan Google y las IA (ChatGPT, Perplexity…).',
      type: 'array',
      of: [{ type: 'text', rows: 2 }],
    }),
    defineField({ name: 'body', title: 'Cuerpo del artículo', type: 'blogBody' }),
    defineField({
      name: 'faqs',
      title: 'Preguntas frecuentes',
      description: 'Aparecen al final del artículo y como datos estructurados FAQ para Google.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faq',
          fields: [
            defineField({ name: 'question', title: 'Pregunta', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'answer', title: 'Respuesta', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'question', subtitle: 'answer' } },
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Llamado a la acción (final)',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'text', title: 'Texto', type: 'text', rows: 2 }),
        defineField({ name: 'label', title: 'Texto del botón', type: 'string' }),
        defineField({ name: 'href', title: 'Enlace del botón', type: 'string', initialValue: '/contact' }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta título',
          type: 'string',
          description: 'Título en Google. Ideal ≤ 60 caracteres. Si está vacío se usa el título.',
          validation: (Rule) => Rule.max(70).warning('Más de 70 caracteres: Google lo recortará.'),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta descripción',
          type: 'text',
          rows: 3,
          description: 'Texto bajo el título en Google. Ideal 120–155 caracteres.',
          validation: (Rule) => Rule.max(160).warning('Más de 160 caracteres: Google lo recortará.'),
        }),
      ],
    }),
  ],
})

// --- Categoría ---
export const blogCategory = defineType({
  name: 'blogCategory',
  title: 'Blog: Categoría',
  type: 'document',
  icon: Tag,
  fields: [
    defineField({ name: 'titleEn', title: 'Nombre (Inglés)', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'titleEs', title: 'Nombre (Español)', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      options: { source: 'titleEn', maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'order', title: 'Orden', type: 'number' }),
  ],
  orderings: [{ title: 'Orden', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'titleEs', subtitle: 'titleEn' } },
})

// --- Artículo ---
export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog: Artículo',
  type: 'document',
  icon: BookOpen,
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'en', title: '🇺🇸 English' },
    { name: 'es', title: '🇨🇴 Español' },
  ],
  fields: [
    defineField({
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      group: 'general',
      description: 'Dirección del artículo: /blog/<slug>. Usa palabras clave en inglés. No cambiar después de publicar.',
      options: { source: 'contentEn.title', maxLength: 80 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      group: 'general',
      description: 'El artículo aparece en la web a partir de esta fecha (permite programar publicaciones).',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Última actualización (opcional)',
      type: 'datetime',
      group: 'general',
      description: 'Úsalo cuando actualices el contenido de forma importante. Google lo muestra como "actualizado".',
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'blogCategory' }],
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      group: 'general',
      description: 'Se muestra en grande al inicio de /blog.',
      initialValue: false,
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen principal',
      type: 'image',
      group: 'general',
      description: 'Horizontal, mínimo 1600 px de ancho. Se usa en el hero, las tarjetas y al compartir en redes.',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'altEn', title: 'Texto alternativo (Inglés)', type: 'string' }),
        defineField({ name: 'altEs', title: 'Texto alternativo (Español)', type: 'string' }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedLinks',
      title: 'Servicios relacionados ("Planéalo con nosotros")',
      type: 'array',
      group: 'general',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'relatedLink',
          fields: [
            defineField({ name: 'labelEn', title: 'Texto (Inglés)', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'labelEs', title: 'Texto (Español)', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'href', title: 'Enlace', type: 'string', description: 'Ej: /private-islands', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'labelEs', subtitle: 'href' } },
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'keywords',
      title: 'Palabras clave (SEO)',
      type: 'array',
      group: 'general',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'contentEn',
      title: 'Contenido en Inglés',
      type: 'blogPostContent',
      group: 'en',
      validation: (Rule) =>
        Rule.custom((value: any) => (value?.title && value?.body?.length ? true : 'El contenido en inglés necesita título y cuerpo.')),
    }),
    defineField({
      name: 'contentEs',
      title: 'Contenido en Español',
      type: 'blogPostContent',
      group: 'es',
      description: 'Si se deja vacío, la versión en español de la web mostrará el contenido en inglés.',
    }),
  ],
  orderings: [
    { title: 'Más recientes', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: {
      titleEs: 'contentEs.title',
      titleEn: 'contentEn.title',
      date: 'publishedAt',
      category: 'category.titleEs',
      media: 'mainImage',
    },
    prepare: ({ titleEs, titleEn, date, category, media }) => ({
      title: titleEs || titleEn || 'Artículo sin título',
      subtitle: [category, date ? new Date(date).toLocaleDateString('es-CO') : 'Sin fecha'].filter(Boolean).join(' · '),
      media,
    }),
  },
})
