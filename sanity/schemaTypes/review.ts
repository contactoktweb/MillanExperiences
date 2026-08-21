import { defineField, defineType } from 'sanity'
import { MessageSquareHeart } from 'lucide-react'

export const review = defineType({
  name: 'review',
  title: 'Reseñas (Reviews)',
  type: 'document',
  icon: MessageSquareHeart,
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Cliente',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Testimonio (Cita)',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Calificación (1-5)',
      type: 'number',
      initialValue: 5,
      validation: Rule => Rule.min(1).max(5).required(),
    }),
    defineField({
      name: 'context',
      title: 'Contexto / Opcional',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Fecha',
      type: 'string',
    }),
    defineField({
      name: 'isGoogleReview',
      title: '¿Es un Google Review?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'propertySlug',
      title: 'Slug de la Propiedad (Opcional)',
      type: 'string',
    }),
    defineField({
      name: 'propertyName',
      title: 'Nombre de la Propiedad (Opcional)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Foto Principal del Cliente / Experiencia (Editable)',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Imagen principal para mostrar al lado del testimonio.',
    }),
    defineField({
      name: 'images',
      title: 'Galería de Imágenes Adicionales (Opcional)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Carrusel de fotos para mostrar junto al testimonio.',
    }),
    defineField({
      name: 'status',
      title: 'Estado de Aprobación',
      type: 'string',
      options: {
        list: [
          { title: 'Aprobado', value: 'approved' },
          { title: 'Pendiente', value: 'pending' },
          { title: 'Rechazado', value: 'rejected' },
        ],
        layout: 'radio',
      },
      initialValue: 'approved',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'propertyName',
      status: 'status',
      rating: 'rating',
      media: 'image',
    },
    prepare({ title, subtitle, status, rating, media }) {
      const stars = '⭐️'.repeat(rating || 0)
      const propText = subtitle ? ` [${subtitle}]` : ''
      const statusIcon = status === 'approved' ? '✅' : status === 'rejected' ? '❌' : '⏳'
      return {
        title: `${title} - ${stars}${propText}`,
        subtitle: `${statusIcon} ${status === 'approved' ? 'Aprobado' : status === 'rejected' ? 'Rechazado' : 'Pendiente'}`,
        media,
      }
    }
  }
})
