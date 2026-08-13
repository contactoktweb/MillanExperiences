import { defineType, defineField } from 'sanity'
import { LayoutList } from 'lucide-react'

export function createProductSchema(name: string, title: string, icon: any = LayoutList) {
  return defineType({
    name,
    title,
    type: 'document',
    icon,
    fields: [
      defineField({
        name: 'title',
        title: 'Nombre',
        type: 'string',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'slug',
        title: 'URL (Slug)',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'mainImage',
        title: 'Imagen Principal',
        type: 'image',
        options: { hotspot: true },
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'gallery',
        title: 'Galería de Imágenes',
        type: 'array',
        of: [{ type: 'image', options: { hotspot: true } }]
      }),
      defineField({
        name: 'descriptionEn',
        title: 'Descripción (Inglés)',
        type: 'text',
      }),
      defineField({
        name: 'descriptionEs',
        title: 'Descripción (Español)',
        type: 'text',
      }),
      defineField({
        name: 'details',
        title: 'Detalles Técnicos',
        type: 'object',
        fields: [
          defineField({ name: 'location', title: 'Ubicación', type: 'string' }),
          defineField({ name: 'capacity', title: 'Capacidad (pax)', type: 'number' }),
          defineField({ name: 'rooms', title: 'Habitaciones / Camarotes', type: 'number' }),
          defineField({ name: 'bathrooms', title: 'Baños', type: 'number' }),
          defineField({ name: 'dimensions', title: 'Dimensiones / Tamaño', type: 'string' }),
        ]
      }),
      defineField({
        name: 'amenities',
        title: 'Comodidades (Amenities)',
        type: 'array',
        of: [{ type: 'string' }]
      }),
      defineField({
        name: 'price',
        title: 'Precio base (Opcional)',
        type: 'string',
      }),
      defineField({
        name: 'cancellationPolicyEn',
        title: 'Política de Cancelación (Inglés)',
        type: 'text',
      }),
      defineField({
        name: 'cancellationPolicyEs',
        title: 'Política de Cancelación (Español)',
        type: 'text',
      }),
      defineField({
        name: 'faqs',
        title: 'Preguntas Frecuentes',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            defineField({ name: 'questionEn', title: 'Pregunta (Inglés)', type: 'string' }),
            defineField({ name: 'questionEs', title: 'Pregunta (Español)', type: 'string' }),
            defineField({ name: 'answerEn', title: 'Respuesta (Inglés)', type: 'text' }),
            defineField({ name: 'answerEs', title: 'Respuesta (Español)', type: 'text' }),
          ]
        }]
      }),
      defineField({
        name: 'complementaryExperiences',
        title: 'Experiencias Complementarias',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            defineField({ name: 'titleEn', title: 'Título (Inglés)', type: 'string' }),
            defineField({ name: 'titleEs', title: 'Título (Español)', type: 'string' }),
            defineField({ name: 'descriptionEn', title: 'Descripción (Inglés)', type: 'text' }),
            defineField({ name: 'descriptionEs', title: 'Descripción (Español)', type: 'text' }),
            defineField({ name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'href', title: 'Enlace (URL)', type: 'string' }),
          ]
        }]
      }),
    ],
    preview: {
      select: {
        title: 'title',
        media: 'mainImage'
      }
    }
  })
}
